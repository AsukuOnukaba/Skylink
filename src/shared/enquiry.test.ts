import { describe, expect, it } from "vitest";
import {
  createStubDelivery,
  resolveDeliveryFromEnv,
} from "./enquiryDelivery";
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

  it("rejects oversized message bodies", () => {
    const result = parseEnquiryBody({
      ...validQuote,
      message: "x".repeat(2001),
    });
    expect(result.success).toBe(false);
  });

  it("requires service for quote and product for product kind", () => {
    expect(parseEnquiryBody({ ...validQuote, service: "" }).success).toBe(
      false,
    );
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

describe("resolveDeliveryFromEnv", () => {
  it("does not accept enquiries when delivery mode is unset", async () => {
    const delivery = resolveDeliveryFromEnv({});
    await expect(delivery.deliver(validQuote)).resolves.toEqual({
      ok: false,
      reason: "not_configured",
    });
  });

  it("never enables the accepting stub in production", async () => {
    const vercelProd = resolveDeliveryFromEnv({
      ENQUIRY_DELIVERY_MODE: "stub",
      VERCEL_ENV: "production",
    });
    await expect(vercelProd.deliver(validQuote)).resolves.toEqual({
      ok: false,
      reason: "not_configured",
    });

    const nodeProd = resolveDeliveryFromEnv({
      ENQUIRY_DELIVERY_MODE: "stub",
      NODE_ENV: "production",
    });
    await expect(nodeProd.deliver(validQuote)).resolves.toEqual({
      ok: false,
      reason: "not_configured",
    });
  });

  it("allows stub only outside production hosts", async () => {
    const delivery = resolveDeliveryFromEnv({
      ENQUIRY_DELIVERY_MODE: "stub",
      NODE_ENV: "test",
      VERCEL_ENV: "development",
    });
    await expect(delivery.deliver(validQuote)).resolves.toEqual({ ok: true });
  });

  it("treats email/webhook mode without provider secrets as not configured", async () => {
    const email = resolveDeliveryFromEnv({ ENQUIRY_DELIVERY_MODE: "email" });
    await expect(email.deliver(validQuote)).resolves.toEqual({
      ok: false,
      reason: "not_configured",
    });

    const webhook = resolveDeliveryFromEnv({
      ENQUIRY_DELIVERY_MODE: "webhook",
    });
    await expect(webhook.deliver(validQuote)).resolves.toEqual({
      ok: false,
      reason: "not_configured",
    });
  });
});

describe("processEnquiry", () => {
  it("returns 202 only after delivery reports acceptance", async () => {
    const result = await processEnquiry(validQuote, createStubDelivery());
    expect(result).toEqual({ status: 202, body: { ok: true } });
  });

  it("returns 400 on invalid or missing bodies", async () => {
    expect(
      (await processEnquiry({ kind: "quote" }, createStubDelivery())).status,
    ).toBe(400);
    expect((await processEnquiry(null, createStubDelivery())).status).toBe(400);
    expect((await processEnquiry("raw", createStubDelivery())).status).toBe(
      400,
    );
  });

  it("returns 503 when delivery is not configured", async () => {
    const result = await processEnquiry(
      validQuote,
      resolveDeliveryFromEnv({}),
    );
    expect(result.status).toBe(503);
    expect(result.body).toMatchObject({
      ok: false,
      error: "Enquiry delivery is not configured",
    });
  });

  it("returns 503 for stub mode under production env resolution", async () => {
    const result = await processEnquiry(
      validQuote,
      resolveDeliveryFromEnv({
        ENQUIRY_DELIVERY_MODE: "stub",
        VERCEL_ENV: "production",
      }),
    );
    expect(result.status).toBe(503);
    expect(result.body).toMatchObject({ ok: false });
  });

  it("returns 502 when a configured delivery attempt fails", async () => {
    const result = await processEnquiry(validQuote, {
      async deliver() {
        return { ok: false, reason: "provider_error" };
      },
    });
    expect(result.status).toBe(502);
    expect(result.body).toEqual({ ok: false, error: "Delivery failed" });
  });

  it("returns 502 when delivery throws", async () => {
    const result = await processEnquiry(validQuote, {
      async deliver() {
        throw new Error("network down");
      },
    });
    expect(result.status).toBe(502);
    expect(JSON.stringify(result.body)).not.toMatch(/network down/i);
  });

  it("never returns 202 from the default unconfigured production path", async () => {
    const result = await processEnquiry(
      validQuote,
      resolveDeliveryFromEnv({
        NODE_ENV: "production",
        VERCEL_ENV: "production",
      }),
    );
    expect(result.status).not.toBe(202);
    expect(result.status).toBe(503);
  });
});
