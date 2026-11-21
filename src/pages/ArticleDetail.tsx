import { Link, useParams } from "react-router-dom";
import { ArticleBody } from "@/components/articles/ArticleBody";
import { CtaBand } from "@/components/home/CtaBand";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Picture } from "@/components/ui/Picture";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import {
  articlesRelatedTo,
  getPublishedArticle,
} from "@/data/articles/articles";
import { NotFound } from "@/pages/NotFound";

export function ArticleDetail() {
  const { slug = "" } = useParams();
  const article = getPublishedArticle(slug);

  if (!article) {
    return <NotFound />;
  }

  const related = articlesRelatedTo(article);

  return (
    <AppShell>
      <PageMeta path={`/blog/${article.slug}`} />
      <main id="main">
        <section className="bg-white py-[var(--space-section)]">
          <Container className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Articles", to: "/blog" },
                { label: article.title },
              ]}
            />
            <p className="mt-4 text-sm font-medium uppercase tracking-wide text-slate-500">
              {article.category}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-navy-950 sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              {article.excerpt}
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Published {article.date}
              {article.updated ? ` · Updated ${article.updated}` : ""}
            </p>
            {article.heroImageSrc ? (
              <Picture
                src={article.heroImageSrc}
                alt={article.heroImageAlt || article.title}
                className="mt-6 aspect-[16/9] w-full rounded-md object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            ) : null}
          </Container>
        </section>

        <section className="bg-slate-100 py-[var(--space-section)]">
          <Container className="max-w-3xl">
            <ArticleBody blocks={article.blocks} />
          </Container>
        </section>

        {article.sources && article.sources.length > 0 ? (
          <section className="bg-white py-[var(--space-section)]">
            <Container className="max-w-3xl">
              <h2 className="text-2xl font-bold text-navy-950">
                Sources and further reading
              </h2>
              <p className="mt-3 leading-relaxed text-slate-700">
                Product details, plans and support instructions can change.
                These authoritative sources were checked during our editorial
                review and are the best place to confirm current information.
              </p>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-base text-slate-700">
                {article.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-sky-700 underline-offset-2 hover:underline"
                    >
                      {source.title}
                    </a>{" "}
                    <span className="text-slate-500">
                      — {source.publisher}; checked {source.checked}
                    </span>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}

        {article.relatedServicePaths.length > 0 ? (
          <section className="bg-white py-[var(--space-section)]">
            <Container className="max-w-3xl">
              <h2 className="text-2xl font-bold text-navy-950">
                Related Skylink pages
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-slate-700">
                {article.relatedServicePaths.map((link) => (
                  <li key={link.path}>
                    <TextLink to={link.path}>{link.label}</TextLink>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="bg-slate-100 py-[var(--space-section)]">
            <Container className="max-w-3xl">
              <h2 className="text-2xl font-bold text-navy-950">
                Related articles
              </h2>
              <ul className="mt-4 space-y-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/blog/${item.slug}`}
                      className="font-medium text-sky-700 underline-offset-2 hover:underline"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-1 text-sm text-slate-600">{item.excerpt}</p>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}

        <CtaBand
          title={article.cta.heading}
          description={article.cta.description}
          primary={{ to: article.cta.to, label: article.cta.label }}
          secondary={{ to: "/blog", label: "All articles" }}
        />
      </main>
    </AppShell>
  );
}
