import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HeroVisual } from "./HeroVisual";

describe("HeroVisual", () => {
  it("uses a vessel photograph rather than a residential rooftop", () => {
    const html = renderToStaticMarkup(<HeroVisual />);
    expect(html).toContain("/images/hero-maritime-vessel.jpeg");
    expect(html).toMatch(/working vessel at sea/i);
    expect(html).not.toContain("/images/hero-starlink-installation.jpeg");
    expect(html).not.toContain("/images/hero-starlink-tile-roof.jpeg");
    expect(html).not.toMatch(/\bOD-\d+\b|\bPH-\d+\b|portfolio|datagram/i);
  });
});
