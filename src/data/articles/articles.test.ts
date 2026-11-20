import { describe, expect, it } from "vitest";
import {
  getPublishedArticle,
  publishedArticles,
  publicArticlePaths,
} from "./articles";

describe("articles catalogue", () => {
  it("publishes exactly the Phase 2 launch batch of 15 articles", () => {
    const articles = publishedArticles();
    expect(articles).toHaveLength(15);
    expect(new Set(articles.map((a) => a.slug)).size).toBe(15);
    expect(new Set(articles.map((a) => a.researchId)).size).toBe(15);
  });

  it("keeps SEO fields and bodies substantive", () => {
    for (const article of publishedArticles()) {
      expect(article.seoTitle.length).toBeGreaterThan(20);
      expect(article.seoDescription.length).toBeGreaterThan(50);
      expect(article.blocks.length).toBeGreaterThan(5);
      expect(article.relatedServicePaths.length).toBeGreaterThan(0);
      expect(article.cta.to.startsWith("/")).toBe(true);
      expect(article.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("resolves related article slugs", () => {
    const first = getPublishedArticle(
      "starlink-installation-checklist-nigeria",
    );
    expect(first).toBeTruthy();
    for (const slug of first!.relatedArticleSlugs) {
      expect(getPublishedArticle(slug)).toBeTruthy();
    }
  });

  it("exposes public /blog paths for every published article", () => {
    const paths = publicArticlePaths();
    expect(paths).toHaveLength(15);
    expect(paths.every((path) => path.startsWith("/blog/"))).toBe(true);
  });
});
