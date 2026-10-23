import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
};

export function Select({ className, invalid, id, children, ...rest }: SelectProps) {
  return (
    <select
      id={id}
      className={cn(
        "w-full rounded-sm border border-slate-200 bg-white px-3 py-2 text-base text-slate-700",
        "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
        "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500",
        invalid && "border-danger aria-invalid:border-danger",
        className,
      )}
      aria-invalid={invalid || undefined}
      {...rest}
    >
      {children}
    </select>
  );
}
