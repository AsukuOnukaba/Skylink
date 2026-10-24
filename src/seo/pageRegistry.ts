import { site } from "@/config/site";
import { absoluteUrl, resolveIndexing } from "@/config/seo";
import {
  publishedLocations,
  type LocationRecord,
} from "@/data/locations";
import {
  publishedProducts,
  type ProductRecord,
} from "@/data/products";
import {
  publishedServices,
  type ServiceRecord,
} from "@/data/services";
import {
  breadcrumbJsonLd,
  locationServiceJsonLd,
  organizationJsonLd,
  productJsonLd,
  serviceJsonLd,
  webSiteJsonLd,
  type BreadcrumbItem,
} from "@/seo/jsonLd";

export type PageSeoRecord = {
  path: string;
  title: string;
  description: string;
  /** Prerender this path into static HTML. */
  prerender: boolean;
  /** Page-level indexability (still gated by global indexing mode). */
  indexable: boolean;
  /** Site-relative image path for OG when cleared assets exist. */
  ogImagePath?: string;
  breadcrumbs?: BreadcrumbItem[];
  jsonLd: Record<string, unknown>[];
};

function crumb(name: string, path?: string, origin?: string | null): BreadcrumbItem {
  if (path && origin) {
    return { name, item: absoluteUrl(origin, path) ?? undefined };
  }
  if (path === "/" && origin) {
    return { name, item: `${origin}/` };
  }
  return { name, item: path && origin ? absoluteUrl(origin, path) ?? undefined : undefined };
}

function staticPage(
  path: string,
  title: string,
  description: string,
  options?: {
    indexable?: boolean;
    ogImagePath?: string;
    breadcrumbs?: BreadcrumbItem[];
    jsonLd?: Record<string, unknown>[];
  },
): PageSeoRecord {
  return {
    path,
    title,
    description,
    prerender: true,
    indexable: options?.indexable !== false,
    ogImagePath: options?.ogImagePath,
    breadcrumbs: options?.breadcrumbs,
    jsonLd: options?.jsonLd ?? [],
  };
}

/**
 * All public pages eligible for prerender and (when indexable) the sitemap.
 * Built from live catalogue helpers — not a hand-maintained stale path list.
 */
