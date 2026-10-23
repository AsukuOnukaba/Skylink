import { describe, expect, it } from "vitest";
import {
  getPublishedLocation,
  hasPublishedLocations,
  isPublishableLocation,
  locations,
  publicLocationPaths,
  publishedLocations,
  type LocationRecord,
} from "./locations";
import { services } from "./services";

describe("locations catalogue", () => {
  it("publishes four places and keeps five drafts unpublished", () => {
    expect(locations).toHaveLength(9);
    expect(publishedLocations().map((l) => l.placeKey)).toEqual([
      "abuja",
      "lagos",
      "port-harcourt",
      "niger-delta",
    ]);
    expect(hasPublishedLocations()).toBe(true);
    expect(publicLocationPaths()).toContain("/starlink-installation-abuja");
    expect(getPublishedLocation("lagos")?.placeName).toBe("Lagos");
    expect(getPublishedLocation("owerri")).toBeUndefined();
    for (const l of locations.filter((l) => !l.published)) {
      expect(l.indexable).toBe(false);
      expect(l.localContext.trim().length).toBeGreaterThan(0);
    }
  });

  it("requires non-empty localContext before a place is publishable", () => {
    const thin: LocationRecord = {
      placeKey: "lagos",
      placeName: "Lagos",
      regionLabel: "South West",
      headline: "Starlink installation in Lagos",
      intro: "Generic intro",
      localContext: "   ",
      relatedServiceSlugs: [],
      faqs: [],
      seoTitle: "Lagos",
      seoDescription: "Lagos",
      published: true,
      indexable: true,
    };
    expect(isPublishableLocation(thin)).toBe(false);
    expect(
      isPublishableLocation({
        ...thin,
        localContext: "Estate access and roof mounting rules vary by compound.",
      }),
    ).toBe(true);
  });

  it("links only to existing service slugs and avoids prohibited claims", () => {
    const serviceSlugs = new Set(services.map((s) => s.slug));
    for (const l of locations) {
      for (const slug of l.relatedServiceSlugs) {
        expect(serviceSlugs.has(slug)).toBe(true);
      }
    }
    const text = JSON.stringify(locations).toLowerCase();
    for (const banned of ["datagram", "₦", "certified", "1000+"]) {
      expect(text.includes(banned)).toBe(false);
    }
  });
});
