import { CtaBand } from "@/components/home/CtaBand";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Picture } from "@/components/ui/Picture";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import { workProjects } from "@/data/work";

export function OurWork() {
  return (
    <AppShell>
      <PageMeta path="/our-work" />
      <main id="main">
        <section className="bg-white py-[var(--space-section)]">
          <Container className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Installation examples" },
              ]}
            />
            <h1 className="mt-4 text-3xl font-bold text-navy-950 sm:text-4xl">
              Installation examples
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              These photographs and notes come from the DataGram installation
              library and are shown here with permission. They record work
              carried out under the DataGram name. They are not Skylink case
              studies, and details the source does not give are not filled in.
            </p>
          </Container>
        </section>
        <section className="bg-slate-100 py-[var(--space-section)]">
          <Container>
            <ul className="grid gap-6 md:grid-cols-2">
              {workProjects.map((project) => (
                <li
                  key={project.id}
                  className="overflow-hidden rounded-lg border border-slate-200 bg-white"
                >
                  <Picture
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    className="aspect-[16/10] w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-navy-800">
                      {project.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">{project.place}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">
                      {project.summary}
                    </p>
                    <p className="mt-4 text-sm">
                      <TextLink to={project.servicePath}>
                        {project.serviceLabel}
                      </TextLink>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm">
              <TextLink to="/gallery">Open the gallery</TextLink>
            </p>
          </Container>
        </section>
        <CtaBand />
      </main>
    </AppShell>
  );
}
