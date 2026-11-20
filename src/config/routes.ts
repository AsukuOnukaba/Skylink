import { hasPublishedArticles } from "@/data/articles/articles";
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
  // /blog inserted dynamically when articles are published
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
  const next = [...staticRoutes];
  if (catalogue.length > 0) {
    const servicesIndex = next.findIndex((r) => r.path === "/services");
    next.splice(servicesIndex + 1, 0, ...catalogue);
  }
  if (hasPublishedArticles()) {
    const guideIndex = next.findIndex(
      (r) => r.path === "/guide/starlink-nigeria",
    );
    const blogRoute: AppRoute = {
      path: "/blog",
      label: "Articles",
      footer: "explore",
    };
    if (guideIndex >= 0) next.splice(guideIndex + 1, 0, blogRoute);
    else next.push(blogRoute);
  }
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
