import { describe, expect, it } from "vitest";
import {
  WHATSAPP_ENQUIRY_MESSAGE,
  buildWhatsappHref,
  enquiryContextFromLocation,
} from "./whatsapp";

describe("WhatsApp links", () => {
  it("uses the Skylink number and a prefilled enquiry", () => {
    const href = buildWhatsappHref();
    expect(href.startsWith("https://wa.me/2349060976424?text=")).toBe(true);
    expect(decodeURIComponent(href)).toContain(WHATSAPP_ENQUIRY_MESSAGE);
    expect(href).not.toContain("datagram");
  });

  it("adds published service or location context only", () => {
    const href = buildWhatsappHref(
      enquiryContextFromLocation(
        "/services/residential-installation",
        "?location=Lagos&name=Ada%20Obi",
      ),
    );
    const text = decodeURIComponent(href);
    expect(text).toContain("Service: Residential installation");
    expect(text).toContain("Location: Lagos");
    expect(text).not.toContain("Ada");
  });
});
