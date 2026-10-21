/**
 * Brand illustration for the homepage hero.
 * Decorative graphic — not a photograph of a Skylink installation or customer site.
 */
export function HeroVisual() {
  return (
    <figure className="overflow-hidden rounded-xl border border-white/10 bg-navy-800/60 shadow-md">
      <svg
        viewBox="0 0 640 420"
        role="img"
        aria-labelledby="hero-visual-title hero-visual-desc"
        className="h-auto w-full"
      >
        <title id="hero-visual-title">Skylink connectivity illustration</title>
        <desc id="hero-visual-desc">
          Stylised satellite dish and signal arcs on a deep navy field,
          representing Starlink installation and connectivity support.
        </desc>
        <defs>
          <linearGradient id="hero-sky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#12344b" />
            <stop offset="100%" stopColor="#071a2b" />
          </linearGradient>
          <linearGradient id="hero-glow" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#159fd0" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#159fd0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="640" height="420" fill="url(#hero-sky)" />
        <circle cx="470" cy="90" r="120" fill="url(#hero-glow)" />
        <circle
          cx="420"
          cy="150"
          r="118"
          fill="none"
          stroke="#79c9e8"
          strokeOpacity="0.2"
          strokeWidth="1.5"
        />
        <circle
          cx="420"
          cy="150"
          r="86"
          fill="none"
          stroke="#159fd0"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <circle
          cx="420"
          cy="150"
          r="54"
          fill="none"
          stroke="#79c9e8"
          strokeOpacity="0.55"
          strokeWidth="2"
        />
        {/* Dish */}
        <ellipse
          cx="250"
          cy="250"
          rx="110"
          ry="36"
          fill="#00537d"
          transform="rotate(-18 250 250)"
        />
        <path
          d="M180 230 C210 170, 290 160, 330 210"
          fill="none"
          stroke="#79c9e8"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <circle cx="318" cy="198" r="10" fill="#159fd0" />
        <path
          d="M250 268 L250 340"
          stroke="#344b5b"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M210 340 H290"
          stroke="#344b5b"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Signal arcs */}
        <path
          d="M340 170 C380 130, 430 120, 470 140"
          fill="none"
          stroke="#79c9e8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity="0.9"
        />
        <path
          d="M350 195 C400 150, 460 140, 510 170"
          fill="none"
          stroke="#159fd0"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        <path
          d="M360 220 C420 170, 490 165, 540 205"
          fill="none"
          stroke="#79c9e8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.45"
        />
      </svg>
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
