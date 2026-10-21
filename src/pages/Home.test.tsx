import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Home } from "./Home";

/** Patterns that belong in planning docs, not visitor-facing homepage copy. */
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
});
