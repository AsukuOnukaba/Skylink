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

describe("locations catalogue", () => {
  it("stays empty and unpublished until OD-05", () => {
    expect(locations).toEqual([]);
    expect(publishedLocations()).toEqual([]);
    expect(hasPublishedLocations()).toBe(false);
    expect(publicLocationPaths()).toEqual([]);
    expect(getPublishedLocation("lagos")).toBeUndefined();
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
});
