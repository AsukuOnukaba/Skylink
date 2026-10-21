import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  elevated?: boolean;
};

export function Card({ className, elevated = false, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-slate-200 bg-white p-6",
        elevated && "shadow-sm",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
