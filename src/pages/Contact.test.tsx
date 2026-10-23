import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.resetModules();
  vi.doUnmock("@/config/enquiryForms");
});

async function renderContact(
  path = "/contact?intent=quote",
  formsEnabled = false,
): Promise<string> {
  vi.doMock("@/config/enquiryForms", () => ({
    areEnquiryFormsEnabled: () => formsEnabled,
  }));
  const { Contact } = await import("./Contact");
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("Contact customer-facing copy", () => {
  it("keeps forms disabled by default without NAP or a submit workflow", async () => {
    const html = await renderContact();
    expect(html).toMatch(/Online enquiry form is not available/i);
    expect(html).toMatch(/not open on this website yet/i);
    expect(html).not.toMatch(/type="submit"|Send quote request|Send survey/i);
    expect(html).not.toMatch(/follow up using the details you share/i);
    expect(html).not.toMatch(/\bOD-\d+\b/i);
    expect(html).not.toMatch(/9060976424|906 097 6424/);
    expect(html).not.toMatch(/tel:\+234/);
    expect(html).not.toMatch(/wa\.me\//);
  });

  it("surfaces verified service/product/location context from the query", async () => {
    const html = await renderContact(
      "/contact?intent=product&product=starlink-gen3-standard&service=residential-installation&location=Lagos",
    );
    expect(html).toMatch(/Starlink Gen 3 Standard kit/);
    expect(html).toMatch(/Residential installation/);
    expect(html).toMatch(/Lagos/);
    expect(html).toMatch(/Online enquiry form is not available/i);
    expect(html).not.toMatch(/sample-terminal/);
  });

  it("ignores unknown catalogue slugs in the query string", async () => {
    const html = await renderContact(
      "/contact?intent=quote&service=not-a-real-service&product=missing-kit",
    );
    expect(html).not.toMatch(/not-a-real-service|missing-kit/);
    expect(html).toMatch(/Online enquiry form is not available/i);
  });

  it("renders quote, survey, and product fields when forms are enabled", async () => {
    const quote = await renderContact("/contact?intent=quote", true);
    expect(quote).toMatch(/Request a quote/);
    expect(quote).toMatch(/Send quote request/);
    expect(quote).toMatch(/name="service"/);
    expect(quote).toMatch(/Residential installation/);
    expect(quote).not.toMatch(/Online enquiry form is not available/i);

    const survey = await renderContact(
      "/contact?intent=survey&service=residential-installation",
      true,
    );
    expect(survey).toMatch(/Request a site survey/);
    expect(survey).toMatch(/Send survey request/);
    expect(survey).toMatch(/value="residential-installation"/);

    const product = await renderContact(
      "/contact?intent=product&product=starlink-mini",
      true,
    );
    expect(product).toMatch(/Product enquiry/);
    expect(product).toMatch(/Send product enquiry/);
    expect(product).toMatch(/name="product"/);
    expect(product).toMatch(/value="starlink-mini"/);
    expect(product).toMatch(/does not reserve stock/i);
  });
});
