#!/usr/bin/env python3
"""Remaining article bodies (equipment through troubleshooting)."""
import importlib.util
from pathlib import Path

_spec = importlib.util.spec_from_file_location(
    "gen_articles", Path(__file__).resolve().parent / "generate-remaining-articles.py"
)
_g = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_g)
EXPORTS = _g.EXPORTS
IMG_ACC = _g.IMG_ACC
IMG_BOAT = _g.IMG_BOAT
IMG_BP = _g.IMG_BP
IMG_BIZ = _g.IMG_BIZ
IMG_ENT = _g.IMG_ENT
IMG_EST = _g.IMG_EST
IMG_FLT = _g.IMG_FLT
IMG_HP = _g.IMG_HP
IMG_HSE = _g.IMG_HSE
IMG_HUB = _g.IMG_HUB
IMG_LR = _g.IMG_LR
IMG_MAR = _g.IMG_MAR
IMG_R = _g.IMG_R
IMG_R2 = _g.IMG_R2
IMG_R3 = _g.IMG_R3
IMG_R4 = _g.IMG_R4
IMG_REL = _g.IMG_REL
IMG_SAL = _g.IMG_SAL
IMG_SD = _g.IMG_SD
IMG_WF = _g.IMG_WF
IMG_WISP = _g.IMG_WISP
P, H2, H3, UL, OL, T, N = _g.P, _g.H2, _g.H3, _g.UL, _g.OL, _g.T, _g.N
add = _g.add
articles_by_file = _g.articles_by_file
dump = _g.dump

# EQUIPMENT
add("articles-equipment.ts", researchId="E02",
    title="Starlink Flat High Performance vs Standard dish in Nigeria",
    seoTitle="Starlink Flat High Performance vs Standard in Nigeria | Skylink",
    seoDescription="When Nigerian land enterprise and maritime sites need Flat High Performance hardware versus a standard residential-class dish.",
    excerpt="A use-case comparison tied to published Skylink products — not a price table.",
    category="equipment", primaryKeyword="flat high performance vs standard starlink nigeria",
    hero=IMG_HP, alt="High-performance Starlink terminal on a rooftop",
    relatedServicePaths=[("/products/starlink-flat-high-performance", "Flat High Performance"), ("/products/starlink-gen3-standard", "Gen 3 Standard"), ("/services/maritime-offshore", "Maritime"), ("/services/enterprise-plans", "Enterprise plans"), ("/contact", "Contact")],
    relatedIds=["E01", "E15", "M03", "B03"],
    cta=("Unsure which hardware class?", "Describe land vs vessel use and we will scope against published catalogue options.", "/contact?intent=product", "Enquire about hardware"),
    blocks=[
        P("Standard residential-class dishes and Flat High Performance hardware are built for different duty cycles. Nigerian buyers mix them up because both are “Starlink.” The useful question is whether the site is a home roof or a higher-demand enterprise/marine environment."),
        N("Confirm current specifications and plan pairing on starlink.com and Skylink product pages. This article does not invent naira prices or throughput guarantees."),
        H2("Standard-class dishes"),
        P("Typical for homes and many small offices with a conventional mount, indoor router and moderate concurrent use. See [Mini vs Standard](/blog/starlink-mini-vs-standard-nigeria) if portability is the real debate."),
        H2("Flat High Performance"),
        P("Aimed at demanding land and maritime contexts: different form factor, different mounting and often a different commercial conversation. Skylink lists it in the catalogue for sites that need that class — including [maritime](/services/maritime-offshore) work after survey."),
        H2("Land enterprise vs marine"),
        P("A factory roof is not a crew boat. Vibration, salt and access rules can push a site toward HP-class hardware even if a standard dish would “see the sky.” Conversely, a quiet bungalow does not become an HP project by default."),
        H2("How Skylink scopes this"),
        P("We match published products to the environment you describe. Plan eligibility remains Starlink’s decision for the service address or vessel."),
    ])

add("articles-equipment.ts", researchId="E03",
    title="Understanding Starlink kits sold in Nigeria",
    seoTitle="What is in a Starlink kit in Nigeria? | Skylink",
    seoDescription="What Nigerian buyers should expect in a Starlink kit: terminal, power, router, generation-correct cable — and why incomplete kits fail installs.",
    excerpt="A high-level kit explainer that points at the catalogue rather than grey-market rumours.",
    category="equipment", primaryKeyword="starlink kits nigeria",
    hero=IMG_SAL, alt="Starlink sales and installation equipment context",
    relatedServicePaths=[("/products", "Products"), ("/services/sales-installation", "Sales and installation"), ("/contact", "Contact")],
    relatedIds=["E08", "E01", "R17"],
    cta=("Want kit plus installation?", "Say whether you already own hardware.", "/contact?intent=product", "Product enquiry"),
    blocks=[
        P("A “Starlink kit” in Nigerian marketplace language can mean anything from a complete current-generation set to a dish with the wrong cable. Buyers should think in parts and generation, then decide whether [sales and installation](/services/sales-installation) should be one job."),
        H2("What a complete kit generally includes"),
        UL("The terminal (dish) for that product line.", "The power supply path designed for that terminal.", "A router or the networking arrangement that product ships with.", "The outdoor cable that matches that generation."),
        H2("Generation mismatches"),
        P("Gen 3 cables do not fit Gen 2 terminals. Accessories are not universal. Confirm before you pay."),
        H2("Authenticity"),
        P("See [spotting incomplete kits](/blog/genuine-starlink-kit-nigeria). Skylink publishes catalogue items; we do not authenticate every roadside offer."),
        H2("Activation is separate"),
        P("Owning a box does not guarantee the address can take the plan you hoped for. Check Starlink’s official availability tools."),
    ])

