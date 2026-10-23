import { afterEach, describe, expect, it, vi } from "vitest";

describe("enquiryContactCtaLabel", () => {
  afterEach(() => {
    vi.resetModules();
    vi.doUnmock("./enquiryForms");
  });

  it("uses Go to contact when forms are disabled", async () => {
    vi.doMock("./enquiryForms", () => ({
      areEnquiryFormsEnabled: () => false,
    }));
    const { enquiryContactCtaLabel } = await import("./enquiryCta");
    expect(enquiryContactCtaLabel("survey")).toBe("Go to contact");
    expect(enquiryContactCtaLabel("product")).toBe("Go to contact");
    expect(enquiryContactCtaLabel("quote")).toBe("Go to contact");
  });

  it("uses action-specific labels when forms are enabled", async () => {
    vi.doMock("./enquiryForms", () => ({
      areEnquiryFormsEnabled: () => true,
    }));
    const { enquiryContactCtaLabel } = await import("./enquiryCta");
    expect(enquiryContactCtaLabel("survey")).toBe("Request a site survey");
    expect(enquiryContactCtaLabel("product")).toBe("Enquire about this product");
    expect(enquiryContactCtaLabel("quote")).toBe("Request a quote");
  });
});
