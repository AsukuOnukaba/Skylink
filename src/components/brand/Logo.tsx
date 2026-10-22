import { cn } from "@/lib/cn";

/** Cache-busted so browsers pick up logo asset replacements. */
const LOGO_SRC = "/brand/skylink-logo-primary.png?v=20261022";
/**
 * Intrinsic pixel size of the web-serving primary logo
 * (`public/brand/skylink-logo-primary.png`, display-cropped from the cleared original).
 */
export const LOGO_INTRINSIC = { width: 950, height: 669 } as const;

type LogoProps = {
  className?: string;
  /** Display width in CSS pixels; height follows intrinsic aspect ratio. */
  width?: number;
  /** Prefer dark surfaces for strongest brand match; light is supported (transparent field). */
  onDark?: boolean;
};

/**
 * Approved Skylink primary logo only.
 * Do not substitute DataGram marks or CSS-drawn wordmarks.
 */
export function Logo({ className, width = 200, onDark = false }: LogoProps) {
  const height = Math.round(
    (width * LOGO_INTRINSIC.height) / LOGO_INTRINSIC.width,
  );

  return (
    <img
      src={LOGO_SRC}
      alt="Skylink"
      width={width}
      height={height}
      className={cn(
        "inline-block max-w-full object-contain",
        // Prefer CSS sizing from className (e.g. h-8) over the intrinsic height attribute.
        className?.includes("h-") ? null : "h-auto",
        onDark ? "bg-transparent" : "bg-transparent",
        className,
      )}
      decoding="async"
    />
  );
}