add("articles-equipment.ts", researchId="E04",
    title="When Nigerian homes need a Starlink Gen 3 45 m cable",
    seoTitle="Starlink Gen 3 45 m cable for Nigerian homes | Skylink",
    seoDescription="When a standard Starlink cable is too short on Nigerian duplexes and compounds, and how the published 45 m Gen 3 cable fits.",
    excerpt="Cable length as an install factor — generation-correct only.",
    category="equipment", primaryKeyword="starlink 45m cable nigeria",
    hero=IMG_ACC, alt="Starlink accessories and cabling context",
    relatedServicePaths=[("/products/starlink-gen3-45m-cable", "45 m Gen 3 cable"), ("/products", "Products"), ("/services/residential-installation", "Residential installation")],
    relatedIds=["R06", "R08", "E12"],
    cta=("Cable too short?", "Confirm kit generation before ordering a longer lead.", "/contact?intent=product", "Enquire"),
    blocks=[
        P("Standard kit cables are sized for typical houses, not every Nigerian duplex or compound. When the only clear sky is a far roof and the router must sit in a downstairs parlour, length becomes the project."),
        N("Skylink lists a 45-metre Gen 3 cable in the product catalogue. It is not for Gen 2. Check the published product page for the current description."),
        H2("Signs you need a longer lead"),
        UL("Dish and router rooms are on different buildings.", "The short cable forces the router into a useless corridor.", "You are considering unsafe mid-span joints."),
        H2("What not to use"),
        P("Random outdoor Ethernet is not a drop-in Starlink terminal cable. Wrong connectors create [cable disconnected](/blog/starlink-cable-disconnected-nigeria) faults."),
        H2("Install pairing"),
        P("Longer cables still need sealing, drip loops and rodent protection. Length without routing is just a more expensive chew toy."),
    ])

add("articles-equipment.ts", researchId="E05",
    title="Starlink mesh router options for Nigerian homes and offices",
    seoTitle="Starlink mesh Wi-Fi in Nigerian homes and offices | Skylink",
    seoDescription="When Starlink mesh nodes help Nigerian homes and small offices, and when premises Wi-Fi design is the real job.",
    excerpt="Mesh is a coverage tool, not a substitute for a bad router hiding in a store.",
    category="equipment", primaryKeyword="starlink mesh router nigeria",
    hero=IMG_WF, alt="Indoor networking equipment context for Starlink Wi-Fi planning",
    relatedServicePaths=[("/products/starlink-mesh-router", "Starlink mesh router"), ("/services/wifi-networking", "Wi-Fi networking"), ("/products", "Products"), ("/contact", "Contact")],
    relatedIds=["R13", "R14", "E09"],
    cta=("Dead zones after install?", "List rooms that fail, not just the dish status.", "/contact?intent=quote", "Discuss Wi-Fi"),
    blocks=[
        P("Starlink’s own mesh nodes exist to extend the kit’s Wi‑Fi. Nigerian compounds often need that — or a broader premises design. Start by placing the primary router well; mesh cannot rescue a metal cupboard."),
        H2("When mesh is a fit"),
        P("One household, a few extra rooms, and a compatible official mesh product. See the [published mesh listing](/products/starlink-mesh-router) for catalogue details."),
        H2("When mesh is not enough"),
        P("Multiple buildings, guest networks, CCTV VLANs or estate sharing belong under [Wi‑Fi networking](/services/wifi-networking) or [estate Wi‑Fi](/services/estate-wifi)."),
        H2("Compatibility"),
        P("Match mesh hardware to the router generation you own. Do not mix unrelated consumer extenders and assume they are “Starlink mesh.”"),
    ])

add("articles-equipment.ts", researchId="E06",
    title="Pivot mounts and accessories for Nigerian Starlink installs",
    seoTitle="Starlink pivot mounts and accessories in Nigeria | Skylink",
    seoDescription="How pivot mounts, poles and accessories show up in Nigerian Starlink installs, linked to Skylink’s accessories service and catalogue.",
    excerpt="Accessories are part of a scoped mount, not impulse add-ons.",
    category="equipment", primaryKeyword="starlink pivot mount nigeria",
    hero=IMG_ACC, alt="Starlink accessories and cabling context",
    relatedServicePaths=[("/services/accessories", "Accessories"), ("/products/starlink-pivot-mount", "Pivot mount"), ("/products", "Products"), ("/contact", "Contact")],
    relatedIds=["R04", "E12", "R16"],
    cta=("Need mounts with the install?", "Describe roof type so accessories can be scoped.", "/contact?intent=product", "Enquire"),
    blocks=[
        P("Nigerian roofs rarely match a single brochure bracket. Pivot mounts, poles and hardware kits exist because sky view and structure disagree. Buy accessories for the kit generation and the surface you have."),
        H2("Pivot and pipe-style mounts"),
        P("Useful when the dish must sit off the sheet or clear a parapet. Wind loading still matters — a pivot is not a licence to fly a sail on a weak purlin. See the [pivot product page](/products/starlink-pivot-mount) for the published item."),
        H2("What “accessories” includes in a Skylink job"),
        P("[Accessories](/services/accessories) covers the extra hardware conversation around an install: mounts, suitable cabling, mesh, and related catalogue items — quoted for the site, not as a mystery bundle."),
        H2("Coastal note"),
        P("Salt air punishes cheap fasteners. Accessory quality is part of coastal and maritime-adjacent land installs too."),
    ])

