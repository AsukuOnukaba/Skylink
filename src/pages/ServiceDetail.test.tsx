import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ServiceDetail } from "./ServiceDetail";

const internalPlanningPatterns = [
  /\bOD-\d+\b/i,
  /\bPH-\d+\b/i,
  /candidate catalogue/i,
  /content pending/i,
] as const;

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

function renderAt(path: string): string {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/services/:slug" element={<ServiceDetail />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("ServiceDetail publication guards", () => {
  it("shows NotFound for unknown service slugs", () => {
    const unknown = renderAt("/services/not-a-real-service");
    expect(unknown).toMatch(/Page not found/i);
    expect(unknown).not.toMatch(/Residential installation/);
  });

  it("renders published residential installation with SEO fields and honest CTA", () => {
    const html = renderAt("/services/residential-installation");
    expect(html).toMatch(/<h1[^>]*>Residential installation<\/h1>/);
    expect(html).toMatch(/Overview/);
    expect(html).toMatch(
      /contact\?intent=survey&amp;service=residential-installation/,
    );
    expect(html).toMatch(/sky view|mounting|cable/i);
    expect(html).not.toMatch(/shopping cart|checkout|add to cart/i);
    for (const pattern of internalPlanningPatterns) {
      expect(html, `matched forbidden pattern: ${pattern}`).not.toMatch(
        pattern,
      );
    }
  });
});
