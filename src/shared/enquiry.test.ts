import { describe, expect, it } from "vitest";
import { createStubDelivery } from "./enquiryDelivery";
import { parseEnquiryBody } from "./enquirySchema";
import { processEnquiry } from "./processEnquiry";

const validQuote = {
  kind: "quote" as const,
  name: "Ada",
  phone: "+2348000000000",
  email: "",
  location: "Abuja",
  service: "residential-installation",
  product: "",
  contactMethod: "phone" as const,
  message: "Need a quote",
  companyWebsite: "",
};

describe("enquiry schema", () => {
  it("accepts a valid quote payload", () => {
    expect(parseEnquiryBody(validQuote).success).toBe(true);
  });

  it("rejects honeypot traffic", () => {
    const result = parseEnquiryBody({
      ...validQuote,
      companyWebsite: "https://spam.example",
    });
    expect(result.success).toBe(false);
  });

  it("requires service for quote and product for product kind", () => {
    expect(
      parseEnquiryBody({ ...validQuote, service: "" }).success,
    ).toBe(false);
    expect(
      parseEnquiryBody({
        ...validQuote,
        kind: "product",
        service: "",
        product: "",
      }).success,
    ).toBe(false);
    expect(
      parseEnquiryBody({
        ...validQuote,
        kind: "product",
        service: "",
        product: "sample-kit",
      }).success,
    ).toBe(true);
  });

  it("requires email when contactMethod is email", () => {
    expect(
      parseEnquiryBody({
        ...validQuote,
        contactMethod: "email",
        email: "",
      }).success,
    ).toBe(false);
  });
});

describe("processEnquiry", () => {
  it("returns 202 with stub delivery", async () => {
    const result = await processEnquiry(validQuote, createStubDelivery());
    expect(result).toEqual({ status: 202, body: { ok: true } });
  });

  it("returns 400 on invalid bodies", async () => {
    const result = await processEnquiry({ kind: "quote" }, createStubDelivery());
    expect(result.status).toBe(400);
  });

  it("returns 502 when delivery is not configured", async () => {
    const result = await processEnquiry(validQuote, {
      async deliver() {
        return { ok: false, reason: "not_configured" };
      },
    });
    expect(result.status).toBe(502);
    expect(result.body).toMatchObject({ ok: false });
  });
});
