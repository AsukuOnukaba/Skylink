import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist", "spa");
const publicDir = path.join(root, "public");

async function walk(dir, acc = []) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(absolute, acc);
    else if (entry.name === "index.html") acc.push(absolute);
  }
  return acc;
}

const pages = (await walk(dist)).sort();
const failures = [];

if (pages.length !== 54) failures.push(`expected 54 prerendered pages, found ${pages.length}`);

for (const file of pages) {
  const relative = path.relative(dist, path.dirname(file)).replaceAll(path.sep, "/");
  const route = relative ? `/${relative}` : "/";
  const html = await fs.readFile(file, "utf8");
  if (!/<title>[^<]{3,}<\/title>/i.test(html)) failures.push(`${route}: missing title`);
  if (!/<meta\s+name="description"\s+content="[^"]{20,}"/i.test(html)) failures.push(`${route}: missing meta description`);
  const noindex = /<meta\s+name="robots"\s+content="noindex, nofollow"/i.test(html);
  const hasCanonical = /<link\s+rel="canonical"\s+href="https?:\/\/[^\"]+"/i.test(html);
  if (!noindex && !hasCanonical) failures.push(`${route}: indexable page missing canonical URL`);
  if (!/<h1[^>]*>.*?<\/h1>/is.test(html)) failures.push(`${route}: missing H1`);
  if (/The primary work is Starlink connectivity for boats/i.test(html)) failures.push(`${route}: stale maritime-first copy`);
  if (/Offshore and maritime Starlink work comes first/i.test(html)) failures.push(`${route}: stale maritime-first services copy`);
  if (/Starlink connectivity for vessels, offshore platforms and marine operations/i.test(html)) failures.push(`${route}: stale maritime-only homepage copy`);

  for (const match of html.matchAll(/<img[^>]+src="(\/[^"?#]+)"/gi)) {
    const asset = path.join(publicDir, match[1]);
    try {
      const stat = await fs.stat(asset);
      if (!stat.isFile() || stat.size === 0) failures.push(`${route}: empty image ${match[1]}`);
    } catch {
      failures.push(`${route}: missing image ${match[1]}`);
    }
  }
}

if (failures.length) {
  console.error(`[page:check] ${failures.length} issue(s)`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`[page:check] ${pages.length} routes have title, description, robots/canonical policy, H1, and valid rendered images`);
