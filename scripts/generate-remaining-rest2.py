#!/usr/bin/env python3
"""Business, local, maritime, news, forecast articles + dump all."""
import importlib.util
from pathlib import Path

_HERE = Path(__file__).resolve().parent

def _load(name: str, file: str):
    spec = importlib.util.spec_from_file_location(name, _HERE / file)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod

_r = _load("gen_rest", "generate-remaining-rest.py")
EXPORTS = _r.EXPORTS
IMG_ACC = _r.IMG_ACC
IMG_BOAT = _r.IMG_BOAT
IMG_BP = _r.IMG_BP
IMG_BIZ = _r.IMG_BIZ
IMG_ENT = _r.IMG_ENT
IMG_EST = _r.IMG_EST
IMG_FLT = _r.IMG_FLT
IMG_HP = _r.IMG_HP
IMG_HSE = _r.IMG_HSE
IMG_HUB = _r.IMG_HUB
IMG_LR = _r.IMG_LR
IMG_MAR = _r.IMG_MAR
IMG_REL = _r.IMG_REL
IMG_R = _r.IMG_R
IMG_R3 = _r.IMG_R3
IMG_R4 = _r.IMG_R4
IMG_SAL = _r.IMG_SAL
IMG_SD = _r.IMG_SD
IMG_WF = _r.IMG_WF
IMG_WISP = _r.IMG_WISP
P, H2, UL, OL, T, N = _r.P, _r.H2, _r.UL, _r.OL, _r.T, _r.N
add = _r.add
articles_by_file = _r.articles_by_file
dump = _r.dump

# BUSINESS remaining B03-B14
add("articles-business.ts", researchId="B03",
    title="Enterprise Starlink plan considerations for Nigerian sites",
    seoTitle="Starlink enterprise and Priority plans for Nigerian sites | Skylink",
    seoDescription="How Nigerian enterprises should think about Starlink plan classes, Priority notes and hardware — without invented Mbps or SLA numbers.",
    excerpt="Plan class is Starlink’s product. Installation is Skylink’s conversation.",
    category="business", primaryKeyword="starlink enterprise nigeria",
    hero=IMG_ENT, alt="Enterprise Starlink connectivity context",
    relatedServicePaths=[("/services/enterprise-plans", "Enterprise plans"), ("/services/priority-plans", "Priority plans"), ("/contact", "Contact")],
    relatedIds=["B12", "N06", "E15", "B01"],
    cta=("Enterprise site?", "Describe address, concurrent use and whether Starlink is primary or backup.", "/contact?intent=quote", "Request a discussion"),
    blocks=[
        P("“Enterprise Starlink” in Nigerian sales talk can mean a higher-capacity plan, a Priority offer on a capacitated address, or simply a business that wants a professional mount. Those are not the same thing."),
        N("Skylink’s enterprise and Priority service pages record conflicting public speed wordings in source material. This article will not pick a guaranteed Mbps figure. Check current offers in Starlink’s checkout for the exact address."),
        H2("Questions that actually matter"),
        UL("What does the official checkout show for this service address?", "Is the kit residential-class or a higher-duty terminal?", "Is this primary WAN or backup?", "Who will manage Wi‑Fi after the dish is up?"),
        H2("Priority is per address"),
        P("Some city addresses are offered Priority rather than a new residential signup. That is not a rule for every street in Lagos, Abuja or Port Harcourt. See [capacity notes](/blog/starlink-priority-lagos-abuja-port-harcourt)."),
        H2("Skylink’s role"),
        P("We help you interpret what the address is offered and how to mount and network it. We do not resell Starlink’s monthly plan as our own product table."),
    ])

add("articles-business.ts", researchId="B04",
    title="Whole-premises Wi-Fi design with Starlink backhaul",
    seoTitle="Whole-premises Wi-Fi with Starlink in Nigeria | Skylink",
    seoDescription="Designing office and building Wi-Fi when Starlink is the uplink: placement, wired backhaul, guest networks — not a single parlour router.",
    excerpt="The dish is the WAN. Premises Wi-Fi is a separate design.",
    category="business", primaryKeyword="starlink whole premises wifi nigeria",
    hero=IMG_WF, alt="Indoor networking equipment context for Starlink Wi-Fi planning",
    relatedServicePaths=[("/services/wifi-networking", "Wi-Fi networking"), ("/services/business-connectivity", "Business connectivity"), ("/contact", "Contact")],
    relatedIds=["B01", "E09", "B11", "R13"],
    cta=("Several floors to cover?", "Bring a simple floor sketch or photo of the comms room.", "/contact?intent=quote", "Discuss Wi-Fi design"),
    blocks=[
        P("An office that puts the Starlink router on a secretary’s desk and hopes the warehouse hears it will spend a month arguing about “slow Starlink.” Whole-premises design starts from where people stand, not where the cable entered."),
        H2("Building blocks"),
        UL("A sensible WAN handoff from the kit.", "A central switch if you have more than one access point.", "Guest versus staff separation if that matters.", "Power that stays up with the office UPS plan."),
        H2("What this is not"),
        P("It is not [estate Wi‑Fi](/blog/starlink-estate-wifi-nigeria) across many dwellings, and not a WISP. It is one organisation’s building."),
        H2("Skylink service"),
        P("[Wi‑Fi networking](/services/wifi-networking) is the published path. We will not invent VLAN templates for every firewall brand."),
    ])

add("articles-business.ts", researchId="B05",
    title="Estate and multi-building Starlink Wi-Fi in Nigeria",
    seoTitle="Estate and multi-building Starlink Wi-Fi in Nigeria | Skylink",
    seoDescription="How Nigerian estates and multi-building sites differ from a single home Starlink install, and what Skylink’s estate Wi-Fi service is for.",
    excerpt="Sharing a kit across dwellings is a design and policy problem.",
    category="business", primaryKeyword="starlink estate wifi nigeria",
    hero=IMG_EST, alt="Estate-scale wireless networking context",
    relatedServicePaths=[("/services/estate-wifi", "Estate Wi-Fi"), ("/services/long-range-wifi", "Long-range Wi-Fi"), ("/contact", "Contact")],
    relatedIds=["E10", "B06", "R13"],
    cta=("Estate or multiple buildings?", "Describe how many dwellings and who pays the Starlink account.", "/contact?intent=quote", "Discuss estate Wi-Fi"),
    blocks=[
        P("Gated estates sometimes want one dish and Wi‑Fi at every house. That is not a bigger mesh node. It is coverage design, acceptable use, and a clear answer to who owns the Starlink account when someone torrents all night."),
        H2("Technical pieces"),
        P("Uplink at a clear roof; distribution via [long-range](/services/long-range-wifi) or structured cabling; access points per building as needed."),
        H2("Non-technical pieces"),
        UL("Who is the subscriber?", "Is resale involved? If yes, that is a regulatory question for the operator — not legal advice from this page.", "How is abuse handled?"),
        H2("Related"),
        P("[WISP-style notes](/blog/starlink-wisp-nigeria) if the intent is to operate a small access network. [Estate Wi‑Fi](/services/estate-wifi) is Skylink’s published service for this conversation."),
    ])

add("articles-business.ts", researchId="B06",
    title="WISP-style distribution from a Starlink uplink in Nigeria",
    seoTitle="Starlink as a WISP uplink in Nigeria — planning notes | Skylink",
    seoDescription="High-level planning for WISP-style Wi-Fi from a Starlink uplink in Nigeria. Not legal advice; regulatory permission is the operator’s responsibility.",
    excerpt="A published Skylink service conversation with a hard regulatory boundary.",
    category="business", primaryKeyword="starlink wisp nigeria",
    hero=IMG_WISP, alt="WISP and wireless distribution equipment context",
    relatedServicePaths=[("/services/wisp-setup", "WISP setup"), ("/services/long-range-wifi", "Long-range Wi-Fi"), ("/contact", "Contact")],
    relatedIds=["B05", "E10"],
    cta=("Considering a small access network?", "We can discuss RF and mounting. Licensing is yours to confirm.", "/contact?intent=quote", "Discuss WISP setup"),
    blocks=[
        P("Some Nigerian operators want to share a Starlink uplink across a street or campus as a small wireless ISP pattern. Skylink publishes a [WISP setup](/services/wisp-setup) service for the technical conversation."),
        N("This article is not legal advice and not a licence. Whether you may resell connectivity in Nigeria is a regulatory question you must confirm with the appropriate authorities. Starlink’s own acceptable-use and reseller rules also apply — read them at source."),
        H2("Technical topics we can discuss"),
        UL("Uplink mount and power.", "Backhaul radios and line of sight.", "Not overselling a single plan to an unbounded user count."),
        H2("What we will not do"),
        P("Promise that a residential plan can legally become a neighbourhood ISP. Promise spectrum or NCC outcomes."),
    ])

