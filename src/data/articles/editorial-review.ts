import {
  h2,
  p,
  ul,
  type ArticleBlock,
  type ArticleRecord,
  type ArticleSource,
} from "@/data/articles/article-types";

const REVIEW_DATE = "2026-11-21";

const titleOverrides: Partial<Record<string, string>> = {
  F04: "How Starlink equipment is changing and what Nigerian buyers should know",
  N09: "Starlink Direct to Cell: what it means for Nigerian mobile users",
  B12: "What Nigerian businesses should expect from Starlink reliability",
  M05: "Safety and access planning for offshore Starlink work",
};

const seoTitleOverrides: Partial<Record<string, string>> = {
  F04: "How Starlink equipment is changing in Nigeria | Skylink",
  N09: "Starlink Direct to Cell and Nigerian mobile users | Skylink",
  B12: "Starlink reliability for Nigerian businesses | Skylink",
  M05: "Safety planning for offshore Starlink work in Nigeria | Skylink",
};

/**
 * Plain-English answer to the main question behind every research-bank topic.
 * These are deliberately individual: they are also used for cards, so the blog
 * index tells readers what each article will actually help them understand.
 */
const plainAnswers: Record<string, string> = {
  R01: "Prepare the property, permission, power supply and account details before installation day. The final dish position should still be confirmed at the property because photographs cannot show every obstruction or roof-safety issue.",
  R02: "A proper site survey checks the view of the sky, the strength and accessibility of the mounting surface, the cable route, indoor router position and available power. It turns assumptions into an installation plan and a more accurate quotation.",
  R03: "Tenants and residents of managed estates should obtain written permission before anyone drills, mounts equipment or enters a shared roof. Agree the location, cable route and responsibility for later removal with the landlord or facility manager.",
  R04: "The best mount is the safest structurally sound position that gives the dish the clear view of the sky required by the Starlink app. Roof material, wind exposure, waterproofing and future maintenance all matter.",
  R05: "Trees, water tanks, parapet walls and neighbouring buildings can interrupt the dish's view of moving satellites. Use the Starlink app at the proposed mounting height and move or raise the dish if the obstruction reading is poor.",
  R06: "Plan the complete cable route before drilling. The correct cable must run from the dish to the equipment without sharp bends, exposed joints, water entry points or sections that people, doors and rodents can damage.",
  R07: "Protect exposed Starlink cable with suitable conduit or trunking, keep it away from food stores and roof spaces with rodent activity, and inspect it if the app reports a cable fault. A badly chewed cable should be replaced, not taped outdoors.",
  R08: "A duplex needs two connected plans: a clear high position for the dish and reliable Wi-Fi where people actually use the internet. Longer cable, wired network points or mesh units may be needed between concrete floors.",
  R09: "Nigeria's rain, wind, heat and harmattan dust mainly affect the physical installation. Sound fixings, sealed cable entries, sensible equipment placement and periodic visual checks are more useful than seasonal guesswork.",
  R10: "Starlink needs stable electricity, so size an inverter, UPS or generator arrangement for the actual kit and the other networking equipment. The aim is to prevent repeated restarts during outages and generator changeovers.",
  R11: "Installation time depends on roof access, mount type, cable distance, permissions, weather and whether power is ready for testing. A straightforward home can be completed quickly, while difficult access or additional network work takes longer.",
  R12: "Self-installation may suit a simple, safe ground-level setup, but roof work, waterproof cable entry, long runs and difficult obstructions are good reasons to use a professional. Saving labour is not worthwhile if it creates a leak or unsafe mount.",
  R13: "A working dish does not guarantee strong Wi-Fi throughout a large compound. Router position, thick walls, distance and interference determine indoor coverage; mesh units or wired access points can extend it when properly planned.",
  R14: "Place the router in a ventilated, central and secure position with stable power, rather than hiding it beside the cable entry. If the dish cable cannot reach a useful room, plan a longer compatible cable or a wired network extension.",
  R15: "Starlink can be useful where fixed broadband is limited, but a rural home still needs service availability, clear sky, reliable power, physical security and a support plan. Open land alone does not solve every installation issue.",
  R16: "Before roof work, tell the installer about height, fragile sheets, locked access points, nearby electricity lines and any estate rules. Nobody should climb an unsafe roof simply because an appointment has been booked.",
  R17: "Handover should confirm that the dish is online, the Wi-Fi name and password work, the cable and power arrangement are understood, and the customer knows how to use the Starlink app. Account and subscription issues remain in Starlink's official support system.",
  R18: "Moving Starlink involves both a careful physical removal and an account change. Protect every connector, assess the new property as a fresh installation and confirm service availability at the new address before remounting.",
  R19: "For remote work, the quality of the connection at the desk matters more than the presence of a dish on the roof. Plan stable power, useful Wi-Fi or Ethernet, and an alternative connection for meetings or deadlines that cannot be interrupted.",
  R20: "Ask an installer how the sky view will be checked, which mount and cable suit your kit, how holes will be sealed, what the quotation includes and what support follows handover. Clear answers are more valuable than vague badges or promises.",
  E01: "Starlink Mini is compact and uses less power, while Standard equipment is generally better suited to a fixed home or office installation. Choose according to portability, power, expected use and the plans currently offered for your address.",
  E02: "Standard and Performance-class terminals serve different environments. A conventional home or small office may be well served by Standard equipment, while demanding mobile, marine or resilient commercial work can justify Performance hardware after a proper assessment.",
  E03: "A complete Starlink kit needs a compatible terminal, power arrangement, router or network connection and the correct cables for that hardware generation. Confirm every component and the kit's account status before paying a seller.",
  E04: "A longer Gen 3 cable is useful when the clearest dish position is far from a sensible indoor router location. Measure the proposed route, confirm hardware compatibility and avoid improvised joints before buying the 45-metre option.",
  E05: "Mesh can improve coverage by using several connected Wi-Fi units, but it cannot repair an obstructed dish or unstable power. First place the main router well, then add nodes or wired access points where testing shows weak coverage.",
  E06: "A mount must match the Starlink model, the surface and the environmental load. Pivot, wall and pole accessories solve different problems, so choose after checking sky view, structure, wind, water runoff and cable entry.",
  E07: "Ethernet gives offices, cameras and fixed workstations a wired connection that is often steadier than distant Wi-Fi. The required adapter or port depends on the Starlink generation, and business networks may also need a switch or third-party router.",
  E08: "Check the exact terminal model, serial and account-transfer position as well as the router, power supply and cables. An attractive price is poor value if the kit is incomplete, damaged, tied to another account or incompatible with available plans.",
  E09: "Keep the Starlink router when it meets the premises' needs; consider third-party networking when you need stronger management, more wired ports, better multi-room coverage or separate staff and guest networks. Compatibility and setup vary by hardware generation.",
  E10: "Starlink can provide the internet connection for a long-range wireless link, but separate outdoor radios and careful alignment distribute that connection to another building. This is a small network design project, not a router-range trick.",
  E11: "The dish, router and any network switches need clean, adequately sized power. Confirm the official consumption for the exact kit, allow inverter headroom and use suitable surge and backup protection rather than guessing from the plug alone.",
  E12: "Buy an accessory only when it solves a measured problem such as poor mounting, insufficient cable length, weak Wi-Fi or missing wired ports. Match it to the hardware generation and installation conditions before ordering.",
  E13: "Temporary sites need portable mounting, protected equipment, dependable power, secure storage and a clear person responsible for setup. The best hardware depends on how often the site moves and how many people depend on it.",
  E14: "Compare hardware by intended location, mobility, power demand, mounting needs and compatible service plans. The product catalogue is a starting point; the actual property, vessel or project determines the sensible choice.",
  E15: "Performance-class hardware becomes relevant when mobility, harsh conditions, wider sky visibility or operational resilience matter enough to justify the cost and installation demands. It should answer a real requirement, not simply be the most expensive option.",
  T01: "When Starlink shows Offline or Searching, first check the app for an outage or alert, then confirm stable power, firmly seated cables and a clear dish position. The result of each check tells you whether the problem is account, network, power or hardware related.",
  T02: "A Cable Disconnected message usually points to a loose, damaged, wet or incompatible connection. Switch the equipment off safely, inspect accessible connectors and the cable route, then seek help if damage is outdoors or on a roof.",
  T03: "Slow service can come from the satellite connection, an obstructed dish, local Wi-Fi, too many active devices or a wider outage. Test close to the router and use the Starlink app before changing hardware.",
  T04: "Router lights provide a quick indication, but the Starlink app gives the more useful status and alerts. Check the guide for your exact router generation because colours, reset methods and port layouts can differ.",
  T05: "Repeated restarting is commonly caused by unstable electricity, a loose power connection, overheating or damaged equipment. Note whether it happens during generator changeover or heavy load before assuming there is a satellite fault.",
  T06: "A factory reset removes network settings and should come after basic power, cable and app checks. Use the reset method published for the exact router model, and expect to set the Wi-Fi name and password again.",
  T07: "Payment, suspension and account-access problems must be resolved through the customer's Starlink account and official support. An installer can check physical equipment, but cannot bypass billing rules or unlock an account.",
  T08: "New obstruction warnings after the rains often mean branches have grown into the dish's field of view. Review the app's obstruction map and consider safe pruning or relocation instead of repeatedly restarting the equipment.",
  T09: "Change the network name and password through the Starlink app while connected to the system. Use a strong password, reconnect household devices carefully and keep the new details somewhere secure.",
  T10: "When cameras or smart devices fail, determine whether Starlink itself is offline or only the local device has lost Wi-Fi. Check power, network band, signal strength, cabling and the device vendor's settings one step at a time.",
  T11: "Gaming performance depends on latency, congestion, Wi-Fi quality and the game server's location. Use Ethernet where practical, avoid heavy competing downloads and judge the experience with the games you actually play rather than relying on one speed test.",
  T12: "Safe app checks, restarts and accessible cable inspections are reasonable for customers. Roof climbing, damaged outdoor cables, leaking entry points, unstable mounts and repeated electrical faults should be handled by a competent professional.",
  T13: "Harmattan dust usually calls for a careful visual inspection, not aggressive washing. Keep indoor equipment ventilated and follow official care guidance; do not climb onto a roof merely to make the dish look cleaner.",
  T14: "Check the Starlink app and official status information, then compare another device and inspect local power and Wi-Fi. If many users are affected, wait for service recovery; if only your property is affected, continue local troubleshooting.",
  T15: "During the first week, confirm account access, save the kit details, test important rooms, observe power changeovers and learn the normal app status. Early notes make future support much faster.",
  B01: "An office installation must cover business operations, not only the roof. Plan the terminal, backup power, wired and wireless network, staff and guest access, security equipment and what happens when the main connection fails.",
  B02: "Starlink can serve as a second internet path when fibre or terrestrial wireless fails. Automatic failover requires a suitable router, testing and clear rules for which business traffic should continue on the backup link.",
  B03: "Choose a business plan by checking the current offer for the address, required data priority, public-IP needs, hardware and support expectations. Treat plan names and prices as changeable information that must be confirmed at purchase.",
  B04: "Starlink supplies the internet connection; a separate network design carries it around the building. Larger premises may need wired backhaul, several access points, guest separation and monitoring rather than one centrally hidden router.",
  B05: "Connecting several buildings requires ownership rules, outdoor links, access points, power, security and fair-use decisions. A domestic mesh system is rarely enough for an estate-wide service.",
  B06: "Using Starlink as the upstream connection for a local wireless service involves network design, Starlink's terms and Nigerian regulatory obligations. Anyone planning to resell access should obtain current professional and regulatory advice before deployment.",
  B07: "Hotels and guest houses should separate guest access from booking, payment and staff systems, provide backup power and design coverage for rooms and shared spaces. The busiest period, not an empty lobby, should guide the network.",
  B08: "A school or campus needs controlled access, coverage across several buildings, content and security policies, stable power and support ownership. The connection should be planned as institutional infrastructure rather than placed in one staff room.",
  B09: "Multi-site businesses need an inventory of each kit, account, address, plan, mount and local contact, plus consistent monitoring and escalation. A central view helps, but every site still needs working power and physical support.",
  B10: "Construction sites need connectivity that can be moved, powered and secured as the project changes. Plan temporary mounting, generator or solar power, dust and rain protection, user access and eventual removal from the beginning.",
  B11: "POS terminals and cameras depend on the local network and power as well as the internet link. Separate critical devices where practical, use wired connections for fixed equipment and protect the router, switch, recorder and Starlink power path.",
  B12: "A professional installation improves the parts Skylink controls, but it cannot create an uptime guarantee that the service plan does not provide. Businesses with low tolerance for outages should design backup connectivity and documented response procedures.",
  B13: "Roaming and Priority products have different permitted uses, geographic coverage and billing. Confirm the latest terms in the official account before travel or deployment; do not assume a home plan will work internationally or at sea.",
  B14: "Commercial installation cost depends on access, mount and cable work, power, network size, travel and safety requirements. A useful quotation follows a survey or detailed brief rather than a single nationwide price.",
  B15: "Fibre usually offers excellent fixed-site capacity where it is reliable, 5G can be quick to deploy within good coverage, and Starlink reaches places without terrestrial infrastructure. Many businesses combine two different technologies for resilience.",
  L01: "Lagos apartment and estate installations usually depend on roof permission, safe shared access, neighbouring buildings, long cable routes and reliable indoor Wi-Fi. Resolve estate-management questions before booking roof work.",
  L02: "Across Abuja, property type and estate rules matter more than the district name alone. Check roof access, harmattan exposure, nearby trees or higher buildings, cable distance and dependable power for the specific address.",
  L03: "Port Harcourt and Rivers installations need careful rain sealing, corrosion-aware fixings, safe access and clear separation between ordinary land properties and vessel or offshore work. The exact location determines logistics.",
  L04: "Ibadan's large compounds, mature trees, varied elevations and mixed building types make an on-site sky check important. Plan power and indoor coverage as carefully as the roof position.",
  L05: "Ogun installations range from estate homes to warehouses and industrial yards. Security access, roof type, dust, machinery, power and the distance between buildings should shape the design.",
  L06: "Benin City homes and small businesses should plan for heavy rain, roof condition, trees, secure cable routes and backup power. A clear address brief helps distinguish a simple home job from a larger premises network.",
  L07: "Owerri installations commonly need attention to rain sealing, concrete multi-storey buildings, router placement and generator or inverter changeover. Assess the actual property rather than relying on a city-wide assumption.",
  L08: "Enugu's slopes and varying roof heights can change the view of the sky over a short distance. The Starlink app should be used at the intended mounting height, with runoff and safe roof access considered.",
  L09: "Yenagoa land installations require strong weatherproofing, reliable power and realistic access planning. Homes and offices should be assessed separately from boats and offshore sites, which have different equipment and safety needs.",
  L10: "Calabar and Cross River installations should account for frequent rain, coastal corrosion, trees and the condition of the mounting surface. Use suitable fixings and seal cable entries carefully.",
  M01: "A maritime project begins with the vessel's routes, operating pattern, existing communications, power, mounting options, users and safety process. Hardware and service plans should be selected only after those facts are understood.",
  M02: "A boat installation must cope with movement, vibration, saltwater exposure, cable sealing, restricted space and vessel power. It requires marine-appropriate planning rather than copying a residential roof arrangement.",
  M03: "Performance hardware is designed for demanding mobile and marine use, with installation guidance for clear sky, water resistance, cable limits and vibration. The correct choice still depends on vessel operation and the current compatible plan.",
  M04: "Offshore work in the Niger Delta depends on access approval, transport, weather, induction, safe work arrangements, power and support logistics as much as the terminal. These details should be agreed before mobilisation.",
  M05: "The operator's health, safety and environment process controls offshore access and work. Confirm required inductions, permits, certificates, personal protective equipment, rescue arrangements and responsible contacts before scheduling a crew.",
  M06: "Software-defined wide area networking, or SD-WAN, can choose between Starlink, VSAT and other links according to availability and policy. It needs compatible equipment, network expertise and testing; the terminal alone does not provide that integration.",
  M07: "Workboats need mounts that tolerate vibration and water, protected cable routes and power that remains stable during engine and generator changes. Survey the electrical and structural arrangement before choosing equipment.",
  M08: "Crew boats and offshore support vessels must balance operational traffic, crew welfare, coverage, power and remote support. Separating important systems from general passenger use helps protect daily operations.",
  M09: "A harbour office, marina workshop and vessel alongside may share a location but not the same installation requirements. Decide whether each connection is fixed on land or mobile at sea before choosing hardware, plan and cable route.",
  M10: "Before a maritime survey, provide vessel drawings or dimensions, clear photographs, operating routes, proposed mount areas, power details, access contacts and existing network information. A complete brief makes the attended survey safer and more productive.",
  N01: "The reliable way to check availability is to enter the exact service address in Starlink's official ordering or coverage tools. City-level reports and older blog posts cannot confirm what the system will offer a particular property today.",
  N02: "When Starlink changes a plan, check the effective date, affected country, data allowance, priority treatment, mobility rights and price in the official account. A similar plan name in another market may not have the same terms.",
  N03: "Starlink operates in Nigeria within the country's communications-licensing framework. Buyers should verify current operator information through the Nigerian Communications Commission and use official Starlink channels for service terms.",
  N04: "During a reported outage, confirm the official status, keep equipment powered if safe, avoid unnecessary roof work and wait for recovery before resetting everything. Continue local checks only when evidence points to your property.",
  N05: "New hardware generations can change mounting, cabling, power and router compatibility. Buyers should identify the exact model they own or plan to buy instead of assuming every accessory fits every Starlink kit.",
  N06: "Availability and Priority offers can differ by address and change with capacity. Customers in Lagos, Abuja and Port Harcourt should check the live ordering result for the exact premises rather than relying on city-wide statements.",
  N07: "As the installer market grows, buyers should look for a clear survey process, specific compatible equipment, written quotations, safe roof practice and realistic support. Marketing claims should be independently verifiable.",
  N08: "Subscription payment methods, prices and foreign-exchange effects can change. Use the payment options shown in the official Starlink account, protect account credentials and confirm the total charge before authorising it.",
  N09: "Direct to Cell connects compatible mobile phones through participating network operators; it is separate from the dish-based broadband service. Nigerian availability depends on official operator and regulatory announcements, not possession of a Starlink terminal.",
  N10: "Treat product announcements, local availability, confirmed regulation and speculation as different things. Check the publication date and primary source before making a purchase or changing an installation plan.",
  F01: "Demand is likely to grow where homes and organisations lack dependable fixed broadband, but actual adoption will depend on capacity, price, power and local purchasing conditions. This is a reasoned outlook, not a state-by-state sales forecast.",
  F02: "Nigerian maritime demand may grow as operators seek additional connectivity for operations and crew welfare. Adoption will still depend on route coverage, service plans, hardware, regulation, power and the economics of each fleet.",
  F03: "More Nigerian organisations are likely to consider satellite broadband as a second path because dependence on one fibre or mobile provider creates operational risk. Effective continuity still requires failover equipment, testing and a response plan.",
  F04: "As Starlink hardware changes, installers and buyers should expect different mounts, cables, power arrangements and router features. The sensible response is to identify each kit precisely and stock accessories for confirmed demand.",
  F05: "Customers increasingly use search results and reviews to choose connectivity providers. Businesses should publish accurate local information, request honest feedback and respond professionally instead of manufacturing reviews or location claims.",
};

