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
  it("publishes the non-blog location catalogue", () => {
    expect(publishedLocations().map((l) => l.placeKey)).toEqual([
      "abuja",
      "lagos",
      "port-harcourt",
      "niger-delta",
      "owerri",
      "enugu",
      "benin-city",
      "delta",
      "yenagoa",
      "abia",
      "anambra",
      "ebonyi",
    ]);
    expect(hasPublishedLocations()).toBe(true);
    expect(publicLocationPaths()).toContain("/starlink-installation-abuja");
    expect(publicLocationPaths()).toContain("/starlink-installation-owerri");
    expect(getPublishedLocation("lagos")?.placeName).toBe("Lagos");
    expect(getPublishedLocation("delta")?.placeName).toBe("Delta State");
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
