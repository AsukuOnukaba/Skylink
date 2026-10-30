import { hasPublicPhone, site } from "@/config/site";

/**
 * Visitor Q&As grounded in install physics and process.
 * Price bands, NAP, and authorisation claims stay out until approved.
 */
export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "what-skylink-does",
    question: "What does Skylink do?",
    answer: `${site.relationshipPhrase} We help homes, businesses, enterprise sites, vessels, and offshore operations plan Starlink installation, mounting, cabling, Wi-Fi coverage, networking, equipment, and related connectivity work.`,
  },
  {
    id: "starlink-relationship",
    question: "Is Skylink the same as Starlink?",
    answer: `${site.brandName} is an independent installation and connectivity business. Starlink is the satellite internet service. We help with installation and support around that connectivity—we do not claim to be Starlink itself.`,
  },
  {
    id: "sky-view",
    question: "Does the dish need a clear view of the sky?",
    answer:
      "Yes. Trees, neighbouring buildings, water tanks, and parapet walls can block the dish. A site check of the mounting position is the practical way to avoid a poor install.",
  },
  {
    id: "power-outages",
    question: "What happens during a power outage?",
    answer:
      "Starlink equipment needs power. If the grid drops, the connection stops unless the kit is on a UPS, inverter, or generator circuit sized for the load. See the backup power service for how we approach that.",
  },
  {
    id: "estate-rules",
    question: "Can I install Starlink in a gated estate or apartment?",
    answer:
      "Often yes, but many estates and landlords have rules about rooftop equipment or drilling. Get permission before work starts. We can explain what to ask for.",
  },
  {
    id: "already-have-kit",
    question: "Can you install a kit I already bought?",
    answer:
      "Yes. Residential and business installation can cover mounting, cabling, and handover when you already have complete hardware and an active account.",
  },
  {
    id: "monthly-fee",
    question: "Who sets the monthly Starlink subscription fee?",
    answer:
      "Starlink sets plan pricing and terms. The naira figures on the product pages are hardware catalogue prices, not the monthly subscription, and they do not confirm stock.",
  },
  {
    id: "how-to-contact",
    question: "How can I contact Skylink?",
    answer: hasPublicPhone()
      ? `Call or WhatsApp ${site.brandName} on ${site.phoneDisplay}, or open the Contact page for the same details.`
      : `Open the Contact page for the current reach options. Direct phone, WhatsApp, and email are not published on this site yet.`,
  },
  {
    id: "next-step",
    question: "What should I do if I need an installation?",
    answer: hasPublicPhone()
      ? `Start on the Services, Products, or About pages to understand how we work, then call or WhatsApp us on ${site.phoneDisplay}, or open Contact when you are ready.`
      : `Start on Services, Products, or a Service areas page that matches your location, then open Contact for the current ways to get in touch.`,
  },
];
