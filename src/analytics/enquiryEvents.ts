import { trackEvent } from "@/analytics/track";
import type { EnquiryKind } from "@/shared/enquirySchema";

const submitEvent = {
  quote: "quote_submit",
  survey: "survey_submit",
  product: "product_enquiry",
} as const;

/**
 * Fired only after a verified HTTP 202 acceptance.
 * Parameters are limited to path and catalogue slugs.
 */
export function emitEnquiryAccepted(
  kind: EnquiryKind,
  context: { service?: string; product?: string } = {},
): void {
  trackEvent(submitEvent[kind], {
    service: kind === "product" ? "" : context.service,
    product: kind === "product" ? context.product : "",
  });
}
