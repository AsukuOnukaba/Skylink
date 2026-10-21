import type { LucideIcon, LucideProps } from "lucide-react";
import { cn } from "@/lib/cn";

type IconSize = "compact" | "ui" | "feature";

const sizePx: Record<IconSize, number> = {
  compact: 16,
  ui: 20,
  feature: 32,
};

type IconProps = LucideProps & {
  icon: LucideIcon;
  size?: IconSize;
  /** Accessible name when the icon is not decorative. */
  label?: string;
};

/**
 * Lucide wrapper with branding-brief sizes (compact 16 / UI 20–24 / feature 28–36).
 */
export function Icon({
  icon: Glyph,
  size = "ui",
  label,
  className,
  ...rest
}: IconProps) {
  const px = sizePx[size];
  return (
    <Glyph
      width={px}
      height={px}
      strokeWidth={1.75}
      className={cn("shrink-0 text-current", className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      {...rest}
    />
  );
}
