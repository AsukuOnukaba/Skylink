import { hasPublishedProducts } from "@/data/products";

/**
 * Public route registry. Catalogue index/detail routes exist in App;
 * Products appears in nav/footer only when at least one product is published.
 */
export type AppRoute = {
  path: string;
  label: string;
  /** Show in primary header navigation. */
  primaryNav?: boolean;
  /** Show in footer explore / legal clusters. */
  footer?: "explore" | "legal";
};

const staticRoutes: AppRoute[] = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services", primaryNav: true, footer: "explore" },
  { path: "/about", label: "About", primaryNav: true, footer: "explore" },
  { path: "/contact", label: "Contact", primaryNav: true, footer: "explore" },
  { path: "/faq", label: "FAQ", footer: "legal" },
  { path: "/privacy", label: "Privacy", footer: "legal" },
  { path: "/terms", label: "Terms", footer: "legal" },
];

function catalogueNavRoutes(): AppRoute[] {
  if (!hasPublishedProducts()) {
    return [];
  }
  return [
    {
      path: "/products",
      label: "Products",
      primaryNav: true,
      footer: "explore",
    },
  ];
}

/** Full registry including conditionally visible catalogue links. */
export function getAppRoutes(): AppRoute[] {
  const catalogue = catalogueNavRoutes();
  // Keep Products after Services in explore/nav order when present.
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
export const footerLegalRoutes = getAppRoutes().filter((r) => r.footer === "legal");
