import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import {
  footerExploreRoutes,
  footerLegalRoutes,
} from "@/config/routes";
import {
  hasPublicPhone,
  site,
} from "@/config/site";

export function SiteFooter() {
  const phoneOk = hasPublicPhone();

  return (
    <footer className="mt-auto border-t border-white/10 bg-navy-950 text-white">
      <Container className="grid gap-10 py-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div>
          <Logo width={140} onDark className="max-h-12 w-auto" />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-200/90">
            {site.relationshipPhrase}
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-white">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              {footerExploreRoutes.map((link) => (
                <li key={link.path}>
                  <TextLink
                    to={link.path}
                    className="text-sky-300 hover:text-white"
                  >
                    {link.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Help</p>
            <ul className="mt-3 space-y-2 text-sm">
              {footerLegalRoutes.map((link) => (
                <li key={link.path}>
                  <TextLink
                    to={link.path}
                    className="text-sky-300 hover:text-white"
                  >
                    {link.label}
                  </TextLink>
                </li>
              ))}
              <li>
                <TextLink
                  to="/contact?intent=quote"
                  className="text-sky-300 hover:text-white"
                >
                  Contact
                </TextLink>
              </li>
            </ul>
            <p className="mt-4 text-sm text-slate-400">
              {phoneOk ? (
                <>
                  Call{" "}
                  <TextLink
                    external
                    href={`tel:${site.phoneE164}`}
                    className="text-sky-300 hover:text-white"
                  >
                    {site.phoneDisplay}
                  </TextLink>
                  . More options on{" "}
                  <TextLink
                    to="/contact"
                    className="text-sky-300 hover:text-white"
                  >
                    Contact
                  </TextLink>
                  .
                </>
              ) : (
                <>
                  Phone, WhatsApp, and email appear on{" "}
                  <TextLink
                    to="/contact"
                    className="text-sky-300 hover:text-white"
                  >
                    Contact
                  </TextLink>{" "}
                  when they are listed.
                </>
              )}
            </p>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-4 text-xs text-slate-500">
          <span>
            © {new Date().getFullYear()} {site.brandName}
          </span>
        </Container>
      </div>
    </footer>
  );
}
