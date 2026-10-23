/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  /** PH-10: production indexing only with VERCEL_ENV=production + valid site URL. */
  readonly VITE_ALLOW_INDEXING?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_GSC_VERIFICATION?: string;
  /** PH-09: set "true" only after OD-07/OD-15 delivery is verified. Default off. */
  readonly VITE_ENQUIRY_FORMS_ENABLED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
