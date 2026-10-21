import { AppShell } from "@/components/layout/AppShell";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PageMeta } from "@/components/seo/PageMeta";
import { site } from "@/config/site";

export function NotFound() {
  return (
    <AppShell>
      <PageMeta
        title={`Page not found — ${site.brandName}`}
        description={`The page you requested is not available. Return home or contact ${site.brandName} for Starlink installation help.`}
      />
      <main id="main" className="bg-slate-100 py-[var(--space-section)]">
        <Container className="max-w-xl">
          <Card>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
              404
            </p>
            <h1 className="mt-2 text-3xl font-bold text-navy-950">
              Page not found
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              That address is not available on this site. Use one of the links
              below to continue.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to="/">Home</ButtonLink>
              <ButtonLink to="/services" variant="secondary">
                Services
              </ButtonLink>
              <ButtonLink to="/contact" variant="secondary">
                Contact
              </ButtonLink>
            </div>
          </Card>
        </Container>
      </main>
    </AppShell>
  );
}