const sources = {
  installation: {
    title: "Standard Kit installation guide",
    url: "https://starlink.com/public-files/installation_guide_standard_kit.pdf",
    publisher: "Starlink",
    checked: REVIEW_DATE,
  },
  obstruction: {
    title: "How to check for obstructions before installing Starlink",
    url: "https://starlink.com/fm/support/article/6ce7f901-ff51-e65c-8579-c3d87ac1a820",
    publisher: "Starlink Help Center",
    checked: REVIEW_DATE,
  },
  power: {
    title: "How much power does my Starlink need?",
    url: "https://starlink.com/support/article/18836c7e-2d97-6153-fe67-c18427bd0558",
    publisher: "Starlink Help Center",
    checked: REVIEW_DATE,
  },
  address: {
    title: "How to change a Starlink service address",
    url: "https://starlink.com/dm/support/article/e9b3304e-28ce-2fa3-6260-74cf9cb99300",
    publisher: "Starlink Help Center",
    checked: REVIEW_DATE,
  },
  mini: {
    title: "Starlink Mini specifications",
    url: "https://www.starlink.com/public-files/specification_sheet_mini.pdf",
    publisher: "Starlink",
    checked: REVIEW_DATE,
  },
  marine: {
    title: "Maritime and mobility installation guide",
    url: "https://starlink.com/support/article/b0fb3a40-83a9-2b71-f5bd-d3f2397bcfdd",
    publisher: "Starlink Help Center",
    checked: REVIEW_DATE,
  },
  maritime: {
    title: "Starlink for Maritime",
    url: "https://starlink.com/business/maritime",
    publisher: "Starlink",
    checked: REVIEW_DATE,
  },
  ncc: {
    title: "Authorised space services operators",
    url: "https://www.ncc.gov.ng/authorized-space-services-operators",
    publisher: "Nigerian Communications Commission",
    checked: REVIEW_DATE,
  },
  directToCell: {
    title: "Direct to Cell service information",
    url: "https://www.starlink.com/public-files/DIRECT_TO_CELL_SERVICE_FEB_25.pdf",
    publisher: "Starlink",
    checked: REVIEW_DATE,
  },
} satisfies Record<string, ArticleSource>;

