import { describe, expect, it } from "vitest";
import {
  hasAnyPublicContactChannel,
  hasPublicPhone,
  site,
} from "./site";

describe("site config", () => {
  it("keeps the Skylink brand and reuses the published contact channels", () => {
    expect(site.brandName).toBe("Skylink");
    expect(site.brandName.toLowerCase()).not.toContain("datagram");
    expect(site.email).toBe("info@skylink.com");
    expect(site.phoneE164).toBe("+2349060976424");
    expect(site.phoneDisplay).toBe("+234 906 097 6424");
    expect(site.social.whatsapp).toBe("https://wa.me/2349060976424");
    expect(site.hours).toContain("Mon");
    expect(hasPublicPhone()).toBe(true);
    expect(hasAnyPublicContactChannel()).toBe(true);
  });
});
