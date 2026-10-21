import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  loading?: boolean;
};

const variantClass: Record<Variant, string> = {
  primary:
    "bg-sky-700 text-white hover:bg-[var(--sky-700-hover)] disabled:bg-slate-200 disabled:text-slate-500",
  secondary:
    "border border-sky-700 bg-white text-sky-700 hover:bg-slate-100 disabled:border-slate-200 disabled:text-slate-500",
  ghost:
    "bg-transparent text-sky-700 hover:bg-slate-100 disabled:text-slate-500",
};

export function Button({
  className,
  variant = "primary",
  loading = false,
  disabled,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm px-4 py-2.5 text-sm font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
        "disabled:cursor-not-allowed",
        variantClass[variant],
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? "Working…" : children}
    </button>
  );
}