const phraseReplacements: Array<[RegExp, string]> = [
  [/Do not inventory vapourware\.?/gi, "Buy and stock accessories only for hardware that is currently available and properly identified."],
  [/Survey quality tracks the pack you send\.?/gi, "A detailed vessel brief helps the survey team prepare properly."],
  [/Split sky, Wi-Fi and power before blaming the brand\.?/gi, "Check the dish view, local Wi-Fi and power separately so you can identify the real cause."],
  [/Maritime Starlink work is not a residential roof job with salt spray\.?/gi, "Maritime installations have additional requirements for movement, vibration, corrosion, power and safe access."],
  [/without invented certifications or coverage guarantees/gi, "with practical guidance on access, equipment and coverage checks"],
  [/without invented uptime statistics/gi, "with a practical explanation of resilience and failover"],
  [/complements? the canonical ([^.]+) page/gi, "includes practical detail for the $1 area"],
  [/linked to the canonical ([^.]+) page/gi, "with a link to the main $1 page"],
  [/companion to the canonical ([^.]+) page/gi, "with local guidance for $1"],
  [/the canonical landing remains/gi, "you can also read"],
  [/canonical URL:/gi, "For local service information, see"],
  [/The canonical page is/gi, "For local service information, see"],
  [/canonical local URL/gi, "main local information page"],
  [/canonical/gi, "main"],
  [/Cable length as an install factor — generation-correct only\.?/gi, "Learn when a longer cable is useful and why it must match your Starlink generation."],
  [/Reboots are often power events wearing a network costume\.?/gi, "Repeated restarts are often caused by unstable power rather than the satellite connection."],
  [/Many addresses, many dishes\. Not a GPS product\.?/gi, "How to organise accounts, equipment and support across several business locations."],
  [/Dust is real; heroic washing is not maintenance\.?/gi, "Safe maintenance during harmattan starts with careful inspection and official cleaning guidance."],
  [/Handover is a beginning\. This is the quiet first week\.?/gi, "A first-week checklist helps new customers understand normal operation and spot problems early."],
  [/Specs without a survey are decoration\.?/gi, "Specifications become useful only when they are matched to the actual site."],
  [/Duty cycle and environment — not status shopping\.?/gi, "Choose Performance hardware when the workload and environment genuinely require it."],
  [/not a weekend yacht gadget/gi, "and must support day-to-day vessel operations"],
  [/not a magic bridge/gi, "one connection within a wider network design"],
  [/not a price table/gi, "to help buyers choose the appropriate equipment"],
  [/not a shopping list/gi, "based on a clearly identified need"],
  [/not a second city landing/gi, "for people planning an installation in the FCT"],
  [/not a residential clone of Lagos/gi, "for Ogun's mix of estates and industrial premises"],
  [/not a copy of the location page/gi, "for homes and premises in Ibadan"],
  [/not a generic south-east template/gi, "with attention to Enugu's slopes and varied roof heights"],
  [/not a market-size study/gi, "based on stated practical assumptions"],
  [/Percentages here would be fiction\.?/gi, "Reliable Nigerian adoption percentages are not yet available for this forecast."],
  [/Blogs cannot certify your street\.?/gi, "Only Starlink's current address checker can confirm the offer for a property."],
  [/we do not freeze a plan menu that Starlink can edit tomorrow/gi, "readers should confirm current plan details in their official Starlink account"],
  [/We will not invent payment methods\.?/gi, "Use only the payment methods displayed in the official account."],
  [/This article does not invent naira amounts\./gi, "Check the current product and subscription prices before making a purchase."],
  [/no fabricated ping tables — qualitative expectations only/gi, "with practical guidance on the factors that affect latency"],
  [/without invented/gi, "without unsupported"],
  [/invented/gi, "unsupported"],
  [/without unsupported (?:Mbps or SLA numbers|naira ranges|prices|uptime statistics|certifications or coverage guarantees|coverage radii|safety certifications|reactivation fees|certificates|naira)/gi, "using current verified information"],
  [/without unsupported prices/gi, "understanding the total cost"],
  [/photographs are field-library images with their stated captions — not a promise of an identical mount at your address/gi, "every property is different, so the final mount should be chosen for your own roof and sky view"],
  [/article cluster/gi, "related guidance"],
  [/search intent/gi, "reader's question"],
  [/SEO opportunity/gi, "useful subject"],
  [/published product catalogue/gi, "product catalogue"],
  [/published catalogue/gi, "product catalogue"],
  [/published service/gi, "service"],
  [/published path/gi, "relevant service"],
  [/This article complements the main ([^.]+) service area page — it does not replace it\./gi, "For help at a specific property, share the full address and building details when you enquire."],
  [/this article is not a substitute for a qualified electrician where wiring changes are required/gi, "use a qualified electrician whenever the work requires changes to fixed wiring"],
  [/This article is not legal advice and not a licence\./gi, "Obtain current regulatory advice and any required licence before reselling connectivity."],
  [/This article does not guarantee weather windows or same-week visits in every state\./gi, "Weather windows and appointment dates are confirmed for each location when a visit is arranged."],
  [/This article will not pick a guaranteed Mbps figure\./gi, "Confirm the current performance information for the plan offered to the exact address."],
  [/This article stays on land installs\./gi, "The guidance here covers fixed installations on land."],
  [/What Skylink will not claim here/gi, "How to verify a seller"],
  [/What we will not invent/gi, "How to compare current offers"],
  [/This page does not publish fabricated speed tests, nationwide averages, or price tables\. Check current ISP and Starlink offers for your address\./gi, "Compare the current offers available at your address, including installation requirements, contract terms, expected performance and total cost."],
  [/without fabricated benchmarks/gi, "using practical decision criteria"],
  [/This article does not accuse named marketplaces or claim a regulatory “authorised partner” badge\. Ask Skylink directly if you need the current commercial relationship stated in writing\./gi, "Ask the seller to document the kit contents, condition, account status and any commercial relationship they advertise. Verify important claims before paying."],
  [/Browse published products/gi, "Browse the Skylink product catalogue"],
  [/Starlink has already shown that terminals, cables and routers change generations\. Nigerian installers should expect more of that — not a named unreleased dish from a leaked slide\./gi, "Starlink terminals, cables and routers have changed across generations. Nigerian installers and buyers should plan around confirmed products and official announcements rather than unverified leaks."],
  [/What we will not forecast/gi, "What remains uncertain"],
  [/Launch dates, prices, or “Starlink Gen X in Nigeria by Q3\.” If official hardware news lands, it belongs in a dated news brief, not this outlook\./gi, "Future launch dates, Nigerian prices and product availability remain uncertain until Starlink publishes dated information for this market."],
  [/This article does not invent naira prices or throughput guarantees\./gi, "Check current prices and performance information for the exact product and service address."],
  [/This article does not unsupported naira prices or throughput guarantees\./gi, "Check current prices and performance information for the exact product and service address."],
  [/Skylink publishes catalogue items; we do not authenticate every roadside offer\./gi, "Skylink lists its own catalogue items; independently verify the condition and account status of equipment offered by other sellers."],
  [/What we will not publish/gi, "Use current model-specific instructions"],
  [/If a product page is unpublished or out of stock, this article will not invent availability\./gi, "Confirm that the product is currently listed and available before relying on it for a project."],
  [/If a product page is unpublished or out of stock, this article will not unsupported availability\./gi, "Confirm that the product is currently listed and available before relying on it for a project."],
  [/What we will not claim/gi, "Why current results vary"],
  [/No nationwide Mbps average lives on this page\. Congestion and plan class vary by time and address\. Check Starlink’s own status and plan tools\./gi, "Performance varies by time, address, plan, local Wi-Fi and network demand. Check the official status and plan tools for current information."],
  [/We do not collect Starlink’s monthly fee on this website\./gi, "Subscription payments are made through the customer's official Starlink account."],
  [/We do not publish a list of card or naira rails we have not verified\./gi, "Use only the payment options currently displayed in the official account."],
  [/See also \[paying for Starlink\]\(([^)]+)\) for process — not an unsupported method list\./gi, "See also [paying for Starlink]($1) for a clear account-payment process."],
  [/We will not invent VLAN templates for every firewall brand\./gi, "The exact network configuration should be designed for the organisation's router, security policy and support team."],
  [/We do not publish metre coverage guarantees\. Walls and interference vary\./gi, "Wi-Fi coverage varies with wall construction, distance, interference and access-point position, so test the actual rooms that matter."],
  [/without claiming certifications we do not publish/gi, "and explains why operator requirements must be confirmed before mobilisation"],
  [/This article is not legal advice and not a licence summary\./gi, "For a legal or licensing decision, obtain current advice and consult dated NCC material."],
  [/We will not paraphrase statutes we are not qualified to interpret\./gi, "Use the linked NCC publications or qualified legal advice when interpreting regulatory duties."],
  [/As of this writing we do not sell a Skylink SIM and we will not claim nationwide Direct to Cell coverage\./gi, "A Starlink dish is not a mobile SIM, and Nigerian Direct to Cell availability requires a confirmed participating mobile operator."],
  [/What we will not do in a blog/gi, "What requires a network engineer"],
  [/Publish a single vendor CLI\. Guarantee session persistence across every cutover\. Pretend CGNAT never matters for inbound management\./gi, "Router commands, session behaviour and inbound access depend on the operator's equipment and addressing. These details require a design and test plan for the vessel's actual network."],
  [/What we will not do/gi, "Important limits"],
  [/Promise that a residential plan can legally become a neighbourhood ISP\. Promise spectrum or NCC outcomes\./gi, "A residential subscription should not be treated as permission to resell service. Confirm Starlink's current terms and all Nigerian licensing obligations before operating a local access network."],
  [/Ask for genuine Google reviews after successful jobs — see the reviews plan in project docs, once a profile exists\./gi, "Invite customers to leave honest feedback through the company's verified business profile after completed work."],
  [/Publish process, not unsupported testimonials\./gi, "Publish clear service information and only genuine customer feedback."],
  [/Buy reviews\. Fabricate Maps listings for every state\. Claim Search Console positions we have not measured\./gi, "Paid or fabricated reviews and false local listings damage customer trust and may breach platform rules. Publish only locations and customer experiences that can be verified."],
];

