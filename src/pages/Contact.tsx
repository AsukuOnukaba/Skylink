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
import { site } from "@/config/site";
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

function whatsappHref(intent: IntentId, serviceSlug: string, productSlug: string): string {
  const base = site.social.whatsapp;
  if (!base) return "";
  const parts = [
    `Hello ${site.brandName}, I'd like to talk about a Starlink ${intent}.`,
  ];
  if (serviceSlug) parts.push(`Service: ${serviceSlug}.`);
  if (productSlug) parts.push(`Product: ${productSlug}.`);
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}text=${encodeURIComponent(parts.join(" "))}`;
}

/**
 * Contact page. Phone and WhatsApp are live; online form arrives in PH-09.
 */
export function Contact() {
  const [params] = useSearchParams();
  const intent = useMemo(() => parseIntent(params.get("intent")), [params]);
  const serviceSlug = params.get("service")?.trim() || "";
  const productSlug = params.get("product")?.trim() || "";
  const active = intents.find((item) => item.id === intent) ?? intents[0];
  const hasPhone = Boolean(site.phoneDisplay && site.phoneE164);
  const hasEmail = Boolean(site.email);
  const hasWhatsapp = Boolean(site.social.whatsapp);
  const waHref = hasWhatsapp
    ? whatsappHref(intent, serviceSlug, productSlug)
    : "";

  return (
    <AppShell>
      <PageMeta
        title={`Contact ${site.brandName} — Starlink installation enquiries`}
        description={`Call or WhatsApp ${site.brandName} on ${site.phoneDisplay} about Starlink installation and connectivity in Nigeria.`}
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
            Use this page when you want to talk about Starlink installation or
            connectivity support. Call or WhatsApp us on the numbers below. The
            online enquiry form will appear here when it is available.
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
            {serviceSlug || productSlug ? (
              <p className="mt-3 text-sm text-slate-600">
                Context from your link
                {serviceSlug ? (
                  <>
                    : service <span className="font-medium">{serviceSlug}</span>
                  </>
                ) : null}
                {productSlug ? (
                  <>
                    {serviceSlug ? ";" : ":"} product{" "}
                    <span className="font-medium">{productSlug}</span>
                  </>
                ) : null}
                . Mention this when you call or message so we can help faster.
              </p>
            ) : null}

            <Alert
              tone="info"
              className="mt-5"
              title="Online enquiry is not open yet"
            >
              Until the form is available, use phone or WhatsApp below. No
              message is submitted from this website.
            </Alert>

            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-navy-800">Phone</dt>
                <dd className="mt-1 text-slate-600">
                  {hasPhone ? (
                    <TextLink
                      external
                      href={`tel:${site.phoneE164}`}
                      className="text-sky-700"
                    >
                      {site.phoneDisplay}
                    </TextLink>
                  ) : (
                    "Not listed yet."
                  )}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-navy-800">WhatsApp</dt>
                <dd className="mt-1 text-slate-600">
                  {hasWhatsapp ? (
                    <TextLink
                      external
                      href={waHref}
                      target="_blank"
                      className="text-sky-700"
                    >
                      Message on WhatsApp
                    </TextLink>
                  ) : (
                    "Not listed yet."
                  )}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-navy-800">Email</dt>
                <dd className="mt-1 text-slate-600">
                  {hasEmail ? (
                    <TextLink
                      external
                      href={`mailto:${site.email}`}
                      className="text-sky-700"
                    >
                      {site.email}
                    </TextLink>
                  ) : (
                    "Not listed yet."
                  )}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap gap-3">
              {hasPhone ? (
                <ButtonLink external href={`tel:${site.phoneE164}`}>
                  Call us
                </ButtonLink>
              ) : null}
              {hasWhatsapp ? (
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
            </div>
          </Card>
        </Container>
      </main>
    </AppShell>
  );
}
