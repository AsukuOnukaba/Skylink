import { parseSiteOrigin } from "@/config/seo";

/**
 * Central site identity.
 * Phone, WhatsApp, and hours are the channels published on the DataGram site.
 * The public email is the Skylink address set by the owner. There is still no street address.
 */
export const site = {
  brandName: "Skylink",
  /**
   * Canonical public origin once OD-10 is decided (https, no trailing slash).
   * Empty until a valid VITE_SITE_URL is configured — never invent a domain.
   */
  siteUrl: parseSiteOrigin(import.meta.env.VITE_SITE_URL ?? "") ?? "",
  phoneE164: "+2349060976424",
  phoneDisplay: "+234 906 097 6424",
  email: "info@skylink.com",
  hours: "Mon–Sat, 08:00–18:00 (WAT)",
  /** Neutral draft only; OD-02 owns the approved phrase. */
  relationshipPhrase:
    "Skylink installs and supports Starlink connectivity.",
  social: {
    whatsapp: "https://wa.me/2349060976424",
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
