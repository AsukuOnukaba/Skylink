/**
 * Service catalogue. Publish a record only when OD-03 confirms that offering.
 * Draft body fields may exist for template readiness; they never render while unpublished.
 */

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceRecord = {
  slug: string;
  title: string;
  shortDescription: string;
  /** Longer overview for the detail page. */
  description: string;
  audience: string;
  suitableFor: string[];
  inclusions: string[];
  customerProvides: string[];
  limitations: string[];
  processSteps: string[];
  faqs: ServiceFaq[];
  relatedProductSlugs: string[];
  seoTitle: string;
  seoDescription: string;
  primaryCta: "quote" | "survey";
  published: boolean;
  indexable: boolean;
};

export const services: ServiceRecord[] = [
  {
    slug: "residential-installation",
    title: "Residential installation",
    shortDescription:
      "Home survey, mounting, cabling, and handover for household Starlink setups.",
    description:
      "Residential installation covers the practical work of getting Starlink running at a home: understanding the site, mounting the dish where it can see the sky, routing cable cleanly, and handing over a working connection.",
    audience: "Households and landlords arranging connectivity for a home.",
    suitableFor: [
      "New Starlink installs at houses and apartments where mounting is allowed",
      "Homes that need careful cable routes from roof or wall to the indoor equipment",
      "Households that want a clear handover after the install",
    ],
    inclusions: [
      "Site review of mounting options and cable path",
      "Mounting and alignment of the terminal",
      "Indoor connection and basic handover guidance",
    ],
    customerProvides: [
      "Access to the property and mounting area",
      "Any building or estate permissions required for mounting",
      "Active Starlink account and kit when hardware is customer-supplied",
    ],
    limitations: [
      "We do not invent same-day nationwide coverage claims",
      "Estate or landlord rules may limit where equipment can be mounted",
    ],
    processSteps: [
      "Share what you need and where the home is",
      "Review mounting and cable options for the site",
      "Complete the install and walk through basic use",
    ],
    faqs: [
      {
        question: "Do I need a site survey first?",
        answer:
          "Many homes benefit from a quick review of roof or wall options before work starts. Call or WhatsApp us from Contact and ask for a survey conversation.",
      },
      {
        question: "Can you install if I already have the kit?",
        answer:
          "Yes—residential installation can cover mounting and handover when you already have approved hardware and an account.",
      },
    ],
    relatedProductSlugs: [],
    seoTitle: "Residential Starlink installation — Skylink",
    seoDescription:
      "Skylink residential Starlink installation: mounting, cabling, and handover for homes. Clear next steps when you are ready to talk.",
    primaryCta: "survey",
    published: false,
    indexable: false,
  },
  {
    slug: "business-connectivity",
    title: "Business connectivity",
    shortDescription:
      "Installation and support for offices and commercial sites that need dependable connectivity.",
    description:
      "Business connectivity focuses on offices, shops, and other commercial sites that need satellite connectivity installed and supported with clear expectations—not vague uptime promises.",
    audience: "Business owners and facilities teams.",
    suitableFor: [
      "Offices and branches needing a carefully installed terminal",
      "Sites where cable routes and mounting need commercial practicality",
      "Teams that want a quote conversation before work begins",
    ],
    inclusions: [
      "Discussion of site use and install constraints",
      "Mounting and cabling suited to the premises",
      "Handover notes for the people who will use the link",
    ],
    customerProvides: [
      "Site access and any landlord or facilities approvals",
      "A clear contact for day-of installation",
    ],
    limitations: [
      "We do not publish invented SLA or uptime percentages",
      "Multi-site programmes need separate confirmation per location",
    ],
    processSteps: [
      "Describe the business site and what connectivity must support",
      "Agree the install approach and quote path",
      "Install, test, and hand over to your team",
    ],
    faqs: [
      {
        question: "Is this a managed network service?",
        answer:
          "This page covers installation and connectivity support around Starlink. Broader managed-network scopes are only offered when separately confirmed.",
      },
    ],
    relatedProductSlugs: [],
    seoTitle: "Business Starlink connectivity — Skylink",
    seoDescription:
      "Starlink installation and connectivity support for business sites. Skylink explains the work clearly and points you to the next step.",
    primaryCta: "quote",
    published: false,
    indexable: false,
  },
  {
    slug: "relocation",
    title: "Relocation",
    shortDescription:
      "Move and remount an existing terminal when you change address or site.",
    description:
      "Relocation is for moving an existing Starlink setup to a new address or position on a property—taking down, remounting, and reconnecting with the same care as a first install.",
    audience: "Existing Starlink users changing home or site.",
    suitableFor: [
      "Moves between homes or offices",
      "Remounts when a better sky view is available on the same property",
    ],
    inclusions: [
      "Safe removal of the existing mount where practical",
      "Remount and cable path at the new position",
      "Reconnect and basic checks after the move",
    ],
    customerProvides: [
      "Access at both the old and new positions when required",
      "Confirmation that account and hardware remain in your control",
    ],
    limitations: [
      "Relocation is not advertised as free unless separately approved",
      "Damaged or incomplete kits may need replacement hardware first",
    ],
    processSteps: [
      "Confirm what is moving and where it needs to go",
      "Plan removal and the new mount position",
      "Complete the remount and reconnect",
    ],
    faqs: [],
    relatedProductSlugs: [],
    seoTitle: "Starlink relocation and remount — Skylink",
    seoDescription:
      "Move or remount an existing Starlink terminal with Skylink. Clear relocation support when you change address or site.",
    primaryCta: "quote",
    published: false,
    indexable: false,
  },
  {
    slug: "wifi-networking",
    title: "Wi-Fi and networking",
    shortDescription:
      "Extend coverage and tidy the network around a working Starlink connection.",
    description:
      "Wi-Fi and networking support helps when Starlink is online but coverage inside the property is uneven—extending or organising the on-premises network around the connection you already have.",
    audience: "Homes and small sites that need better indoor coverage.",
    suitableFor: [
      "Properties where the dish works but rooms still have weak Wi-Fi",
      "Sites that need a cleaner layout of routers or access points",
    ],
    inclusions: [
      "Review of current indoor coverage needs",
      "Practical placement and connection of approved networking gear",
      "Basic setup guidance for the people using the network",
    ],
    customerProvides: [
      "Access to indoor spaces and power points",
      "Existing router or mesh equipment when already owned",
    ],
    limitations: [
      "This is not a WISP or internet-resale business offering",
      "Whole-building enterprise designs need separate scoping",
    ],
    processSteps: [
      "Describe the coverage problem in the property",
      "Agree a practical networking approach",
      "Install or adjust equipment and confirm coverage goals",
    ],
    faqs: [],
    relatedProductSlugs: [],
    seoTitle: "Wi-Fi and networking with Starlink — Skylink",
    seoDescription:
      "Improve Wi-Fi coverage around a working Starlink connection. Skylink helps with practical on-premises networking support.",
    primaryCta: "quote",
    published: false,
    indexable: false,
  },
  {
    slug: "backup-power",
    title: "Backup power",
    shortDescription:
      "Power planning so your connection stays usable when the grid is unreliable.",
    description:
      "Backup power support helps plan how Starlink equipment stays powered during outages—sizing expectations and install practicalities without inventing brand-specific guarantees.",
    audience: "Homes and sites facing unstable grid power.",
    suitableFor: [
      "Locations where outages interrupt connectivity",
      "Sites that already have or plan a backup power source",
    ],
    inclusions: [
      "Discussion of what must stay online during an outage",
      "Practical guidance on powering the terminal and indoor equipment",
      "Install coordination when backup hardware is approved for the job",
    ],
    customerProvides: [
      "Details of existing inverters, batteries, or generators when present",
      "Safe access to power equipment locations",
    ],
    limitations: [
      "We do not invent UPS brand endorsements or fixed runtime guarantees here",
      "Electrical work beyond agreed scope may need a licensed electrician",
    ],
    processSteps: [
      "Describe outage patterns and what must keep working",
      "Agree a practical power approach for the Starlink kit",
      "Coordinate install steps with your power setup",
    ],
    faqs: [],
    relatedProductSlugs: [],
    seoTitle: "Backup power for Starlink — Skylink",
    seoDescription:
      "Plan backup power around Starlink so connectivity can survive grid outages. Practical guidance from Skylink.",
    primaryCta: "quote",
    published: false,
    indexable: false,
  },
  {
    slug: "maritime-offshore",
    title: "Maritime and offshore",
    shortDescription:
      "Vessel and offshore connectivity support for operators who need satellite at sea.",
    description:
      "Maritime and offshore support covers Starlink connectivity work for vessels and offshore sites when that capability is part of Skylink’s confirmed offer.",
    audience: "Vessel and offshore operators.",
    suitableFor: [
      "Vessels that need carefully planned terminal placement",
      "Offshore sites where connectivity must be installed with clear constraints",
    ],
    inclusions: [
      "Discussion of vessel or site constraints before work",
      "Install coordination suited to the confirmed maritime scope",
    ],
    customerProvides: [
      "Access arrangements for the vessel or site",
      "Any operator approvals required for installation",
    ],
    limitations: [
      "Maritime work is offered only when that capability is confirmed for the job",
      "Weather and access can change schedules at sea",
    ],
    processSteps: [
      "Describe the vessel or site and connectivity need",
      "Agree the install approach for the confirmed scope",
      "Complete work and hand over with practical notes",
    ],
    faqs: [],
    relatedProductSlugs: [],
    seoTitle: "Maritime Starlink installation — Skylink",
    seoDescription:
      "Maritime and offshore Starlink connectivity support from Skylink for vessels and sites when that service is offered.",
    primaryCta: "quote",
    published: false,
    indexable: false,
  },
];

export function publishedServices(): ServiceRecord[] {
  return services.filter((s) => s.published);
}

export function getPublishedService(slug: string): ServiceRecord | undefined {
  return services.find((s) => s.slug === slug && s.published);
}

export function getServiceDraft(slug: string): ServiceRecord | undefined {
  return services.find((s) => s.slug === slug);
}

/** Public detail paths for published services only. */
export function publicServicePaths(): string[] {
  return publishedServices().map((s) => `/services/${s.slug}`);
}
