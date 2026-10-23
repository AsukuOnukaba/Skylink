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
  it("shows live phone and WhatsApp without claiming form submission", () => {
    const html = renderContact();
    expect(html).not.toMatch(/follow up using the details you share/i);
    expect(html).not.toMatch(/\bOD-\d+\b/i);
    expect(html).toMatch(/Online enquiry is not open yet/i);
    expect(html).toMatch(/\+234 906 097 6424/);
    expect(html).toMatch(/tel:\+2349060976424/);
    expect(html).toMatch(/wa\.me\/2349060976424/);
    expect(html).toMatch(/Not listed yet/i); // email still empty
  });

  it("surfaces service and product query context without opening a form", () => {
    const html = renderContact(
      "/contact?intent=product&product=sample-terminal&service=residential-installation",
    );
    expect(html).toMatch(/sample-terminal/);
    expect(html).toMatch(/residential-installation/);
    expect(html).toMatch(/Online enquiry is not open yet/i);
    expect(html).not.toMatch(/we will follow up/i);
  });
});
