"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { asset } from "@/lib/utils";
import { currentTheme, toggleTheme, type Theme } from "@/lib/theme";

export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "playground", label: "Playground" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" }
];

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(currentTheme());
    const onChange = (e: Event) => setTheme((e as CustomEvent<Theme>).detail);
    window.addEventListener("themechange", onChange);
    return () => window.removeEventListener("themechange", onChange);
  }, []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title="Toggle theme (t)"
      className="flex h-8 w-8 items-center justify-center rounded-full text-ink-2 transition-colors hover:text-accent"
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 2.5a7.5 7.5 0 0 1 0 15z" fill="currentColor" />
      </svg>
    </button>
  );
}

/** Which section is in view, for the underline in the nav. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    if (els.length === 0) return;
    const visible = new Map<string, number>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top);
          else visible.delete(e.target.id);
        }
        if (visible.size === 0) {
          if (window.scrollY < 200) setActive(null);
          return;
        }
        // The visible section nearest the top of the viewport wins.
        const top = [...visible.entries()].sort((a, b) => a[1] - b[1])[0][0];
        setActive(top);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return active;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const active = useActiveSection();

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  const openPalette = () => window.dispatchEvent(new Event("open-palette"));

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <div className="container flex h-14 items-center justify-between gap-6">
        <a href="#top" className="display text-xl no-underline hover:text-accent">
          {site.name}
        </a>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-5 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "location" : undefined}
                  className={`link-quiet ${
                    active === s.id ? "text-ink underline decoration-accent underline-offset-4" : ""
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openPalette}
            className="hidden items-center gap-2 text-sm text-ink-2 hover:text-accent sm:inline-flex"
            aria-label="Search the site"
          >
            Search <span className="kbd">{isMac ? "⌘K" : "Ctrl K"}</span>
          </button>
          <a
            href={asset("/Aditya-Shah-Resume.pdf")}
            target="_blank"
            rel="noopener noreferrer"
            className="link text-sm"
          >
            Résumé <span aria-hidden="true">↗</span>
          </a>
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="text-sm text-ink-2 hover:text-accent lg:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Sections" className="border-t border-rule lg:hidden">
          <ul className="container grid grid-cols-2 gap-x-6 py-3 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className={`link-quiet block py-1.5 ${active === s.id ? "text-ink underline decoration-accent" : ""}`}
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li className="sm:hidden">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openPalette();
                }}
                className="link-quiet block py-1.5"
              >
                Search
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
