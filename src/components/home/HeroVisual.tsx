import { Picture } from "@/components/ui/Picture";

const visuals = {
  residential: {
    src: "/images/hero-starlink-installation.jpeg",
    alt: "Starlink dish installed above a residential property",
  },
  business: {
    src: "/images/service-business-connectivity.jpeg",
    alt: "Starlink dish mounted at a commercial building",
  },
  maritime: {
    src: "/images/hero-maritime-vessel.jpeg",
    alt: "Flat Starlink terminal at the bow of a working vessel at sea",
  },
} as const;

export function HeroVisual() {
  return (
    <figure className="rounded-xl border border-white/10 bg-navy-800/60 p-3 shadow-md">
      <div className="grid aspect-[4/5] grid-cols-2 grid-rows-[minmax(0,1.5fr)_minmax(0,1fr)] gap-3 overflow-hidden rounded-lg sm:aspect-[5/6]">
        <Picture
          src={visuals.residential.src}
          alt={visuals.residential.alt}
          priority
          sizes="(max-width: 768px) 100vw, 560px"
          className="col-span-2 h-full w-full object-cover object-center"
        />
        <Picture
          src={visuals.business.src}
          alt={visuals.business.alt}
          sizes="(max-width: 768px) 50vw, 280px"
          className="h-full w-full object-cover object-center"
        />
        <Picture
          src={visuals.maritime.src}
          alt={visuals.maritime.alt}
          sizes="(max-width: 768px) 50vw, 280px"
          className="h-full w-full object-cover object-[center_40%]"
        />
      </div>
      <figcaption className="px-2 pb-1 pt-4">
        <p className="text-sm font-medium text-sky-300">
          Homes, businesses, enterprises and maritime operations
        </p>
        <p className="mt-1 text-sm leading-relaxed text-slate-400">
          Installation and network planning shaped around each environment.
        </p>
      </figcaption>
    </figure>
  );
}
