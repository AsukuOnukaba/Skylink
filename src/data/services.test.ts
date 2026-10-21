import { describe, expect, it } from "vitest";
import { publishedServices, services } from "./services";

describe("services catalogue", () => {
  it("keeps all draft services unpublished until OD-03", () => {
    expect(services.length).toBeGreaterThan(0);
    expect(publishedServices()).toEqual([]);
    expect(services.every((s) => s.published === false)).toBe(true);
  });
});
