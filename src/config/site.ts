/**
 * Central site identity (FR-01 / TRD site module).
 * Phone/WhatsApp reuse the shared DataGram number at owner request.
 * Email stays empty until a Skylink address is approved (do not publish info@datagram.ng as Skylink).
 */
export const site = {
  brandName: "Skylink",
  /** Canonical public URL once OD-10 is decided. No trailing slash. */
  siteUrl: import.meta.env.VITE_SITE_URL ?? "",
  /** E.164 — shared line with DataGram (owner-directed). */
  phoneE164: "+2349060976424",
  phoneDisplay: "+234 906 097 6424",
  email: "",
  hours: "",
  /** Neutral draft only; OD-02 owns the approved phrase. */
  relationshipPhrase:
    "Skylink installs and supports Starlink connectivity.",
  social: {
    /** WhatsApp deep link (same number as phone). */
    whatsapp: "https://wa.me/2349060976424",
  },
} as const;

export type SiteConfig = typeof site;
