import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { site } from "@/config/site";

const intentLabels = {
  quote: "a quote",
  survey: "a site survey",
  product: "a product conversation",
} as const;

/**
 * Contact shell so homepage CTAs have a real destination.
 * Enquiry forms and live channel numbers arrive in later phases.
 */
export function Contact() {
  const [params] = useSearchParams();
  const intent = useMemo(() => {
    const value = params.get("intent");
    if (value === "survey" || value === "product" || value === "quote") {
      return value;
    }
    return "quote";
  }, [params]);

  return (
    <AppShell>
      <main id="main" className="bg-slate-100 py-[var(--space-section)]">
        <Container className="max-w-2xl">
          <h1 className="text-3xl font-bold text-navy-950">Contact</h1>
          <p className="mt-3 text-base text-slate-700">
            Start a conversation about Starlink installation or connectivity
            support. {site.brandName} will follow up using the details you share.
          </p>

          <Card className="mt-8">
            <p className="text-sm text-slate-700">
              You are asking about{" "}
              <span className="font-semibold text-navy-800">
                {intentLabels[intent]}
              </span>
              .
            </p>
            <Alert
              tone="info"
              className="mt-4"
              title="Enquiry form coming soon"
            >
              The online form is not open yet. Phone and WhatsApp numbers will
              appear here when they are ready. You can return home and check
              back shortly, or use About to learn more about {site.brandName}.
            </Alert>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to="/">Return home</ButtonLink>
              <ButtonLink to="/about" variant="secondary">
                About {site.brandName}
              </ButtonLink>
            </div>
          </Card>
        </Container>
      </main>
    </AppShell>
  );
}
