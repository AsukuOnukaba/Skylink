/**
 * Location catalogue. Publish only when a place has real localContext.
 * Canonical detail URL: `/starlink-installation-{placeKey}` (never `/locations/{place}`).
 * Local context describes geography and building conditions; it must not claim
 * completed jobs, offices, or coverage that Skylink has not confirmed.
 *
 * Confirmed service areas (15): Rivers, Abuja (FCT), Delta, Bayelsa, Lagos,
 * Benin City (Edo), Ibadan (Oyo), Ogun, Imo, Abia, Akwa Ibom, Cross River,
 * Anambra, Enugu, Ebonyi. City pages may represent a confirmed state without
 * becoming duplicate statewide landings. Niger Delta remains a regional guide.
 */

export type LocationFaq = {
  question: string;
  answer: string;
};

/** Regions used to organise the /locations index. */
export type CoverageRegionId =
  | "south-west"
  | "north-central"
  | "south-south"
  | "south-east";

export type LocationIndexKind = "confirmed" | "regional-guide";

export type LocationRecord = {
  placeKey: string;
  placeName: string;
  regionLabel: string;
  /** Card title on /locations when different from placeName. */
  indexCardLabel?: string;
  /** How the place appears on the service-areas index. */
  indexKind: LocationIndexKind;
  /** Geographic group for the /locations page. Regional guides omit this. */
  coverageRegion?: CoverageRegionId;
  headline: string;
  intro: string;
  /** Required non-empty before published may be true. */
  localContext: string;
  relatedServiceSlugs: string[];
  faqs: LocationFaq[];
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
  seoTitle: string;
  seoDescription: string;
  /** ISO date used for sitemap lastmod when present. */
  contentUpdatedAt: string;
  published: boolean;
  indexable: boolean;
};

export const coverageRegionSections: Array<{
  id: CoverageRegionId;
  label: string;
}> = [
  { id: "south-west", label: "South West" },
  { id: "north-central", label: "North Central / FCT" },
  { id: "south-south", label: "South South" },
  { id: "south-east", label: "South East" },
];

/** Shared consultation → survey → quote → install → handover steps. */
export const locationInstallationProcess: string[] = [
  "Tell us the town or address, property type, and whether you already have Starlink equipment.",
  "We review site photos or arrange a survey to check sky view, mounting options, power, and access.",
  "You receive a quotation for the agreed scope before any installation work starts.",
  "Installation follows the agreed mount, cable route, and network plan.",
  "Handover covers router placement, a basic app check, and who to contact if something changes.",
];

const CONTENT_UPDATED = "2026-11-03";