add("articles-equipment.ts", researchId="E07",
    title="Ethernet adapter setups for Starlink in Nigeria",
    seoTitle="Starlink Ethernet adapter setups in Nigeria | Skylink",
    seoDescription="When Nigerian homes and offices use a wired Starlink connection: adapter roles, router placement and premises networking — without unofficial bypass recipes.",
    excerpt="A wired drop for offices and weak Wi-Fi rooms, scoped as network design.",
    category="equipment", primaryKeyword="starlink ethernet adapter nigeria",
    hero=IMG_WF, alt="Indoor networking equipment context for Starlink Wi-Fi planning",
    relatedServicePaths=[("/services/wifi-networking", "Wi-Fi networking"), ("/services/business-connectivity", "Business connectivity"), ("/products", "Products")],
    relatedIds=["R14", "E09", "B04"],
    cta=("Need a wired office drop?", "Describe the comms room and user count.", "/contact?intent=quote", "Discuss networking"),
    blocks=[
        P("Wi‑Fi is convenient; offices and some homes still want a cable to a switch, access point or desk. Starlink’s accessory set has included Ethernet options on various kits — confirm what your generation actually supports in official documentation."),
        H2("Why wire at all"),
        UL("A comms closet far from the living-room router.", "CCTV or till networks that should not rely on a phone’s Wi‑Fi.", "Mesh backhaul where walls are hostile."),
        H2("What we will not publish"),
        P("Unofficial “bypass recipes” go stale and can break kits. If you need third-party routers, read [router vs third-party Wi‑Fi](/blog/starlink-router-vs-third-party-wifi-nigeria) and current Starlink networking notes for your hardware."),
        H2("Skylink’s angle"),
        P("We treat Ethernet as part of premises design on [Wi‑Fi networking](/services/wifi-networking) and office jobs — not as a gadget upsell disconnected from the mount."),
    ])

add("articles-equipment.ts", researchId="E09",
    title="Starlink router vs third-party Wi-Fi for Nigerian premises",
    seoTitle="Starlink router vs third-party Wi-Fi in Nigeria | Skylink",
    seoDescription="When to keep Starlink’s router and when Nigerian premises need third-party Wi-Fi — confirming current bypass options in official docs for your kit.",
    excerpt="Conservative networking guidance: check your hardware generation before replacing the stock router.",
    category="equipment", primaryKeyword="starlink router vs third party nigeria",
    hero=IMG_WF, alt="Indoor networking equipment context for Starlink Wi-Fi planning",
    relatedServicePaths=[("/services/wifi-networking", "Wi-Fi networking"), ("/services/business-connectivity", "Business connectivity"), ("/contact", "Contact")],
    relatedIds=["E05", "E07", "B04"],
    cta=("Designing premises Wi-Fi?", "Tell us kit generation and how many buildings need coverage.", "/contact?intent=quote", "Talk to Skylink"),
    blocks=[
        P("Some Nigerian offices want their own firewall and access points. Whether you can put the Starlink kit behind or beside that network depends on hardware generation and Starlink’s current settings — which change. This page will not freeze a bypass recipe that official docs may later contradict."),
        H2("Keep the stock router when"),
        UL("It is a single household.", "Wi‑Fi reach is acceptable after good placement.", "Nobody is asking for VLANs and guest isolation."),
        H2("Consider third-party Wi-Fi when"),
        UL("You already have a managed office network.", "Several floors or buildings must be covered.", "You need clearer separation of staff and guest traffic."),
        H2("Confirm before you buy gear"),
        P("Open current Starlink support documentation for your exact terminal/router. If bypass or Ethernet WAN modes exist for that kit, follow official steps. Skylink can design the premises side once the WAN behaviour is known."),
        N("Unsupported firmware hacks are out of scope."),
    ])

add("articles-equipment.ts", researchId="E10",
    title="Long-range Wi-Fi with Starlink backhaul in Nigeria",
    seoTitle="Long-range Wi-Fi from a Starlink uplink in Nigeria | Skylink",
    seoDescription="When Nigerian compounds and sites use long-range Wi-Fi with Starlink as the backhaul, and how that differs from a home mesh node.",
    excerpt="Backhaul versus last-mile Wi-Fi — scoped under Skylink’s long-range service.",
    category="equipment", primaryKeyword="starlink long range wifi nigeria",
    hero=IMG_LR, alt="Long-range wireless networking equipment context",
    relatedServicePaths=[("/services/long-range-wifi", "Long-range Wi-Fi"), ("/services/wisp-setup", "WISP setup"), ("/products", "Products"), ("/contact", "Contact")],
    relatedIds=["B05", "B06", "R13"],
    cta=("Linking buildings across a plot?", "Describe distances and line of sight — no coverage guarantee from this page.", "/contact?intent=survey", "Request a discussion"),
    blocks=[
        P("A Starlink dish brings a wide-area link to one building. Getting usable Wi‑Fi to a distant warehouse or gatehouse is a radio and cabling problem. That is what [long-range Wi‑Fi](/services/long-range-wifi) is for — not a consumer extender on a stick."),
        H2("When this is the right conversation"),
        UL("Clear or manageable line of sight between buildings.", "A compound too large for indoor mesh.", "A site that already has Starlink (or will) as the uplink."),
        H2("Limits"),
        P("Trees, zinc roofs and harmattan haze affect radios. Distances in marketing for generic repeaters are not a site survey. Line of sight is checked on the ground."),
        H2("Related services"),
        P("Estate-scale sharing and WISP-style distribution are adjacent but not identical. See [estate Wi‑Fi](/blog/starlink-estate-wifi-nigeria) and [WISP notes](/blog/starlink-wisp-nigeria)."),
    ])

