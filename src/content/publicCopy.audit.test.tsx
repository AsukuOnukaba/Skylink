import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { Faq } from "@/pages/Faq";
import { Home } from "@/pages/Home";
import { Locations } from "@/pages/Locations";
import { NotFound } from "@/pages/NotFound";
import { Privacy } from "@/pages/Privacy";
import { Products } from "@/pages/Products";
import { Services } from "@/pages/Services";
import { Terms } from "@/pages/Terms";

const forbiddenPublic = [
  /\bOD-\d+\b/i,
  /\bPH-\d+\b/i,
  /\bCP-[A-Z]\b/i,
  /lorem ipsum/i,
  /TODO:/i,
  /placeholder copy/i,
] as const;

const pages: Array<{ name: string; path: string; element: ReactElement }> = [
    { name: "Home", path: "/", element: <Home /> },
    { name: "Services", path: "/services", element: <Services /> },
    { name: "Products", path: "/products", element: <Products /> },
    { name: "Locations", path: "/locations", element: <Locations /> },
    { name: "About", path: "/about", element: <About /> },
    { name: "Contact", path: "/contact", element: <Contact /> },
    { name: "FAQ", path: "/faq", element: <Faq /> },
    { name: "Privacy", path: "/privacy", element: <Privacy /> },
    { name: "Terms", path: "/terms", element: <Terms /> },
    { name: "NotFound", path: "/missing-page", element: <NotFound /> },
];

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("public copy audit", () => {
  for (const page of pages) {
    it(`${page.name} keeps planning jargon and unverified NAP out of the render`, () => {
      const html = renderToStaticMarkup(
        <MemoryRouter initialEntries={[page.path]}>
          <Routes>
            <Route path={page.path === "/" ? "/" : page.path} element={page.element} />
            <Route path="*" element={page.element} />
          </Routes>
        </MemoryRouter>,
      );
      expect(html).toMatch(/<h1\b/i);
      for (const pattern of forbiddenPublic) {
        expect(html, `${page.name} matched ${pattern}`).not.toMatch(pattern);
      }
    });
  }
});
