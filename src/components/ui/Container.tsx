import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "header" | "footer" | "main";
};

export function Container({
  as: Tag = "div",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-[min(100%-2rem,var(--container-max))]", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
