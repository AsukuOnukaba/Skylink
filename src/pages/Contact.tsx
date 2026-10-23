import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import {
  hasAnyPublicContactChannel,
  hasPublicEmail,
  hasPublicPhone,
  hasPublicWhatsapp,
  site,
} from "@/config/site";
import { cn } from "@/lib/cn";

const intents = [
  { id: "quote", label: "Quote", description: "Installation or connectivity pricing conversation" },
  { id: "survey", label: "Site survey", description: "Talk through the site before work begins" },
  { id: "product", label: "Product", description: "Hardware or kit questions" },
] as const;

type IntentId = (typeof intents)[number]["id"];

function parseIntent(value: string | null): IntentId {
  if (value === "survey" || value === "product" || value === "quote") {
    return value;
  }
  return "quote";
}

function whatsappHref(
  intent: IntentId,
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

/**
 * Contact structure. Live phone/WhatsApp/email render only when OD-01 values exist.
 * Online enquiry forms remain PH-09.
 */
export function Contact() {
  const [params] = useSearchParams();
  const intent = useMemo(() => parseIntent(params.get("intent")), [params]);
  const serviceSlug = params.get("service")?.trim() || "";
  const productSlug = params.get("product")?.trim() || "";
  const locationLabel = params.get("location")?.trim() || "";
  const active = intents.find((item) => item.id === intent) ?? intents[0];
  const phoneOk = hasPublicPhone();
  const emailOk = hasPublicEmail();
  const whatsappOk = hasPublicWhatsapp();
  const anyChannel = hasAnyPublicContactChannel();
  const waHref = whatsappOk
    ? whatsappHref(intent, serviceSlug, productSlug, locationLabel)
    : "";

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
              {anyChannel
                ? `Use the details below to talk with ${site.brandName} about Starlink installation or connectivity support.`
                : `For now, use this site to understand how ${site.brandName} approaches Starlink installation and connectivity. Direct phone, WhatsApp, and email are not published here, and this website does not send online enquiries.`}
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
                  to={`/contact?intent=${item.id}`}
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
            {serviceSlug || productSlug || locationLabel ? (
              <p className="mt-3 text-sm text-slate-600">
                Topic from your link
                {serviceSlug ? (
                  <>
                    : service <span className="font-medium">{serviceSlug}</span>
                  </>
                ) : null}
                {productSlug ? (
                  <>
                    {serviceSlug || locationLabel ? ";" : ":"} product{" "}
                    <span className="font-medium">{productSlug}</span>
                  </>
                ) : null}
                {locationLabel ? (
                  <>
                    {serviceSlug || productSlug ? ";" : ":"} location{" "}
                    <span className="font-medium">{locationLabel}</span>
                  </>
                ) : null}
                .
              </p>
            ) : null}

            <Alert
              tone="info"
              className="mt-5"
              title="Online enquiry form is not available"
            >
              This website does not submit messages yet. No enquiry is sent from
              this page.
            </Alert>

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
            ) : (
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
