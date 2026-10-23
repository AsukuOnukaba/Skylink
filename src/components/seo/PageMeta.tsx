import { useEffect } from "react";
import { applyDocumentMeta } from "@/seo/applyDocumentMeta";
import {
  getPageByPath,
  type PageSeoRecord,
} from "@/seo/pageRegistry";

type PageMetaProps = {
  /** Canonical path without query string, e.g. `/contact`. */
  path: string;
  /** Optional overrides when a page is not in the registry (e.g. 404). */
  title?: string;
  description?: string;
  indexable?: boolean;
  jsonLd?: Record<string, unknown>[];
};

/**
 * Document title, description, robots, canonical, OG, and JSON-LD.
 * Uses the page registry when available so prerender and client stay aligned.
 */
export function PageMeta({
  path,
  title,
  description,
  indexable = false,
  jsonLd = [],
}: PageMetaProps) {
  useEffect(() => {
    const registered = getPageByPath(path);
    const page: PageSeoRecord =
      registered ??
      ({
        path,
        title: title ?? "Skylink",
        description: description ?? "",
        prerender: false,
        indexable,
        jsonLd,
      } satisfies PageSeoRecord);

    if (!registered && title && description) {
      page.title = title;
      page.description = description;
      page.indexable = indexable;
      page.jsonLd = jsonLd;
    }

    applyDocumentMeta(page);
  }, [path, title, description, indexable, jsonLd]);

  return null;
}
