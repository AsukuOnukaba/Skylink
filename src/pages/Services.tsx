import { Building2, House, Network, Ship, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { CtaBand } from "@/components/home/CtaBand";
import { Icon } from "@/components/icons/Icon";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageMeta } from "@/components/seo/PageMeta";
import { Container } from "@/components/ui/Container";
import { Picture } from "@/components/ui/Picture";
import { site } from "@/config/site";
import { publishedServices, type ServiceRecord } from "@/data/services";

const serviceGroups = [
  {
    id: "residential",
    title: "Residential & home connectivity",
    description: "Professional installation and reliable Wi-Fi planning for houses, apartments, and residential properties.",
    icon: House,
    slugs: ["residential-installation"],
  },
  {
    id: "business",
    title: "Business & commercial connectivity",
    description: "Starlink installation and network planning for offices, shops, clinics, schools, and other commercial premises.",
    icon: Building2,
    slugs: ["business-connectivity"],
  },
  {
    id: "enterprise",
    title: "Enterprise & advanced networking",
    description: "Larger deployments, advanced network distribution, and site-specific connectivity requirements.",
    icon: Network,
    slugs: [
      "enterprise-plans",
      "priority-plans",
      "wifi-networking",
      "long-range-wifi",
      "estate-wifi",
      "wisp-setup",
    ],
  },
  {
    id: "maritime",
    title: "Maritime & offshore connectivity",
    description: "Specialist vessel and offshore services covering mounting, power, cabling, onboard networks, and operator requirements.",
    icon: Ship,
    slugs: [
      "maritime-offshore",
      "boat-installation",
      "offshore-hse",
      "enterprise-marine-hub",
      "marine-sdwan",
      "fleet-management",
    ],
  },
  {
    id: "support",
    title: "Additional installation & support services",
    description: "Equipment, relocation, subscriptions, accessories, power, and related support around a working connection.",
    icon: Wrench,
    slugs: [
      "relocation",
      "backup-power",
      "sales-installation",
      "accessories",
      "subscription-services",
      "global-roaming",
      "roaming-global-priority",
    ],
  },
] as const;

function ServiceCard({ service }: { service: ServiceRecord }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white text-left no-underline transition duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
      aria-label={`Learn more about ${service.title}`}
    >
      {service.imageSrc ? (
        <Picture
          src={service.imageSrc}
          alt={service.imageAlt || ""}
          className="aspect-[16/10] w-full object-cover object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-navy-800 group-hover:text-sky-700">
          {service.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-700">
          {service.shortDescription}
        </p>
        <span className="mt-4 text-sm font-medium text-sky-700 group-hover:underline">
          Learn more
        </span>
      </div>
    </Link>
  );
}

function FeaturedService({ service }: { service: ServiceRecord }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group mt-8 grid overflow-hidden rounded-xl border border-slate-200 bg-white no-underline transition duration-200 hover:border-sky-300 hover:shadow-md focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
    >
      {service.imageSrc ? (
        <Picture
          src={service.imageSrc}
          alt={service.imageAlt || ""}
          pictureClassName="block min-h-0 overflow-hidden"
          className="h-full min-h-64 w-full object-cover object-center"
          sizes="(max-width: 768px) 100vw, 48vw"
        />
      ) : null}
      <div className="flex flex-col justify-center p-7 sm:p-9">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-sky-700">
          Featured service
        </p>
        <h3 className="mt-3 text-2xl font-bold text-navy-950 group-hover:text-sky-700">
          {service.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-slate-700">
          {service.shortDescription}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          {service.audience}
        </p>
        <span className="mt-6 text-sm font-semibold text-sky-700 group-hover:underline">
          Explore {service.title.toLowerCase()}
        </span>
      </div>
    </Link>
  );
}

export function Services() {
  const live = publishedServices();
  const bySlug = new Map(live.map((service) => [service.slug, service]));
  const assigned = new Set<string>(
    serviceGroups.flatMap((group) => [...group.slugs]),
  );
  const groups = serviceGroups.map((group, index) => ({
    ...group,
    services: [
      ...group.slugs
        .map((slug) => bySlug.get(slug))
        .filter((service): service is ServiceRecord => Boolean(service)),
      ...(index === serviceGroups.length - 1
        ? live.filter((service) => !assigned.has(service.slug))
        : []),
    ],
  }));

  return (
    <AppShell>
      <PageMeta path="/services" />
      <main id="main">
        <section className="bg-white py-[var(--space-section)]">
          <Container className="max-w-3xl">
            <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Services" }]} />
            <h1 className="mt-4 text-3xl font-bold text-navy-950 sm:text-4xl">
              Starlink installation & connectivity services
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              {site.brandName} supports homes, businesses, enterprise sites, and maritime operations with installation, equipment, networking, and connectivity services matched to each environment.
            </p>
            <nav aria-label="Service categories" className="mt-8 flex flex-wrap gap-2">
              {groups.map((group) => (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-navy-800 transition-colors hover:border-sky-500 hover:text-sky-700 focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                >
                  {group.title.split(" & ")[0]}
                </a>
              ))}
            </nav>
          </Container>
        </section>

        {groups.map((group, index) =>
          group.services.length > 0 ? (
            <section
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-heading`}
              className={index % 2 === 0 ? "scroll-mt-24 bg-slate-100 py-[var(--space-section)]" : "scroll-mt-24 bg-white py-[var(--space-section)]"}
            >
              <Container>
                <div className="flex max-w-3xl gap-4">
                  <Icon icon={group.icon} size="feature" className="mt-1 shrink-0 text-sky-700" />
                  <div>
                    <h2 id={`${group.id}-heading`} className="text-2xl font-bold text-navy-950 sm:text-3xl">
                      {group.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-slate-700">{group.description}</p>
                  </div>
                </div>
                {group.services.length === 1 ? (
                  <FeaturedService service={group.services[0]} />
                ) : (
                  <ul
                    className={`mt-8 grid gap-5 sm:grid-cols-2 ${
                      group.services.length === 3
                        ? "lg:grid-cols-3"
                        : group.services.length >= 4
                          ? "lg:grid-cols-3"
                          : ""
                    }`}
                  >
                    {group.services.map((service) => (
                      <li key={service.slug}><ServiceCard service={service} /></li>
                    ))}
                  </ul>
                )}
              </Container>
            </section>
          ) : null,
        )}

        <CtaBand
          title="Not sure which service fits?"
          description="Tell Skylink about the location, users, equipment, and connectivity requirement, and start with the most relevant next step."
          primary={{ to: "/contact?intent=quote", label: "Get a Quote" }}
          secondary={{ to: "/about", label: "How Skylink Works" }}
        />
      </main>
    </AppShell>
  );
}
