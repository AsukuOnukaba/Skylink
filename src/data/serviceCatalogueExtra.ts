import type { ServiceRecord } from "@/data/services";

/**
 * Services that were missing from the first Skylink catalogue.
 * Facts follow the public non-blog DataGram service and landing pages.
 * Wording is rewritten for Skylink. Bandwidth ceilings that disagree in the
 * source are not restated as a single guaranteed figure.
 */
export const extraServices: ServiceRecord[] = [
  {
    slug: "sales-installation",
    title: "Sales, delivery, and professional installation",
    shortDescription:
      "Hardware supply, delivery, and on-site activation for a Starlink kit, including sites where new residential signup is limited.",
    description:
      "Some customers want the kit and the install handled together. This service covers selling Starlink hardware, delivering it, and having a technician activate and set it up on site. The public source also notes activation support in areas that are already at capacity for ordinary new signups. That does not mean every address can be activated on every plan. We check the address against the current Starlink options before treating supply and activation as one job.",
    audience:
      "Homes and businesses that want hardware, delivery, and setup from one conversation.",
    suitableFor: [
      "Buyers who do not already have a complete kit",
      "Sites where delivery and a same-scope installation are both needed",
      "Addresses that may only be offered a business or priority-style plan",
    ],
    inclusions: [
      "Hardware selection against the published catalogue",
      "Delivery to the agreed site",
      "On-site mounting, cabling, and first activation when that is in scope",
      "A plain handover of the router and the Starlink app",
    ],
    customerProvides: [
      "A service address we can check before ordering",
      "Access for delivery and installation",
      "Estate or landlord approval where mounting is restricted",
      "A power point for the router",
    ],
    limitations: [
      "Plan eligibility is decided by Starlink for that address, not by this page",
      "A listed hardware price is not a promise that the item is in stock",
      "Activation in a capacitated area is attempted only when Starlink still offers a path for that address",
    ],
    processSteps: [
      "Tell us the address, building type, and whether you need hardware as well as installation",
      "We check kit fit and what plan options the address currently shows",
      "Agree hardware, delivery, and install scope before anything is ordered",
      "Deliver, install, activate, and hand over",
    ],
    faqs: [
      {
        question: "Can you activate Starlink where new home signups are closed?",
        answer:
          "Sometimes. The source service includes activation even in capacitated areas, but only where Starlink still offers a plan for that address. We check before promising activation.",
      },
    ],
    relatedProductSlugs: [
      "starlink-gen3-standard",
      "starlink-mini",
      "starlink-flat-high-performance",
    ],
    imageSrc: "/images/service-sales-installation.jpeg",
    imageAlt:
      "Starlink hardware prepared for delivery and professional installation",
    seoTitle: "Starlink sales, delivery, and installation | Skylink",
    seoDescription:
      "Buy Starlink hardware with delivery and on-site setup. Address and plan eligibility are checked before the kit is ordered.",
    primaryCta: "quote",
    published: true,
    indexable: true,
  },
  {
    slug: "accessories",
    title: "Starlink accessories",
    shortDescription:
      "Cables, access points, and mesh gear that extend or tidy an installation after the dish is online.",
    description:
      "A working dish still needs the right cable length, a way to reach distant rooms, and sometimes a tougher mount. Accessory supply covers gigabit-class cables for high-speed links, satellite access points that extend Wi-Fi, and wired or wireless mesh systems. We match the accessory to the kit generation. A Gen 3 cable, for example, does not fit a Gen 2 dish.",
    audience:
      "Owners who already have Starlink and need parts to finish or extend the install.",
    suitableFor: [
      "Long dish-to-router runs",
      "Homes and offices that need extra Wi-Fi coverage",
      "Sites that need a pivot mount rather than the stock kickstand",
    ],
    inclusions: [
      "Advice on which accessory fits the installed generation",
      "Supply of cables, mounts, mesh nodes, or access points from the catalogue",
      "Fitting when installation is included in the same job",
    ],
    customerProvides: [
      "The dish generation and what is already installed",
      "A description of the gap: cable length, weak rooms, or mounting",
    ],
    limitations: [
      "Accessories do not change the Starlink plan or create coverage where the dish itself has no sky view",
      "Third-party radios and mesh nodes are not Starlink-manufactured unless the product page says they are",
    ],
    processSteps: [
      "Tell us the kit you have and what is not working",
      "We recommend a catalogue item that matches that kit",
      "Supply it, and fit it if that was agreed",
    ],
    faqs: [
      {
        question: "Will any long cable fit my dish?",
        answer:
          "No. The 45 m cable in the catalogue is for Gen 3 hardware and uses the Starlink connector. It is not a Gen 2 cable.",
      },
    ],
    relatedProductSlugs: [
      "starlink-pivot-mount",
      "starlink-mesh-router",
      "starlink-gen3-45m-cable",
      "wireless-long-range-wifi",
      "wired-long-range-wifi",
    ],
    imageSrc: "/images/service-accessories.jpeg",
    imageAlt:
      "Starlink cables and networking accessories laid out for an installation",
    seoTitle: "Starlink cables, mounts, and mesh accessories | Skylink",
    seoDescription:
      "Cables, pivot mounts, mesh routers, and access points matched to the Starlink kit you already have.",
    primaryCta: "quote",
    published: true,
    indexable: true,
  },
  {
    slug: "global-roaming",
    title: "Global roaming subscriptions",
    shortDescription:
      "Help choosing and activating a Starlink roaming subscription for travel on land, at sea, or in the air.",
    description:
      "Roaming subscriptions are for people who move. The public service covers staying connected while travelling, including land, sea, deep sea, and flight, when the plan Starlink sells actually allows that use. Hardware and subscription are separate. A Mini kit in the catalogue is listed as working with a Roam plan. A fixed home dish is not automatically a roaming terminal. We explain the class of plan and leave the live price and country rules to Starlink's own checkout, because those change.",
    audience:
      "Travellers, field teams, and operators who need a plan that is allowed to move.",
    suitableFor: [
      "Portable kits used in more than one place",
      "Marine and aviation scenarios where Starlink offers a mobility plan",
      "Teams that need the subscription handled alongside the hardware",
    ],
    inclusions: [
      "Explanation of roaming versus a fixed residential plan",
      "Help matching a portable or flat high-performance kit to a roaming-style plan",
      "Activation support for the subscription class that the address or vessel is offered",
    ],
    customerProvides: [
      "Where the terminal will be used, including whether it moves",
      "The kit model, if you already own one",
    ],
    limitations: [
      "Starlink sets roaming prices, fair-use rules, and where a plan may operate",
      "This page does not sell a Skylink-branded airtime product",
      "In-motion use depends on the plan and the terminal, not on a local installer",
    ],
    processSteps: [
      "Describe where and how the terminal will move",
      "We match that to hardware in the catalogue and to the plan class Starlink currently offers",
      "You confirm the subscription on Starlink's terms, and we help with activation and setup",
    ],
    faqs: [
      {
        question: "Is the Mini limited to a roaming plan?",
        answer:
          "The published product specification says the Mini works with the Starlink Roam plan and can support up to three Starlink mesh nodes. Confirm the current rule on your Starlink account before you buy.",
      },
    ],
    relatedProductSlugs: ["starlink-mini", "starlink-flat-high-performance"],
    imageSrc: "/images/service-global-roaming.jpeg",
    imageAlt:
      "Portable Starlink terminal associated with roaming and travel use",
    seoTitle: "Starlink global roaming subscriptions | Skylink Nigeria",
    seoDescription:
      "Roaming subscriptions for land, sea, and air use, matched to portable or high-performance hardware. Plan terms stay with Starlink.",
    primaryCta: "quote",
    published: true,
    indexable: true,
  },
  {
    slug: "enterprise-plans",
    title: "Enterprise internet plans",
    shortDescription:
      "Higher-throughput Starlink plans for organisations, with the published speed ceilings treated as conflicting source figures rather than a guarantee.",
    description:
      "The public service list describes enterprise plans in two different ways. The short heading says speeds up to 1000 Mbps. The longer description says speeds up to 400 Mbps. Those figures are not reconciled in the source, so this page does not pick one and call it the speed you will get. What is consistent is the intent: a higher-capacity plan for businesses and organisations, discussed alongside monitoring, failover, and how the link is shared. Real throughput depends on the plan Starlink sells for the address, congestion, and the local network.",
    audience:
      "Offices, campuses, and operators who need more than a single household link.",
    suitableFor: [
      "Sites with many concurrent users",
      "Organisations that want Starlink as a primary or secondary path",
      "Buyers comparing a flat high-performance terminal with a standard kit",
    ],
    inclusions: [
      "A conversation about user count, upload need, and failover",
      "Hardware guidance, including the flat high-performance kit where it fits",
      "Notes on how the link should be separated from the office LAN",
    ],
    customerProvides: [
      "A rough user count and the applications that must stay up",
      "Whether fibre or another link already exists",
    ],
    limitations: [
      "No speed on this page is a service-level promise",
      "The source itself disagrees between a 1000 Mbps heading and a 400 Mbps description",
      "Starlink sets plan price and availability per address",
    ],
    processSteps: [
      "Describe the site and the applications",
      "We explain the plan classes without treating either published ceiling as guaranteed",
      "Agree hardware and installation scope separately from the monthly plan",
    ],
    faqs: [
      {
        question: "Will I get 1000 Mbps?",
        answer:
          "Do not plan on it. One public line says up to 1000 Mbps and another says up to 400 Mbps. Neither is a guarantee for your address.",
      },
    ],
    relatedProductSlugs: [
      "starlink-flat-high-performance",
      "starlink-gen3-standard",
    ],
    imageSrc: "/images/service-enterprise-plans.jpeg",
    imageAlt:
      "Office connectivity equipment used when planning a higher-capacity Starlink link",
    seoTitle: "Enterprise Starlink plans in Nigeria | Skylink",
    seoDescription:
      "Enterprise Starlink plans for organisations. Published speed ceilings disagree in the source and are not treated as guaranteed throughput.",
    primaryCta: "quote",
    published: true,
    indexable: true,
  },
  {
    slug: "subscription-services",
    title: "Subscription services",
    shortDescription:
      "Help arranging Starlink subscriptions for a home, a business, or a larger organisation.",
    description:
      "Hardware supply and the monthly subscription are different purchases. This service is the subscription side: home plans for a household, business plans for a commercial site, and organisation plans for institutions that need the service shaped around more than one user group. We explain which class matches the address. We do not publish Starlink's monthly price table here, because those figures change on Starlink's own checkout.",
    audience:
      "Households, businesses, and institutions that need the subscription handled with the install.",
    suitableFor: [
      "A family connection on a residential-class plan",
      "A shop or office on a business-class plan",
      "A school, clinic, or campus that needs the service discussed as an organisation",
    ],
    inclusions: [
      "Matching the site to a home, business, or organisation plan class",
      "Explaining what the customer still completes on Starlink's own account",
      "Coordinating activation with installation when both are in scope",
    ],
    customerProvides: [
      "The service address",
      "Who will own the Starlink account",
    ],
    limitations: [
      "Monthly fees, data policies, and taxes are set by Starlink",
      "We do not invent a local subscription price",
    ],
    processSteps: [
      "Tell us whether the site is a home, a business, or an institution",
      "We describe the plan class and what you will confirm on Starlink",
      "Activation is scheduled with the installation if that was agreed",
    ],
    faqs: [
      {
        question: "Do you set the monthly fee?",
        answer:
          "No. Starlink sets subscription prices. We help you understand the plan class and complete activation alongside the install.",
      },
    ],
    relatedProductSlugs: ["starlink-gen3-standard", "starlink-mini"],
    imageSrc: "/images/service-subscription-services.jpeg",
    imageAlt:
      "Illustration of Starlink subscription planning for a home or organisation",
    seoTitle: "Starlink subscription help for homes and organisations | Skylink",
    seoDescription:
      "Subscription support for home, business, and organisation Starlink plans. Monthly prices stay on Starlink's own checkout.",
    primaryCta: "quote",
    published: true,
    indexable: true,
  },
  {
    slug: "boat-installation",
    title: "Boat and houseboat installation",
    shortDescription:
      "Flat high-performance mounting, cable routes, and power planning for boats and houseboats.",
    description:
      "A boat is not a rooftop. The dish has to stay secure in motion and spray, the cable has to survive vibration, and the power usually comes from batteries, an inverter, or shore power. The public boat guidance covers flat mounting, spray and vibration, battery-friendly power, and a handover that still makes sense when the boat leaves the marina. Smaller craft are discussed around a pure sine-wave inverter, battery size, and shore power as an alternative. Security of the dish on busy waterways, including bolted or welded brackets and a discreet cable route, is part of the conversation rather than an afterthought.",
    audience:
      "Owners of boats, houseboats, and small coastal craft.",
    suitableFor: [
      "Houseboats that need Wi-Fi through the accommodation",
      "Smaller vessels running from a battery bank",
      "Craft that move between a marina and open water",
    ],
    inclusions: [
      "Mounting position agreed for spray, vibration, and sky view",
      "Cable routing suited to a moving hull",
      "Power notes for inverter, battery, or shore supply",
      "Handover that covers marina and underway use",
    ],
    customerProvides: [
      "Access to the vessel and someone who knows its power system",
      "Permission from the owner or operator",
      "A realistic description of where the boat operates",
    ],
    limitations: [
      "Sea state and access can move the schedule",
      "Marine plan terms are set by Starlink",
      "A welded bracket needs a competent metalworker; we do not imply every boat gets one",
    ],
    processSteps: [
      "Describe the vessel, its power, and where it sits",
      "We agree mount, cable path, and power approach",
      "Install and test, then hand over photos and practical notes",
    ],
    faqs: [
      {
        question: "Which kit is usually discussed for a boat?",
        answer:
          "The flat high-performance terminal is the kit the marine pages describe for demanding and on-water use. Fit still depends on the vessel and the plan.",
      },
    ],
    relatedProductSlugs: ["starlink-flat-high-performance"],
    imageSrc: "/images/service-boat-installation.jpeg",
    imageAlt:
      "Starlink high-performance terminal mounted on a houseboat, from the published installation library",
    seoTitle: "Starlink boat and houseboat installation | Skylink",
    seoDescription:
      "Mounting, cabling, and power planning for Starlink on boats and houseboats, including inverter and shore-power options.",
    primaryCta: "quote",
    published: true,
    indexable: true,
  },
  {
    slug: "enterprise-marine-hub",
    title: "Enterprise and marine hub deployments",
    shortDescription:
      "A deeper install path for offices, NGOs, vessels, and industrial camps that need documentation as well as a dish.",
    description:
      "Some sites need more than a router on a desk. The enterprise and marine hub material distinguishes a standard install from a heavier service: a deeper survey, managed cable routes, network configuration, support after handover, written documentation, and attention to site compliance. The same public page points corporate offices, NGOs, offshore vessels, and oil-field camps toward different follow-on services rather than one generic package. What you receive in the source description is practical evidence: photos, an address plan, and a note of who to call.",
    audience:
      "Facilities, IT, and operations leads at multi-user or regulated sites.",
    suitableFor: [
      "Corporate offices and multi-site businesses",
      "NGOs and humanitarian locations",
      "Offshore vessels and industrial camps",
    ],
    inclusions: [
      "A survey that records mounting, power, and how the LAN should meet the dish",
      "Cable management and network configuration in the agreed scope",
      "Handover notes an IT team can file",
    ],
    customerProvides: [
      "A technical contact and site access rules",
      "Any existing network diagram or failover requirement",
    ],
    limitations: [
      "Compliance documents follow the site's own permit process; we do not issue regulatory certificates",
      "Scope is agreed per site. A hub deployment is not a flat-rate home install",
    ],
    processSteps: [
      "Identify whether the site is an office, an NGO location, a vessel, or a camp",
      "Survey and write the scope, including what is deliberately out of scope",
      "Install, configure, and hand over the notes and photos",
    ],
    faqs: [
      {
        question: "Is this the same as a home installation?",
        answer:
          "No. Home installation is a separate service. This path is for sites that need network separation, documentation, or a marine or industrial constraint.",
      },
    ],
    relatedProductSlugs: ["starlink-flat-high-performance", "starlink-gen3-standard"],
    imageSrc: "/images/service-enterprise-marine-hub.jpeg",
    imageAlt:
      "Starlink high-performance terminal at an enterprise site in the published installation library",
    seoTitle: "Enterprise and marine Starlink hub deployments | Skylink",
    seoDescription:
      "Survey, cabling, network configuration, and handover notes for offices, NGOs, vessels, and industrial camps.",
    primaryCta: "quote",
    published: true,
    indexable: true,
  },
  {
    slug: "offshore-hse",
    title: "Offshore HSE installation practice",
    shortDescription:
      "How offshore Starlink work is planned around permits, a pre-mobilisation survey, and a minimum crew.",
    description:
      "Offshore work is planned as a safety job as well as a connectivity job. The public HSE page describes permit-to-work compliance, a survey before mobilisation, a two-person minimum, and marine-rated hardware. The stated sequence is a remote survey, a permit and safety briefing, installation, activation with a speed baseline, and handover documents. Those steps describe the practice. They are not a claim that Skylink holds a particular offshore certification.",
    audience:
      "Vessel operators and company safety leads arranging an offshore install.",
    suitableFor: [
      "Offshore vessels with a permit-to-work system",
      "Sites that require a written survey before a crew travels",
    ],
    inclusions: [
      "Remote survey before mobilisation",
      "Work planned around the site's permit-to-work process",
      "Installation by at least two people where that rule applies",
      "Activation check and handover notes",
    ],
    customerProvides: [
      "The site's safety rules and permit process",
      "A point of contact for mobilisation",
    ],
    limitations: [
      "We follow the operator's safety system; we do not replace it",
      "No classification society approval is claimed on this page",
      "Weather and operator schedules control when a crew can board",
    ],
    processSteps: [
      "Remote survey of the mounting and power situation",
      "Permit-to-work and briefing on site",
      "Install, activate, record a baseline, and hand over",
    ],
    faqs: [
      {
        question: "Do you issue offshore safety certificates?",
        answer:
          "No. The work is carried out inside the operator's permit system. This page does not claim an independent certification.",
      },
    ],
    relatedProductSlugs: ["starlink-flat-high-performance"],
    imageSrc: "/images/service-offshore-hse.jpeg",
    imageAlt:
      "Starlink high-performance terminal on a naval vessel, from the published installation library",
    seoTitle: "Offshore Starlink HSE installation practice | Skylink",
    seoDescription:
      "Offshore Starlink installs planned around permits, a pre-mobilisation survey, a two-person crew, and handover notes.",
    primaryCta: "survey",
    published: true,
    indexable: true,
  },
  {
    slug: "marine-sdwan",
    title: "Marine SD-WAN integration",
    shortDescription:
      "Combining Starlink with LTE, VSAT, or a second dish, plus VLAN and traffic priority on the vessel network.",
    description:
      "Ships and camps often cannot rely on one path. The public integration notes describe four patterns: Starlink with 4G LTE failover, Starlink with VSAT backup, two Starlink dishes, and VLAN plus quality-of-service so operational traffic is not crowded out by crew use. The technical scope listed is dual-WAN router setup, VLAN configuration, priority for critical traffic, and monitoring or alerting when that is in scope. We do not publish a brand of router as the only option.",
    audience:
      "Vessel IT leads and camp networks that already have, or need, a second path.",
    suitableFor: [
      "Vessels that must fail over to LTE or VSAT",
      "Sites that want crew and operations traffic separated",
      "Operators considering a second dish rather than a single terminal",
    ],
    inclusions: [
      "Design of the failover pattern you actually need",
      "Dual-WAN and VLAN configuration within the agreed kit",
      "A written note of which traffic is preferred",
    ],
    customerProvides: [
      "The existing links and who administers them",
      "Which applications must survive a Starlink outage",
    ],
    limitations: [
      "LTE and VSAT availability depend on those networks, not on Starlink",
      "A second dish is extra hardware and an extra plan",
      "We do not guarantee failover speed",
    ],
    processSteps: [
      "List the links you already have and the traffic that matters",
      "Agree the failover and VLAN design",
      "Configure, test a failure, and hand over the settings",
    ],
    faqs: [
      {
        question: "Can Starlink replace VSAT completely?",
        answer:
          "Sometimes it is the primary path and VSAT stays as backup. The public notes treat that as one option, not a rule for every vessel.",
      },
    ],
    relatedProductSlugs: ["starlink-flat-high-performance"],
    imageSrc: "/images/service-marine-sdwan.jpeg",
    imageAlt:
      "Starlink terminal at an enterprise site where the link is integrated with an existing network",
    seoTitle: "Starlink marine SD-WAN and failover | Skylink",
    seoDescription:
      "Starlink with LTE, VSAT, or a second dish, plus VLAN and traffic priority for vessels and camps.",
    primaryCta: "quote",
    published: true,
    indexable: true,
  },
  {
    slug: "fleet-management",
    title: "Fleet connectivity",
    shortDescription:
      "Planning Starlink across more than one vessel or vehicle, with each hull scoped on its own.",
    description:
      "A fleet is a set of sites that move. The public fleet topic is about keeping several craft or vehicles connected, not about a single dashboard product. Each hull still needs its own sky view, power, and plan. What can be shared is the way the jobs are specified: the same mount standard, the same handover notes, and a named contact for the operator. We do not claim a proprietary fleet-tracking platform.",
    audience:
      "Operators responsible for more than one vessel or mobile asset.",
    suitableFor: [
      "Several boats that should be specified the same way",
      "Operators who want one conversation and separate installs",
    ],
    inclusions: [
      "A per-vessel scope, not one blended quote that hides differences",
      "Consistent handover notes across the vessels that are actually installed",
      "Guidance on roaming or marine plan class per asset",
    ],
    customerProvides: [
      "A list of vessels or vehicles and where they operate",
      "Who approves access for each one",
    ],
    limitations: [
      "Each asset is scheduled and checked separately",
      "No live tracking product is included unless a later agreement says so",
    ],
    processSteps: [
      "List the assets and the connectivity each one needs",
      "Survey or photograph the ones that are available",
      "Install vessel by vessel and keep the notes consistent",
    ],
    faqs: [
      {
        question: "Is this a software tracking product?",
        answer:
          "No. It is installation and plan guidance across multiple assets. It is not a fleet-tracking application.",
      },
    ],
    relatedProductSlugs: ["starlink-flat-high-performance", "starlink-mini"],
    imageSrc: "/images/service-fleet-management.jpeg",
    imageAlt:
      "Starlink high-performance terminal on a coastal vessel, from the published installation library",
    seoTitle: "Starlink connectivity for a vessel fleet | Skylink",
    seoDescription:
      "Per-vessel Starlink planning for operators with more than one boat or vehicle. No tracking software is implied.",
    primaryCta: "quote",
    published: true,
    indexable: true,
  },
  {
    slug: "priority-plans",
    title: "Priority plan activation",
    shortDescription:
      "Activation help where an address is offered Starlink Priority instead of a new residential signup.",
    description:
      "In some parts of Lagos, Abuja, and Port Harcourt, the public guidance says an address may be offered Priority rather than a new residential plan. That is not described as a rule for every street in those cities. It depends on the exact service address. Where the Starlink screen shows Priority, activation of that plan can be handled with the hardware and the install. Where it shows a residential plan, this service is the wrong one.",
    audience:
      "Buyers whose address is offered Priority instead of a new home plan.",
    suitableFor: [
      "Addresses in Lagos, Abuja, or Port Harcourt that display Priority",
      "Businesses that were expecting a residential signup and need the alternative explained",
    ],
    inclusions: [
      "A check of what the address is actually offered",
      "Activation of Priority when that is the option shown",
      "Installation coordinated with that activation when agreed",
    ],
    customerProvides: [
      "The exact service address",
      "Someone who can complete the Starlink account steps",
    ],
    limitations: [
      "Priority is not available for every address in those cities",
      "The monthly Priority price is set by Starlink and is not listed here",
    ],
    processSteps: [
      "Send the exact address",
      "We confirm whether Priority is what that address is offered",
      "Activate and install only on that basis",
    ],
    faqs: [
      {
        question: "Is every Lagos or Abuja address on Priority?",
        answer:
          "No. The source says some addresses in those cities, and some in Port Harcourt, are offered Priority. Check the specific address.",
      },
    ],
    relatedProductSlugs: ["starlink-gen3-standard", "starlink-flat-high-performance"],
    imageSrc: "/images/service-enterprise-plans.jpeg",
    imageAlt:
      "Connectivity planning image used for Priority plan conversations, not a specific customer site",
    seoTitle: "Starlink Priority plan activation in Nigeria | Skylink",
    seoDescription:
      "Priority plan activation where an address is offered Priority instead of new residential signup. Availability is per address.",
    primaryCta: "quote",
    published: true,
    indexable: true,
  },
  {
    slug: "estate-wifi",
    title: "Estate Wi-Fi distribution",
    shortDescription:
      "Starlink plus mesh or wired coverage across a compound or multi-unit estate, with management approval first.",
    description:
      "An estate is several homes or a managed compound sharing roofs, risers, and rules. Distribution means getting a working Starlink link out to the units that need it, using mesh where a wireless hop is enough and cable where the building is already ducted. The public estate example describes Priority activation together with mesh across multiple units. Management approval for rooftop equipment comes before any drilling. Coverage claims stop at the units included in the survey.",
    audience:
      "Estate managers, landlords, and residents arranging shared or multi-unit coverage.",
    suitableFor: [
      "Gated estates with a shared roof or riser",
      "Compounds where one dish must feed more than one building",
      "Abuja-style multi-unit sites where Priority may be the plan on offer",
    ],
    inclusions: [
      "A survey of roofs, risers, and which units are in scope",
      "Dish mounting only after management agrees",
      "Mesh or wired distribution for the units in that scope",
    ],
    customerProvides: [
      "Written estate or landlord permission",
      "Access to roofs and the units being covered",
    ],
    limitations: [
      "Permission can limit where the dish goes, or stop the job",
      "One dish does not automatically cover every unit in a large estate",
      "Plan type still depends on the address",
    ],
    processSteps: [
      "Confirm who can approve rooftop work",
      "Survey the units in scope and the cable or mesh paths",
      "Install, test the included units, and hand over",
    ],
    faqs: [
      {
        question: "Can one Starlink serve a whole estate?",
        answer:
          "Only the units the survey includes, and only if the plan and the Wi-Fi design can carry them. A large estate may need more than one link.",
      },
    ],
    relatedProductSlugs: [
      "starlink-gen3-standard",
      "starlink-mesh-router",
      "wired-long-range-wifi",
      "wireless-long-range-wifi",
    ],
    imageSrc: "/images/service-estate-wifi.jpeg",
    imageAlt:
      "Starlink dish mounted for a multi-unit estate installation in the published field library",
    seoTitle: "Estate Wi-Fi and Starlink distribution | Skylink Nigeria",
    seoDescription:
      "Starlink and Wi-Fi distribution for estates and compounds, after management approval and a unit-by-unit survey.",
    primaryCta: "survey",
    published: true,
    indexable: true,
  },
  {
    slug: "roaming-global-priority",
    title: "Roaming and Global Priority",
    shortDescription:
      "A separate look at roaming versus Global Priority, for people whose use does not fit a fixed home plan.",
    description:
      "Roaming and Global Priority are different Starlink plan classes, and the public site treats them as their own topic as well as mentioning roaming under subscriptions. Use this page when the question is which mobility class applies: a Roam-style plan for a portable kit, or a Global Priority class where Starlink offers that for the journey or the vessel. We will not collapse them into one price. Both are confirmed on Starlink's checkout for the account in question. Hardware in the catalogue that is explicitly tied to Roam is the Mini.",
    audience:
      "Buyers comparing a portable roaming plan with a higher mobility or priority class.",
    suitableFor: [
      "Mini kits that the product notes limit to Roam",
      "Operators asking about Global Priority rather than a home subscription",
    ],
    inclusions: [
      "A plain distinction between fixed, Roam, and Global Priority classes",
      "Hardware matching, especially Mini versus flat high performance",
      "Activation help for the class the account is actually offered",
    ],
    customerProvides: [
      "How and where the terminal will be used",
      "Whether you already hold a Starlink account",
    ],
    limitations: [
      "Prices and country coverage change on Starlink's side",
      "Being able to buy the hardware does not mean every plan class is offered in Nigeria",
    ],
    processSteps: [
      "Describe the movement pattern",
      "We say which class to check on Starlink",
      "Activate the class that is actually offered and set the hardware up",
    ],
    faqs: [
      {
        question: "Is Global Priority the same as the Mini Roam note?",
        answer:
          "No. The Mini specification names the Roam plan. Global Priority is a different class and has to be checked separately.",
      },
    ],
    relatedProductSlugs: ["starlink-mini", "starlink-flat-high-performance"],
    imageSrc: "/images/service-global-roaming.jpeg",
    imageAlt:
      "Portable Starlink terminal used to discuss roaming and Global Priority plans",
    seoTitle: "Starlink Roaming and Global Priority | Skylink Nigeria",
    seoDescription:
      "How roaming differs from Global Priority, and which catalogue hardware is tied to a Roam plan.",
    primaryCta: "quote",
    published: true,
    indexable: true,
  },
];
