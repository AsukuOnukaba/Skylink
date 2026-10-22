import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getServiceDraft } from "@/data/services";
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
  it("shows NotFound for unpublished and unknown slugs", () => {
    const unpublished = renderAt("/services/residential-installation");
    expect(unpublished).toMatch(/Page not found/i);
    expect(unpublished).not.toMatch(/Residential installation/);

    const unknown = renderAt("/services/not-a-real-service");
    expect(unknown).toMatch(/Page not found/i);
  });

  it("renders published service detail with SEO fields and honest CTA", () => {
    const draft = getServiceDraft("residential-installation");
    expect(draft).toBeDefined();
    const previous = draft!.published;
    draft!.published = true;

    try {
      const html = renderAt("/services/residential-installation");
      expect(html).toMatch(/<h1[^>]*>Residential installation<\/h1>/);
      expect(html).toMatch(/Overview/);
      expect(html).toMatch(
        /contact\?intent=survey&amp;service=residential-installation/,
      );
      expect(html).not.toMatch(/shopping cart|checkout|add to cart/i);
      for (const pattern of internalPlanningPatterns) {
        expect(html, `matched forbidden pattern: ${pattern}`).not.toMatch(
          pattern,
        );
      }
    } finally {
      draft!.published = previous;
    }
  });
});
