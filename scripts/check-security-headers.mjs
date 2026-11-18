#!/usr/bin/env node
/**
 * Validate security headers from vercel.json and optionally against a live origin.
 *
 * Usage:
 *   node scripts/check-security-headers.mjs
 *   SKYLINK_QA_ORIGIN=http://127.0.0.1:4322 node scripts/check-security-headers.mjs
 *   SKYLINK_QA_ORIGIN=https://www.skylink.ng node scripts/check-security-headers.mjs
 *
 * Does not print secrets. Does not mutate production.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(readFileSync(path.join(root, "vercel.json"), "utf8"));
const globalRule = (config.headers ?? []).find((rule) => rule.source === "/(.*)");
if (!globalRule) {
  console.error("[security:headers] missing global /(.*) header rule in vercel.json");
  process.exit(1);
}

const expected = new Map(
  globalRule.headers.map((header) => [header.key.toLowerCase(), header.value]),
);

const requiredKeys = [
  "content-security-policy",
  "x-frame-options",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "access-control-allow-origin",
];

const failures = [];

for (const key of requiredKeys) {
  if (!expected.has(key)) failures.push(`vercel.json missing ${key}`);
}

const csp = expected.get("content-security-policy") ?? "";
if (/unsafe-inline|unsafe-eval/i.test(csp)) {
  failures.push("CSP must not include unsafe-inline or unsafe-eval");
}
if (!csp.includes("frame-ancestors 'none'")) {
  failures.push("CSP must include frame-ancestors 'none'");
}
if (expected.get("access-control-allow-origin") === "*") {
  failures.push("Access-Control-Allow-Origin must not be *");
}
if (expected.has("strict-transport-security")) {
  failures.push(
    "Do not redefine Strict-Transport-Security in vercel.json (preserve platform HSTS)",
  );
}

const origin = (process.env.SKYLINK_QA_ORIGIN || "").replace(/\/$/, "");
const paths = ["/", "/contact", "/services/maritime-offshore", "/products", "/locations"];

if (origin) {
  for (const route of paths) {
    let response;
    try {
      response = await fetch(`${origin}${route}`, { redirect: "follow" });
    } catch (error) {
      failures.push(`${route}: fetch failed (${error instanceof Error ? error.message : "error"})`);
      continue;
    }
    if (!response.ok) {
      failures.push(`${route}: HTTP ${response.status}`);
      continue;
    }
    for (const key of requiredKeys) {
      const actual = response.headers.get(key);
      const want = expected.get(key);
      if (!actual) {
        failures.push(`${route}: missing response header ${key}`);
        continue;
      }
      if (key === "content-security-policy") {
        if (!actual.includes("frame-ancestors 'none'") || /unsafe-inline|unsafe-eval/i.test(actual)) {
          failures.push(`${route}: CSP does not match hardened policy`);
        }
        continue;
      }
      if (actual !== want) {
        failures.push(`${route}: ${key} expected "${want}", got "${actual}"`);
      }
    }
    const acao = response.headers.get("access-control-allow-origin");
    if (acao === "*") {
      failures.push(`${route}: Access-Control-Allow-Origin is still *`);
    }
    // HSTS is platform-managed on production HTTPS; warn only when probing https.
    if (origin.startsWith("https://") && !response.headers.get("strict-transport-security")) {
      failures.push(`${route}: missing platform HSTS on HTTPS response`);
    }
  }
} else {
  console.log(
    "[security:headers] config-only check (set SKYLINK_QA_ORIGIN to probe a server)",
  );
}

if (failures.length) {
  console.error(`[security:headers] ${failures.length} issue(s)`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `[security:headers] ok — ${requiredKeys.length} headers configured${origin ? ` and verified on ${paths.length} routes at ${origin}` : ""}`,
);
