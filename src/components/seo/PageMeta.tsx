import { useEffect } from "react";

type PageMetaProps = {
  title: string;
  description: string;
};

/**
 * Lightweight document title + meta description for PH-04.
 * Full SEO (canonical, OG, robots per route) remains PH-10.
 */
export function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, [title, description]);

  return null;
}
