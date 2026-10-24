import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { locations, type LocationRecord } from "@/data/locations";
import { LocationOrNotFound } from "./LocationOrNotFound";
import { Locations } from "./Locations";
import { placeKeyFromPath } from "./LocationDetail";

const catalogueSnapshot: LocationRecord[] = [...locations];

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
  locations.splice(0, locations.length, ...catalogueSnapshot);
});

afterEach(() => {
  locations.splice(0, locations.length, ...catalogueSnapshot);
  vi.restoreAllMocks();
});

describe("Locations pages", () => {
  it("parses canonical place paths and rejects /locations/{place}", () => {
    expect(placeKeyFromPath("/starlink-installation-lagos")).toBe("lagos");
    expect(placeKeyFromPath("/locations/lagos")).toBeUndefined();
  });

  it("lists published places on the index with canonical detail URLs only", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <Locations />
      </MemoryRouter>,
    );
    expect(html).toMatch(/<h1[^>]*>Service areas<\/h1>/);
    expect(html).toMatch(/Lagos/);
    expect(html).toMatch(/\/starlink-installation-lagos/);
    expect(html).not.toMatch(/\/locations\/lagos/);
    expect(html).toMatch(/Owerri/);
    expect(html).toMatch(/\/starlink-installation-owerri/);
    expect(html).toMatch(/Delta State/);
    expect(html).not.toMatch(/\bOD-\d+\b|\bPH-\d+\b/i);
  });

  it("shows NotFound for unknown and unpublished place keys", () => {
    const unknown = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/starlink-installation-kano"]}>
        <Routes>
          <Route path="*" element={<LocationOrNotFound />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(unknown).toMatch(/Page not found/i);

    const draft = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/starlink-installation-kano"]}>
        <Routes>
          <Route path="*" element={<LocationOrNotFound />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(draft).toMatch(/Page not found/i);
    expect(draft).not.toMatch(/Kano State/);
  });

  it("renders a published place with localContext and contact prefill", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/starlink-installation-lagos"]}>
        <Routes>
          <Route path="*" element={<LocationOrNotFound />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(html).toMatch(/Lagos/);
    expect(html).toMatch(/Victoria Island|Lekki|Ikoyi|mainland/i);
    expect(html).toMatch(/contact\?intent=quote&amp;location=Lagos/);
    expect(html).not.toMatch(/\/locations\/lagos/);
  });
});