add("articles-equipment.ts", researchId="E11",
    title="Power supplies and PoE considerations around Starlink gear",
    seoTitle="Starlink power supplies and PoE in Nigeria | Skylink",
    seoDescription="Nigerian power-quality issues around Starlink supplies: surges, generator changeover and why random PoE injectors are not a kit substitute.",
    excerpt="Treat the power brick as part of the install, especially on unstable grids.",
    category="equipment", primaryKeyword="starlink power supply nigeria",
    hero=IMG_BP, alt="Backup power equipment context relevant to Starlink installations",
    relatedServicePaths=[("/services/backup-power", "Backup power"), ("/support", "Support"), ("/faq", "FAQ")],
    relatedIds=["R10", "T05", "E12"],
    cta=("Unstable power?", "Describe generator/inverter setup with your enquiry.", "/contact?intent=quote", "Discuss backup power"),
    blocks=[
        P("Starlink kits ship with a specific power path. Nigerian sites add surges, long extension leads and generator changeovers. Many “dead dish” reports are power-path failures, not sky problems."),
        H2("Use the intended supply"),
        P("Do not replace the kit power supply with a random adaptor “of similar volts.” PoE injectors for other radios are not automatically compatible with a Starlink terminal."),
        H2("Grid quality"),
        P("Put the supply on a protected outlet if the site already uses UPS or inverter for computing. See [generator and inverter planning](/blog/starlink-generator-inverter-power-nigeria)."),
        H2("Heat and ventilation"),
        P("Power bricks in sealed generator houses overheat. Give them air."),
    ])

add("articles-equipment.ts", researchId="E12",
    title="Choosing Starlink accessories after the dish is installed",
    seoTitle="Starlink accessories after installation in Nigeria | Skylink",
    seoDescription="A post-install accessories checklist for Nigerian Starlink users: mounts, cables, mesh and power — mapped to Skylink catalogue services.",
    excerpt="Add hardware for a measured problem, not a shopping list.",
    category="equipment", primaryKeyword="starlink accessories nigeria",
    hero=IMG_ACC, alt="Starlink accessories and cabling context",
    relatedServicePaths=[("/services/accessories", "Accessories"), ("/products", "Products"), ("/contact", "Contact")],
    relatedIds=["E04", "E05", "E06", "R07"],
    cta=("Need add-ons after handover?", "Describe the symptom (short cable, dead rooms, chewed lead).", "/contact?intent=product", "Enquire"),
    blocks=[
        P("After a first install, gaps show up: a bedroom with no Wi‑Fi, a cable the rats found, a dish that needs a taller pole. Accessories should map to those gaps."),
        H2("Match symptom to item class"),
        T(["Symptom", "Usually consider"], [
            ["Router too far from life", "Longer correct cable or better placement"],
            ["Rooms dead, dish healthy", "Mesh or premises Wi‑Fi"],
            ["Chewed outdoor lead", "Generation-correct replacement + conduit"],
            ["New obstruction", "Pole/pivot remount — not another router"],
        ]),
        H2("Catalogue first"),
        P("Start from published [products](/products) and [accessories](/services/accessories). Do not mix generations."),
    ])

add("articles-equipment.ts", researchId="E13",
    title="Starlink equipment for temporary sites and events in Nigeria",
    seoTitle="Temporary Starlink for Nigerian events and sites | Skylink",
    seoDescription="Using portable Starlink kits for Nigerian events, site offices and short deployments — power, theft and plan-class caveats.",
    excerpt="Temporary connectivity is a kit-plus-power problem, not a permanent roof mount.",
    category="equipment", primaryKeyword="starlink temporary install nigeria",
    hero=IMG_SAL, alt="Starlink sales and installation equipment context",
    relatedServicePaths=[("/products/starlink-mini", "Starlink Mini"), ("/services/global-roaming", "Global roaming"), ("/contact", "Contact")],
    relatedIds=["B10", "E01", "B13"],
    cta=("Event or site office?", "Say duration, power source and whether the kit must travel.", "/contact?intent=quote", "Enquire"),
    blocks=[
        P("Construction cabins, pop-up events and short landings sometimes need internet for two weeks, not twenty years. Mini-class kits and careful power planning show up here more than a welded roof pole."),
        H2("Plan class versus hardware"),
        P("A portable terminal still needs a Starlink plan that allows the way you will use it. Home-fixed and roam/travel classes differ. Confirm in the official account — Skylink will not invent eligibility."),
        H2("On-the-ground risks"),
        UL("Theft of a visible portable kit.", "Generator-only power at night.", "No safe mount, only a table that gets moved."),
        H2("When it becomes a permanent job"),
        P("If the cabin becomes a two-year site office, treat it as [construction connectivity](/blog/starlink-construction-site-nigeria) with a proper mount."),
    ])

add("articles-equipment.ts", researchId="E14",
    title="Comparing published Starlink hardware options on Skylink",
    seoTitle="Starlink hardware listed by Skylink in Nigeria | Skylink",
    seoDescription="A navigational guide to Starlink hardware Skylink currently lists — dishes, Mini, mounts, mesh and cables — with prices only on product pages.",
    excerpt="Use this as a map to the catalogue, not a second price list.",
    category="equipment", primaryKeyword="starlink hardware nigeria skylink",
    hero=IMG_SAL, alt="Starlink sales and installation equipment context",
    relatedServicePaths=[("/products", "Products"), ("/services/sales-installation", "Sales and installation"), ("/contact", "Contact")],
    relatedIds=["E01", "E02", "E03", "E08"],
    cta=("Ready to match a kit to a site?", "Open Products, then enquire with your use case.", "/contact?intent=product", "Product enquiry"),
    blocks=[
        P("Skylink publishes a hardware catalogue so buyers can see what is listed today. This article is a map. Prices, when shown, live on the product pages — they are not copied here so they cannot drift."),
        H2("Where to look"),
        UL("[All products](/products)", "[Mini](/products/starlink-mini) vs [Standard Gen 3](/products/starlink-gen3-standard)", "[Flat High Performance](/products/starlink-flat-high-performance)", "Cables, mesh and mounts under the same catalogue"),
        H2("Install is not automatic"),
        P("Buying a listed item does not book a roof crew. Combine with [sales and installation](/services/sales-installation) or a residential/business service as needed."),
        N("If a product page is unpublished or out of stock, this article will not invent availability."),
    ])

