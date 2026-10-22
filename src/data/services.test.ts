import { describe, expect, it } from "vitest";
import {
  getPublishedService,
  getServiceDraft,
  publicServicePaths,
  publishedServices,
  services,
} from "./services";

describe("services catalogue", () => {
  it("keeps all draft services unpublished until OD-03", () => {
    expect(services.length).toBeGreaterThanOrEqual(5);
    expect(publishedServices()).toEqual([]);
    expect(services.every((s) => s.published === false)).toBe(true);
    expect(publicServicePaths()).toEqual([]);
  });

  it("does not resolve unpublished or unknown slugs as public services", () => {
    expect(getPublishedService("residential-installation")).toBeUndefined();
    expect(getPublishedService("not-a-real-service")).toBeUndefined();
    expect(getServiceDraft("residential-installation")?.title).toBe(
      "Residential installation",
    );
  });

  it("gives each draft a distinct SEO title and description", () => {
    const titles = services.map((s) => s.seoTitle);
    const descriptions = services.map((s) => s.seoDescription);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });
});
