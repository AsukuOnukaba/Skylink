import { useEffect, useId, useState } from "react";
import { Picture } from "@/components/ui/Picture";
import { cn } from "@/lib/cn";

const ROTATE_MS = 5500;

type HeroSlide = {
  src: string;
  alt: string;
  objectPosition: string;
};

/**
 * Cleared installation photographs for the homepage hero.
 * Generic install context — not labelled as Skylink portfolio case studies.
 */
const heroSlides: HeroSlide[] = [
  {
    src: "/images/hero-starlink-installation.jpeg",
    alt: "Starlink dishes mounted on the side of a residential building under a clear sky",
    objectPosition: "object-[center_20%]",
  },
  {
    src: "/images/hero-starlink-pole-solar.jpeg",
    alt: "Starlink dish on a pole beside solar panels on a corrugated roof",
    objectPosition: "object-center",
  },
  {
    src: "/images/hero-starlink-rooftop-hp.jpeg",
    alt: "High-performance Starlink terminal mounted on a rooftop overlooking nearby homes",
    objectPosition: "object-[center_30%]",
  },
  {
    src: "/images/hero-starlink-tile-roof.jpeg",
    alt: "Starlink dish secured to a tiled residential roof with neat cable routing",
    objectPosition: "object-center",
  },
];

/**
 * Homepage hero photograph rotator. Crossfades cleared install shots every few
 * seconds; pauses when the visitor prefers reduced motion.
 */
export function HeroVisual() {
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion || heroSlides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const active = heroSlides[index] ?? heroSlides[0];

  return (
    <figure
      className="overflow-hidden rounded-xl border border-white/10 bg-navy-800/60 shadow-md"
      aria-labelledby={labelId}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy-950 sm:aspect-[5/6]">
        {heroSlides.map((slide, slideIndex) => {
          const isActive = slideIndex === index;
          return (
            <div
              key={slide.src}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none",
                isActive ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={!isActive}
            >
              <Picture
                src={slide.src}
                alt={isActive ? slide.alt : ""}
                priority={slideIndex === 0}
                sizes="(max-width: 768px) 100vw, 560px"
                className={cn(
                  "h-full w-full object-cover",
                  slide.objectPosition,
                )}
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
        <figcaption id={labelId}>
          <p className="text-sm font-medium text-sky-300">
            Real Starlink installation work
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            Professional mounting and cabling so connectivity is ready at the
            site.
          </p>
        </figcaption>
        {heroSlides.length > 1 ? (
          <div
            className="flex shrink-0 items-center gap-1.5"
            role="group"
            aria-label="Installation photos"
          >
            {heroSlides.map((slide, slideIndex) => (
              <button
                key={slide.src}
                type="button"
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-colors focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                  slideIndex === index
                    ? "bg-sky-400"
                    : "bg-white/30 hover:bg-white/50",
                )}
                aria-label={`Show installation photo ${slideIndex + 1} of ${heroSlides.length}`}
                aria-current={slideIndex === index ? "true" : undefined}
                onClick={() => setIndex(slideIndex)}
              />
            ))}
          </div>
        ) : null}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing installation photo {index + 1} of {heroSlides.length}:{" "}
        {active.alt}
      </p>
    </figure>
  );
}
