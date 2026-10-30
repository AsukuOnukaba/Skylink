import { CtaBand } from "@/components/home/CtaBand";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Picture } from "@/components/ui/Picture";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import { site } from "@/config/site";

export function About() {
  return (
    <AppShell>
      <PageMeta path="/about" />
      <main id="main">
        <section className="bg-white py-[var(--space-section)]">
          <Container>
            <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About" }]} />
            <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:items-center">
              <div>
                <h1 className="text-3xl font-bold text-navy-950 sm:text-4xl">About {site.brandName}</h1>
                <p className="mt-4 text-lg leading-relaxed text-slate-700">
                  {site.relationshipPhrase} We provide professional Starlink installation and connectivity support for homes, businesses, enterprise sites, vessels, and offshore operations.
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  The site, users, power, mounting conditions, and network requirement shape the recommendation—not a one-size-fits-all package.
                </p>
              </div>
              <Picture
                src="/images/hero-starlink-rooftop-hp.jpeg"
                alt="Professional Starlink equipment mounted on a rooftop installation"
                pictureClassName="block overflow-hidden rounded-xl"
                className="aspect-[4/3] w-full object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="about-who-heading"
          className="bg-slate-100 py-[var(--space-section)]"
        >
          <Container>
            <h2
              id="about-who-heading"
              className="text-2xl font-bold text-navy-950"
            >
              Who we are
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-700">
              {site.brandName} helps households, business owners, facilities
              teams, organisations, and marine operators decide how a Starlink
              installation should fit their site. Our published services cover
              mounting and cabling, Wi-Fi and network distribution, relocation,
              equipment, backup-power planning, enterprise requirements, and
              specialist maritime installations. We do not claim to be Starlink
              itself.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Homes", "Mounting, cabling, router setup, Wi-Fi coverage, relocation, and power planning."],
                ["Businesses", "Office and commercial installations shaped around staff, premises, and working hours."],
                ["Enterprises", "Larger sites, network integration, distribution, resilience, and multi-building requirements."],
                ["Maritime", "Specialist vessel and offshore planning for mounting, motion, salt, power, and onboard networks."],
              ].map(([title, body]) => (
                <li key={title}><Card className="h-full"><h3 className="font-semibold text-navy-800">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-700">{body}</p></Card></li>
              ))}
            </ul>
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
