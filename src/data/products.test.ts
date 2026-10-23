import { describe, expect, it } from "vitest";
import {
  getPublishedProduct,
  hasPublishedProducts,
  products,
  publicProductPaths,
  publishedProducts,
} from "./products";
import { services } from "./services";

describe("products catalogue", () => {
  it("publishes eight products without prices or images", () => {
    expect(products).toHaveLength(8);
    expect(publishedProducts()).toHaveLength(8);
    expect(hasPublishedProducts()).toBe(true);
    expect(publicProductPaths()).toHaveLength(8);
    expect(getPublishedProduct("any-kit")).toBeUndefined();
    expect(getPublishedProduct("starlink-mini")?.name).toBe("Starlink Mini kit");
    for (const p of products) {
      expect(p.pricePublished).toBe(false);
      expect(p.priceNgn).toBeUndefined();
      expect(p.imageSrc).toBeUndefined();
      expect(p.indexable).toBe(true);
    }
  });

  it("links only to existing service slugs", () => {
    const serviceSlugs = new Set(services.map((s) => s.slug));
    for (const p of products) {
      for (const slug of p.relatedServiceSlugs) {
        expect(serviceSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("avoids prohibited claims", () => {
    const text = JSON.stringify(products).toLowerCase();
    for (const banned of ["datagram", "₦", "certified", "1000+"]) {
      expect(text.includes(banned)).toBe(false);
    }
  });
});
