import { CtaBand } from "@/components/home/CtaBand";
import { HeroVisual } from "@/components/home/HeroVisual";
import { AppShell } from "@/components/layout/AppShell";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Picture } from "@/components/ui/Picture";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import { site } from "@/config/site";
import { formatNgn, getPublishedProduct } from "@/data/products";
import {
  maritimeServices,
  servicesInCommercialOrder,
  type ServiceRecord,
} from "@/data/services";

const deploymentStages = [
  {
    title: "Site and connectivity assessment",
    body: "We start from the vessel or platform: where it operates, what must stay online, and whether a second path such as LTE or VSAT is already in the picture.",
  },
  {
    title: "Mounting and obstructions",
    body: "Masts, cranes, superstructure, and a moving deck change the sky view. The mount has to hold through spray and vibration, not just look clear on a calm day.",
  },
  {
    title: "Cable routing",
    body: "Cable runs on a hull have to survive flex and water. A Gen 3 cable does not fit every dish, so the route and the connector are agreed before anyone drills.",
  },
  {
    title: "Power",
    body: "Offshore and boat power is often a generator, a battery bank, an inverter, or shore power. The terminal's draw has to fit that supply.",
  },
  {
    title: "Onboard network",
    body: "Some jobs stop at a working router. Others, when scoped, separate crew traffic from operations or fail over to another link.",
  },
  {
    title: "Operator coordination",
    body: "Access, inductions, and permit-to-work sit with the vessel or site operator. We work inside that system. We do not replace it or issue offshore certificates.",
  },
  {
    title: "Activation and handover",
    body: "Where the agreed service includes it, we activate the link, note a baseline, and leave practical handover notes. Not every conversation includes a full install.",
  },
] as const;

const marinePlaces = [
  { to: "/starlink-installation-niger-delta", label: "Niger Delta" },
  { to: "/starlink-installation-delta", label: "Delta State" },
  { to: "/starlink-installation-yenagoa", label: "Yenagoa" },
  { to: "/starlink-installation-port-harcourt", label: "Port Harcourt" },
] as const;

