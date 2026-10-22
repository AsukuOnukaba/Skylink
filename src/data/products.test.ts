import { describe, expect, it } from "vitest";
import {
  getPublishedProduct,
  hasPublishedProducts,
  products,
  publicProductPaths,
  publishedProducts,
} from "./products";

describe("products catalogue", () => {
  it("stays empty and unpublished until OD-04", () => {
    expect(products).toEqual([]);
    expect(publishedProducts()).toEqual([]);
    expect(hasPublishedProducts()).toBe(false);
    expect(publicProductPaths()).toEqual([]);
    expect(getPublishedProduct("any-kit")).toBeUndefined();
  });
});
