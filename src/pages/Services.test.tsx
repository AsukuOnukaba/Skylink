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
  it("lists published services with detail links and keeps planning jargon out", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <Services />
      </MemoryRouter>,
    );
    expect(html).toMatch(/<h1[^>]*>Services<\/h1>/);
    expect(html).toMatch(/Residential installation/);
    expect(html).toMatch(/\/services\/residential-installation/);
    expect(html).toMatch(/Long-range Wi-Fi/);
    expect(html).not.toMatch(/\bOD-\d+\b|\bPH-\d+\b|candidate catalogue|datagram/i);
    expect(html).not.toMatch(/9060976424|info@datagram/i);
  });
});
