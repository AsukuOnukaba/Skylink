import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HeroVisual } from "./HeroVisual";

describe("HeroVisual", () => {
  it("includes multiple cleared installation photographs for rotation", () => {
    const html = renderToStaticMarkup(<HeroVisual />);
    expect(html).toContain("/images/hero-starlink-installation.jpeg");
    expect(html).toContain("/images/hero-starlink-pole-solar.jpeg");
    expect(html).toContain("/images/hero-starlink-rooftop-hp.jpeg");
    expect(html).toContain("/images/hero-starlink-tile-roof.jpeg");
    expect(html).toMatch(/Installation photos/i);
    expect(html).not.toMatch(/\bOD-\d+\b|\bPH-\d+\b|portfolio/i);
  });
});
