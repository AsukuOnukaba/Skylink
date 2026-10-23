import { parseEnquiryBody, type EnquiryInput } from "./enquirySchema";
import {
  enquiryLogSummary,
  type EnquiryDelivery,
  type DeliveryResult,
} from "./enquiryDelivery";

export type EnquiryHttpResult =
  | { status: 202; body: { ok: true } }
  | { status: 400; body: { ok: false; error: string; issues?: string[] } }
  | { status: 502; body: { ok: false; error: string } }
  | { status: 503; body: { ok: false; error: string } };

/**
 * Pure enquiry processor for unit tests and the serverless handler.
 * 202 is returned only after delivery.deliver() reports ok: true
 * (authorized acceptance). Does not log PII.
 */
export async function processEnquiry(
  raw: unknown,
  delivery: EnquiryDelivery,
  log: (line: string) => void = () => {},
): Promise<EnquiryHttpResult> {
  if (raw === undefined || raw === null || typeof raw !== "object") {
    return {
      status: 400,
      body: { ok: false, error: "Validation failed", issues: ["body: Required"] },
    };
  }

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
    if (result.reason === "not_configured") {
      return {
        status: 503,
        body: { ok: false, error: "Enquiry delivery is not configured" },
      };
    }
    return {
      status: 502,
      body: { ok: false, error: "Delivery failed" },
    };
  }

  return { status: 202, body: { ok: true } };
}
