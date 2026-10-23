import type { EnquiryKind } from "@/shared/enquirySchema";

/**
 * Fired only after a verified HTTP 202 acceptance.
 * Full GA wiring lands in PH-11 — keep this free of PII.
 */
export function emitEnquiryAccepted(kind: EnquiryKind): void {
  if (typeof window === "undefined") return;
  // Placeholder for PH-11: window.gtag?.("event", `${kind}_submit`, { ... })
  void kind;
}