export function listPublicPages(): PageSeoRecord[] {
  const { siteOrigin } = resolveIndexing({ failClosed: false });
  const pages: PageSeoRecord[] = [];

  pages.push(
    staticPage(
      "/",
      `${site.brandName} — Starlink for vessels and offshore sites`,
      `${site.brandName} plans Starlink connectivity for boats, work vessels, and offshore sites in Nigeria, and still installs for offices and homes. Contact for current reach options.`,
      {
        ogImagePath: "/images/hero-maritime-vessel.jpeg",
        jsonLd: [organizationJsonLd(siteOrigin), webSiteJsonLd(siteOrigin)],
      },
    ),
  );

  pages.push(
    staticPage(
      "/services",
      `Starlink installation services — ${site.brandName}`,
      `Offshore and maritime Starlink work comes first, followed by offices, homes, and the rest of the ${site.brandName} service list.`,
      {
        breadcrumbs: [
          crumb("Home", "/", siteOrigin),
          crumb("Services"),
        ],
      },
    ),
  );

  for (const service of publishedServices()) {
    pages.push(servicePage(service, siteOrigin));
  }

  pages.push(
    staticPage(
      "/products",
      `Starlink hardware and accessories — ${site.brandName}`,
      `${site.brandName} helps you understand Starlink-related hardware. Browse listed products when available, or use Contact for the next available step.`,
      {
        breadcrumbs: [
          crumb("Home", "/", siteOrigin),
          crumb("Products"),
        ],
      },
    ),
  );

  for (const product of publishedProducts()) {
    pages.push(productPage(product, siteOrigin));
  }

  pages.push(
    staticPage(
      "/locations",
      `Starlink installation areas — ${site.brandName}`,
      `${site.brandName} lists installation areas when local service details are confirmed. Browse places here, or use Contact for the next available step.`,
      {
        breadcrumbs: [
          crumb("Home", "/", siteOrigin),
          crumb("Service areas"),
        ],
      },
    ),
  );

  for (const place of publishedLocations()) {
    pages.push(locationPage(place, siteOrigin));
  }

  pages.push(
    staticPage(
      "/about",
      `About ${site.brandName} — Starlink installation business`,
      `${site.relationshipPhrase} ${site.brandName} leads with Starlink connectivity for vessels and offshore sites, and still installs for offices and homes in Nigeria.`,
      {
        breadcrumbs: [
          crumb("Home", "/", siteOrigin),
          crumb("About"),
        ],
      },
    ),
  );

  pages.push(
    staticPage(
      "/contact",
      `Contact ${site.brandName} — Starlink installation enquiries`,
      `Reach ${site.brandName} about Starlink connectivity for vessels, offshore sites, offices, and homes. Contact for current reach options.`,
      {
        breadcrumbs: [
          crumb("Home", "/", siteOrigin),
          crumb("Contact"),
        ],
      },
    ),
  );

  pages.push(
    staticPage(
      "/faq",
      `FAQ — ${site.brandName} Starlink installation`,
      `Answers about ${site.brandName}, Starlink installation support, and how to get in touch. Only verified questions are listed.`,
      {
        breadcrumbs: [
          crumb("Home", "/", siteOrigin),
          crumb("FAQ"),
        ],
      },
    ),
  );

  pages.push(
    staticPage(
      "/guide/starlink-nigeria",
      `Starlink in Nigeria — a practical guide | ${site.brandName}`,
      `Sky view, power, Wi-Fi, failover, and plan class for Starlink in Nigeria. Hardware prices stay on the product pages.`,
      {
        ogImagePath: "/images/service-residential-installation.jpeg",
        breadcrumbs: [
          crumb("Home", "/", siteOrigin),
          crumb("Nigeria guide"),
        ],
      },
    ),
  );

  pages.push(
    staticPage(
      "/support",
      `Support — ${site.brandName}`,
      `Preparation notes, links to the FAQ and Nigeria guide, and the published phone, WhatsApp, and email channels.`,
      {
        breadcrumbs: [
          crumb("Home", "/", siteOrigin),
          crumb("Support"),
        ],
      },
    ),
  );

  pages.push(
    staticPage(
      "/our-work",
      `Installation examples — ${site.brandName}`,
      `Field photographs from the DataGram installation library, shown with permission and not presented as Skylink case studies.`,
      {
        breadcrumbs: [
          crumb("Home", "/", siteOrigin),
          crumb("Installation examples"),
        ],
      },
    ),
  );

  pages.push(
    staticPage(
      "/gallery",
      `Installation gallery — ${site.brandName}`,
      `Installation photographs with captions limited to what the source actually identifies.`,
      {
        breadcrumbs: [
          crumb("Home", "/", siteOrigin),
          crumb("Gallery"),
        ],
      },
    ),
  );

  pages.push(
    staticPage(
      "/privacy",
      `Privacy — ${site.brandName}`,
      `How ${site.brandName} handles information on this website, including contact channels and analytics when they are active.`,
      {
        breadcrumbs: [
          crumb("Home", "/", siteOrigin),
          crumb("Privacy"),
        ],
      },
    ),
  );

  pages.push(
    staticPage(
      "/terms",
      `Terms of use — ${site.brandName}`,
      `Website terms for ${site.brandName}. Installation work is confirmed separately from browsing this site.`,
      {
        breadcrumbs: [
          crumb("Home", "/", siteOrigin),
          crumb("Terms"),
        ],
      },
    ),
  );

  return pages;
}

function servicePage(
  service: ServiceRecord,
  siteOrigin: string | null,
): PageSeoRecord {
  const path = `/services/${service.slug}`;
  const pageUrl = absoluteUrl(siteOrigin, path);
  const crumbs: BreadcrumbItem[] = [
    crumb("Home", "/", siteOrigin),
    crumb("Services", "/services", siteOrigin),
    crumb(service.title),
  ];
  const jsonLd: Record<string, unknown>[] = [];
  const breadcrumb = breadcrumbJsonLd(crumbs);
  if (breadcrumb) jsonLd.push(breadcrumb);
  jsonLd.push(serviceJsonLd(service, pageUrl));

  return {
    path,
    title: service.seoTitle,
    description: service.seoDescription,
    prerender: true,
    indexable: service.indexable,
    ogImagePath: service.imageSrc,
    breadcrumbs: crumbs,
    jsonLd,
  };
}

