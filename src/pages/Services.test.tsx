import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Services } from "./Services";

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Services hub", () => {
  it("does not list unpublished draft offerings or internal planning language", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <Services />
      </MemoryRouter>,
    );
    expect(html).toMatch(/<h1[^>]*>Services<\/h1>/);
    expect(html).not.toMatch(/Residential installation/);
    expect(html).not.toMatch(/\/services\/residential-installation/);
    expect(html).not.toMatch(/\bOD-\d+\b|\bPH-\d+\b|candidate catalogue/i);
  });
});
