import { useEffect } from "react";
import { analyticsEnabled } from "@/analytics/config";
import { installAnalytics, trackEvent } from "@/analytics/track";

/**
 * Installs GA4 only when a valid measurement id is configured, and records
 * tel: / WhatsApp clicks. Renders nothing. Does not add a consent banner:
 * OD-13 and any consent policy are still open, and the tag stays unloaded
 * until an id exists.
 */
export function Analytics() {
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

  return null;
}
