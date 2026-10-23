/**
 * Location catalogue. Publish only when a place has real localContext.
 * Canonical detail URL: `/starlink-installation-{placeKey}` (never `/locations/{place}`).
 * Local context describes geography and building conditions; it must not claim
 * completed jobs, offices, or coverage that Skylink has not confirmed.
 */

export type LocationFaq = {
  question: string;
  answer: string;
};

export type LocationRecord = {
  placeKey: string;
  placeName: string;
  regionLabel: string;
  headline: string;
  intro: string;
  /** Required non-empty before published may be true. */
  localContext: string;
  relatedServiceSlugs: string[];
  faqs: LocationFaq[];
  seoTitle: string;
  seoDescription: string;
  published: boolean;
  indexable: boolean;
};

export const locations: LocationRecord[] = [
  {
    placeKey: "abuja",
    placeName: "Abuja",
    regionLabel: "FCT",
    headline: "Starlink installation planning for Abuja homes and offices",
    intro:
      "Abuja mixes planned districts, gated estates, and fast-growing satellite towns. That mix shapes how a Starlink dish is mounted and cabled.",
    localContext:
      "Abuja is a planned city, and many of its districts have their own character. Areas such as Maitama, Asokoro, Wuse, Jabi, and Gwarinpa tend to have a mix of low-rise homes, duplexes, and mid-rise office buildings, while growth areas such as Lugbe, Kubwa, and Lokogoma have many new estates. Many compounds sit behind walls and are managed by estate associations that may have rules about visible rooftop equipment, so approval is worth sorting out before drilling. The terrain around the city is uneven, with rocky outcrops and rolling land, so a neighbour's higher building or a hillside can block part of the sky from a ground-floor wall. Mature trees along residential streets can also be a problem, since leaf growth after the rains can narrow a view that looked clear in the dry months. The rainy season brings heavy downpours and strong storms, so cable entry points need proper sealing and the mount needs to be firm. In the dry season, harmattan dust and haze are common, and equipment should be easy to wipe down. Many homes and offices run generators or inverters, so power planning usually belongs in the conversation early.",
    relatedServiceSlugs: [
      "residential-installation",
      "business-connectivity",
      "wifi-networking",
      "backup-power",
    ],
    faqs: [
      {
        question: "Do Abuja estates allow rooftop Starlink dishes?",
        answer:
          "It varies by estate. Some management bodies have rules on visible equipment or approved positions, so check before work starts. We can explain what to ask for.",
      },
      {
        question: "Can trees or nearby buildings block the dish in Abuja?",
        answer:
          "Yes. Mature trees and taller neighbouring buildings are common causes of poor performance, so we check the sky view at the actual mounting position before fixing anything.",
      },
      {
        question: "Can you help with several offices in Abuja?",
        answer:
          "We can discuss it. Each site needs its own sky-view and access check, so scope is confirmed location by location.",
      },
    ],
    seoTitle: "Starlink installation in Abuja, FCT | Skylink",
    seoDescription:
      "Plan a Starlink install in Abuja: estate rules, rocky terrain, tree cover, and power planning for homes and offices across the FCT.",
    published: true,
    indexable: true,
  },
  {
    placeKey: "lagos",
    placeName: "Lagos",
    regionLabel: "Lagos State",
    headline: "Starlink installation planning for Lagos homes and businesses",
    intro:
      "From island apartments to mainland compounds, Lagos presents dense buildings, coastal air, and strict estate management. Each shapes where a dish can go.",
    localContext:
      "Lagos is a dense, fast-growing metropolis spread over the mainland and a series of islands and lagoon-side areas. In areas such as Victoria Island, Ikoyi, Lekki, and Ajah, many residents live in apartment blocks and managed estates where a facility manager controls roof access and external equipment, so permission is often the first step. On the mainland, parts of Ikeja, Yaba, Surulere, and Magodo have a mixture of older houses, newer duplexes, and commercial buildings built close together, which can mean neighbouring blocks shading part of the sky. Tall buildings are common in business districts, so a dish may need to sit on an upper roof or a pole to see past nearby structures. Because the city sits at the coast, salt-laden air and high humidity can speed up corrosion on cheap fixings, which makes material choice for brackets and screws worth considering. Lagoon-side and low-lying areas can also flood in heavy rain, so low cable runs and ground-level equipment need protection. Outages are common enough that many properties already have generators or inverters, so connecting Starlink to a protected circuit deserves early attention. Traffic can also affect scheduling, so we agree timing and access with you ahead of any visit.",
    relatedServiceSlugs: [
      "residential-installation",
      "business-connectivity",
      "relocation",
      "wifi-networking",
      "backup-power",
    ],
    faqs: [
      {
        question: "Can I mount a dish on a Lagos apartment block?",
        answer:
          "Often yes, but the landlord or facility manager must agree. We recommend getting written approval first and can say what details they may ask for.",
      },
      {
        question: "Does coastal air matter for a Starlink install?",
        answer:
          "It can. Salt and humidity corrode weaker fixings, so we favour corrosion-resistant hardware and good sealing at cable entry points.",
      },
      {
        question: "Can you help if I am moving within Lagos?",
        answer:
          "Yes. Our relocation service covers removing and remounting an existing kit, with a fresh sky-view check at the new address.",
      },
    ],
    seoTitle: "Starlink installation in Lagos | Skylink Nigeria",
    seoDescription:
      "Starlink installation planning for Lagos: apartment approvals, coastal corrosion, dense-building sky view, and power planning.",
    published: true,
    indexable: true,
  },
  {
    placeKey: "port-harcourt",
    placeName: "Port Harcourt",
    regionLabel: "Rivers State",
    headline: "Starlink installation planning for Port Harcourt properties",
    intro:
      "Port Harcourt's heavy rain, leafy streets, and industrial activity all affect how a Starlink dish should be installed and protected.",
    localContext:
      "Port Harcourt is the commercial centre of Rivers State, with a mix of older residential districts such as the GRA areas, busy commercial roads, and newer estates spreading outwards through Rumuokoro, Rumuola, and Eliozu. The city has high rainfall for much of the year, so water ingress at cable entries and mounting points is a real concern and sealing needs care. Humidity is high and can speed up corrosion and mould in poorly ventilated spots, so equipment placement matters indoors too. Many streets and compounds have large, leafy trees that can block a low dish position, particularly after the rains have fed new growth. Industrial and commercial areas such as Trans-Amadi have a mix of warehouses, offices, and yards where roofs, steel structures, and long distances between buildings influence the design. Power cuts are frequent enough that many compounds run generators, which usually means electrical noise and changeovers need consideration. Because the city has a strong oil and gas presence, some sites also operate under their own access and safety rules, so we ask about those before planning a visit.",
    relatedServiceSlugs: [
      "residential-installation",
      "business-connectivity",
      "long-range-wifi",
      "backup-power",
    ],
    faqs: [
      {
        question: "How does heavy rain affect a Port Harcourt installation?",
        answer:
          "Water ingress is the main concern. We seal cable entry points, secure the mount firmly, and avoid routes where water can pool.",
      },
      {
        question: "Can you link several buildings in a yard or compound?",
        answer:
          "Possibly. Longer links depend on line of sight and radio or cable planning, so we review the layout before suggesting an approach.",
      },
      {
        question: "Do you work on sites with their own safety rules?",
        answer:
          "We can discuss it. Tell us about access and safety requirements up front so they are built into the plan.",
      },
    ],
    seoTitle: "Starlink installation in Port Harcourt | Skylink",
    seoDescription:
      "Planning a Starlink install in Port Harcourt: heavy rain, humidity, tree cover, and power planning for homes, offices, and yards.",
    published: true,
    indexable: true,
  },
  {
    placeKey: "niger-delta",
    placeName: "Niger Delta",
    regionLabel: "Rivers / Bayelsa / Delta",
    headline: "Starlink connectivity planning for the Niger Delta",
    intro:
      "Creeks, swamp, river towns, and remote sites make the Niger Delta a place where satellite connectivity can matter, and where planning matters more.",
    localContext:
      "The Niger Delta covers a large area of low-lying land where the Niger River breaks into many channels before meeting the Atlantic. Towns such as Warri, Yenagoa, Bonny, and Sapele sit alongside creeks, mangrove swamp, and farmland, and many communities are reached by road, river, or both. Fixed broadband infrastructure is uneven across the region, which is one reason satellite connectivity gets considered, but a patchy road network can make site access and delivery slower than in a city. Much of the land is flat and wet, and flooding is common in the rainy season, so equipment and cabling need to sit above likely water levels and be well protected. Tall palms, mangrove, and dense vegetation can block the sky, so a dish often needs to sit higher on a mast or building. Humidity is high all year, and storms can be severe. Many sites are off-grid or rely heavily on generators, so power planning is central. Because there are riverine and offshore support locations in the area, some jobs overlap with our maritime and offshore service, and scope is always agreed per job.",
    relatedServiceSlugs: [
      "residential-installation",
      "business-connectivity",
      "long-range-wifi",
      "backup-power",
      "maritime-offshore",
    ],
    faqs: [
      {
        question: "Is Starlink suitable for remote Niger Delta communities?",
        answer:
          "It can be considered where fixed broadband is limited, but each site needs a sky-view check, a power plan, and a realistic view of access.",
      },
      {
        question: "How do floods affect equipment?",
        answer:
          "We plan to keep equipment and cable joints above likely water levels and protect any lower cable runs.",
      },
      {
        question: "Do you cover riverine and offshore sites?",
        answer:
          "Some may fall under our maritime and offshore service, where scope is agreed per job after we understand the access and operator requirements.",
      },
    ],
    seoTitle: "Starlink in the Niger Delta | Skylink Nigeria",
    seoDescription:
      "Starlink connectivity planning for the Niger Delta: flooding, vegetation, remote access, and power for river towns and offshore support sites.",
    published: true,
    indexable: true,
  },
  {
    placeKey: "owerri",
    placeName: "Owerri",
    regionLabel: "Imo State",
    headline: "Starlink installation planning for Owerri",
    intro:
      "Owerri's residential layouts, commercial centres, and tree-lined compounds shape how a Starlink dish is mounted and powered.",
    localContext:
      "Owerri is the capital of Imo State and a busy commercial and residential centre in the south-east. Many homes are detached houses and duplexes in walled compounds, with hotels, offices, and shops clustered along the main commercial roads. The area gets heavy seasonal rain, so cable entry and roof fixings need weatherproofing. Mature trees in compounds and along roads can block low mounting positions, and flat concrete roofs are common, which gives good options for pole mounts if the owner agrees. Power supply is unreliable enough that many households and businesses use generators or inverters, so connecting a dish to a stable supply deserves early planning.",
    relatedServiceSlugs: [
      "residential-installation",
      "business-connectivity",
      "wifi-networking",
      "backup-power",
    ],
    faqs: [
      {
        question: "Can a dish go on a flat concrete roof in Owerri?",
        answer:
          "Often yes, using a suitable pole or base mount, provided the owner agrees and the roof can take the fixings.",
      },
      {
        question: "Does heavy rain matter for the install?",
        answer:
          "Yes. Cable entry points and mounts need good sealing to avoid water ingress.",
      },
    ],
    seoTitle: "Starlink installation in Owerri, Imo State | Skylink",
    seoDescription:
      "Starlink installation planning for Owerri homes and businesses: roof mounts, tree cover, rain protection, and power.",
    published: false,
    indexable: false,
  },
  {
    placeKey: "enugu",
    placeName: "Enugu",
    regionLabel: "Enugu State",
    headline: "Starlink installation planning for Enugu",
    intro:
      "Enugu's hills, estates, and mixed housing affect where a dish can see the sky and how cables are routed.",
    localContext:
      "Enugu sits at the foot of an escarpment, and the city's hilly ground means that neighbouring buildings and slopes can change what a dish can see. Residential areas include older neighbourhoods, newer estates, and rising suburbs, with a range of single-storey and multi-storey houses. Some positions on higher ground may have clear views, while homes in valleys or below slopes may need a taller mount. The rainy season can be intense, and runoff on sloped ground makes cable routing and protection important. Offices and schools in the city may need long cable runs or links between buildings. Many properties use backup power, and the install should consider that from the start.",
    relatedServiceSlugs: [
      "residential-installation",
      "business-connectivity",
      "long-range-wifi",
      "backup-power",
    ],
    faqs: [
      {
        question: "Do hills affect Starlink placement in Enugu?",
        answer:
          "They can. Slopes and neighbouring buildings change the sky view, so the dish position is checked on site before fixing.",
      },
      {
        question: "Can a campus or compound with several buildings be connected?",
        answer:
          "Possibly, using cable or a planned wireless link where line of sight allows.",
      },
    ],
    seoTitle: "Starlink installation in Enugu | Skylink Nigeria",
    seoDescription:
      "Starlink installation planning for Enugu: hilly terrain, sky view, rain runoff, and multi-building sites.",
    published: false,
    indexable: false,
  },
  {
    placeKey: "benin-city",
    placeName: "Benin City",
    regionLabel: "Edo State",
    headline: "Starlink installation planning for Benin City",
    intro:
      "Benin City's mix of dense older areas and expanding estates calls for careful mounting, cable routing, and power planning.",
    localContext:
      "Benin City is a large, historic city in Edo State with dense central areas and growing suburban estates. In older neighbourhoods, buildings are often close together, so sky view from a roof may be affected by neighbours. Newer estates and compounds tend to have more space but may have management rules about equipment. The climate has a long rainy season, so waterproofing matters, and dust can be a concern in drier months. Many properties use generators or inverters, which means power arrangements need planning. Commercial buildings, schools, and clinics may need cable runs or links across a compound.",
    relatedServiceSlugs: [
      "residential-installation",
      "business-connectivity",
      "wifi-networking",
      "backup-power",
    ],
    faqs: [
      {
        question: "Does close building spacing affect sky view?",
        answer:
          "Yes. Neighbouring roofs can shade part of the sky, so we check candidate positions before mounting.",
      },
      {
        question: "Can estate rules limit where a dish goes?",
        answer:
          "They can. Check with your estate management first; we can explain what to ask.",
      },
    ],
    seoTitle: "Starlink installation in Benin City, Edo State | Skylink",
    seoDescription:
      "Starlink installation planning for Benin City homes and businesses: close-set buildings, estate rules, rain, and power.",
    published: false,
    indexable: false,
  },
  {
    placeKey: "asaba",
    placeName: "Asaba",
    regionLabel: "Delta State",
    headline: "Starlink installation planning for Asaba",
    intro:
      "Asaba is a growing riverside capital, and its estates, government offices, and river setting each bring their own installation considerations.",
    localContext:
      "Asaba is the capital of Delta State, on the western bank of the River Niger, and has grown quickly with new estates, offices, and hotels alongside older residential areas. Proximity to the river means some low-lying areas are prone to flooding, so cable and equipment positions need thought. Many compounds are walled, with trees that can block low dish positions. Government and commercial buildings may have their own access rules and approvals. Rain is heavy through the wet season, and many properties use generators or inverters, so power is a standard part of the planning.",
    relatedServiceSlugs: [
      "residential-installation",
      "business-connectivity",
      "backup-power",
      "long-range-wifi",
    ],
    faqs: [
      {
        question: "Does flooding near the river matter for the install?",
        answer:
          "In low-lying areas, yes. We aim to keep equipment and cable joints above likely water levels.",
      },
      {
        question: "Do government or commercial buildings need approvals?",
        answer:
          "Often they do. Tell us about access and approval requirements early so they can be built into the plan.",
      },
    ],
    seoTitle: "Starlink installation in Asaba, Delta State | Skylink",
    seoDescription:
      "Starlink installation planning for Asaba: river-adjacent flood risk, estates, offices, and power.",
    published: false,
    indexable: false,
  },
  {
    placeKey: "yenagoa",
    placeName: "Yenagoa",
    regionLabel: "Bayelsa State",
    headline: "Starlink installation planning for Yenagoa",
    intro:
      "Yenagoa sits in a low-lying, waterway-rich part of the Niger Delta, so flood risk, vegetation, and access shape every install.",
    localContext:
      "Yenagoa is the capital of Bayelsa State, in the heart of the Niger Delta. The land is flat and low, and the surrounding area is crossed by rivers and creeks, so flooding is a recurring concern in the rainy season. Equipment and cable runs should be positioned above likely water levels and protected from damp. Vegetation such as tall palms and dense trees can obstruct the sky, which often means mounting higher on a building or mast. Some surrounding communities are reached by road or boat, which affects scheduling. Many homes and offices rely on generators, so power planning is central to the install.",
    relatedServiceSlugs: [
      "residential-installation",
      "business-connectivity",
      "backup-power",
      "maritime-offshore",
    ],
    faqs: [
      {
        question: "How are flood risks handled in Yenagoa?",
        answer:
          "We plan mounting and cable positions above likely water levels and protect any lower runs.",
      },
      {
        question: "Can sites reached by boat be served?",
        answer:
          "Possibly, depending on access and scope. Tell us the access details and we will discuss what is practical.",
      },
    ],
    seoTitle: "Starlink installation in Yenagoa, Bayelsa | Skylink",
    seoDescription:
      "Starlink installation planning for Yenagoa: flood risk, tree cover, waterway access, and power in the Niger Delta.",
    published: false,
    indexable: false,
  },
];

export function isPublishableLocation(record: LocationRecord): boolean {
  return record.published && record.localContext.trim().length > 0;
}

export function publishedLocations(): LocationRecord[] {
  return locations.filter(isPublishableLocation);
}

export function getPublishedLocation(
  placeKey: string,
): LocationRecord | undefined {
  return locations.find(
    (l) => l.placeKey === placeKey && isPublishableLocation(l),
  );
}

export function hasPublishedLocations(): boolean {
  return publishedLocations().length > 0;
}

export function publicLocationPaths(): string[] {
  return publishedLocations().map(
    (l) => `/starlink-installation-${l.placeKey}`,
  );
}
