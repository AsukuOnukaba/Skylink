import { useParams } from "react-router-dom";
import { CtaBand } from "@/components/home/CtaBand";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import { site } from "@/config/site";
import { getPublishedService } from "@/data/services";
import { getPublishedProduct } from "@/data/products";
import { NotFound } from "@/pages/NotFound";

export function ServiceDetail() {
  const { slug = "" } = useParams();
  const service = getPublishedService(slug);

  if (!service) {
    return <NotFound />;
  }

  const relatedProducts = service.relatedProductSlugs
    .map((productSlug) => getPublishedProduct(productSlug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const intent = service.primaryCta;
  const contactTo = `/contact?intent=${intent}&service=${encodeURIComponent(service.slug)}`;

  return (
    <AppShell>
      <PageMeta title={service.seoTitle} description={service.seoDescription} />
      <main id="main">
        <section className="bg-white py-[var(--space-section)]">
          <Container className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Services", to: "/services" },
                { label: service.title },
              ]}
            />
            <h1 className="mt-4 text-3xl font-bold text-navy-950 sm:text-4xl">
              {service.title}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              {service.shortDescription}
            </p>
            <p className="mt-2 text-sm text-slate-500">{service.audience}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to={contactTo}>
                {intent === "survey" ? "Ask about a survey" : "Go to contact"}
              </ButtonLink>
              <ButtonLink to="/services" variant="secondary">
                All services
              </ButtonLink>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="service-overview-heading"
          className="bg-slate-100 py-[var(--space-section)]"
        >
          <Container className="max-w-3xl">
            <h2
              id="service-overview-heading"
              className="text-2xl font-bold text-navy-950"
            >
              Overview
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              {service.description}
            </p>
          </Container>
        </section>

        {service.suitableFor.length > 0 ? (
          <section
            aria-labelledby="service-suitable-heading"
            className="bg-white py-[var(--space-section)]"
          >
            <Container className="max-w-3xl">
              <h2
                id="service-suitable-heading"
                className="text-2xl font-bold text-navy-950"
              >
                Who it is for
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-slate-700">
                {service.suitableFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}

        {service.inclusions.length > 0 ? (
          <section
            aria-labelledby="service-included-heading"
            className="bg-slate-100 py-[var(--space-section)]"
          >
            <Container className="max-w-3xl">
              <h2
                id="service-included-heading"
                className="text-2xl font-bold text-navy-950"
              >
                What is included
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-slate-700">
                {service.inclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}

        {service.customerProvides.length > 0 ||
        service.limitations.length > 0 ? (
          <section
            aria-labelledby="service-limits-heading"
            className="bg-white py-[var(--space-section)]"
          >
            <Container className="max-w-3xl">
              <h2
                id="service-limits-heading"
                className="text-2xl font-bold text-navy-950"
              >
                What you will need and limits
              </h2>
              {service.customerProvides.length > 0 ? (
                <>
                  <h3 className="mt-4 text-lg font-semibold text-navy-800">
                    Typically needed from you
                  </h3>
                  <ul className="mt-2 list-disc space-y-2 pl-5 text-base text-slate-700">
                    {service.customerProvides.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              {service.limitations.length > 0 ? (
                <>
                  <h3 className="mt-6 text-lg font-semibold text-navy-800">
                    Honest limits
                  </h3>
                  <ul className="mt-2 list-disc space-y-2 pl-5 text-base text-slate-700">
                    {service.limitations.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </Container>
          </section>
        ) : null}

        {service.processSteps.length > 0 ? (
          <section
            aria-labelledby="service-process-heading"
            className="bg-slate-100 py-[var(--space-section)]"
          >
            <Container className="max-w-3xl">
              <h2
                id="service-process-heading"
                className="text-2xl font-bold text-navy-950"
              >
                How it usually works
              </h2>
              <ol className="mt-6 space-y-4">
                {service.processSteps.map((step, index) => (
                  <li key={step}>
                    <Card>
                      <p className="text-sm font-semibold text-sky-700">
                        Step {index + 1}
                      </p>
                      <p className="mt-1 text-base text-slate-700">{step}</p>
                    </Card>
                  </li>
                ))}
              </ol>
            </Container>
          </section>
        ) : null}

        {relatedProducts.length > 0 ? (
          <section
            aria-labelledby="service-products-heading"
            className="bg-white py-[var(--space-section)]"
          >
            <Container className="max-w-3xl">
              <h2
                id="service-products-heading"
                className="text-2xl font-bold text-navy-950"
              >
                Related products
              </h2>
              <ul className="mt-4 space-y-2 text-base">
                {relatedProducts.map((product) => (
                  <li key={product.slug}>
                    <TextLink to={`/products/${product.slug}`}>
                      {product.name}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}

        {service.faqs.length > 0 ? (
          <section
            aria-labelledby="service-faq-heading"
            className="bg-slate-100 py-[var(--space-section)]"
          >
            <Container className="max-w-3xl">
              <h2
                id="service-faq-heading"
                className="text-2xl font-bold text-navy-950"
              >
                Questions about this service
              </h2>
              <div className="mt-6 space-y-4">
                {service.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="rounded-md border border-slate-200 bg-white px-5 py-4"
                  >
                    <summary className="cursor-pointer font-semibold text-navy-800">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </Container>
          </section>
        ) : null}

        <CtaBand
          title={`Talk through ${service.title.toLowerCase()}`}
          description={`Open Contact to see how to reach ${site.brandName} about this service. Live enquiry channels appear there when they are available.`}
        />
      </main>
    </AppShell>
  );
}
