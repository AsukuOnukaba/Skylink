import type { ReactNode } from "react";
import { FloatingContact } from "@/components/contact/FloatingContact";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-white focus:px-3 focus:py-2 focus:text-sky-700"
      >
        Skip to content
      </a>
      <SiteHeader />
      {children}
      <SiteFooter />
      <FloatingContact />
    </div>
  );
}
