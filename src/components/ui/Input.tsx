import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export function Input({ className, invalid, id, ...rest }: InputProps) {
  return (
    <input
      id={id}
      className={cn(
        "w-full rounded-sm border border-slate-200 bg-white px-3 py-2 text-base text-slate-700",
        "placeholder:text-slate-500",
        "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
        "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500",
        invalid && "border-danger aria-invalid:border-danger",
        className,
      )}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
}
