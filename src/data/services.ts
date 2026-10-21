/**
 * Service catalogue records. Publish only when OD-03 confirms the offering.
 * Homepage shows published items only; unpublished candidates stay out of customer CTAs.
 */
export type ServiceRecord = {
  slug: string;
  title: string;
  shortDescription: string;
  published: boolean;
  indexable: boolean;
};

export const services: ServiceRecord[] = [
  {
    slug: "residential-installation",
    title: "Residential installation",
    shortDescription:
      "Home survey, mounting, cabling, and handover for household Starlink setups.",
    published: false,
    indexable: false,
  },
  {
    slug: "business-connectivity",
    title: "Business connectivity",
    shortDescription:
      "Installation and support for offices and commercial sites that need dependable connectivity.",
    published: false,
    indexable: false,
  },
  {
    slug: "relocation",
    title: "Relocation",
    shortDescription:
      "Move and remount an existing terminal when you change address or site.",
    published: false,
    indexable: false,
  },
  {
    slug: "wifi-networking",
    title: "Wi-Fi and networking",
    shortDescription:
      "Extend coverage and tidy the network around a working Starlink connection.",
    published: false,
    indexable: false,
  },
  {
    slug: "backup-power",
    title: "Backup power",
    shortDescription:
      "Power planning so your connection stays usable when the grid is unreliable.",
    published: false,
    indexable: false,
  },
];

export function publishedServices(): ServiceRecord[] {
  return services.filter((s) => s.published);
}
