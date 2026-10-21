/**
 * Creates a local, Skylink-owned test raster for verifying the optimize pipeline.
 * Not a marketing asset. Do not present as installation photography.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "media-originals/images/pipeline-fixture.png");

await fs.mkdir(path.dirname(out), { recursive: true });

const svg = `
<svg width="960" height="640" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071A2B"/>
      <stop offset="100%" stop-color="#00537D"/>
    </linearGradient>
  </defs>
  <rect width="960" height="640" fill="url(#g)"/>
  <text x="48" y="300" fill="#79C9E8" font-family="Arial, sans-serif" font-size="36">Skylink pipeline fixture</text>
  <text x="48" y="350" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="20">Local test asset — not production photography</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log("wrote", path.relative(root, out));
