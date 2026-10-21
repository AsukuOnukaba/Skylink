/**
 * Public route registry (PH-04). Catalogue detail routes arrive in later phases.
 * Conditionally published items (products, locations, work) stay omitted until data exists.
 */
export type AppRoute = {
  path: string;
  label: string;
  /** Show in primary header navigation. */
  primaryNav?: boolean;
  /** Show in footer explore / legal clusters. */
  footer?: "explore" | "legal";
};

export const appRoutes: AppRoute[] = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services", primaryNav: true, footer: "explore" },
  { path: "/about", label: "About", primaryNav: true, footer: "explore" },
  { path: "/contact", label: "Contact", primaryNav: true, footer: "explore" },
  { path: "/faq", label: "FAQ", footer: "legal" },
  { path: "/privacy", label: "Privacy", footer: "legal" },
  { path: "/terms", label: "Terms", footer: "legal" },
];

export const primaryNavRoutes = appRoutes.filter((r) => r.primaryNav);
export const footerExploreRoutes = appRoutes.filter((r) => r.footer === "explore");
export const footerLegalRoutes = appRoutes.filter((r) => r.footer === "legal");
