import { describe, expect, it } from "vitest";
import {
  appRoutes,
  footerExploreRoutes,
  footerLegalRoutes,
  primaryNavRoutes,
} from "./routes";

describe("route registry", () => {
  it("exposes primary nav without products or locations until published", () => {
    const paths = primaryNavRoutes.map((r) => r.path);
    expect(paths).toEqual(["/services", "/about", "/contact"]);
    expect(paths).not.toContain("/products");
    expect(paths).not.toContain("/locations");
  });

  it("registers static utility pages for footer legal links", () => {
    const legal = footerLegalRoutes.map((r) => r.path);
    expect(legal).toEqual(["/faq", "/privacy", "/terms"]);
    expect(footerExploreRoutes.map((r) => r.path)).toContain("/services");
    expect(appRoutes.some((r) => r.path === "/")).toBe(true);
  });
});
