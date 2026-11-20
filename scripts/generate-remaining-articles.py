#!/usr/bin/env python3
"""Generate remaining 85 Skylink article TS modules from the research bank IDs."""
from __future__ import annotations
import json
from pathlib import Path

PUB = "2026-11-20"
OUT = Path(__file__).resolve().parents[1] / "src/data/articles"


def j(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


SLUGS = {
    "R01": "starlink-installation-checklist-nigeria",
    "R02": "starlink-site-survey-nigeria",
    "R03": "starlink-apartment-estate-approval-nigeria",
    "R04": "starlink-mount-roof-nigeria",
    "R05": "starlink-obstruction-nigeria",
    "R06": "starlink-cable-routing-nigeria",
    "R07": "starlink-cable-rats-nigeria",
    "R08": "starlink-duplex-installation-nigeria",
    "R09": "starlink-rainy-season-harmattan-nigeria",
    "R10": "starlink-generator-inverter-power-nigeria",
    "R11": "starlink-installation-timeline-nigeria",
    "R12": "diy-vs-professional-starlink-installation-nigeria",
    "R13": "starlink-wifi-dead-zones-nigeria",
    "R14": "starlink-router-placement-nigeria",
    "R15": "starlink-rural-home-nigeria",
    "R16": "starlink-roof-access-safety-nigeria",
    "R17": "starlink-activation-handover-nigeria",
    "R18": "starlink-relocation-nigeria",
    "R19": "starlink-home-office-nigeria",
    "R20": "questions-for-starlink-installer-nigeria",
    "E01": "starlink-mini-vs-standard-nigeria",
    "E02": "starlink-flat-hp-vs-standard-nigeria",
    "E03": "starlink-kits-nigeria",
    "E04": "starlink-45m-cable-nigeria",
    "E05": "starlink-mesh-router-nigeria",
    "E06": "starlink-pivot-mount-accessories-nigeria",
    "E07": "starlink-ethernet-adapter-nigeria",
    "E08": "genuine-starlink-kit-nigeria",
    "E09": "starlink-router-vs-third-party-wifi-nigeria",
    "E10": "starlink-long-range-wifi-nigeria",
    "E11": "starlink-power-supply-nigeria",
    "E12": "starlink-accessories-after-install-nigeria",
    "E13": "starlink-temporary-sites-events-nigeria",
    "E14": "starlink-hardware-options-skylink",
    "E15": "starlink-high-performance-when-nigeria",
    "T01": "starlink-offline-searching-troubleshooting-nigeria",
    "T02": "starlink-cable-disconnected-nigeria",
    "T03": "starlink-slow-speed-nigeria",
    "T04": "starlink-red-light-router-nigeria",
    "T05": "starlink-keeps-rebooting-nigeria",
    "T06": "starlink-factory-reset-nigeria",
    "T07": "starlink-account-suspended-nigeria",
    "T08": "starlink-obstruction-after-rain-nigeria",
    "T09": "change-starlink-wifi-password-nigeria",
    "T10": "starlink-cctv-network-nigeria",
    "T11": "starlink-gaming-nigeria",
    "T12": "when-to-call-starlink-installer-nigeria",
    "T13": "starlink-harmattan-dust-maintenance-nigeria",
    "T14": "starlink-outage-vs-local-fault-nigeria",
    "T15": "starlink-after-install-support-nigeria",
    "B01": "starlink-office-business-installation-nigeria",
    "B02": "starlink-backup-fibre-business-nigeria",
    "B03": "starlink-enterprise-plans-nigeria",
    "B04": "starlink-whole-premises-wifi-nigeria",
    "B05": "starlink-estate-wifi-nigeria",
    "B06": "starlink-wisp-nigeria",
    "B07": "starlink-hotels-sme-nigeria",
    "B08": "starlink-schools-campuses-nigeria",
    "B09": "starlink-multi-site-business-nigeria",
    "B10": "starlink-construction-site-nigeria",
    "B11": "starlink-pos-cctv-business-nigeria",
    "B12": "starlink-business-sla-expectations-nigeria",
    "B13": "starlink-roam-global-priority-nigeria",
    "B14": "starlink-commercial-quote-factors-nigeria",
    "B15": "starlink-vs-fibre-vs-5g-nigeria",
    "L01": "starlink-installation-lagos-apartments-estates",
    "L02": "starlink-installation-abuja-estates",
    "L03": "starlink-installation-port-harcourt-rivers",
    "L04": "starlink-installation-ibadan",
    "L05": "starlink-installation-ogun-industrial",
    "L06": "starlink-installation-benin-city",
    "L07": "starlink-installation-owerri",
    "L08": "starlink-installation-enugu-terrain",
    "L09": "starlink-installation-yenagoa-bayelsa",
    "L10": "starlink-installation-calabar-cross-river",
    "M01": "starlink-maritime-nigeria-planning-checklist",
    "M02": "starlink-boat-installation-nigeria",
    "M03": "starlink-flat-hp-maritime-nigeria",
    "M04": "starlink-offshore-niger-delta",
    "M05": "starlink-offshore-hse-nigeria",
    "M06": "starlink-marine-sdwan-nigeria",
    "M07": "starlink-workboat-power-mount-nigeria",
    "M08": "starlink-crew-boat-osv-nigeria",
    "M09": "starlink-port-harbour-nigeria",
    "M10": "maritime-starlink-survey-checklist-nigeria",
    "N01": "starlink-availability-nigeria-2026",
    "N02": "starlink-plan-changes-nigeria",
    "N03": "is-starlink-legal-in-nigeria",
    "N04": "starlink-outage-what-to-know-nigeria",
    "N05": "starlink-hardware-gen3-mini-nigeria",
    "N06": "starlink-priority-lagos-abuja-port-harcourt",
    "N07": "choose-starlink-installer-nigeria",
    "N08": "pay-for-starlink-nigeria",
    "N09": "starlink-direct-to-cell-nigeria",
    "N10": "evaluate-starlink-news-nigeria",
    "F01": "starlink-demand-outlook-nigeria-states",
    "F02": "maritime-connectivity-outlook-nigeria",
    "F03": "satellite-backup-internet-trend-nigeria",
    "F04": "starlink-hardware-evolution-installers-nigeria",
    "F05": "local-search-reviews-starlink-installers-nigeria",
}


def P(t): return ("p", t)
def H2(t): return ("h2", t)
def H3(t): return ("h3", t)
def UL(*i): return ("ul", list(i))
def OL(*i): return ("ol", list(i))
def T(h, r): return ("table", h, r)
def N(t): return ("note", t)


def emit_blocks(blocks):
    lines = ["    blocks: ["]
    for b in blocks:
        if b[0] == "p":
            lines.append(f"      p({j(b[1])}),")
        elif b[0] == "h2":
            lines.append(f"      h2({j(b[1])}),")
        elif b[0] == "h3":
            lines.append(f"      h3({j(b[1])}),")
        elif b[0] == "note":
            lines.append(f"      note({j(b[1])}),")
        elif b[0] == "ul":
            lines.append(f"      ul({', '.join(j(i) for i in b[1])}),")
        elif b[0] == "ol":
            lines.append(f"      ol({', '.join(j(i) for i in b[1])}),")
        elif b[0] == "table":
            headers = ", ".join(j(h) for h in b[1])
            rows = ", ".join("[" + ", ".join(j(c) for c in row) + "]" for row in b[2])
            lines.append(f"      table([{headers}], [{rows}]),")
    lines.append("    ],")
    return "\n".join(lines)


def emit_article(a: dict) -> str:
    rid = a["researchId"]
    slug = SLUGS[rid]
    cta_h, cta_d, cta_to, cta_l = a["cta"]
    rsp = ", ".join(f'{{ path: {j(p)}, label: {j(l)} }}' for p, l in a["relatedServicePaths"])
    ras = ", ".join(j(SLUGS[i] if i in SLUGS else i) for i in a["relatedIds"])
    return "\n".join([
        "  {",
        f'    researchId: {j(rid)},',
        f'    slug: {j(slug)},',
        f'    title: {j(a["title"])},',
        f'    seoTitle: {j(a["seoTitle"])},',
        f'    seoDescription: {j(a["seoDescription"])},',
        f'    excerpt: {j(a["excerpt"])},',
        f'    category: {j(a["category"])},',
        f'    primaryKeyword: {j(a["primaryKeyword"])},',
        "    published: true,",
        "    indexable: true,",
        "    date: PUBLISHED,",
        "    updated: PUBLISHED,",
        f'    heroImageSrc: {j(a["hero"])},',
        f'    heroImageAlt: {j(a["alt"])},',
        emit_blocks(a["blocks"]),
        f"    relatedServicePaths: [{rsp}],",
        f"    relatedArticleSlugs: [{ras}],",
        "    cta: {",
        f"      heading: {j(cta_h)},",
        f"      description: {j(cta_d)},",
        f"      to: {j(cta_to)},",
        f"      label: {j(cta_l)},",
        "    },",
        "  },",
    ])


def dump(filename: str, export_name: str, articles: list):
    parts = [
        "import {",
        "  type ArticleRecord,",
        "  h2,",
        "  note,",
        "  ol,",
        "  p,",
        "  table,",
        "  ul,",
        '} from "@/data/articles/article-types";',
        "",
        f"const PUBLISHED = {j(PUB)};",
        "",
        f"export const {export_name}: ArticleRecord[] = [",
    ]
    for a in articles:
        parts.append(emit_article(a))
    parts.append("];")
    parts.append("")
    path = OUT / filename
    path.write_text("\n".join(parts), encoding="utf-8")
    print("wrote", path.name, len(articles))


# --- article definitions ---
articles_by_file: dict[str, list] = {
    "articles-residential.ts": [],
    "articles-equipment.ts": [],
    "articles-troubleshooting.ts": [],
    "articles-business.ts": [],
    "articles-local.ts": [],
    "articles-maritime.ts": [],
    "articles-news-forecast.ts": [],
}


def add(file, **kw):
    articles_by_file[file].append(kw)


IMG_R = "/images/service-residential-installation.jpeg"
IMG_R2 = "/images/hero-starlink-tile-roof.jpeg"
IMG_R3 = "/images/hero-starlink-pole-solar.jpeg"
IMG_R4 = "/images/hero-starlink-installation.jpeg"
IMG_BP = "/images/service-backup-power.jpeg"
IMG_WF = "/images/service-wifi-networking.jpeg"
IMG_ACC = "/images/service-accessories.jpeg"
IMG_SAL = "/images/service-sales-installation.jpeg"
IMG_REL = "/images/service-relocation.jpeg"
IMG_BIZ = "/images/service-business-connectivity.jpeg"
IMG_ENT = "/images/service-enterprise-plans.jpeg"
IMG_EST = "/images/service-estate-wifi.jpeg"
IMG_LR = "/images/service-long-range-wifi.jpeg"
IMG_WISP = "/images/service-wisp-setup.jpeg"
IMG_MAR = "/images/service-maritime-offshore.jpeg"
IMG_BOAT = "/images/service-boat-installation.jpeg"
IMG_HSE = "/images/service-offshore-hse.jpeg"
IMG_SD = "/images/service-marine-sdwan.jpeg"
IMG_FLT = "/images/service-fleet-management.jpeg"
IMG_HP = "/images/hero-starlink-rooftop-hp.jpeg"
IMG_HUB = "/images/service-enterprise-marine-hub.jpeg"

# RESIDENTIAL remaining
add(
    "articles-residential.ts",
    researchId="R04",
    title="Best mounting positions for Starlink on Nigerian roofs",
    seoTitle="Starlink roof mounts in Nigeria — slab, sheet, tile and poles | Skylink",
    seoDescription="How to choose a Starlink mount on Nigerian roofs: concrete slabs, corrugated sheets, tiles, walls and poles, with weather and obstruction notes.",
    excerpt="A practical guide to dish placement on common Nigerian roof types, without treating any photograph as a guaranteed match for your house.",
    category="residential",
    primaryKeyword="starlink mount roof nigeria",
    hero=IMG_R2,
    alt="Starlink terminal mounted on a tiled residential roof",
    relatedServicePaths=[("/services/residential-installation", "Residential installation"), ("/services/accessories", "Accessories"), ("/products", "Products"), ("/contact", "Contact")],
    relatedIds=["R01", "R05", "R16", "E06"],
    cta=("Need a mount assessed?", "Share roof type, photos if safe, and whether estate rules apply.", "/contact?intent=survey", "Request a survey"),
    blocks=[
        P("Choosing where a Starlink dish sits on a Nigerian roof is a structural and sky-view decision, not a decorative one. Concrete slabs, corrugated sheets, tiles, parapet walls and poles all behave differently in rain, wind and coastal air."),
        N("Official Starlink setup guidance emphasises a clear sky view and a stable mount. Exact bracket kits vary by hardware generation — match accessories to the kit you actually have."),
        H2("What “a good position” means"),
        UL("Open sky in the directions the terminal needs, checked at the mount — not from the street.", "A surface that can take the load and wind without tearing sheets or cracking tiles.", "A cable path that can be sealed and protected.", "Access for later maintenance without unsafe climbing."),
        H2("Concrete roof slabs"),
        P("Many duplexes and newer houses use flat concrete. A pole or ballast-aware mount on a slab is often easier to weatherproof than piercing a thin metal sheet. Watch water tanks, satellite TV dishes and neighbouring higher roofs that steal sky."),
        H2("Corrugated and long-span sheets"),
        P("Sheet roofs are common and leak if fixings are poor. Weak self-tappers loosen in storms. Prefer mounts that spread load onto purlins or a purpose-made pole rather than a handful of screws in thin metal."),
        H2("Tiles"),
        P("Tile work needs care to avoid cracked tiles and hidden leaks. Not every tile roof is a DIY job. If the only clear sky is over a steep pitch, a professional mount is usually the safer path."),
        H2("Poles and walls"),
        P("Poles help when the roof itself is shaded by trees or a neighbour. Walls can work on gable ends that face open sky. Ground-level wall mounts in dense plots often fail obstruction checks even when they “look open” from the compound."),
        H2("How this feeds a quotation"),
        P("Mount complexity, access equipment and cable length change labour — not as a published nationwide fee, but as scoped factors. See the [home installation checklist](/blog/starlink-installation-checklist-nigeria) before you enquire."),
    ],
)

add(
    "articles-residential.ts",
    researchId="R05",
    title="How trees and neighbouring buildings block Starlink in Nigeria",
    seoTitle="Starlink obstructions in Nigeria — trees, tanks and neighbouring roofs | Skylink",
    seoDescription="Why trees, water tanks and neighbouring buildings block Starlink in Nigerian compounds, and what to check before you drill.",
    excerpt="An obstruction explainer for Nigerian plots, including seasonal leaf growth after the rains.",
    category="residential",
    primaryKeyword="starlink obstruction nigeria",
    hero=IMG_R4,
    alt="Professional Starlink installation context on a building exterior",
    relatedServicePaths=[("/services/residential-installation", "Residential installation"), ("/services/relocation", "Relocation"), ("/faq", "FAQ"), ("/contact", "Contact")],
    relatedIds=["R04", "T08", "R09", "R02"],
    cta=("Worried about obstructions?", "Send photos of the sky above the intended mount if you can take them safely.", "/contact?intent=survey", "Discuss a sky-view check"),
    blocks=[
        P("Starlink terminals need a clear view of the sky. In Nigerian compounds the usual blockers are not distant hills — they are water tanks, palm and mango trees, neighbouring storeys and parapet walls."),
        P("Starlink’s own app reports obstructions for the terminal’s current position. A street-level photo cannot replace that check."),
        H2("Trees"),
        P("A gap that looks fine in the dry season can close after the rains. Always judge the mount for wet-season canopy, not only harmattan haze."),
        H2("Buildings and tanks"),
        P("Duplexes built close together create “urban canyons.” Overhead tanks on your own roof are a frequent self-inflicted blocker. Moving the dish a few metres, or raising it on a pole, is often the real fix."),
        H2("What the obstruction map is telling you"),
        P("Persistent wedges of obstruction usually mean the physical position is wrong. Clearing software warnings without moving the dish does not create sky."),
        H2("When remounting is the answer"),
        P("If the kit already works poorly after leaf growth or a new neighbour building, [relocation / remount](/services/relocation) is the service path — not another factory reset."),
    ],
)

add(
    "articles-residential.ts",
    researchId="R06",
    title="Starlink cable routing through Nigerian homes safely",
    seoTitle="Routing Starlink cables through Nigerian homes | Skylink",
    seoDescription="Plan Starlink cable routes in Nigerian homes: wall entries, waterproofing, bend radius, generation-correct cables and rodent protection.",
    excerpt="How to get from dish to router without leaks, chewed cables or the wrong generation of lead.",
    category="residential",
    primaryKeyword="run starlink cable through walls nigeria",
    hero=IMG_ACC,
    alt="Starlink accessories and cabling context",
    relatedServicePaths=[("/services/residential-installation", "Residential installation"), ("/services/accessories", "Accessories"), ("/products/starlink-gen3-45m-cable", "Gen 3 45 m cable"), ("/contact", "Contact")],
    relatedIds=["R07", "E04", "R08", "T02"],
    cta=("Long cable run on a duplex?", "Describe dish position and router room when you enquire.", "/contact?intent=quote", "Request a quote"),
    blocks=[
        P("A neat Starlink install is often decided by the cable, not the dish. Nigerian homes add rain, heat, rodents and long duplex runs between a roof plant area and a downstairs living room."),
        N("Cables are generation-specific. A Gen 3 lead does not fit a Gen 2 terminal. Confirm kit generation before you buy a longer cable."),
        H2("Plan the route before drilling"),
        OL("Mark the dish position that actually has sky.", "Mark the indoor router location that has power and useful Wi‑Fi reach.", "Find the shortest protected path between them.", "Decide the wall or slab entry point and how it will be sealed."),
        H2("Waterproofing the entry"),
        P("Unsealed penetrations stain ceilings in the rainy season. Use a proper gland or flashing detail, keep a drip loop where the cable leaves the outdoor run, and avoid sharp bends against zinc edges."),
        H2("Inside the house"),
        P("Trunking looks better than a black cable across a freshly painted wall, and it also hides the lead from curious children and pests. Do not pinch the cable in burglar-proof frames."),
        H2("When the standard cable is too short"),
        P("Large plots and duplexes sometimes need the longer Gen 3 cable Skylink lists in the catalogue. Mixing random “network cable” is not a substitute for the kit’s outdoor lead."),
    ],
)

add(
    "articles-residential.ts",
    researchId="R07",
    title="Protecting Starlink cables from rats and rodents in Nigeria",
    seoTitle="Protect Starlink cables from rats in Nigeria | Skylink",
    seoDescription="Prevent rodent damage to Starlink outdoor cables in Nigerian homes: conduit, routing, inspection and when to replace a chewed lead.",
    excerpt="An install-time prevention checklist for a very common Nigerian failure mode.",
    category="residential",
    primaryKeyword="starlink cable rats nigeria",
    hero=IMG_ACC,
    alt="Starlink accessories and cabling context",
    relatedServicePaths=[("/services/accessories", "Accessories"), ("/services/residential-installation", "Residential installation"), ("/contact", "Contact")],
    relatedIds=["R06", "T02", "T12"],
    cta=("Replacing a chewed cable?", "Tell us the kit generation so the correct lead is quoted.", "/contact?intent=quote", "Enquire"),
    blocks=[
        P("Rats and other rodents chew outdoor cables. In Nigerian compounds that often shows up as a sudden “cable disconnected” alert after weeks of normal service — especially where the lead runs along a fence, roof void or generator area."),
        H2("Prevention at install time"),
        UL("Keep outdoor runs short and off the ground.", "Use conduit or trunking on exposed sections.", "Avoid food stores, poultry and generator sheds as cable highways.", "Do not leave spare loops of cable as a nest."),
        H2("What not to do"),
        P("Wrapping the lead in random foam or leaving it on laterite is not protection. Do not splice a chewed outdoor Starlink cable with household electrical tape and hope."),
        H2("If the cable is already damaged"),
        P("Replace with the correct generation cable, reseat connectors, and fix the route so the next rodent does not win. See [cable disconnected troubleshooting](/blog/starlink-cable-disconnected-nigeria)."),
    ],
)

add(
    "articles-residential.ts",
    researchId="R08",
    title="Starlink for duplexes and multi-storey homes in Nigeria",
    seoTitle="Starlink installation for duplexes in Nigeria | Skylink",
    seoDescription="Plan Starlink on Nigerian duplexes: roof dish, downstairs router, long cable runs, Wi‑Fi between floors and estate rules.",
    excerpt="Why a duplex is not just “a bungalow with stairs” when you place dish, cable and router.",
    category="residential",
    primaryKeyword="starlink duplex installation nigeria",
    hero=IMG_R,
    alt="Starlink dish and outdoor antenna on wall brackets during a residential mounting job",
    relatedServicePaths=[("/services/residential-installation", "Residential installation"), ("/services/wifi-networking", "Wi‑Fi networking"), ("/products", "Products"), ("/contact", "Contact")],
    relatedIds=["R06", "R13", "R14", "E04"],
    cta=("Planning a duplex install?", "Say which floor the living rooms sit on and where the roof is accessible.", "/contact?intent=quote", "Request a quote"),
    blocks=[
        P("Duplexes and three-storey houses split the problem: the dish wants the highest clear sky, while people sit two floors down. Treating those as one “home install” without a cable and Wi‑Fi plan creates a strong signal in the unused box room."),
        H2("Dish on the upper roof"),
        P("Upper roofs often see more sky than a ground-floor wall, but they also mean more climbing, more water tanks, and sometimes a second household’s equipment. Confirm who controls the roof."),
        H2("Router downstairs"),
        P("If the family lives on the ground floor, putting the router in an upstairs store because the cable ran out is a common mistake. Plan cable length first, or use a wired drop and premises Wi‑Fi."),
        H2("Between floors"),
        P("Concrete slabs eat Wi‑Fi. Mesh or a wired backbone is often required for a whole duplex. That is a [Wi‑Fi networking](/services/wifi-networking) conversation, not a promise that the stock router covers every bedroom."),
    ],
)

add(
    "articles-residential.ts",
    researchId="R09",
    title="Rainy season and harmattan considerations for Starlink installs",
    seoTitle="Starlink in Nigeria’s rainy season and harmattan | Skylink",
    seoDescription="How Nigerian rainy season storms and harmattan dust affect Starlink mounts, sealing, obstruction and maintenance.",
    excerpt="Seasonal planning notes that apply nationwide, without duplicating city location pages.",
    category="residential",
    primaryKeyword="starlink rainy season nigeria",
    hero=IMG_R3,
    alt="Starlink pole mount in an outdoor installation setting",
    relatedServicePaths=[("/services/residential-installation", "Residential installation"), ("/services/relocation", "Relocation"), ("/faq", "FAQ"), ("/contact", "Contact")],
    relatedIds=["R05", "T08", "T13", "R04"],
    cta=("Install before peak rains?", "Scheduling is confirmed per enquiry — describe access and roof type.", "/contact?intent=quote", "Enquire"),
    blocks=[
        P("Nigeria’s weather is not a single climate. Coastal rain, hinterland storms and harmattan dust each stress mounts, seals and sky view in different ways. Plan the physical install for the season you will actually live through."),
        H2("Rainy season"),
        UL("Seal cable entries before the first heavy rains.", "Check that poles and brackets can take wind, not only static weight.", "Expect trees to fill in — re-check obstructions after canopy growth.", "Keep low equipment out of flood-prone ground runs."),
        H2("Harmattan"),
        P("Dust coats terminals and can tempt people into unsafe cleaning. Use gentle, official-care style cleaning only; do not soak electronics. See [harmattan maintenance](/blog/starlink-harmattan-dust-maintenance-nigeria)."),
        H2("Storms"),
        P("If a dish has shifted after a storm, do not force the motor. Book a remount assessment rather than bracing it with timber."),
        N("This article does not guarantee weather windows or same-week visits in every state."),
    ],
)

add(
    "articles-residential.ts",
    researchId="R11",
    title="How long a residential Starlink installation takes in Nigeria",
    seoTitle="How long does Starlink installation take in Nigeria? | Skylink",
    seoDescription="What affects Starlink install duration in Nigeria: access, permissions, mount type, cable runs and power — without same-day guarantees.",
    excerpt="A realistic timeline explainer: factors, not a stopwatch promise.",
    category="residential",
    primaryKeyword="how long starlink installation nigeria",
    hero=IMG_R4,
    alt="Professional Starlink installation context on a building exterior",
    relatedServicePaths=[("/services/residential-installation", "Residential installation"), ("/contact", "Contact"), ("/faq", "FAQ")],
    relatedIds=["R01", "R02", "R20"],
    cta=("Want a scoped visit?", "Share property type and whether approvals are already in writing.", "/contact?intent=quote", "Request a quote"),
    blocks=[
        P("People search “same-day Starlink installation” because they have already bought a kit. Time on site depends on access, mount type, cable length and whether the estate will let anyone on the roof."),
        N("Skylink does not promise same-day attendance for every Nigerian address. Scheduling is confirmed per enquiry."),
        H2("What is usually quick"),
        P("A house with written roof permission, a clear slab, short cable and working power can be a relatively short attended job once the crew is on site."),
        H2("What stretches the day — or the week"),
        UL("Locked roofs and absent facility managers.", "Need for a pole because trees block the slab.", "Long duplex cable routes.", "Power that will not stay up for testing.", "Traffic and gate procedures in large cities."),
        H2("Before the visit"),
        P("Quotation and survey conversations happen first. The [checklist](/blog/starlink-installation-checklist-nigeria) and [site survey explainer](/blog/starlink-site-survey-nigeria) describe that sequence."),
        H2("After the crew leaves"),
        P("Account activation and plan eligibility remain Starlink’s process. Physical handover is not the same as a confirmed subscription on every address."),
    ],
)

add(
    "articles-residential.ts",
    researchId="R13",
    title="Starlink Wi-Fi dead zones in large Nigerian compounds",
    seoTitle="Fix Starlink Wi-Fi dead zones in Nigerian compounds | Skylink",
    seoDescription="Why large Nigerian compounds have Starlink Wi-Fi dead zones and how mesh, placement and wired drops help — without invented coverage radii.",
    excerpt="Separate “the dish is online” from “every building on the plot has Wi‑Fi.”",
    category="residential",
    primaryKeyword="starlink wifi dead zones nigeria",
    hero=IMG_WF,
    alt="Indoor networking equipment context for Starlink Wi-Fi planning",
    relatedServicePaths=[("/services/wifi-networking", "Wi‑Fi networking"), ("/services/estate-wifi", "Estate Wi-Fi"), ("/products", "Products"), ("/contact", "Contact")],
    relatedIds=["R14", "E05", "B05", "R08"],
    cta=("Need compound coverage?", "List the buildings that must have Wi‑Fi, not only the router room.", "/contact?intent=quote", "Discuss networking"),
    blocks=[
        P("A Starlink terminal can be healthy while the boys’ quarters, kitchen annex and far bedroom still have no usable Wi‑Fi. Nigerian compounds are wide, walled and full of concrete — a single indoor router was not designed as a campus system."),
        H2("Find the dead zone cause"),
        UL("Router hidden in a steel burglar-proof store.", "Distance across a courtyard.", "Thick slabs between floors.", "The dish online but the Wi‑Fi name on the wrong floor."),
        H2("What usually helps"),
        P("Move the router to a central, ventilated living area; add mesh nodes where the manufacturer supports them; or run a wired backbone to another access point. See [mesh options](/blog/starlink-mesh-router-nigeria) and [router placement](/blog/starlink-router-placement-nigeria)."),
        H2("Estate-scale is a different job"),
        P("Sharing one kit across many dwellings is [estate Wi‑Fi](/services/estate-wifi) scope, not a mesh node in one parlour."),
        N("We do not publish metre coverage guarantees. Walls and interference vary."),
    ],
)

add(
    "articles-residential.ts",
    researchId="R14",
    title="Choosing router placement after a Starlink dish install",
    seoTitle="Where to put the Starlink router in a Nigerian home | Skylink",
    seoDescription="Router placement after a Starlink install in Nigeria: power, ventilation, Wi‑Fi reach and when a wired drop makes more sense.",
    excerpt="The indoor box needs as much thought as the roof mount.",
    category="residential",
    primaryKeyword="starlink router placement nigeria",
    hero=IMG_WF,
    alt="Indoor networking equipment context for Starlink Wi-Fi planning",
    relatedServicePaths=[("/services/wifi-networking", "Wi‑Fi networking"), ("/services/residential-installation", "Residential installation"), ("/products", "Products")],
    relatedIds=["R13", "E07", "R08"],
    cta=("Router in the wrong room?", "Describe the dish-to-living-room path when you enquire.", "/contact", "Contact Skylink"),
    blocks=[
        P("After the dish is tight, many homes still hide the router where the cable happened to enter — a generator passage or an upstairs box room. That decision shows up later as “Starlink is slow” when the problem is Wi‑Fi, not the sky."),
        H2("Good indoor placement"),
        UL("Ventilated, off the floor, away from cookers and water.", "On a circuit that survives generator changeover if you need uptime.", "Central to the rooms people actually use.", "Not inside a metal cabinet."),
        H2("When the cable forces a bad room"),
        P("Use a longer correct-generation outdoor cable, or a wired Ethernet drop to a better access point, rather than stretching Wi‑Fi through two concrete floors. Official Starlink accessories and third-party Wi‑Fi design are different conversations — see [ethernet adapter notes](/blog/starlink-ethernet-adapter-nigeria)."),
    ],
)

add(
    "articles-residential.ts",
    researchId="R15",
    title="Starlink for rural and peri-urban Nigerian households",
    seoTitle="Starlink for rural and peri-urban homes in Nigeria | Skylink",
    seoDescription="Planning Starlink for rural and peri-urban Nigerian homes: power, access, sky view and why a published city page is not a village visit promise.",
    excerpt="Home-focused rural planning without inventing coverage maps or NGO case studies.",
    category="residential",
    primaryKeyword="starlink rural nigeria home",
    hero=IMG_R3,
    alt="Starlink pole mount in an outdoor installation setting",
    relatedServicePaths=[("/services/residential-installation", "Residential installation"), ("/locations", "Service areas"), ("/services/backup-power", "Backup power"), ("/contact", "Contact")],
    relatedIds=["R10", "R01", "L05"],
    cta=("Rural or outskirts address?", "Name the town and power setup. Attendance is confirmed per enquiry.", "/contact?intent=quote", "Enquire"),
    blocks=[
        P("Rural and peri-urban homes often have clearer sky than Lagos island plots, and weaker grid power. The install problem shifts from neighbour shading to access, cable length across large compounds, and keeping the router alive on generator or inverter."),
        H2("Sky view is easier — logistics are not"),
        P("A farm house with open land still needs a firm mount, a sealed cable, and someone present for handover. Dirt roads and distance affect scheduling. A [service area page](/locations) is not a promise that every village is visited on the same timeline."),
        H2("Power is the usual limiter"),
        P("If the grid is rare, design [inverter/generator power](/blog/starlink-generator-inverter-power-nigeria) with the install, not after the first blackout."),
        H2("What to send"),
        UL("Nearest town and landmark.", "How you currently power lights and phones.", "Whether you already own a kit.", "Photos of the compound roof if safe."),
    ],
)

add(
    "articles-residential.ts",
    researchId="R16",
    title="Documenting roof access and safety before Starlink work",
    seoTitle="Roof access and safety before a Starlink install in Nigeria | Skylink",
    seoDescription="A practical roof-access checklist before Starlink work: keys, fragile sheets, height, estate rules — without invented safety certifications.",
    excerpt="What homeowners should prepare so a crew is not guessing on an unsafe roof.",
    category="residential",
    primaryKeyword="starlink roof access nigeria",
    hero=IMG_R2,
    alt="Starlink terminal mounted on a tiled residential roof",
    relatedServicePaths=[("/services/residential-installation", "Residential installation"), ("/contact", "Contact"), ("/faq", "FAQ")],
    relatedIds=["R04", "R01", "R03"],
    cta=("Flag access constraints early", "Tell us about fragile sheets, height or locked roofs when you enquire.", "/contact?intent=survey", "Discuss access"),
    blocks=[
        P("Most Starlink mounts happen above head height. Nigerian roofs add heat, brittle sheets and informal ladders. Documenting access before a visit protects people and the building."),
        N("Skylink does not claim named safety certifications on this page. Work is scoped around the actual roof you have."),
        H2("Homeowner checklist"),
        UL("Who holds roof keys or hatch access?", "Is the sheet strong enough to walk, or only to look?", "Any overhead lines near the proposed pole?", "Estate rules on contractors and working hours?", "A ground contact person on the day."),
        H2("What “unsafe” looks like"),
        P("Rotten timber, steep tiles with no edge protection, or a roof that can only be reached across a neighbour’s property. Those jobs need a different method — or a wall/pole alternative — not bravado."),
        H2("Why this belongs in the quote conversation"),
        P("Access equipment and extra time are quotation factors. Surprising a crew at the gate with “the roof is locked” wastes the visit."),
    ],
)

add(
    "articles-residential.ts",
    researchId="R17",
    title="What happens during Starlink activation handover in Nigeria",
    seoTitle="Starlink installation handover and activation in Nigeria | Skylink",
    seoDescription="What a Skylink Starlink handover usually covers: app checks, Wi‑Fi name, power notes and what remains Starlink’s account process.",
    excerpt="Separate physical install completion from Starlink’s own account activation rules.",
    category="residential",
    primaryKeyword="starlink activation handover nigeria",
    hero=IMG_SAL,
    alt="Starlink sales and installation equipment context",
    relatedServicePaths=[("/services/sales-installation", "Sales and installation"), ("/services/residential-installation", "Residential installation"), ("/support", "Support"), ("/contact", "Contact")],
    relatedIds=["R01", "T15", "T09", "E03"],
    cta=("Buying kit and install together?", "Use a product or quote enquiry and say whether the account is already created.", "/contact?intent=product", "Start an enquiry"),
    blocks=[
        P("Handover is the quiet end of a good install: you should know where the router lives, how to open the Starlink app, and who to call if the mount fails. Activation of the subscription is still Starlink’s process for your account and address."),
        H2("Typical physical handover"),
        OL("Confirm the dish is tracking and the app is not showing a cable fault.", "Show the Wi‑Fi name location in the app.", "Note the circuit used for power.", "Leave the property as agreed (sealant, trunking, debris)."),
        H2("What the technician cannot override"),
        P("Plan eligibility, service address rules and billing live in Starlink’s systems. A tidy mount does not force a residential plan onto an address that Starlink offers differently. Check current options in the official app or starlink.com."),
        H2("If you bought hardware elsewhere"),
        P("Bring account access and kit generation details. [Sales and installation](/services/sales-installation) is the path when supply and mounting are combined."),
    ],
)

add(
    "articles-residential.ts",
    researchId="R18",
    title="Relocating Starlink when you move house in Nigeria",
    seoTitle="Relocate Starlink to a new house in Nigeria | Skylink",
    seoDescription="How to move a Starlink kit in Nigeria: take-down, remount, sky-view check and Starlink service-address rules — without invented reactivation fees.",
    excerpt="Physical remount and account address are two different jobs.",
    category="residential",
    primaryKeyword="starlink relocation nigeria",
    hero=IMG_REL,
    alt="Starlink relocation and remount service context",
    relatedServicePaths=[("/services/relocation", "Relocation"), ("/contact", "Contact"), ("/faq", "FAQ"), ("/support", "Support")],
    relatedIds=["T12", "R05", "R03"],
    cta=("Moving house?", "Share old and new property types. Address rules are checked against current Starlink terms.", "/contact?intent=quote", "Request relocation help"),
    blocks=[
        P("Moving house with Starlink means taking the kit down without destroying the cable, then treating the new roof as a fresh survey. It also means telling Starlink about the service address — a step installers do not control."),
        H2("Physical move"),
        UL("Photograph cable routing before disconnecting.", "Protect connectors in transit.", "Do not drag a mounted dish across sheets.", "Plan sky view at the new house before drilling."),
        H2("Service address"),
        P("Starlink’s current terms decide whether a plan can move with you, whether a new address is offered residential or another class, and what the app requires. Read the official account tools; Skylink will not invent a workaround."),
        H2("New estate, new permission"),
        P("A previous landlord’s approval does not travel. Restart the [apartment/estate conversation](/blog/starlink-apartment-estate-approval-nigeria) at the new property."),
        H2("Skylink’s role"),
        P("[Relocation](/services/relocation) is the published service for take-down and remount. Availability still follows enquiry, not a nationwide calendar."),
    ],
)

add(
    "articles-residential.ts",
    researchId="R19",
    title="Starlink for Nigerian home offices and remote workers",
    seoTitle="Starlink for home offices and remote work in Nigeria | Skylink",
    seoDescription="Plan Starlink for Nigerian remote workers: power, Wi‑Fi in the desk room, backup thinking and when a home install is enough.",
    excerpt="Home-office buyers need uptime and a usable desk network — not only a dish on the roof.",
    category="residential",
    primaryKeyword="starlink home office nigeria",
    hero=IMG_R,
    alt="Starlink dish and outdoor antenna on wall brackets during a residential mounting job",
    relatedServicePaths=[("/services/residential-installation", "Residential installation"), ("/services/business-connectivity", "Business connectivity"), ("/services/backup-power", "Backup power"), ("/contact", "Contact")],
    relatedIds=["R10", "R14", "B01", "T11"],
    cta=("Working from home on Starlink?", "Describe desk location and power backup when you enquire.", "/contact?intent=quote", "Request a quote"),
    blocks=[
        P("Remote workers in Nigeria often buy Starlink after fibre disappoints or never arrives. The job still fails if the router sits in a corridor while the desk is two rooms away, or if the inverter drops every time the generator starts."),
        H2("Desk-first planning"),
        UL("Which room is the office?", "Is that room on protected power?", "Do video calls matter more than compound-wide Wi‑Fi?", "Is this strictly residential, or a small registered office?"),
        H2("Power"),
        P("A two-hour meeting cannot sit on a router that reboots at changeover. Pair this with [generator/inverter planning](/blog/starlink-generator-inverter-power-nigeria)."),
        H2("When it becomes a business install"),
        P("Several staff, guest Wi‑Fi, or a shop attached to the house may belong under [business connectivity](/services/business-connectivity) rather than a simple home mount."),
    ],
)

add(
    "articles-residential.ts",
    researchId="R20",
    title="Questions to ask a Starlink installer before you book",
    seoTitle="Questions to ask a Starlink installer in Nigeria | Skylink",
    seoDescription="A buyer checklist of questions for Nigerian Starlink installers: kit generation, permissions, power, quotation factors and what happens after handover.",
    excerpt="Use these questions to compare installers without relying on unverifiable badges.",
    category="residential",
    primaryKeyword="questions for starlink installer nigeria",
    hero=IMG_R4,
    alt="Professional Starlink installation context on a building exterior",
    relatedServicePaths=[("/contact", "Contact"), ("/services/residential-installation", "Residential installation"), ("/our-work", "Installation examples"), ("/faq", "FAQ")],
    relatedIds=["R01", "R12", "N07", "E08"],
    cta=("Ask Skylink these on an enquiry", "Send property type, kit status and access notes — we will answer what we can confirm.", "/contact", "Contact Skylink"),
    blocks=[
        P("Installer marketing in Nigeria is noisy. A short question list protects you more than a logo on a flyer. You are hiring mounting, sealing, cabling and honest scoping — not a miracle activation."),
        H2("Kit and generation"),
        UL("Do you confirm Gen 2 vs Gen 3 before quoting cables?", "Will you install a kit I already own?", "How do you handle incomplete kits?"),
        H2("Site"),
        UL("Do you check sky view at the mount position?", "What if the estate refuses the roof?", "Who supplies poles, trunking and sealant?"),
        H2("Money and time — without invented naira"),
        P("Ask what changes the quotation (access, pole, cable length, power work). Be wary of a single nationwide “install price” that ignores those factors. Skylink quotes from the actual site conversation."),
        H2("Aftercare"),
        UL("Who do I call if the cable is chewed in two weeks?", "Do you remount, or only first installs?", "Is subscription billing yours or Starlink’s? (It is Starlink’s.)"),
        H2("Trust"),
        P("Ask to see published service pages and [installation examples](/our-work) with honest captions. Do not accept “authorised partner” claims you cannot verify."),
    ],
)

EXPORTS = {
    "articles-residential.ts": "residentialArticles",
    "articles-equipment.ts": "equipmentArticles",
    "articles-troubleshooting.ts": "troubleshootingArticles",
    "articles-business.ts": "businessArticles",
    "articles-local.ts": "localArticles",
    "articles-maritime.ts": "maritimeArticles",
    "articles-news-forecast.ts": "newsForecastArticles",
}

if __name__ == "__main__":
    for filename, export_name in EXPORTS.items():
        items = articles_by_file[filename]
        if items:
            dump(filename, export_name, items)
        else:
            print("skip empty", filename)
