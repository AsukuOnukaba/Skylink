import { describe, expect, it } from "vitest";
import {
  appRoutes,
  footerExploreRoutes,
  footerLegalRoutes,
  getAppRoutes,
  primaryNavRoutes,
} from "./routes";

describe("route registry", () => {
  it("exposes products and locations in nav when catalogues are published", () => {
    const paths = primaryNavRoutes.map((r) => r.path);
    expect(paths).toEqual([
      "/services",
      "/products",
      "/locations",
      "/about",
      "/contact",
    ]);
    expect(getAppRoutes().map((r) => r.path)).toContain("/products");
    expect(getAppRoutes().map((r) => r.path)).toContain("/locations");
  });

  it("registers static utility pages for footer legal links", () => {
    const legal = footerLegalRoutes.map((r) => r.path);
    expect(legal).toEqual(["/faq", "/privacy", "/terms"]);
    expect(footerExploreRoutes.map((r) => r.path)).toContain("/services");
    expect(footerExploreRoutes.map((r) => r.path)).toContain("/products");
    expect(footerExploreRoutes.map((r) => r.path)).toContain("/locations");
    expect(appRoutes.some((r) => r.path === "/")).toBe(true);
  });
});
