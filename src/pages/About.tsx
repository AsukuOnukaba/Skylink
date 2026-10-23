import { CtaBand } from "@/components/home/CtaBand";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import { site } from "@/config/site";

export function About() {
  return (
    <AppShell>
      <PageMeta
        title={`About ${site.brandName} — Starlink installation business`}
        description={`${site.relationshipPhrase} Learn how ${site.brandName} approaches installation support for homes and businesses in Nigeria.`}
      />
      <main id="main">
        <section className="bg-white py-[var(--space-section)]">
          <Container className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "About" },
              ]}
            />
            <h1 className="mt-4 text-3xl font-bold text-navy-950 sm:text-4xl">
              About {site.brandName}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              {site.relationshipPhrase} We exist to make satellite connectivity
              practical on real sites—homes, offices, and other places that need
              a careful install rather than a vague sales pitch.
            </p>
          </Container>
        </section>

        <section
          aria-labelledby="about-who-heading"
          className="bg-slate-100 py-[var(--space-section)]"
        >
          <Container className="max-w-3xl">
            <h2
              id="about-who-heading"
              className="text-2xl font-bold text-navy-950"
            >
              Who we are
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              {site.brandName} is building a clear digital presence so people
              searching for Starlink installation and connectivity support can
              understand the work, judge whether we are a fit, and reach us when
              live contact options are listed.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              We stay independent in how we describe the relationship to
              Starlink. If a more specific partnership or authorisation statement
              is approved later, it will replace this wording—not inflate it.
            </p>
          </Container>
        </section>

        <section
          aria-labelledby="about-how-heading"
          className="bg-white py-[var(--space-section)]"
        >
          <Container className="max-w-3xl">
            <h2
              id="about-how-heading"
              className="text-2xl font-bold text-navy-950"
            >
              How we work
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Understand the site",
                  body: "Every location is different. We start by clarifying what you need before talking about hardware or mounting.",
                },
                {
                  title: "Explain the path",
                  body: "Survey, quote, or a simple conversation—whichever fits—without forcing an account or checkout flow.",
                },
                {
                  title: "Install with care",
                  body: "Mounting, cabling, and handover are treated as practical field work on your property.",
                },
              ].map((step) => (
                <li key={step.title}>
                  <Card className="h-full">
                    <h3 className="text-lg font-semibold text-navy-800">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {step.body}
                    </p>
                  </Card>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-slate-700">
              Looking for service detail pages? See the{" "}
              <TextLink to="/services">services overview</TextLink>, or open{" "}
              <TextLink to="/contact">Contact</TextLink> for current ways to
              reach us.
            </p>
          </Container>
        </section>

        <CtaBand
          title={`Learn more or get in touch with ${site.brandName}`}
          description="Browse the site for clear installation guidance, then use Contact when live enquiry options are listed."
        />
      </main>
    </AppShell>
  );
}
