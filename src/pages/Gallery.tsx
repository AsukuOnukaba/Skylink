import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Picture } from "@/components/ui/Picture";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import { workProjects } from "@/data/work";

export function Gallery() {
  return (
    <AppShell>
      <PageMeta path="/gallery" />
      <main id="main">
        <section className="bg-white py-[var(--space-section)]">
          <Container className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Gallery" },
              ]}
            />
            <h1 className="mt-4 text-3xl font-bold text-navy-950 sm:text-4xl">
              Installation gallery
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Field photographs from the DataGram library. Captions name the
              place or operator only when the source does. See{" "}
              <TextLink to="/our-work">installation examples</TextLink> for the
              longer notes.
            </p>
          </Container>
        </section>
        <section className="bg-slate-100 py-[var(--space-section)]">
          <Container>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {workProjects.map((project) => (
                <li key={project.id}>
                  <figure className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                    <Picture
                      src={project.imageSrc}
                      alt={project.imageAlt}
                      className="aspect-[4/3] w-full object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <figcaption className="p-4 text-sm text-slate-700">
                      <span className="font-semibold text-navy-800">
                        {project.title}
                      </span>
                      <span className="mt-1 block text-slate-500">
                        {project.place}
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </main>
    </AppShell>
  );
}
