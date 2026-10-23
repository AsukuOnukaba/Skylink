import { z } from "zod";

const MAX = {
  name: 120,
  phone: 40,
  email: 254,
  location: 200,
  service: 80,
  product: 80,
  message: 2000,
  companyWebsite: 200,
} as const;

export const enquiryKinds = ["quote", "survey", "product"] as const;
export type EnquiryKind = (typeof enquiryKinds)[number];

export const contactMethods = ["phone", "whatsapp", "email"] as const;
export type ContactMethod = (typeof contactMethods)[number];

/**
 * Shared client/server enquiry body (TRD §4).
 * `companyWebsite` is a honeypot and must be empty.
 */
export const enquirySchema = z
  .object({
    kind: z.enum(enquiryKinds),
    name: z.string().trim().min(1).max(MAX.name),
    phone: z.string().trim().min(1).max(MAX.phone),
    email: z.string().trim().max(MAX.email).optional().or(z.literal("")),
    location: z.string().trim().min(1).max(MAX.location),
    service: z.string().trim().max(MAX.service).optional().or(z.literal("")),
    product: z.string().trim().max(MAX.product).optional().or(z.literal("")),
    contactMethod: z.enum(contactMethods),
    message: z.string().trim().max(MAX.message).optional().or(z.literal("")),
    companyWebsite: z.string().max(MAX.companyWebsite).optional().or(z.literal("")),
  })
  .superRefine((value, ctx) => {
    if (value.companyWebsite && value.companyWebsite.trim() !== "") {
      ctx.addIssue({
        code: "custom",
        path: ["companyWebsite"],
        message: "Honeypot must be empty",
      });
    }
    if (value.contactMethod === "email") {
      const email = value.email?.trim() ?? "";
      if (!email || !z.string().email().safeParse(email).success) {
        ctx.addIssue({
          code: "custom",
          path: ["email"],
          message: "Valid email required when contact method is email",
        });
      }
    }
    if (value.kind === "product") {
      if (!value.product?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["product"],
          message: "Product is required for product enquiries",
        });
      }
    }
    if (value.kind === "quote" || value.kind === "survey") {
      if (!value.service?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["service"],
          message: "Service is required for quote and survey enquiries",
        });
      }
    }
  });

export type EnquiryInput = z.infer<typeof enquirySchema>;

export function parseEnquiryBody(input: unknown) {
  return enquirySchema.safeParse(input);
}
