import { CtaBand } from "@/components/home/CtaBand";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Picture } from "@/components/ui/Picture";
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
              {site.brandName} works where a crew can attend in person. Each
              place page explains local building and site conditions that affect
              a Starlink install in that area.
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
                    <Link to={`/starlink-installation-${place.placeKey}`} className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white no-underline transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]">
                      {place.imageSrc ? <Picture src={place.imageSrc} alt={place.imageAlt || ""} pictureClassName="block overflow-hidden" className="aspect-[16/10] w-full object-cover" sizes="(max-width: 640px) 100vw, 33vw" /> : null}
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-lg font-semibold text-navy-800 group-hover:text-sky-700">{place.placeName}</h3>
                        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">{place.regionLabel}</p>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-700">{place.intro}</p>
                        <span className="mt-4 inline-flex text-sm font-medium text-sky-700">Installation details</span>
                      </div>
                    </Link>
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
          description={`Read Services or About for how we work, then open Contact for current reach options about an installation in your area.`}
        />
      </main>
    </AppShell>
  );
}
import { Link } from "react-router-dom";
