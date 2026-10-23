import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import { site } from "@/config/site";

export function Terms() {
  return (
    <AppShell>
      <PageMeta path="/terms" />
      <main id="main" className="bg-white py-[var(--space-section)]">
        <Container className="max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Terms" },
            ]}
          />
          <h1 className="mt-4 text-3xl font-bold text-navy-950 sm:text-4xl">
            Terms of use
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            These terms cover use of the {site.brandName} website. They are not
            an installation contract, warranty, or service-level agreement.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-navy-800">
            About this website
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            {site.relationshipPhrase} Content on this site is for general
            information so you can understand the business and find current
            contact options.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-navy-800">
            No contract from browsing
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Reading pages, opening Contact, or selecting an enquiry intent does
            not create a binding installation agreement. Work, pricing, and
            schedules are confirmed separately when live enquiry channels are
            available and both sides agree.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-navy-800">
            Starlink and third parties
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Starlink service terms, hardware warranties, and network policies
            belong to their respective providers. {site.brandName} does not
            rewrite those terms on this website.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-navy-800">
            Accuracy
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            We aim to keep information accurate and up to date. Service lists,
            contact details, and related pages change as confirmed information is
            published. If something looks unclear, check{" "}
            <TextLink to="/contact">Contact</TextLink> or{" "}
            <TextLink to="/faq">FAQ</TextLink>.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-navy-800">
            Acceptable use
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Do not misuse the site, attempt to disrupt it, or submit automated
            or abusive traffic. We may update these terms as the site grows;
            the version on this page is the current one.
          </p>
        </Container>
      </main>
    </AppShell>
  );
}
