import { Cable, ShieldCheck } from "lucide-react";
import { CtaBand } from "@/components/home/CtaBand";
import { Icon } from "@/components/icons/Icon";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Picture } from "@/components/ui/Picture";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import { site } from "@/config/site";
import { servicesInCommercialOrder } from "@/data/services";

/**
 * Services hub. Detail links appear only for published catalogue entries.
 */
export function Services() {
  const live = servicesInCommercialOrder();

  return (
    <AppShell>
      <PageMeta path="/services" />
      <main id="main">
        <section className="bg-white py-[var(--space-section)]">
          <Container className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Services" },
              ]}
            />
            <h1 className="mt-4 text-3xl font-bold text-navy-950 sm:text-4xl">
              Services
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              {site.relationshipPhrase} Offshore and maritime work is listed
              first. Offices, homes, and the rest of the catalogue follow.
            </p>
          </Container>
        </section>

        <section
          aria-labelledby="services-focus-heading"
          className="bg-slate-100 py-[var(--space-section)]"
        >
          <Container>
            <div className="max-w-2xl">
              <h2
                id="services-focus-heading"
                className="text-2xl font-bold text-navy-950"
              >
                What we help with
              </h2>
              <p className="mt-3 text-base text-slate-700">
                Vessel and offshore jobs are planned around motion, power,
                access, and the operator's own safety rules. Home and office
                installs stay on this list, further down.
              </p>
            </div>
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              <li>
                <Card className="h-full">
                  <Icon icon={Cable} size="feature" className="text-sky-700" />
                  <h3 className="mt-4 text-lg font-semibold text-navy-800">
                    Offshore and maritime
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    Mounting, cabling, power, and onboard networking for boats,
                    work vessels, and offshore sites. Scope is agreed per job.{" "}
                    <TextLink to="/services/maritime-offshore">
                      Explore Offshore & Maritime
                    </TextLink>
                    .
                  </p>
                </Card>
              </li>
              <li>
                <Card className="h-full">
                  <Icon
                    icon={ShieldCheck}
                    size="feature"
                    className="text-sky-700"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-navy-800">
                    Straightforward next steps
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    We explain whether a conversation, quote, or site survey is
                    the sensible path—then point you to{" "}
                    <TextLink to="/about">About</TextLink> and{" "}
                    <TextLink to="/contact">Contact</TextLink>.
                  </p>
                </Card>
              </li>
            </ul>
          </Container>
        </section>

        {live.length > 0 ? (
          <section
            aria-labelledby="services-list-heading"
            className="bg-white py-[var(--space-section)]"
          >
            <Container>
              <h2
                id="services-list-heading"
                className="text-2xl font-bold text-navy-950"
              >
                Service details
              </h2>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {live.map((service) => (
                  <li key={service.slug}>
                    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white">
                      {service.imageSrc ? (
                        <Picture
                          src={service.imageSrc}
                          alt={service.imageAlt || ""}
                          className="aspect-[16/10] w-full object-cover object-center"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : null}
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-lg font-semibold text-navy-800">
                          {service.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm text-slate-700">
                          {service.shortDescription}
                        </p>
                        <TextLink
                          to={`/services/${service.slug}`}
                          className="mt-4 inline-flex text-sm"
                        >
                          Learn more
                        </TextLink>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}

        <CtaBand />
      </main>
    </AppShell>
  );
}
