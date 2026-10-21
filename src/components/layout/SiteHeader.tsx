import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";

/** Draft chrome for PH-02 — not final navigation (PH-04). */
export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <Container className="flex items-center justify-between gap-4 py-4">
        <TextLink to="/" className="no-underline hover:no-underline" aria-label={`${site.brandName} home`}>
          <Logo width={140} />
        </TextLink>
        <p className="text-sm text-slate-500">Brand foundation — PH-02</p>
      </Container>
    </header>
  );
}
