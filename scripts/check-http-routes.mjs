import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist", "spa");
const origin = (process.env.SKYLINK_QA_ORIGIN || "http://127.0.0.1:4321").replace(/\/$/, "");

async function walk(dir, acc = []) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(absolute, acc);
    else if (entry.name === "index.html") acc.push(absolute);
  }
  return acc;
}

const files = await walk(dist);
const routes = files.map((file) => {
  const relative = path.relative(dist, path.dirname(file)).replaceAll(path.sep, "/");
  return relative ? `/${relative}` : "/";
});
const assets = new Set();
const failures = [];

for (let index = 0; index < files.length; index += 1) {
  const route = routes[index];
  const response = await fetch(`${origin}${route}`);
  if (!response.ok) failures.push(`${route}: HTTP ${response.status}`);
  const html = await fs.readFile(files[index], "utf8");
  for (const match of html.matchAll(/<img[^>]+src="(\/[^"?#]+)"/gi)) assets.add(match[1]);
}

for (const asset of assets) {
  const response = await fetch(`${origin}${asset}`);
  if (!response.ok || !(response.headers.get("content-type") || "").startsWith("image/")) {
    failures.push(`${asset}: image HTTP/content-type failure (${response.status})`);
  }
}

if (failures.length) {
  console.error(`[http:check] ${failures.length} issue(s)`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`[http:check] ${routes.length} routes and ${assets.size} rendered image assets returned successfully`);
