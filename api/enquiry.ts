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
 * UI forms arrive in PH-09. 429 is expected from Vercel Firewall, not this file.
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