function cleanText(value: string): string {
  return phraseReplacements.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    value,
  );
}

function cleanBlock(block: ArticleBlock): ArticleBlock {
  if (block.type === "ul" || block.type === "ol") {
    return { ...block, items: block.items.map(cleanText) };
  }
  if (block.type === "table") {
    return {
      ...block,
      headers: block.headers.map(cleanText),
      rows: block.rows.map((row) => row.map(cleanText)),
    };
  }
  return { ...block, text: cleanText(block.text) };
}

function audienceGuidance(article: ArticleRecord): string {
  const topic = article.title.replace(/\.$/, "");
  const guidance: Record<ArticleRecord["category"], string> = {
    residential: `For the household issues covered in “${topic}”, think about the people using the connection as well as the equipment. A parent on a video call, children streaming in another room and a television behind two concrete walls experience the same installation differently. Test important rooms and plan stable power before assuming a faster package will solve a local Wi-Fi problem.`,
    equipment: `When making a purchase connected with “${topic}”, start with the exact model name shown in the Starlink app or on the equipment label. Hardware generations can use different cables, mounts, power arrangements and router features. A part that looks similar in an online photograph may still be incompatible, so confirm the product description and return terms before paying.`,
    troubleshooting: `While working through “${topic}”, change one thing at a time and note the result. If you restart, move equipment and reset settings together, you will not know which action helped. Begin with the Starlink app, then check safe and accessible power, cable and Wi-Fi points. Leave roof work and damaged outdoor equipment to a professional.`,
    business: `For a project involving “${topic}”, translate the technical decision into an operational question: which staff, payment systems, cameras or cloud services stop working if this link fails? That answer determines whether the site needs wired connections, backup power, a second internet path, separate guest access or monitoring rather than simply a larger Wi-Fi package.`,
    local: `When arranging work related to “${topic}”, remember that a city name cannot describe every property. A bungalow, rented flat, estate duplex, warehouse and riverside office in the same area can require different access, mounting, cabling and Wi-Fi work. Use the local factors here as preparation, then provide the exact address and property details for a realistic assessment.`,
    maritime: `A project involving “${topic}” should include the people responsible for vessel operations, engineering, safety and IT. A terminal that works at the jetty still needs suitable service coverage, stable vessel power, a corrosion-resistant installation, protected cabling and a support process for faults that occur away from port.`,
    news: `Information covered by “${topic}” can become outdated quickly. Check the date, follow the primary source and distinguish a global announcement from a product that is actually available for a Nigerian address. Do not spend money or alter an installation solely because a social-media post describes a future feature.`,
    forecast: `The outlook in “${topic}” is a reasoned view, not a confirmed product announcement or sales figure. The useful questions are which forces could change demand—coverage, capacity, price, regulation, power and customer needs—and what evidence would show that the expectation is becoming real.`,
  };
  return guidance[article.category];
}