function productPage(
  product: ProductRecord,
  siteOrigin: string | null,
): PageSeoRecord {
  const path = `/products/${product.slug}`;
  const pageUrl = absoluteUrl(siteOrigin, path);
  const imageUrl =
    product.imageSrc && siteOrigin
      ? absoluteUrl(siteOrigin, product.imageSrc)
      : null;
  const crumbs: BreadcrumbItem[] = [
    crumb("Home", "/", siteOrigin),
    crumb("Products", "/products", siteOrigin),
    crumb(product.name),
  ];
  const jsonLd: Record<string, unknown>[] = [];
  const breadcrumb = breadcrumbJsonLd(crumbs);
  if (breadcrumb) jsonLd.push(breadcrumb);
  jsonLd.push(productJsonLd(product, pageUrl, imageUrl));

  return {
    path,
    title: product.seoTitle,
    description: product.seoDescription,
    prerender: true,
    indexable: product.indexable,
    ogImagePath: product.imageSrc,
    breadcrumbs: crumbs,
    jsonLd,
  };
}

function locationPage(
  place: LocationRecord,
  siteOrigin: string | null,
): PageSeoRecord {
  const path = `/starlink-installation-${place.placeKey}`;
  const pageUrl = absoluteUrl(siteOrigin, path);
  const crumbs: BreadcrumbItem[] = [
    crumb("Home", "/", siteOrigin),
    crumb("Service areas", "/locations", siteOrigin),
    crumb(place.placeName),
  ];
  const jsonLd: Record<string, unknown>[] = [];
  const breadcrumb = breadcrumbJsonLd(crumbs);
  if (breadcrumb) jsonLd.push(breadcrumb);
  jsonLd.push(locationServiceJsonLd(place, pageUrl));

  return {
    path,
    title: place.seoTitle,
    description: place.seoDescription,
    prerender: true,
    indexable: place.indexable,
    breadcrumbs: crumbs,
    jsonLd,
  };
}

export function getPageByPath(pathname: string): PageSeoRecord | undefined {
  const clean = pathname.split("?")[0]?.split("#")[0] ?? pathname;
  const normalized = clean === "/" ? "/" : clean.replace(/\/+$/, "");
  return listPublicPages().find((page) => page.path === normalized);
}

/** Paths written as static HTML during the SEO generate step. */
export function prerenderPaths(): string[] {
  return listPublicPages()
    .filter((page) => page.prerender)
    .map((page) => page.path);
}

/** Absolute sitemap URLs when global indexing is enabled. */
export function sitemapEntries(): string[] {
  const { indexingEnabled, siteOrigin } = resolveIndexing({ failClosed: false });
  if (!indexingEnabled || !siteOrigin) return [];
  return listPublicPages()
    .filter((page) => page.prerender && page.indexable)
    .map((page) => absoluteUrl(siteOrigin, page.path))
    .filter((url): url is string => Boolean(url));
}

export function buildRobotsTxt(): string {
  const { indexingEnabled, siteOrigin } = resolveIndexing({ failClosed: false });
  const lines = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "",
  ];
  if (indexingEnabled && siteOrigin) {
    lines.push(`Sitemap: ${siteOrigin}/sitemap.xml`, "");
  } else {
    lines.push(
      "# Sitemap omitted: production indexing is not enabled (OD-10 / VITE_ALLOW_INDEXING).",
      "",
    );
  }
  return lines.join("\n");
}

export function buildSitemapXml(): string | null {
  const entries = sitemapEntries();
  if (entries.length === 0) return null;
  const urls = entries
    .map(
      (loc) =>
        `  <url>\n    <loc>${loc.replace(/&/g, "&amp;")}</loc>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
