import { afterEach, describe, expect, it, vi } from "vitest";
import { analyticsEnabled, measurementId } from "./config";
import { emitEnquiryAccepted } from "./enquiryEvents";
import {
  installAnalytics,
  sanitizeAnalyticsParams,
  trackEvent,
} from "./track";

const ORIGINAL = { ...process.env };

afterEach(() => {
  for (const key of Object.keys(process.env)) {
    if (!(key in ORIGINAL)) delete process.env[key];
  }
  Object.assign(process.env, ORIGINAL);
  delete process.env.VITE_GA_MEASUREMENT_ID;
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("analytics config", () => {
  it("stays disabled without a measurement id", () => {
    delete process.env.VITE_GA_MEASUREMENT_ID;
    expect(measurementId()).toBeNull();
    expect(analyticsEnabled()).toBe(false);
  });

  it("rejects placeholders and accepts a well-formed id", () => {
    process.env.VITE_GA_MEASUREMENT_ID = "G-XXXXXXXX";
    expect(measurementId()).toBeNull();
    process.env.VITE_GA_MEASUREMENT_ID = "not-an-id";
    expect(measurementId()).toBeNull();
    process.env.VITE_GA_MEASUREMENT_ID = "G-AB12CD34";
    expect(measurementId()).toBe("G-AB12CD34");
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
    ).toEqual({
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
    expect(gtag).not.toHaveBeenCalled();
  });

  it("sends only the mapped submit event after acceptance when enabled", () => {
    process.env.VITE_GA_MEASUREMENT_ID = "G-AB12CD34";
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
    expect(gtag.mock.calls.some((call) => call[1] === "page_view")).toBe(false);
  });

  it("does not inject a script when disabled", () => {
    delete process.env.VITE_GA_MEASUREMENT_ID;
    const querySelector = vi.fn(() => null);
    vi.stubGlobal("document", {
      head: { appendChild: vi.fn() },
      querySelector,
      createElement: vi.fn(),
    });
    installAnalytics();
    expect(querySelector).not.toHaveBeenCalled();
  });

  it("loads the Google tag without a manual page_view when an id is set", () => {
    process.env.VITE_GA_MEASUREMENT_ID = "G-AB12CD34";
    const script = { async: false, src: "", dataset: {} as Record<string, string> };
    const appendChild = vi.fn();
    vi.stubGlobal("document", {
      head: { appendChild },
      querySelector: vi.fn(() => null),
      createElement: vi.fn(() => script),
    });
    const dataLayer: unknown[] = [];
    vi.stubGlobal("window", { dataLayer, location: { pathname: "/" } });
    installAnalytics();
    expect(script.src).toContain("https://www.googletagmanager.com/gtag/js?id=G-AB12CD34");
    expect(appendChild).toHaveBeenCalledOnce();
    const commands = dataLayer.map((entry) => (entry as unknown[])[0]);
    expect(commands).toContain("config");
    expect(commands).not.toContain("event");
  });
});
