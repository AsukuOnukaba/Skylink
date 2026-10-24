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
      <PageMeta path="/about" />
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
              {site.relationshipPhrase} The work we lead with is connectivity
              for boats, work vessels, and offshore sites. Homes, offices, and
              other sites remain part of the same careful installation practice.
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
              {site.brandName} helps operators and households decide whether a
              Starlink installation is a fit. Offshore and maritime jobs are
              scoped around the vessel, the power, and the operator's access
              rules. Home and business installs, remounts, Wi-Fi coverage, and
              backup power planning are still available. We do not claim to be
              Starlink itself.
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
              See{" "}
              <TextLink to="/services/maritime-offshore">
                Offshore & Maritime
              </TextLink>
              , the <TextLink to="/services">services overview</TextLink>,{" "}
              <TextLink to="/products">products</TextLink>,{" "}
              <TextLink to="/locations">service areas</TextLink>, the{" "}
              <TextLink to="/guide/starlink-nigeria">Nigeria guide</TextLink>,
              and{" "}
              <TextLink to="/our-work">installation examples</TextLink>, or
              open <TextLink to="/contact">Contact</TextLink>.
            </p>
          </Container>
        </section>

        <CtaBand
          title={`Learn more or get in touch with ${site.brandName}`}
          description={`Browse Services for how ${site.brandName} approaches installation, then open Contact for current reach options.`}
        />
      </main>
    </AppShell>
  );
}
