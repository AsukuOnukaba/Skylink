/**
 * Optimize rasters under media-originals/ into public/ + image-manifest.json.
 * Pattern adapted from DataGram; Skylink paths only — no CompanyWeb imports.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const originalsDir = path.join(root, "media-originals");
const manifestPath = path.join(root, "src/data/image-manifest.json");
const WIDTHS = [480, 768, 1280, 1920];
const BUDGET = {
  480: 60 * 1024,
  768: 80 * 1024,
  1280: 140 * 1024,
  1920: 250 * 1024,
};
const RASTER = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

async function walk(dir, acc = []) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(abs, acc);
    else acc.push(abs);
  }
  return acc;
}

function isDerivative(file) {
  return /\.w\d+\.(avif|webp)$/i.test(file);
}

async function encodeUnderBudget(pipeline, format, width) {
  const cap = BUDGET[width] || BUDGET[1920];
  const start = format === "avif" ? 50 : format === "webp" ? 62 : 70;
  let quality = start;
  let buf = null;
  while (quality >= 28) {
    let pipe = pipeline.clone().resize({ width, withoutEnlargement: true });
    if (format === "avif") pipe = pipe.avif({ quality, effort: 4 });
    else if (format === "webp") pipe = pipe.webp({ quality });
    else if (format === "png")
      pipe = pipe.png({ compressionLevel: 9, palette: quality < 60 });
    else pipe = pipe.jpeg({ quality, mozjpeg: true });
    buf = await pipe.toBuffer();
    if (buf.length <= cap) return buf;
    quality -= 8;
  }
  return buf;
}

async function optimizeOne(sourceAbs, publicRel) {
  const ext = path.extname(publicRel).toLowerCase();
  const input = sharp(sourceAbs, { failOn: "none" });
  const meta = await input.metadata();
  const width = meta.width || 0;
  const height = meta.height || 0;
  if (!width || !height) return null;

  let widths = WIDTHS.filter((w) => w <= width);
  if (!widths.length || width < WIDTHS[0]) widths = [width];
  const unique = [...new Set(widths)];

  const stem = publicRel.slice(0, -ext.length).replace(/\\/g, "/");
  const variants = [];
  for (const w of unique) {
    const avifName = `${stem}.w${w}.avif`;
    const webpName = `${stem}.w${w}.webp`;
    const avif = await encodeUnderBudget(
      sharp(sourceAbs, { failOn: "none" }),
      "avif",
      w,
    );
    const webp = await encodeUnderBudget(
      sharp(sourceAbs, { failOn: "none" }),
      "webp",
      w,
    );
    await fs.mkdir(path.dirname(path.join(publicDir, avifName)), {
      recursive: true,
    });
    await fs.writeFile(path.join(publicDir, avifName), avif);
    await fs.writeFile(path.join(publicDir, webpName), webp);
    variants.push({ w, avif: `/${avifName}`, webp: `/${webpName}` });
  }

  const largest = unique[unique.length - 1];
  const fallbackFormat =
    ext === ".png" ? "png" : ext === ".webp" ? "webp" : ext === ".avif" ? "avif" : "jpeg";
  const fallbackBuf = await encodeUnderBudget(
    sharp(sourceAbs, { failOn: "none" }),
    fallbackFormat,
    largest,
  );
  const fallbackAbs = path.join(publicDir, publicRel);
  await fs.mkdir(path.dirname(fallbackAbs), { recursive: true });
  await fs.writeFile(fallbackAbs, fallbackBuf);

  return {
    src: `/${publicRel.replace(/\\/g, "/")}`,
    width,
    height,
    variants,
  };
}

async function main() {
  await fs.mkdir(originalsDir, { recursive: true });
  const files = await walk(originalsDir);
  const manifest = {};
  let done = 0;

  for (const abs of files) {
    const rel = path.relative(originalsDir, abs);
    const ext = path.extname(rel).toLowerCase();
    if (!RASTER.has(ext) || isDerivative(rel)) continue;
    // Skip brand originals managed separately under brand-assets/
    if (rel.startsWith("brand" + path.sep) || rel.includes(`${path.sep}brand${path.sep}`))
      continue;

    const entry = await optimizeOne(abs, rel.replace(/\\/g, "/"));
    if (entry) manifest[entry.src] = entry;
    done += 1;
  }

  await fs.mkdir(path.dirname(manifestPath), { recursive: true });
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`optimized ${done} image(s) → ${path.relative(root, manifestPath)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
