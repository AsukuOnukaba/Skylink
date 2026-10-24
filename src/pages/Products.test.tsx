import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { products, type ProductRecord } from "@/data/products";
import { ProductDetail } from "./ProductDetail";
import { Products } from "./Products";

const catalogueSnapshot: ProductRecord[] = [...products];

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
  products.splice(0, products.length, ...catalogueSnapshot);
});

afterEach(() => {
  products.splice(0, products.length, ...catalogueSnapshot);
  vi.restoreAllMocks();
});

describe("Products catalogue pages", () => {
  it("lists published products with request-pricing and no cart", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <Products />
      </MemoryRouter>,
    );
    expect(html).toMatch(/<h1[^>]*>Products<\/h1>/);
    expect(html).toMatch(/Starlink Gen3 v4 Standard Dish/);
    expect(html).toMatch(/₦750,000/);
    expect(html).toMatch(/₦4,000,000/);
    expect(html).not.toMatch(/add to cart|shopping cart checkout/i);
    expect(html).not.toMatch(/\bProceed to checkout\b/i);
    expect(html).not.toMatch(/\bOD-\d+\b|\bPH-\d+\b/i);
  });

  it("shows NotFound for unknown product slugs", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/products/missing-kit"]}>
        <Routes>
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(html).toMatch(/Page not found/i);
  });

  it("renders a published catalogue product without inventing stock or price", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/products/starlink-gen3-standard"]}>
        <Routes>
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(html).toMatch(/<h1[^>]*>Starlink Gen3 v4 Standard Dish<\/h1>/);
    expect(html).toMatch(/₦750,000/);
    expect(html).toMatch(
      /contact\?intent=product&amp;product=starlink-gen3-standard/,
    );
    expect(html).toMatch(/does not mean the item is in stock/i);
    expect(html).not.toMatch(/add to cart/i);
  });

  it("does not list unpublished products on the index", () => {
    const hidden: ProductRecord = {
      ...catalogueSnapshot[0],
      slug: "hidden-kit",
      name: "Hidden kit",
      published: false,
      indexable: false,
    };
    products.push(hidden);

    const html = renderToStaticMarkup(
      <MemoryRouter>
        <Products />
      </MemoryRouter>,
    );
    expect(html).toMatch(/Starlink Gen3 v4 Standard Dish/);
    expect(html).not.toMatch(/Hidden kit/);
    expect(html).not.toMatch(/hidden-kit/);
  });
});
