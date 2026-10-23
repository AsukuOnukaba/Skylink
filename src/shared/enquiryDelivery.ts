import type { EnquiryInput } from "./enquirySchema";

export type DeliveryResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "provider_error" };

/**
 * Delivery adapter interface. Production uses email/webhook (OD-07).
 * Dev stub accepts after validation when ENQUIRY_DELIVERY_MODE=stub.
 */
export type EnquiryDelivery = {
  deliver(payload: EnquiryInput): Promise<DeliveryResult>;
};

/** Safe log line — never include PII or secrets. */
export function enquiryLogSummary(payload: EnquiryInput): string {
  return `enquiry kind=${payload.kind} method=${payload.contactMethod} hasService=${Boolean(payload.service?.trim())} hasProduct=${Boolean(payload.product?.trim())}`;
}

export function createStubDelivery(): EnquiryDelivery {
  return {
    async deliver() {
      return { ok: true };
    },
  };
}

/**
 * Resolves delivery from env. Without OD-07 secrets, only stub mode succeeds.
 * Missing config returns not_configured so the handler can respond 502 honestly.
 */
export function resolveDeliveryFromEnv(
  env: NodeJS.ProcessEnv = process.env,
): EnquiryDelivery {
  const mode = (env.ENQUIRY_DELIVERY_MODE ?? "").trim().toLowerCase();
  if (mode === "stub") {
    return createStubDelivery();
  }

  // Production adapters (Resend/webhook) arrive when OD-07/OD-15 are set.
  // Until then, report not configured rather than inventing a mailbox.
  return {
    async deliver() {
      return { ok: false, reason: "not_configured" };
    },
  };
}
