import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "primaryOnDark" | "secondaryOnDark";

type ButtonLinkProps = LinkProps & {
  variant?: Variant;
};

const variantClass: Record<Variant, string> = {
  primary:
    "bg-sky-700 text-white hover:bg-[var(--sky-700-hover)]",
  secondary:
    "border border-sky-700 bg-white text-sky-700 hover:bg-slate-100",
  ghost: "bg-transparent text-sky-700 hover:bg-slate-100",
  primaryOnDark:
    "bg-sky-500 text-navy-950 hover:bg-sky-300",
  secondaryOnDark:
    "border border-white/70 bg-transparent text-white hover:bg-white/10",
};

export function ButtonLink({
  className,
  variant = "primary",
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-sm font-semibold no-underline transition-colors",
        "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
        variantClass[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
