import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import { site } from "@/config/site";

export function Privacy() {
  return (
    <AppShell>
      <PageMeta
        title={`Privacy — ${site.brandName}`}
        description={`How ${site.brandName} handles information on this website, including contact channels and analytics when they are active.`}
      />
      <main id="main" className="bg-white py-[var(--space-section)]">
        <Container className="prose-skylink max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Privacy" },
            ]}
          />
          <h1 className="mt-4 text-3xl font-bold text-navy-950 sm:text-4xl">
            Privacy notice
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            This notice explains what {site.brandName} currently does—and does
            not do—with information on this website. It will be updated when
            enquiry forms, messaging channels, or analytics go live.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-navy-800">
            Who we are
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            {site.relationshipPhrase} This site is operated to help people
            understand that work and find current contact options.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-navy-800">
            What this site collects today
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            The public pages do not currently include a working enquiry form.
            Until a form is enabled, this website does not collect quote, survey,
            or product enquiry submissions from visitors.
          </p>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Standard web logs on the hosting platform may record technical
            request data such as IP address, browser type, and pages requested.
            That is controlled by the host, not by a custom Skylink analytics
            product on this build.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-navy-800">
            Phone, WhatsApp, and email
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            When phone, WhatsApp, or email details are published on the{" "}
            <TextLink to="/contact">Contact</TextLink> page, messages you send
            through those channels are handled outside this website. WhatsApp and
            phone providers apply their own privacy terms.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-navy-800">
            Future enquiry forms
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            When online forms open, they will ask only for details needed to
            respond to an enquiry—typically name, phone, location, and a short
            note about your site or need. This notice will be updated to name
            the delivery method and retention approach at that time.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-navy-800">
            Analytics
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Product analytics are not active on this build. If measurement tools
            are added later, this page will name them and summarise what they
            measure.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-navy-800">
            Questions
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            For privacy questions, open{" "}
            <TextLink to="/contact">Contact</TextLink> for the reach options
            published on this site.
          </p>
        </Container>
      </main>
    </AppShell>
  );
}
