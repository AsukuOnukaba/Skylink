import { describe, expect, it } from "vitest";
import { site } from "./site";

describe("site config", () => {
  it("uses the Skylink brand name and no DataGram identity", () => {
    expect(site.brandName).toBe("Skylink");
    expect(site.brandName.toLowerCase()).not.toContain("datagram");
    expect(site.phoneE164).toBe("");
    expect(site.email).toBe("");
  });
});
