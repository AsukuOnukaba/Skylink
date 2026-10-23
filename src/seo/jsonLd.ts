import type { LocationRecord } from "@/data/locations";
import type { ProductRecord } from "@/data/products";
import type { ServiceRecord } from "@/data/services";
import { site } from "@/config/site";

export type BreadcrumbItem = {
  name: string;
  /** Absolute or path URL; omitted for the current page crumb when unknown. */
  item?: string;
};

export function organizationJsonLd(siteOrigin: string | null): Record<string, unknown> {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brandName,
    description: site.relationshipPhrase,
  };
  if (siteOrigin) {
    data.url = `${siteOrigin}/`;
    data.logo = `${siteOrigin}/brand/skylink-logo-primary.png`;
  }
  return data;
}

export function webSiteJsonLd(siteOrigin: string | null): Record<string, unknown> {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.brandName,
    description: site.relationshipPhrase,
  };
  if (siteOrigin) {
    data.url = `${siteOrigin}/`;
    data.publisher = {
      "@type": "Organization",
      name: site.brandName,
      url: `${siteOrigin}/`,
    };
  }
  return data;
}

export function breadcrumbJsonLd(
  items: BreadcrumbItem[],
): Record<string, unknown> | null {
  if (items.length < 2) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => {
      const entry: Record<string, unknown> = {
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
      };
      if (crumb.item) entry.item = crumb.item;
      return entry;
    }),
  };
}

export function serviceJsonLd(
  service: ServiceRecord,
  pageUrl: string | null,
): Record<string, unknown> {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    provider: {
      "@type": "Organization",
      name: site.brandName,
    },
    areaServed: {
      "@type": "Country",
      name: "Nigeria",
    },
  };
  if (pageUrl) data.url = pageUrl;
  return data;
}

/**
 * Product JSON-LD without Offer/price/availability claims unless pricePublished.
 */
export function productJsonLd(
  product: ProductRecord,
  pageUrl: string | null,
  imageUrl: string | null,
): Record<string, unknown> {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    brand: {
      "@type": "Brand",
      name: product.manufacturer,
    },
  };
  if (pageUrl) data.url = pageUrl;
  if (imageUrl) data.image = [imageUrl];
  // Intentionally omit Offer until pricePublished is true with a confirmed price.
  return data;
}

export function locationServiceJsonLd(
  place: LocationRecord,
  pageUrl: string | null,
): Record<string, unknown> {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: place.headline,
    description: place.intro,
    provider: {
      "@type": "Organization",
      name: site.brandName,
    },
    areaServed: {
      "@type": "Place",
      name: `${place.placeName}, ${place.regionLabel}`,
    },
  };
  if (pageUrl) data.url = pageUrl;
  return data;
}
