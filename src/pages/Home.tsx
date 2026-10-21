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
import { Icon } from "@/components/icons/Icon";
import { AppShell } from "@/components/layout/AppShell";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";
import { publishedServices } from "@/data/services";
import type { LucideIcon } from "lucide-react";

const serviceIcons: Record<string, LucideIcon> = {
  "residential-installation": HomeIcon,
  "business-connectivity": Building2,
  relocation: MoveRight,
  "wifi-networking": Wifi,
  "backup-power": Zap,
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

  return (
    <AppShell>
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
                {site.brandName} helps you get satellite connectivity in place
                with clear advice and careful installation support. Tell us about
                your site when you are ready to talk through the next step.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink to="/contact?intent=quote" variant="primaryOnDark">
                  Request a quote
                </ButtonLink>
                <ButtonLink to="/about" variant="secondaryOnDark">
                  About {site.brandName}
                </ButtonLink>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-xl border border-white/10 bg-navy-800/60 p-8 shadow-md backdrop-blur-sm">
                <div className="flex h-48 items-center justify-center rounded-lg bg-navy-950/80 sm:h-56">
                  <div className="text-center">
                    <Icon
                      icon={Cable}
                      size="feature"
                      className="mx-auto text-sky-300"
                    />
                    <p className="mt-4 text-sm font-medium text-sky-300">
                      Installation and connectivity support
                    </p>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-400">
                      Practical help getting Starlink working at your location.
                    </p>
                  </div>
                </div>
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
                      <Card className="flex h-full flex-col transition-shadow hover:shadow-sm">
                        <Icon
                          icon={Glyph}
                          size="feature"
                          className="text-sky-700"
                        />
                        <h3 className="mt-4 text-lg font-semibold text-navy-800">
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
                      </Card>
                    </li>
                  );
                })}
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
                A clear path from understanding the work to asking for help—without
                inflated claims or invented credentials.
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
