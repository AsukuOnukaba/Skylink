import { useId, useMemo, useRef, useState, type FormEvent } from "react";
import { emitEnquiryAccepted } from "@/analytics/enquiryEvents";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { publishedProducts } from "@/data/products";
import { publishedServices } from "@/data/services";
import {
  contactMethods,
  enquiryFieldLimits,
  parseEnquiryBody,
  type ContactMethod,
  type EnquiryKind,
} from "@/shared/enquirySchema";
import { submitEnquiry } from "@/shared/submitEnquiry";

export type EnquiryFormPrefill = {
  serviceSlug?: string;
  productSlug?: string;
  locationLabel?: string;
};

type FieldErrors = Partial<
  Record<
    | "name"
    | "phone"
    | "email"
    | "location"
    | "service"
    | "product"
    | "contactMethod"
    | "message"
    | "companyWebsite",
    string
  >
>;

type FormStatus =
  | { kind: "idle" }
  | { kind: "success" }
  | { kind: "error"; message: string; issues?: string[] };

const kindCopy: Record<
  EnquiryKind,
  { title: string; intro: string; submitLabel: string }
> = {
  quote: {
    title: "Request a quote",
    intro:
      "Tell us about the installation or connectivity work you need. We use this to prepare a conversation—not an online checkout.",
    submitLabel: "Send quote request",
  },
  survey: {
    title: "Request a site survey",
    intro:
      "Share enough for us to understand the site before any work starts. A survey conversation helps confirm mounting and cable options.",
    submitLabel: "Send survey request",
  },
  product: {
    title: "Product enquiry",
    intro:
      "Ask about a listed product. Availability and pricing are confirmed when we reply—this page does not show live stock.",
    submitLabel: "Send product enquiry",
  },
};

function resolveServiceSlug(raw: string | undefined): string {
  const slug = raw?.trim() ?? "";
  if (!slug) return "";
  return publishedServices().some((s) => s.slug === slug) ? slug : "";
}

function resolveProductSlug(raw: string | undefined): string {
  const slug = raw?.trim() ?? "";
  if (!slug) return "";
  return publishedProducts().some((p) => p.slug === slug) ? slug : "";
}

function issueToFieldError(issue: string): { field?: keyof FieldErrors; message: string } {
  const [pathPart, ...rest] = issue.split(":");
  const message = rest.join(":").trim() || issue;
  const path = pathPart.trim();
  const known: Array<keyof FieldErrors> = [
    "name",
    "phone",
    "email",
    "location",
    "service",
    "product",
    "contactMethod",
    "message",
    "companyWebsite",
  ];
  if (known.includes(path as keyof FieldErrors)) {
    return { field: path as keyof FieldErrors, message };
  }
  return { message: issue };
}

type EnquiryFormProps = {
  kind: EnquiryKind;
  prefill?: EnquiryFormPrefill;
};

