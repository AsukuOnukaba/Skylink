import { Satellite } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/icons/Icon";
import { AppShell } from "@/components/layout/AppShell";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Picture } from "@/components/ui/Picture";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";

/**
 * PH-02 brand foundation demo — moved to /dev/brand after homepage launch (PH-03).
 */
export function BrandFoundation() {
  return (
    <AppShell>
      <main id="main" className="flex-1 bg-slate-100 py-[var(--space-section)]">
        <Container className="flex flex-col gap-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
              Development — PH-02
            </p>
            <h1 className="mt-2 text-3xl font-bold text-navy-950 sm:text-4xl">
              {site.brandName} brand foundation
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-slate-700">
              Shared tokens, logo, UI primitives, and image pipeline. This is
              not the marketing homepage.
            </p>
          </div>

          <section aria-labelledby="logo-heading" className="grid gap-6 md:grid-cols-2">
            <Card>
              <h2 id="logo-heading" className="text-xl font-semibold text-navy-800">
                Logo on light
              </h2>
              <div className="mt-4 flex justify-center rounded-md bg-white p-6">
                <Logo width={200} />
              </div>
            </Card>
            <Card className="bg-navy-950 text-white">
              <h2 className="text-xl font-semibold text-white">Logo on navy</h2>
              <div className="mt-4 flex justify-center rounded-md bg-navy-950 p-6">
                <Logo width={200} onDark />
              </div>
            </Card>
          </section>

          <section aria-labelledby="primitives-heading">
            <h2 id="primitives-heading" className="text-2xl font-semibold text-navy-950">
              UI primitives
            </h2>
            <Card className="mt-4 flex flex-col gap-6">
              <div className="flex flex-wrap gap-3">
                <Button type="button">Primary</Button>
                <Button type="button" variant="secondary">
                  Secondary
                </Button>
                <Button type="button" variant="ghost">
                  Ghost
                </Button>
                <Button type="button" disabled>
                  Disabled
                </Button>
                <Button type="button" loading>
                  Loading
                </Button>
              </div>

              <div className="max-w-sm">
                <Label htmlFor="demo-name" required>
                  Demo field
                </Label>
                <Input id="demo-name" name="demo-name" placeholder="Placeholder only" />
              </div>

              <div className="flex flex-col gap-3">
                <Alert tone="info" title="Info">
                  Neutral status messaging.
                </Alert>
                <Alert tone="success" title="Success">
                  Confirmed positive state.
                </Alert>
                <Alert tone="warning" title="Warning">
                  Non-critical caution.
                </Alert>
                <Alert tone="danger" title="Error" role="alert">
                  Failed or invalid state.
                </Alert>
              </div>

              <p className="flex items-center gap-2 text-sm text-slate-700">
                <Icon icon={Satellite} size="ui" className="text-sky-700" />
                Icon helper (Lucide) — decorative example only.
              </p>

              <p className="text-sm">
                Internal link pattern:{" "}
                <TextLink to="/">Brand foundation</TextLink>
              </p>
            </Card>
          </section>

          <section aria-labelledby="pipeline-heading">
            <h2 id="pipeline-heading" className="text-2xl font-semibold text-navy-950">
              Image pipeline fixture
            </h2>
            <Card className="mt-4">
              <p className="text-sm text-slate-500">
                Locally generated test asset. DataGram library photos were not
                copied — rights remain pending (see{" "}
                <code className="text-xs">src/data/image-rights-log.md</code>).
              </p>
              <div className="mt-4 overflow-hidden rounded-md border border-slate-200">
                <Picture
                  src="/images/pipeline-fixture.png"
                  alt="Skylink pipeline fixture — local test graphic, not installation photography"
                  className="w-full"
                />
              </div>
            </Card>
          </section>
        </Container>
      </main>
    </AppShell>
  );
}