add("articles-equipment.ts", researchId="E15",
    title="When Nigerian sites need High Performance class hardware",
    seoTitle="When to choose High Performance Starlink hardware in Nigeria | Skylink",
    seoDescription="Signals that a Nigerian enterprise or maritime site may need High Performance class Starlink hardware rather than a home dish.",
    excerpt="Duty cycle and environment — not status shopping.",
    category="equipment", primaryKeyword="starlink high performance nigeria when",
    hero=IMG_HP, alt="High-performance Starlink terminal on a rooftop",
    relatedServicePaths=[("/products/starlink-flat-high-performance", "Flat High Performance"), ("/services/enterprise-plans", "Enterprise plans"), ("/services/maritime-offshore", "Maritime"), ("/contact", "Contact")],
    relatedIds=["E02", "M03", "B03"],
    cta=("Enterprise or vessel site?", "Describe environment and concurrent use. Hardware class is confirmed after scoping.", "/contact?intent=quote", "Discuss hardware class"),
    blocks=[
        P("High Performance class hardware costs more and is heavier to mount. It is justified when the environment or duty cycle exceeds a home terminal — not because a brochure looks serious."),
        H2("Typical triggers for a conversation"),
        UL("Vessel or offshore duty.", "Industrial vibration and exposure.", "Higher concurrent demand that the customer already measures on another link.", "A plan class Starlink offers only with matching hardware — confirm officially."),
        H2("What is not a trigger"),
        P("A three-bedroom house in an estate. Start with standard-class options unless a survey says otherwise."),
        H2("Next reads"),
        P("[Flat HP vs Standard](/blog/starlink-flat-hp-vs-standard-nigeria) and [enterprise plan considerations](/blog/starlink-enterprise-plans-nigeria)."),
    ])

# TROUBLESHOOTING
add("articles-troubleshooting.ts", researchId="T02",
    title="Fixing Starlink cable disconnected errors in Nigeria",
    seoTitle="Starlink cable disconnected errors in Nigeria | Skylink",
    seoDescription="What a Starlink cable disconnected alert often means in Nigeria: reseating, rodent damage, water in connectors and generation-wrong leads.",
    excerpt="Treat cable alerts as physical until proven otherwise.",
    category="troubleshooting", primaryKeyword="starlink cable disconnected nigeria",
    hero=IMG_REL, alt="Starlink relocation and remount service context",
    relatedServicePaths=[("/support", "Support"), ("/services/accessories", "Accessories"), ("/services/relocation", "Relocation"), ("/contact", "Contact")],
    relatedIds=["R07", "R06", "T01", "T12"],
    cta=("Cable damaged?", "Note kit generation before a replacement lead is discussed.", "/contact", "Contact support"),
    blocks=[
        P("A cable-disconnected or similar connector alert is one of the most common Nigerian faults after a working install: heat cycles, rain, rats and a tug on a poorly clipped lead."),
        H2("Safe first checks"),
        OL("Power down as the app/docs recommend.", "Reseat outdoor connectors fully if you can do so safely.", "Look for chewed jackets, kinks and water in the gland.", "Confirm the cable is the correct generation."),
        H2("Do not"),
        P("Do not splice with household tape. Do not mix Gen 2 and Gen 3 leads."),
        H2("When to call"),
        P("If the roof is unsafe, the cable is bitten through, or reseating does nothing, use [support](/support) or [relocation](/services/relocation) rather than living with an intermittent link."),
    ])

add("articles-troubleshooting.ts", researchId="T03",
    title="Why Starlink is slow in Nigeria and what to check first",
    seoTitle="Why is my Starlink slow in Nigeria? | Skylink",
    seoDescription="A first-check list for slow Starlink in Nigeria: obstruction, Wi-Fi, power, congestion and when a remount is the real fix.",
    excerpt="Slow is not one fault. Split sky, Wi-Fi and power before blaming the brand.",
    category="troubleshooting", primaryKeyword="why is my starlink slow nigeria",
    hero=IMG_R4, alt="Professional Starlink installation context on a building exterior",
    relatedServicePaths=[("/support", "Support"), ("/services/wifi-networking", "Wi-Fi networking"), ("/services/residential-installation", "Residential installation"), ("/faq", "FAQ")],
    relatedIds=["T01", "R05", "R13", "T11"],
    cta=("Still slow after these checks?", "Describe app obstruction status and whether Wi-Fi fails in one room only.", "/contact", "Contact Skylink"),
    blocks=[
        P("“Starlink is slow” in Nigeria can mean the dish is obstructed, the Wi‑Fi is weak at the desk, the inverter is sagging, or the satellite path is busy. Fix the local items first; they are the ones an installer can actually change."),
        H2("Check in this order"),
        OL("App obstruction and outage indications.", "Speed on a device next to the router, not at the far boys’ quarters.", "Whether slowness matches generator changeover.", "Whether only one application (VPN, cloud backup) is the bottleneck."),
        H2("Wi-Fi versus WAN"),
        P("If the phone beside the router is fine and the office annex is not, you have a [dead zone](/blog/starlink-wifi-dead-zones-nigeria) problem."),
        H2("What we will not claim"),
        P("No nationwide Mbps average lives on this page. Congestion and plan class vary by time and address. Check Starlink’s own status and plan tools."),
    ])

add("articles-troubleshooting.ts", researchId="T04",
    title="Starlink router lights and status meanings for Nigerian users",
    seoTitle="Starlink router lights and status in Nigeria | Skylink",
    seoDescription="How to read Starlink router and app status in Nigeria, and when lights plus power checks should precede a technician visit.",
    excerpt="Use the app as the source of truth; lights are a prompt, not a full diagnosis.",
    category="troubleshooting", primaryKeyword="starlink red light router nigeria",
    hero=IMG_WF, alt="Indoor networking equipment context for Starlink Wi-Fi planning",
    relatedServicePaths=[("/support", "Support"), ("/faq", "FAQ"), ("/contact", "Contact")],
    relatedIds=["T01", "T05", "T06"],
    cta=("Status stuck after power checks?", "Note what the app says, not only the LED colour.", "/contact", "Contact support"),
    blocks=[
        P("Router LEDs differ slightly by hardware generation. Treat the Starlink app’s status text as the primary signal, and the light as a reason to open the app."),
        H2("Always pair light with power"),
        P("A “dead” router on a dead socket is not a dish failure. Confirm the outlet survives generator changeover."),
        H2("Boot loops"),
        P("Repeated restarting often tracks [power quality](/blog/starlink-keeps-rebooting-nigeria) rather than a software curse."),
        H2("When lights are not enough"),
        P("Cable alerts, obstruction maps and account suspension each have their own articles. Do not factory-reset as the first step."),
        N("Icon colours can change with firmware. Follow in-app wording for your kit."),
    ])

