import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EnquiryForm } from "./EnquiryForm";

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("EnquiryForm field sets", () => {
  it("shows service select for quote and survey, product select for product", () => {
    const quote = renderToStaticMarkup(
      <EnquiryForm
        kind="quote"
        prefill={{ serviceSlug: "residential-installation", locationLabel: "Abuja" }}
      />,
    );
    expect(quote).toMatch(/Request a quote/);
    expect(quote).toMatch(/name="service"/);
    expect(quote).toMatch(/value="residential-installation"/);
    expect(quote).toMatch(/value="Abuja"/);
    expect(quote).not.toMatch(/name="product"/);
    expect(quote).toMatch(/name="companyWebsite"/);
    expect(quote).toMatch(/Preferred contact method/);

    const survey = renderToStaticMarkup(
      <EnquiryForm kind="survey" prefill={{ serviceSlug: "business-connectivity" }} />,
    );
    expect(survey).toMatch(/Request a site survey/);
    expect(survey).toMatch(/name="service"/);
    expect(survey).toMatch(/value="business-connectivity"/);

    const product = renderToStaticMarkup(
      <EnquiryForm
        kind="product"
        prefill={{ productSlug: "starlink-gen3-standard" }}
      />,
    );
    expect(product).toMatch(/Product enquiry/);
    expect(product).toMatch(/name="product"/);
    expect(product).toMatch(/value="starlink-gen3-standard"/);
    expect(product).not.toMatch(/name="service"/);
  });

  it("ignores unpublished or unknown prefill slugs", () => {
    const html = renderToStaticMarkup(
      <EnquiryForm
        kind="quote"
        prefill={{ serviceSlug: "not-published-or-real", productSlug: "nope" }}
      />,
    );
    expect(html).not.toMatch(/value="not-published-or-real"/);
    expect(html).toMatch(/Select a service/);
  });
});
