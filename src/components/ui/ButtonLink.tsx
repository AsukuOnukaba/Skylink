import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "primaryOnDark" | "secondaryOnDark";

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

const baseClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-sm font-semibold no-underline transition-colors focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]";

type InternalProps = LinkProps & {
  variant?: Variant;
  external?: false;
};

type ExternalProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  variant?: Variant;
  external: true;
  href: string;
  children?: ReactNode;
};

type ButtonLinkProps = InternalProps | ExternalProps;

export function ButtonLink(props: ButtonLinkProps) {
  if (props.external) {
    const { className, variant = "primary", children, href, external: _e, ...rest } =
      props;
    return (
      <a
        className={cn(baseClass, variantClass[variant], className)}
        href={href}
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { className, variant = "primary", children, external: _e, ...rest } =
    props;
  return (
    <Link
      className={cn(baseClass, variantClass[variant], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
