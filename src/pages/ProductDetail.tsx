import { useParams } from "react-router-dom";
import { CtaBand } from "@/components/home/CtaBand";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Picture } from "@/components/ui/Picture";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import { site } from "@/config/site";
import { enquiryContactCtaLabel } from "@/config/enquiryCta";
import { formatNgn, getPublishedProduct } from "@/data/products";
import { getPublishedService } from "@/data/services";
import { NotFound } from "@/pages/NotFound";

export function ProductDetail() {
  const { slug = "" } = useParams();
  const product = getPublishedProduct(slug);

  if (!product) {
    return <NotFound />;
  }

  const relatedServices = product.relatedServiceSlugs
    .map((serviceSlug) => getPublishedService(serviceSlug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const contactTo = `/contact?intent=product&product=${encodeURIComponent(product.slug)}`;
  const showPrice =
    product.pricePublished &&
    typeof product.priceNgn === "number" &&
    product.priceNgn > 0;

  return (
    <AppShell>
      <PageMeta path={`/products/${product.slug}`} />
      <main id="main">
        <section className="bg-white py-[var(--space-section)]">
          <Container className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Products", to: "/products" },
                { label: product.name },
              ]}
            />
            <h1 className="mt-4 text-3xl font-bold text-navy-950 sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 text-sm font-medium text-slate-500">
              {product.manufacturer}
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              {product.shortDescription}
            </p>
            <p className="mt-4 text-base font-semibold text-navy-800">
              {showPrice
                ? formatNgn(product.priceNgn as number)
                : "Request pricing"}
            </p>
            {product.availabilityNote ? (
              <p className="mt-2 text-sm text-slate-600">
                {product.availabilityNote}
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to={contactTo}>
                {enquiryContactCtaLabel("product")}
              </ButtonLink>
              <ButtonLink to="/products" variant="secondary">
                All products
              </ButtonLink>
            </div>
          </Container>
        </section>

        {product.imageSrc ? (
          <section className="bg-slate-100 py-[var(--space-section)]">
            <Container className="max-w-3xl">
              <Picture
                src={product.imageSrc}
                alt={product.imageAlt || product.name}
                className="aspect-[4/3] w-full rounded-lg object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </Container>
          </section>
        ) : null}

        <section
          aria-labelledby="product-desc-heading"
          className="bg-white py-[var(--space-section)]"
        >
          <Container className="max-w-3xl">
            <h2
              id="product-desc-heading"
              className="text-2xl font-bold text-navy-950"
            >
              About this product
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              {product.description}
            </p>
          </Container>
        </section>

        {product.specs.length > 0 ? (
          <section
            aria-labelledby="product-specs-heading"
            className="bg-slate-100 py-[var(--space-section)]"
          >
            <Container className="max-w-3xl">
              <h2
                id="product-specs-heading"
                className="text-2xl font-bold text-navy-950"
              >
                Specifications
              </h2>
              <dl className="mt-6 divide-y divide-slate-200 rounded-md border border-slate-200 bg-white">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid gap-1 px-4 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4"
                  >
                    <dt className="text-sm font-semibold text-navy-800">
                      {spec.label}
                    </dt>
                    <dd className="text-sm text-slate-700">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </Container>
          </section>
        ) : null}

        {product.whatsInBox.length > 0 ? (
          <section
            aria-labelledby="product-box-heading"
            className="bg-white py-[var(--space-section)]"
          >
            <Container className="max-w-3xl">
              <h2
                id="product-box-heading"
                className="text-2xl font-bold text-navy-950"
              >
                In the box
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-slate-700">
                {product.whatsInBox.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}

        {relatedServices.length > 0 ? (
          <section
            aria-labelledby="product-services-heading"
            className="bg-slate-100 py-[var(--space-section)]"
          >
            <Container className="max-w-3xl">
              <h2
                id="product-services-heading"
                className="text-2xl font-bold text-navy-950"
              >
                Related services
              </h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {relatedServices.map((service) => (
                  <li key={service.slug}>
                    <Card className="h-full">
                      <h3 className="text-lg font-semibold text-navy-800">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-700">
                        {service.shortDescription}
                      </p>
                      <TextLink
                        to={`/services/${service.slug}`}
                        className="mt-3 inline-flex text-sm"
                      >
                        Learn more
                      </TextLink>
                    </Card>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}

        <CtaBand
          title={`Ask about ${product.name}`}
          description={`This site does not take checkout orders. Open Contact about this product for current reach options with ${site.brandName}.`}
        />
      </main>
    </AppShell>
  );
}
