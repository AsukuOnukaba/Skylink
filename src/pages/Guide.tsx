import { CtaBand } from "@/components/home/CtaBand";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Picture } from "@/components/ui/Picture";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import { guideSections } from "@/data/guide";

export function Guide() {
  return (
    <AppShell>
      <PageMeta path="/guide/starlink-nigeria" />
      <main id="main">
        <section className="bg-white py-[var(--space-section)]">
          <Container className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Nigeria guide" },
              ]}
            />
            <h1 className="mt-4 text-3xl font-bold text-navy-950 sm:text-4xl">
              Starlink in Nigeria: a practical guide
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              How sky view, power, Wi-Fi, and plan class actually affect a
              Starlink install in Nigeria. This is a reference page, not a blog
              and not a price list for monthly subscriptions.
            </p>
            <Picture
              src="/images/service-residential-installation.jpeg"
              alt="Starlink dish and outdoor antenna on wall brackets during a residential mounting job"
              className="mt-6 aspect-[16/9] w-full rounded-md object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Installation planning summary">
              {[
                ["1. Clear sky", "Check obstructions before choosing a mount."],
                ["2. Stable power", "Plan for grid, inverter, generator, or battery use."],
                ["3. Cable route", "Protect connectors, bends, entries, and exposed runs."],
                ["4. Useful Wi-Fi", "Design coverage for the rooms and buildings that matter."],
              ].map(([title, body]) => (
                <Card key={title} className="p-4"><h2 className="text-sm font-semibold text-navy-800">{title}</h2><p className="mt-2 text-xs leading-relaxed text-slate-600">{body}</p></Card>
              ))}
            </div>
            <nav aria-label="Guide contents" className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                On this page
              </h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">
                {guideSections.map((section) => (
                  <li key={section.id}>
                    <a className="text-sky-700 underline-offset-2 hover:underline" href={`#${section.id}`}>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Container>
        </section>

        {guideSections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className={
              index % 2 === 0
                ? "bg-slate-100 py-[var(--space-section)]"
                : "bg-white py-[var(--space-section)]"
            }
          >
            <Container className="max-w-3xl">
              <h2
                id={`${section.id}-heading`}
                className="text-2xl font-bold text-navy-950"
              >
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="mt-3 text-base leading-relaxed text-slate-700"
                >
                  {paragraph}
                </p>
              ))}
            </Container>
          </section>
        ))}

        <section className="bg-white py-[var(--space-section)]">
          <Container className="max-w-3xl text-sm leading-relaxed text-slate-700">
            <h2 className="text-2xl font-bold text-navy-950">Where to go next</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <TextLink to="/services">Services</TextLink> for installation,
                marine, estate, and plan-class work
              </li>
              <li>
                <TextLink to="/products">Products</TextLink> for hardware prices
              </li>
              <li>
                <TextLink to="/locations">Service areas</TextLink>,{" "}
                <TextLink to="/faq">FAQ</TextLink>, and{" "}
                <TextLink to="/support">Support</TextLink>
              </li>
              <li>
                <TextLink to="/our-work">Installation examples</TextLink> from
                the DataGram field library
              </li>
            </ul>
          </Container>
        </section>
        <CtaBand />
      </main>
    </AppShell>
  );
}
