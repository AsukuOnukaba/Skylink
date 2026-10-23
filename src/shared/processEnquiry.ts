import { parseEnquiryBody, type EnquiryInput } from "./enquirySchema";
import {
  enquiryLogSummary,
  type EnquiryDelivery,
  type DeliveryResult,
} from "./enquiryDelivery";

export type EnquiryHttpResult =
  | { status: 202; body: { ok: true } }
  | { status: 400; body: { ok: false; error: string; issues?: string[] } }
  | { status: 502; body: { ok: false; error: string } };

/**
 * Pure enquiry processor for unit tests and the serverless handler.
 * Does not log PII. Rate limiting is Vercel Firewall (FR-32), not in-memory.
 */
export async function processEnquiry(
  raw: unknown,
  delivery: EnquiryDelivery,
  log: (line: string) => void = () => {},
): Promise<EnquiryHttpResult> {
  const parsed = parseEnquiryBody(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues.map(
      (i) => `${i.path.join(".") || "body"}: ${i.message}`,
    );
    return {
      status: 400,
      body: { ok: false, error: "Validation failed", issues },
    };
  }

  const payload: EnquiryInput = parsed.data;
  log(enquiryLogSummary(payload));

  let result: DeliveryResult;
  try {
    result = await delivery.deliver(payload);
  } catch {
    return {
      status: 502,
      body: { ok: false, error: "Delivery failed" },
    };
  }

  if (!result.ok) {
    return {
      status: 502,
      body: {
        ok: false,
        error:
          result.reason === "not_configured"
            ? "Enquiry delivery is not configured"
            : "Delivery failed",
      },
    };
  }

  return { status: 202, body: { ok: true } };
}
