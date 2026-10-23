import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { locations, type LocationRecord } from "@/data/locations";
import { LocationOrNotFound } from "./LocationOrNotFound";
import { Locations } from "./Locations";
import { placeKeyFromPath } from "./LocationDetail";

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  locations.length = 0;
  vi.restoreAllMocks();
});

describe("Locations pages", () => {
  it("parses canonical place paths and rejects /locations/{place}", () => {
    expect(placeKeyFromPath("/starlink-installation-lagos")).toBe("lagos");
    expect(placeKeyFromPath("/locations/lagos")).toBeUndefined();
  });

  it("renders empty index without fabricating cities or dual detail URLs", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <Locations />
      </MemoryRouter>,
    );
    expect(html).toMatch(/<h1[^>]*>Service areas<\/h1>/);
    expect(html).not.toMatch(/\/locations\/lagos/);
    expect(html).not.toMatch(/\bOD-\d+\b|\bPH-\d+\b/i);
  });

  it("shows NotFound for unpublished or unknown place keys", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/starlink-installation-lagos"]}>
        <Routes>
          <Route path="*" element={<LocationOrNotFound />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(html).toMatch(/Page not found/i);
  });

  it("renders a published place only with real localContext", () => {
    const record: LocationRecord = {
      placeKey: "sample-town",
      placeName: "Sample Town",
      regionLabel: "Test region",
      headline: "Starlink installation in Sample Town",
      intro: "Clear local support when crews can attend.",
      localContext:
        "Sample Town estates often need roof access permission before mounting.",
      relatedServiceSlugs: [],
      faqs: [],
      seoTitle: "Starlink installation in Sample Town — Skylink",
      seoDescription: "Local Starlink installation notes for Sample Town.",
      published: true,
      indexable: true,
    };
    locations.push(record);

    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/starlink-installation-sample-town"]}>
        <Routes>
          <Route path="*" element={<LocationOrNotFound />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(html).toMatch(/Sample Town/);
    expect(html).toMatch(/roof access permission/);
    expect(html).toMatch(/contact\?intent=quote&amp;location=Sample%20Town/);
    expect(html).not.toMatch(/\/locations\/sample-town/);
  });
});
