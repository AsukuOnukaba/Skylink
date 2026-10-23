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
  it("does not claim follow-up or publish unverified phone numbers", () => {
    const html = renderContact();
    expect(html).not.toMatch(/follow up using the details you share/i);
    expect(html).not.toMatch(/\bOD-\d+\b/i);
    expect(html).toMatch(/Online enquiry is not open yet/i);
    expect(html).toMatch(/Not listed yet/i);
    expect(html).not.toMatch(/9060976424|906 097 6424/);
    expect(html).not.toMatch(/tel:\+234/);
    expect(html).not.toMatch(/wa\.me\//);
  });

  it("surfaces service, product, and location query context without opening a form", () => {
    const html = renderContact(
      "/contact?intent=product&product=sample-terminal&service=residential-installation&location=Lagos",
    );
    expect(html).toMatch(/sample-terminal/);
    expect(html).toMatch(/residential-installation/);
    expect(html).toMatch(/Lagos/);
    expect(html).toMatch(/Online enquiry is not open yet/i);
    expect(html).not.toMatch(/we will follow up/i);
  });
});
