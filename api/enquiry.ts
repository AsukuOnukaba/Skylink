import {
  resolveDeliveryFromEnv as defaultResolveDeliveryFromEnv,
  type EnquiryDelivery,
} from "../src/shared/enquiryDelivery";
import {
  processEnquiry as defaultProcessEnquiry,
  type EnquiryHttpResult,
} from "../src/shared/processEnquiry";

/**
 * Minimal Node serverless request/response shapes (legacy `@vercel/node`).
 * Used by `createEnquiryHandler` for Vitest and local Node smoke invokes.
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

async function readWebRequestBody(request: Request): Promise<unknown> {
  let text: string;
  try {
    text = await request.text();
  } catch {
    return null;
  }
  return coerceEnquiryBody(text);
}

function jsonResponse(
  status: number,
  body: unknown,
  extraHeaders?: Record<string, string>,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
  });
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
 * Shared enquiry pipeline used by Web Standard and Node adapters.
 */
export async function handleEnquiryHttp(
  method: string,
  rawBody: unknown,
  deps: Partial<EnquiryHandlerDeps> = {},
): Promise<{ status: number; body: unknown; headers?: Record<string, string> }> {
  const {
    resolveDeliveryFromEnv,
    processEnquiry,
    log,
  } = { ...defaultDeps, ...deps };

  try {
    const normalized = (method || "GET").toUpperCase();
    if (normalized !== "POST") {
      return {
        status: 405,
        headers: { Allow: "POST" },
        body: { ok: false, error: "Method not allowed" },
      };
    }

    const delivery = resolveDeliveryFromEnv(process.env);
    const result = await processEnquiry(rawBody, delivery, log);
    return { status: result.status, body: result.body };
  } catch {
    // Do not map unexpected errors to 503 — keep them distinguishable.
    log("enquiry handler unexpected_error");
    return {
      status: 500,
      body: { ok: false, error: "Internal server error" },
    };
  }
}

/**
 * Node (req, res) adapter for Vitest and local esbuild smoke tests.
 */
export function createEnquiryHandler(
  deps: Partial<EnquiryHandlerDeps> = {},
): (
  req: EnquiryApiRequest,
  res: EnquiryApiResponse,
) => Promise<unknown> {
  return async function handler(
    req: EnquiryApiRequest,
    res: EnquiryApiResponse,
  ): Promise<unknown> {
    const outcome = await handleEnquiryHttp(
      req.method ?? "GET",
      coerceEnquiryBody(req.body),
      deps,
    );
    if (outcome.headers) {
      for (const [name, value] of Object.entries(outcome.headers)) {
        res.setHeader(name, value);
      }
    }
    return res.status(outcome.status).json(outcome.body);
  };
}

/**
 * Web Standard fetch handler (documented Vercel Node.js ESM entry).
 */
export function createEnquiryFetchHandler(
  deps: Partial<EnquiryHandlerDeps> = {},
): (request: Request) => Promise<Response> {
  return async function fetchHandler(request: Request): Promise<Response> {
    const outcome = await handleEnquiryHttp(
      request.method,
      await readWebRequestBody(request),
      deps,
    );
    return jsonResponse(outcome.status, outcome.body, outcome.headers);
  };
}

const fetchHandler = createEnquiryFetchHandler();

/** Named method export for the Vercel Node.js runtime. */
export async function POST(request: Request): Promise<Response> {
  return fetchHandler(request);
}

async function methodNotAllowed(): Promise<Response> {
  return jsonResponse(
    405,
    { ok: false, error: "Method not allowed" },
    { Allow: "POST" },
  );
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const OPTIONS = methodNotAllowed;
export const HEAD = methodNotAllowed;

/**
 * Default Web Standard entry for Vercel Node.js.
 * @see https://vercel.com/docs/functions/runtimes/node-js
 */
export default {
  fetch: fetchHandler,
};