add("articles-business.ts", researchId="B07",
    title="Starlink for hotels, guest houses and SMEs in Nigeria",
    seoTitle="Starlink for hotels, guest houses and SMEs in Nigeria | Skylink",
    seoDescription="Connectivity planning for Nigerian hotels, guest houses and small businesses using Starlink: guest Wi-Fi, power and landlord access.",
    excerpt="Hospitality is a Wi-Fi and power problem with a satellite WAN.",
    category="business", primaryKeyword="starlink hotel nigeria",
    hero=IMG_BIZ, alt="Illustrative commercial Starlink installation environment",
    relatedServicePaths=[("/services/business-connectivity", "Business connectivity"), ("/services/wifi-networking", "Wi-Fi networking"), ("/contact", "Contact")],
    relatedIds=["B01", "B04", "B11"],
    cta=("Hotel or SME site?", "Estimate peak guest devices and describe roof access.", "/contact?intent=quote", "Request a quote"),
    blocks=[
        P("Guest houses and small hotels fail on Wi‑Fi long before they fail on “satellite.” A Starlink dish on a nice fascia still leaves rooms dark if the only access point is at reception."),
        H2("Hospitality-specific checks"),
        UL("Landlord or brand-manager approval for rooftop gear.", "Guest versus operations networks.", "Night generator cycles.", "Peak check-in device counts — qualitative, not a promised client number."),
        H2("SMEs (shops, clinics, small offices)"),
        P("POS and record-keeping need the router on protected power. See [POS/CCTV networking](/blog/starlink-pos-cctv-business-nigeria)."),
        H2("Service path"),
        P("[Business connectivity](/services/business-connectivity) plus Wi‑Fi design when the building is more than one room."),
    ])

add("articles-business.ts", researchId="B08",
    title="Starlink for schools and institutional campuses in Nigeria",
    seoTitle="Starlink for schools and campuses in Nigeria | Skylink",
    seoDescription="Treat Nigerian school and campus Starlink as an enterprise site: access, multi-building Wi-Fi and power — not a consumer dish in a staff room.",
    excerpt="Education is a site type. Skylink scopes it as connectivity work, not an education product.",
    category="business", primaryKeyword="starlink school nigeria",
    hero=IMG_ENT, alt="Enterprise Starlink connectivity context",
    relatedServicePaths=[("/services/enterprise-plans", "Enterprise plans"), ("/services/wifi-networking", "Wi-Fi networking"), ("/contact", "Contact")],
    relatedIds=["B04", "B03", "B05"],
    cta=("Campus or school site?", "Describe buildings that need coverage and who controls the roof.", "/contact?intent=quote", "Discuss a campus site"),
    blocks=[
        P("Schools and training centres ask for Starlink when fibre never arrives. The mistake is buying a home kit, putting it in the ICT lab, and expecting the far classroom block to stream video."),
        H2("Treat it as a campus"),
        UL("Survey sky view on a building you can access legally.", "Plan Wi‑Fi per block.", "Put the network on power that survives school-day generator use.", "Decide whose Starlink account it is when term ends."),
        H2("What Skylink is not claiming"),
        P("We are not an ed-tech vendor and we do not guarantee exam-day bandwidth. [Enterprise](/services/enterprise-plans) and [Wi‑Fi networking](/services/wifi-networking) are the honest service labels."),
    ])

add("articles-business.ts", researchId="B09",
    title="Monitoring Starlink across multi-site Nigerian businesses",
    seoTitle="Multi-site Starlink for Nigerian businesses | Skylink",
    seoDescription="How Nigerian organisations should think about several Starlink sites: per-site mounts, accounts and Skylink’s fleet-management service — not vehicle tracking.",
    excerpt="Many addresses, many dishes. Not a GPS product.",
    category="business", primaryKeyword="starlink multi site nigeria",
    hero=IMG_FLT, alt="Fleet and multi-site connectivity operations context",
    relatedServicePaths=[("/services/fleet-management", "Fleet management"), ("/services/enterprise-plans", "Enterprise plans"), ("/contact", "Contact")],
    relatedIds=["B03", "M08", "B10"],
    cta=("Several sites or vessels?", "List locations; each still needs its own sky-view and power check.", "/contact?intent=quote", "Discuss multi-site work"),
    blocks=[
        P("A retailer with five branches does not have “one Starlink.” It has five roofs, five power stories and possibly five Starlink accounts. Skylink’s [fleet management](/services/fleet-management) page is about coordinating those connectivity sites — not tracking trucks on a map."),
        H2("What to standardise"),
        UL("Mount quality and photos after handover.", "Who holds account logins.", "A simple outage playbook (local vs wider)."),
        H2("What stays local"),
        P("Trees in Enugu are not the same as a Lekki rooftop plant room. Each site still gets a survey."),
    ])

add("articles-business.ts", researchId="B10",
    title="Starlink for construction camps and temporary project sites",
    seoTitle="Starlink for Nigerian construction camps and project sites | Skylink",
    seoDescription="Temporary Starlink for Nigerian construction offices: mounts, Mini vs Standard, power and theft — distinct from a permanent home install.",
    excerpt="Project internet has a start date, a generator and a lockable cabin.",
    category="business", primaryKeyword="starlink construction site nigeria",
    hero=IMG_BIZ, alt="Illustrative commercial Starlink installation environment",
    relatedServicePaths=[("/services/business-connectivity", "Business connectivity"), ("/services/backup-power", "Backup power"), ("/products/starlink-mini", "Starlink Mini"), ("/contact", "Contact")],
    relatedIds=["E13", "R15", "B01"],
    cta=("Site office coming up?", "Share duration, cabin type and power.", "/contact?intent=quote", "Enquire"),
    blocks=[
        P("Construction connectivity is temporary until it is not. A six-week survey camp and a two-year road project should not get the same mount. Power and theft dominate both."),
        H2("Kit choice"),
        P("Mini-class gear helps when the cabin will move. A Standard-class dish on a proper pole is better when the office will sit through two rainy seasons. See [temporary equipment](/blog/starlink-temporary-sites-events-nigeria)."),
        H2("Power and security"),
        UL("Generator-only evenings.", "Lockable router location.", "Cable in conduit, not across laterite."),
        H2("Handover to the client"),
        P("When the contractor leaves, the kit either relocates or becomes the owner’s problem. Plan that on day one."),
    ])

add("articles-business.ts", researchId="B11",
    title="Security camera and POS networks on Starlink",
    seoTitle="POS and CCTV networks on Starlink in Nigeria | Skylink",
    seoDescription="Keep Nigerian POS and CCTV traffic working on a Starlink-backed network: power, wiring and separation — Skylink stays the connectivity installer.",
    excerpt="Tills and cameras need clean power and a designed LAN.",
    category="business", primaryKeyword="starlink pos cctv business nigeria",
    hero=IMG_BIZ, alt="Illustrative commercial Starlink installation environment",
    relatedServicePaths=[("/services/business-connectivity", "Business connectivity"), ("/services/wifi-networking", "Wi-Fi networking"), ("/contact", "Contact")],
    relatedIds=["T10", "B07", "B01"],
    cta=("Shop or branch network?", "Say whether POS, cameras, or both must stay up in a power cut.", "/contact?intent=quote", "Discuss a shop network"),
    blocks=[
        P("Some Nigerian vendors bundle Starlink with CCTV and POS as one “tech package.” Skylink’s published scope is connectivity. Cameras and tills are yours (or your other contractors’). The network they share still has to be designed."),
        H2("POS"),
        P("Put payment terminals on the most reliable power and, where possible, a wired or dedicated SSID so a guest phone cannot knock them off."),
        H2("CCTV"),
        P("Remote viewing across Starlink may involve extra networking (VPNs, vendor clouds). We will not pretend every camera brand loves consumer NAT."),
        H2("Power"),
        P("A generator that kills the NVR every changeover is not a Starlink fault."),
    ])

add("articles-business.ts", researchId="B12",
    title="SLA expectations — what Starlink businesses should plan for",
    seoTitle="Starlink business reliability expectations in Nigeria | Skylink",
    seoDescription="What Nigerian businesses should assume about Starlink uptime and support boundaries — no invented SLA percentages.",
    excerpt="Plan for a best-effort satellite path plus a professional mount.",
    category="business", primaryKeyword="starlink business sla nigeria",
    hero=IMG_ENT, alt="Enterprise Starlink connectivity context",
    relatedServicePaths=[("/services/enterprise-plans", "Enterprise plans"), ("/services/business-connectivity", "Business connectivity"), ("/faq", "FAQ"), ("/contact", "Contact")],
    relatedIds=["B02", "B03", "F03"],
    cta=("Need a backup path designed?", "Describe the primary link and critical apps.", "/contact?intent=quote", "Discuss failover"),
    blocks=[
        P("Businesses ask for an SLA. Starlink’s consumer and business terms live on Starlink’s site and change. Skylink can install well; we cannot honestly print a 99.x% figure we do not contractually offer on this website."),
        H2("What you can plan"),
        UL("A competent mount and power path (our job when hired).", "A second WAN if the business cannot tolerate a satellite or fibre cut ([backup article](/blog/starlink-backup-fibre-business-nigeria)).", "Internal playbooks for local vs network faults."),
        H2("What you should not plan"),
        P("Uninterrupted video calls during a confirmed network incident. Identical latency to metro fibre. Skylink paying Starlink’s invoices."),
        H2("Read Starlink’s terms"),
        P("Plan-class documentation on starlink.com is the source for service descriptions. We will not paraphrase them into a fake contract."),
    ])

