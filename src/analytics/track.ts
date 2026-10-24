import { analyticsEnabled, measurementId } from "@/analytics/config";

/**
 * Conversion events only. Page views come from GA4 enhanced measurement
 * when a tag is loaded. This module never sends `page_view`.
 */
export const analyticsEventNames = [
  "whatsapp_click",
  "call_click",
  "quote_submit",
  "survey_submit",
  "product_enquiry",
] as const;

export type AnalyticsEventName = (typeof analyticsEventNames)[number];

export type AnalyticsParams = {
  page_path?: string;
  service?: string;
  product?: string;
  placement?: "floating" | "inline" | "";
};

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

const SLUG = /^[a-z0-9-]{0,80}$/;
const PATH = /^\/[a-z0-9/_-]{0,120}$/i;

function safeSlug(value: string | undefined): string {
  const trimmed = (value ?? "").trim().toLowerCase();
  return SLUG.test(trimmed) ? trimmed : "";
}

function safePath(value: string | undefined): string {
  const trimmed = (value ?? "").split("?")[0]?.split("#")[0] ?? "";
  if (trimmed === "/") return "/";
  return PATH.test(trimmed) ? trimmed : "";
}

export function sanitizeAnalyticsParams(
  params: AnalyticsParams,
): Required<AnalyticsParams> {
  const placement =
    params.placement === "floating" || params.placement === "inline"
      ? params.placement
      : "";
  return {
    page_path: safePath(params.page_path),
    service: safeSlug(params.service),
    product: safeSlug(params.product),
    placement,
  };
}

export function currentPagePath(): string {
  if (typeof window === "undefined") return "";
  return safePath(window.location.pathname);
}

/**
 * Send one allowed event. No-op when analytics is disabled.
 * Drops anything that is not a path, slug, or placement.
 */
export function trackEvent(
  name: AnalyticsEventName,
  params: AnalyticsParams = {},
): void {
  if (!analyticsEnabled()) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const payload = sanitizeAnalyticsParams({
    page_path: params.page_path || currentPagePath(),
    service: params.service,
    product: params.product,
    placement: params.placement,
  });
  window.gtag("event", name, payload);
}

/**
 * Load the GA4 tag once. Does not send a manual page_view.
 * Safe to call when disabled: it returns without touching the document.
 */
export function installAnalytics(): void {
  if (typeof document === "undefined") return;
  const id = measurementId();
  if (!id) return;
  if (document.querySelector("script[data-skylink-analytics='ga4']")) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  script.dataset.skylinkAnalytics = "ga4";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  const gtag: Gtag = (...args) => {
    window.dataLayer?.push(args);
  };
  window.gtag = gtag;
  gtag("js", new Date());
  // Default enhanced measurement owns page_view, including history changes.
  gtag("config", id);
}
