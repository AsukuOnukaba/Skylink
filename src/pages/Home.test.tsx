import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Home } from "./Home";

const internalPlanningPatterns = [
  /\bOD-\d+\b/i,
  /\bPH-\d+\b/i,
  /\bCP-[A-Z]\b/i,
  /candidate catalogue/i,
  /draft records/i,
  /pipeline fixture/i,
  /prototype build/i,
  /not a production launch/i,
] as const;

const falseCapabilityPatterns = [
  /share a few details/i,
  /follow up using the details you share/i,
  /we will use that to guide the next step/i,
  /tell us about your site when you are ready to talk/i,
] as const;

function renderHomeHtml(): string {
  return renderToStaticMarkup(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation((message?: unknown) => {
    if (
      typeof message === "string" &&
      message.includes("useLayoutEffect does nothing on the server")
    ) {
      return;
    }
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Home customer-facing copy", () => {
  it("surfaces published services without planning jargon or DataGram NAP", () => {
    const html = renderHomeHtml();

    expect(html).toContain(
      "Reliable Starlink connectivity for homes, businesses, enterprises &amp; beyond.",
    );
    expect(html).toContain(
      "Serving Lagos, Abuja and Port Harcourt, with installation requirements assessed for each location.",
    );
    expect(html).toContain('href="/starlink-installation-lagos"');
    expect(html).toContain('href="/starlink-installation-abuja"');
    expect(html).toContain('href="/starlink-installation-port-harcourt"');
    expect(html).toContain('href="/contact?intent=quote"');
    expect(html).toContain('href="/services"');
    expect(html).toContain("/images/hero-cinematic-maritime.jpeg");
    expect(html).toContain('aria-label="Chat with Skylink on WhatsApp"');
    expect(html).toContain("https://wa.me/2349060976424");
    expect(html).toContain('aria-label="Ask Skylink AI"');
    expect(html).toContain('id="solutions"');
    expect(html).toContain('id="maritime"');
    expect(html).toMatch(/Our connectivity solutions/i);
    expect(html).toMatch(/\/services\/maritime-offshore/);
    expect(html).toMatch(/Residential installation/);
    expect(html).toMatch(/\/services\/residential-installation/);
    const maritimeAt = html.indexOf("/services/maritime-offshore");
    const residentialAt = html.indexOf("/services/residential-installation");
    expect(maritimeAt).toBeGreaterThan(-1);
    expect(residentialAt).toBeLessThan(maritimeAt);

    for (const pattern of internalPlanningPatterns) {
      expect(html, `matched forbidden pattern: ${pattern}`).not.toMatch(
        pattern,
      );
    }
    expect(html).toMatch(/906 097 6424/);
  });

  it("does not promise a working enquiry submission or follow-up", () => {
    const html = renderHomeHtml();
    for (const pattern of falseCapabilityPatterns) {
      expect(html, `matched false capability: ${pattern}`).not.toMatch(pattern);
    }
    expect(html).toMatch(/Contact Skylink/i);
  });
});
