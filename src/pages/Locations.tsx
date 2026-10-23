import { CtaBand } from "@/components/home/CtaBand";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import { site } from "@/config/site";
import { publishedLocations } from "@/data/locations";

/**
 * Service-area index. Cards appear only for published places with real localContext.
 */
export function Locations() {
  const live = publishedLocations();

  return (
    <AppShell>
      <PageMeta
        title={`Starlink installation areas — ${site.brandName}`}
        description={`${site.brandName} lists installation areas when local service details are confirmed. Browse places here, or use Contact for the next available step.`}
      />
      <main id="main">
        <section className="bg-white py-[var(--space-section)]">
          <Container className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Service areas" },
              ]}
            />
            <h1 className="mt-4 text-3xl font-bold text-navy-950 sm:text-4xl">
              Service areas
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              {site.brandName} works where a crew can attend in person. Place
              pages appear here only when we have clear local notes for that
              area—not a nationwide list invented for search engines.
            </p>
          </Container>
        </section>

        {live.length > 0 ? (
          <section
            aria-labelledby="locations-grid-heading"
            className="bg-slate-100 py-[var(--space-section)]"
          >
            <Container>
              <h2
                id="locations-grid-heading"
                className="text-2xl font-bold text-navy-950"
              >
                Places we cover
              </h2>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {live.map((place) => (
                  <li key={place.placeKey}>
                    <Card className="flex h-full flex-col">
                      <h3 className="text-lg font-semibold text-navy-800">
                        {place.placeName}
                      </h3>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                        {place.regionLabel}
                      </p>
                      <p className="mt-2 flex-1 text-sm text-slate-700">
                        {place.intro}
                      </p>
                      <TextLink
                        to={`/starlink-installation-${place.placeKey}`}
                        className="mt-4 inline-flex text-sm"
                      >
                        {place.placeName} installation details
                      </TextLink>
                    </Card>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : (
          <section className="bg-slate-100 py-[var(--space-section)]">
            <Container className="max-w-3xl">
              <h2 className="text-2xl font-bold text-navy-950">
                Coverage conversations
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                Prefer to start with how we work? See{" "}
                <TextLink to="/services">Services</TextLink>, or open{" "}
                <TextLink to="/contact">Contact</TextLink> for current ways to
                reach us about an installation in your area.
              </p>
            </Container>
          </section>
        )}

        <CtaBand
          title={`Ask about installation in your area`}
          description={`Open Contact to see how to reach ${site.brandName}. We do not invent a nationwide coverage map on this page.`}
        />
      </main>
    </AppShell>
  );
}