export const locations: LocationRecord[] = [
  {
    placeKey: "abuja",
    placeName: "Abuja",
    regionLabel: "FCT",
    indexCardLabel: "Abuja",
    indexKind: "confirmed",
    coverageRegion: "north-central",
    headline: "Starlink installation planning for Abuja homes and offices",
    intro:
      "Abuja mixes planned districts, gated estates, and fast-growing satellite towns. That mix shapes how a Starlink dish is mounted and cabled.",
    localContext:
      "Abuja is a planned city, and many of its districts have their own character. Areas such as Maitama, Asokoro, Wuse, Jabi, and Gwarinpa tend to have a mix of low-rise homes, duplexes, and mid-rise office buildings, while growth areas such as Lugbe, Kubwa, and Lokogoma have many new estates. Many compounds sit behind walls and are managed by estate associations that may have rules about visible rooftop equipment, so approval is worth sorting out before drilling. The terrain around the city is uneven, with rocky outcrops and rolling land, so a neighbour's higher building or a hillside can block part of the sky from a ground-floor wall. Mature trees along residential streets can also be a problem, since leaf growth after the rains can narrow a view that looked clear in the dry months. The rainy season brings heavy downpours and strong storms, so cable entry points need proper sealing and the mount needs to be firm. In the dry season, harmattan dust and haze are common, and equipment should be easy to wipe down. Many homes and offices run generators or inverters, so power planning usually belongs in the conversation early. Skylink's confirmed FCT coverage is centred on Abuja and the surrounding Federal Capital Territory communities where a crew can attend; scheduling is confirmed per enquiry rather than treated as same-day availability everywhere in the Territory.",
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
    imageSrc: "/images/locations/abuja-estate.jpeg",
    imageAlt:
      "Starlink dish mounted for an Abuja estate installation in the published field library",
    seoTitle: "Starlink installation in Abuja, FCT | Skylink",
    seoDescription:
      "Plan a Starlink install in Abuja: estate rules, rocky terrain, tree cover, and power planning for homes and offices across the FCT.",
    contentUpdatedAt: CONTENT_UPDATED,
    published: true,
    indexable: true,
  },
  {
    placeKey: "lagos",
    placeName: "Lagos",
    regionLabel: "Lagos State",
    indexCardLabel: "Lagos",
    indexKind: "confirmed",
    coverageRegion: "south-west",
    headline: "Starlink installation planning for Lagos homes and businesses",
    intro:
      "From island apartments to mainland compounds, Lagos presents dense buildings, coastal air, and strict estate management. Each shapes where a dish can go.",
    localContext:
      "Lagos is a dense, fast-growing metropolis spread over the mainland and a series of islands and lagoon-side areas. In areas such as Victoria Island, Ikoyi, Lekki, and Ajah, many residents live in apartment blocks and managed estates where a facility manager controls roof access and external equipment, so permission is often the first step. On the mainland, parts of Ikeja, Yaba, Surulere, and Magodo have a mixture of older houses, newer duplexes, and commercial buildings built close together, which can mean neighbouring blocks shading part of the sky. Tall buildings are common in business districts, so a dish may need to sit on an upper roof or a pole to see past nearby structures. Because the city sits at the coast, salt-laden air and high humidity can speed up corrosion on cheap fixings, which makes material choice for brackets and screws worth considering. Lagoon-side and low-lying areas can also flood in heavy rain, so low cable runs and ground-level equipment need protection. Outages are common enough that many properties already have generators or inverters, so connecting Starlink to a protected circuit deserves early attention. Traffic can also affect scheduling, so we agree timing and access with you ahead of any visit. Confirmed Lagos State coverage is discussed address by address; a published page is not a promise that every local government area can be visited on the same timeline.",
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
    imageSrc: "/images/service-business-connectivity.jpeg",
    imageAlt:
      "Illustrative commercial Starlink installation environment relevant to dense Lagos buildings",
    imageCaption:
      "Illustrative commercial installation context; not presented as a Skylink project or a named Lagos site.",
    seoTitle: "Starlink installation in Lagos | Skylink Nigeria",
    seoDescription:
      "Starlink installation planning for Lagos: apartment approvals, coastal corrosion, dense-building sky view, and power planning.",
    contentUpdatedAt: CONTENT_UPDATED,
    published: true,
    indexable: true,
  },
  {
    placeKey: "port-harcourt",
    placeName: "Port Harcourt",
    regionLabel: "Rivers State",
    indexCardLabel: "Rivers State / Port Harcourt",
    indexKind: "confirmed",
    coverageRegion: "south-south",
    headline: "Starlink installation planning for Port Harcourt and Rivers State",
    intro:
      "Port Harcourt anchors Skylink's Rivers State coverage. Heavy rain, leafy streets, and industrial yards all affect how a dish should be installed and protected.",
    localContext:
      "Port Harcourt is the commercial centre of Rivers State, with a mix of older residential districts such as the GRA areas, busy commercial roads, and newer estates spreading outwards through Rumuokoro, Rumuola, and Eliozu. The city has high rainfall for much of the year, so water ingress at cable entries and mounting points is a real concern and sealing needs care. Humidity is high and can speed up corrosion and mould in poorly ventilated spots, so equipment placement matters indoors too. Many streets and compounds have large, leafy trees that can block a low dish position, particularly after the rains have fed new growth. Industrial and commercial areas such as Trans-Amadi have a mix of warehouses, offices, and yards where roofs, steel structures, and long distances between buildings influence the design. Power cuts are frequent enough that many compounds run generators, which usually means electrical noise and changeovers need consideration. Because the city has a strong oil and gas presence, some sites also operate under their own access and safety rules, so we ask about those before planning a visit. Confirmed Rivers State coverage is represented here through Port Harcourt and nearby communities where a crew can attend; other towns in the state are discussed case by case and are not assumed to share the same access or scheduling.",
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
      {
        question: "Does Rivers State coverage mean every town is the same job?",
        answer:
          "No. Port Harcourt conditions differ from more remote communities. Access, vegetation, and power are checked for the specific address.",
      },
    ],
    imageSrc: "/images/locations/port-harcourt-home.jpeg",
    imageAlt:
      "Starlink dish on a Port Harcourt residential roof, from the published installation library",
    seoTitle: "Starlink installation in Port Harcourt, Rivers State | Skylink",
    seoDescription:
      "Planning a Starlink install in Port Harcourt and Rivers State: heavy rain, humidity, tree cover, and power for homes, offices, and yards.",
    contentUpdatedAt: CONTENT_UPDATED,
    published: true,
    indexable: true,
  },
  {
    placeKey: "niger-delta",
    placeName: "Niger Delta",
    regionLabel: "Rivers / Bayelsa / Delta",
    indexCardLabel: "Niger Delta regional guide",
    indexKind: "regional-guide",
    headline: "Starlink connectivity planning for the Niger Delta",
    intro:
      "Creeks, swamp, river towns, and remote sites make the Niger Delta a place where satellite connectivity can matter, and where planning matters more. This guide supports the confirmed Rivers, Delta, and Bayelsa service areas without claiming every settlement is covered.",
    localContext:
      "The Niger Delta covers a large area of low-lying land where the Niger River breaks into many channels before meeting the Atlantic. Towns such as Warri, Yenagoa, Bonny, and Sapele sit alongside creeks, mangrove swamp, and farmland, and many communities are reached by road, river, or both. Fixed broadband infrastructure is uneven across the region, which is one reason satellite connectivity gets considered, but a patchy road network can make site access and delivery slower than in a city. Much of the land is flat and wet, and flooding is common in the rainy season, so equipment and cabling need to sit above likely water levels and be well protected. Tall palms, mangrove, and dense vegetation can block the sky, so a dish often needs to sit higher on a mast or building. Humidity is high all year, and storms can be severe. Many sites are off-grid or rely heavily on generators, so power planning is central. Skylink's confirmed service areas in this region are Rivers State (via Port Harcourt), Delta State, and Bayelsa State (via Yenagoa). This page explains shared delta conditions; it does not mean every creek settlement is automatically in scope. Riverine and offshore support locations may overlap with maritime work, and scope is always agreed per job.",
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
          "It can be considered where fixed broadband is limited, but each site needs a sky-view check, a power plan, and a realistic view of access. Confirmed coverage centres on Rivers, Delta, and Bayelsa service areas.",
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
    imageSrc: "/images/locations/bayelsa-vessel.jpeg",
    imageAlt:
      "Starlink terminal on a vessel in the Niger Delta installation library",
    imageCaption:
      "Niger Delta field-library context, shown with attribution and not presented as a Skylink project.",
    seoTitle: "Starlink in the Niger Delta | Skylink Nigeria",
    seoDescription:
      "Starlink connectivity planning for the Niger Delta: flooding, vegetation, remote access, and power for river towns and offshore support sites.",
    contentUpdatedAt: CONTENT_UPDATED,
    published: true,
    indexable: true,
  },
  {
    placeKey: "owerri",
    placeName: "Owerri",
    regionLabel: "Imo State",
    indexCardLabel: "Imo State / Owerri",
    indexKind: "confirmed",
    coverageRegion: "south-east",
    headline: "Starlink installation planning for Owerri and Imo State",
    intro:
      "Owerri anchors Imo State coverage. Residential layouts, commercial centres, and tree-lined compounds shape how a Starlink dish is mounted and powered.",
    localContext:
      "Owerri is the capital of Imo State and a busy commercial and residential centre in the south-east. Many homes are detached houses and duplexes in walled compounds, with hotels, offices, and shops clustered along the main commercial roads. The area gets heavy seasonal rain, so cable entry and roof fixings need weatherproofing. Mature trees in compounds and along roads can block low mounting positions, and flat concrete roofs are common, which gives good options for pole mounts if the owner agrees. Power supply is unreliable enough that many households and businesses use generators or inverters, so connecting a dish to a stable supply deserves early planning. Confirmed Imo State coverage is represented through Owerri and nearby communities where a crew can attend; other towns are discussed on enquiry and are not assumed to share the same visit timeline.",
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
      {
        question: "Is Imo State coverage limited to Owerri?",
        answer:
          "Owerri is the published focus for Imo State. Other towns can be discussed, but access and scheduling are confirmed for each address.",
      },
    ],
    imageSrc: "/images/hero-starlink-tile-roof.jpeg",
    imageAlt:
      "Illustrative tiled-roof Starlink installation environment relevant to Owerri homes",
    imageCaption:
      "Illustrative residential installation context; not presented as a completed Skylink project in Owerri.",
    seoTitle: "Starlink installation in Owerri, Imo State | Skylink",
    seoDescription:
      "Starlink installation planning for Owerri and Imo State: roof mounts, tree cover, rain protection, and power.",
    contentUpdatedAt: CONTENT_UPDATED,
    published: true,
    indexable: true,
  },
  {
    placeKey: "enugu",
    placeName: "Enugu",
    regionLabel: "Enugu State",
    indexCardLabel: "Enugu State",
    indexKind: "confirmed",
    coverageRegion: "south-east",
    headline: "Starlink installation planning for Enugu",
    intro:
      "Enugu's hills, estates, and mixed housing affect where a dish can see the sky and how cables are routed.",
    localContext:
      "Enugu sits at the foot of an escarpment, and the city's hilly ground means that neighbouring buildings and slopes can change what a dish can see. Residential areas include older neighbourhoods, newer estates, and rising suburbs, with a range of single-storey and multi-storey houses. Some positions on higher ground may have clear views, while homes in valleys or below slopes may need a taller mount. The rainy season can be intense, and runoff on sloped ground makes cable routing and protection important. Offices and schools in the city may need long cable runs or links between buildings. Many properties use backup power, and the install should consider that from the start. Confirmed Enugu State coverage centres on Enugu and surrounding communities where attendance is practical; scheduling remains per enquiry.",
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
    imageSrc: "/images/hero-starlink-pole-solar.jpeg",
    imageAlt:
      "Illustrative pole-mounted Starlink installation with backup-power context relevant to Enugu properties",
    imageCaption:
      "Illustrative mounting and power context; not presented as a completed Skylink project in Enugu.",
    seoTitle: "Starlink installation in Enugu | Skylink Nigeria",
    seoDescription:
      "Starlink installation planning for Enugu: hilly terrain, sky view, rain runoff, and multi-building sites.",
    contentUpdatedAt: CONTENT_UPDATED,
    published: true,
    indexable: true,
  },
  {
    placeKey: "benin-city",
    placeName: "Benin City",
    regionLabel: "Edo State",
    indexCardLabel: "Benin City (Edo State)",
    indexKind: "confirmed",
    coverageRegion: "south-south",
    headline: "Starlink installation planning for Benin City",
    intro:
      "Benin City's mix of dense older areas and expanding estates calls for careful mounting, cable routing, and power planning across Skylink's Edo State coverage.",
    localContext:
      "Benin City is a large, historic city in Edo State with dense central areas and growing suburban estates. In older neighbourhoods, buildings are often close together, so sky view from a roof may be affected by neighbours. Newer estates and compounds tend to have more space but may have management rules about equipment. The climate has a long rainy season, so waterproofing matters, and dust can be a concern in drier months. Many properties use generators or inverters, which means power arrangements need planning. Commercial buildings, schools, and clinics may need cable runs or links across a compound. Confirmed Edo State coverage is represented through Benin City; other towns in the state are discussed when a crew can attend and are not treated as automatic same-week installs.",
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
    imageSrc: "/images/hero-starlink-rooftop-hp.jpeg",
    imageAlt:
      "Illustrative professional rooftop Starlink installation relevant to Benin City buildings",
    imageCaption:
      "Illustrative rooftop installation context; not presented as a completed Skylink project in Benin City.",
    seoTitle: "Starlink installation in Benin City, Edo State | Skylink",
    seoDescription:
      "Starlink installation planning for Benin City homes and businesses: close-set buildings, estate rules, rain, and power.",
    contentUpdatedAt: CONTENT_UPDATED,
    published: true,
    indexable: true,
  },
  {
    placeKey: "delta",
    placeName: "Delta State",
    regionLabel: "Delta State",
    indexCardLabel: "Delta State",
    indexKind: "confirmed",
    coverageRegion: "south-south",
    headline: "Starlink installation planning across Delta State",
    intro:
      "Delta State covers a riverside capital and a working coast. Asaba, Warri, and the river settlements do not install the same way.",
    localContext:
      "Asaba, the state capital, sits on the western bank of the Niger and has grown with new estates, offices, and hotels beside older compounds. Low ground near the river floods, so cable joints and indoor equipment should sit above the water line that residents already plan for. Warri and the houseboat traffic around it are a different job: salt air, a moving deck, and power that may be a battery bank rather than the grid. Inland compounds are often walled, with trees over the roof. Government and commercial buildings in Asaba commonly need their own access approval. Rain through the wet season and generator use are normal in both the capital and the coast, so power is part of the first conversation rather than an extra. Confirmed Delta State coverage does not mean every river settlement is automatically scheduled; access and flood risk are checked for the specific site.",
    imageSrc: "/images/locations/delta-houseboat.jpeg",
    imageAlt:
      "Starlink terminal on a houseboat in Warri, Delta State, from the published installation library",
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
          "In low-lying parts of Asaba and other river towns, yes. Equipment and cable joints should sit above the water levels people already expect.",
      },
      {
        question: "Is a Warri houseboat the same job as an Asaba house?",
        answer:
          "No. A houseboat needs a marine mount and a power plan for batteries or shore power. An Asaba compound is a roof, a wall, and usually a generator.",
      },
    ],
    seoTitle: "Starlink installation in Delta State | Skylink",
    seoDescription:
      "Starlink planning for Delta State: Asaba flood risk and approvals, and Warri houseboats that need a marine mount.",
    contentUpdatedAt: CONTENT_UPDATED,
    published: true,
    indexable: true,
  },
  {
    placeKey: "yenagoa",
    placeName: "Yenagoa",
    regionLabel: "Bayelsa State",
    indexCardLabel: "Bayelsa State / Yenagoa",
    indexKind: "confirmed",
    coverageRegion: "south-south",
    headline: "Starlink installation planning for Yenagoa and Bayelsa State",
    intro:
      "Yenagoa sits in a low-lying, waterway-rich part of the Niger Delta, so flood risk, vegetation, and access shape every install across Bayelsa State coverage.",
    localContext:
      "Yenagoa is the capital of Bayelsa State, in the heart of the Niger Delta. The land is flat and low, and the surrounding area is crossed by rivers and creeks, so flooding is a recurring concern in the rainy season. Equipment and cable runs should be positioned above likely water levels and protected from damp. Vegetation such as tall palms and dense trees can obstruct the sky, which often means mounting higher on a building or mast. Some surrounding communities are reached by road or boat, which affects scheduling. Many homes and offices rely on generators, so power planning is central to the install. Confirmed Bayelsa State coverage is represented through Yenagoa and nearby communities where attendance is practical; creek settlements are not assumed to be covered without an access check.",
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
      "Starlink installation planning for Yenagoa and Bayelsa State: flood risk, tree cover, waterway access, and power in the Niger Delta.",
    imageSrc: "/images/locations/bayelsa-vessel.jpeg",
    imageAlt:
      "Starlink terminal on a vessel in Bayelsa, from the published installation library",
    contentUpdatedAt: CONTENT_UPDATED,
    published: true,
    indexable: true,
  },
  {
    placeKey: "abia",
    placeName: "Abia State",
    regionLabel: "Abia State",
    indexCardLabel: "Abia State",
    indexKind: "confirmed",
    coverageRegion: "south-east",
    headline: "Starlink installation planning for Abia State",
    intro:
      "Abia mixes commercial Aba with quieter towns such as Arochukwu, where a duplex and a shop need different cable runs.",
    localContext:
      "Aba is a dense trading city. Shops and upper-floor homes sit close together, so a dish often has to clear signage, water tanks, and the next building rather than sit on the first flat roof that looks convenient. Power cuts are part of trading hours, which means a generator or inverter circuit is usually in the plan. Further out, towns such as Arochukwu have larger duplex compounds where the problem is coverage inside the house, not only sky view. A documented residential job in the source library is a 5-bedroom duplex there, with mesh used to carry one Starlink connection through the rooms. That is one property type, not a claim that every Abia home looks the same. Rain is heavy in season, so cable entries need sealing whether the building is a shop or a house.",
    relatedServiceSlugs: [
      "residential-installation",
      "business-connectivity",
      "wifi-networking",
      "backup-power",
    ],
    faqs: [
      {
        question: "Can a shop in Aba use the same approach as a duplex?",
        answer:
          "The dish still needs sky view, but the indoor network is different. A trading floor and a 5-bedroom house should be surveyed separately.",
      },
    ],
    imageSrc: "/images/locations/abia-duplex.jpeg",
    imageAlt:
      "Residential Starlink installation at a duplex in Arochukwu, Abia State, from the published installation library",
    seoTitle: "Starlink installation in Abia State | Skylink",
    seoDescription:
      "Starlink planning for Abia: dense Aba commercial roofs and larger duplexes such as those in Arochukwu.",
    contentUpdatedAt: CONTENT_UPDATED,
    published: true,
    indexable: true,
  },
  {
    placeKey: "anambra",
    placeName: "Anambra State",
    regionLabel: "Anambra State",
    indexCardLabel: "Anambra State",
    indexKind: "confirmed",
    coverageRegion: "south-east",
    headline: "Starlink installation planning for Anambra State",
    intro:
      "Onitsha, Nnewi, and Awka ask for different mounts: a market roof, a factory yard, or a residential estate.",
    localContext:
      "Anambra's main cities do not share one skyline. Onitsha is a market city beside the Niger, with dense commercial roofs, signage, and buildings packed close enough to block a low dish. Flooding on low commercial land is a seasonal fact, so equipment should not sit at ground level. Nnewi has industrial yards and family factories where the dish may need to clear a workshop roof and the network may need to reach more than one building. Awka, the capital, is more residential and institutional, with estates and campuses where permission and longer cable runs matter. Across the state, generator use is normal and the wet season is heavy. A site in one of these cities is not a template for the other two.",
    relatedServiceSlugs: [
      "residential-installation",
      "business-connectivity",
      "long-range-wifi",
      "backup-power",
    ],
    faqs: [
      {
        question: "Is an Onitsha market roof a good default mount?",
        answer:
          "Often no. Neighbouring buildings and tanks block the sky. The mount is chosen after looking at that specific roof.",
      },
    ],
    imageSrc: "/images/service-residential-installation.jpeg",
    imageAlt:
      "Illustrative residential wall-mount installation relevant to Anambra homes and commercial properties",
    imageCaption:
      "Illustrative mounting context; not presented as a completed Skylink project in Anambra State.",
    seoTitle: "Starlink installation in Anambra State | Skylink",
    seoDescription:
      "Starlink planning for Anambra: Onitsha commercial roofs, Nnewi yards, and Awka estates are surveyed separately.",
    contentUpdatedAt: CONTENT_UPDATED,
    published: true,
    indexable: true,
  },
  {
    placeKey: "ebonyi",
    placeName: "Ebonyi State",
    regionLabel: "Ebonyi State",
    indexCardLabel: "Ebonyi State",
    indexKind: "confirmed",
    coverageRegion: "south-east",
    headline: "Starlink installation planning for Ebonyi State",
    intro:
      "Abakaliki and the surrounding towns are quieter than the big coastal cities, but hills, new estates, and unreliable power still shape the install.",
    localContext:
      "Ebonyi is less dense than Lagos or Onitsha, which often means a clearer sky, not an automatic install. Abakaliki has a mix of older bungalows, newer estates, and public buildings. Low hills and compounds with trees can still hide the sky from a ground-floor wall, so the check is on the roof, not on a state-wide coverage map. Distances between a main house and a gatehouse or farm building are a common reason to talk about a cable or a short wireless link. Rain is seasonal and heavy enough to matter for sealing. Grid power is not something to assume through a workday, so inverter or generator planning belongs in the same visit. Where a journey from the nearer field base is long, scheduling is part of the quote rather than a promise of same-week arrival.",
    relatedServiceSlugs: [
      "residential-installation",
      "business-connectivity",
      "long-range-wifi",
      "backup-power",
    ],
    faqs: [
      {
        question: "Does a quieter town mean an easier install?",
        answer:
          "Sky view is often better than in a dense city. Access, power, and the distance between buildings still have to be checked.",
      },
    ],
    imageSrc: "/images/service-relocation.jpeg",
    imageAlt:
      "Illustrative pole-mounted Starlink installation relevant to compounds in Ebonyi State",
    imageCaption:
      "Illustrative compound installation context; not presented as a completed Skylink project in Ebonyi State.",
    seoTitle: "Starlink installation in Ebonyi State | Skylink",
    seoDescription:
      "Starlink planning for Ebonyi and Abakaliki: estate roofs, tree cover, longer building links, and backup power.",
    contentUpdatedAt: CONTENT_UPDATED,
    published: true,
    indexable: true,
  },
  {
    placeKey: "ibadan",
    placeName: "Ibadan",
    regionLabel: "Oyo State",
    indexCardLabel: "Ibadan (Oyo State)",
    indexKind: "confirmed",
    coverageRegion: "south-west",
    headline: "Starlink installation planning for Ibadan, Oyo State",
    intro:
      "Ibadan's spread of hilltop neighbourhoods, older compounds, and newer estates means sky view and cable runs change from one street to the next.",
    localContext:
      "Ibadan is a large, sprawling city in Oyo State with a mix of historic core areas, university and institutional districts, and expanding residential estates on the edges. Many homes are bungalows and multi-storey houses in walled compounds, often with trees that grew with the property and can block a low wall mount. Hills and ridges mean a neighbouring roof can sit higher than yours, so a ground-floor position that looks open at street level may still need a taller pole. Commercial streets and markets pack buildings tightly, which affects sky view and roof access for shops and upper-floor offices. Rain is seasonal and can be heavy, so cable entries and roof fixings need proper sealing. Grid power is uneven enough that generators and inverters are common, and the router location should sit on a circuit that stays up when the mains drop. Campus and institutional sites may need longer cable routes or links between buildings, and estate management rules can limit where external equipment goes. Confirmed Oyo State coverage is represented through Ibadan; other towns in the state are discussed on enquiry rather than treated as automatic same-timeline installs.",
    relatedServiceSlugs: [
      "residential-installation",
      "business-connectivity",
      "wifi-networking",
      "backup-power",
      "long-range-wifi",
    ],
    faqs: [
      {
        question: "Do hills in Ibadan affect where the dish can go?",
        answer:
          "They can. A neighbouring roof or ridge can block part of the sky, so candidate positions are checked before anything is fixed.",
      },
      {
        question: "Are university or institutional sites treated differently?",
        answer:
          "Often yes. Access rules, longer cable runs, and who must approve rooftop work are part of the survey conversation.",
      },
      {
        question: "Is every town in Oyo State covered the same way as Ibadan?",
        answer:
          "No. Ibadan is the published focus for Oyo State. Other towns can be discussed, with access and scheduling confirmed per address.",
      },
    ],
    imageSrc: "/images/hero-starlink-tile-roof.jpeg",
    imageAlt:
      "Illustrative tiled-roof Starlink installation environment relevant to Ibadan residential compounds",
    imageCaption:
      "Illustrative residential installation context; not presented as a completed Skylink project in Ibadan.",
    seoTitle: "Starlink installation in Ibadan, Oyo State | Skylink",
    seoDescription:
      "Starlink installation planning for Ibadan: hilltop sky view, compound trees, estate rules, and backup power in Oyo State.",
    contentUpdatedAt: CONTENT_UPDATED,
    published: true,
    indexable: true,
  },
  {
    placeKey: "ogun",
    placeName: "Ogun State",
    regionLabel: "Ogun State",
    indexCardLabel: "Ogun State",
    indexKind: "confirmed",
    coverageRegion: "south-west",
    headline: "Starlink installation planning across Ogun State",
    intro:
      "Ogun sits between Lagos and the wider South West. Industrial corridors, new estates, and older towns each ask for a different mount and access plan.",
    localContext:
      "Ogun State stretches from the Lagos border through industrial and logistics corridors toward older administrative and market towns. Areas such as Abeokuta, Sango-Ota, and growing estate belts near the Lagos fringe do not share one building pattern. Factory yards and warehouses often have wide metal roofs where wind loading, cable entry, and lightning protection matter as much as sky view. Residential estates near the Lagos corridor can look like Lagos compounds—managed roofs, estate rules, and neighbour shading—while inland towns may offer clearer sky but longer travel for a crew. Trees and water tanks on compound roofs are common obstruction sources. Seasonal rain means sealing and routing still need care, and many sites rely on generators or inverters during the working day. Because some addresses sit on busy Lagos–Abeokuta routes, traffic and gate access affect scheduling. Confirmed Ogun State coverage is discussed site by site; proximity to Lagos does not mean every local government area shares the same visit window.",
    relatedServiceSlugs: [
      "residential-installation",
      "business-connectivity",
      "wifi-networking",
      "backup-power",
      "long-range-wifi",
    ],
    faqs: [
      {
        question: "Is an Ogun factory roof the same job as a house install?",
        answer:
          "Usually not. Warehouses need different mounts, cable protection, and sometimes longer indoor runs to reach offices.",
      },
      {
        question: "Does living near the Lagos border speed up installation?",
        answer:
          "It can make travel simpler, but estate rules, sky view, and power still decide the scope. Scheduling is confirmed per enquiry.",
      },
      {
        question: "Can several buildings on an industrial plot be linked?",
        answer:
          "Possibly, using cable or a planned wireless link where line of sight allows. The layout is reviewed before any approach is suggested.",
      },
    ],
    imageSrc: "/images/service-business-connectivity.jpeg",
    imageAlt:
      "Illustrative commercial Starlink installation environment relevant to Ogun industrial and estate sites",
    imageCaption:
      "Illustrative commercial installation context; not presented as a completed Skylink project in Ogun State.",
    seoTitle: "Starlink installation in Ogun State | Skylink",
    seoDescription:
      "Starlink planning for Ogun State: industrial roofs near the Lagos corridor, estate rules, and backup power for homes and yards.",
    contentUpdatedAt: CONTENT_UPDATED,
    published: true,
    indexable: true,
  },
  {
    placeKey: "akwa-ibom",
    placeName: "Akwa Ibom State",
    regionLabel: "Akwa Ibom State",
    indexCardLabel: "Akwa Ibom State",
    indexKind: "confirmed",
    coverageRegion: "south-south",
    headline: "Starlink installation planning for Akwa Ibom State",
    intro:
      "Uyo's estates and the state's coastal belt bring different mounting, corrosion, and access questions than an inland South East compound.",
    localContext:
      "Akwa Ibom combines a growing state capital in Uyo with coastal and oil-and-gas influenced communities toward the Atlantic. In Uyo, many homes sit in planned estates and duplex compounds where management rules, trees, and neighbouring roofs affect dish placement. Flat concrete roofs are common and can take a pole mount when the owner agrees. Closer to the coast, salt air and humidity accelerate corrosion on weak fixings, so bracket and fastener choice matters more than on a dry inland site. Some commercial and institutional buildings need longer cable routes between a clear roof and the room where the router will sit. Rainfall is significant through the wet season, which makes sealed cable entries and firm mounts essential. Generator and inverter use is widespread, so power planning belongs in the first conversation. Confirmed Akwa Ibom coverage does not imply every coastal settlement is automatically scheduled; access and weather windows are confirmed for the specific address.",
    relatedServiceSlugs: [
      "residential-installation",
      "business-connectivity",
      "wifi-networking",
      "backup-power",
      "maritime-offshore",
    ],
    faqs: [
      {
        question: "Does coastal air in Akwa Ibom change the hardware choice?",
        answer:
          "It can. Salt and humidity favour corrosion-resistant fixings and careful sealing at cable entries.",
      },
      {
        question: "Are Uyo estate installs straightforward?",
        answer:
          "Estate rules and tree cover still need checking. A clear roof on paper is not the same as an approved mount position.",
      },
      {
        question: "Can maritime or riverside sites in the state be discussed?",
        answer:
          "Some may overlap with maritime and offshore planning. Tell us the access and vessel or riverside details so scope can be assessed.",
      },
    ],
    imageSrc: "/images/hero-starlink-rooftop-hp.jpeg",
    imageAlt:
      "Illustrative rooftop Starlink installation relevant to Akwa Ibom estates and coastal properties",
    imageCaption:
      "Illustrative rooftop installation context; not presented as a completed Skylink project in Akwa Ibom.",
    seoTitle: "Starlink installation in Akwa Ibom State | Skylink",
    seoDescription:
      "Starlink planning for Akwa Ibom: Uyo estate roofs, coastal corrosion, rain sealing, and backup power.",
    contentUpdatedAt: CONTENT_UPDATED,
    published: true,
    indexable: true,
  },
  {
    placeKey: "cross-river",
    placeName: "Cross River State",
    regionLabel: "Cross River State",
    indexCardLabel: "Cross River State",
    indexKind: "confirmed",
    coverageRegion: "south-south",
    headline: "Starlink installation planning for Cross River State",
    intro:
      "Calabar's hills, tropical vegetation, and a mix of residential and institutional sites shape how a dish sees the sky and how cables are protected.",
    localContext:
      "Cross River State's published focus is Calabar and surrounding communities where a crew can attend. The city sits near hills and dense vegetation, so tree canopy and neighbouring slopes often matter more than they do on a flat coastal plain. Residential compounds range from older bungalows to newer estates; many have mature trees that can close a sky window after the rains. Institutional, hospitality, and commercial sites may need longer cable runs from a clear roof position to the indoor network. Humidity is high for much of the year, and the wet season is intense enough that sealing and mount security deserve early attention. Power cuts remain common, so inverter or generator planning is part of a realistic install. Travel between Calabar and more remote upland or riverside communities can be longer than a city job implies, so scheduling and access details belong in the quotation conversation. Confirmed Cross River coverage does not mean every settlement in the state is automatically in scope.",
    relatedServiceSlugs: [
      "residential-installation",
      "business-connectivity",
      "wifi-networking",
      "backup-power",
      "long-range-wifi",
    ],
    faqs: [
      {
        question: "Do trees and hills block Starlink more often in Calabar?",
        answer:
          "They can. Dense vegetation and slopes change the sky view, so the mounting position is checked on site before fixing.",
      },
      {
        question: "Can hotels or campuses with several buildings be connected?",
        answer:
          "Possibly, using cable or a planned wireless link where line of sight allows. Layout and access are reviewed first.",
      },
      {
        question: "Is the whole of Cross River State covered equally?",
        answer:
          "No. Calabar and nearby communities are the published focus. Other towns are discussed with access and scheduling confirmed per enquiry.",
      },
    ],
    imageSrc: "/images/hero-starlink-pole-solar.jpeg",
    imageAlt:
      "Illustrative pole-mounted Starlink installation relevant to Cross River compounds and vegetated sites",
    imageCaption:
      "Illustrative mounting and power context; not presented as a completed Skylink project in Cross River State.",
    seoTitle: "Starlink installation in Cross River State | Skylink",
    seoDescription:
      "Starlink planning for Cross River and Calabar: hill and tree sky view, humidity, rain sealing, and backup power.",
    contentUpdatedAt: CONTENT_UPDATED,
    published: true,
    indexable: true,
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

export function locationIndexLabel(place: LocationRecord): string {
  return place.indexCardLabel?.trim() || place.placeName;
}

/** The 15 client-confirmed service areas shown as primary /locations cards. */
export function confirmedServiceAreas(): LocationRecord[] {
  return publishedLocations().filter((place) => place.indexKind === "confirmed");
}

export function regionalGuideLocations(): LocationRecord[] {
  return publishedLocations().filter(
    (place) => place.indexKind === "regional-guide",
  );
}

export function confirmedAreasByRegion(
  regionId: CoverageRegionId,
): LocationRecord[] {
  return confirmedServiceAreas().filter(
    (place) => place.coverageRegion === regionId,
  );
}
