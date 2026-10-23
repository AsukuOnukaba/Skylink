import { describe, expect, it } from "vitest";
import {
  hasAnyPublicContactChannel,
  hasPublicPhone,
  site,
} from "./site";

describe("site config", () => {
  it("uses the Skylink brand name and no DataGram identity", () => {
    expect(site.brandName).toBe("Skylink");
    expect(site.brandName.toLowerCase()).not.toContain("datagram");
    expect(site.email.toLowerCase()).not.toContain("datagram");
    expect(site.phoneE164).toBe("");
    expect(site.social.whatsapp).toBe("");
  });

  it("does not publish the DataGram phone as Skylink NAP while OD-01 is open", () => {
    expect(site.phoneE164).not.toBe("+2349060976424");
    expect(site.phoneDisplay).not.toContain("906 097 6424");
    expect(hasPublicPhone()).toBe(false);
    expect(hasAnyPublicContactChannel()).toBe(false);
  });
});
