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
    expect(html).toMatch(/South West/);
    expect(html).toMatch(/South South/);
    expect(html).toMatch(/South East/);
    expect(html).toMatch(/North Central \/ FCT/);
    expect(html).toMatch(/Lagos/);
    expect(html).toMatch(/\/starlink-installation-lagos/);
    expect(html).not.toMatch(/\/locations\/lagos/);
    expect(html).toMatch(/Imo State \/ Owerri/);
    expect(html).toMatch(/\/starlink-installation-owerri/);
    expect(html).toMatch(/Rivers State \/ Port Harcourt/);
    expect(html).toMatch(/Ibadan \(Oyo State\)/);
    expect(html).toMatch(/\/starlink-installation-ibadan/);
    expect(html).toMatch(/Ogun State/);
    expect(html).toMatch(/\/starlink-installation-ogun/);
    expect(html).toMatch(/Akwa Ibom State/);
    expect(html).toMatch(/\/starlink-installation-akwa-ibom/);
    expect(html).toMatch(/Cross River State/);
    expect(html).toMatch(/\/starlink-installation-cross-river/);
    expect(html).toMatch(/Delta State/);
    expect(html).toMatch(/Niger Delta regional guide/);
    expect(html).not.toMatch(/\bOD-\d+\b|\bPH-\d+\b/i);
  });

  it("renders new location pages with local context and quote prefills", () => {
    for (const [path, marker, locationLabel] of [
      ["/starlink-installation-ibadan", "hilltop", "Ibadan"],
      ["/starlink-installation-ogun", "industrial", "Ogun%20State"],
      ["/starlink-installation-akwa-ibom", "coastal", "Akwa%20Ibom%20State"],
      ["/starlink-installation-cross-river", "Calabar", "Cross%20River%20State"],
    ] as const) {
      const html = renderToStaticMarkup(
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="*" element={<LocationOrNotFound />} />
          </Routes>
        </MemoryRouter>,
      );
      expect(html).toMatch(new RegExp(marker, "i"));
      expect(html).toMatch(/Installation process/i);
      expect(html).toContain(
        `contact?intent=quote&amp;location=${locationLabel}`,
      );
    }
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
