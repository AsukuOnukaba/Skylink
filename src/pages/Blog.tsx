import { Link } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageMeta } from "@/components/seo/PageMeta";
import { publishedArticles } from "@/data/articles/articles";

const categoryLabel: Record<string, string> = {
  residential: "Residential",
  equipment: "Equipment",
  troubleshooting: "Troubleshooting",
  business: "Business",
  local: "Local",
  maritime: "Maritime",
  news: "Developments",
  forecast: "Outlook",
};

const CATEGORY_ORDER = [
  "residential",
  "equipment",
  "troubleshooting",
  "business",
  "local",
  "maritime",
  "news",
  "forecast",
] as const;

export function Blog() {
  const articles = publishedArticles();
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: articles.filter((article) => article.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <AppShell>
      <PageMeta path="/blog" />
      <main id="main">
        <section className="bg-white py-[var(--space-section)]">
          <Container className="max-w-4xl">
            <Breadcrumbs
              items={[{ label: "Home", to: "/" }, { label: "Articles" }]}
            />
            <h1 className="mt-4 text-3xl font-bold text-navy-950 sm:text-4xl">
              Starlink guides and planning articles
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              Clear, practical guidance for people who want to buy, install or
              troubleshoot Starlink in Nigeria. Browse straightforward advice
              for homes, businesses, equipment buyers and vessel operators,
              with links to official information where details can change.
            </p>
          </Container>
        </section>

        {grouped.map((group) => (
          <section
            key={group.category}
            className="border-t border-slate-200 bg-slate-100 py-[var(--space-section)]"
          >
            <Container className="max-w-4xl">
              <h2 className="text-2xl font-bold text-navy-950">
                {categoryLabel[group.category] ?? group.category}
              </h2>
              <ul className="mt-6 grid gap-4">
                {group.items.map((article) => (
                  <li key={article.slug}>
                    <Link
                      to={`/blog/${article.slug}`}
                      className="block rounded-lg border border-slate-200 bg-white p-5 no-underline transition hover:border-sky-300 hover:shadow-md focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                    >
                      <h3 className="text-xl font-semibold text-navy-900">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700">
                        {article.excerpt}
                      </p>
                      <p className="mt-3 text-xs text-slate-500">
                        Published {article.date}
                        {article.updated && article.updated !== article.date
                          ? ` · Updated ${article.updated}`
                          : ""}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ))}
      </main>
    </AppShell>
  );
}
