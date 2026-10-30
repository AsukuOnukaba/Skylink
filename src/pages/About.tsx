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
              {site.relationshipPhrase} We provide professional Starlink
              installation and connectivity support for homes, businesses,
              enterprise sites, vessels, and offshore operations.
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
              {site.brandName} helps households, business owners, facilities
              teams, organisations, and marine operators decide how a Starlink
              installation should fit their site. Our published services cover
              mounting and cabling, Wi-Fi and network distribution, relocation,
              equipment, backup-power planning, enterprise requirements, and
              specialist maritime installations. We do not claim to be Starlink
              itself.
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
                  title: "Understand the requirement",
                  body: "We start with the location, users, connectivity needs, and the environment before recommending hardware or mounting.",
                },
                {
                  title: "Assess the site",
                  body: "Sky view, mounting, cable routes, power, network layout, access, and approvals shape the agreed approach.",
                },
                {
                  title: "Install and hand over",
                  body: "We complete the agreed installation and configuration, test it on site, and explain the working setup.",
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
              Explore the <TextLink to="/services">services overview</TextLink>,{" "}
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
          title={`Talk to ${site.brandName} about your connectivity needs`}
          description="From a home installation or office network to an enterprise site or vessel, start with your location and requirements."
          primary={{ to: "/contact?intent=quote", label: "Get a Quote" }}
          secondary={{ to: "/services", label: "Explore Services" }}
        />
      </main>
    </AppShell>
  );
}
