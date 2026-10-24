import { describe, expect, it } from "vitest";
import { products } from "./products";
import {
  getPublishedService,
  getServiceDraft,
  publicServicePaths,
  publishedServices,
  services,
} from "./services";

describe("services catalogue", () => {
  it("publishes the eight confirmed services", () => {
    expect(services).toHaveLength(21);
    expect(publishedServices()).toHaveLength(21);
    expect(publicServicePaths()).toContain("/services/sales-installation");
    expect(publicServicePaths()).toContain("/services/boat-installation");
    expect(publicServicePaths()).toContain("/services/estate-wifi");
    expect(services.every((s) => s.published && s.indexable)).toBe(true);
    expect(publicServicePaths()).toContain("/services/long-range-wifi");
    expect(publicServicePaths()).toContain("/services/wisp-setup");
  });

  it("does not resolve unknown slugs as public services", () => {
    expect(getPublishedService("not-a-real-service")).toBeUndefined();
    expect(getPublishedService("residential-installation")?.title).toBe(
      "Residential installation",
    );
    expect(getServiceDraft("residential-installation")?.title).toBe(
      "Residential installation",
    );
  });

  it("gives each service a distinct SEO title and description", () => {
    const titles = services.map((s) => s.seoTitle);
    const descriptions = services.map((s) => s.seoDescription);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("links only to existing product slugs", () => {
    const productSlugs = new Set(products.map((p) => p.slug));
    for (const s of services) {
      for (const slug of s.relatedProductSlugs) {
        expect(productSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("avoids prohibited claims", () => {
    const text = JSON.stringify(services).toLowerCase();
    for (const banned of ["datagram", "₦", "certified", "1000+"]) {
      expect(text.includes(banned)).toBe(false);
    }
  });

  it("gives every published service a cleared illustrative image", () => {
    for (const s of publishedServices()) {
      expect(s.imageSrc, s.slug).toMatch(/^\/images\/service-/);
      expect(s.imageAlt?.length, s.slug).toBeGreaterThan(20);
      expect(s.imageAlt?.toLowerCase() ?? "").not.toMatch(
        /skylink (completed|installed|project|customer)/i,
      );
    }
    const srcs = publishedServices().map((s) => s.imageSrc);
    expect(new Set(srcs).size).toBe(srcs.length);
  });
});
