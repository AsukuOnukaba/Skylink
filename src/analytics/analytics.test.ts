import { afterEach, describe, expect, it, vi } from "vitest";
import { analyticsEnabled, measurementId } from "./config";
import { emitEnquiryAccepted } from "./enquiryEvents";
import {
  installAnalytics,
  resetAnalyticsRuntimeStateForTests,
  sanitizeAnalyticsParams,
  trackEvent,
  trackPageView,
} from "./track";

const ORIGINAL = { ...process.env };

function enableAnalyticsEnv(id = "G-AB12CD34") {
  process.env.VITE_GA_MEASUREMENT_ID = id;
  process.env.VERCEL_ENV = "production";
}

afterEach(() => {
  for (const key of Object.keys(process.env)) {
    if (!(key in ORIGINAL)) delete process.env[key];
  }
  Object.assign(process.env, ORIGINAL);
  delete process.env.VITE_GA_MEASUREMENT_ID;
  delete process.env.VERCEL_ENV;
  delete process.env.SKYLINK_FORCE_ANALYTICS;
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  resetAnalyticsRuntimeStateForTests();
});

describe("analytics config", () => {
  it("stays disabled without a measurement id", () => {
    delete process.env.VITE_GA_MEASUREMENT_ID;
    process.env.VERCEL_ENV = "production";
    expect(measurementId()).toBeNull();
    expect(analyticsEnabled()).toBe(false);
  });

  it("rejects placeholders and accepts a well-formed id", () => {
    process.env.VERCEL_ENV = "production";
    process.env.VITE_GA_MEASUREMENT_ID = "G-XXXXXXXX";
    expect(measurementId()).toBeNull();
    process.env.VITE_GA_MEASUREMENT_ID = "not-an-id";
    expect(measurementId()).toBeNull();
    process.env.VITE_GA_MEASUREMENT_ID = "G-AB12CD34";
    expect(measurementId()).toBe("G-AB12CD34");
    expect(analyticsEnabled()).toBe(true);
  });

  it("accepts the production Skylink id shape without storing it in source", () => {
    process.env.VERCEL_ENV = "production";
    process.env.VITE_GA_MEASUREMENT_ID = "G-4K1WQMFLY6";
    expect(measurementId()).toBe("G-4K1WQMFLY6");
    expect(analyticsEnabled()).toBe(true);
  });

  it("stays disabled on preview even with a valid id", () => {
    process.env.VITE_GA_MEASUREMENT_ID = "G-AB12CD34";
    process.env.VERCEL_ENV = "preview";
    expect(measurementId()).toBe("G-AB12CD34");
    expect(analyticsEnabled()).toBe(false);
  });

  it("stays disabled locally without an explicit force flag", () => {
    process.env.VITE_GA_MEASUREMENT_ID = "G-AB12CD34";
    delete process.env.VERCEL_ENV;
    expect(analyticsEnabled()).toBe(false);
    process.env.SKYLINK_FORCE_ANALYTICS = "true";
    expect(analyticsEnabled()).toBe(true);
  });
});

describe("analytics events", () => {
  it("strips query strings and contact-like values from parameters", () => {
    expect(
      sanitizeAnalyticsParams({
        page_path: "/contact?intent=quote&name=Ada",
        service: "residential-installation",
        product: "user@example.com",
        placement: "inline",
      }),
    ).toMatchObject({
      page_path: "/contact",
      service: "residential-installation",
      product: "",
      placement: "inline",
    });
  });

  it("does not call gtag when analytics is disabled", () => {
    delete process.env.VITE_GA_MEASUREMENT_ID;
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag, location: { pathname: "/contact" } });
    trackEvent("quote_submit", { service: "residential-installation" });
    emitEnquiryAccepted("quote", { service: "residential-installation" });
    trackPageView("/contact");
    expect(gtag).not.toHaveBeenCalled();
  });

  it("sends only the mapped submit event after acceptance when enabled", () => {
    enableAnalyticsEnv();
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag, location: { pathname: "/contact" } });
    emitEnquiryAccepted("product", { product: "starlink-mini" });
    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag.mock.calls[0]?.[0]).toBe("event");
    expect(gtag.mock.calls[0]?.[1]).toBe("product_enquiry");
    const payload = gtag.mock.calls[0]?.[2] as Record<string, string>;
    expect(payload.product).toBe("starlink-mini");
    expect(payload.page_path).toBe("/contact");
    expect(JSON.stringify(payload)).not.toMatch(/name|email|phone|message/i);
  });

  it("does not inject a script when disabled", () => {
    delete process.env.VITE_GA_MEASUREMENT_ID;
    const querySelector = vi.fn(() => null);
    vi.stubGlobal("document", {
      head: { appendChild: vi.fn() },
      querySelector,
      createElement: vi.fn(),
    });
    vi.stubGlobal("window", {});
    installAnalytics();
    expect(querySelector).not.toHaveBeenCalled();
  });

  it("loads the Google tag with send_page_view disabled and privacy flags", () => {
    enableAnalyticsEnv();
    const script = {
      async: false,
      src: "",
      dataset: {} as Record<string, string>,
    };
    const appendChild = vi.fn();
    vi.stubGlobal("document", {
      head: { appendChild },
      querySelector: vi.fn(() => null),
      createElement: vi.fn(() => script),
      title: "Home",
    });
    const dataLayer: unknown[] = [];
    vi.stubGlobal("window", {
      dataLayer,
      location: { pathname: "/", origin: "https://www.skylink.ng" },
    });
    installAnalytics();
    expect(script.src).toContain(
      "https://www.googletagmanager.com/gtag/js?id=G-AB12CD34",
    );
    expect(appendChild).toHaveBeenCalledOnce();
    const configCall = dataLayer.find(
      (entry) => Array.isArray(entry) && entry[0] === "config",
    ) as unknown[] | undefined;
    expect(configCall?.[1]).toBe("G-AB12CD34");
    expect(configCall?.[2]).toMatchObject({
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  });

  it("tracks one page_view per path and dedupes identical paths", () => {
    enableAnalyticsEnv();
    const gtag = vi.fn();
    vi.stubGlobal("window", {
      gtag,
      location: { pathname: "/", origin: "https://www.skylink.ng" },
    });
    vi.stubGlobal("document", { title: "Skylink — home" });
    trackPageView("/");
    trackPageView("/");
    trackPageView("/services");
    trackPageView("/services");
    const pageViews = gtag.mock.calls.filter(
      (call) => call[0] === "event" && call[1] === "page_view",
    );
    expect(pageViews).toHaveLength(2);
    expect(pageViews[0]?.[2]).toMatchObject({ page_path: "/" });
    expect(pageViews[1]?.[2]).toMatchObject({ page_path: "/services" });
    expect(JSON.stringify(pageViews)).not.toMatch(/name|email|phone|message/i);
  });

  it("does not install twice", () => {
    enableAnalyticsEnv();
    const script = {
      async: false,
      src: "",
      dataset: {} as Record<string, string>,
    };
    const appendChild = vi.fn();
    const querySelector = vi
      .fn()
      .mockReturnValueOnce(null)
      .mockReturnValue({ dataset: { skylinkAnalytics: "ga4" } });
    vi.stubGlobal("document", {
      head: { appendChild },
      querySelector,
      createElement: vi.fn(() => script),
    });
    vi.stubGlobal("window", { dataLayer: [], location: { pathname: "/" } });
    installAnalytics();
    installAnalytics();
    expect(appendChild).toHaveBeenCalledTimes(1);
  });
});