add("articles-troubleshooting.ts", researchId="T05",
    title="Starlink keeps rebooting — common Nigerian causes",
    seoTitle="Starlink keeps rebooting in Nigeria | Skylink",
    seoDescription="Why Starlink kits reboot on Nigerian generator and inverter setups, and what to change before replacing hardware.",
    excerpt="Reboots are often power events wearing a network costume.",
    category="troubleshooting", primaryKeyword="starlink keeps rebooting nigeria",
    hero=IMG_BP, alt="Backup power equipment context relevant to Starlink installations",
    relatedServicePaths=[("/services/backup-power", "Backup power"), ("/support", "Support"), ("/contact", "Contact")],
    relatedIds=["R10", "E11", "T01"],
    cta=("Reboots at changeover?", "Describe UPS/inverter behaviour with your enquiry.", "/contact?intent=quote", "Discuss power"),
    blocks=[
        P("If the kit dies every time the generator starts, you do not have a mysterious satellite fault. You have a transfer-switch gap or a sagging inverter."),
        H2("Common patterns"),
        UL("Changeover brownout lasting long enough to drop the supply.", "Shared inverter overloaded when freezers kick in.", "Loose indoor power brick."),
        H2("What to try"),
        P("Dedicated protected outlet; shorter power lead; stop sharing the Starlink socket with a welding machine. Then read [backup power](/services/backup-power)."),
        H2("When hardware really is bad"),
        P("If power is clean and the kit still loops, escalate via [support](/support) with app diagnostics — not another cheap adaptor."),
    ])

add("articles-troubleshooting.ts", researchId="T06",
    title="Factory reset Starlink router — when Nigerian users should",
    seoTitle="When to factory reset a Starlink router in Nigeria | Skylink",
    seoDescription="When a Starlink factory reset helps in Nigeria, what you will lose, and why it is a poor first step for cable or obstruction faults.",
    excerpt="Reset is a last networking step, not a roof repair.",
    category="troubleshooting", primaryKeyword="factory reset starlink nigeria",
    hero=IMG_WF, alt="Indoor networking equipment context for Starlink Wi-Fi planning",
    relatedServicePaths=[("/support", "Support"), ("/faq", "FAQ")],
    relatedIds=["T09", "T04", "T15"],
    cta=("Unsure whether to reset?", "Describe the app error first.", "/support", "Read support notes"),
    blocks=[
        P("A factory reset returns Wi‑Fi names and local settings to defaults. It does not straighten a bent mount or unkink a cable. Nigerian users often reset out of frustration and then cannot remember the new Wi‑Fi password either."),
        H2("Consider a reset when"),
        UL("You are locked out of Wi‑Fi settings.", "A technician asks you to after other checks.", "You are preparing a kit to move house and want a clean router state."),
        H2("Do not reset first when"),
        UL("The app says cable disconnected or obstruction.", "The power is unstable.", "There is a known wider outage."),
        H2("How"),
        P("Follow the official in-app or hardware sequence for your generation. Afterward, set a new Wi‑Fi password you will actually store."),
    ])

add("articles-troubleshooting.ts", researchId="T07",
    title="Starlink account suspended or payment issues in Nigeria",
    seoTitle="Starlink account or payment issues in Nigeria | Skylink",
    seoDescription="What Nigerian users should know when Starlink service stops for account or payment reasons — billing is Starlink’s, not Skylink’s.",
    excerpt="Installers cannot unlock a suspended Starlink account.",
    category="troubleshooting", primaryKeyword="starlink account suspended nigeria",
    hero=IMG_SAL, alt="Starlink sales and installation equipment context",
    relatedServicePaths=[("/support", "Support"), ("/faq", "FAQ"), ("/contact", "Contact")],
    relatedIds=["N08", "T14", "T01"],
    cta=("Dish offline but account looks fine?", "If the app shows a hardware fault, contact Skylink. If it shows billing, use official Starlink account tools.", "/support", "Support hub"),
    blocks=[
        P("When Starlink stops for non-payment or account holds, the dish can look “dead” while the mount is perfect. Monthly subscription billing is handled in Starlink’s account, not by Skylink."),
        H2("What Skylink does not do"),
        UL("We do not collect Starlink’s monthly fee on this website.", "We do not publish a list of card or naira rails we have not verified.", "We cannot bypass a suspension."),
        H2("What you should do"),
        P("Open the official Starlink app or account pages and read the billing state. Use Starlink’s documented payment options for your country. See also [paying for Starlink](/blog/pay-for-starlink-nigeria) for process — not an invented method list."),
        H2("When it is actually an install fault"),
        P("If billing is current and the app shows cable, obstruction or offline hardware, go back to [troubleshooting](/blog/starlink-offline-searching-troubleshooting-nigeria)."),
    ])

