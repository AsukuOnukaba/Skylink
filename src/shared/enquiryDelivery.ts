import type { EnquiryInput } from "./enquirySchema";

export type DeliveryResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "provider_error" };

/**
 * Delivery adapter interface. Production uses email/webhook (OD-07/OD-15).
 * Stub acceptance is for local/test only and must never activate in production.
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

export function createNotConfiguredDelivery(): EnquiryDelivery {
  return {
    async deliver() {
      return { ok: false, reason: "not_configured" };
    },
  };
}

export function isProductionHostEnv(
  env: NodeJS.ProcessEnv = process.env,
): boolean {
  const vercelEnv = (env.VERCEL_ENV ?? "").trim().toLowerCase();
  if (vercelEnv === "production") return true;
  const nodeEnv = (env.NODE_ENV ?? "").trim().toLowerCase();
  return nodeEnv === "production";
}

function hasEmailDeliveryConfig(env: NodeJS.ProcessEnv): boolean {
  return Boolean(
    env.ENQUIRY_PROVIDER_API_KEY?.trim() &&
      env.ENQUIRY_TO_EMAIL?.trim() &&
      env.ENQUIRY_FROM_EMAIL?.trim(),
  );
}

function hasWebhookDeliveryConfig(env: NodeJS.ProcessEnv): boolean {
  return Boolean(env.ENQUIRY_WEBHOOK_URL?.trim());
}

/**
 * Resolves delivery from env.
 * - Production never enables the accepting stub.
 * - email/webhook modes require OD-07 secrets; without them → not_configured.
 * - Missing or unknown mode → not_configured (honest failure, never fake 202).
 */
export function resolveDeliveryFromEnv(
  env: NodeJS.ProcessEnv = process.env,
): EnquiryDelivery {
  const mode = (env.ENQUIRY_DELIVERY_MODE ?? "").trim().toLowerCase();

  if (mode === "stub") {
    if (isProductionHostEnv(env)) {
      return createNotConfiguredDelivery();
    }
    return createStubDelivery();
  }

  if (mode === "email") {
    if (!hasEmailDeliveryConfig(env)) {
      return createNotConfiguredDelivery();
    }
    // Real provider wiring lands after OD-07/OD-15 + CP-E. Secrets alone are
    // not enough to invent a sender implementation here.
    return createNotConfiguredDelivery();
  }

  if (mode === "webhook") {
    if (!hasWebhookDeliveryConfig(env)) {
      return createNotConfiguredDelivery();
    }
    return createNotConfiguredDelivery();
  }

  return createNotConfiguredDelivery();
}