add("articles-business.ts", researchId="B13",
    title="Global roaming and Priority options for Nigerian organisations",
    seoTitle="Starlink Roam and Global Priority for Nigerian organisations | Skylink",
    seoDescription="How Nigerian organisations should treat Starlink roam and Global Priority classes versus a fixed service address — confirm current rules officially.",
    excerpt="Travel plans and home plans are different products.",
    category="business", primaryKeyword="starlink roam nigeria business",
    hero=IMG_SAL, alt="Starlink sales and installation equipment context",
    relatedServicePaths=[("/services/global-roaming", "Global roaming"), ("/services/roaming-global-priority", "Roaming Global Priority"), ("/contact", "Contact")],
    relatedIds=["E13", "N02", "M01"],
    cta=("Kit must travel?", "Describe countries or routes at a high level; eligibility is Starlink’s.", "/contact?intent=quote", "Discuss roaming classes"),
    blocks=[
        P("Organisations with travelling staff, vessels or short projects often need a different Starlink plan class than a house in Magodo. Roam, regional and priority-style products are defined by Starlink and shown in the official checkout — not by a blog table."),
        H2("Fixed address first"),
        P("If the kit will never leave a Nigerian roof, a travel plan may be the wrong purchase. Confirm in the app."),
        H2("When movement is real"),
        P("Skylink’s [global roaming](/services/global-roaming) and [roaming Global Priority](/services/roaming-global-priority) pages exist because those product classes are distinct. We help with hardware and install implications; Starlink sets geography rules."),
        N("Do not assume a residential plan will work on a ship or across a border."),
    ])

add("articles-business.ts", researchId="B14",
    title="Quote factors for commercial Starlink installation in Nigeria",
    seoTitle="What affects a commercial Starlink installation quote in Nigeria | Skylink",
    seoDescription="The factors that change a Nigerian commercial Starlink installation quotation — access, mount, cabling, power, networking — without invented naira ranges.",
    excerpt="A cost-factor article, not a price list.",
    category="business", primaryKeyword="starlink business installation cost nigeria",
    hero=IMG_BIZ, alt="Illustrative commercial Starlink installation environment",
    relatedServicePaths=[("/contact", "Contact"), ("/services/business-connectivity", "Business connectivity"), ("/services/enterprise-plans", "Enterprise plans"), ("/our-work", "Installation examples")],
    relatedIds=["R20", "B01", "R11"],
    cta=("Request a scoped quote", "Send site type, photos if safe, and whether hardware is already owned.", "/contact?intent=quote", "Request a quote"),
    blocks=[
        P("Commercial buyers want a number. Honest installers want a site. Nigerian commercial Starlink quotations move with access, height, cable length, power work and whether Wi‑Fi is in scope — not with a single national “business install fee” on this page."),
        N("Skylink does not publish a naira installation table here. Hardware catalogue prices, when available, live on product pages. Starlink subscriptions are billed by Starlink."),
        H2("Factors we actually use"),
        UL("Roof or compound access and permissions.", "Need for poles, scaffolding or extra hands.", "Cable length and generation.", "Backup power or UPS integration.", "Premises Wi‑Fi versus dish-only.", "Travel and scheduling to the confirmed service area."),
        H2("How to get a quote"),
        P("Use [Contact](/contact) with the site story. [Our Work](/our-work) shows field-library context, not a promise of identical cost."),
    ])

# LOCAL L02, L04-L10
def local_article(rid, title, seoTitle, seoDescription, excerpt, kw, loc_path, loc_label, loc_name, angle_blocks, related, extra_services=None):
    svcs = [(loc_path, loc_label), ("/services/residential-installation", "Residential installation"), ("/contact?intent=quote&location=" + loc_name.replace(" ", "%20"), f"{loc_name} quote")]
    if extra_services:
        svcs[1:1] = extra_services
    add("articles-local.ts", researchId=rid, title=title, seoTitle=seoTitle, seoDescription=seoDescription,
        excerpt=excerpt, category="local", primaryKeyword=kw, hero=IMG_R4, alt="Professional Starlink installation context on a building exterior",
        relatedServicePaths=svcs, relatedIds=related,
        cta=(f"Planning an install in {loc_name}?", f"This article complements the canonical {loc_label} page — it does not replace it.", f"/contact?intent=quote&location={loc_name}", f"Request a {loc_name} quote"),
        blocks=angle_blocks)

local_article(
    "L02",
    "Planning Starlink installs across Abuja districts and estates",
    "Starlink for Abuja estates and districts | Skylink",
    "Abuja-specific Starlink planning: estate rules, terrain, harmattan and satellite towns — linked to the canonical Abuja location page.",
    "Estate-and-district depth for FCT installs, not a second city landing.",
    "starlink installation abuja estates",
    "/starlink-installation-abuja", "Abuja service area", "Abuja",
    [
        P("Abuja’s planned districts, gated estates and fast-growing satellite towns do not share one roof language. This article is an estate-planning companion. The canonical landing remains [Starlink installation in Abuja](/starlink-installation-abuja)."),
        H2("Estate rules"),
        P("Maitama, Asokoro, Wuse, Jabi and Gwarinpa associations often care about visible rooftop gear. Get written positions before drilling — same discipline as [apartment approvals](/blog/starlink-apartment-estate-approval-nigeria)."),
        H2("Terrain"),
        P("Rocky ground and neighbouring higher plots block low wall mounts. A ground-floor bracket that “faces the road” can still fail sky view."),
        H2("Harmattan and storms"),
        P("Dust and seasonal storms belong in the maintenance conversation. See [harmattan care](/blog/starlink-harmattan-dust-maintenance-nigeria)."),
        H2("Satellite towns"),
        P("Lugbe, Kubwa and similar growth areas may look like open estates but still have access and power constraints. Attendance is confirmed per enquiry, not assumed same-day across the FCT."),
        N("No invented Abuja office address. Coverage is a service-area discussion."),
    ],
    ["L01", "R03", "R09"],
)

local_article(
    "L04",
    "Ibadan and Oyo State home Starlink installation notes",
    "Starlink installation notes for Ibadan and Oyo State | Skylink",
    "Ibadan-specific Starlink planning: sprawling compounds, trees, ridges and campus-adjacent homes, linking to the canonical Ibadan page.",
    "Home-install depth for Ibadan — not a copy of the location page.",
    "starlink installation ibadan",
    "/starlink-installation-ibadan", "Ibadan service area", "Ibadan",
    [
        P("Ibadan’s mix of old core, university belts and expanding estates means trees and ridges do as much damage as “no fibre.” Use this with the [Ibadan location page](/starlink-installation-ibadan), which stays the canonical local URL."),
        H2("Compounds and trees"),
        P("Mature trees in walled compounds block low mounts. Wet-season leaf-out is part of the survey, not an afterthought."),
        H2("Hills"),
        P("A neighbour on a ridge can sit in your sky. Pole height is a design choice, not vanity."),
        H2("Power"),
        P("Plan the router for generator/inverter reality like any large Nigerian city."),
        H2("Scope"),
        P("Ibadan is the published Oyo focus. Other towns are discussed per enquiry."),
    ],
    ["R05", "R15", "R01"],
)

local_article(
    "L05",
    "Ogun State industrial and estate Starlink connectivity",
    "Starlink for Ogun industrial corridors and estates | Skylink",
    "Ogun-focused Starlink planning for warehouses, factory yards and Lagos-fringe estates — companion to the canonical Ogun page.",
    "Industrial and estate angle, not a residential clone of Lagos.",
    "starlink installation ogun state",
    "/starlink-installation-ogun", "Ogun service area", "Ogun",
    [
        P("Ogun sits on logistics corridors and Lagos overspill estates. A factory roof in Sango-Ota is not an Abeokuta bungalow. The canonical page is [Ogun installation](/starlink-installation-ogun)."),
        H2("Industrial yards"),
        P("Wide metal roofs, wind, cable entry into offices, and lightning-aware routing matter as much as sky. This is closer to [business connectivity](/services/business-connectivity) than a home checklist."),
        H2("Lagos-fringe estates"),
        P("Estate rules can look like Lagos even when the address is Ogun. Do not skip permissions."),
        H2("Travel and gates"),
        P("Crew timing follows traffic and industrial security posts. A webpage is not a same-day pass."),
    ],
    ["B01", "B10", "L01"],
    extra_services=[("/services/business-connectivity", "Business connectivity")],
)