function ServiceCard({ service }: { service: ServiceRecord }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-shadow hover:shadow-sm">
      {service.imageSrc ? (
        <Picture
          src={service.imageSrc}
          alt={service.imageAlt || ""}
          className="aspect-[16/10] w-full object-cover object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-navy-800">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-700">
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
  );
}

export function Home() {
  const maritime = maritimeServices();
  const maritimeSlugs = new Set(maritime.map((service) => service.slug));
  const otherServices = servicesInCommercialOrder().filter(
    (service) => !maritimeSlugs.has(service.slug),
  );
  const flatHighPerformance = getPublishedProduct(
    "starlink-flat-high-performance",
  );

  return (
    <AppShell>
      <PageMeta path="/" />
      <main id="main">
        <section
          aria-labelledby="home-hero-heading"
          className="relative overflow-hidden bg-navy-950 text-white"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            aria-hidden="true"
          >
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-sky-500/30" />
            <div className="absolute -right-8 top-16 h-96 w-96 rounded-full border border-sky-300/20" />
          </div>

          <Container className="relative grid gap-10 py-14 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-center md:py-20 lg:py-24">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-300">
                Offshore & maritime connectivity
              </p>
              <h1
                id="home-hero-heading"
                className="mt-4 text-balance text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[3.15rem]"
              >
                Starlink connectivity for vessels, offshore platforms and marine
                operations.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-200/90">
                {site.brandName} helps plan Starlink installations for boats,
                work vessels and offshore sites, including site assessments,
                equipment mounting, cable routing, power considerations and
                onboard Wi-Fi and network setup.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink
                  to="/services/maritime-offshore"
                  variant="primaryOnDark"
                >
                  Explore Offshore & Maritime
                </ButtonLink>
                <ButtonLink to="/services" variant="secondaryOnDark">
                  Explore Our Solutions
                </ButtonLink>
              </div>
            </div>
            <HeroVisual />
          </Container>
        </section>

        {maritime.length > 0 ? (
          <section
            id="offshore"
            aria-labelledby="home-maritime-heading"
            className="bg-white py-[var(--space-section)]"
          >
            <Container>
              <div className="max-w-2xl">
                <h2
                  id="home-maritime-heading"
                  className="text-3xl font-bold text-navy-950"
                >
                  Connectivity built for marine environments
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-700">
                  From working vessels to offshore platforms, plan connectivity
                  around the site, the equipment, the power, the mounting, and
                  the onboard network. Each offering below is a different job.
                </p>
              </div>
              <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {maritime.map((service) => (
                  <li key={service.slug}>
                    <ServiceCard service={service} />
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}

        <section
          id="marine-deployment"
          aria-labelledby="home-process-heading"
          className="bg-slate-100 py-[var(--space-section)]"
        >
          <Container>
            <div className="max-w-2xl">
              <h2
                id="home-process-heading"
                className="text-3xl font-bold text-navy-950"
              >
                How a marine deployment is approached
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                A house install is mostly sky view and a cable to a router. On
                the water, motion, salt, restricted access, and the operator's
                own safety rules decide the job. These are the stages we work
                through when they apply. They are not a package that every
                enquiry includes.
              </p>
            </div>
            <ol className="mt-10 grid gap-4 md:grid-cols-2">
              {deploymentStages.map((stage, index) => (
                <li key={stage.title}>
                  <Card className="h-full">
                    <p className="text-sm font-semibold text-sky-700">
                      {index + 1}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-navy-800">
                      {stage.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {stage.body}
                    </p>
                  </Card>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm">
              <TextLink to="/services/maritime-offshore">
                Review the marine deployment process
              </TextLink>
            </p>
          </Container>
        </section>

        {flatHighPerformance ? (
          <section
            id="marine-equipment"
            aria-labelledby="home-equipment-heading"
            className="bg-white py-[var(--space-section)]"
          >
            <Container className="grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
              {flatHighPerformance.imageSrc ? (
                <Picture
                  src={flatHighPerformance.imageSrc}
                  alt={
                    flatHighPerformance.imageAlt ||
                    "Starlink Flat High Performance kit"
                  }
                  className="aspect-[4/3] w-full rounded-lg object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 520px"
                />
              ) : null}
              <div>
                <h2
                  id="home-equipment-heading"
                  className="text-3xl font-bold text-navy-950"
                >
                  Equipment discussed for marine work
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-700">
                  The boat and offshore pages discuss the{" "}
                  {flatHighPerformance.name} for demanding and on-water use. It
                  is not the right terminal for every craft, and the plan
                  Starlink offers for it is confirmed per vessel. A listed price
                  is the catalogue figure, not a statement that the kit is in
                  stock.
                </p>
                {flatHighPerformance.pricePublished &&
                flatHighPerformance.priceNgn ? (
                  <p className="mt-4 text-lg font-semibold text-navy-950">
                    {formatNgn(flatHighPerformance.priceNgn)}
                  </p>
                ) : null}
                <div className="mt-6 flex flex-wrap gap-4 text-sm">
                  <TextLink to={`/products/${flatHighPerformance.slug}`}>
                    View the Flat High Performance kit
                  </TextLink>
                  <TextLink to="/services/boat-installation">
                    View vessel installation solutions
                  </TextLink>
                </div>
              </div>
            </Container>
          </section>
        ) : null}

        <section
          id="marine-areas"
          aria-labelledby="home-areas-heading"
          className="bg-slate-100 py-[var(--space-section)]"
        >
          <Container>
            <div className="max-w-2xl">
              <h2
                id="home-areas-heading"
                className="text-3xl font-bold text-navy-950"
              >
                Where marine work is discussed
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                These pages describe local conditions. They are not offices, and
                they do not promise a crew on every creek or platform. Scope is
                still agreed per job.
              </p>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {marinePlaces.map((place) => (
                <li key={place.to}>
                  <Card className="h-full">
                    <h3 className="text-lg font-semibold text-navy-800">
                      <TextLink to={place.to}>{place.label}</TextLink>
                    </h3>
                  </Card>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm">
              <TextLink to="/locations">All service areas</TextLink>
            </p>
          </Container>
        </section>

        {otherServices.length > 0 ? (
          <section
            id="services"
            aria-labelledby="home-other-heading"
            className="bg-white py-[var(--space-section)]"
          >
            <Container>
              <div className="max-w-2xl">
                <h2
                  id="home-other-heading"
                  className="text-3xl font-bold text-navy-950"
                >
                  Offices, homes, and other work
                </h2>
                <p className="mt-3 text-base text-slate-700">
                  Enterprise and business connectivity, then residential
                  installation and the rest of the catalogue. These remain
                  available. They are not the first reason this site exists.
                </p>
              </div>
              <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {otherServices.map((service) => (
                  <li key={service.slug}>
                    <ServiceCard service={service} />
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}

        <CtaBand
          title="Contact Skylink about a marine project"
          description={`Call or WhatsApp ${site.phoneDisplay}, or email ${site.email}. Contact for current reach options. The online enquiry form is not available.`}
          primary={{
            to: "/contact?intent=quote&service=maritime-offshore",
            label: "Contact Skylink About a Marine Project",
          }}
          secondary={{
            to: "/services/boat-installation",
            label: "View Vessel Installation Solutions",
          }}
        />
      </main>
    </AppShell>
  );
}
