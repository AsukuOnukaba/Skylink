/**
 * Blog / SEO article catalogue types.
 * Bodies render synchronously for Vite SSR prerender (no async fetch).
 */

export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "note"; text: string };

export type ArticleLink = {
  path: string;
  label: string;
};

export type ArticleRecord = {
  /** Research-bank ID when applicable (e.g. R01). */
  researchId: string;
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  category:
    | "residential"
    | "equipment"
    | "troubleshooting"
    | "business"
    | "local"
    | "maritime"
    | "news"
    | "forecast";
  primaryKeyword: string;
  published: boolean;
  indexable: boolean;
  date: string;
  updated?: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
  blocks: ArticleBlock[];
  relatedServicePaths: ArticleLink[];
  relatedArticleSlugs: string[];
  cta: {
    heading: string;
    description: string;
    to: string;
    label: string;
  };
};

export function p(text: string): ArticleBlock {
  return { type: "p", text };
}

export function h2(text: string): ArticleBlock {
  return { type: "h2", text };
}

export function h3(text: string): ArticleBlock {
  return { type: "h3", text };
}

export function ul(...items: string[]): ArticleBlock {
  return { type: "ul", items };
}

export function ol(...items: string[]): ArticleBlock {
  return { type: "ol", items };
}

export function table(headers: string[], rows: string[][]): ArticleBlock {
  return { type: "table", headers, rows };
}

export function note(text: string): ArticleBlock {
  return { type: "note", text };
}