local_article(
    "L06",
    "Benin City / Edo State Starlink installation guide",
    "Starlink installation in Benin City and Edo State | Skylink",
    "Benin City Starlink planning: residential compounds, rain sealing and how this article sits beside the canonical Edo/Benin page.",
    "Local prep notes for Benin City homes and small sites.",
    "starlink installation benin city",
    "/starlink-installation-benin-city", "Benin City service area", "Benin City",
    [
        P("Benin City installs are mostly compound and small-commercial jobs with serious rain. This guide does not replace [Benin City / Edo](/starlink-installation-benin-city)."),
        H2("Rain and sealing"),
        P("Treat cable glands as first-class work. See [rainy season notes](/blog/starlink-rainy-season-harmattan-nigeria)."),
        H2("Compounds"),
        P("Trees and water tanks repeat the national obstruction story. Survey the actual mount."),
        H2("Enquiry"),
        P("Name the area of the city and whether the job is home or shop. Scheduling is per enquiry."),
    ],
    ["R09", "R01", "R04"],
)

local_article(
    "L07",
    "Owerri and Imo State Starlink service planning",
    "Starlink installation planning for Owerri and Imo State | Skylink",
    "Owerri-focused Starlink notes: rain, concrete roofs, commercial roads — companion to the canonical Owerri page.",
    "Imo planning depth with Owerri as published focus.",
    "starlink installation owerri",
    "/starlink-installation-owerri", "Owerri service area", "Owerri",
    [
        P("Owerri’s residential duplexes and busy commercial roads share heavy seasonal rain. Pair this article with [Owerri / Imo](/starlink-installation-owerri)."),
        H2("Roofs"),
        P("Flat concrete often allows a pole if the owner agrees. Trees still win low wall mounts."),
        H2("Power"),
        P("Generator/inverter planning belongs in the first call."),
        H2("Focus town"),
        P("Owerri is the published Imo focus. Other towns are not assumed on the same visit clock."),
    ],
    ["R04", "R10", "L08"],
)

local_article(
    "L08",
    "Enugu Starlink installs on hilly terrain",
    "Starlink on Enugu’s hills and escarpment | Skylink",
    "Terrain-first Starlink planning for Enugu: slopes, neighbouring roofs and runoff — linked to the canonical Enugu location page.",
    "A hill-and-slope article, not a generic south-east template.",
    "starlink installation enugu",
    "/starlink-installation-enugu", "Enugu service area", "Enugu",
    [
        P("Enugu’s escarpment and ridges change what a dish can see from one street to the next. This is the differentiator versus a flat-city guide. Canonical URL: [Enugu installation](/starlink-installation-enugu)."),
        H2("Sky view on slopes"),
        P("A downhill neighbour may be irrelevant; an uphill roof can fill the sky. Check the mount, not the gate."),
        H2("Runoff"),
        P("Cable routes on sloped concrete need sealing and sensible paths so rain does not follow the lead indoors."),
        H2("Institutions"),
        P("Schools and offices in the city may need longer internal runs — campus thinking from [schools article](/blog/starlink-schools-campuses-nigeria) if relevant."),
    ],
    ["R05", "R04", "L07"],
)

local_article(
    "L09",
    "Yenagoa / Bayelsa Starlink connectivity for homes and sites",
    "Starlink in Yenagoa and Bayelsa State | Skylink",
    "Bayelsa/Yenagoa Starlink planning: rain, access and careful maritime adjacency — companion to the canonical Yenagoa page.",
    "Homes and sites in Yenagoa; vessels are a different scope.",
    "starlink installation yenagoa",
    "/starlink-installation-yenagoa", "Yenagoa service area", "Yenagoa",
    [
        P("Yenagoa combines residential compounds with oil-and-gas adjacent economic life. This article stays on land installs. Canonical: [Yenagoa / Bayelsa](/starlink-installation-yenagoa)."),
        H2("Rain and access"),
        P("Weather windows and road access affect scheduling. Do not read a webpage as an offshore ticket."),
        H2("If the need is a vessel"),
        P("Stop and use [maritime](/services/maritime-offshore) or [boat installation](/services/boat-installation). Mixing a house quote with an OSV is how scopes explode."),
        H2("Homes"),
        P("Same national checklist: sky, permission, power, cable."),
    ],
    ["M04", "M01", "R01"],
    extra_services=[("/services/maritime-offshore", "Maritime and offshore")],
)

local_article(
    "L10",
    "Calabar / Cross River Starlink installation considerations",
    "Starlink in Calabar and Cross River State | Skylink",
    "Calabar-focused Starlink planning: coastal corrosion, rain and estate homes — linked to the canonical Cross River page.",
    "Coastal land installs; Calabar is the published focus.",
    "starlink installation calabar",
    "/starlink-installation-cross-river", "Cross River service area", "Calabar",
    [
        P("Calabar’s coastal air and rainfall punish weak fixings. This companion article does not replace [Cross River / Calabar](/starlink-installation-cross-river)."),
        H2("Corrosion"),
        P("Specify corrosion-aware brackets and sealed entries. The same logic appears in maritime work, but this page is for land."),
        H2("Rain"),
        P("Treat glands and drip loops as mandatory, not decorative."),
        H2("Focus"),
        P("Calabar and nearby communities are the published focus. Other towns follow enquiry, not an implied statewide roster."),
    ],
    ["R09", "M09", "R04"],
)

# MARITIME M03-M10
add("articles-maritime.ts", researchId="M03",
    title="Flat High Performance hardware for offshore and marine use",
    seoTitle="Flat High Performance Starlink for Nigerian marine use | Skylink",
    seoDescription="When Nigerian vessels and offshore sites discuss Flat High Performance hardware versus boat-class or standard kits — survey first.",
    excerpt="Hardware class follows duty cycle, salt and vibration.",
    category="maritime", primaryKeyword="starlink flat hp maritime nigeria",
    hero=IMG_HP, alt="High-performance Starlink terminal on a rooftop",
    relatedServicePaths=[("/products/starlink-flat-high-performance", "Flat High Performance"), ("/services/maritime-offshore", "Maritime and offshore"), ("/services/enterprise-marine-hub", "Enterprise marine hub"), ("/contact", "Contact")],
    relatedIds=["E02", "M01", "M07"],
    cta=("Vessel hardware class unclear?", "Send vessel type and photos of candidate mounts.", "/contact?intent=quote", "Maritime hardware discussion"),
    blocks=[
        P("Marine Starlink is not a home dish on a railing. Flat High Performance and related high-duty terminals exist because vessels vibrate, pitch and live in salt. Whether your craft needs that class is a survey outcome."),
        N("Confirm current maritime hardware and plan pairing on starlink.com. Skylink will not invent ocean-coverage polygons or compatibility with every radar mast."),
        H2("Why HP-class appears at sea"),
        UL("Different mounting geometry.", "Higher duty expectations from operators.", "Plan classes Starlink associates with maritime products — check official pairing."),
        H2("When a boat-class or compact kit is discussed instead"),
        P("Smaller leisure craft on inland waterways may be closer to [boat installation](/services/boat-installation) than a full offshore package. See [boat considerations](/blog/starlink-boat-installation-nigeria)."),
        H2("Assessment"),
        P("Photos of the mast and power panel beat a product name in a chat. Use [maritime survey prep](/blog/maritime-starlink-survey-checklist-nigeria)."),
    ])

