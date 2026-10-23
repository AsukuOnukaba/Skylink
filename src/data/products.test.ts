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
  it("publishes eight products without prices", () => {
    expect(products).toHaveLength(8);
    expect(publishedProducts()).toHaveLength(8);
    expect(hasPublishedProducts()).toBe(true);
    expect(publicProductPaths()).toHaveLength(8);
    expect(getPublishedProduct("any-kit")).toBeUndefined();
    expect(getPublishedProduct("starlink-mini")?.name).toBe("Starlink Mini kit");
    for (const p of products) {
      expect(p.pricePublished).toBe(false);
      expect(p.priceNgn).toBeUndefined();
      expect(p.indexable).toBe(true);
    }
  });

  it("wires cleared product photos only where the subject matches the model", () => {
    expect(getPublishedProduct("starlink-gen3-standard")?.imageSrc).toBe(
      "/images/products/starlink-gen3-standard.jpeg",
    );
    expect(getPublishedProduct("starlink-flat-high-performance")?.imageSrc).toBe(
      "/images/products/starlink-flat-high-performance.jpeg",
    );
    expect(getPublishedProduct("starlink-pivot-mount")?.imageSrc).toBe(
      "/images/products/starlink-pivot-mount.jpg",
    );
    expect(getPublishedProduct("wireless-long-range-wifi")?.imageSrc).toBe(
      "/images/products/wireless-long-range-wifi.jpeg",
    );
    // Omitted: no verified Mini, mesh-node, 45 m cable, or wired LR subject photo
    expect(getPublishedProduct("starlink-mini")?.imageSrc).toBeUndefined();
    expect(getPublishedProduct("starlink-mesh-router")?.imageSrc).toBeUndefined();
    expect(getPublishedProduct("starlink-gen3-45m-cable")?.imageSrc).toBeUndefined();
    expect(getPublishedProduct("wired-long-range-wifi")?.imageSrc).toBeUndefined();
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
