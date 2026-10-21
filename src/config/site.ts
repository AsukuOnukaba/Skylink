/**
 * Central site identity placeholders (FR-01 / TRD site module).
 * Values here are development placeholders only — not approved public NAP.
 * Replace from OD-01 / OD-02 before production publish.
 */
export const site = {
  brandName: "Skylink",
  /** Canonical public URL once OD-10 is decided. No trailing slash. */
  siteUrl: import.meta.env.VITE_SITE_URL ?? "",
  /** E.164 once OD-01 is approved. Empty until then. */
  phoneE164: "",
  phoneDisplay: "",
  email: "",
  hours: "",
  /** Neutral draft only; OD-02 owns the approved phrase. */
  relationshipPhrase:
    "Skylink installs and supports Starlink connectivity.",
  social: {
    whatsapp: "",
  },
} as const;

export type SiteConfig = typeof site;
