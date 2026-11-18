import { describe, expect, it, vi } from "vitest";
import {
  coerceEnquiryBody,
  createEnquiryHandler,
  type EnquiryApiRequest,
  type EnquiryApiResponse,
} from "./enquiry";

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

function mockResponse() {
  const state: {
    statusCode: number;
    headers: Record<string, string>;
    body: unknown;
  } = {
    statusCode: 0,
    headers: {},
    body: null,
  };

  const res: EnquiryApiResponse = {
    status(code: number) {
      state.statusCode = code;
      return res;
    },
    setHeader(name: string, value: string) {
      state.headers[name] = value;
    },
    json(body: unknown) {
      state.body = body;
      return body;
    },
  };

  return { res, state };
}

async function invoke(
  req: EnquiryApiRequest,
  handler = createEnquiryHandler({ log: () => {} }),
) {
  const { res, state } = mockResponse();
  await handler(req, res);
  return state;
}

describe("coerceEnquiryBody", () => {
  it("parses JSON strings and buffers; rejects invalid JSON as null", () => {
    expect(coerceEnquiryBody('{"kind":"quote"}')).toEqual({ kind: "quote" });
    expect(coerceEnquiryBody(Buffer.from('{"a":1}'))).toEqual({ a: 1 });
    expect(coerceEnquiryBody("{")).toBeNull();
    expect(coerceEnquiryBody("")).toBeNull();
    expect(coerceEnquiryBody({ kind: "quote" })).toEqual({ kind: "quote" });
  });
});

describe("api/enquiry handler entrypoint", () => {
  it("returns 405 with Allow POST for unsupported methods", async () => {
    const state = await invoke({ method: "GET" });
    expect(state.statusCode).toBe(405);
    expect(state.headers.Allow).toBe("POST");
    expect(state.body).toEqual({ ok: false, error: "Method not allowed" });
  });

  it("returns 400 for empty or malformed bodies", async () => {
    const empty = await invoke({ method: "POST", body: {} });
    expect(empty.statusCode).toBe(400);
    expect(empty.body).toMatchObject({ ok: false, error: "Validation failed" });

    const malformed = await invoke({ method: "POST", body: "{" });
    expect(malformed.statusCode).toBe(400);

    const missing = await invoke({ method: "POST", body: null });
    expect(missing.statusCode).toBe(400);
  });

  it("returns 400 for invalid field values including honeypot", async () => {
    const invalid = await invoke({
      method: "POST",
      body: { ...validQuote, service: "" },
    });
    expect(invalid.statusCode).toBe(400);

    const honeypot = await invoke({
      method: "POST",
      body: { ...validQuote, companyWebsite: "https://spam.example" },
    });
    expect(honeypot.statusCode).toBe(400);
  });

  it("returns 503 for a valid request when delivery is not configured", async () => {
    const handler = createEnquiryHandler({
      log: () => {},
      resolveDeliveryFromEnv: () => ({
        async deliver() {
          return { ok: false, reason: "not_configured" };
        },
      }),
    });
    const state = await invoke({ method: "POST", body: validQuote }, handler);
    expect(state.statusCode).toBe(503);
    expect(state.body).toEqual({
      ok: false,
      error: "Enquiry delivery is not configured",
    });
  });

  it("returns 502 when a configured delivery adapter reports provider failure", async () => {
    const handler = createEnquiryHandler({
      log: () => {},
      resolveDeliveryFromEnv: () => ({
        async deliver() {
          return { ok: false, reason: "provider_error" };
        },
      }),
    });
    const state = await invoke({ method: "POST", body: validQuote }, handler);
    expect(state.statusCode).toBe(502);
    expect(state.body).toEqual({ ok: false, error: "Delivery failed" });
  });

  it("returns 202 when a test delivery adapter accepts the enquiry", async () => {
    const handler = createEnquiryHandler({
      log: () => {},
      resolveDeliveryFromEnv: () => ({
        async deliver() {
          return { ok: true };
        },
      }),
    });
    const state = await invoke({ method: "POST", body: validQuote }, handler);
    expect(state.statusCode).toBe(202);
    expect(state.body).toEqual({ ok: true });
  });

  it("returns 500 JSON without secrets when dependency resolution throws", async () => {
    const log = vi.fn();
    const handler = createEnquiryHandler({
      log,
      resolveDeliveryFromEnv: () => {
        throw new Error("secret boom with ENQUIRY_PROVIDER_API_KEY=xyz");
      },
    });
    const state = await invoke({ method: "POST", body: validQuote }, handler);
    expect(state.statusCode).toBe(500);
    expect(state.body).toEqual({ ok: false, error: "Internal server error" });
    expect(JSON.stringify(state.body)).not.toMatch(
      /secret boom|ENQUIRY_PROVIDER_API_KEY|xyz/i,
    );
    expect(log).toHaveBeenCalledWith("enquiry handler unexpected_error");
  });

  it("accepts a JSON string body the same as a parsed object", async () => {
    const handler = createEnquiryHandler({
      log: () => {},
      resolveDeliveryFromEnv: () => ({
        async deliver() {
          return { ok: false, reason: "not_configured" };
        },
      }),
    });
    const state = await invoke(
      { method: "POST", body: JSON.stringify(validQuote) },
      handler,
    );
    expect(state.statusCode).toBe(503);
  });
});
