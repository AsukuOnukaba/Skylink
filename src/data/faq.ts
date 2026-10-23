import { hasPublicPhone, site } from "@/config/site";

/**
 * Only visitor Q&As answered from confirmed business wording.
 * Price, coverage, authorisation, and timing questions stay omitted until approved.
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
    answer: `${site.relationshipPhrase} We help homes and businesses understand the installation path and get support putting connectivity in place.`,
  },
  {
    id: "starlink-relationship",
    question: "Is Skylink the same as Starlink?",
    answer: `${site.brandName} is an independent installation and connectivity business. Starlink is the satellite internet service. We help with installation and support around that connectivity—we do not claim to be Starlink itself.`,
  },
  {
    id: "how-to-contact",
    question: "How can I contact Skylink?",
    answer: hasPublicPhone()
      ? `Call or WhatsApp ${site.brandName} on ${site.phoneDisplay}, or open the Contact page for the same details. An online enquiry form will be added there when it is available.`
      : `Use the Contact page to see the current ways to reach ${site.brandName}. Online enquiry forms and live phone or WhatsApp details appear there when they are available.`,
  },
  {
    id: "next-step",
    question: "What should I do if I need an installation?",
    answer: hasPublicPhone()
      ? `Start on the Services or About pages to understand how we work, then call or WhatsApp us on ${site.phoneDisplay}, or open Contact when you are ready.`
      : `Start on the Services or About pages to understand how we work, then open Contact when you are ready. A clear next step will be available there once live enquiry channels are listed.`,
  },
];
