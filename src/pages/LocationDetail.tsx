import { useLocation } from "react-router-dom";
import { CtaBand } from "@/components/home/CtaBand";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import { getPublishedLocation } from "@/data/locations";
import { getPublishedService } from "@/data/services";
import { NotFound } from "@/pages/NotFound";

/** Canonical path: `/starlink-installation-{placeKey}` (no `/locations/{place}`). */
export function placeKeyFromPath(pathname: string): string | undefined {
  const match = /^\/starlink-installation-([a-z0-9-]+)\/?$/i.exec(pathname);
  return match?.[1];
}

export function LocationDetail() {
  const { pathname } = useLocation();
  const placeKey = placeKeyFromPath(pathname) ?? "";
  const place = getPublishedLocation(placeKey);

  if (!place) {
    return <NotFound />;
  }

  const relatedServices = place.relatedServiceSlugs
    .map((slug) => getPublishedService(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const contactTo = `/contact?intent=quote&location=${encodeURIComponent(place.placeName)}`;

  return (
    <AppShell>
      <PageMeta path={`/starlink-installation-${place.placeKey}`} />
      <main id="main">
        <section className="bg-white py-[var(--space-section)]">
          <Container className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Service areas", to: "/locations" },
                { label: place.placeName },
              ]}
            />
            <p className="mt-4 text-sm font-medium uppercase tracking-wide text-slate-500">
              {place.regionLabel}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-navy-950 sm:text-4xl">
              {place.headline}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              {place.intro}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to={contactTo}>Go to contact</ButtonLink>
              <ButtonLink to="/locations" variant="secondary">
                All service areas
              </ButtonLink>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="location-context-heading"
          className="bg-slate-100 py-[var(--space-section)]"
        >
          <Container className="max-w-3xl">
            <h2
              id="location-context-heading"
              className="text-2xl font-bold text-navy-950"
            >
              Working in {place.placeName}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              {place.localContext}
            </p>
          </Container>
        </section>

        {relatedServices.length > 0 ? (
          <section
            aria-labelledby="location-services-heading"
            className="bg-white py-[var(--space-section)]"
          >
            <Container className="max-w-3xl">
              <h2
                id="location-services-heading"
                className="text-2xl font-bold text-navy-950"
              >
                Services that may apply here
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {relatedServices.map((service) => (
                  <li key={service.slug}>
                    <Card className="h-full">
                      <h3 className="text-lg font-semibold text-navy-800">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-700">
                        {service.shortDescription}
                      </p>
                      <TextLink
                        to={`/services/${service.slug}`}
                        className="mt-3 inline-flex text-sm"
                      >
                        Learn more
                      </TextLink>
                    </Card>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}

        {place.faqs.length > 0 ? (
          <section
            aria-labelledby="location-faq-heading"
            className="bg-slate-100 py-[var(--space-section)]"
          >
            <Container className="max-w-3xl">
              <h2
                id="location-faq-heading"
                className="text-2xl font-bold text-navy-950"
              >
                Local questions
              </h2>
              <div className="mt-6 space-y-4">
                {place.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="rounded-md border border-slate-200 bg-white px-5 py-4"
                  >
                    <summary className="cursor-pointer font-semibold text-navy-800">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </Container>
          </section>
        ) : null}

        <CtaBand
          title={`Talk about ${place.placeName}`}
          description={`Open Contact with ${place.placeName} noted, or read Services and About for how the work is approached.`}
        />
      </main>
    </AppShell>
  );
}
