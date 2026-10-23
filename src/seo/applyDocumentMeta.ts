import {
  absoluteUrl,
  resolveIndexing,
  robotsContentForPage,
} from "@/config/seo";
import type { PageSeoRecord } from "@/seo/pageRegistry";

function upsertMeta(
  attr: "name" | "property",
  key: string,
  content: string | null,
): void {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector);
  if (!content) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string | null): void {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(blocks: Record<string, unknown>[]): void {
  document.head
    .querySelectorAll('script[data-skylink-jsonld="1"]')
    .forEach((node) => node.remove());
  for (const block of blocks) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-skylink-jsonld", "1");
    script.textContent = JSON.stringify(block);
    document.head.appendChild(script);
  }
}

/**
 * Apply page SEO to document.head (client navigation).
 * Canonical and absolute OG URLs are emitted only when indexing is enabled.
 */
export function applyDocumentMeta(page: PageSeoRecord): void {
  const { indexingEnabled, siteOrigin } = resolveIndexing({ failClosed: false });
  const robots = robotsContentForPage(page.indexable);
  const canonical =
    indexingEnabled && siteOrigin
      ? absoluteUrl(siteOrigin, page.path)
      : null;
  const ogImage =
    page.ogImagePath && siteOrigin && indexingEnabled
      ? absoluteUrl(siteOrigin, page.ogImagePath)
      : null;

  document.title = page.title;
  upsertMeta("name", "description", page.description);
  upsertMeta("name", "robots", robots);
  upsertLink("canonical", canonical);

  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:title", page.title);
  upsertMeta("property", "og:description", page.description);
  upsertMeta("property", "og:url", canonical);
  upsertMeta("property", "og:image", ogImage);
  upsertMeta("name", "twitter:card", ogImage ? "summary_large_image" : "summary");
  upsertMeta("name", "twitter:title", page.title);
  upsertMeta("name", "twitter:description", page.description);
  upsertMeta("name", "twitter:image", ogImage);

  upsertJsonLd(page.jsonLd);
}

/** Serialize head tags for prerendered HTML shells. */
export function serializeHeadTags(page: PageSeoRecord): string {
  const { indexingEnabled, siteOrigin } = resolveIndexing({ failClosed: false });
  const robots = robotsContentForPage(page.indexable);
  const canonical =
    indexingEnabled && siteOrigin
      ? absoluteUrl(siteOrigin, page.path)
      : null;
  const ogImage =
    page.ogImagePath && siteOrigin && indexingEnabled
      ? absoluteUrl(siteOrigin, page.ogImagePath)
      : null;

  const escapeAttr = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");

  const parts = [
    `<title>${escapeAttr(page.title)}</title>`,
    `<meta name="description" content="${escapeAttr(page.description)}" />`,
    `<meta name="robots" content="${escapeAttr(robots)}" />`,
  ];
  if (canonical) {
    parts.push(`<link rel="canonical" href="${escapeAttr(canonical)}" />`);
  }
  parts.push(`<meta property="og:type" content="website" />`);
  parts.push(
    `<meta property="og:title" content="${escapeAttr(page.title)}" />`,
  );
  parts.push(
    `<meta property="og:description" content="${escapeAttr(page.description)}" />`,
  );
  if (canonical) {
    parts.push(
      `<meta property="og:url" content="${escapeAttr(canonical)}" />`,
    );
  }
  if (ogImage) {
    parts.push(
      `<meta property="og:image" content="${escapeAttr(ogImage)}" />`,
    );
    parts.push(`<meta name="twitter:card" content="summary_large_image" />`);
    parts.push(
      `<meta name="twitter:image" content="${escapeAttr(ogImage)}" />`,
    );
  } else {
    parts.push(`<meta name="twitter:card" content="summary" />`);
  }
  parts.push(
    `<meta name="twitter:title" content="${escapeAttr(page.title)}" />`,
  );
  parts.push(
    `<meta name="twitter:description" content="${escapeAttr(page.description)}" />`,
  );

  for (const block of page.jsonLd) {
    parts.push(
      `<script type="application/ld+json" data-skylink-jsonld="1">${JSON.stringify(block).replace(/</g, "\\u003c")}</script>`,
    );
  }

  return parts.join("\n    ");
}

export function notFoundHeadTags(): string {
  const title = `Page not found — Skylink`;
  const description =
    "The page you requested is not available. Return home or contact Skylink for Starlink installation help.";
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="noindex, nofollow" />`,
  ].join("\n    ");
}
