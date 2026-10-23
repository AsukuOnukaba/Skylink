import { areEnquiryFormsEnabled } from "./enquiryForms";

/** Honest CTA labels — never imply a live form when the feature is off. */
export function enquiryContactCtaLabel(
  intent: "quote" | "survey" | "product" = "quote",
): string {
  if (!areEnquiryFormsEnabled()) {
    return "Go to contact";
  }
  if (intent === "survey") return "Request a site survey";
  if (intent === "product") return "Enquire about this product";
  return "Request a quote";
}
