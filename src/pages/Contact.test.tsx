import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Contact } from "./Contact";

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

function renderContact(path = "/contact?intent=quote"): string {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("Contact customer-facing copy", () => {
  it("does not claim follow-up from details the visitor cannot submit", () => {
    const html = renderContact();
    expect(html).not.toMatch(/follow up using the details you share/i);
    expect(html).not.toMatch(/\bOD-\d+\b/i);
    expect(html).toMatch(/Online enquiry is not open yet/i);
    expect(html).toMatch(/Not listed yet/i);
  });
});
