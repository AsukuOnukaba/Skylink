import { CtaBand } from "@/components/home/CtaBand";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { PageMeta } from "@/components/seo/PageMeta";
import { site } from "@/config/site";

const prep = [
  "Confirm who can approve drilling or a rooftop mount.",
  "Note the dish generation if you already own a kit. Gen 3 cables do not fit Gen 2.",
  "Say how the site is powered: grid only, generator, inverter, or a boat battery.",
  "List the rooms or buildings that must have Wi-Fi, not just the room with the router.",
  "If the terminal will travel, say so. A fixed home plan and a Roam plan are not the same.",
];

export function Support() {
  return (
    <AppShell>
      <PageMeta path="/support" />
      <main id="main">
        <section className="bg-white py-[var(--space-section)]">
          <Container className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Support" },
              ]}
            />
            <h1 className="mt-4 text-3xl font-bold text-navy-950 sm:text-4xl">
              Support
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              Practical help before and after an installation. There is no
              customer login, no ticket tracker, and no booking calendar on
              this site. The online enquiry form stays closed until delivery is
              configured.
            </p>
          </Container>
        </section>

        <section className="bg-slate-100 py-[var(--space-section)]">
          <Container className="max-w-3xl">
            <h2 className="text-2xl font-bold text-navy-950">
              Before someone visits
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700">
              {prep.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="bg-white py-[var(--space-section)]">
          <Container className="max-w-3xl text-base leading-relaxed text-slate-700">
            <h2 className="text-2xl font-bold text-navy-950">
              Written answers
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <TextLink to="/faq">FAQ</TextLink> for sky view, estates,
                power cuts, and who sets the monthly fee
              </li>
              <li>
                <TextLink to="/guide/starlink-nigeria">Nigeria guide</TextLink>{" "}
                for installation, power, Wi-Fi, and failover
              </li>
              <li>
                <TextLink to="/products">Product pages</TextLink> for what is
                in the box and the catalogue price
              </li>
              <li>
                <TextLink to="/services/relocation">Relocation and repair</TextLink>{" "}
                if a kit must move or a mount has failed
              </li>
            </ul>
            <h2 className="mt-10 text-2xl font-bold text-navy-950">
              Talk to a person
            </h2>
            <p className="mt-3">
              Phone {site.phoneDisplay}, WhatsApp on the same number, or email{" "}
              <TextLink external href={`mailto:${site.email}`}>
                {site.email}
              </TextLink>
              . Hours: {site.hours}. Use{" "}
              <TextLink to="/contact">Contact</TextLink> for those links in one
              place.
            </p>
          </Container>
        </section>
        <CtaBand />
      </main>
    </AppShell>
  );
}