const decisionQuestions: Record<ArticleRecord["category"], string[]> = {
  residential: [
    "Has the Starlink app checked the proposed dish position at the correct height?",
    "Who has authorised roof access, drilling and the cable route?",
    "Will the router reach the rooms where the household actually uses the internet?",
    "What keeps the equipment powered during an outage or generator changeover?",
  ],
  equipment: [
    "What exact Starlink model and generation will this item connect to?",
    "Which practical problem is the purchase meant to solve?",
    "Does the official specification support the intended environment and power source?",
    "Can the seller confirm completeness, condition and account-transfer requirements?",
  ],
  troubleshooting: [
    "What exact status or alert appears in the Starlink app?",
    "Did the problem begin after a power change, storm, cable movement or settings change?",
    "Does it affect every device or only one room, device or application?",
    "Can the next check be completed safely without climbing or opening powered equipment?",
  ],
  business: [
    "Which business processes must remain online and for how long?",
    "Is Starlink the primary connection, a backup or one path in a wider design?",
    "Who owns the account, network administration and fault escalation?",
    "Have power failure, congestion and provider outage scenarios been tested?",
  ],
  local: [
    "What type of property is at the exact address?",
    "Are roof, landlord, estate or facility-management approvals required?",
    "Do trees, nearby buildings, terrain or water tanks restrict the sky view?",
    "How will weather, road access and power affect installation and support?",
  ],
  maritime: [
    "Where does the vessel operate and which current Starlink plan permits that use?",
    "What mount location provides clear sky without conflicting with vessel equipment?",
    "What AC or DC power, backup and cable routes are available?",
    "Which operator permits, inductions and safety requirements apply before mobilisation?",
  ],
  news: [
    "What is the original source and publication date?",
    "Does the announcement explicitly apply to Nigeria and to the reader's product?",
    "Is it available now, in testing or only planned?",
    "What should a customer verify in the official account before acting?",
  ],
  forecast: [
    "Which statements are established facts and which are expectations?",
    "What assumptions would cause the outlook to change?",
    "Is there a dated primary source for each current fact?",
    "What practical decision, if any, is reasonable before more evidence appears?",
  ],
};

