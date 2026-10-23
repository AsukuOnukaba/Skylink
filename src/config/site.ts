/**
 * Central site identity (FR-01 / TRD site module).
 * NAP fields stay empty until OD-01 formally approves Skylink-owned channels.
 * Do not publish DataGram phone/email as Skylink NAP without that approval.
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
    /** Full wa.me URL once an approved WhatsApp number exists. */
    whatsapp: "" as string,
  },
};

export type SiteConfig = typeof site;

export function hasPublicPhone(): boolean {
  return Boolean(site.phoneE164 && site.phoneDisplay);
}

export function hasPublicWhatsapp(): boolean {
  return Boolean(site.social.whatsapp);
}

export function hasPublicEmail(): boolean {
  return Boolean(site.email);
}

export function hasAnyPublicContactChannel(): boolean {
  return hasPublicPhone() || hasPublicWhatsapp() || hasPublicEmail();
}
