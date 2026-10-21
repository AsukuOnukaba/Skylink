import { AppShell } from "@/components/layout/AppShell";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

type PhaseStubProps = {
  title: string;
  summary: string;
};

/** Minimal real route so header/footer links are not dead. */
export function PhaseStub({ title, summary }: PhaseStubProps) {
  return (
    <AppShell>
      <main id="main" className="bg-slate-100 py-[var(--space-section)]">
        <Container className="max-w-2xl">
          <h1 className="text-3xl font-bold text-navy-950">{title}</h1>
          <Card className="mt-6">
            <p className="text-base text-slate-700">{summary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to="/">Back to home</ButtonLink>
              <ButtonLink to="/contact?intent=quote" variant="secondary">
                Request a quote
              </ButtonLink>
            </div>
          </Card>
        </Container>
      </main>
    </AppShell>
  );
}