export function EnquiryForm({ kind, prefill }: EnquiryFormProps) {
  const formId = useId();
  const statusRef = useRef<HTMLDivElement | null>(null);

  const services = useMemo(() => publishedServices(), []);
  const products = useMemo(() => publishedProducts(), []);
  const copy = kindCopy[kind];

  const initialService = resolveServiceSlug(prefill?.serviceSlug);
  const initialProduct = resolveProductSlug(prefill?.productSlug);
  const initialLocation = prefill?.locationLabel?.trim() ?? "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState(initialLocation);
  const [service, setService] = useState(initialService);
  const [product, setProduct] = useState(initialProduct);
  const [contactMethod, setContactMethod] = useState<ContactMethod>("phone");
  const [message, setMessage] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>({ kind: "idle" });
  const [submitting, setSubmitting] = useState(false);

  function focusFirstError(next: FieldErrors) {
    const order: Array<keyof FieldErrors> = [
      "name",
      "phone",
      "email",
      "location",
      "service",
      "product",
      "contactMethod",
      "message",
    ];
    const first = order.find((key) => next[key]);
    if (!first) return;
    const el = document.getElementById(`${formId}-${first}`);
    el?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setStatus({ kind: "idle" });
    const payload = {
      kind,
      name,
      phone,
      email,
      location,
      service: kind === "quote" || kind === "survey" ? service : "",
      product: kind === "product" ? product : "",
      contactMethod,
      message,
      companyWebsite,
    };

    const parsed = parseEnquiryBody(payload);
    if (!parsed.success) {
      const next: FieldErrors = {};
      const issues: string[] = [];
      for (const issue of parsed.error.issues) {
        const path = String(issue.path[0] ?? "");
        const mapped = issueToFieldError(
          path ? `${path}: ${issue.message}` : issue.message,
        );
        issues.push(mapped.message);
        if (mapped.field && !next[mapped.field]) {
          next[mapped.field] = mapped.message;
        }
      }
      setFieldErrors(next);
      setStatus({
        kind: "error",
        message: "Please check the highlighted fields and try again.",
        issues,
      });
      queueMicrotask(() => focusFirstError(next));
      return;
    }

    setFieldErrors({});
    setSubmitting(true);
    const result = await submitEnquiry(parsed.data);
    setSubmitting(false);

    if (result.status === "accepted") {
      setStatus({ kind: "success" });
      emitEnquiryAccepted(kind);
      queueMicrotask(() => statusRef.current?.focus());
      return;
    }

    if (result.status === "validation") {
      const next: FieldErrors = {};
      for (const issue of result.issues) {
        const mapped = issueToFieldError(issue);
        if (mapped.field && !next[mapped.field]) {
          next[mapped.field] = mapped.message;
        }
      }
      setFieldErrors(next);
      setStatus({
        kind: "error",
        message: result.message,
        issues: result.issues,
      });
      queueMicrotask(() => focusFirstError(next));
      return;
    }

    setStatus({
      kind: "error",
      message: result.message,
    });
    queueMicrotask(() => statusRef.current?.focus());
  }

  if (status.kind === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        className="outline-none"
        role="status"
        aria-live="polite"
      >
        <Alert tone="success" title="Enquiry accepted">
          Your {kind === "survey" ? "site survey" : kind} enquiry was accepted by
          our delivery system. We will use the contact method you chose to follow
          up. This confirmation means the enquiry was handed off—not that a visit
          or price is already booked.
        </Alert>
      </div>
    );
  }

  const emailRequired = contactMethod === "email";

  return (
    <form
      className="relative mt-5 space-y-5"
      onSubmit={onSubmit}
      noValidate
      aria-describedby={`${formId}-intro`}
    >
      <div>
        <h3 className="text-base font-semibold text-navy-800">{copy.title}</h3>
        <p id={`${formId}-intro`} className="mt-1 text-sm text-slate-700">
          {copy.intro}
        </p>
      </div>

      {status.kind === "error" ? (
        <div ref={statusRef} tabIndex={-1} className="outline-none">
          <Alert tone="danger" title="Could not send enquiry" role="alert">
            <p>{status.message}</p>
            {status.issues && status.issues.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {status.issues.slice(0, 6).map((issue) => (
                  <li key={issue}>{issue}</li>
                ))}
              </ul>
            ) : null}
          </Alert>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor={`${formId}-name`} required>
            Full name
          </Label>
          <Input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            required
            maxLength={enquiryFieldLimits.name}
            value={name}
            invalid={Boolean(fieldErrors.name)}
            aria-describedby={
              fieldErrors.name ? `${formId}-name-error` : undefined
            }
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
          />
          {fieldErrors.name ? (
            <p id={`${formId}-name-error`} className="mt-1 text-sm text-danger">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor={`${formId}-phone`} required>
            Phone
          </Label>
          <Input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={enquiryFieldLimits.phone}
            value={phone}
            invalid={Boolean(fieldErrors.phone)}
            aria-describedby={
              fieldErrors.phone ? `${formId}-phone-error` : undefined
            }
            onChange={(e) => setPhone(e.target.value)}
            disabled={submitting}
          />
          {fieldErrors.phone ? (
            <p id={`${formId}-phone-error`} className="mt-1 text-sm text-danger">
              {fieldErrors.phone}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor={`${formId}-email`} required={emailRequired}>
            Email
          </Label>
          <Input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required={emailRequired}
            maxLength={enquiryFieldLimits.email}
            value={email}
            invalid={Boolean(fieldErrors.email)}
            aria-describedby={
              fieldErrors.email ? `${formId}-email-error` : undefined
            }
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
          />
          {fieldErrors.email ? (
            <p id={`${formId}-email-error`} className="mt-1 text-sm text-danger">
              {fieldErrors.email}
            </p>
          ) : (
            <p className="mt-1 text-xs text-slate-500">
              Required if you prefer email replies.
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor={`${formId}-location`} required>
            Location
          </Label>
          <Input
            id={`${formId}-location`}
            name="location"
            autoComplete="address-level2"
            required
            maxLength={enquiryFieldLimits.location}
            value={location}
            invalid={Boolean(fieldErrors.location)}
            aria-describedby={
              fieldErrors.location ? `${formId}-location-error` : undefined
            }
            onChange={(e) => setLocation(e.target.value)}
            disabled={submitting}
            placeholder="City, estate, or area"
          />
          {fieldErrors.location ? (
            <p
              id={`${formId}-location-error`}
              className="mt-1 text-sm text-danger"
            >
              {fieldErrors.location}
            </p>
          ) : null}
        </div>

        {kind === "quote" || kind === "survey" ? (
          <div className="sm:col-span-2">
            <Label htmlFor={`${formId}-service`} required>
              Service
            </Label>
            <Select
              id={`${formId}-service`}
              name="service"
              required
              value={service}
              invalid={Boolean(fieldErrors.service)}
              aria-describedby={
                fieldErrors.service ? `${formId}-service-error` : undefined
              }
              onChange={(e) => setService(e.target.value)}
              disabled={submitting}
            >
              <option value="">Select a service</option>
              {services.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.title}
                </option>
              ))}
            </Select>
            {fieldErrors.service ? (
              <p
                id={`${formId}-service-error`}
                className="mt-1 text-sm text-danger"
              >
                {fieldErrors.service}
              </p>
            ) : null}
          </div>
        ) : null}

        {kind === "product" ? (
          <div className="sm:col-span-2">
            <Label htmlFor={`${formId}-product`} required>
              Product
            </Label>
            <Select
              id={`${formId}-product`}
              name="product"
              required
              value={product}
              invalid={Boolean(fieldErrors.product)}
              aria-describedby={
                fieldErrors.product ? `${formId}-product-error` : undefined
              }
              onChange={(e) => setProduct(e.target.value)}
              disabled={submitting}
            >
              <option value="">Select a product</option>
              {products.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </Select>
            {fieldErrors.product ? (
              <p
                id={`${formId}-product-error`}
                className="mt-1 text-sm text-danger"
              >
                {fieldErrors.product}
              </p>
            ) : (
              <p className="mt-1 text-xs text-slate-500">
                Asking about a product does not reserve stock or confirm a price.
              </p>
            )}
          </div>
        ) : null}

        <div className="sm:col-span-2">
          <fieldset>
            <legend className="mb-1 block text-sm font-medium text-navy-800">
              Preferred contact method{" "}
              <span className="text-danger" aria-hidden="true">
                *
              </span>
            </legend>
            <div className="mt-2 flex flex-wrap gap-4">
              {contactMethods.map((method) => (
                <label
                  key={method}
                  className="inline-flex items-center gap-2 text-sm text-slate-700"
                >
                  <input
                    id={
                      method === contactMethods[0]
                        ? `${formId}-contactMethod`
                        : `${formId}-contactMethod-${method}`
                    }
                    type="radio"
                    name="contactMethod"
                    value={method}
                    checked={contactMethod === method}
                    onChange={() => setContactMethod(method)}
                    disabled={submitting}
                    className="h-4 w-4 accent-sky-700"
                  />
                  <span className="capitalize">{method}</span>
                </label>
              ))}
            </div>
            {fieldErrors.contactMethod ? (
              <p className="mt-1 text-sm text-danger">
                {fieldErrors.contactMethod}
              </p>
            ) : null}
          </fieldset>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor={`${formId}-message`}>Message</Label>
          <Textarea
            id={`${formId}-message`}
            name="message"
            rows={4}
            maxLength={enquiryFieldLimits.message}
            value={message}
            invalid={Boolean(fieldErrors.message)}
            aria-describedby={
              fieldErrors.message ? `${formId}-message-error` : undefined
            }
            onChange={(e) => setMessage(e.target.value)}
            disabled={submitting}
            placeholder="Optional details about the site, timing, or questions"
          />
          {fieldErrors.message ? (
            <p
              id={`${formId}-message-error`}
              className="mt-1 text-sm text-danger"
            >
              {fieldErrors.message}
            </p>
          ) : null}
        </div>
      </div>

      {/* Honeypot — must stay empty; hide from assistive tech and sighted users */}
      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor={`${formId}-companyWebsite`}>Company website</label>
        <input
          id={`${formId}-companyWebsite`}
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" loading={submitting}>
          {copy.submitLabel}
        </Button>
        <p className="text-xs text-slate-500">
          Required fields are marked with *. Submitting sends your enquiry to
          our delivery system only when it is configured to accept it.
        </p>
      </div>
    </form>
  );
}
