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
  it("publishes eight products at the public catalogue prices", () => {
    expect(products).toHaveLength(8);
    expect(publishedProducts()).toHaveLength(8);
    expect(hasPublishedProducts()).toBe(true);
    expect(publicProductPaths()).toHaveLength(8);
    expect(getPublishedProduct("any-kit")).toBeUndefined();
    expect(getPublishedProduct("starlink-mini")?.name).toBe("Starlink Mini");
    const prices: Record<string, number> = {
      "starlink-gen3-standard": 750_000,
      "starlink-flat-high-performance": 4_000_000,
      "starlink-mini": 450_000,
      "starlink-pivot-mount": 150_000,
      "starlink-mesh-router": 250_000,
      "starlink-gen3-45m-cable": 250_000,
      "wireless-long-range-wifi": 150_000,
      "wired-long-range-wifi": 150_000,
    };
    for (const p of products) {
      expect(p.pricePublished).toBe(true);
      expect(p.priceNgn).toBe(prices[p.slug]);
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
      "/images/products/wireless-long-range-repeater.jpeg",
    );
    expect(getPublishedProduct("starlink-mini")?.imageSrc).toBe(
      "/images/products/starlink-mini.jpeg",
    );
    expect(getPublishedProduct("wired-long-range-wifi")?.imageSrc).toBe(
      "/images/products/wired-long-range-wifi.jpeg",
    );
    // No honest photo: mesh file is watermarked and shows the wrong router;
    // the only cable file shows boxed dishes, not a 45 m cable.
    expect(getPublishedProduct("starlink-mesh-router")?.imageSrc).toBeUndefined();
    expect(getPublishedProduct("starlink-gen3-45m-cable")?.imageSrc).toBeUndefined();
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