add("articles-maritime.ts", researchId="M04",
    title="Offshore Niger Delta Starlink planning factors",
    seoTitle="Offshore Niger Delta Starlink planning | Skylink",
    seoDescription="Planning factors for Starlink on Niger Delta offshore and oilfield-adjacent sites: access, HSE, power and weather — not copied specification sheets.",
    excerpt="Logistics and access dominate. Specs without a survey are decoration.",
    category="maritime", primaryKeyword="starlink offshore niger delta",
    hero=IMG_MAR, alt="Flat Starlink terminal installed in a maritime vessel context",
    relatedServicePaths=[("/services/maritime-offshore", "Maritime and offshore"), ("/starlink-installation-niger-delta", "Niger Delta planning page"), ("/services/offshore-hse", "Offshore HSE"), ("/services/enterprise-marine-hub", "Enterprise marine hub"), ("/contact", "Contact")],
    relatedIds=["M05", "M01", "L09", "M08"],
    cta=("Offshore or field camp?", "Describe asset type and access process. No coverage guarantee from this page.", "/contact?intent=quote", "Request an offshore discussion"),
    blocks=[
        P("Niger Delta offshore and field-adjacent connectivity is a logistics project wearing an antenna. Weather windows, boat transfers, camp power and site induction decide whether a crew can work — long before anyone argues about a product brochure."),
        H2("Planning factors"),
        UL("How people and tools get to the asset.", "Who issues work permits.", "Available power quality.", "Whether the terminal lives on a vessel, a platform, or a shore camp."),
        H2("Land camps versus vessels"),
        P("A swamp camp may look “offshore” in conversation and still be a land mount with terrible access. A vessel is [maritime](/services/maritime-offshore). Do not merge the scopes."),
        H2("Regional page"),
        P("[Niger Delta location content](/starlink-installation-niger-delta) is regional planning, not a promise every creek is scheduled."),
        H2("HSE"),
        P("See [HSE and access](/blog/starlink-offshore-hse-nigeria). No certification theatre on this page."),
    ])

add("articles-maritime.ts", researchId="M05",
    title="HSE and site access topics for offshore Starlink work",
    seoTitle="HSE and access for offshore Starlink work in Nigeria | Skylink",
    seoDescription="What vessel and offshore operators should expect around access, inductions and safe work for Starlink installs — without invented certificates.",
    excerpt="Access rules are part of the job. Certificates we do not hold are not claimed.",
    category="maritime", primaryKeyword="starlink offshore hse nigeria",
    hero=IMG_HSE, alt="Offshore and HSE-aware installation context",
    relatedServicePaths=[("/services/offshore-hse", "Offshore HSE"), ("/services/maritime-offshore", "Maritime and offshore"), ("/contact", "Contact")],
    relatedIds=["M04", "M01", "M10"],
    cta=("Site has permit-to-work?", "Send induction requirements with the enquiry.", "/contact?intent=quote", "Discuss access"),
    blocks=[
        P("Offshore and vessel work is gated by the operator’s HSE process. Skylink publishes an [offshore HSE](/services/offshore-hse) service page to talk about that process. We do not list certificates we have not verified on this website."),
        H2("What operators should send"),
        UL("Induction or permit-to-work rules.", "PPE expectations.", "Whether hot work or penetrations need extra approval.", "Who escorts the crew."),
        H2("What this is not"),
        P("It is not a claim of ISO, OPITO, or any named card. If a contract requires named tickets, that is a commercial confirmation outside this article."),
        H2("Safe work on the asset"),
        P("Mounting near radars, walking routes and lifting gear is a layout problem. Survey photographs should show those constraints."),
    ])

add("articles-maritime.ts", researchId="M06",
    title="Marine SD-WAN and Starlink integration overview for operators",
    seoTitle="Marine SD-WAN with Starlink in Nigeria | Skylink",
    seoDescription="High-level view of using Starlink as a path in marine SD-WAN or failover designs for Nigerian operators — no vendor lock-in recipes.",
    excerpt="Starlink as a WAN path, not a magic bridge to every VSAT network.",
    category="maritime", primaryKeyword="starlink marine sdwan nigeria",
    hero=IMG_SD, alt="Marine networking and SD-WAN context",
    relatedServicePaths=[("/services/marine-sdwan", "Marine SD-WAN"), ("/services/maritime-offshore", "Maritime and offshore"), ("/services/enterprise-marine-hub", "Enterprise marine hub"), ("/contact", "Contact")],
    relatedIds=["B02", "M08", "B12"],
    cta=("Already have VSAT or LTE at sea?", "Describe existing WAN paths at a high level.", "/contact?intent=quote", "Discuss marine SD-WAN"),
    blocks=[
        P("Operators with VSAT, LTE near shore, or multiple vessels often want Starlink as another path — failover or combined. Skylink’s [marine SD-WAN](/services/marine-sdwan) page is that conversation at a high level."),
        H2("What integration means here"),
        UL("Physical install of the satellite path.", "Handoff to the vessel’s existing router/firewall if compatible.", "Clear roles: who owns WAN policy."),
        H2("What we will not do in a blog"),
        P("Publish a single vendor CLI. Guarantee session persistence across every cutover. Pretend CGNAT never matters for inbound management."),
        H2("Start with the radio"),
        P("If the terminal cannot see the sky or stay powered, SD-WAN policy is theatre. Fit [maritime planning](/blog/starlink-maritime-nigeria-planning-checklist) first."),
    ])

add("articles-maritime.ts", researchId="M07",
    title="Power and mounting challenges for Starlink on workboats",
    seoTitle="Starlink power and mounts on Nigerian workboats | Skylink",
    seoDescription="Workboat-specific Starlink issues: vibration, wet decks, 12/24 V power and mounts that survive more than a marina weekend.",
    excerpt="Workboats punish weak brackets and shared batteries.",
    category="maritime", primaryKeyword="starlink workboat power mount nigeria",
    hero=IMG_BOAT, alt="Starlink boat installation service context",
    relatedServicePaths=[("/services/boat-installation", "Boat installation"), ("/services/backup-power", "Backup power"), ("/services/maritime-offshore", "Maritime"), ("/contact", "Contact")],
    relatedIds=["M02", "M03", "E11"],
    cta=("Workboat project?", "Note voltage available and photos of the wheelhouse roof.", "/contact?intent=quote", "Discuss a workboat install"),
    blocks=[
        P("Workboats live harder than leisure craft. Vibration loosens fittings; decks stay wet; power is a shared battery bank that also starts the engine. A patio mount from a housing estate will not last."),
        H2("Mounts"),
        P("Choose structure that is already strong, keep the terminal out of walking lines, and strain-relieve cables so a boot cannot rip a connector."),
        H2("Power"),
        P("Know whether 12 V, 24 V or inverter AC is actually stable when the engine is off. Unofficial converters are a common failure. Pair with [power supply notes](/blog/starlink-power-supply-nigeria) on the electrical principle — marine duty still needs a vessel survey."),
        H2("Crew use"),
        P("If the same kit is “office” and “Netflix in the bunks,” talk about Wi‑Fi separation before the master blames the dish."),
    ])

add("articles-maritime.ts", researchId="M08",
    title="Connectivity for crew boats and offshore support vessels",
    seoTitle="Starlink for crew boats and OSVs in Nigeria | Skylink",
    seoDescription="Starlink planning for Nigerian crew boats and offshore support vessels: welfare Wi-Fi, ops traffic and multi-vessel thinking.",
    excerpt="OSV connectivity is operational, not a weekend yacht gadget.",
    category="maritime", primaryKeyword="starlink crew boat nigeria",
    hero=IMG_MAR, alt="Flat Starlink terminal installed in a maritime vessel context",
    relatedServicePaths=[("/services/maritime-offshore", "Maritime and offshore"), ("/services/fleet-management", "Fleet management"), ("/services/enterprise-marine-hub", "Enterprise marine hub"), ("/contact", "Contact")],
    relatedIds=["M01", "M06", "B09", "M04"],
    cta=("Crew boat or OSV fleet?", "List vessel count and whether welfare Wi-Fi must be separate from ops.", "/contact?intent=quote", "Discuss OSV connectivity"),
    blocks=[
        P("Crew boats and OSVs need connectivity for operations and, increasingly, crew welfare. Mixing those on one open SSID is how a movie download stalls a chart update. Nigerian operators should say which traffic matters before choosing hardware."),
        H2("Ops versus welfare"),
        P("Where possible, separate networks. Exact VLAN recipes belong to the vessel IT standard, not this article."),
        H2("Fleet pattern"),
        P("Several vessels means several mounts and accounts — see [multi-site / fleet](/blog/starlink-multi-site-business-nigeria) with marine context via [fleet management](/services/fleet-management)."),
        H2("Access"),
        P("Install windows follow charter schedules. Send the port or yard contact early."),
    ])

add("articles-maritime.ts", researchId="M09",
    title="Port and harbour Starlink use cases in Nigeria",
    seoTitle="Starlink for Nigerian ports, harbours and marinas | Skylink",
    seoDescription="Hybrid land/marine Starlink at Nigerian ports: harbour offices, marina workshops and vessels alongside — keep scopes separate.",
    excerpt="A jetty office is a land install. A vessel at the same jetty is not.",
    category="maritime", primaryKeyword="starlink port connectivity nigeria",
    hero=IMG_HUB, alt="Enterprise and marine hub connectivity context",
    relatedServicePaths=[("/services/maritime-offshore", "Maritime and offshore"), ("/services/business-connectivity", "Business connectivity"), ("/services/boat-installation", "Boat installation"), ("/contact", "Contact")],
    relatedIds=["M02", "B01", "L03"],
    cta=("Port office or vessel?", "Say which. Mixing them in one sentence delays quoting.", "/contact?intent=quote", "Enquire"),
    blocks=[
        P("Ports combine warehouses, agent offices, marinas and ships. Starlink can serve more than one of those, but they are different jobs: land business connectivity versus a vessel mount."),
        H2("Harbour offices"),
        P("Treat as [business connectivity](/services/business-connectivity) with coastal corrosion awareness."),
        H2("Vessels alongside"),
        P("A boat that lives at a marina still needs a marine mount if it will go to sea. See [boat installation](/blog/starlink-boat-installation-nigeria)."),
        H2("Do not share one dish by dragging a cable across a public jetty"),
        P("That fails safety, theft and obstruction tests at once."),
    ])

