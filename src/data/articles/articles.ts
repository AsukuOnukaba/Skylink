import { batch1Articles } from "@/data/articles/articles-batch1";
import { businessArticles } from "@/data/articles/articles-business";
import { equipmentArticles } from "@/data/articles/articles-equipment";
import { localArticles } from "@/data/articles/articles-local";
import { maritimeArticles } from "@/data/articles/articles-maritime";
import { newsForecastArticles } from "@/data/articles/articles-news-forecast";
import { residentialArticles } from "@/data/articles/articles-residential";
import { troubleshootingArticles } from "@/data/articles/articles-troubleshooting";
import type { ArticleRecord } from "@/data/articles/article-types";
import { applyEditorialReview } from "@/data/articles/editorial-review";

const sourceArticles: ArticleRecord[] = [
  ...batch1Articles,
  ...residentialArticles,
  ...equipmentArticles,
  ...troubleshootingArticles,
  ...businessArticles,
  ...localArticles,
  ...maritimeArticles,
  ...newsForecastArticles,
];

const allArticles = sourceArticles.map(applyEditorialReview);

export function publishedArticles(): ArticleRecord[] {
  return allArticles.filter((article) => article.published);
}

export function getPublishedArticle(slug: string): ArticleRecord | undefined {
  return publishedArticles().find((article) => article.slug === slug);
}

export function articlesRelatedTo(
  article: ArticleRecord,
): ArticleRecord[] {
  return article.relatedArticleSlugs
    .map((slug) => getPublishedArticle(slug))
    .filter((item): item is ArticleRecord => Boolean(item));
}

export function articlesForServicePath(path: string): ArticleRecord[] {
  return publishedArticles()
    .filter((article) =>
      article.relatedServicePaths.some((link) => link.path === path),
    )
    .slice(0, 8);
}

export function articlesForLocationKey(placeKey: string): ArticleRecord[] {
  const locationPath = `/starlink-installation-${placeKey}`;
  return publishedArticles()
    .filter((article) =>
      article.relatedServicePaths.some((link) =>
        link.path.startsWith(locationPath),
      ),
    )
    .slice(0, 8);
}

export function hasPublishedArticles(): boolean {
  return publishedArticles().length > 0;
}

export function publicArticlePaths(): string[] {
  return publishedArticles().map((article) => `/blog/${article.slug}`);
}
