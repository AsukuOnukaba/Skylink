import { CtaBand } from "@/components/home/CtaBand";
import { ProductImage } from "@/components/catalogue/ProductImage";
import { HeroVisual } from "@/components/home/HeroVisual";
import { AppShell } from "@/components/layout/AppShell";
import { PageMeta } from "@/components/seo/PageMeta";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Picture } from "@/components/ui/Picture";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";
import { publishedLocations } from "@/data/locations";
import {
  formatNgn,
  getPublishedProduct,
  type ProductRecord,
} from "@/data/products";
import { getPublishedService, type ServiceRecord } from "@/data/services";

const solutionCategories = [
  {
    slug: "residential-installation",
    label: "Residential installation",
    description:
      "Home installations with site assessment, roof or wall mounting, cable routing, router setup, and practical Wi-Fi planning.",
  },
  {
    slug: "business-connectivity",
    label: "Business installation",
    description:
      "Connectivity for offices and commercial sites, planned around users, mounting, cabling, and the working network.",
  },
  {
    slug: "enterprise-plans",
    label: "Enterprise solutions",
    description:
      "Larger-site connectivity planning, integration with existing networks, and deployment requirements agreed for each organisation.",
  },
  {
    slug: "maritime-offshore",
    label: "Maritime & offshore",
    description:
      "Specialist mounting, power, cabling, and onboard network planning for vessels and offshore environments.",
  },
] as const;

const processSteps = [
  {
    title: "Consultation",
    body: "We start with your location, connectivity requirements, users, equipment, and installation environment.",
  },
  {
    title: "Site assessment",
    body: "We assess sky view, mounting options, cable routes, power, network needs, access, and other site constraints.",
  },
  {
    title: "Installation & configuration",
    body: "We complete the agreed mounting, cabling, equipment setup, and network configuration for the site.",
  },
  {
    title: "Testing & handover",
    body: "We test the installation and explain the setup, practical next steps, and relevant handover information.",
  },
] as const;

const additionalServiceSlugs = [
  "relocation",
  "wifi-networking",
  "long-range-wifi",
  "backup-power",
  "sales-installation",
  "estate-wifi",
] as const;

const featuredProductSlugs = [
  "starlink-gen3-standard",
  "starlink-mesh-router",
  "wireless-long-range-wifi",
  "starlink-flat-high-performance",
] as const;

function getServices(slugs: readonly string[]): ServiceRecord[] {
  return slugs
    .map((slug) => getPublishedService(slug))
    .filter((service): service is ServiceRecord => Boolean(service));
}

