import { resolveDeliveryFromEnv } from "../src/shared/enquiryDelivery";
import { processEnquiry } from "../src/shared/processEnquiry";

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  setHeader: (name: string, value: string) => void;
  json: (body: unknown) => unknown;
};

/**
 * POST /api/enquiry — TRD enquiry endpoint (PH-08).
 *
 * Status contract:
 * - 202 only after the resolved delivery adapter reports acceptance
 * - 400 validation / malformed / malformed body
 * - 405 unsupported method
 * - 502 provider/network failure after a configured delivery attempt
 * - 503 delivery not configured (including stub disabled in production)
 * - 429 expected from Vercel Firewall (not this file)
 *
 * UI forms arrive in PH-09. Do not invent OD-07 mailboxes here.
 */
export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const delivery = resolveDeliveryFromEnv(process.env);
  const result = await processEnquiry(req.body, delivery, (line) => {
    console.info(line);
  });

  return res.status(result.status).json(result.body);
}
