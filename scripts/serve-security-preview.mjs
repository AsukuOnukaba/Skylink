#!/usr/bin/env node
/**
 * Serve dist/spa with the same security headers defined in vercel.json.
 * Used for local CSP / header verification (Vite preview does not apply vercel.json).
 *
 * Usage (after pnpm build):
 *   node scripts/serve-security-preview.mjs
 *   SKYLINK_SECURITY_PORT=4322 node scripts/serve-security-preview.mjs
 */
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist", "spa");
const port = Number(process.env.SKYLINK_SECURITY_PORT || 4322);

if (!existsSync(dist)) {
  console.error("[security:serve] dist/spa missing — run pnpm build first");
  process.exit(1);
}

const config = JSON.parse(readFileSync(path.join(root, "vercel.json"), "utf8"));
const globalHeaders = (
  (config.headers ?? []).find((rule) => rule.source === "/(.*)")?.headers ?? []
).map((header) => [header.key, header.value]);

const assetCache = (
  (config.headers ?? []).find((rule) => rule.source === "/assets/(.*)")
    ?.headers ?? []
).find((header) => header.key === "Cache-Control")?.value;

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  if (clean.includes("\0") || clean.includes("..")) return null;

  if (clean.startsWith("/api/")) return { kind: "api404" };

  const asFile = path.join(dist, clean);
  if (existsSync(asFile) && statSync(asFile).isFile()) {
    return { kind: "file", file: asFile };
  }

  const asIndex = path.join(dist, clean, "index.html");
  if (existsSync(asIndex) && statSync(asIndex).isFile()) {
    return { kind: "file", file: asIndex };
  }

  const notFound = path.join(dist, "404.html");
  if (existsSync(notFound)) return { kind: "notfound", file: notFound };
  return null;
}

const server = createServer((req, res) => {
  const urlPath = req.url || "/";
  const resolved = resolveFile(urlPath);

  for (const [key, value] of globalHeaders) {
    res.setHeader(key, value);
  }

  if (!resolved) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }

  if (resolved.kind === "api404") {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("NOT_FOUND");
    return;
  }

  const ext = path.extname(resolved.file).toLowerCase();
  res.setHeader("Content-Type", types[ext] || "application/octet-stream");
  if (urlPath.startsWith("/assets/") && assetCache) {
    res.setHeader("Cache-Control", assetCache);
  }

  res.statusCode = resolved.kind === "notfound" ? 404 : 200;
  res.end(readFileSync(resolved.file));
});

server.listen(port, "127.0.0.1", () => {
  console.log(`[security:serve] http://127.0.0.1:${port} (headers from vercel.json)`);
});
