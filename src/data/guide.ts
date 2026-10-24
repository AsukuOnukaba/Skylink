export type GuideSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export const guideSections: GuideSection[] = [
  {
    id: "overview",
    title: "What Starlink changes for a Nigerian site",
    paragraphs: [
      "Starlink is a low-earth-orbit satellite service. The practical difference from older satellite links is lower delay, which is why people use it for video calls and cloud software, not only for bulk downloads. In Nigeria it shows up both as a household connection and as a backup when fibre or radio fails.",
      "The dish, the power, and the Wi-Fi after the router are three separate problems. A clear sky view does not fix a generator that reboots the router, and a fast link at the dish does not automatically reach every room.",
    ],
  },
  {
    id: "coverage",
    title: "Coverage is decided on the roof",
    paragraphs: [
      "A national availability map is not a survey. Trees, parapet walls, water tanks, and the building next door decide whether a phased-array dish can see enough sky. The Starlink app obstruction check is useful, and a person on the roof is better.",
      "Lagos estates often need a mast because neighbouring blocks are close. Abuja compounds sometimes have a clearer rear roof, then lose it to trees after the rains. Port Harcourt industrial roofs tend to need lightning and cable protection as much as height. Dust and wind matter more on northern sites. The same dish does not get the same mount in each of those places.",
      "Choose hardware from the job, not from the advertisement. Concurrent users, upload, and whether the terminal must move are the questions. A Mini is the catalogue item tied to a Roam plan. A flat high-performance terminal is the one discussed for marine and high-demand sites. Confirm the plan on Starlink before you buy a mobility dish for a fixed roof, or the other way around.",
    ],
  },
  {
    id: "installation",
    title: "When a technician is worth it",
    paragraphs: [
      "A short cable run and a safe ladder can be a do-it-yourself job. Many Nigerian buildings are not that. Cable through concrete, a false ceiling, or an external tray in sun and rain is where installs fail months later, usually from water or a crushed bend.",
      "Hire installation help when the roof is awkward, a neighbour or estate must approve drilling, or you need separate networks and a second internet path. Redoing a shifted dish or a wet cable entry usually costs more than doing the route once.",
      "A proper survey photographs the route, checks permission, and lists the accessories that are actually required: a longer Gen 3 cable, a mesh node, a pivot mount, or surge protection. That list is the scope. It is not a slogan.",
    ],
  },
  {
    id: "power",
    title: "Power from the Nigerian grid and from generators",
    paragraphs: [
      "Starlink equipment reboots when the supply is dirty. The moment a generator starts is a common cause. A small UPS on the router may be enough for a home that only needs to ride through a flicker. A site that cannot drop a call needs a cleaner supply, often an inverter or an online UPS, and a separate ground for outdoor cable screens.",
      "Factories with large motors should not share that noise with the network closet. Clinics and schools have access rules of their own. Tell us the generator pattern early so the backup is sized for the dish and router, not guessed from a household rule of thumb.",
      "Longer outages are a battery question. Label the isolator so an estate electrician can turn the satellite gear off without hunting for it.",
    ],
  },
  {
    id: "wifi",
    title: "Wi-Fi after the dish is online",
    paragraphs: [
      "The router in a standard kit is enough for a small flat. A duplex, a compound, or an office usually needs mesh or a cabled access point. Guest access and a split between staff and operations traffic are office problems, not home problems.",
      "Point-to-point radios are for a gatehouse, a second warehouse, or a site trailer when you can see from one mount to the other. The public long-range service talks about links up to 10 km. That figure assumes a planned line of sight. Rain and interference reduce it. Fibre is still the better backhaul when a trench is allowed.",
      "The catalogue also lists shorter wireless and wired repeater routers for concrete buildings. Those are not the same product as a multi-kilometre outdoor radio.",
    ],
  },
  {
    id: "business",
    title: "Businesses, failover, and resale",
    paragraphs: [
      "Most businesses should not depend on Starlink alone if they already have fibre. The usual pattern is fibre first, Starlink second, with a router that can fail over. Shops that must keep card machines up, and remote sites that upload steadily, should say so. Some plan classes care about how much you upload.",
      "Someone building a wireless ISP on Starlink backhaul has to be honest about how many customers share one link, and has to follow the rules that apply to resale. We can help with vouchers, queues, and tower grounding. We do not give legal advice on whether resale is allowed.",
      "Write down the IP plan, the VPN, and who to call. That handover is what an IT team actually uses the week after the installer leaves.",
    ],
  },
  {
    id: "billing",
    title: "Subscriptions and hardware prices",
    paragraphs: [
      "Monthly Starlink prices, roaming add-ons, and priority tiers change. This site does not copy those tables. Hardware prices in the product catalogue are the published naira figures for the kit or accessory. They are not the monthly fee, and they do not mean the item is in stock.",
      "Several people on one link will fill the upload with video, backups, or cameras. A second link or traffic priority is a design choice, not a moral one. Schools that put children on the network need filtering of their own.",
      "Spare kit matters if lightning is a realistic risk. A cold-spare router is cheaper than a week of downtime, and it is still a separate purchase.",
    ],
  },
  {
    id: "support",
    title: "What useful support looks like",
    paragraphs: [
      "Leave labelled cables, photos of the finished route, and a speed test taken where people actually sit. The person on site should know the power-cycle order and should not loosen dish bolts after a storm without a reason.",
      "For a business, name who can open the roof, who can approve another radio, and who holds the Starlink login. Those three names shorten an outage more than a slogan about 24-hour support.",
      "The guide, the FAQ, and the support page on this site are the written starting point. Phone, WhatsApp, and email are the published contact channels. The online enquiry form stays off until delivery is configured.",
    ],
  },
];
