import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HERO_BACKGROUND_SRC, HeroVisual } from "./HeroVisual";

describe("HeroVisual", () => {
  it("uses the maritime background instead of the installation collage", () => {
    const html = renderToStaticMarkup(<HeroVisual />);
    expect(html).toContain(HERO_BACKGROUND_SRC);
    expect(html).toContain("hero-photo");
    expect(html).not.toContain("/images/hero-starlink-installation.jpeg");
    expect(html).not.toContain("/images/service-business-connectivity.jpeg");
    expect(html).not.toContain("/images/hero-maritime-vessel.jpeg");
  });
});
