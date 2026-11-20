import { batch1Articles } from "@/data/articles/articles-batch1";
import type { ArticleRecord } from "@/data/articles/article-types";

const allArticles: ArticleRecord[] = [...batch1Articles];

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
  return publishedArticles().filter((article) =>
    article.relatedServicePaths.some((link) => link.path === path),
  );
}

export function articlesForLocationKey(placeKey: string): ArticleRecord[] {
  const locationPath = `/starlink-installation-${placeKey}`;
  return publishedArticles().filter((article) =>
    article.relatedServicePaths.some((link) =>
      link.path.startsWith(locationPath),
    ),
  );
}

export function hasPublishedArticles(): boolean {
  return publishedArticles().length > 0;
}

export function publicArticlePaths(): string[] {
  return publishedArticles().map((article) => `/blog/${article.slug}`);
}
