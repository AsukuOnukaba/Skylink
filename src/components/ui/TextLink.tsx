import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

const base =
  "font-medium text-sky-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] rounded-sm";

type TextLinkProps = {
  className?: string;
  children?: ReactNode;
} & (
  | ({ external?: false; to: string } & Omit<
      ComponentPropsWithoutRef<typeof Link>,
      "to" | "className" | "children"
    >)
  | ({ external: true; href: string; to?: never } & Omit<
      ComponentPropsWithoutRef<"a">,
      "href" | "className" | "children"
    >)
);

export function TextLink(props: TextLinkProps) {
  if (props.external) {
    const { className, children, href, external: _e, ...rest } = props;
    return (
      <a
        className={cn(base, className)}
        href={href}
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { className, children, to, external: _e, ...rest } = props;
  return (
    <Link className={cn(base, className)} to={to} {...rest}>
      {children}
    </Link>
  );
}
