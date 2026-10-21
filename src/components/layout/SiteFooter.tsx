import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { site } from "@/config/site";

/** Draft chrome for PH-02 — NAP remains placeholders until OD-01. */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-navy-950 text-white">
      <Container className="flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Logo width={120} onDark />
        <div className="text-sm text-sky-300">
          <p className="font-medium text-white">{site.brandName}</p>
          <p className="mt-1 max-w-md text-slate-200/90">
            {site.relationshipPhrase}
          </p>
          <p className="mt-2 text-slate-500">
            Contact details: placeholders only (OD-01).
          </p>
        </div>
      </Container>
    </footer>
  );
}
