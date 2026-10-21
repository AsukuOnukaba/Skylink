import { site } from "@/config/site";

/**
 * PH-01 development smoke page only.
 * Not a marketing homepage — visual design starts in PH-02 / PH-03.
 */
export function DevPlaceholder() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-4 px-6 py-16"
    >
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
        Development foundation — PH-01
      </p>
      <h1 className="text-3xl font-semibold text-slate-900">
        {site.brandName} application scaffold
      </h1>
      <p className="text-base leading-relaxed text-slate-700">
        This route confirms Vite, React 18, TypeScript (strict), React Router,
        and Tailwind are wired. It is not the public homepage. Brand tokens,
        logo, and marketing sections arrive in later phases.
      </p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
        <li>Package manager: pnpm</li>
        <li>Build output: dist/spa</li>
        <li>Contact and NAP: placeholders only (OD-01)</li>
      </ul>
    </main>
  );
}
