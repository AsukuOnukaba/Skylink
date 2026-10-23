import { describe, expect, it } from "vitest";
import { site } from "./site";

describe("site config", () => {
  it("uses the Skylink brand name and no DataGram identity in brand fields", () => {
    expect(site.brandName).toBe("Skylink");
    expect(site.brandName.toLowerCase()).not.toContain("datagram");
    expect(site.email.toLowerCase()).not.toContain("datagram");
  });

  it("lists the shared phone and WhatsApp number for contact", () => {
    expect(site.phoneE164).toBe("+2349060976424");
    expect(site.phoneDisplay).toBe("+234 906 097 6424");
    expect(site.social.whatsapp).toContain("2349060976424");
  });
});
