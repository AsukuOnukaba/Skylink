import { cn } from "@/lib/cn";

const LOGO_SRC = "/brand/skylink-logo-primary.png";
/** Intrinsic pixel size of the approved primary logo asset. */
export const LOGO_INTRINSIC = { width: 1024, height: 682 } as const;

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
export function Logo({ className, width = 160, onDark = false }: LogoProps) {
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
        "inline-block h-auto max-w-full object-contain",
        onDark ? "bg-transparent" : "bg-transparent",
        className,
      )}
      decoding="async"
    />
  );
}
