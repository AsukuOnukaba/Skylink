import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

type HeaderRule = {
  source: string;
  headers: Array<{ key: string; value: string }>;
};

describe("vercel.json security headers (PH-13B / Run 2)", () => {
  const config = JSON.parse(
    readFileSync(path.join(root, "vercel.json"), "utf8"),
  ) as {
    headers: HeaderRule[];
  };

  const globalRule = config.headers.find((rule) => rule.source === "/(.*)");
  const headerMap = new Map(
    (globalRule?.headers ?? []).map((header) => [
      header.key.toLowerCase(),
      header.value,
    ]),
  );

  it("defines a global security header rule", () => {
    expect(globalRule).toBeTruthy();
  });

  it("sets CSP without unsafe-inline or unsafe-eval", () => {
    const csp = headerMap.get("content-security-policy") ?? "";
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("script-src 'self'");
    expect(csp).toContain("https://www.googletagmanager.com");
    expect(csp).toContain("https://www.google-analytics.com");
    expect(csp).toContain("connect-src 'self'");
    expect(csp).toContain("style-src 'self'");
    expect(csp).toContain("font-src 'self'");
    expect(csp).toContain("upgrade-insecure-requests");
    expect(csp.toLowerCase()).not.toContain("unsafe-inline");
    expect(csp.toLowerCase()).not.toContain("unsafe-eval");
  });

  it("sets framing, sniffing, referrer, and permissions policies", () => {
    expect(headerMap.get("x-frame-options")).toBe("DENY");
    expect(headerMap.get("x-content-type-options")).toBe("nosniff");
    expect(headerMap.get("referrer-policy")).toBe(
      "strict-origin-when-cross-origin",
    );
    expect(headerMap.get("permissions-policy")).toContain("camera=()");
    expect(headerMap.get("permissions-policy")).toContain("geolocation=()");
  });

  it("overrides Vercel static ACAO * with the current www origin", () => {
    expect(headerMap.get("access-control-allow-origin")).toBe(
      "https://www.skylink.ng",
    );
    expect(headerMap.get("access-control-allow-origin")).not.toBe("*");
  });

  it("does not duplicate or redefine HSTS (platform-managed)", () => {
    expect(headerMap.has("strict-transport-security")).toBe(false);
  });

  it("keeps immutable caching for hashed assets", () => {
    const assets = config.headers.find(
      (rule) => rule.source === "/assets/(.*)",
    );
    const cache = assets?.headers.find(
      (header) => header.key === "Cache-Control",
    );
    expect(cache?.value).toContain("immutable");
  });
});

describe("source tree CSP readiness", () => {
  it("does not use React style= attributes that would force style-src unsafe-inline", () => {
    const floating = readFileSync(
      path.join(root, "src/components/contact/FloatingContact.tsx"),
      "utf8",
    );
    expect(floating).not.toMatch(/style=\{\{/);
  });
});
