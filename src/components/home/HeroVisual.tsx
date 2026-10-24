import { Picture } from "@/components/ui/Picture";

/**
 * Homepage hero photograph. A working-vessel terminal from the published
 * installation library — not labelled as a Skylink project.
 */
const hero = {
  src: "/images/hero-maritime-vessel.jpeg",
  alt: "Flat Starlink terminal at the bow of a working vessel at sea",
} as const;

export function HeroVisual() {
  return (
    <figure className="overflow-hidden rounded-xl border border-white/10 bg-navy-800/60 shadow-md">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy-950 sm:aspect-[5/6]">
        <Picture
          src={hero.src}
          alt={hero.alt}
          priority
          sizes="(max-width: 768px) 100vw, 560px"
          className="h-full w-full object-cover object-[center_40%]"
        />
      </div>
      <figcaption className="border-t border-white/10 px-5 py-4">
        <p className="text-sm font-medium text-sky-300">
          Vessel and offshore installations
        </p>
        <p className="mt-1 text-sm leading-relaxed text-slate-400">
          Mounting, cabling, and power planned for the craft or platform, not
          copied from a house install.
        </p>
      </figcaption>
    </figure>
  );
}
