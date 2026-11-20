import { analyticsEnabled, measurementId } from "@/analytics/config";

/**
 * Conversion events + SPA page views.
 *
 * Page views are sent manually once per React Router location with
 * `send_page_view: false` on `gtag('config', …)`. Do not also enable GA4
 * Admin “Page changes based on browser history events” or views will double.
 * See Privacy notice and PH-11 plan notes.
 */
export const analyticsEventNames = [
  "page_view",
  "whatsapp_click",
  "call_click",
  "quote_submit",
  "survey_submit",
  "product_enquiry",
] as const;

export type AnalyticsEventName = (typeof analyticsEventNames)[number];

export type AnalyticsParams = {
  page_path?: string;
  page_title?: string;
  page_location?: string;
  service?: string;
  product?: string;
  placement?: "floating" | "inline" | "";
};

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    __skylinkGaInstalled?: boolean;
    __skylinkLastPageViewKey?: string;
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

function safeTitle(value: string | undefined): string {
  const trimmed = (value ?? "").trim().slice(0, 200);
  // Titles are public page strings — never pass form fields here.
  return trimmed;
}

export function sanitizeAnalyticsParams(
  params: AnalyticsParams,
): Required<Pick<AnalyticsParams, "page_path" | "service" | "product" | "placement">> &
  Pick<AnalyticsParams, "page_title" | "page_location"> {
  const placement =
    params.placement === "floating" || params.placement === "inline"
      ? params.placement
      : "";
  return {
    page_path: safePath(params.page_path),
    service: safeSlug(params.service),
    product: safeSlug(params.product),
    placement,
    page_title: params.page_title ? safeTitle(params.page_title) : undefined,
    page_location: params.page_location?.trim().slice(0, 500) || undefined,
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
    page_title: params.page_title,
    page_location: params.page_location,
  });
  const eventParams: Record<string, string> = {
    page_path: payload.page_path,
  };
  if (name !== "page_view") {
    eventParams.service = payload.service;
    eventParams.product = payload.product;
    eventParams.placement = payload.placement;
  }
  if (payload.page_title) eventParams.page_title = payload.page_title;
  if (payload.page_location) eventParams.page_location = payload.page_location;
  window.gtag("event", name, eventParams);
}

/**
 * One SPA page_view per distinct path (+ search). Dedupes identical keys so
 * React Strict Mode double-effects do not double-count.
 */
export function trackPageView(pathWithSearch?: string): void {
  if (!analyticsEnabled()) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const raw =
    pathWithSearch ??
    `${window.location.pathname}${window.location.search || ""}`;
  const pathOnly = safePath(raw.split("?")[0] ?? "");
  if (!pathOnly) return;
  const search = raw.includes("?") ? raw.slice(raw.indexOf("?")) : "";
  // Keep only verified catalogue query keys out of the key? For dedupe we use
  // pathname only so intent/product query changes on /contact do not spam views.
  const dedupeKey = pathOnly;
  if (window.__skylinkLastPageViewKey === dedupeKey) return;
  window.__skylinkLastPageViewKey = dedupeKey;

  const pageLocation =
    typeof window.location?.origin === "string"
      ? `${window.location.origin}${pathOnly}${search}`
      : undefined;

  trackEvent("page_view", {
    page_path: pathOnly,
    page_title: typeof document !== "undefined" ? document.title : undefined,
    page_location: pageLocation,
  });
}

/**
 * Load the GA4 Google tag once and configure it without an automatic
 * config-time page_view. Safe to call when disabled.
 */
export function installAnalytics(): void {
  if (typeof document === "undefined") return;
  if (!analyticsEnabled()) return;
  const id = measurementId();
  if (!id) return;
  if (
    window.__skylinkGaInstalled ||
    document.querySelector("script[data-skylink-analytics='ga4']")
  ) {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  const gtag: Gtag = (...args) => {
    window.dataLayer?.push(args);
  };
  window.gtag = gtag;
  gtag("js", new Date());
  // Single page-view source: React Router via trackPageView.
  // Do not enable GA4 history-change page views in the Admin data stream.
  gtag("config", id, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  script.dataset.skylinkAnalytics = "ga4";
  document.head.appendChild(script);

  window.__skylinkGaInstalled = true;
}

/** Test helper — clears install / page-view dedupe state. */
export function resetAnalyticsRuntimeStateForTests(): void {
  if (typeof window === "undefined") return;
  delete window.__skylinkGaInstalled;
  delete window.__skylinkLastPageViewKey;
}
