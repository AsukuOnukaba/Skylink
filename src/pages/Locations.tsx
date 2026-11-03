import { Link } from "react-router-dom";
import { CtaBand } from "@/components/home/CtaBand";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Picture } from "@/components/ui/Picture";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import { site } from "@/config/site";
import {
  confirmedAreasByRegion,
  coverageRegionSections,
  locationIndexLabel,
  regionalGuideLocations,
  type LocationRecord,
} from "@/data/locations";

/**
 * Service-area index. Cards appear only for published places with real localContext.
 * Organised by region around the 15 client-confirmed areas; Niger Delta is a guide.
 */
export function Locations() {
  const regions = coverageRegionSections
    .map((section) => ({
      ...section,
      places: confirmedAreasByRegion(section.id),
    }))
    .filter((section) => section.places.length > 0);
  const guides = regionalGuideLocations();
  const hasCards = regions.length > 0;

  return (
    <AppShell>
      <PageMeta path="/locations" />
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
              {site.brandName} provides Starlink installation and connectivity
              services across confirmed locations in Nigeria. Each place page
              explains local building and site conditions that affect an
              install. These pages do not imply a physical office in every
              location, or that every installation can be completed
              immediately.
            </p>
          </Container>
        </section>

        {hasCards ? (
          <section
            aria-labelledby="locations-grid-heading"
            className="bg-slate-100 py-[var(--space-section)]"
          >
            <Container>
              <h2
                id="locations-grid-heading"
                className="text-2xl font-bold text-navy-950"
              >
                Confirmed service locations
              </h2>
              <div className="mt-10 space-y-12">
                {regions.map((section) => (
                  <div key={section.id}>
                    <h3 className="text-lg font-semibold text-navy-900">
                      {section.label}
                    </h3>
                    <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {section.places.map((place) => (
                        <li key={place.placeKey} className="h-full">
                          <LocationCard place={place} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {guides.length > 0 ? (
                <div className="mt-14 border-t border-slate-200 pt-10">
                  <h3 className="text-lg font-semibold text-navy-900">
                    Regional guide
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-700">
                    The Niger Delta overview supports confirmed Rivers, Delta,
                    and Bayelsa coverage. It is not a separate sixteenth
                    service area and does not claim every delta settlement is
                    covered.
                  </p>
                  <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {guides.map((place) => (
                      <li key={place.placeKey} className="h-full">
                        <LocationCard place={place} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
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
          description={`Read Services or About for how we work, then open Contact for current reach options about an installation in your area.`}
        />
      </main>
    </AppShell>
  );
}

function LocationCard({ place }: { place: LocationRecord }) {
  const title = locationIndexLabel(place);

  return (
    <Link
      to={`/starlink-installation-${place.placeKey}`}
      className="group flex h-full min-h-[18rem] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white no-underline transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
    >
      {place.imageSrc ? (
        <Picture
          src={place.imageSrc}
          alt={place.imageAlt || ""}
          pictureClassName="block overflow-hidden"
          className="aspect-[16/10] w-full object-cover"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <h4 className="text-lg font-semibold text-navy-800 group-hover:text-sky-700">
          {title}
        </h4>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
          {place.regionLabel}
        </p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-700">
          {place.intro}
        </p>
        <span className="mt-4 inline-flex text-sm font-medium text-sky-700">
          Installation details
        </span>
      </div>
    </Link>
  );
}
