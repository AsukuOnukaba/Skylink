import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import {
  footerExploreRoutes,
  footerLegalRoutes,
} from "@/config/routes";
import {
  hasPublicEmail,
  hasPublicPhone,
  site,
} from "@/config/site";

export function SiteFooter() {
  const phoneOk = hasPublicPhone();
  const emailOk = hasPublicEmail();

  return (
    <footer className="mt-auto border-t border-white/10 bg-navy-950 text-white">
      <Container className="grid gap-10 py-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div>
          <Logo width={140} onDark className="max-h-12 w-auto" />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[#d7e6f5]">
            {site.relationshipPhrase}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#b7c5d3]">
            Professional Starlink installation, equipment, and connectivity
            solutions for homes, businesses, enterprises, and maritime
            operations.
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
                    className="site-footer-link"
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
                    className="site-footer-link"
                  >
                    {link.label}
                  </TextLink>
                </li>
              ))}
              <li>
                <TextLink
                  to="/contact"
                  className="site-footer-link"
                >
                  Contact
                </TextLink>
              </li>
            </ul>
            <p className="mt-4 text-sm text-[#b7c5d3]">
              {phoneOk ? (
                <>
                  Call{" "}
                  <TextLink
                    external
                    href={`tel:${site.phoneE164}`}
                    className="site-footer-link"
                  >
                    {site.phoneDisplay}
                  </TextLink>
                  {emailOk ? (
                    <>
                      {" "}
                      or email{" "}
                      <TextLink
                        external
                        href={`mailto:${site.email}`}
                        className="site-footer-link"
                      >
                        {site.email}
                      </TextLink>
                    </>
                  ) : null}
                  . More options on{" "}
                  <TextLink
                    to="/contact"
                    className="site-footer-link"
                  >
                    Contact
                  </TextLink>
                  .
                </>
              ) : (
                <>
                  Read{" "}
                  <TextLink
                    to="/services"
                    className="site-footer-link"
                  >
                    Services
                  </TextLink>{" "}
                  and{" "}
                  <TextLink
                    to="/about"
                    className="site-footer-link"
                  >
                    About
                  </TextLink>
                  , or open{" "}
                  <TextLink
                    to="/contact"
                    className="site-footer-link"
                  >
                    Contact
                  </TextLink>{" "}
                  for current reach options.
                </>
              )}
            </p>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-4 text-xs text-[#b7c5d3]">
          <span>
            © {new Date().getFullYear()} {site.brandName}
          </span>
        </Container>
      </div>
    </footer>
  );
}
