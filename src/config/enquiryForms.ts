/**
 * Public enquiry form feature flag (PH-09).
 *
 * Default: disabled when unset/empty/false.
 * Enable only with VITE_ENQUIRY_FORMS_ENABLED=true after OD-07, OD-15, CP-E,
 * production delivery config, and a verified server-side delivery path.
 *
 * Hiding the form is not an API security control — the server still returns
 * 503 when delivery is unconfigured.
 */
export function areEnquiryFormsEnabled(): boolean {
  const raw = String(import.meta.env.VITE_ENQUIRY_FORMS_ENABLED ?? "")
    .trim()
    .toLowerCase();
  return raw === "true" || raw === "1" || raw === "yes";
}
