/**
 * Service catalogue. Publish a record only when that offering is confirmed.
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
      "Home survey, roof or wall mounting, tidy cable routes, and a clear handover for Starlink at your house or apartment.",
    description:
      "A home Starlink install is mostly a question of where the dish sits and how the cable gets to the router. In Nigerian homes that usually means thinking about a concrete roof slab, a pitched sheet or tile roof, a boundary wall, or a pole beside the building, then keeping the dish clear of water tanks, palm trees, neighbouring blocks, and parapet walls that block the sky. We look at the sky view first, then plan a cable path that avoids sharp bends, avoids standing water, and ends at a sensible spot near the indoor router and a stable power point. Estates and gated communities often have rules about visible equipment, so we ask about those early rather than after drilling has started. When the job is done you get a plain walkthrough of the router, the Starlink app, and what to check if the connection drops.",
    audience:
      "Households, landlords, and tenants arranging Starlink for a home, duplex, or apartment.",
    suitableFor: [
      "Detached houses, duplexes, and estate homes with a usable roof or wall",
      "Apartments where the landlord or facility manager allows external mounting",
      "Homes where trees, tall neighbours, or water tanks make dish placement a real decision",
      "Households that want cabling kept neat and weatherproofed rather than trailing across walls",
    ],
    inclusions: [
      "Sky-view and obstruction check at candidate mounting positions",
      "Mounting hardware fitted to the roof, wall, or pole you agree on",
      "Cable route planned and fixed, with entry points sealed against rain and insects",
      "Indoor connection of the router and a first-run check in the Starlink app",
      "Short handover on moving the router, restarting, and basic troubleshooting",
    ],
    customerProvides: [
      "Access to the roof or wall area and to the room where the router will sit",
      "Estate, landlord, or management approval where mounting is restricted",
      "An active Starlink account and kit, unless supply is agreed with us separately",
      "A reliable power point at the router location",
    ],
    limitations: [
      "Where the dish can go is decided by sky view and building rules, not by preference alone",
      "Some roofs or walls may not suit drilling; alternative mounts add scope and are agreed first",
      "Speeds depend on Starlink service conditions and plan, not on the installer",
      "Roofing, structural, or electrical repairs are outside this service unless separately scoped",
    ],
    processSteps: [
      "Tell us the address, building type, and whether you already have a kit",
      "We review sky view, mounting options, and the cable path, either from photos or on a visit",
      "Agree the mount position, cable route, and scope before work starts",
      "Install, seal, and connect the equipment, then test on site",
      "Handover covering router placement, app use, and who to contact if something changes",
    ],
    faqs: [
      {
        question: "Do you check the sky view before mounting?",
        answer:
          "Yes. Obstructions are the most common reason a home install underperforms, so we check the candidate positions before fixing anything. The Starlink app can help, but a physical check on the roof is more reliable.",
      },
      {
        question: "Can the dish go on a rented apartment building?",
        answer:
          "Often, but it depends on the landlord or facility manager. We recommend getting their approval first and can tell you what to ask for.",
      },
      {
        question: "What if I already bought the kit?",
        answer:
          "That is fine. We can take a kit you already own and handle mounting, cabling, and handover, provided it is complete and the account is yours.",
      },
    ],
    relatedProductSlugs: [
      "starlink-gen3-standard",
      "starlink-pivot-mount",
      "starlink-mesh-router",
    ],
    seoTitle: "Home Starlink installation in Nigeria | Skylink",
    seoDescription:
      "Starlink installation for Nigerian homes: sky-view checks, roof or wall mounting, tidy cable routes, and a clear handover. Ask for a survey.",
    primaryCta: "survey",
    published: true,
    indexable: true,
  },
  {
    slug: "business-connectivity",
    title: "Business connectivity",
    shortDescription:
      "Starlink installation and set-up for offices, shops, clinics, and small commercial sites.",
    description:
      "Offices and commercial premises have different needs from homes: more people on the link, a landlord or building manager to deal with, and a business that notices when connectivity drops. We start by understanding what the connection must carry, such as video calls, point-of-sale, cloud accounting, CCTV uplink, or a handful of staff on laptops, and where the equipment can sit so it has a clear sky view without being exposed to tampering. We then plan mounting, cable routes through ducts or ceilings where possible, router position, and how the network is shared across the floor. We do not publish uptime percentages or service-level promises on this page. If your business needs written commitments, we discuss that in the quote conversation rather than pretending a page can settle it.",
    audience:
      "Business owners, office managers, and facilities teams who need dependable connectivity at a commercial site.",
    suitableFor: [
      "Offices and branches that need a primary or secondary internet path",
      "Shops, clinics, schools, and workshops outside reliable fibre coverage",
      "Sites where the roof belongs to a landlord and approvals have to be coordinated",
      "Teams that want a written quote before any work begins",
    ],
    inclusions: [
      "Conversation about site use, user count, and what the link must support",
      "Mount position and cable route suited to a commercial building",
      "Router placement and basic network layout for the working area",
      "On-site test and handover notes for the person who will own the link",
    ],
    customerProvides: [
      "Site access and landlord or facilities approvals",
      "A named contact on the day of installation",
      "An active Starlink account suitable for the intended use, unless agreed otherwise",
      "Details of any existing network, firewall, or backup power already on site",
    ],
    limitations: [
      "No uptime or SLA figures are published here; any written terms are agreed per project",
      "Multi-site rollouts are confirmed location by location",
      "Plan type, usage limits, and speeds follow Starlink's own terms",
      "Managed network operations are separate from installation unless explicitly scoped",
    ],
    processSteps: [
      "Describe the site, number of users, and the tasks that depend on the link",
      "Share photos or arrange a survey to confirm mounting and cable options",
      "Receive a quote and agree scope, timing, and who attends",
      "Install, test with your team, and record how the link is set up",
    ],
    faqs: [
      {
        question: "Can Starlink be the only connection for an office?",
        answer:
          "It can be, but it depends on how critical the link is. Many businesses pair it with another connection or backup power, and we can discuss that during the quote conversation.",
      },
      {
        question: "Do you handle several branches?",
        answer:
          "We can discuss it. Each location needs its own check of sky view and access, so scope and timing are confirmed branch by branch.",
      },
      {
        question: "Is this a managed network service?",
        answer:
          "This service covers installation and setup around Starlink. Ongoing managed network operations are only offered when separately agreed.",
      },
    ],
    relatedProductSlugs: [
      "starlink-flat-high-performance",
      "starlink-gen3-standard",
    ],
    seoTitle: "Starlink for offices and businesses | Skylink Nigeria",
    seoDescription:
      "Starlink installation for Nigerian offices, shops, and small commercial sites. Plan mounting, cabling, and network layout, then request a quote.",
    primaryCta: "quote",
    published: true,
    indexable: true,
  },
  {
    slug: "relocation",
    title: "Relocation",
    shortDescription:
      "Take down, move, and remount an existing Starlink setup at a new address or a better spot on the same property.",
    description:
      "Moving house or office should not mean starting from scratch with a Starlink kit you already own. Relocation covers carefully removing the dish and mount, protecting the cable and router, and reinstalling at the new position with the same attention as a first install. It also suits people who simply want a better location on the same property, for example moving a dish that is shadowed by a new building or a growing tree. At the new site we re-check sky view before drilling, because the old position tells us nothing about the new one. We also look at the cable. If the original run was cut short or damaged, we say so up front instead of improvising a joint that causes problems later.",
    audience:
      "Existing Starlink users changing address, or remounting on the same property for a better sky view.",
    suitableFor: [
      "Households or offices moving to a new address",
      "Properties where a new building or tree now blocks the original position",
      "Owners who need the old mount removed cleanly before handing back a rental",
    ],
    inclusions: [
      "Careful removal of the dish, mount, and accessible cable",
      "Sky-view check and mount planning at the new position",
      "Remount, cable routing, and sealing at the destination",
      "Reconnect and testing, including an account address check where relevant",
    ],
    customerProvides: [
      "Access at the old and new positions on agreed dates",
      "Confirmation that the kit and account remain in your control",
      "Landlord or estate approval at the destination where needed",
    ],
    limitations: [
      "Relocation is quoted per job; it is not offered free or at a flat advertised rate",
      "Damaged cables, brackets, or terminals may need replacement before reinstalling",
      "Account service-address rules are set by Starlink and may affect when service resumes",
      "Repairs to the old property, such as roof patching after removal, are outside scope unless agreed",
    ],
    processSteps: [
      "Tell us what is moving, from where, and to where",
      "Review the old setup and the new site, from photos or a visit",
      "Agree the removal day, the new mount position, and any replacement parts",
      "Remount, reconnect, and test before we leave",
    ],
    faqs: [
      {
        question: "Can I move my dish myself and just have you remount it?",
        answer:
          "You can, but handling the dish and cable carelessly is how they get damaged. If you do move it, tell us about the condition when you enquire so we can plan replacements if needed.",
      },
      {
        question: "Will my service address need to change?",
        answer:
          "Starlink has its own rules for changing a service address, and they can change. Check the current terms for your plan and tell us if you are unsure.",
      },
    ],
    relatedProductSlugs: ["starlink-pivot-mount", "starlink-gen3-45m-cable"],
    seoTitle: "Starlink relocation and remounting in Nigeria | Skylink",
    seoDescription:
      "Moving house or office? Skylink can take down, relocate, and remount your Starlink kit with a fresh sky-view check at the new site.",
    primaryCta: "quote",
    published: true,
    indexable: true,
  },
  {
    slug: "wifi-networking",
    title: "Wi-Fi and networking",
    shortDescription:
      "Mesh and coverage planning so a working Starlink link reaches every room or floor of the premises.",
    description:
      "A working dish does not guarantee good Wi-Fi in every room. Thick block walls, multiple floors, and detached boys' quarters or guest wings are common reasons signal fades just where people need it. This service covers planning and setting up the network inside your premises after the Starlink link is running. We look at where the router currently sits, which rooms are weak, and whether a mesh node, a wired access point, or a repositioned router is the practical answer. Where cabling between buildings or floors is realistic, wired backhaul is usually more dependable than relying on wireless hops through walls. We keep the design sized to the premises. Large enterprise network designs need separate scoping.",
    audience:
      "Homes, offices, and small commercial premises with uneven Wi-Fi coverage behind a Starlink connection.",
    suitableFor: [
      "Multi-storey homes where one router cannot cover every floor",
      "Properties with a main house plus a separate annexe or quarters",
      "Offices where a few dead spots affect staff or guests",
      "Owners who want a tidier layout of routers and access points",
    ],
    inclusions: [
      "Review of floor layout, wall construction, and current signal problems",
      "Placement and setup of mesh nodes or access points",
      "Wired backhaul runs between positions where practical",
      "Basic network naming and password handover",
      "Coverage check in the areas you named as problems",
    ],
    customerProvides: [
      "Access to all areas that need coverage and to power points for nodes",
      "Existing router or mesh equipment, if you already own it",
      "A floor plan or a walk-through with someone who knows the usage patterns",
    ],
    limitations: [
      "Coverage depends on building materials and layout; we plan sensibly but cannot promise signal behind every wall",
      "Link speed is limited by the Starlink connection itself, not by Wi-Fi gear",
      "This is not a WISP or internet-resale set-up; see the WISP guidance service for that",
      "Large enterprise network designs are scoped separately",
    ],
    processSteps: [
      "Describe where Wi-Fi is weak and what the network must support",
      "Walk the premises or review photos and a rough floor plan",
      "Agree the mesh, access point, or cabling approach",
      "Install, configure, and confirm coverage in the problem areas",
    ],
    faqs: [
      {
        question: "Is a mesh system always the answer?",
        answer:
          "No. Sometimes moving the router or adding a wired access point works better. We pick the simplest option that fits the building.",
      },
      {
        question: "Can you link a separate building on the same compound?",
        answer:
          "Often yes, using a cable run or a point-to-point link. For longer runs between buildings, see our long-range Wi-Fi service.",
      },
    ],
    relatedProductSlugs: [
      "starlink-mesh-router",
      "wireless-long-range-wifi",
      "wired-long-range-wifi",
    ],
    seoTitle: "Whole-premises Wi-Fi and mesh set-up | Skylink Nigeria",
    seoDescription:
      "Extend a working Starlink connection across every room or building. Mesh, access points, and wired backhaul planned around your premises.",
    primaryCta: "quote",
    published: true,
    indexable: true,
  },
  {
    slug: "long-range-wifi",
    title: "Long-range Wi-Fi links",
    shortDescription:
      "Link separate buildings or distant parts of a site to your Starlink connection using planned wireless or wired long-run links.",
    description:
      "Some sites are simply spread out: a main office and a warehouse across a yard, a school with several blocks, an estate gatehouse, a farm with outbuildings. Ordinary indoor Wi-Fi does not stretch that far, so the answer is a purpose-built link. Longer links are possible when line of sight and radio planning allow. Trees, buildings, ground clearance, and local radio interference all affect what can be done, so the first step is always a look at the path between the two points. Depending on the site, the link may be a pair of directional outdoor radios, or a cable run with suitable outdoor-rated cable and protection. We tell you honestly whether a path looks workable, and we do not quote a distance or throughput until the route has been checked. Any distance figures on equipment datasheets are best-case, not a promise for your site.",
    audience:
      "Sites with several buildings or long distances between the Starlink dish and where connectivity is needed.",
    suitableFor: [
      "Compounds with separate blocks, warehouses, or outbuildings",
      "Schools, clinics, and farms with spread-out structures",
      "Properties where trenching cable is costly but radio line of sight exists",
      "Sites that need a stable point-to-point link rather than extra indoor Wi-Fi",
    ],
    inclusions: [
      "Path review between the Starlink location and each destination",
      "Advice on wireless versus wired for the route",
      "Mounting and alignment of outdoor radios, or cable run planning where wired",
      "Configuration of the link and a throughput check once live",
    ],
    customerProvides: [
      "Access to both ends of each link and to any pole, mast, or roof position",
      "Power at each end, ideally with some backup",
      "Landlord or neighbour consent where the path or mounting crosses other property",
    ],
    limitations: [
      "No guaranteed distance, speed, or SLA; results depend on line of sight, radio conditions, and equipment",
      "Radio links need clear paths; trees and buildings can rule a route out",
      "Masts or poles, civil work, and trenching are separate from the link itself unless scoped",
      "Link throughput can never exceed the Starlink connection feeding it",
    ],
    processSteps: [
      "Share the layout of the site and the distance between points",
      "We assess line of sight, obstructions, and the choice between wireless and cable",
      "Agree the link design, equipment, and any mounting works",
      "Install, align, and test at both ends, then document the setup",
    ],
    faqs: [
      {
        question: "How far can a link go?",
        answer:
          "Longer links are possible when line of sight and radio planning allow, but the real distance depends on your site. We confirm it after looking at the path, not before.",
      },
      {
        question: "Wireless or cable?",
        answer:
          "Cable is usually steadier when a safe route exists. Wireless saves trenching when there is a clear line of sight. We compare both for your site.",
      },
    ],
    relatedProductSlugs: ["wireless-long-range-wifi", "wired-long-range-wifi"],
    seoTitle: "Long-range Wi-Fi links between buildings | Skylink",
    seoDescription:
      "Connect separate buildings to your Starlink link with planned wireless or wired long-range Wi-Fi. Line-of-sight checks come first.",
    primaryCta: "survey",
    published: true,
    indexable: true,
  },
  {
    slug: "backup-power",
    title: "Backup power",
    shortDescription:
      "Plan UPS, inverter, or generator coordination so your Starlink connection stays usable during grid outages.",
    description:
      "In much of Nigeria the question is not whether the power will drop but how often. A Starlink dish and router need steady power to stay online, and a sudden cut followed by a restart can interrupt calls, payments, and remote work. This service helps you decide how the Starlink equipment should be powered when mains fails: through a UPS, an inverter system, a generator with changeover, or a mix. We look at what the equipment draws, what else shares the circuit, and how long you need it to stay up, then coordinate the install with your electrician or ours where agreed. We do not name a single brand as the answer, and we do not promise runtimes before we know your battery, load, and conditions.",
    audience:
      "Homes and sites with frequent outages that need connectivity to continue.",
    suitableFor: [
      "Homes that rely on generators and want a smooth hand-off when power switches",
      "Offices that need the link up during short outages",
      "Sites that already have an inverter or solar set-up and want Starlink included",
      "Remote locations where power is unstable and the Starlink link is essential",
    ],
    inclusions: [
      "Discussion of what must stay online and for roughly how long",
      "Review of existing UPS, inverter, battery, or generator arrangements",
      "Guidance on connecting the Starlink power supply and router to a protected circuit",
      "Coordination with the electrician or power installer during the Starlink install",
    ],
    customerProvides: [
      "Details of existing power equipment, including ratings where known",
      "Safe access to the distribution board and power equipment area",
      "A licensed electrician for any mains or distribution-board work, where required",
    ],
    limitations: [
      "No fixed runtime promises; runtime depends on your battery, load, and conditions",
      "No brand endorsement is implied by this page",
      "Mains wiring and distribution-board changes belong to a qualified electrician",
      "Large solar or inverter system design is outside this service unless separately scoped",
    ],
    processSteps: [
      "Tell us how often power drops and what must stay connected",
      "Review your current power equipment and where the Starlink gear will sit",
      "Agree a practical arrangement for powering the dish and router",
      "Install or coordinate the wiring and test with a simulated outage where it is safe",
    ],
    faqs: [
      {
        question: "Will a small UPS keep Starlink running through a long outage?",
        answer:
          "Not necessarily. Runtime depends on the equipment load and the battery capacity. We help you size expectations rather than guess.",
      },
      {
        question: "Do I need an inverter or can I use my generator directly?",
        answer:
          "Both can work. A generator alone often means a brief drop at changeover, which a UPS or inverter in between can smooth out.",
      },
    ],
    relatedProductSlugs: ["starlink-gen3-standard", "starlink-mesh-router"],
    seoTitle: "Backup power for Starlink in Nigeria | Skylink",
    seoDescription:
      "Keep Starlink online through power cuts. Plan UPS, inverter, or generator arrangements around your dish and router with Skylink.",
    primaryCta: "quote",
    published: true,
    indexable: true,
  },
  {
    slug: "wisp-setup",
    title: "WISP set-up guidance",
    shortDescription:
      "Technical guidance for planning a small wireless internet service built on Starlink or fibre backhaul.",
    description:
      "Some customers do not just want to use internet; they want to share it across an estate, a market, a campus, or a neighbourhood as a small wireless internet service provider. This guidance service helps you think through the technical side: where the backhaul comes from, whether Starlink, fibre, or both are used, how radio sectors and point-to-point links are placed, how customers are handed off, and what monitoring you will need. We discuss tower or mast positions, link budgets in general terms, and the equipment classes that fit small operations. This is technical guidance only. It is not legal, licensing, or regulatory advice. Whatever rules apply to reselling or sharing connectivity in your area, you must confirm them with the appropriate authorities and Starlink's own terms. Commercial terms for any involvement beyond guidance are discussed case by case.",
    audience:
      "Entrepreneurs, estate managers, and community operators planning to share connectivity with multiple users.",
    suitableFor: [
      "Estates or campuses that want to serve many households or rooms from shared backhaul",
      "Small operators exploring Starlink or fibre as the upstream connection",
      "Teams comparing point-to-point, sector, and wired distribution designs",
      "Anyone who wants a realistic technical picture before buying equipment",
    ],
    inclusions: [
      "Discussion of the coverage area, expected users, and upstream options",
      "High-level network topology covering backhaul, distribution, and customer edge",
      "Guidance on mast or roof positions, line of sight, and equipment classes",
      "Pointers on monitoring, power, and growth planning",
    ],
    customerProvides: [
      "A clear description of the area, the buildings, and the number of intended users",
      "Your own checks of licensing, regulatory, and Starlink plan terms",
      "Site access for any survey work",
    ],
    limitations: [
      "No legal, licensing, or regulatory advice is given",
      "Starlink plan terms may restrict resale or sharing; check them before committing",
      "No customer-count, speed, or revenue promises are made",
      "Commercial terms for installation or ongoing involvement are discussed case by case",
    ],
    processSteps: [
      "Explain the area you want to serve and the upstream options you are considering",
      "We outline a technical approach and the main risks, such as line of sight, power, and capacity",
      "You decide whether to proceed and check the regulatory side separately",
      "If agreed, we scope any survey or installation work as a separate engagement",
    ],
    faqs: [
      {
        question: "Can Starlink be used as the backhaul for a WISP?",
        answer:
          "That depends on Starlink's current plan terms and your local regulations. We discuss the technical side. Confirm the terms and rules yourself before you commit.",
      },
      {
        question: "Do you provide licensing advice?",
        answer:
          "No. We offer technical guidance only. Speak to the relevant authorities or a qualified adviser for licensing and legal questions.",
      },
    ],
    relatedProductSlugs: [
      "starlink-flat-high-performance",
      "wireless-long-range-wifi",
      "wired-long-range-wifi",
    ],
    seoTitle: "WISP set-up technical guidance | Skylink Nigeria",
    seoDescription:
      "Technical guidance for planning a small WISP on Starlink or fibre backhaul. Network design pointers, not legal advice. Commercial terms case by case.",
    primaryCta: "quote",
    published: true,
    indexable: true,
  },
  {
    slug: "maritime-offshore",
    title: "Maritime and offshore",
    shortDescription:
      "Starlink connectivity planning and installation support for vessels and offshore sites, with scope agreed per job.",
    description:
      "Connectivity on a vessel or offshore site is not like connecting a house. Space for the terminal is limited, motion and vibration are constant, salt and weather are hard on equipment, and access is usually restricted by the operator. Because each vessel or site is different, we do not offer a fixed package. Instead, we discuss the vessel type or site, where equipment could be placed, how cabling would run, how power is supplied, and what the operator requires before anyone comes aboard. The scope is agreed per job. The right Starlink kit and plan for marine use depend on current Starlink availability and terms, so we confirm those during the conversation rather than assuming. We do not claim approvals or credentials on this page. If a client or operator requires specific documentation, we raise it at the start of the discussion.",
    audience:
      "Vessel owners, marine operators, and offshore site managers who need satellite connectivity.",
    suitableFor: [
      "Coastal and inland-water vessels needing planned terminal placement",
      "Offshore or riverine support sites with limited existing connectivity",
      "Operators who want a clear conversation about constraints before committing",
    ],
    inclusions: [
      "Discussion of vessel or site layout, mounting options, and cable runs",
      "Advice on equipment suited to the environment, subject to current Starlink options",
      "Install coordination with the operator's safety and access procedures",
      "Handover notes on use and basic checks",
    ],
    customerProvides: [
      "Vessel or site access arranged with the operator",
      "Any operator approvals, permits, or safety inductions required",
      "Power arrangements and information about the onboard electrical system",
      "An active Starlink account and plan suitable for the intended use",
    ],
    limitations: [
      "Scope is agreed per job; no standard maritime package is advertised",
      "Weather, sea state, and access conditions can change schedules",
      "Marine plan availability and terms are set by Starlink and may change",
      "No credentials, classification approvals, or uptime figures are claimed on this page",
    ],
    processSteps: [
      "Describe the vessel or site, its location, and the connectivity need",
      "We discuss placement, cabling, power, and operator requirements",
      "Agree scope, schedule, and access for the specific job",
      "Carry out the work within the agreed constraints and hand over with practical notes",
    ],
    faqs: [
      {
        question: "Do you have a standard maritime package?",
        answer:
          "No. Each vessel or offshore site is different, so scope is agreed per job after we understand the constraints.",
      },
      {
        question: "Which Starlink kit suits a vessel?",
        answer:
          "It depends on the vessel, the plan, and what Starlink currently offers for marine use. We confirm the options with you when you enquire.",
      },
    ],
    relatedProductSlugs: ["starlink-flat-high-performance"],
    seoTitle: "Maritime and offshore Starlink support | Skylink Nigeria",
    seoDescription:
      "Starlink connectivity planning for vessels and offshore sites in Nigeria. Scope is agreed per job after a conversation about constraints.",
    primaryCta: "quote",
    published: true,
    indexable: true,
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
