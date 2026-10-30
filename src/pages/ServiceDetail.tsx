import { useParams } from "react-router-dom";
import { CtaBand } from "@/components/home/CtaBand";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageMeta } from "@/components/seo/PageMeta";
import {
  RelatedProductCards,
  RelatedServiceCards,
  ServiceFitAndBenefits,
  ServiceHero,
  ServiceProcess,
  ServiceRequirements,
} from "@/components/service/ServicePageSections";
import { Container } from "@/components/ui/Container";
import { enquiryContactCtaLabel } from "@/config/enquiryCta";
import { getPublishedProduct } from "@/data/products";
import {
  getPublishedService,
  maritimeServiceSlugs,
  relatedPublishedServices,
} from "@/data/services";
import { NotFound } from "@/pages/NotFound";

export function ServiceDetail() {
  const { slug = "" } = useParams();
  const service = getPublishedService(slug);

  if (!service) return <NotFound />;

  const relatedProducts = service.relatedProductSlugs
    .map((productSlug) => getPublishedProduct(productSlug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));
  const relatedServices = relatedPublishedServices(service.slug);
  const maritimePage = (maritimeServiceSlugs as readonly string[]).includes(service.slug);
  const contactTo = `/contact?intent=${service.primaryCta}&service=${encodeURIComponent(service.slug)}`;
  const ctaLabel = enquiryContactCtaLabel(service.primaryCta);

  return (
    <AppShell>
      <PageMeta path={`/services/${service.slug}`} />
      <main id="main">
        <section className="bg-slate-100 py-[var(--space-section)]">
          <Container>
            <div className="max-w-3xl">
              <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: service.title }]} />
              <h1 className="mt-4 text-3xl font-bold text-navy-950 sm:text-4xl">{service.title}</h1>
            </div>
            <ServiceHero service={service} contactTo={contactTo} ctaLabel={ctaLabel} />
          </Container>
        </section>

        <section aria-labelledby="service-overview-heading" className="bg-white py-[var(--space-section)]">
          <Container className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-sky-700">Service overview</p>
              <h2 id="service-overview-heading" className="mt-2 text-2xl font-bold text-navy-950">Plan for the actual environment</h2>
            </div>
            <p className="text-base leading-relaxed text-slate-700">{service.description}</p>
          </Container>
        </section>

        {(service.suitableFor.length > 0 || service.inclusions.length > 0) ? (
          <section aria-labelledby="service-fit-heading" className="bg-slate-100 py-[var(--space-section)]">
            <Container>
              <h2 id="service-fit-heading" className="text-2xl font-bold text-navy-950">Fit and scope</h2>
              <div className="mt-6"><ServiceFitAndBenefits service={service} /></div>
            </Container>
          </section>
        ) : null}

        {(service.customerProvides.length > 0 || service.limitations.length > 0) ? (
          <section aria-labelledby="service-requirements-heading" className="bg-white py-[var(--space-section)]">
            <Container>
              <h2 id="service-requirements-heading" className="text-2xl font-bold text-navy-950">Requirements and boundaries</h2>
              <div className="mt-6"><ServiceRequirements service={service} /></div>
            </Container>
          </section>
        ) : null}

        {service.processSteps.length > 0 ? (
          <section aria-labelledby="service-process-heading" className="bg-slate-100 py-[var(--space-section)]">
            <Container>
              <div className="max-w-2xl">
                <h2 id="service-process-heading" className="text-2xl font-bold text-navy-950">How it usually works</h2>
                <p className="mt-3 text-base text-slate-700">The final sequence is agreed around the site, access, equipment, and service scope.</p>
              </div>
              <div className="mt-6"><ServiceProcess steps={service.processSteps} /></div>
            </Container>
          </section>
        ) : null}

        {relatedServices.length > 0 ? (
          <section aria-labelledby="service-related-heading" className="bg-white py-[var(--space-section)]">
            <Container>
              <h2 id="service-related-heading" className="text-2xl font-bold text-navy-950">Related services</h2>
              <div className="mt-6"><RelatedServiceCards services={relatedServices} /></div>
            </Container>
          </section>
        ) : null}

        {relatedProducts.length > 0 ? (
          <section aria-labelledby="service-products-heading" className="bg-slate-100 py-[var(--space-section)]">
            <Container>
              <h2 id="service-products-heading" className="text-2xl font-bold text-navy-950">Related products</h2>
              <div className="mt-6"><RelatedProductCards products={relatedProducts} /></div>
            </Container>
          </section>
        ) : null}

        {service.faqs.length > 0 ? (
          <section aria-labelledby="service-faq-heading" className="bg-white py-[var(--space-section)]">
            <Container className="max-w-4xl">
              <h2 id="service-faq-heading" className="text-2xl font-bold text-navy-950">Questions about this service</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {service.faqs.map((faq) => (
                  <details key={faq.question} className="h-fit rounded-md border border-slate-200 bg-white px-5 py-4">
                    <summary className="cursor-pointer font-semibold text-navy-800">{faq.question}</summary>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </Container>
          </section>
        ) : null}

        <CtaBand
          title={maritimePage ? "Contact Skylink about a marine project" : `Talk through ${service.title.toLowerCase()}`}
          description={`Contact Skylink with the location, equipment, and requirement for ${service.title.toLowerCase()}. Online form submission remains unavailable until delivery is configured.`}
          primary={{ to: contactTo, label: maritimePage ? "Discuss a Marine Project" : ctaLabel }}
          secondary={{ to: "/services", label: "All Services" }}
        />
      </main>
    </AppShell>
  );
}
