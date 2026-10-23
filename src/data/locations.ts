/**
 * Location catalogue. Publish only when OD-05 supplies real localContext.
 * Canonical detail URL: `/starlink-installation-{placeKey}` (never `/locations/{place}`).
 */

export type LocationFaq = {
  question: string;
  answer: string;
};

export type LocationRecord = {
  placeKey: string;
  placeName: string;
  regionLabel: string;
  headline: string;
  intro: string;
  /** Required non-empty before published may be true. */
  localContext: string;
  relatedServiceSlugs: string[];
  faqs: LocationFaq[];
  seoTitle: string;
  seoDescription: string;
  published: boolean;
  indexable: boolean;
};

/**
 * Empty until OD-05 approves places with real local substance.
 * Do not invent city pages or copy DataGram location landings.
 */
export const locations: LocationRecord[] = [];

export function isPublishableLocation(record: LocationRecord): boolean {
  return record.published && record.localContext.trim().length > 0;
}

export function publishedLocations(): LocationRecord[] {
  return locations.filter(isPublishableLocation);
}

export function getPublishedLocation(
  placeKey: string,
): LocationRecord | undefined {
  return locations.find(
    (l) => l.placeKey === placeKey && isPublishableLocation(l),
  );
}

export function hasPublishedLocations(): boolean {
  return publishedLocations().length > 0;
}

export function publicLocationPaths(): string[] {
  return publishedLocations().map(
    (l) => `/starlink-installation-${l.placeKey}`,
  );
}
