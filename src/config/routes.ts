import { hasPublishedLocations } from "@/data/locations";
import { hasPublishedProducts } from "@/data/products";

/**
 * Public route registry. Catalogue routes exist in App; nav/footer items
 * appear only when at least one record is published.
 */
export type AppRoute = {
  path: string;
  label: string;
  primaryNav?: boolean;
  footer?: "explore" | "legal";
};

const staticRoutes: AppRoute[] = [
  { path: "/", label: "Home", primaryNav: true },
  {
    path: "/services/maritime-offshore",
    label: "Offshore & Maritime",
    footer: "explore",
  },
  { path: "/services", label: "Services", primaryNav: true, footer: "explore" },
  { path: "/about", label: "About", primaryNav: true, footer: "explore" },
  { path: "/contact", label: "Contact", primaryNav: true, footer: "explore" },
  { path: "/faq", label: "FAQ", footer: "legal" },
  {
    path: "/guide/starlink-nigeria",
    label: "Nigeria guide",
    footer: "explore",
  },
  { path: "/support", label: "Support", footer: "legal" },
  { path: "/our-work", label: "Installation examples", footer: "explore" },
  { path: "/gallery", label: "Gallery", footer: "explore" },
  { path: "/privacy", label: "Privacy", footer: "legal" },
  { path: "/terms", label: "Terms", footer: "legal" },
];

function catalogueNavRoutes(): AppRoute[] {
  const extra: AppRoute[] = [];
  if (hasPublishedProducts()) {
    extra.push({
      path: "/products",
      label: "Products",
      primaryNav: true,
      footer: "explore",
    });
  }
  if (hasPublishedLocations()) {
    extra.push({
      path: "/locations",
      label: "Service areas",
      primaryNav: true,
      footer: "explore",
    });
  }
  return extra;
}

export function getAppRoutes(): AppRoute[] {
  const catalogue = catalogueNavRoutes();
  if (catalogue.length === 0) {
    return staticRoutes;
  }
  const servicesIndex = staticRoutes.findIndex((r) => r.path === "/services");
  const next = [...staticRoutes];
  next.splice(servicesIndex + 1, 0, ...catalogue);
  return next;
}

export const appRoutes = getAppRoutes();
export const primaryNavRoutes = getAppRoutes().filter((r) => r.primaryNav);
export const footerExploreRoutes = getAppRoutes().filter(
  (r) => r.footer === "explore",
);
export const footerLegalRoutes = getAppRoutes().filter(
  (r) => r.footer === "legal",
);
