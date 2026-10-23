import type { EnquiryInput } from "./enquirySchema";

export type EnquirySubmitResult =
  | { status: "accepted" }
  | { status: "validation"; message: string; issues: string[] }
  | { status: "delivery_failed"; message: string }
  | { status: "unavailable"; message: string }
  | { status: "method_not_allowed"; message: string }
  | { status: "network"; message: string }
  | { status: "unexpected"; message: string };

type JsonBody = {
  ok?: unknown;
  error?: unknown;
  issues?: unknown;
};

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

/**
 * POST /api/enquiry. Does not log the payload or response body contents.
 * Success only when HTTP 202 and body `{ ok: true }`.
 */
export async function submitEnquiry(
  payload: EnquiryInput,
): Promise<EnquirySubmitResult> {
  let response: Response;
  try {
    response = await fetch("/api/enquiry", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return {
      status: "network",
      message:
        "We could not reach the enquiry service. Check your connection and try again. Nothing was confirmed as received.",
    };
  }

  let body: JsonBody | null = null;
  try {
    body = (await response.json()) as JsonBody;
  } catch {
    body = null;
  }

  if (response.status === 202 && body?.ok === true) {
    return { status: "accepted" };
  }

  if (response.status === 400) {
    return {
      status: "validation",
      message:
        typeof body?.error === "string" && body.error.trim()
          ? "Please check the highlighted fields and try again."
          : "Some details need correcting before this enquiry can be sent.",
      issues: asStringArray(body?.issues),
    };
  }

  if (response.status === 405) {
    return {
      status: "method_not_allowed",
      message:
        "This enquiry could not be submitted. Nothing was confirmed as received.",
    };
  }

  if (response.status === 502) {
    return {
      status: "delivery_failed",
      message:
        "The enquiry could not be delivered. It was not confirmed as received. You can try again in a moment.",
    };
  }

  if (response.status === 503) {
    return {
      status: "unavailable",
      message:
        "Online enquiry submission is temporarily unavailable. Your message was not submitted.",
    };
  }

  return {
    status: "unexpected",
    message:
      "Something went wrong while sending the enquiry. Nothing was confirmed as received.",
  };
}