const sectionHeadings: Record<
  ArticleRecord["category"],
  { answer: string; example: string; questions: string; help: string; verify: string }
> = {
  residential: {
    answer: "What this means for your home",
    example: "A common household example",
    questions: "What to check before installation",
    help: "When to call an installer",
    verify: "Check the latest product information",
  },
  equipment: {
    answer: "The buying decision in plain language",
    example: "How this choice works in practice",
    questions: "Questions to ask before you pay",
    help: "When a compatibility check is worthwhile",
    verify: "Confirm the current specification",
  },
  troubleshooting: {
    answer: "What the problem usually means",
    example: "Work through a simple example",
    questions: "Checks to make in a safe order",
    help: "When to stop and ask for help",
    verify: "Use instructions for your exact model",
  },
  business: {
    answer: "The business decision",
    example: "What this looks like during a working day",
    questions: "Questions for the project team",
    help: "When specialist network support is justified",
    verify: "Confirm current commercial details",
  },
  local: {
    answer: "What matters at the property",
    example: "Why two nearby installations can differ",
    questions: "Details to confirm for the address",
    help: "When an attended assessment helps",
    verify: "Confirm availability for the exact location",
  },
  maritime: {
    answer: "The operational answer",
    example: "Applying this on a working vessel",
    questions: "Questions before mobilisation",
    help: "When a marine survey is required",
    verify: "Confirm plans, coverage and vessel requirements",
  },
  news: {
    answer: "What Nigerian customers should understand",
    example: "How to read the announcement carefully",
    questions: "What to verify before acting",
    help: "Where to confirm an account-specific change",
    verify: "Check the date and primary source",
  },
  forecast: {
    answer: "Our current assessment",
    example: "What evidence would make this outlook stronger",
    questions: "Questions to keep the forecast honest",
    help: "When to wait for firmer evidence",
    verify: "Revisit the assumptions as conditions change",
  },
};