add("articles-troubleshooting.ts", researchId="T08",
    title="Obstruction warnings after the rains — what to do",
    seoTitle="Starlink obstruction after Nigeria’s rains | Skylink",
    seoDescription="Why Starlink obstruction warnings appear after Nigerian rains as trees fill in, and when a remount is needed.",
    excerpt="Seasonal canopy growth is a physical problem.",
    category="troubleshooting", primaryKeyword="starlink obstruction after rain nigeria",
    hero=IMG_R3, alt="Starlink pole mount in an outdoor installation setting",
    relatedServicePaths=[("/services/relocation", "Relocation"), ("/support", "Support"), ("/contact", "Contact")],
    relatedIds=["R05", "R09", "T12"],
    cta=("Trees won the summer?", "A remount assessment may be the honest fix.", "/contact?intent=quote", "Request a remount discussion"),
    blocks=[
        P("A mount that passed in February can fail in July. Nigerian rains grow leaves fast. The app’s obstruction map is telling you the sky changed — not that the firmware is moody."),
        H2("Confirm it is seasonal"),
        P("Compare the obstruction wedge with the actual tree from the dish’s viewpoint. Pruning may be possible if you own the tree and it is safe; otherwise plan a higher or offset mount."),
        H2("Software will not cut the mango"),
        P("Resetting the router does not remove a canopy. Use [relocation](/services/relocation) when the position is the fault."),
    ])

add("articles-troubleshooting.ts", researchId="T09",
    title="Changing Starlink Wi-Fi name and password after install",
    seoTitle="Change Starlink Wi-Fi name and password in Nigeria | Skylink",
    seoDescription="How Nigerian customers change Starlink Wi-Fi name and password after handover, and what to record so the household is not locked out.",
    excerpt="A short handover skill, not a substitute for coverage design.",
    category="troubleshooting", primaryKeyword="change starlink wifi password nigeria",
    hero=IMG_WF, alt="Indoor networking equipment context for Starlink Wi-Fi planning",
    relatedServicePaths=[("/support", "Support"), ("/faq", "FAQ")],
    relatedIds=["R17", "T06", "T15"],
    cta=("Locked out of Wi-Fi?", "Support can talk you through official app steps — we cannot see your password.", "/support", "Support"),
    blocks=[
        P("After install you should change the default Wi‑Fi name and password in the Starlink app. That is normal hygiene. It will not make a far bedroom faster."),
        H2("Do this once, in writing"),
        OL("Open the official app while on the kit’s network if required by current software.", "Set a password the household can store.", "Write it down for the person who actually pays the bill."),
        H2("If you forget it"),
        P("Use official recovery or a controlled reset. Skylink does not keep your Wi‑Fi password."),
    ])

add("articles-troubleshooting.ts", researchId="T10",
    title="Troubleshooting Starlink for CCTV and smart devices",
    seoTitle="Starlink, CCTV and smart devices on Nigerian networks | Skylink",
    seoDescription="How to think about CCTV, POS and smart devices on a Starlink-backed Nigerian network without turning Skylink into a camera vendor.",
    excerpt="Network design first; cameras are the customer’s system.",
    category="troubleshooting", primaryKeyword="starlink cctv nigeria network",
    hero=IMG_WF, alt="Indoor networking equipment context for Starlink Wi-Fi planning",
    relatedServicePaths=[("/services/wifi-networking", "Wi-Fi networking"), ("/services/business-connectivity", "Business connectivity"), ("/contact", "Contact")],
    relatedIds=["B11", "B04", "E07"],
    cta=("Cameras dropping on Starlink?", "Describe whether the WAN is up and whether only cameras fail.", "/contact?intent=quote", "Discuss networking"),
    blocks=[
        P("CCTV and smart sockets are hungry, chatty and often poorly powered. When they fail on Starlink, the dish may be innocent. Skylink is not a CCTV installer; we can help the network they sit on."),
        H2("Split the fault"),
        UL("Is the Starlink app healthy?", "Do phones on Wi‑Fi still work?", "Are cameras on a separate PoE switch with its own power?", "Is remote viewing failing because of CGNAT/VPN expectations?"),
        H2("Design notes"),
        P("Prefer wired camera backbones. Do not pile 20 streams on a hidden indoor router. See [POS and CCTV business networking](/blog/starlink-pos-cctv-business-nigeria)."),
        N("We do not sell or warranty third-party cameras on this site."),
    ])

add("articles-troubleshooting.ts", researchId="T11",
    title="Starlink gaming latency expectations in Nigeria",
    seoTitle="Starlink gaming ping and latency in Nigeria | Skylink",
    seoDescription="What Nigerian gamers should realistically expect from Starlink latency, and which local issues (Wi-Fi, obstruction) look like “bad ping.”",
    excerpt="No fabricated ping tables — qualitative expectations only.",
    category="troubleshooting", primaryKeyword="starlink gaming nigeria",
    hero=IMG_R, alt="Starlink dish and outdoor antenna on wall brackets during a residential mounting job",
    relatedServicePaths=[("/support", "Support"), ("/guide/starlink-nigeria", "Nigeria guide"), ("/faq", "FAQ")],
    relatedIds=["T03", "R19"],
    cta=("Need a stable desk link?", "Say whether this is home office, gaming, or both.", "/contact", "Contact"),
    blocks=[
        P("Starlink’s latency is typically higher than a good local fibre path and lower than classic geostationary satellite. Exact ping varies by game, routing and time of day. This page will not invent a Nigerian average."),
        H2("Local issues that look like ping"),
        UL("Wi‑Fi interference in the parlour.", "Obstruction causing stalls.", "VPN exit nodes."),
        H2("Fair expectation"),
        P("Competitive titles that punish jitter may still disappoint. Casual online play is a different bar. Test on Ethernet beside the router before blaming the constellation."),
        H2("Official context"),
        P("Starlink publishes general latency characteristics for its service classes on official pages. Check those, not a screenshot from a group chat."),
    ])

