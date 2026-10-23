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
  /marked\s+published/i,
  /no published service/i,
  /pipeline fixture/i,
  /image rights are approved/i,
  /development structure/i,
  /pending\s+(OD|business|final)/i,
  /prototype build/i,
  /not a production launch/i,
  /awaiting/i,
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
  it("does not expose internal planning language when no services are published", () => {
    const html = renderHomeHtml();

    expect(html).toContain("Starlink installation and connectivity");
    expect(html).not.toContain('id="services"');

    for (const pattern of internalPlanningPatterns) {
      expect(html, `matched forbidden pattern: ${pattern}`).not.toMatch(
        pattern,
      );
    }
  });

  it("does not promise a working enquiry submission or follow-up", () => {
    const html = renderHomeHtml();
    for (const pattern of falseCapabilityPatterns) {
      expect(html, `matched false capability: ${pattern}`).not.toMatch(pattern);
    }
    expect(html).toMatch(/Contact for current reach options/i);
    expect(html).not.toMatch(/9060976424|906 097 6424/);
  });
});