add("articles-maritime.ts", researchId="M10",
    title="What vessel operators should prepare before a maritime survey",
    seoTitle="Maritime Starlink survey checklist for Nigerian operators | Skylink",
    seoDescription="A pre-survey pack for Nigerian vessel operators: photos, power, access contacts and operating pattern so a maritime Starlink visit is usable.",
    excerpt="Survey quality tracks the pack you send.",
    category="maritime", primaryKeyword="maritime starlink site survey nigeria",
    hero=IMG_MAR, alt="Flat Starlink terminal installed in a maritime vessel context",
    relatedServicePaths=[("/services/maritime-offshore", "Maritime and offshore"), ("/services/boat-installation", "Boat installation"), ("/services/offshore-hse", "Offshore HSE"), ("/contact", "Contact")],
    relatedIds=["M01", "M05", "M03"],
    cta=("Ready for a maritime survey talk?", "Attach the pack below to your enquiry.", "/contact?intent=survey", "Request a maritime survey discussion"),
    blocks=[
        P("A maritime survey fails when the only input is “we need internet on the boat.” Operators who send a small pack get a scoped conversation instead of a guessing game."),
        H2("Send this"),
        OL("Vessel type and approximate size class.", "Photos of candidate mounts from deck level.", "Available voltages and whether an inverter is dedicated.", "Port or yard access contact.", "Whether the terminal must work underway.", "Any HSE induction notes."),
        H2("Do not send"),
        P("Copied competitor spec sheets as if they were your vessel. Promises of ocean-wide coverage you want us to repeat."),
        H2("What happens next"),
        P("Skylink maps the pack to [maritime](/services/maritime-offshore) or [boat](/services/boat-installation) scope and says what still requires an attended visit."),
    ])

# NEWS + FORECAST
add("articles-news-forecast.ts", researchId="N01",
    title="How to verify Starlink availability for a Nigerian address in 2026",
    seoTitle="Check Starlink availability for a Nigerian address (2026) | Skylink",
    seoDescription="How Nigerian customers should verify Starlink service availability for an exact address using official Starlink tools — not third-party maps.",
    excerpt="Availability is per address in Starlink’s systems. Blogs cannot certify your street.",
    category="news", primaryKeyword="starlink availability nigeria 2026",
    hero=IMG_SAL, alt="Starlink sales and installation equipment context",
    relatedServicePaths=[("/guide/starlink-nigeria", "Nigeria guide"), ("/contact", "Contact"), ("/faq", "FAQ")],
    relatedIds=["N06", "R17", "N10"],
    cta=("Address looks available?", "Skylink can discuss install once you have checked official availability.", "/contact?intent=quote", "Enquire about installation"),
    blocks=[
        P("The only authoritative availability check is Starlink’s own order/availability flow for the exact service address. Third-party “coverage maps” and installer boasts go stale. As of November 2026, treat starlink.com and the official app as source."),
        H2("Practical steps"),
        OL("Open Starlink’s official website or app.", "Enter the precise address, not just the city.", "Read what plan class is offered — residential, roam, Priority, or none.", "Screenshot the result for your installer conversation."),
        H2("What Skylink will not do"),
        P("We will not scrape or republish a live coverage map. We will not promise that a published city page means your compound is activated."),
        H2("After it shows available"),
        P("Installation is a separate job. Hardware supply still follows catalogue and survey."),
    ])

add("articles-news-forecast.ts", researchId="N02",
    title="Reading Starlink plan changes that affect Nigerian customers",
    seoTitle="How to read Starlink plan changes in Nigeria | Skylink",
    seoDescription="A process article for Nigerian customers when Starlink plan names or terms change: use official sources, dates, and do not trust unsourced naira tables.",
    excerpt="We explain how to read changes — we do not freeze a plan menu that Starlink can edit tomorrow.",
    category="news", primaryKeyword="starlink plan changes nigeria",
    hero=IMG_ENT, alt="Enterprise Starlink connectivity context",
    relatedServicePaths=[("/services/subscription-services", "Subscription services"), ("/guide/starlink-nigeria", "Nigeria guide"), ("/faq", "FAQ")],
    relatedIds=["N10", "B13", "N06"],
    cta=("Plan screen looks different?", "Installation questions still go to Skylink; plan terms go to Starlink.", "/contact", "Contact Skylink"),
    blocks=[
        P("Starlink changes plan names, fair-use wording and prices. Nigerian group chats screenshot half of that. This article is a reading method, not a replica of the November 2026 checkout."),
        H2("Source hierarchy"),
        OL("Official Starlink account/checkout for your address.", "Starlink help/support pages with a visible update.", "Reputable reporting that cites those pages.", "Installer blogs (including this one) as explanation, not as the contract."),
        H2("Dates matter"),
        P("An announcement is not always the date it applies to existing subscribers. Read the “effective” language."),
        H2("Skylink’s subscription page"),
        P("[Subscription services](/services/subscription-services) explains that monthly fees stay on Starlink’s checkout. We will not republish naira figures here."),
    ])

add("articles-news-forecast.ts", researchId="N03",
    title="Starlink legality and licensing context for Nigerian buyers",
    seoTitle="Is Starlink legal in Nigeria? Context for buyers | Skylink",
    seoDescription="Non-legal context for Nigerian Starlink buyers: hardware is publicly sold and installed, and licensing questions belong to official sources — not this blog.",
    excerpt="Not legal advice. Confirm current status from Starlink and Nigerian authorities.",
    category="news", primaryKeyword="is starlink legal in nigeria",
    hero=IMG_R4, alt="Professional Starlink installation context on a building exterior",
    relatedServicePaths=[("/guide/starlink-nigeria", "Nigeria guide"), ("/faq", "FAQ"), ("/contact", "Contact")],
    relatedIds=["N10", "N07", "R20"],
    cta=("Need an installer, not a lawyer?", "Skylink discusses mounts and surveys, not legal opinions.", "/contact", "Contact"),
    blocks=[
        P("Buyers still search whether Starlink is “legal” in Nigeria. Skylink installs and supports Starlink connectivity as a published business. That is not a substitute for a lawyer or an NCC circular."),
        N("This article is not legal advice and not a licence summary."),
        H2("What we can say factually"),
        UL("Starlink hardware and service are publicly marketed to Nigerian customers.", "Plan eligibility is decided in Starlink’s systems for an address.", "Installer marketing badges are not the law."),
        H2("What you should read"),
        P("Current Starlink country availability pages and any official Nigerian regulatory publications you or your counsel consider relevant. We will not paraphrase statutes we are not qualified to interpret."),
    ])

add("articles-news-forecast.ts", researchId="N04",
    title="What Nigerian customers should know about Starlink outages",
    seoTitle="Starlink outages in Nigeria — what to know | Skylink",
    seoDescription="How Nigerian Starlink users should treat outage news: official status first, local fault checks second, no dismantling during a network incident.",
    excerpt="News of an outage is not a remount instruction.",
    category="news", primaryKeyword="starlink outage nigeria",
    hero=IMG_REL, alt="Starlink relocation and remount service context",
    relatedServicePaths=[("/support", "Support"), ("/faq", "FAQ")],
    relatedIds=["T14", "T01", "N10"],
    cta=("Only your site is affected?", "Use the local troubleshooting path.", "/support", "Support"),
    blocks=[
        P("Outage posts spread faster than restorations. Treat them as a prompt to check official status and your app, not to loosen bolts."),
        H2("During a confirmed incident"),
        P("Wait. Do not factory-reset. Do not climb the roof. See [outage vs local fault](/blog/starlink-outage-vs-local-fault-nigeria)."),
        H2("After restoration"),
        P("If your site stays down, it was probably local all along."),
        H2("Sources"),
        P("Starlink status mechanisms and in-app messages outrank screenshots. Skylink will not maintain a live incident ticker on this page."),
    ])

