import { describe, expect, it } from "vitest";
import { articleJsonLd } from "@/seo/jsonLd";
import {
  getPublishedArticle,
  publishedArticles,
  publicArticlePaths,
} from "./articles";

const CATEGORY_TARGETS: Record<string, number> = {
  residential: 20,
  equipment: 15,
  troubleshooting: 15,
  business: 15,
  local: 10,
  maritime: 10,
  news: 10,
  forecast: 5,
};

describe("articles catalogue", () => {
  it("publishes 100 unique research IDs and slugs", () => {
    const articles = publishedArticles();
    expect(articles).toHaveLength(100);
    expect(new Set(articles.map((a) => a.slug)).size).toBe(100);
    expect(new Set(articles.map((a) => a.researchId)).size).toBe(100);
    expect(articles.every((a) => a.indexable)).toBe(true);
  });

  it("matches the research-bank category allocation", () => {
    const counts: Record<string, number> = {};
    for (const article of publishedArticles()) {
      counts[article.category] = (counts[article.category] ?? 0) + 1;
    }
    expect(counts).toEqual(CATEGORY_TARGETS);
  });

  it("keeps SEO fields and bodies substantive", () => {
    for (const article of publishedArticles()) {
      expect(article.seoTitle.length).toBeGreaterThan(20);
      expect(article.seoDescription.length).toBeGreaterThan(50);
      expect(article.blocks.length).toBeGreaterThan(5);
      expect(article.relatedServicePaths.length).toBeGreaterThan(0);
      expect(article.cta.to.startsWith("/")).toBe(true);
      expect(article.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(article.heroImageSrc?.startsWith("/images/")).toBe(true);
      expect((article.heroImageAlt ?? "").length).toBeGreaterThan(8);
    }
  });

  it("resolves related article slugs for every article", () => {
    for (const article of publishedArticles()) {
      expect(article.relatedArticleSlugs.length).toBeGreaterThan(0);
      for (const slug of article.relatedArticleSlugs) {
        expect(
          getPublishedArticle(slug),
          `${article.researchId} related ${slug}`,
        ).toBeTruthy();
        expect(slug).not.toBe(article.slug);
      }
    }
  });

  it("exposes public /blog paths for every published article", () => {
    const paths = publicArticlePaths();
    expect(paths).toHaveLength(100);
    expect(paths.every((path) => path.startsWith("/blog/"))).toBe(true);
    expect(new Set(paths).size).toBe(100);
  });

  it("emits Article JSON-LD with dates and canonical URL", () => {
    const article = getPublishedArticle(
      "starlink-installation-checklist-nigeria",
    )!;
    const json = articleJsonLd(
      article,
      "https://www.skylink.ng/blog/starlink-installation-checklist-nigeria",
    );
    expect(json["@type"]).toBe("Article");
    expect(json.datePublished).toBe(article.date);
    expect(json.dateModified).toBe(article.updated ?? article.date);
    expect(json.url).toBe(
      "https://www.skylink.ng/blog/starlink-installation-checklist-nigeria",
    );
  });
});
