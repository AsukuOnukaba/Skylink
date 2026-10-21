import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { site } from "@/config/site";

type CtaBandProps = {
  title?: string;
  description?: string;
};

export function CtaBand({
  title = "Ready to talk through your installation?",
  description = "Share a few details about your site and what you need. We will use that to guide the next step.",
}: CtaBandProps) {
  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="bg-navy-950 py-[var(--space-section)] text-white"
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
          <ButtonLink to="/contact?intent=quote" variant="primaryOnDark">
            Request a quote
          </ButtonLink>
          <ButtonLink to="/about" variant="secondaryOnDark">
            About {site.brandName}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