add("articles-news-forecast.ts", researchId="N05",
    title="Hardware refreshes — Gen 3 and Mini relevance for Nigeria installs",
    seoTitle="Starlink Gen 3 and Mini hardware for Nigerian installs | Skylink",
    seoDescription="What Gen 3 and Mini hardware mean for Nigerian installs in 2026: generation-correct cables and mounts, mapped to Skylink’s catalogue — no unofficial launch rumours.",
    excerpt="Install around the kit you actually have.",
    category="news", primaryKeyword="starlink gen3 nigeria 2026",
    hero=IMG_SAL, alt="Starlink sales and installation equipment context",
    relatedServicePaths=[("/products", "Products"), ("/services/sales-installation", "Sales and installation"), ("/contact", "Contact")],
    relatedIds=["E01", "E03", "F04"],
    cta=("Buying current hardware?", "Use the catalogue, then enquire about install.", "/contact?intent=product", "Product enquiry"),
    blocks=[
        P("Hardware names move. Nigerian installs in 2026 commonly discuss Gen 3-class standard dishes and Mini-class compact kits because that is what is listed and supported — not because a rumour blog announced a future dish."),
        H2("Why generation still matters"),
        P("Cables and mounts are not universal. Mixing generations is the fastest way to a failed activation day."),
        H2("Catalogue as of this site"),
        P("See [products](/products) for what Skylink currently lists. If Starlink announces a new terminal, we will not pretend this paragraph is that announcement."),
        H2("Installer implication"),
        P("Tell the crew the exact model on the box. Photos of the label help."),
    ])

add("articles-news-forecast.ts", researchId="N06",
    title="Capacity and Priority plan notes for Lagos, Abuja and Port Harcourt",
    seoTitle="Starlink Priority notes for Lagos, Abuja and Port Harcourt | Skylink",
    seoDescription="Some addresses in Lagos, Abuja and Port Harcourt may be offered Priority rather than a new residential plan. Check the exact address — not the whole city.",
    excerpt="City names are not capacity maps.",
    category="news", primaryKeyword="starlink priority lagos abuja port harcourt",
    hero=IMG_ENT, alt="Enterprise Starlink connectivity context",
    relatedServicePaths=[("/services/priority-plans", "Priority plans"), ("/starlink-installation-lagos", "Lagos"), ("/starlink-installation-abuja", "Abuja"), ("/starlink-installation-port-harcourt", "Port Harcourt"), ("/contact", "Contact")],
    relatedIds=["B03", "N01", "L01"],
    cta=("Checkout shows Priority?", "We can discuss hardware and install for what the address is actually offered.", "/contact?intent=quote", "Enquire"),
    blocks=[
        P("Skylink’s Priority service copy records a public nuance: some addresses in Lagos, Abuja and Port Harcourt may be offered Priority rather than a new residential signup. That is per address, not a blanket city rule."),
        H2("What to do"),
        P("Run the official availability check. If it shows Priority, read Starlink’s current Priority terms. If it shows residential, do not buy a Priority story from a reseller."),
        H2("Install still matters"),
        P("Priority does not remove estate permissions or sky view. City landings: [Lagos](/starlink-installation-lagos), [Abuja](/starlink-installation-abuja), [Port Harcourt](/starlink-installation-port-harcourt)."),
        N("We do not maintain a street-level capacity database."),
    ])

add("articles-news-forecast.ts", researchId="N07",
    title="Installer market trends in Nigeria — what buyers should watch",
    seoTitle="Choosing a Starlink installer in Nigeria | Skylink",
    seoDescription="How Nigerian buyers can evaluate Starlink installers: published process, kit generation competence, no unverifiable authorised-partner badges.",
    excerpt="Trust process and specificity, not logos on a flyer.",
    category="news", primaryKeyword="starlink installer nigeria market",
    hero=IMG_R4, alt="Professional Starlink installation context on a building exterior",
    relatedServicePaths=[("/about", "About"), ("/our-work", "Installation examples"), ("/contact", "Contact")],
    relatedIds=["R20", "E08", "F05"],
    cta=("Evaluate Skylink the same way", "Read services, examples and this site’s caveats, then enquire.", "/contact", "Contact Skylink"),
    blocks=[
        P("Nigeria’s Starlink installer market is crowded with claims. Buyers should watch for competence on mounts, cables and honest scoping — not for a badge nobody can verify."),
        H2("Healthy signs"),
        UL("They ask about kit generation.", "They talk about permissions and power.", "They will not quote a fantasy nationwide fee before hearing the roof type.", "Photos are captioned honestly."),
        H2("Unhealthy signs"),
        UL("“Authorised partner” with no checkable source.", "Guaranteed speeds.", "Activation of addresses Starlink will not serve."),
        H2("Skylink’s position"),
        P("We describe ourselves as an installer and support business. Relationship phrasing on this site stays conservative. See [About](/about) and [questions to ask](/blog/questions-for-starlink-installer-nigeria)."),
    ])

add("articles-news-forecast.ts", researchId="N08",
    title="Payment and FX practicalities for Starlink subscriptions in Nigeria",
    seoTitle="Paying for Starlink in Nigeria — process notes | Skylink",
    seoDescription="Starlink monthly service is billed by Starlink. Skylink does not publish unverified naira rails or FX workarounds.",
    excerpt="We will not invent payment methods. Use official account tools.",
    category="news", primaryKeyword="pay for starlink nigeria",
    hero=IMG_SAL, alt="Starlink sales and installation equipment context",
    relatedServicePaths=[("/support", "Support"), ("/faq", "FAQ"), ("/contact", "Contact")],
    relatedIds=["T07", "N02"],
    cta=("Install paid, subscription unclear?", "Hardware/install is Skylink; monthly service is Starlink.", "/support", "Support"),
    blocks=[
        P("Nigerian customers ask how to pay Starlink in naira, by card, or via third parties. Those rails change and are easy to get wrong in a blog. Skylink does not operate Starlink billing."),
        H2("What is verified here"),
        UL("Monthly subscription is Starlink’s charge.", "Skylink’s published contact channels are for installation and support enquiries.", "We will not list unofficial FX agents."),
        H2("What you should do"),
        P("Use the payment options shown in your official Starlink account. If a method fails, Starlink support is the billing counterparty."),
        H2("If the dish is also physically down"),
        P("Do not mix a failed card with a chewed cable. Split [account issues](/blog/starlink-account-suspended-nigeria) from hardware troubleshooting."),
    ])

add("articles-news-forecast.ts", researchId="N09",
    title="Starlink Direct to Cell / SIM narratives — what is real for Nigeria",
    seoTitle="Starlink Direct to Cell vs dish internet in Nigeria | Skylink",
    seoDescription="Direct to Cell is a different Starlink product class from dish internet. Nigerian dish installs are not a phone-SIM substitute unless official pages say otherwise.",
    excerpt="Do not buy a dish expecting a phone SIM, or a SIM expecting a rooftop terminal.",
    category="news", primaryKeyword="starlink sim card nigeria",
    hero=IMG_SAL, alt="Starlink sales and installation equipment context",
    relatedServicePaths=[("/guide/starlink-nigeria", "Nigeria guide"), ("/faq", "FAQ")],
    relatedIds=["N10", "N01", "E13"],
    cta=("Need a dish install?", "That remains Skylink’s published work. Direct to Cell is not a Skylink SIM product.", "/contact", "Contact"),
    blocks=[
        P("“Starlink SIM” headlines confuse two products: satellite dish internet, and Direct to Cell style services that partner with mobile networks. They are not interchangeable. Availability is country- and carrier-specific on official Starlink pages."),
        H2("If you want home or office internet"),
        P("You are in dish-and-router land. Check address availability and talk to an installer."),
        H2("If you saw a phone-to-satellite story"),
        P("Read Starlink’s current Direct to Cell description and any Nigerian carrier announcement. As of this writing we do not sell a Skylink SIM and we will not claim nationwide Direct to Cell coverage."),
        N("Unverified Telegram offers of “Starlink SIMs” are out of scope and high risk."),
    ])

add("articles-news-forecast.ts", researchId="N10",
    title="Using industry news without chasing every rumour",
    seoTitle="How to evaluate Starlink news as a Nigerian customer | Skylink",
    seoDescription="A source checklist for Nigerian Starlink news: official pages, dated reporting, and why installer rumours should not drive hardware purchases.",
    excerpt="A meta-guide so the rest of this blog stays honest.",
    category="news", primaryKeyword="starlink news nigeria how to evaluate",
    hero=IMG_R, alt="Starlink dish and outdoor antenna on wall brackets during a residential mounting job",
    relatedServicePaths=[("/guide/starlink-nigeria", "Nigeria guide"), ("/support", "Support"), ("/faq", "FAQ")],
    relatedIds=["N02", "N04", "N09"],
    cta=("Need work done, not a rumour judged?", "Enquiries still start from your site and kit.", "/contact", "Contact"),
    blocks=[
        P("Starlink news moves faster than roofs. Nigerian buyers lose money when they treat a forwarded screenshot as a specification. Use a short source test."),
        H2("Prefer"),
        UL("starlink.com and the official app.", "Dated articles that quote those pages.", "Your own checkout for your address."),
        H2("Discount"),
        UL("Undated graphics with naira figures.", "“Guaranteed 500 Mbps” posts.", "Partner badges without a checkable register."),
        H2("How Skylink will use news"),
        P("We will update install-relevant facts (generation, plan classes as they affect scoping) when official sources change. We will not chase every rumour into a new URL."),
    ])

