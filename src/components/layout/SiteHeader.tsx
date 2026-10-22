import { useId, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/icons/Icon";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { primaryNavRoutes } from "@/config/routes";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

function navClassName({ isActive }: { isActive: boolean }) {
  return cn(
    "rounded-sm px-2 py-1 text-sm font-medium text-slate-700 transition-colors hover:text-sky-700",
    "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
    isActive && "text-sky-700",
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <Container className="flex items-center justify-between gap-4 py-2">
        <TextLink
          to="/"
          className="no-underline hover:no-underline"
          aria-label={`${site.brandName} home`}
          onClick={() => setOpen(false)}
        >
          <Logo width={112} className="max-h-10 w-auto" />
        </TextLink>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {primaryNavRoutes.map((item) => (
            <NavLink key={item.path} to={item.path} className={navClassName}>
              {item.label}
            </NavLink>
          ))}
          <ButtonLink to="/contact?intent=quote">Go to contact</ButtonLink>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-slate-200 text-navy-800 md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon icon={open ? X : Menu} size="ui" />
        </button>
      </Container>

      {open ? (
        <div
          id={menuId}
          className="border-t border-slate-200 bg-white md:hidden"
        >
          <Container className="flex flex-col gap-1 py-3">
            {primaryNavRoutes.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(navClassName({ isActive }), "min-h-11 px-3 py-3")
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <ButtonLink
              to="/contact?intent=quote"
              className="mt-2 w-full"
              onClick={() => setOpen(false)}
            >
              Go to contact
            </ButtonLink>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
