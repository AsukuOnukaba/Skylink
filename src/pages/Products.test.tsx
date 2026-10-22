import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { products, type ProductRecord } from "@/data/products";
import { ProductDetail } from "./ProductDetail";
import { Products } from "./Products";

const sampleProduct: ProductRecord = {
  slug: "sample-terminal",
  name: "Sample terminal",
  manufacturer: "Example",
  shortDescription: "A cleared sample for template tests only.",
  description: "Longer description used only inside unit tests.",
  specs: [{ label: "Use", value: "Test fixture" }],
  whatsInBox: ["Terminal"],
  priceNgn: 0,
  pricePublished: false,
  availabilityNote: "",
  relatedServiceSlugs: [],
  seoTitle: "Sample terminal — Skylink",
  seoDescription: "Sample product page description for tests.",
  published: true,
  indexable: true,
};

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  products.length = 0;
  vi.restoreAllMocks();
});

describe("Products catalogue pages", () => {
  it("renders empty catalogue without fabricating prices or cart", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <Products />
      </MemoryRouter>,
    );
    expect(html).toMatch(/<h1[^>]*>Products<\/h1>/);
    expect(html).toMatch(/Hardware conversations/);
    expect(html).not.toMatch(/₦0|NGN\s*0|add to cart|shopping cart checkout/i);
    expect(html).not.toMatch(/\bProceed to checkout\b/i);
    expect(html).not.toMatch(/\bOD-\d+\b|\bPH-\d+\b/i);
  });

  it("shows NotFound for unknown or unpublished product slugs", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/products/missing-kit"]}>
        <Routes>
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(html).toMatch(/Page not found/i);
  });

  it("renders a published product with request-pricing when price is gated", () => {
    products.push(sampleProduct);

    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/products/sample-terminal"]}>
        <Routes>
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(html).toMatch(/<h1[^>]*>Sample terminal<\/h1>/);
    expect(html).toMatch(/Request pricing/);
    expect(html).toMatch(/contact\?intent=product&amp;product=sample-terminal/);
    expect(html).not.toMatch(/₦0|add to cart|in stock|reviews/i);
  });

  it("lists only published products on the index", () => {
    products.push({ ...sampleProduct, published: false, slug: "hidden-kit" });
    products.push(sampleProduct);

    const html = renderToStaticMarkup(
      <MemoryRouter>
        <Products />
      </MemoryRouter>,
    );
    expect(html).toMatch(/Sample terminal/);
    expect(html).toMatch(/\/products\/sample-terminal/);
    expect(html).not.toMatch(/hidden-kit/);
  });
});
