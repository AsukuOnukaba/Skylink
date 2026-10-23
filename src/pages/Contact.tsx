import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import { areEnquiryFormsEnabled } from "@/config/enquiryForms";
import {
  hasAnyPublicContactChannel,
  hasPublicEmail,
  hasPublicPhone,
  hasPublicWhatsapp,
  site,
} from "@/config/site";
import { publishedProducts } from "@/data/products";
import { publishedServices } from "@/data/services";
import { cn } from "@/lib/cn";
import type { EnquiryKind } from "@/shared/enquirySchema";

const intents = [
  {
    id: "quote" as const,
    label: "Quote",
    description: "Installation or connectivity pricing conversation",
  },
  {
    id: "survey" as const,
    label: "Site survey",
    description: "Talk through the site before work begins",
  },
  {
    id: "product" as const,
    label: "Product",
    description: "Hardware or kit questions",
  },
];

function resolveServiceSlug(raw: string): string {
  const slug = raw.trim();
  if (!slug) return "";
  return publishedServices().some((s) => s.slug === slug) ? slug : "";
}

function resolveProductSlug(raw: string): string {
  const slug = raw.trim();
  if (!slug) return "";
  return publishedProducts().some((p) => p.slug === slug) ? slug : "";
}

function whatsappHref(
  intent: EnquiryKind,
  serviceSlug: string,
  productSlug: string,
  locationLabel: string,
): string {
  const base = site.social.whatsapp;
  if (!base) return "";
  const parts = [`Hello ${site.brandName}, I would like to enquire.`];
  parts.push(`Type: ${intent}`);
  if (serviceSlug) parts.push(`Service: ${serviceSlug}`);
  if (productSlug) parts.push(`Product: ${productSlug}`);
  if (locationLabel) parts.push(`Location: ${locationLabel}`);
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}text=${encodeURIComponent(parts.join("\n"))}`;
}

function tabHref(
  intent: EnquiryKind,
  serviceSlug: string,
  productSlug: string,
  locationLabel: string,
): string {
  const params = new URLSearchParams();
  params.set("intent", intent);
  if (serviceSlug) params.set("service", serviceSlug);
  if (productSlug) params.set("product", productSlug);
  if (locationLabel) params.set("location", locationLabel);
  return `/contact?${params.toString()}`;
}

/**
 * Contact + enquiry journeys (PH-09).
 * Forms render only when VITE_ENQUIRY_FORMS_ENABLED is true.
 * Live phone/WhatsApp/email render only when OD-01 values exist.
 */
export function Contact() {
  const [params] = useSearchParams();
  const formsEnabled = areEnquiryFormsEnabled();

  const rawService = params.get("service") ?? "";
  const rawProduct = params.get("product") ?? "";
  const locationLabel = params.get("location")?.trim() || "";

  const serviceSlug = useMemo(
    () => resolveServiceSlug(rawService),
    [rawService],
  );
  const productSlug = useMemo(
    () => resolveProductSlug(rawProduct),
    [rawProduct],
  );

  const intent = useMemo((): EnquiryKind => {
    const raw = params.get("intent");
    if (raw === "quote" || raw === "survey" || raw === "product") {
      return raw;
    }
    if (productSlug) return "product";
    return "quote";
  }, [params, productSlug]);

  const active = intents.find((item) => item.id === intent) ?? intents[0];
  const phoneOk = hasPublicPhone();
  const emailOk = hasPublicEmail();
  const whatsappOk = hasPublicWhatsapp();
  const anyChannel = hasAnyPublicContactChannel();
  const waHref = whatsappOk
    ? whatsappHref(intent, serviceSlug, productSlug, locationLabel)
    : "";

  const serviceTitle =
    publishedServices().find((s) => s.slug === serviceSlug)?.title ?? "";
  const productName =
    publishedProducts().find((p) => p.slug === productSlug)?.name ?? "";

  return (
    <AppShell>
      <PageMeta
        title={`Contact ${site.brandName} — Starlink installation enquiries`}
        description={`Learn how to reach ${site.brandName} about Starlink installation and connectivity for homes and businesses.`}
      />
      <main id="main" className="bg-slate-100 py-[var(--space-section)]">
        <Container className="max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Contact" },
            ]}
          />
          <h1 className="mt-4 text-3xl font-bold text-navy-950 sm:text-4xl">
            Contact
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            {formsEnabled
              ? `Choose an enquiry type below${
                  anyChannel
                    ? `, or use the published contact details when you prefer to talk directly`
                    : ""
                }.`
              : anyChannel
                ? `Use the details below to talk with ${site.brandName} about Starlink installation or connectivity support.`
                : `For now, use this site to understand how ${site.brandName} approaches Starlink installation and connectivity. Direct phone, WhatsApp, and email are not published here, and online enquiry submission is not available on this site yet.`}
          </p>

          <div
            className="mt-8 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Enquiry type"
          >
            {intents.map((item) => {
              const selected = item.id === intent;
              return (
                <Link
                  key={item.id}
                  to={tabHref(
                    item.id,
                    serviceSlug,
                    productSlug,
                    locationLabel,
                  )}
                  role="tab"
                  aria-selected={selected}
                  className={cn(
                    "rounded-sm border px-3 py-2 text-sm font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                    selected
                      ? "border-sky-700 bg-sky-700 text-white"
                      : "border-slate-200 bg-white text-navy-800 hover:border-sky-500",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <Card className="mt-6">
            <h2 className="text-lg font-semibold text-navy-800">
              {active.label}
            </h2>
            <p className="mt-2 text-sm text-slate-700">{active.description}</p>
            {serviceTitle || productName || locationLabel ? (
              <p className="mt-3 text-sm text-slate-600">
                Topic from your link
                {serviceTitle ? (
                  <>
                    : service <span className="font-medium">{serviceTitle}</span>
                  </>
                ) : null}
                {productName ? (
                  <>
                    {serviceTitle || locationLabel ? ";" : ":"} product{" "}
                    <span className="font-medium">{productName}</span>
                  </>
                ) : null}
                {locationLabel ? (
                  <>
                    {serviceTitle || productName ? ";" : ":"} location{" "}
                    <span className="font-medium">{locationLabel}</span>
                  </>
                ) : null}
                .
              </p>
            ) : null}

            {formsEnabled ? (
              <EnquiryForm
                key={`${intent}-${serviceSlug}-${productSlug}-${locationLabel}`}
                kind={intent}
                prefill={{
                  serviceSlug,
                  productSlug,
                  locationLabel,
                }}
              />
            ) : (
              <Alert
                tone="info"
                className="mt-5"
                title="Online enquiry form is not available"
              >
                Online enquiry submission is not open on this website yet. No
                enquiry is sent from this page. You can still read how we work
                on <TextLink to="/services">Services</TextLink>,{" "}
                <TextLink to="/products">Products</TextLink>, and{" "}
                <TextLink to="/about">About</TextLink>.
              </Alert>
            )}

            {anyChannel ? (
              <dl className="mt-6 space-y-4 text-sm">
                {phoneOk ? (
                  <div>
                    <dt className="font-semibold text-navy-800">Phone</dt>
                    <dd className="mt-1 text-slate-600">
                      <TextLink
                        external
                        href={`tel:${site.phoneE164}`}
                        className="text-sky-700"
                      >
                        {site.phoneDisplay}
                      </TextLink>
                    </dd>
                  </div>
                ) : null}
                {whatsappOk ? (
                  <div>
                    <dt className="font-semibold text-navy-800">WhatsApp</dt>
                    <dd className="mt-1 text-slate-600">
                      <TextLink
                        external
                        href={waHref}
                        target="_blank"
                        className="text-sky-700"
                      >
                        Message on WhatsApp
                      </TextLink>
                    </dd>
                  </div>
                ) : null}
                {emailOk ? (
                  <div>
                    <dt className="font-semibold text-navy-800">Email</dt>
                    <dd className="mt-1 text-slate-600">
                      <TextLink
                        external
                        href={`mailto:${site.email}`}
                        className="text-sky-700"
                      >
                        {site.email}
                      </TextLink>
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : formsEnabled ? null : (
              <p className="mt-6 text-sm leading-relaxed text-slate-700">
                You can still read how we approach the work on{" "}
                <TextLink to="/services">Services</TextLink> and{" "}
                <TextLink to="/about">About</TextLink>.
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {phoneOk ? (
                <ButtonLink external href={`tel:${site.phoneE164}`}>
                  Call us
                </ButtonLink>
              ) : null}
              {whatsappOk ? (
                <ButtonLink
                  external
                  href={waHref}
                  target="_blank"
                  variant="secondary"
                >
                  WhatsApp
                </ButtonLink>
              ) : null}
              <ButtonLink to="/about" variant="secondary">
                About {site.brandName}
              </ButtonLink>
              <ButtonLink to="/services" variant="secondary">
                View services overview
              </ButtonLink>
            </div>
          </Card>
        </Container>
      </main>
    </AppShell>
  );
}
