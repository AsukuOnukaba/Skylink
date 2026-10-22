/**
 * Product catalogue. Populate and publish only when OD-04 confirms inventory.
 * No cart, checkout, or Offer/price claims until pricePublished is explicitly true.
 */

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductRecord = {
  slug: string;
  name: string;
  manufacturer: string;
  shortDescription: string;
  description: string;
  specs: ProductSpec[];
  whatsInBox: string[];
  /** Public path in image manifest, when a cleared product photo exists. */
  imageSrc?: string;
  imageAlt?: string;
  /** Only show a numeric price when pricePublished is true. */
  priceNgn?: number;
  pricePublished: boolean;
  availabilityNote: string;
  relatedServiceSlugs: string[];
  seoTitle: string;
  seoDescription: string;
  published: boolean;
  indexable: boolean;
};

/**
 * Empty until OD-04 approves named products. Do not copy DataGram catalogue rows.
 */
export const products: ProductRecord[] = [];

export function publishedProducts(): ProductRecord[] {
  return products.filter((p) => p.published);
}

export function getPublishedProduct(slug: string): ProductRecord | undefined {
  return products.find((p) => p.slug === slug && p.published);
}

export function hasPublishedProducts(): boolean {
  return publishedProducts().length > 0;
}

/** Public detail paths for published products only. */
export function publicProductPaths(): string[] {
  return publishedProducts().map((p) => `/products/${p.slug}`);
}
