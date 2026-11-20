import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { analyticsEnabled } from "@/analytics/config";
import {
  installAnalytics,
  trackEvent,
  trackPageView,
} from "@/analytics/track";

/**
 * Installs GA4 only when enabled, records SPA page views on React Router
 * location changes, and records tel: / WhatsApp clicks.
 *
 * Renders nothing. No consent banner is added here: a formal consent policy
 * remains an owner decision (OD-13). Advertising personalisation and Google
 * Signals stay off in the gtag config.
 */
export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (!analyticsEnabled()) return;
    installAnalytics();

    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const placement = anchor.closest("[data-analytics-placement='floating']")
        ? "floating"
        : "inline";
      if (href.startsWith("tel:")) {
        trackEvent("call_click", { placement });
      } else if (/wa\.me|api\.whatsapp\.com/i.test(href)) {
        trackEvent("whatsapp_click", { placement });
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!analyticsEnabled()) return;
    installAnalytics();
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
}
