import type { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

export function Label({ className, required, children, ...rest }: LabelProps) {
  return (
    <label
      className={cn("mb-1 block text-sm font-medium text-navy-800", className)}
      {...rest}
    >
      {children}
      {required ? (
        <span className="text-danger" aria-hidden="true">
          {" "}
          *
        </span>
      ) : null}
    </label>
  );
}
