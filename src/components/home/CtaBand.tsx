import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { hasPublicPhone, site } from "@/config/site";

type CtaLink = {
  to: string;
  label: string;
};

type CtaBandProps = {
  title?: string;
  description?: string;
  primary?: CtaLink;
  secondary?: CtaLink;
};

export function CtaBand({
  title = "Want to talk about an installation?",
  description = hasPublicPhone()
    ? `Call or WhatsApp ${site.brandName} on ${site.phoneDisplay}, or open Contact for the full details.`
    : `Start with Services or About to understand how ${site.brandName} works, then open Contact for the current ways to get in touch.`,
  primary = { to: "/services", label: "View services" },
  secondary = { to: "/about", label: `About ${site.brandName}` },
}: CtaBandProps) {
  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="cta-band py-[var(--space-section)] text-white"
    >
      <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2
            id="closing-cta-heading"
            className="text-2xl font-bold text-white sm:text-3xl"
          >
            {title}
          </h2>
          <p className="mt-3 text-base text-slate-200/90">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink to={primary.to} variant="primaryOnDark">
            {primary.label}
          </ButtonLink>
          <ButtonLink to={secondary.to} variant="secondaryOnDark">
            {secondary.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
