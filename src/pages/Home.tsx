import {
  Building2,
  Cable,
  Home as HomeIcon,
  MoveRight,
  ShieldCheck,
  Wifi,
  Zap,
} from "lucide-react";
import { CtaBand } from "@/components/home/CtaBand";
import { HeroVisual } from "@/components/home/HeroVisual";
import { Icon } from "@/components/icons/Icon";
import { AppShell } from "@/components/layout/AppShell";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Picture } from "@/components/ui/Picture";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import { site } from "@/config/site";
import { formatNgn, publishedProducts } from "@/data/products";
import { publishedServices } from "@/data/services";
import type { LucideIcon } from "lucide-react";

const serviceIcons: Record<string, LucideIcon> = {
  "residential-installation": HomeIcon,
  "business-connectivity": Building2,
  relocation: MoveRight,
  "wifi-networking": Wifi,
  "long-range-wifi": Wifi,
  "backup-power": Zap,
  "wisp-setup": Cable,
  "maritime-offshore": Building2,
};

const whyPoints = [
  {
    title: "Straightforward guidance",
    body: "We explain the installation path in plain language so you can decide whether a survey, a quote, or a conversation is the right next step.",
  },
  {
    title: "Careful installation practice",
    body: "Mounting, cabling, and handover are treated as practical work on your site—not a sales pitch or a software checkout flow.",
  },
  {
    title: "Independent installation focus",
    body: site.relationshipPhrase,
  },
] as const;

export function Home() {
  const live = publishedServices();
  const hardware = publishedProducts();

  return (
    <AppShell>
      <PageMeta path="/" />
      <main id="main">
        <section
          aria-labelledby="home-hero-heading"
          className="relative overflow-hidden bg-navy-950 text-white"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40 motion-safe:opacity-50"
            aria-hidden="true"
          >
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-sky-500/30" />
            <div className="absolute -right-8 top-16 h-96 w-96 rounded-full border border-sky-300/20" />
            <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-navy-950 to-transparent" />
          </div>

          <Container className="relative grid gap-10 py-16 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-center md:py-24 lg:py-28">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-300">
                {site.brandName}
              </p>
              <h1
                id="home-hero-heading"
                className="mt-4 text-balance text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]"
              >
                Starlink installation and connectivity for homes and businesses.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-200/90">
                {site.brandName} helps homes and businesses plan mounting,
                cabling, Wi-Fi coverage, and related Starlink work across
                Nigeria. Browse Services, Products, and Service areas, then open
                Contact for current reach options.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink to="/contact?intent=quote" variant="primaryOnDark">
                  Go to contact
                </ButtonLink>
                <ButtonLink to="/services" variant="secondaryOnDark">
                  View services
                </ButtonLink>
              </div>
            </div>

            <div className="relative">
              <HeroVisual />
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Focus
                  </dt>
                  <dd className="mt-1 text-sm text-white">
                    Installation and connectivity support
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Approach
                  </dt>
                  <dd className="mt-1 text-sm text-white">
                    Independent installation business
                  </dd>
                </div>
              </dl>
            </div>
          </Container>
        </section>

        {live.length > 0 ? (
          <section
            id="services"
            aria-labelledby="home-services-heading"
            className="bg-white py-[var(--space-section)]"
          >
            <Container>
              <div className="max-w-2xl">
                <h2
                  id="home-services-heading"
                  className="text-3xl font-bold text-navy-950"
                >
                  Services
                </h2>
                <p className="mt-3 text-base text-slate-700">
                  Ways {site.brandName} can help with Starlink installation and
                  related connectivity work.
                </p>
              </div>

              <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {live.map((service) => {
                  const Glyph = serviceIcons[service.slug] ?? Cable;
                  return (
                    <li key={service.slug}>
                      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-shadow hover:shadow-sm">
                        {service.imageSrc ? (
                          <Picture
                            src={service.imageSrc}
                            alt={service.imageAlt || ""}
                            className="aspect-[16/10] w-full object-cover object-center"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="flex aspect-[16/10] items-center justify-center bg-slate-50">
                            <Icon
                              icon={Glyph}
                              size="feature"
                              className="text-sky-700"
                            />
                          </div>
                        )}
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
                  );
                })}
              </ul>
            </Container>
          </section>
        ) : null}

        {hardware.length > 0 ? (
          <section
            id="hardware"
            aria-labelledby="home-hardware-heading"
            className="bg-slate-100 py-[var(--space-section)]"
          >
            <Container>
              <div className="max-w-2xl">
                <h2
                  id="home-hardware-heading"
                  className="text-3xl font-bold text-navy-950"
                >
                  Hardware
                </h2>
                <p className="mt-3 text-base text-slate-700">
                  Catalogue prices for the eight listed products. A price is
                  not a stock promise.
                </p>
              </div>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {hardware.map((product) => (
                  <li key={product.slug}>
                    <Card className="h-full">
                      <h3 className="text-base font-semibold text-navy-800">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm font-semibold text-navy-950">
                        {product.pricePublished && product.priceNgn
                          ? formatNgn(product.priceNgn)
                          : "Request pricing"}
                      </p>
                      <TextLink
                        to={`/products/${product.slug}`}
                        className="mt-3 inline-flex text-sm"
                      >
                        View details
                      </TextLink>
                    </Card>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}

        <section
          id="why-skylink"
          aria-labelledby="home-why-heading"
          className="bg-slate-100 py-[var(--space-section)]"
        >
          <Container>
            <div className="max-w-2xl">
              <h2
                id="home-why-heading"
                className="text-3xl font-bold text-navy-950"
              >
                Why {site.brandName}
              </h2>
              <p className="mt-3 text-base text-slate-700">
                Clear guidance, careful field work, and an honest account of
                what we can help with.
              </p>
            </div>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {whyPoints.map((point) => (
                <li key={point.title}>
                  <Card className="h-full">
                    <Icon
                      icon={ShieldCheck}
                      size="ui"
                      className="text-sky-700"
                    />
                    <h3 className="mt-3 text-lg font-semibold text-navy-800">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {point.body}
                    </p>
                  </Card>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm">
              <TextLink to="/about">More about {site.brandName}</TextLink>
            </p>
          </Container>
        </section>

        <CtaBand />
      </main>
    </AppShell>
  );
}
