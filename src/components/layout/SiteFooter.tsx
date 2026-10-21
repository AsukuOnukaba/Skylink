import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";

const footerLinks = [
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-navy-950 text-white">
      <Container className="grid gap-10 py-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div>
          <Logo width={176} onDark />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-200/90">
            {site.relationshipPhrase}
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-white">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <TextLink
                    to={link.to}
                    className="text-sky-300 hover:text-white"
                  >
                    {link.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Contact</p>
            <p className="mt-3 text-sm text-slate-300">
              Prefer to talk through a quote?{" "}
              <TextLink
                to="/contact?intent=quote"
                className="text-sky-300 hover:text-white"
              >
                Request a quote
              </TextLink>
              .
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
