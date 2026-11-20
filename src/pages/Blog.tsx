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
};

export function Blog() {
  const articles = publishedArticles();

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
              Practical Nigeria-focused articles on installation planning,
              hardware choices, troubleshooting, business connectivity, local
              considerations, and maritime work. These complement Skylink
              service and location pages — they are not a substitute for a
              site-specific quotation.
            </p>
          </Container>
        </section>

        <section className="bg-slate-100 py-[var(--space-section)]">
          <Container className="max-w-4xl">
            <ul className="grid gap-4">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="block rounded-lg border border-slate-200 bg-white p-5 no-underline transition hover:border-sky-300 hover:shadow-md focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                      {categoryLabel[article.category] ?? article.category}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-navy-900">
                      {article.title}
                    </h2>
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
      </main>
    </AppShell>
  );
}