add("articles-troubleshooting.ts", researchId="T12",
    title="When to call an installer instead of DIY troubleshooting",
    seoTitle="When to call a Starlink installer in Nigeria | Skylink",
    seoDescription="A checklist for Nigerian Starlink users: DIY checks versus calling for remount, cable replacement or unsafe roof work.",
    excerpt="Know the line between a reseat and a roof job.",
    category="troubleshooting", primaryKeyword="starlink repair nigeria when to call",
    hero=IMG_REL, alt="Starlink relocation and remount service context",
    relatedServicePaths=[("/support", "Support"), ("/services/relocation", "Relocation"), ("/contact", "Contact")],
    relatedIds=["T01", "T02", "R18", "R12"],
    cta=("Past DIY checks?", "Request a remount or support conversation.", "/contact", "Contact Skylink"),
    blocks=[
        P("Repair-intent searches in Nigeria often hit specialist repair brands. Skylink’s honest split is: you can check power, app status and indoor connections; you should not improvise on a live, brittle roof."),
        H2("Stay DIY"),
        UL("Confirm power and app account state.", "Reboot once.", "Reseat indoor connections.", "Move a poorly placed indoor router."),
        H2("Call"),
        UL("Chewed or waterlogged outdoor cable.", "Shifted mount after a storm.", "Persistent obstruction needing a new position.", "Any work at height you cannot do safely."),
        H2("Service path"),
        P("[Relocation](/services/relocation) covers remounts. [Support](/support) lists channels. We do not impersonate other companies’ repair shops."),
    ])

add("articles-troubleshooting.ts", researchId="T13",
    title="Harmattan dust and Starlink dish maintenance tips",
    seoTitle="Cleaning Starlink dishes during harmattan in Nigeria | Skylink",
    seoDescription="Gentle harmattan dust care for Starlink terminals in Nigeria — without unsafe roof habits or soaking electronics.",
    excerpt="Dust is real; heroic washing is not maintenance.",
    category="troubleshooting", primaryKeyword="starlink dust cleaning nigeria",
    hero=IMG_R3, alt="Starlink pole mount in an outdoor installation setting",
    relatedServicePaths=[("/support", "Support"), ("/faq", "FAQ"), ("/services/residential-installation", "Residential installation")],
    relatedIds=["R09", "R16"],
    cta=("Need a safer clean at height?", "Do not climb. Ask about a maintenance visit.", "/contact", "Contact"),
    blocks=[
        P("Harmattan dust coats terminals across northern and many central Nigerian sites. A film of dust is not automatically a failed dish. Aggressive washing on a ladder is a good way to create a real failure."),
        H2("Gentle care"),
        P("Follow Starlink’s current care notes for your hardware. Typically: no pressure washers, no solvents, no opening sealed units. If you cannot reach the dish safely, leave it."),
        H2("When dust is not the issue"),
        P("Obstruction, cable faults and power still dominate outages. Clean last, diagnose first."),
    ])

add("articles-troubleshooting.ts", researchId="T14",
    title="Starlink outage vs local fault — how to tell the difference",
    seoTitle="Starlink outage or my dish? A Nigeria checklist | Skylink",
    seoDescription="How Nigerian users can distinguish a wider Starlink incident from a local cable, power or obstruction fault.",
    excerpt="Do not remount during a network incident; do not wait out a chewed cable.",
    category="troubleshooting", primaryKeyword="starlink down nigeria or my dish",
    hero=IMG_REL, alt="Starlink relocation and remount service context",
    relatedServicePaths=[("/support", "Support"), ("/faq", "FAQ"), ("/contact", "Contact")],
    relatedIds=["T01", "N04", "T07"],
    cta=("Only your site is down?", "Work through local checks, then contact Skylink.", "/contact", "Contact"),
    blocks=[
        P("Group chats announce “Starlink is down” whenever one person loses a link. Sometimes they are right. Often they are describing their own rat, estate generator or tree."),
        H2("Signs it may be wider"),
        UL("Official Starlink status tools show an incident.", "Many unrelated addresses fail at once.", "The app explicitly reports a network outage rather than a cable fault."),
        H2("Signs it is local"),
        UL("Neighbours on Starlink are fine.", "App shows obstruction or cable.", "Failure matches generator changeover."),
        H2("What to do"),
        P("If wider: wait, do not dismantle the mount. If local: [troubleshooting](/blog/starlink-offline-searching-troubleshooting-nigeria). News-style recap: [outage notes](/blog/starlink-outage-what-to-know-nigeria)."),
    ])

add("articles-troubleshooting.ts", researchId="T15",
    title="Post-install support checklist for new Starlink customers",
    seoTitle="After Starlink installation support in Nigeria | Skylink",
    seoDescription="A first-week checklist for new Nigerian Starlink customers: app, Wi-Fi, power, who bills you, and when to contact Skylink.",
    excerpt="Handover is a beginning. This is the quiet first week.",
    category="troubleshooting", primaryKeyword="starlink after install support nigeria",
    hero=IMG_R, alt="Starlink dish and outdoor antenna on wall brackets during a residential mounting job",
    relatedServicePaths=[("/support", "Support"), ("/faq", "FAQ"), ("/contact", "Contact"), ("/services/relocation", "Relocation")],
    relatedIds=["R17", "T09", "T12"],
    cta=("Something changed after handover?", "Use Support channels with the symptom and app status.", "/support", "Open Support"),
    blocks=[
        P("The week after a new install is when small issues appear: a Wi‑Fi name nobody wrote down, a socket that dies at night, a tree you did not notice. Use a short checklist before assuming the kit is faulty."),
        H2("Day-one records"),
        UL("Wi‑Fi password stored.", "Which socket powers the router.", "Photos of the mount.", "Whether Starlink billing is active on the account."),
        H2("If performance drops"),
        OL("Check app status.", "Check power.", "Check whether only one room failed.", "Then contact [support](/support)."),
        H2("This article versus the Support page"),
        P("Support is the hub for channels and prep notes. This article is the customer-side first-week list so we do not clone that page."),
    ])

print("defined equipment", len(articles_by_file["articles-equipment.ts"]))
print("defined trouble", len(articles_by_file["articles-troubleshooting.ts"]))
