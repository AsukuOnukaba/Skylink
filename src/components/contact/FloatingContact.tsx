import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, X } from "lucide-react";
import {
  GUIDE_WELCOME,
  answerGuide,
  guideQuickQuestions,
  type GuideLink,
} from "@/components/contact/guideAnswers";
import { Icon } from "@/components/icons/Icon";
import {
  buildWhatsappHref,
  enquiryContextFromLocation,
} from "@/config/whatsapp";
import { hasPublicWhatsapp } from "@/config/site";
import { cn } from "@/lib/cn";

type GuideMessage = {
  id: string;
  role: "visitor" | "guide";
  text: string;
  links?: GuideLink[];
};

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.5 3.5A11 11 0 0 0 2.1 17.8L1 23l5.3-1.1A11 11 0 0 0 12 23a11 11 0 0 0 8.5-19.5zM12 21a9 9 0 0 1-4.6-1.3l-.3-.2-3.2.8.8-3.1-.2-.3A9 9 0 1 1 12 21zm5-6.7c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a7.4 7.4 0 0 1-3.6-3.1c-.2-.3 0-.4.1-.6l.4-.5c.1-.2.1-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.8 11.8 0 0 0 4.5 4c.5.2 1 .4 1.5.5a3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.2-.2-.4-.3z"
      />
    </svg>
  );
}

export function FloatingContact() {
  const location = useLocation();
  const whatsappOk = hasPublicWhatsapp();
  const context = enquiryContextFromLocation(location.pathname, location.search);
  const whatsappHref = whatsappOk ? buildWhatsappHref(context) : "";
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<GuideMessage[]>([
    { id: "welcome", role: "guide", text: GUIDE_WELCOME },
  ]);
  const panelId = useId();
  const noteId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const wasOpen = useRef(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (wasOpen.current && !open) launcherRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const viewport = window.visualViewport;
    if (!viewport) return;
    function syncOffset() {
      const current = window.visualViewport;
      if (!current) return;
      const covered = window.innerHeight - current.height - current.offsetTop;
      setKeyboardOffset(Math.max(0, Math.round(covered)));
    }
    syncOffset();
    viewport.addEventListener("resize", syncOffset);
    viewport.addEventListener("scroll", syncOffset);
    return () => {
      viewport.removeEventListener("resize", syncOffset);
      viewport.removeEventListener("scroll", syncOffset);
      setKeyboardOffset(0);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const log = logRef.current;
    if (!log) return;
    log.scrollTop = log.scrollHeight;
  }, [messages, open]);

  function pushQuestion(question: string) {
    const text = question.trim();
    if (!text) return;
    const reply = answerGuide(text);
    const visitorId = `v-${nextId.current++}`;
    const guideId = `g-${nextId.current++}`;
    setMessages((current) => [
      ...current,
      { id: visitorId, role: "visitor", text },
      { id: guideId, role: "guide", text: reply.text, links: reply.links },
    ]);
    setDraft("");
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    pushQuestion(draft);
  }

  const panel =
    open && typeof document !== "undefined"
      ? createPortal(
          <section
            id={panelId}
            role="region"
            aria-label="Skylink Assistant"
            data-analytics-placement="floating"
            className="fixed z-30 flex min-h-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-700 shadow-md left-[calc(0.75rem+env(safe-area-inset-left))] right-[calc(0.75rem+env(safe-area-inset-right))] w-auto md:left-auto md:right-[calc(1.5rem+env(safe-area-inset-right))] md:w-[min(380px,calc(100vw-3rem))]"
            style={{
              bottom: `calc(1.5rem + 52px + 1rem + 52px + 0.75rem + env(safe-area-inset-bottom) + ${keyboardOffset}px)`,
              maxHeight: `calc(100dvh - 5.5rem - 0.75rem - 1.5rem - 52px - 1rem - 52px - 0.75rem - env(safe-area-inset-top) - env(safe-area-inset-bottom) - ${keyboardOffset}px)`,
            }}
          >
            <header className="flex shrink-0 items-center gap-3 bg-navy-950 px-4 py-3 text-white">
              <p className="min-w-0 flex-1 text-sm font-semibold text-white">
                Skylink Assistant
              </p>
              <button
                type="button"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm text-white hover:bg-white/10 focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
              >
                <Icon icon={X} size="ui" />
              </button>
            </header>
            <div
              ref={logRef}
              className="flex min-h-24 flex-[1_100_auto] flex-col gap-3 overflow-y-auto overscroll-contain px-4 py-3"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "max-w-[95%] shrink-0 rounded-lg px-3 py-2 text-sm leading-relaxed",
                    message.role === "visitor"
                      ? "ml-auto bg-royal text-white"
                      : "bg-ice text-navy-950",
                  )}
                >
                  <p>{message.text}</p>
                  {message.links && message.links.length > 0 ? (
                    <ul className="mt-2 space-y-1">
                      {message.links.map((link) => (
                        <li key={link.to}>
                          <Link
                            to={link.to}
                            className="font-semibold text-royal underline-offset-2 hover:underline"
                            onClick={() => setOpen(false)}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="flex min-h-14 min-w-0 flex-wrap gap-2 overflow-y-auto overscroll-contain border-t border-slate-200 px-4 py-3">
              {guideQuickQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-left text-xs font-medium text-navy-800 hover:border-electric focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                  onClick={() => pushQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
            <form
              onSubmit={onSubmit}
              className="flex shrink-0 gap-2 border-t border-slate-200 px-4 py-3"
            >
              <label className="sr-only" htmlFor={`${panelId}-input`}>
                Your question
              </label>
              <input
                id={`${panelId}-input`}
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask about services or service areas"
                className="min-h-11 min-w-0 flex-1 rounded-sm border border-slate-200 px-3 text-sm text-navy-950 focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
              />
              <button
                type="submit"
                className="inline-flex min-h-11 shrink-0 items-center rounded-sm bg-electric px-3 text-sm font-semibold text-white hover:bg-royal focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
              >
                Send
              </button>
            </form>
            {whatsappHref ? (
              <div className="shrink-0 border-t border-slate-200 px-4 py-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-royal underline-offset-2 hover:underline"
                >
                  Message the team on WhatsApp
                </a>
              </div>
            ) : null}
          </section>,
          document.body,
        )
      : null;

  return (
    <>
      {panel}
    <div
      className="fixed z-30 flex flex-col items-end gap-4"
      style={{
        right: "calc(1.5rem + env(safe-area-inset-right))",
        bottom: "calc(1.5rem + env(safe-area-inset-bottom))",
      }}
      data-analytics-placement="floating"
    >

      <button
        ref={launcherRef}
        type="button"
        className="group relative inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-electric text-white shadow-md transition-transform hover:scale-[1.06] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
        aria-label="Ask Skylink AI"
        aria-describedby={noteId}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        <span
          className="pointer-events-none absolute right-[calc(100%+0.5rem)] hidden whitespace-nowrap rounded-sm bg-navy-950 px-2 py-1 text-xs font-medium text-white group-hover:block group-focus-visible:block"
          role="tooltip"
        >
          Ask Skylink AI
        </span>
        <Icon icon={Sparkles} size="ui" />
      </button>
      <p id={noteId} className="sr-only">
        Opens a guide that answers from published Skylink pages. It is not a live generative model.
      </p>

      {whatsappHref ? (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Skylink on WhatsApp"
          className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-transform hover:scale-[1.06] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
        >
          <WhatsAppGlyph />
        </a>
      ) : null}
    </div>
    </>
  );
}
