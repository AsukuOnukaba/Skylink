import { afterEach, describe, expect, it, vi } from "vitest";
import { submitEnquiry } from "./submitEnquiry";
import type { EnquiryInput } from "./enquirySchema";

const validPayload: EnquiryInput = {
  kind: "quote",
  name: "Ada Okeke",
  phone: "+2348000000000",
  email: "",
  location: "Lagos",
  service: "residential-installation",
  product: "",
  contactMethod: "phone",
  message: "",
  companyWebsite: "",
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function mockFetch(status: number, body: unknown) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () =>
      new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
      }),
    ),
  );
}

describe("submitEnquiry", () => {
  it("posts JSON to /api/enquiry and accepts only 202 with ok true", async () => {
    mockFetch(202, { ok: true });
    const result = await submitEnquiry(validPayload);
    expect(result).toEqual({ status: "accepted" });
    expect(fetch).toHaveBeenCalledWith(
      "/api/enquiry",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      }),
    );
    const init = vi.mocked(fetch).mock.calls[0]?.[1] as RequestInit;
    expect(JSON.parse(String(init.body))).toMatchObject({
      kind: "quote",
      service: "residential-installation",
    });
  });

  it("maps 400 to validation without treating it as success", async () => {
    mockFetch(400, {
      ok: false,
      error: "Validation failed",
      issues: ["name: Required"],
    });
    const result = await submitEnquiry(validPayload);
    expect(result.status).toBe("validation");
    if (result.status === "validation") {
      expect(result.issues).toContain("name: Required");
    }
  });

  it("maps 502, 503, 405, network, and malformed bodies without success", async () => {
    mockFetch(502, { ok: false, error: "Delivery failed" });
    expect((await submitEnquiry(validPayload)).status).toBe("delivery_failed");

    mockFetch(503, { ok: false, error: "Enquiry delivery is not configured" });
    expect((await submitEnquiry(validPayload)).status).toBe("unavailable");

    mockFetch(405, { ok: false, error: "Method not allowed" });
    expect((await submitEnquiry(validPayload)).status).toBe(
      "method_not_allowed",
    );

    mockFetch(202, { ok: false });
    expect((await submitEnquiry(validPayload)).status).toBe("unexpected");

    mockFetch(200, { ok: true });
    expect((await submitEnquiry(validPayload)).status).toBe("unexpected");

    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("Failed to fetch");
      }),
    );
    expect((await submitEnquiry(validPayload)).status).toBe("network");
  });

  it("does not treat HTML or non-JSON 202 as acceptance", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response("<!doctype html>", {
            status: 202,
            headers: { "Content-Type": "text/html" },
          }),
      ),
    );
    expect((await submitEnquiry(validPayload)).status).toBe("unexpected");
  });
});
