import { Picture } from "@/components/ui/Picture";

const HERO_SRC = "/images/hero-starlink-installation.jpeg";

/**
 * Homepage hero photograph from the cleared DataGram installation library
 * (`residentalSetup.jpeg` original). Illustrative install context — not labelled
 * as a Skylink project case study.
 */
export function HeroVisual() {
  return (
    <figure className="overflow-hidden rounded-xl border border-white/10 bg-navy-800/60 shadow-md">
      <div className="aspect-[4/5] w-full overflow-hidden bg-navy-950 sm:aspect-[5/6]">
        <Picture
          src={HERO_SRC}
          alt="Starlink dishes mounted on the side of a residential building under a clear sky"
          priority
          sizes="(max-width: 768px) 100vw, 560px"
          className="h-full w-full object-cover object-[center_20%]"
        />
      </div>
      <figcaption className="border-t border-white/10 px-5 py-4">
        <p className="text-sm font-medium text-sky-300">
          Real Starlink installation work
        </p>
        <p className="mt-1 text-sm leading-relaxed text-slate-400">
          Professional mounting and cabling so connectivity is ready at the site.
        </p>
      </figcaption>
    </figure>
  );
}
