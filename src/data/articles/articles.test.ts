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

  it("passes the editorial correction quality gate", () => {
    const bannedPublicLanguage = [
      /canonical (page|url|landing)/i,
      /search intent/i,
      /seo opportunit/i,
      /keyword target/i,
      /content cluster/i,
      /invented (statistics|certifications|prices|uptime)/i,
      /vapourware/i,
      /survey quality tracks/i,
      /split sky, wi-fi and power/i,
      /residential roof job with salt spray/i,
      /generation-correct only/i,
      /published url architecture/i,
      /competitor content gap/i,
      /\bcanonical\b/i,
      /\binvented\b/i,
      /published (catalogue|url|service path|page architecture)/i,
      /this article (complements|does not|will not|stays|is not)/i,
      /we (do|will) not (invent|claim|authenticate|publish)/i,
      /without unsupported/i,
      /not a (price table|shopping list|gps product|market-size study|second city landing|residential clone|generic .* template)/i,
      /what we will not/i,
      /unreleased dish from a leaked slide/i,
      /project docs/i,
    ];

    const languageViolations: string[] = [];
    for (const article of publishedArticles()) {
      const blockText = article.blocks
        .flatMap((block) => {
          if (block.type === "ul" || block.type === "ol") return block.items;
          if (block.type === "table") {
            return [...block.headers, ...block.rows.flat()];
          }
          return [block.text];
        })
        .join(" ");
      const publicText = [
        article.title,
        article.seoTitle,
        article.seoDescription,
        article.excerpt,
        article.heroImageAlt,
        blockText,
        article.cta.heading,
        article.cta.description,
        article.cta.label,
      ].join(" ");
      const bodyWords = blockText.trim().split(/\s+/).length;

      expect(article.updated, article.researchId).toBe("2026-11-21");
      expect(article.sources?.length, article.researchId).toBeGreaterThanOrEqual(2);
      expect(
        bodyWords,
        `${article.researchId} article body depth`,
      ).toBeGreaterThanOrEqual(500);
      for (const banned of bannedPublicLanguage) {
        if (banned.test(publicText)) {
          languageViolations.push(`${article.researchId}: ${banned}`);
        }
      }
    }
    expect(languageViolations).toEqual([]);
  });

  it("does not repeat full editorial paragraphs across articles", () => {
    const seen = new Map<string, string>();
    for (const article of publishedArticles()) {
      for (const block of article.blocks) {
        if (block.type !== "p" || block.text.split(/\s+/).length < 25) continue;
        const normalized = block.text.toLowerCase().replace(/\s+/g, " ").trim();
        expect(
          seen.get(normalized),
          `${article.researchId} repeats a paragraph from ${seen.get(normalized)}`,
        ).toBeUndefined();
        seen.set(normalized, article.researchId);
      }
    }
  });
});
