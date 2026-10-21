import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Tone = "info" | "success" | "warning" | "danger";

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  tone?: Tone;
  title?: string;
};

const toneClass: Record<Tone, string> = {
  info: "border-sky-500/40 bg-slate-100 text-slate-700",
  success: "border-success/40 bg-success/10 text-success",
  warning: "border-warning/40 bg-warning/10 text-warning",
  danger: "border-danger/40 bg-danger/10 text-danger",
};

export function Alert({
  className,
  tone = "info",
  title,
  children,
  role = "status",
  ...rest
}: AlertProps) {
  return (
    <div
      role={role}
      className={cn(
        "rounded-md border px-4 py-3 text-sm",
        toneClass[tone],
        className,
      )}
      {...rest}
    >
      {title ? <p className="font-semibold">{title}</p> : null}
      {children ? <div className={title ? "mt-1" : undefined}>{children}</div> : null}
    </div>
  );
}
