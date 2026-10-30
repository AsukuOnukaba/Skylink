import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HeroVisual } from "./HeroVisual";

describe("HeroVisual", () => {
  it("shows residential, business, and maritime environments", () => {
    const html = renderToStaticMarkup(<HeroVisual />);
    expect(html).toContain("/images/hero-starlink-installation.jpeg");
    expect(html).toContain("/images/service-business-connectivity.jpeg");
    expect(html).toContain("/images/hero-maritime-vessel.jpeg");
    expect(html).toMatch(/working vessel at sea/i);
    expect(html).not.toMatch(/\bOD-\d+\b|\bPH-\d+\b|portfolio|datagram/i);
  });
});