function ServiceCard({
  service,
  title,
  description,
}: {
  service: ServiceRecord;
  title?: string;
  description?: string;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {service.imageSrc ? (
        <Picture
          src={service.imageSrc}
          alt={service.imageAlt || ""}
          className="aspect-[16/10] w-full object-cover object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-navy-800">
          {title || service.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-700">
          {description || service.shortDescription}
        </p>
        <TextLink to={`/services/${service.slug}`} className="mt-4 inline-flex text-sm">
          Explore this solution
        </TextLink>
      </div>
    </article>
  );
}

function ProductCard({ product }: { product: ProductRecord }) {
  const showPrice =
    product.pricePublished &&
    typeof product.priceNgn === "number" &&
    product.priceNgn > 0;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white">
      <ProductImage
        product={product}
        className="aspect-[16/10] w-full"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-navy-800">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-700">
          {product.shortDescription}
        </p>
        <p className="mt-3 text-sm font-semibold text-navy-950">
          {showPrice ? formatNgn(product.priceNgn as number) : "Request pricing"}
        </p>
        <TextLink to={`/products/${product.slug}`} className="mt-3 inline-flex text-sm">
          View product
        </TextLink>
      </div>
    </article>
  );
}

export function Home() {
  const solutions = solutionCategories
    .map((category) => ({
      ...category,
      service: getPublishedService(category.slug),
    }))
    .filter(
      (item): item is (typeof solutionCategories)[number] & { service: ServiceRecord } =>
        Boolean(item.service),
    );
  const additionalServices = getServices(additionalServiceSlugs);
  const maritime = getPublishedService("maritime-offshore");
  const products = featuredProductSlugs
    .map((slug) => getPublishedProduct(slug))
    .filter((product): product is ProductRecord => Boolean(product));
  const places = publishedLocations().slice(0, 4);

  return (
    <AppShell>
      <PageMeta path="/" />
      <main id="main">
        <section
          aria-labelledby="home-hero-heading"
          className="relative overflow-hidden bg-navy-950 text-white"
        >
          <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-sky-500/30" />
            <div className="absolute -right-8 top-16 h-96 w-96 rounded-full border border-sky-300/20" />
          </div>
          <Container className="relative grid gap-10 py-14 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-center md:py-20 lg:py-24">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-300">
                Professional Starlink installation & connectivity
              </p>
              <h1
                id="home-hero-heading"
                className="mt-4 text-balance text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[3.15rem]"
              >
                Reliable Starlink connectivity for homes, businesses, enterprises & beyond.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-200/90">
                From residential installations and business networking to enterprise deployments and maritime connectivity, {site.brandName} helps you plan, install, and optimise Starlink solutions for your location and requirements.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink to="/services" variant="primaryOnDark">
                  Explore Our Services
                </ButtonLink>
                <ButtonLink to="/contact?intent=quote" variant="secondaryOnDark">
                  Get a Quote
                </ButtonLink>
              </div>
            </div>
            <HeroVisual />
          </Container>
        </section>

        <section id="solutions" aria-labelledby="home-solutions-heading" className="bg-white py-[var(--space-section)]">
          <Container>
            <div className="max-w-2xl">
              <h2 id="home-solutions-heading" className="text-3xl font-bold text-navy-950">
                Our connectivity solutions
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                Professional installation and connectivity planning for the environment where you need Starlink to work.
              </p>
            </div>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {solutions.map(({ service, label, description }) => (
                <li key={service.slug}>
                  <ServiceCard service={service} title={label} description={description} />
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section id="how-it-works" aria-labelledby="home-process-heading" className="bg-slate-100 py-[var(--space-section)]">
          <Container>
            <div className="max-w-2xl">
              <h2 id="home-process-heading" className="text-3xl font-bold text-navy-950">
                How Skylink works
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                The exact scope changes by property, business, enterprise site, or vessel, but every project starts with the environment and the connectivity requirement.
              </p>
            </div>
            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <li key={step.title}>
                  <Card className="h-full">
                    <p className="text-sm font-semibold text-sky-700">0{index + 1}</p>
                    <h3 className="mt-2 text-lg font-semibold text-navy-800">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{step.body}</p>
                  </Card>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {maritime ? (
          <section id="maritime" aria-labelledby="home-maritime-heading" className="bg-white py-[var(--space-section)]">
            <Container className="grid gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center">
              {maritime.imageSrc ? (
                <Picture
                  src={maritime.imageSrc}
                  alt={maritime.imageAlt || "Maritime Starlink installation"}
                  className="aspect-[4/3] w-full rounded-lg object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 560px"
                />
              ) : null}
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-sky-700">Maritime specialisation</p>
                <h2 id="home-maritime-heading" className="mt-3 text-3xl font-bold text-navy-950">
                  Specialised connectivity for maritime & offshore operations
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-700">
                  Vessel and offshore installations bring specific mounting, motion, salt exposure, power, cable-routing, access, and onboard-network requirements. Skylink scopes those constraints with the operator and keeps the detailed deployment process on the dedicated maritime pages.
                </p>
                <div className="mt-6">
                  <ButtonLink to="/services/maritime-offshore">Explore Maritime & Offshore</ButtonLink>
                </div>
              </div>
            </Container>
          </section>
        ) : null}

        <section id="additional-services" aria-labelledby="home-additional-heading" className="bg-slate-100 py-[var(--space-section)]">
          <Container>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <h2 id="home-additional-heading" className="text-3xl font-bold text-navy-950">
                  More installation & connectivity support
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-700">
                  Extend, move, protect, or improve an existing connection with published services matched to your site.
                </p>
              </div>
              <TextLink to="/services" className="shrink-0">View all services</TextLink>
            </div>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {additionalServices.map((service) => (
                <li key={service.slug}><ServiceCard service={service} /></li>
              ))}
            </ul>
          </Container>
        </section>

        {products.length > 0 ? (
          <section id="products" aria-labelledby="home-products-heading" className="bg-white py-[var(--space-section)]">
            <Container>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <h2 id="home-products-heading" className="text-3xl font-bold text-navy-950">Products & equipment</h2>
                  <p className="mt-3 text-base leading-relaxed text-slate-700">
                    Explore general-purpose Starlink kits, networking hardware, mounting accessories, and specialist equipment. Published prices do not confirm stock.
                  </p>
                </div>
                <TextLink to="/products" className="shrink-0">Browse all products</TextLink>
              </div>
              <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => <li key={product.slug}><ProductCard product={product} /></li>)}
              </ul>
            </Container>
          </section>
        ) : null}

        {places.length > 0 ? (
          <section id="service-areas" aria-labelledby="home-areas-heading" className="bg-slate-100 py-[var(--space-section)]">
            <Container>
              <div className="max-w-2xl">
                <h2 id="home-areas-heading" className="text-3xl font-bold text-navy-950">Service areas</h2>
                <p className="mt-3 text-base leading-relaxed text-slate-700">
                  Browse published location guidance for local building, access, weather, and installation conditions. These pages do not imply an office in every location.
                </p>
              </div>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {places.map((place) => (
                  <li key={place.placeKey}>
                    <Card className="h-full">
                      <h3 className="text-lg font-semibold text-navy-800">
                        <TextLink to={`/starlink-installation-${place.placeKey}`}>{place.placeName}</TextLink>
                      </h3>
                      <p className="mt-2 text-sm text-slate-700">{place.regionLabel}</p>
                    </Card>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm"><TextLink to="/locations">View all service areas</TextLink></p>
            </Container>
          </section>
        ) : null}

        <CtaBand
          title="Ready to get connected?"
          description={`Whether you are setting up Starlink at home, connecting your business, planning an enterprise deployment, or exploring maritime solutions, speak with ${site.brandName} about your requirements.`}
          primary={{ to: "/contact", label: "Contact Skylink" }}
          secondary={{ to: "/services", label: "Explore Services" }}
        />
      </main>
    </AppShell>
  );
}
