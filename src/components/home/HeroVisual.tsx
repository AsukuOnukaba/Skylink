import { Picture } from "@/components/ui/Picture";

const HERO_SRC = "/images/hero-starlink-installation.jpeg";

/**
 * Homepage hero photograph — real Starlink installation hardware on site.
 * Shown as illustrative installation context, not as a labelled Skylink project case study.
 */
export function HeroVisual() {
  return (
    <figure className="overflow-hidden rounded-xl border border-white/10 bg-navy-800/60 shadow-md">
      <div className="aspect-[4/5] w-full overflow-hidden sm:aspect-[5/6]">
        <Picture
          src={HERO_SRC}
          alt="Starlink dish mounted on a pole beside solar panels on a building roof"
          priority
          className="h-full w-full object-cover object-center"
        />
      </div>
      <figcaption className="border-t border-white/10 px-5 py-4">
        <p className="text-sm font-medium text-sky-300">
          Installation and connectivity support
        </p>
        <p className="mt-1 text-sm leading-relaxed text-slate-400">
          Practical help getting Starlink working at your location.
        </p>
      </figcaption>
    </figure>
  );
}