function practicalExample(article: ArticleRecord): string {
  const topic = article.title.replace(/\.$/, "");
  const examples: Record<ArticleRecord["category"], string> = {
    residential: `Imagine a family applying the advice in “${topic}”. Their roof may have a clear section, but the cable enters beside an upstairs store while everyone works downstairs. Looking at sky view, cable distance, power and indoor coverage together prevents an installation that is technically online but inconvenient to use.`,
    equipment: `Consider a buyer applying “${topic}” to a real purchase. The useful comparison is not the shape of the box or the highest advertised specification. It is whether the item matches the existing kit, power source, mounting location and daily workload. Writing those requirements down makes the purchase easier to verify.`,
    troubleshooting: `For example, while applying the checks in “${topic}”, first note the app status and test a phone close to the router. If the app reports online and the nearby test works, the satellite link is probably healthy and the next check should focus on local Wi-Fi or the affected device rather than the roof.`,
    business: `A manager applying “${topic}” should map the decision to a normal working day. If internet failure stops payments, customer service and cloud access, the design needs agreed priorities and a tested backup process. If it only affects guest browsing, the response can be simpler and less expensive.`,
    local: `For the location covered in “${topic}”, two nearby properties may still need different solutions. One may have a clear concrete roof and an inverter, while the other is a rented upper-floor flat beneath a shared roof. The second property needs permission and a cable plan before an installer can treat the address as ready.`,
    maritime: `During a project based on “${topic}”, a photograph of the vessel at berth is only a starting point. The team also needs routes, operating speed, available power, proposed cable paths, nearby masts and the operator's access rules. Those details determine whether a safe and supportable installation is possible.`,
    news: `When reading the development covered in “${topic}”, compare the publication date with the live Starlink account or official support page. A global announcement may be genuine while the product, plan or partner is not yet available in Nigeria. Both facts can be true at the same time.`,
    forecast: `For the outlook in “${topic}”, watch for evidence rather than repeating confident predictions. Changes in official availability, Nigerian licensing, hardware offered at checkout and customer enquiries are stronger signals than an undated social-media graphic or a number with no published method.`,
  };
  return examples[article.category];
}

