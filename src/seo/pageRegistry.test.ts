import { afterEach, describe, expect, it } from "vitest";
import {
  buildRobotsTxt,
  buildSitemapXml,
  listPublicPages,
  prerenderPaths,
  sitemapEntries,
} from "./pageRegistry";

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
});

describe("pageRegistry", () => {
  it("prerenders published routes and excludes drafts and /dev/brand", () => {
    const paths = prerenderPaths();
    expect(paths).toContain("/");
    expect(paths).toContain("/services/residential-installation");
    expect(paths).toContain("/products/starlink-mini");
    expect(paths).toContain("/starlink-installation-lagos");
    expect(paths).toContain("/starlink-installation-owerri");
    expect(paths).toContain("/guide/starlink-nigeria");
    expect(paths).toContain("/services/sales-installation");
    expect(paths).not.toContain("/dev/brand");
    expect(paths).not.toContain("/contact?intent=quote");
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("omits sitemap output while indexing is disabled", () => {
    expect(sitemapEntries()).toEqual([]);
    expect(buildSitemapXml()).toBeNull();
    const robots = buildRobotsTxt();
    expect(robots).toContain("Disallow: /api/");
    expect(robots).not.toContain("Sitemap:");
  });

  it("builds a production sitemap only for published indexable pages", () => {
    process.env.SKYLINK_FORCE_PRODUCTION_SEO = "true";
    process.env.VITE_ALLOW_INDEXING = "true";
    process.env.VITE_SITE_URL = "https://www.example.com";

    const entries = sitemapEntries();
    expect(entries.length).toBeGreaterThan(10);
    expect(entries.every((url) => url.startsWith("https://www.example.com"))).toBe(
      true,
    );
    expect(entries).toContain("https://www.example.com/");
    expect(entries).toContain(
      "https://www.example.com/services/residential-installation",
    );
    expect(entries).toContain(
      "https://www.example.com/starlink-installation-owerri",
    );
    expect(entries.join("\n")).not.toMatch(/localhost|vercel\.app/i);

    const xml = buildSitemapXml();
    expect(xml).toContain("<urlset");
    expect(xml).toContain("<loc>https://www.example.com/</loc>");

    const robots = buildRobotsTxt();
    expect(robots).toContain("Sitemap: https://www.example.com/sitemap.xml");

    const pages = listPublicPages();
    expect(pages.every((p) => p.title.length > 5 && p.description.length > 20)).toBe(
      true,
    );
  });
});
