import { describe, expect, it, vi } from "vitest";
import enquiryEntrypoint, {
  coerceEnquiryBody,
  createEnquiryFetchHandler,
  createEnquiryHandler,
  POST,
  GET,
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

async function invokeNode(
  req: EnquiryApiRequest,
  handler = createEnquiryHandler({ log: () => {} }),
) {
  const { res, state } = mockResponse();
  await handler(req, res);
  return state;
}

async function invokeWeb(
  method: string,
  body?: unknown,
  handler = createEnquiryFetchHandler({ log: () => {} }),
) {
  const init: RequestInit = { method };
  if (body !== undefined) {
    init.body =
      typeof body === "string" || body instanceof Uint8Array
        ? body
        : JSON.stringify(body);
    init.headers = { "content-type": "application/json" };
  }
  const response = await handler(
    new Request("https://www.skylink.ng/api/enquiry", init),
  );
  const text = await response.text();
  let parsed: unknown = text;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    // keep raw text
  }
  return {
    statusCode: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    body: parsed,
  };
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

describe("api/enquiry Node adapter entrypoint", () => {
  it("returns 405 with Allow POST for unsupported methods", async () => {
    const state = await invokeNode({ method: "GET" });
    expect(state.statusCode).toBe(405);
    expect(state.headers.Allow).toBe("POST");
    expect(state.body).toEqual({ ok: false, error: "Method not allowed" });
  });

  it("returns 400 for empty or malformed bodies", async () => {
    const empty = await invokeNode({ method: "POST", body: {} });
    expect(empty.statusCode).toBe(400);
    expect(empty.body).toMatchObject({ ok: false, error: "Validation failed" });

    const malformed = await invokeNode({ method: "POST", body: "{" });
    expect(malformed.statusCode).toBe(400);

    const missing = await invokeNode({ method: "POST", body: null });
    expect(missing.statusCode).toBe(400);
  });

  it("returns 400 for invalid field values including honeypot", async () => {
    const invalid = await invokeNode({
      method: "POST",
      body: { ...validQuote, service: "" },
    });
    expect(invalid.statusCode).toBe(400);

    const honeypot = await invokeNode({
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
    const state = await invokeNode({ method: "POST", body: validQuote }, handler);
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
    const state = await invokeNode({ method: "POST", body: validQuote }, handler);
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
    const state = await invokeNode({ method: "POST", body: validQuote }, handler);
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
    const state = await invokeNode({ method: "POST", body: validQuote }, handler);
    expect(state.statusCode).toBe(500);
    expect(state.body).toEqual({ ok: false, error: "Internal server error" });
    expect(JSON.stringify(state.body)).not.toMatch(
      /secret boom|ENQUIRY_PROVIDER_API_KEY|xyz/i,
    );
    expect(log).toHaveBeenCalledWith("enquiry handler unexpected_error");
  });
});

describe("api/enquiry Vercel Web Standard entrypoint", () => {
  it("exports default { fetch } and named POST/GET", () => {
    expect(typeof enquiryEntrypoint.fetch).toBe("function");
    expect(typeof POST).toBe("function");
    expect(typeof GET).toBe("function");
  });

  it("returns 405 with Allow POST for GET via default.fetch", async () => {
    const response = await enquiryEntrypoint.fetch(
      new Request("https://www.skylink.ng/api/enquiry", { method: "GET" }),
    );
    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toBe("POST");
    expect(await response.json()).toEqual({
      ok: false,
      error: "Method not allowed",
    });
  });

  it("returns 400 for empty JSON object via POST export", async () => {
    const response = await POST(
      new Request("https://www.skylink.ng/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{}",
      }),
    );
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({
      ok: false,
      error: "Validation failed",
    });
  });

  it("returns 400 for invalid fields and honeypot", async () => {
    const invalid = await invokeWeb("POST", { ...validQuote, service: "" });
    expect(invalid.statusCode).toBe(400);

    const honeypot = await invokeWeb("POST", {
      ...validQuote,
      companyWebsite: "bot",
    });
    expect(honeypot.statusCode).toBe(400);
  });

  it("returns 503 when delivery is unconfigured", async () => {
    const handler = createEnquiryFetchHandler({
      log: () => {},
      resolveDeliveryFromEnv: () => ({
        async deliver() {
          return { ok: false, reason: "not_configured" };
        },
      }),
    });
    const state = await invokeWeb("POST", validQuote, handler);
    expect(state.statusCode).toBe(503);
    expect(state.body).toEqual({
      ok: false,
      error: "Enquiry delivery is not configured",
    });
  });

  it("returns 502 on provider failure and 202 on acceptance", async () => {
    const fail = createEnquiryFetchHandler({
      log: () => {},
      resolveDeliveryFromEnv: () => ({
        async deliver() {
          return { ok: false, reason: "provider_error" };
        },
      }),
    });
    const failState = await invokeWeb("POST", validQuote, fail);
    expect(failState.statusCode).toBe(502);

    const ok = createEnquiryFetchHandler({
      log: () => {},
      resolveDeliveryFromEnv: () => ({
        async deliver() {
          return { ok: true };
        },
      }),
    });
    const okState = await invokeWeb("POST", validQuote, ok);
    expect(okState.statusCode).toBe(202);
    expect(okState.body).toEqual({ ok: true });
  });

  it("accepts a JSON string body the same as a parsed object", async () => {
    const handler = createEnquiryFetchHandler({
      log: () => {},
      resolveDeliveryFromEnv: () => ({
        async deliver() {
          return { ok: false, reason: "not_configured" };
        },
      }),
    });
    const state = await invokeWeb("POST", JSON.stringify(validQuote), handler);
    expect(state.statusCode).toBe(503);
  });
});
