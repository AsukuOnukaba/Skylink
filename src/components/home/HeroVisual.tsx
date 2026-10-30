/**
 * Full-bleed maritime hero background.
 * The collage photographs stay in the repository; they are no longer used here.
 */
export const HERO_BACKGROUND_SRC = "/images/hero-cinematic-maritime.jpeg";

export function HeroVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="hero-kenburns hero-photo absolute inset-0"
        data-hero-image={HERO_BACKGROUND_SRC}
      />
      <div className="hero-atmosphere absolute inset-0" />
      <div className="hero-scrim absolute inset-0" />
    </div>
  );
}