function helpGuidance(article: ArticleRecord): string {
  const topic = article.title.replace(/\.$/, "");
  const guidance: Record<ArticleRecord["category"], string> = {
    residential:
      "Professional help is worthwhile when work involves height, fragile roofing, difficult waterproofing, long external cable runs, uncertain obstructions or network coverage across several floors. Share photographs only when they can be taken safely; an attended assessment may still be necessary.",
    equipment:
      "Ask for help before buying when the model is unclear, the kit is incomplete, marine or mobile use is planned, power must be redesigned, or several products need to work together. A short compatibility check can prevent an expensive unusable purchase.",
    troubleshooting:
      "Contact Starlink through the official account for subscription, billing, platform outages and support tickets. Contact an installer for physical mounting, cable damage, water entry, unsafe roof access or network work inside the premises. Some faults require both parties, so keep app screenshots and dates.",
    business:
      "Use professional network support when failure has a financial or safety impact, several buildings or branches are involved, automatic failover is required, or staff and guest systems must be separated. Document who supports the Starlink account, the local network and third-party applications.",
    local:
      "Request an assessment when photographs cannot establish the sky view, the roof is shared or unsafe, the cable route crosses common areas, or the installation serves several buildings. Provide the full location, property type, contact person and access restrictions when enquiring.",
    maritime:
      "A marine survey is appropriate before drilling, ordering specialised hardware or mobilising offshore. The vessel operator remains responsible for access and safety requirements, while Starlink's official tools remain authoritative for plans and coverage. Network integration may also require the operator's IT contractor.",
    news:
      "If an announcement affects an existing subscription or a planned purchase, confirm it in the official account or with Starlink support before acting. Regulatory questions should be checked against dated NCC material. Skylink can explain installation implications but cannot amend Starlink's commercial terms.",
    forecast:
      "Forecasts should guide questions, not trigger irreversible spending. Obtain current product, coverage, regulatory and commercial confirmation before committing. Revisit the evidence when conditions change rather than treating this article's review date as a permanent guarantee.",
  };
  return `For questions about “${topic}”, ${guidance[article.category].replace(/^./, (letter) => letter.toLowerCase())}`;
}

function sourcesFor(article: ArticleRecord): ArticleSource[] {
  if (article.researchId === "N03") return [sources.ncc, sources.installation];
  if (article.researchId === "N09") return [sources.directToCell, sources.ncc];
  if (article.category === "maritime" || article.researchId === "F02") {
    return [sources.marine, sources.maritime, sources.ncc];
  }
  if (/power|generator|inverter|reboot/i.test(`${article.title} ${article.primaryKeyword}`)) {
    return [sources.power, sources.installation];
  }
  if (/mini|hardware|equipment|kit|accessor|cable|mount|router/i.test(`${article.title} ${article.primaryKeyword}`)) {
    return [sources.installation, sources.mini, sources.power];
  }
  if (/relocat|address|availability|plan|roaming|payment|account/i.test(`${article.title} ${article.primaryKeyword}`)) {
    return [sources.address, sources.installation, sources.ncc];
  }
  return [sources.installation, sources.obstruction, sources.power];
}

function editorialBlocks(article: ArticleRecord): ArticleBlock[] {
  const answer = plainAnswers[article.researchId];
  if (!answer) throw new Error(`Missing editorial answer for ${article.researchId}`);

  const cleaned = article.blocks.map(cleanBlock);
  const headings = sectionHeadings[article.category];
  const firstParagraph = cleaned[0]?.type === "p" ? cleaned[0] : null;
  const remaining = firstParagraph ? cleaned.slice(1) : cleaned;

  return [
    ...(firstParagraph ? [firstParagraph] : []),
    h2(headings.answer),
    p(answer),
    p(audienceGuidance(article)),
    ...remaining,
    h2(headings.example),
    p(practicalExample(article)),
    h2(headings.questions),
    ul(...decisionQuestions[article.category]),
    h2(headings.help),
    p(helpGuidance(article)),
    h2(headings.verify),
    p(
      `Details covered by “${article.title}” can change, including hardware, plan names, prices, availability and support instructions. Use the dated official references below to confirm current information for your exact kit, account and location. When asking for help, include the hardware model and a screenshot of the current app message where possible. Skylink can help with installation and local network planning, while Starlink controls its accounts, subscriptions and live service offers.`,
    ),
    p(
      `Keep a simple record when acting on “${article.title}”: note the date, equipment model, account offer and any measurements or photographs used. Add the name of the person who approved the work and keep relevant receipts or support references with the record. If several people use or manage the system, make sure at least one other responsible person knows where the account details, Wi-Fi information and safe shutdown instructions are kept. This is especially useful after a move, equipment replacement, storm or plan change. It gives Starlink support or an installer a clearer starting point and reduces the chance of repeating checks that have already been completed.`,
    ),
  ];
}

function ctaDescription(article: ArticleRecord): string {
  const descriptions: Record<ArticleRecord["category"], string> = {
    residential: "Describe your property, roof access and power arrangement if you would like help planning the installation.",
    equipment: "Tell us which Starlink model you own and how you intend to use it so we can discuss compatible equipment.",
    troubleshooting: "Share the exact app status, hardware model and checks already completed if you still need technical help.",
    business: "Outline the site, users and business systems that depend on the connection so we can discuss a suitable design.",
    local: "Send the full location, property type and access details if you need an installation assessment.",
    maritime: "Provide the vessel type, operating area, power and access contacts to begin a maritime connectivity discussion.",
    news: "Ask about the practical installation implications if this development affects your current plans.",
    forecast: "Discuss your confirmed present requirements before making a purchase based on a future market outlook.",
  };
  return descriptions[article.category];
}

export function applyEditorialReview(article: ArticleRecord): ArticleRecord {
  const answer = plainAnswers[article.researchId];
  if (!answer) throw new Error(`Missing editorial review for ${article.researchId}`);
  const reviewedTitle = titleOverrides[article.researchId] ?? cleanText(article.title);
  const reviewedArticle = { ...article, title: reviewedTitle };

  return {
    ...article,
    title: reviewedTitle,
    seoTitle: seoTitleOverrides[article.researchId] ?? cleanText(article.seoTitle),
    seoDescription: cleanText(article.seoDescription),
    excerpt: answer,
    updated: REVIEW_DATE,
    heroImageAlt: cleanText(article.heroImageAlt ?? article.title),
    blocks: editorialBlocks(reviewedArticle),
    sources: sourcesFor(reviewedArticle),
    relatedServicePaths: article.relatedServicePaths.map((link) => ({
      ...link,
      label: cleanText(link.label),
    })),
    cta: {
      ...article.cta,
      heading: cleanText(article.cta.heading),
      description: ctaDescription(reviewedArticle),
      label: cleanText(article.cta.label),
    },
  };
}
