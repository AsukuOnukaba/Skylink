import { faqItems } from "@/data/faq";
import { getPublishedLocation } from "@/data/locations";
import { getPublishedService } from "@/data/services";

export const GUIDE_WELCOME =
  "Hello! Welcome to Skylink. I can help you explore our installation services, service areas and products. What would you like to know?";

export const GUIDE_CAPABILITY =
  "This guide answers from Skylink’s published pages. It is not a live generative model, and it cannot confirm prices, stock, coverage, or appointment times.";

export const guideQuickQuestions = [
  "Do you install Starlink in Lagos?",
  "I need Starlink for my home.",
  "Tell me about business installation.",
  "Do you offer maritime connectivity?",
  "How can I request a quote?",
] as const;

export type GuideLink = {
  label: string;
  to: string;
};

export type GuideReply = {
  text: string;
  links: GuideLink[];
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function serviceReply(slug: string, lead?: string): GuideReply | null {
  const service = getPublishedService(slug);
  if (!service) return null;
  return {
    text: lead ? `${lead} ${service.shortDescription}` : service.shortDescription,
    links: [{ label: service.title, to: `/services/${service.slug}` }],
  };
}

function placeReply(placeKey: string): GuideReply | null {
  const place = getPublishedLocation(placeKey);
  if (!place) return null;
  return {
    text: `${place.placeName} is a published Skylink service area. Skylink does not list an office there. ${place.intro} Installation requirements are assessed for each location.`,
    links: [
      {
        label: `${place.placeName} installation guidance`,
        to: `/starlink-installation-${place.placeKey}`,
      },
    ],
  };
}

/**
 * Keyword guide over published FAQ, service, and location copy.
 * It does not invent prices, stock, coverage, or guarantees.
 */
export function answerGuide(question: string): GuideReply {
  const q = normalize(question);
  if (!q) {
    return {
      text: "Ask about installation services, the Lagos, Abuja, and Port Harcourt service areas, or how to request a quote.",
      links: [{ label: "Services", to: "/services" }],
    };
  }

  if (/are you (an )?ai|generative|chatgpt|language model|robot/.test(q)) {
    return {
      text: GUIDE_CAPABILITY,
      links: [
        { label: "FAQ", to: "/faq" },
        { label: "Contact", to: "/contact" },
      ],
    };
  }

  if (/quote|pricing|price|cost|how much/.test(q)) {
    return {
      text: "Skylink does not publish one installation price. Hardware prices on the product pages are catalogue figures, not the monthly Starlink subscription, and they do not confirm stock. Request a quote and the team will talk through the site.",
      links: [
        { label: "Request a quote", to: "/contact?intent=quote" },
        { label: "Browse products", to: "/products" },
      ],
    };
  }

  if (/maritime|vessel|boat|offshore|ship/.test(q)) {
    return (
      serviceReply(
        "maritime-offshore",
        "Yes. Maritime and offshore connectivity is a published service.",
      ) ?? {
        text: "Maritime connectivity is discussed per vessel or site. Scope is agreed for each job.",
        links: [{ label: "Services", to: "/services" }],
      }
    );
  }

  if (/port harcourt|portharcourt/.test(q)) {
    return placeReply("port-harcourt") ?? fallback();
  }
  if (/\blagos\b/.test(q)) return placeReply("lagos") ?? fallback();
  if (/\babuja\b/.test(q)) return placeReply("abuja") ?? fallback();

  if (/home|house|residential|apartment|duplex/.test(q)) {
    return (
      serviceReply(
        "residential-installation",
        "Residential installation covers a home, duplex, or apartment.",
      ) ?? fallback()
    );
  }

  if (/business|office|shop|clinic|commercial/.test(q)) {
    return (
      serviceReply(
        "business-connectivity",
        "Business installation is for offices and other commercial sites.",
      ) ?? fallback()
    );
  }

  if (/enterprise/.test(q)) {
    return {
      text: "Enterprise work is larger-site connectivity planning, including how a link fits an existing network. Requirements are agreed for each organisation. Skylink does not publish a guaranteed speed.",
      links: [
        { label: "Enterprise internet plans", to: "/services/enterprise-plans" },
        { label: "Request a quote", to: "/contact?intent=quote" },
      ],
    };
  }

  if (/where|service area|which cit|location|cities/.test(q)) {
    return {
      text: "Published service areas include Lagos, Abuja, and Port Harcourt, along with other location pages. Those pages describe local installation conditions. They do not mean Skylink has an office in each city. Requirements are assessed for each location.",
      links: [
        { label: "Lagos", to: "/starlink-installation-lagos" },
        { label: "Abuja", to: "/starlink-installation-abuja" },
        { label: "Port Harcourt", to: "/starlink-installation-port-harcourt" },
        { label: "All service areas", to: "/locations" },
      ],
    };
  }

  for (const item of faqItems) {
    const words = normalize(item.question)
      .split(" ")
      .filter((word) => word.length > 3);
    const hits = words.filter((word) => q.includes(word)).length;
    if (hits >= 2) {
      return {
        text: item.answer,
        links: [{ label: "Read the FAQ", to: "/faq" }],
      };
    }
  }

  return fallback();
}

function fallback(): GuideReply {
  return {
    text: `${GUIDE_CAPABILITY} Try a question about home installation, business installation, maritime connectivity, Lagos, Abuja, Port Harcourt, or requesting a quote.`,
    links: [
      { label: "Services", to: "/services" },
      { label: "FAQ", to: "/faq" },
      { label: "Request a quote", to: "/contact?intent=quote" },
    ],
  };
}
