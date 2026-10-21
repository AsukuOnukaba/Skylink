import { CtaBand } from "@/components/home/CtaBand";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import { site } from "@/config/site";
import { faqItems } from "@/data/faq";

export function Faq() {
  return (
    <AppShell>
      <PageMeta
        title={`FAQ — ${site.brandName} Starlink installation`}
        description={`Answers about ${site.brandName}, Starlink installation support, and how to get in touch. Only verified questions are listed.`}
      />
      <main id="main">
        <section className="bg-white py-[var(--space-section)]">
          <Container className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "FAQ" },
              ]}
            />
            <h1 className="mt-4 text-3xl font-bold text-navy-950 sm:text-4xl">
              Frequently asked questions
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Short answers about {site.brandName} and how we help with Starlink
              connectivity. Questions about price, coverage maps, or special
              authorisations are omitted until those answers are confirmed.
            </p>

            <div className="mt-10 space-y-4">
              {faqItems.map((item) => (
                <details
                  key={item.id}
                  className="group rounded-md border border-slate-200 bg-slate-100 px-5 py-4 open:bg-white"
                >
                  <summary className="cursor-pointer list-none text-base font-semibold text-navy-800 marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-4">
                      {item.question}
                      <span
                        aria-hidden="true"
                        className="mt-0.5 text-sky-700 transition group-open:rotate-45"
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>

            <p className="mt-8 text-sm text-slate-700">
              Still deciding? Read{" "}
              <TextLink to="/about">About {site.brandName}</TextLink> or the{" "}
              <TextLink to="/services">services overview</TextLink>, then visit{" "}
              <TextLink to="/contact">Contact</TextLink>.
            </p>
          </Container>
        </section>
        <CtaBand />
      </main>
    </AppShell>
  );
}
