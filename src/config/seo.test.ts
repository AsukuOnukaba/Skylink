import { afterEach, describe, expect, it } from "vitest";
import {
  absoluteUrl,
  parseSiteOrigin,
  resolveIndexing,
  robotsContentForPage,
} from "./seo";

const ORIGINAL = { ...process.env };

afterEach(() => {
  for (const key of Object.keys(process.env)) {
    if (!(key in ORIGINAL)) delete process.env[key];
  }
  Object.assign(process.env, ORIGINAL);
  delete process.env.VITE_ALLOW_INDEXING;
  delete process.env.VITE_SITE_URL;
  delete process.env.VERCEL_ENV;
  delete process.env.SKYLINK_FORCE_PRODUCTION_SEO;
  delete process.env.SKYLINK_DEPLOY_ENV;
});

describe("parseSiteOrigin", () => {
  it("accepts a clean https origin and rejects unsafe hosts", () => {
    expect(parseSiteOrigin("https://www.example.com")).toBe(
      "https://www.example.com",
    );
    expect(parseSiteOrigin("https://www.example.com/")).toBe(
      "https://www.example.com",
    );
    expect(parseSiteOrigin("http://www.example.com")).toBeNull();
    expect(parseSiteOrigin("https://localhost")).toBeNull();
    expect(parseSiteOrigin("https://app.vercel.app")).toBeNull();
    expect(parseSiteOrigin("https://www.example.com/path")).toBeNull();
  });
});

describe("resolveIndexing", () => {
  it("defaults to noindex without production configuration", () => {
    const mode = resolveIndexing({ failClosed: false });
    expect(mode.indexingEnabled).toBe(false);
    expect(mode.siteOrigin).toBeNull();
  });

  it("keeps preview noindex even when allow-indexing is set", () => {
    process.env.VERCEL_ENV = "preview";
    process.env.VITE_ALLOW_INDEXING = "true";
    process.env.VITE_SITE_URL = "https://www.example.com";
    const mode = resolveIndexing({ failClosed: false });
    expect(mode.indexingEnabled).toBe(false);
  });

  it("enables indexing only for production + flag + valid origin", () => {
    process.env.SKYLINK_FORCE_PRODUCTION_SEO = "true";
    process.env.VITE_ALLOW_INDEXING = "true";
    process.env.VITE_SITE_URL = "https://www.example.com";
    const mode = resolveIndexing({ failClosed: true });
    expect(mode.indexingEnabled).toBe(true);
    expect(mode.siteOrigin).toBe("https://www.example.com");
    expect(robotsContentForPage(true)).toBe("index, follow");
    expect(absoluteUrl(mode.siteOrigin, "/contact?intent=quote")).toBe(
      "https://www.example.com/contact",
    );
  });

  it("fails closed when production indexing is requested without a valid origin", () => {
    process.env.SKYLINK_FORCE_PRODUCTION_SEO = "true";
    process.env.VITE_ALLOW_INDEXING = "true";
    process.env.VITE_SITE_URL = "";
    expect(() => resolveIndexing({ failClosed: true })).toThrow(/VITE_SITE_URL/);
  });
});
