import {
  resolveDeliveryFromEnv as defaultResolveDeliveryFromEnv,
  type EnquiryDelivery,
} from "../src/shared/enquiryDelivery";
import {
  processEnquiry as defaultProcessEnquiry,
  type EnquiryHttpResult,
} from "../src/shared/processEnquiry";

/**
 * Minimal Node serverless request shape used by `@vercel/node`.
 * Keep this local so the API entry does not depend on `@vercel/node` types.
 */
export type EnquiryApiRequest = {
  method?: string;
  body?: unknown;
};

export type EnquiryApiResponse = {
  status: (code: number) => EnquiryApiResponse;
  setHeader: (name: string, value: string) => void;
  json: (body: unknown) => unknown;
};

export type EnquiryHandlerDeps = {
  resolveDeliveryFromEnv: (
    env?: NodeJS.ProcessEnv,
  ) => EnquiryDelivery;
  processEnquiry: (
    raw: unknown,
    delivery: EnquiryDelivery,
    log?: (line: string) => void,
  ) => Promise<EnquiryHttpResult>;
  log: (line: string) => void;
};

/**
 * Coerce Vercel/Node body variants into a JSON value for validation.
 * Strings and Buffers are parsed; invalid JSON becomes `null` → HTTP 400.
 */
export function coerceEnquiryBody(raw: unknown): unknown {
  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed) return null;
    try {
      return JSON.parse(trimmed) as unknown;
    } catch {
      return null;
    }
  }
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(raw)) {
    try {
      const text = raw.toString("utf8").trim();
      if (!text) return null;
      return JSON.parse(text) as unknown;
    } catch {
      return null;
    }
  }
  return raw;
}

const defaultDeps: EnquiryHandlerDeps = {
  resolveDeliveryFromEnv: defaultResolveDeliveryFromEnv,
  processEnquiry: defaultProcessEnquiry,
  log: (line: string) => {
    // Never append request bodies or env values.
    console.info(line);
  },
};

/**
 * Build the Vercel handler. Tests inject delivery/process doubles;
 * production uses the default export below.
 */
export function createEnquiryHandler(
  deps: Partial<EnquiryHandlerDeps> = {},
): (
  req: EnquiryApiRequest,
  res: EnquiryApiResponse,
) => Promise<unknown> {
  const {
    resolveDeliveryFromEnv,
    processEnquiry,
    log,
  } = { ...defaultDeps, ...deps };

  return async function handler(
    req: EnquiryApiRequest,
    res: EnquiryApiResponse,
  ): Promise<unknown> {
    try {
      const method = (req.method ?? "GET").toUpperCase();
      if (method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ ok: false, error: "Method not allowed" });
      }

      const delivery = resolveDeliveryFromEnv(process.env);
      const result = await processEnquiry(
        coerceEnquiryBody(req.body),
        delivery,
        log,
      );

      return res.status(result.status).json(result.body);
    } catch {
      // Distinguish unexpected failures from intentional 503 not-configured.
      // Do not expose stack traces or env/secrets to clients.
      log("enquiry handler unexpected_error");
      return res.status(500).json({ ok: false, error: "Internal server error" });
    }
  };
}

/**
 * POST /api/enquiry — TRD enquiry endpoint (PH-08).
 *
 * Status contract:
 * - 202 only after the resolved delivery adapter reports acceptance
 * - 400 validation / honeypot / malformed body
 * - 405 unsupported method (`Allow: POST`)
 * - 502 provider/network failure after a configured delivery attempt
 * - 503 delivery not configured (including stub blocked in production)
 * - 500 unexpected internal failure (JSON, no stack traces)
 * - 429 expected from Vercel Firewall (not this file)
 *
 * Forms stay gated by `VITE_ENQUIRY_FORMS_ENABLED` (default off).
 */
export default createEnquiryHandler();
