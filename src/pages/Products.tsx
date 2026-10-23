import { CtaBand } from "@/components/home/CtaBand";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Picture } from "@/components/ui/Picture";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import { site } from "@/config/site";
import { publishedProducts } from "@/data/products";

/**
 * Product catalogue index. Cards appear only for published products.
 * No cart or checkout — informational catalogue with a contact path.
 */
export function Products() {
  const live = publishedProducts();

  return (
    <AppShell>
      <PageMeta path="/products" />
      <main id="main">
        <section className="bg-white py-[var(--space-section)]">
          <Container className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Products" },
              ]}
            />
            <h1 className="mt-4 text-3xl font-bold text-navy-950 sm:text-4xl">
              Products
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              Browse Starlink kits and related networking hardware that may
              support an installation. This is an informational catalogue—not an
              online shop. Pricing and supply are confirmed when you enquire.
            </p>
          </Container>
        </section>

        {live.length > 0 ? (
          <section
            aria-labelledby="products-grid-heading"
            className="bg-slate-100 py-[var(--space-section)]"
          >
            <Container>
              <h2
                id="products-grid-heading"
                className="text-2xl font-bold text-navy-950"
              >
                Available products
              </h2>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {live.map((product) => {
                  const showPrice =
                    product.pricePublished &&
                    typeof product.priceNgn === "number" &&
                    product.priceNgn > 0;
                  return (
                    <li key={product.slug}>
                      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white">
                        {product.imageSrc ? (
                          <Picture
                            src={product.imageSrc}
                            alt={product.imageAlt || product.name}
                            className="aspect-[16/10] w-full object-cover object-center"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : null}
                        <div className="flex flex-1 flex-col p-6">
                          <h3 className="text-lg font-semibold text-navy-800">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                            {product.manufacturer}
                          </p>
                          <p className="mt-2 flex-1 text-sm text-slate-700">
                            {product.shortDescription}
                          </p>
                          <p className="mt-3 text-sm font-semibold text-navy-800">
                            {showPrice
                              ? new Intl.NumberFormat("en-NG", {
                                  style: "currency",
                                  currency: "NGN",
                                  maximumFractionDigits: 0,
                                }).format(product.priceNgn as number)
                              : "Request pricing"}
                          </p>
                          <TextLink
                            to={`/products/${product.slug}`}
                            className="mt-4 inline-flex text-sm"
                          >
                            View details
                          </TextLink>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Container>
          </section>
        ) : (
          <section className="bg-slate-100 py-[var(--space-section)]">
            <Container className="max-w-3xl">
              <h2 className="text-2xl font-bold text-navy-950">
                Hardware conversations
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                Prefer to start with installation support? See{" "}
                <TextLink to="/services">Services</TextLink> or{" "}
                <TextLink to="/about">About</TextLink>, then open{" "}
                <TextLink to="/contact?intent=product">Contact</TextLink> for
                current reach options.
              </p>
            </Container>
          </section>
        )}

        <CtaBand
          title={`Need help choosing hardware with ${site.brandName}?`}
          description={`This site does not run a shopping cart. Read Services or About, then open Contact for current ways to reach ${site.brandName}.`}
        />
      </main>
    </AppShell>
  );
}
