/**
 * Product catalogue. Listed naira prices follow the public DataGram product
 * pages (owner instruction, 24 Oct 2026). A price is not stock or a reservation.
 */

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductRecord = {
  slug: string;
  name: string;
  manufacturer: string;
  shortDescription: string;
  description: string;
  specs: ProductSpec[];
  whatsInBox: string[];
  /** Public path in image manifest, when a cleared product photo exists. */
  imageSrc?: string;
  imageAlt?: string;
  /** Only show a numeric price when pricePublished is true. */
  priceNgn?: number;
  pricePublished: boolean;
  availabilityNote: string;
  relatedServiceSlugs: string[];
  seoTitle: string;
  seoDescription: string;
  published: boolean;
  indexable: boolean;
};

const AVAILABILITY_NOTE =
  "This is the published catalogue price. It does not mean the item is in stock or reserved for you.";

export function formatNgn(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export const products: ProductRecord[] = [
  {
    slug: "starlink-gen3-standard",
    name: "Starlink Gen3 v4 Standard Dish",
    manufacturer: "Starlink",
    shortDescription:
      "The everyday Starlink kit for homes and small sites, with a dish, router, and power supply in one box.",
    description:
      "The Gen 3 Standard kit is the general-purpose Starlink package for fixed locations. It suits homes, small offices, and similar sites that have an open view of the sky. The dish is built for permanent outdoor use and the router handles Wi-Fi inside the premises. Real-world speeds depend on your location, the plan you subscribe to, local network load, and obstructions, so treat any published range as typical rather than promised. Mounting position matters as much as the kit itself, which is why most buyers pair it with a site check and a considered install.",
    specs: [
      {
        label: "Dimensions",
        value: "594 × 383 × 39.7 mm (manufacturer figure)",
      },
      {
        label: "Weight",
        value: "About 2.9 kg without cable; about 4.2 kg with cable",
      },
      { label: "Antenna", value: "Electronic phased array, 110° field of view" },
      { label: "Weather rating", value: "IP67 dust and water resistant" },
      { label: "Power consumption", value: "About 75–100 W" },
      {
        label: "Wi-Fi",
        value: "Wi-Fi 6 (802.11ax), tri-band, 4 × 4 MU-MIMO, WPA2",
      },
      {
        label: "Typical performance",
        value:
          "Often cited around up to ~220 Mbps down / ~25 Mbps up and 20–40 ms latency; real results vary by location, plan, and congestion — not guaranteed",
      },
      {
        label: "Connectivity",
        value: "2 × RJ45 Ethernet, Wi-Fi 6",
      },
      {
        label: "Operating temperature",
        value: "About −30°C to 50°C",
      },
    ],
    whatsInBox: [
      "Starlink dish",
      "Wi-Fi router",
      "Power supply unit",
      "15 m Starlink cable",
      "1.5 m AC power cable",
    ],
    imageSrc: "/images/products/starlink-gen3-standard.jpeg",
    imageAlt:
      "Starlink Gen3 v4 Standard kit with dish, router, power supply, and connection cables on a white background",
    priceNgn: 750_000,
    pricePublished: true,
    availabilityNote: AVAILABILITY_NOTE,
    relatedServiceSlugs: [
      "residential-installation",
      "business-connectivity",
      "backup-power",
    ],
    seoTitle: "Starlink Gen 3 Standard kit in Nigeria | Skylink",
    seoDescription:
      "Starlink Gen3 v4 Standard Dish: Wi-Fi 6 router, IP67 rating, and the published catalogue price. A listed price is not live stock.",
    published: true,
    indexable: true,
  },
  {
    slug: "starlink-flat-high-performance",
    name: "Starlink Flat High Performance kit",
    manufacturer: "Starlink",
    shortDescription:
      "A robust Starlink kit aimed at demanding business, mobile, and maritime-style use.",
    description:
      "The Flat High Performance kit is Starlink's higher-end terminal, designed for users who need a wider field of view and a tougher enclosure than the standard dish. It is commonly considered for commercial sites, vehicles, and vessels, where mounting space and sky view are less forgiving. It is also typically tied to different plan options and costs from the standard kit. Whether it is the right fit depends on how you plan to use it and which plans Starlink currently offers for it in your area, so we confirm those details with you before any order or install.",
    specs: [
      {
        label: "Dimensions",
        value: "About 22.6 × 20.1 × 1.6 inches (manufacturer figure)",
      },
      { label: "Weight", value: "About 13 lb" },
      { label: "Field of view", value: "About 140°" },
      { label: "Environmental rating", value: "IP56" },
      { label: "Power consumption", value: "About 110–150 W" },
      { label: "Connectivity", value: "Wi-Fi 6" },
      {
        label: "Typical performance",
        value:
          "Often cited with higher download ceilings on suitable plans (up to ~1000 Mbps class figures in manufacturer materials); real results vary — not guaranteed",
      },
      {
        label: "Wind rating",
        value: "Survivable figures commonly cited around 280 kph class; confirm for your site",
      },
      {
        label: "Operating temperature",
        value: "About −30°C to 50°C",
      },
    ],
    whatsInBox: [
      "Starlink Flat High Performance dish",
      "Wedge mount",
      "Power supply (100–240 V)",
      "Power supply mount",
      "25 m Starlink cable",
      "5 m Ethernet cable",
      "1.8 m AC cable",
    ],
    imageSrc: "/images/products/starlink-flat-high-performance.jpeg",
    imageAlt:
      "Unboxed Starlink Flat High Performance kit with rectangular dish, router, power supply, and cables on a wood floor",
    priceNgn: 4_000_000,
    pricePublished: true,
    availabilityNote: AVAILABILITY_NOTE,
    relatedServiceSlugs: [
      "business-connectivity",
      "maritime-offshore",
      "wisp-setup",
    ],
    seoTitle: "Starlink Flat High Performance kit | Skylink Nigeria",
    seoDescription:
      "Overview of the Starlink Flat High Performance kit for business and demanding sites, with specs and plan notes. Enquire for supply details.",
    published: true,
    indexable: true,
  },
  {
    slug: "starlink-mini",
    name: "Starlink Mini",
    manufacturer: "Starlink",
    shortDescription:
      "A compact, lower-power Starlink kit for portable use and tight spaces.",
    description:
      "The Starlink Mini is a small, lightweight terminal that is easier to carry and mount than the larger dishes. People consider it for travel, temporary sites, small vehicles, and locations with limited space or power. A smaller dish usually means different performance limits than the Standard kit, so it does not suit every job. Plan options, regional availability, and any usage or portability conditions are set by Starlink and can change. We do not state them here. Tell us how you plan to use it and we will check the current plan situation with you before you commit to this kit.",
    specs: [
      {
        label: "Size",
        value: "About 11.8 × 10.2 inches; about 1.5 inches thick",
      },
      { label: "Weight", value: "About 2.6 lb with kickstand" },
      {
        label: "Typical performance",
        value:
          "Often cited around up to ~100 Mbps down / ~20 Mbps up and ~20 ms latency; real results vary — not guaranteed",
      },
      {
        label: "Power",
        value: "External supply (about 12–48 V compatible); about 20–40 W",
      },
      {
        label: "Wi-Fi",
        value: "Integrated dual-band Wi-Fi 5; manufacturer notes device limits",
      },
      { label: "Field of view", value: "About 110°" },
      {
        label: "Plan notes",
        value:
          "Published specification: Roam plan only, and up to 3 Starlink mesh nodes. Confirm current Starlink terms before buying",
      },
    ],
    whatsInBox: [
      "Starlink Mini dish with integrated router",
      "Kickstand",
      "External power supply",
      "Starlink cable (length may vary)",
      "AC power cable",
    ],
    imageSrc: "/images/products/starlink-mini.jpeg",
    imageAlt:
      "Compact rectangular Starlink Mini on a vehicle bed, cabled to a portable power station",
    priceNgn: 450_000,
    pricePublished: true,
    availabilityNote: AVAILABILITY_NOTE,
    relatedServiceSlugs: ["residential-installation", "relocation"],
    seoTitle: "Starlink Mini kit in Nigeria | Skylink",
    seoDescription:
      "Learn about the compact Starlink Mini kit, its typical uses, and why plan terms must be checked first. Enquire to confirm current options.",
    published: true,
    indexable: true,
  },
  {
    slug: "starlink-pivot-mount",
    name: "Starlink Pivot Mounting Accessories",
    manufacturer: "Starlink",
    shortDescription:
      "A mounting accessory for fixing a compatible Starlink dish to a pole or wall with an adjustable angle.",
    description:
      "The Pivot Mount is an accessory made for securing a compatible Starlink dish to a wall, pole, or similar fixed point. It lets the dish be set at a suitable angle rather than lying flat, which can help with water run-off and sky view on certain roofs and walls. A mount is only as good as the surface and fixings behind it, so installation quality matters. Compatibility depends on the dish model, so tell us which kit you have and we will confirm that the mount fits before ordering.",
    specs: [
      {
        label: "Compatibility",
        value:
          "Starlink Gen 3 (V4) standard and Flat High Performance dishes — confirm your kit",
      },
      { label: "Mount", value: "Heavy-duty pivot / tilt mount" },
      {
        label: "Surfaces",
        value: "Corrugated iron, concrete flat roofs, and parapet walls when fixed correctly",
      },
      {
        label: "Use",
        value: "Precise dish angle for clearer sky view and water run-off",
      },
    ],
    whatsInBox: [
      "Pivot mount base",
      "Mounting hardware kit",
      "Fasteners for common roof types",
    ],
    imageSrc: "/images/products/starlink-pivot-mount.jpg",
    imageAlt:
      "Starlink Pivot Mount accessory in its open retail box with moulded insert and cables",
    priceNgn: 150_000,
    pricePublished: true,
    availabilityNote: AVAILABILITY_NOTE,
    relatedServiceSlugs: ["residential-installation", "relocation"],
    seoTitle: "Starlink Pivot Mount accessory | Skylink Nigeria",
    seoDescription:
      "Pole or wall mounting accessory for compatible Starlink dishes, with adjustable angle. Check fit and supply with Skylink.",
    published: true,
    indexable: true,
  },
  {
    slug: "starlink-mesh-router",
    name: "Starlink Mesh Router",
    manufacturer: "Starlink",
    shortDescription:
      "An official Starlink mesh node for extending Wi-Fi around a home or small office.",
    description:
      "The Starlink Mesh Router extends your Starlink network into rooms and floors the main router does not reach. It pairs with the Starlink system and is managed from the Starlink app, which keeps set-up simpler than mixing brands. Placement matters: a node works best positioned between the main router and the weak area, not inside it. Thick walls and multiple storeys can still limit performance. We plan the positions with you. Compatibility depends on your router generation, so confirm that before buying.",
    specs: [
      { label: "Compatibility", value: "Starlink Gen 3 (V4) hardware" },
      {
        label: "Connection",
        value: "Wireless mesh to the existing Starlink router",
      },
      {
        label: "Network",
        value: "Single network name across the property when set up in the app",
      },
      {
        label: "Typical use",
        value: "Homes above about 200 m², duplexes, and estate compounds",
      },
    ],
    whatsInBox: ["Starlink Mesh Router", "Power supply", "Quick start guide"],
    imageSrc: "/images/products/starlink-mesh-router.jpeg",
    imageAlt:
      "Official Starlink Router 3 product view on a grey background, compatible for use as a Gen 3 mesh router",
    priceNgn: 250_000,
    pricePublished: true,
    availabilityNote: AVAILABILITY_NOTE,
    relatedServiceSlugs: [
      "wifi-networking",
      "residential-installation",
      "backup-power",
    ],
    seoTitle: "Starlink Mesh Router for whole-home Wi-Fi | Skylink",
    seoDescription:
      "Official Starlink mesh node to extend Wi-Fi through a home or office. Compatibility and placement notes, with supply on enquiry.",
    published: true,
    indexable: true,
  },
  {
    slug: "starlink-gen3-45m-cable",
    name: "45-Metre Starlink Gen 3 Cable",
    manufacturer: "Starlink",
    shortDescription:
      "A longer 45 m dish cable for Gen 3 dishes only, for sites where the dish sits far from the router.",
    description:
      "This replacement cable is for the Gen 3 dish connector and is not interchangeable with the Gen 2 cable. It is useful when the best sky view is far from the room where the router will sit, such as a tall building or a large compound. Longer cable runs add more to protect, route, and weatherproof, so we advise planning the path carefully and avoiding tight bends or exposed stretches. Check that your kit is Gen 3 before ordering, as the wrong generation will not connect.",
    specs: [
      { label: "Length", value: "45 m" },
      { label: "Compatibility", value: "Gen 3 dishes only, not Gen 2" },
      { label: "Type", value: "Outdoor-rated replacement dish cable" },
      {
        label: "Installation",
        value: "Route and seal carefully; avoid sharp bends and standing water",
      },
    ],
    whatsInBox: [
      "45 m Starlink Gen 3 flat cable",
      "Integrated proprietary Starlink connectors",
    ],
    imageSrc: "/images/products/starlink-gen3-45m-cable.jpeg",
    imageAlt:
      "Official Starlink 45 metre Standard cable shown coiled with its two Gen 3 compatible connectors",
    priceNgn: 250_000,
    pricePublished: true,
    availabilityNote: AVAILABILITY_NOTE,
    relatedServiceSlugs: ["residential-installation", "relocation"],
    seoTitle: "Starlink Gen 3 45 m cable (Gen 3 only) | Skylink",
    seoDescription:
      "A 45 m cable for Starlink Gen 3 dishes only. Not for Gen 2. Notes on routing and compatibility, with supply on enquiry.",
    published: true,
    indexable: true,
  },
  {
    slug: "wireless-long-range-wifi",
    name: "Wireless Long-Range WiFi Mesh / Repeater Router",
    manufacturer: "Third-party networking",
    shortDescription:
      "A wireless repeater that extends Starlink Wi-Fi across a large home or compound without a new Ethernet run.",
    description:
      "This is a wireless mesh and repeater router for places the Starlink router does not reach. It works in wireless repeater mode, so it does not need a new cable, and the public listing says it can project through the thick concrete walls common in Nigerian buildings. It is compatible with Starlink and with other internet sources. It is not a Starlink-made mesh node, and it is not the outdoor point-to-point radio used for multi-kilometre links. Those radios are a different service.",
    specs: [
      { label: "Mode", value: "Wireless repeater / mesh" },
      { label: "Compatibility", value: "Starlink and other internet sources" },
      {
        label: "Cabling",
        value: "No Ethernet run required for the extension itself",
      },
      {
        label: "Typical sites",
        value: "Homes, small offices, schools, and estate common areas",
      },
    ],
    whatsInBox: [
      "Wireless long-range Wi-Fi mesh / repeater router",
      "Power adapter",
    ],
    imageSrc: "/images/products/wireless-long-range-repeater.jpeg",
    imageAlt:
      "White TP-Link wireless router with four antennas, the photo published with the wireless repeater listing",
    priceNgn: 150_000,
    pricePublished: true,
    availabilityNote: AVAILABILITY_NOTE,
    relatedServiceSlugs: ["long-range-wifi", "wifi-networking", "wisp-setup"],
    seoTitle: "Wireless long-range Wi-Fi link kit | Skylink Nigeria",
    seoDescription:
      "Third-party outdoor radio kits that link separate buildings when line of sight allows. We check the path before recommending a model.",
    published: true,
    indexable: true,
  },
  {
    slug: "wired-long-range-wifi",
    name: "Wired Long-Range WiFi Mesh / Repeater Router",
    manufacturer: "Third-party networking",
    shortDescription:
      "A wired access point that extends Starlink Wi-Fi over Ethernet when a cable route already exists.",
    description:
      "This router works as a wired access point. Ethernet backhaul is what the public listing describes as the steadier way to push Starlink Wi-Fi through a large home, office, or compound, including thick concrete. It suits buildings that are already cabled. It works with Starlink and with other internet sources, and it is third-party hardware rather than an official Starlink mesh node.",
    specs: [
      { label: "Mode", value: "Wired access point over Ethernet" },
      { label: "Compatibility", value: "Starlink and other internet sources" },
      {
        label: "Cabling",
        value: "Ethernet backhaul for the stronger of the two long-range options",
      },
      {
        label: "Typical sites",
        value: "Homes, small offices, schools, and estate common areas",
      },
    ],
    whatsInBox: [
      "Wired long-range Wi-Fi mesh / repeater router",
      "Power adapter",
      "Ethernet cable",
    ],
    imageSrc: "/images/products/wired-long-range-wifi.jpeg",
    imageAlt:
      "White TP-Link router mounted under a ceiling, the photo published with the wired repeater listing",
    priceNgn: 150_000,
    pricePublished: true,
    availabilityNote: AVAILABILITY_NOTE,
    relatedServiceSlugs: ["long-range-wifi", "wifi-networking", "wisp-setup"],
    seoTitle: "Wired long-range Wi-Fi extension kit | Skylink",
    seoDescription:
      "Third-party cabled access points for extending a network between buildings or over long distances. Route review comes first.",
    published: true,
    indexable: true,
  },
];

export function publishedProducts(): ProductRecord[] {
  return products.filter((p) => p.published);
}

export function getPublishedProduct(slug: string): ProductRecord | undefined {
  return products.find((p) => p.slug === slug && p.published);
}

export function hasPublishedProducts(): boolean {
  return publishedProducts().length > 0;
}

/** Public detail paths for published products only. */
export function publicProductPaths(): string[] {
  return publishedProducts().map((p) => `/products/${p.slug}`);
}