add("articles-news-forecast.ts", researchId="F01",
    title="Where Starlink demand may grow next across Nigerian states",
    seoTitle="Starlink demand outlook across Nigerian states | Skylink",
    seoDescription="A cautious outlook on where Starlink install demand may grow in Nigeria, based on fibre gaps and Skylink’s published service-area footprint — no invented volumes.",
    excerpt="Assumptions stated. Not a market-size study.",
    category="forecast", primaryKeyword="starlink demand forecast nigeria states",
    hero=IMG_R3, alt="Starlink pole mount in an outdoor installation setting",
    relatedServicePaths=[("/locations", "Service areas"), ("/services", "Services"), ("/contact", "Contact")],
    relatedIds=["F03", "R15", "L05"],
    cta=("In a published service area?", "Demand outlook does not change per-address confirmation.", "/locations", "View service areas"),
    blocks=[
        P("Demand for Starlink in Nigeria has followed places where terrestrial broadband is weak, unreliable, or slow to build. That pattern may continue. It is not a licensed forecast of subscriber counts."),
        H2("Assumptions"),
        UL("Fibre build-out remains uneven outside a few metros.", "Power quality stays a parallel problem (kits still need electricity).", "Starlink keeps selling to Nigerian addresses on official channels."),
        H2("Where installers already feel pull"),
        P("Skylink’s published footprint emphasises confirmed states and cities rather than “everywhere.” Growth conversations often involve peri-urban belts and industrial corridors — see [Ogun industrial](/blog/starlink-installation-ogun-industrial) as a type, not a prediction."),
        H2("Uncertainty"),
        P("Policy, pricing and competing 5G FWA can shift demand. We will not print fake adoption percentages."),
    ])

add("articles-news-forecast.ts", researchId="F02",
    title="Maritime connectivity outlook for Nigerian offshore operators",
    seoTitle="Maritime connectivity outlook for Nigerian operators | Skylink",
    seoDescription="Outlook for Nigerian offshore and vessel connectivity: LEO satellite as a complement to existing marine comms, with explicit uncertainty.",
    excerpt="Aligned with Skylink’s maritime mix — still a forecast, not a contract.",
    category="forecast", primaryKeyword="maritime connectivity outlook nigeria",
    hero=IMG_MAR, alt="Flat Starlink terminal installed in a maritime vessel context",
    relatedServicePaths=[("/services/maritime-offshore", "Maritime and offshore"), ("/services/marine-sdwan", "Marine SD-WAN"), ("/contact", "Contact")],
    relatedIds=["M01", "M06", "F03"],
    cta=("Planning vessel connectivity this year?", "Use current survey practice, not this outlook, to scope a job.", "/contact?intent=quote", "Maritime enquiry"),
    blocks=[
        P("Offshore operators in the Gulf of Guinea have used VSAT and terrestrial tricks for years. Low-Earth-orbit services such as Starlink Maritime-class products are already part of that mix globally. Nigerian uptake will track charterer pressure, crew-welfare expectations and whether hardware can be maintained in salt."),
        H2("Supporting observations"),
        UL("Public industry coverage of LEO at sea has grown through 2024–2026.", "Skylink treats maritime as a major practice area, not a hobby page."),
        H2("Assumptions"),
        P("Maritime plans remain commercially available to eligible vessels. HSE access continues to gate actual installs."),
        H2("Not claimed"),
        P("We do not forecast a date when VSAT disappears, or a coverage heatmap of every oil block."),
    ])

add("articles-news-forecast.ts", researchId="F03",
    title="Business continuity trends: satellite as a secondary path in Nigeria",
    seoTitle="Satellite as business backup internet in Nigeria — outlook | Skylink",
    seoDescription="Why Nigerian businesses may keep adding satellite as a secondary WAN: fibre cuts, generator culture and hybrid design — without fake SLA math.",
    excerpt="Backup demand is a trend. Percentages here would be fiction.",
    category="forecast", primaryKeyword="satellite backup internet trend nigeria",
    hero=IMG_BIZ, alt="Illustrative commercial Starlink installation environment",
    relatedServicePaths=[("/services/business-connectivity", "Business connectivity"), ("/services/backup-power", "Backup power"), ("/contact", "Contact")],
    relatedIds=["B02", "B12", "F01"],
    cta=("Designing failover now?", "Use the practical backup article, not the outlook, to scope.", "/blog/starlink-backup-fibre-business-nigeria", "Fibre backup guide"),
    blocks=[
        P("Nigerian businesses already practise failover with LTE and generators. Satellite as a diverse path is a continuation of that habit, not a Silicon Valley fad. Whether every SME buys a dish is unknown."),
        H2("Why the trend has a base"),
        UL("Physical fibre cuts are a known failure mode.", "Cellular congestion hits the same neighbourhoods at once.", "Cloud tools now sit under daily operations."),
        H2("Limits"),
        P("Satellite does not remove the need for power. A backup dish on a dead inverter is a sculpture."),
        H2("Near-term practice"),
        P("See [Starlink as fibre backup](/blog/starlink-backup-fibre-business-nigeria) for what to do this quarter rather than this decade."),
    ])

add("articles-news-forecast.ts", researchId="F04",
    title="Hardware evolution — what installers may need to plan for",
    seoTitle="Starlink hardware evolution for Nigerian installers | Skylink",
    seoDescription="Installer-facing outlook: generation-correct cables, new mounts, Mini-class portability — without announcing unreleased Starlink products.",
    excerpt="Plan for mismatch risk. Do not inventory vapourware.",
    category="forecast", primaryKeyword="starlink hardware future nigeria installers",
    hero=IMG_SAL, alt="Starlink sales and installation equipment context",
    relatedServicePaths=[("/products", "Products"), ("/services/sales-installation", "Sales and installation"), ("/about", "About")],
    relatedIds=["N05", "E03", "E04"],
    cta=("Installing current kits?", "Tell us the model on the box.", "/contact?intent=product", "Product enquiry"),
    blocks=[
        P("Starlink has already shown that terminals, cables and routers change generations. Nigerian installers should expect more of that — not a named unreleased dish from a leaked slide."),
        H2("Durable practices"),
        UL("Always record kit generation on the job sheet.", "Do not stockpile random cables.", "Keep mount hardware corrosion-capable for coastal work.", "Train crews not to force connectors."),
        H2("What we will not forecast"),
        P("Launch dates, prices, or “Starlink Gen X in Nigeria by Q3.” If official hardware news lands, it belongs in a dated news brief, not this outlook."),
    ])

add("articles-news-forecast.ts", researchId="F05",
    title="Local search and review expectations for Nigerian connectivity buyers",
    seoTitle="How Nigerian buyers will use search and reviews to choose installers | Skylink",
    seoDescription="Outlook on Google search and reviews in Nigerian Starlink installer choice — supporting a genuine review programme, never fake ratings.",
    excerpt="Buyers will keep googling. Fake reviews remain unacceptable.",
    category="forecast", primaryKeyword="local search reviews starlink installers nigeria",
    hero=IMG_R4, alt="Professional Starlink installation context on a building exterior",
    relatedServicePaths=[("/contact", "Contact"), ("/our-work", "Installation examples"), ("/about", "About")],
    relatedIds=["N07", "R20"],
    cta=("After a completed install", "Honest reviews help other buyers. Skylink will not incentivise star ratings.", "/contact", "Contact"),
    blocks=[
        P("Nigerian customers already search “Starlink installer” plus a city name. Maps, reviews and a clear website will matter more as the market fills. That is an observation about buyer behaviour, not a ranking claim."),
        H2("What installers should actually do"),
        UL("Keep service-area pages accurate.", "Ask for genuine Google reviews after successful jobs — see the reviews plan in project docs, once a profile exists.", "Publish process, not invented testimonials."),
        H2("What we will not do"),
        P("Buy reviews. Fabricate Maps listings for every state. Claim Search Console positions we have not measured."),
        H2("For readers"),
        P("Use [questions for installers](/blog/questions-for-starlink-installer-nigeria) alongside any star rating you see."),
    ])

if __name__ == "__main__":
    for filename, export_name in EXPORTS.items():
        items = articles_by_file[filename]
        dump(filename, export_name, items)
        print(filename, len(items))
    total = sum(len(v) for v in articles_by_file.values())
    print("total new articles", total)
