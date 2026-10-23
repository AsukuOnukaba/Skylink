import { afterEach, describe, expect, it, vi } from "vitest";

describe("areEnquiryFormsEnabled", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("defaults to disabled when the env var is missing", async () => {
    vi.stubEnv("VITE_ENQUIRY_FORMS_ENABLED", "");
    const { areEnquiryFormsEnabled } = await import("./enquiryForms");
    expect(areEnquiryFormsEnabled()).toBe(false);
  });

  it("enables only for explicit true-like values", async () => {
    vi.stubEnv("VITE_ENQUIRY_FORMS_ENABLED", "true");
    const mod = await import("./enquiryForms");
    expect(mod.areEnquiryFormsEnabled()).toBe(true);

    vi.resetModules();
    vi.stubEnv("VITE_ENQUIRY_FORMS_ENABLED", "1");
    const mod2 = await import("./enquiryForms");
    expect(mod2.areEnquiryFormsEnabled()).toBe(true);

    vi.resetModules();
    vi.stubEnv("VITE_ENQUIRY_FORMS_ENABLED", "false");
    const mod3 = await import("./enquiryForms");
    expect(mod3.areEnquiryFormsEnabled()).toBe(false);
  });
});
