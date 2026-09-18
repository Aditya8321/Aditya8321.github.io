"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { asset } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#research", label: "Research" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" }
];

type Theme = "light" | "dark" | null;

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(null);

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme");
    if (t === "light" || t === "dark") setTheme(t);
  }, []);

  function toggle() {
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const current = theme ?? (systemDark ? "dark" : "light");
    const next: Theme = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode etc. */
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className="flex h-8 w-8 items-center justify-center rounded-full text-ink-2 transition-colors hover:text-accent"
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 2.5a7.5 7.5 0 0 1 0 15z" fill="currentColor" />
      </svg>
    </button>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <div className="container flex h-14 items-center justify-between gap-6">
        <a href="#top" className="display text-xl no-underline hover:text-accent">
          {site.name}
        </a>

        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-5 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-quiet">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
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
            className="text-sm text-ink-2 hover:text-accent md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Sections" className="border-t border-rule md:hidden">
          <ul className="container grid grid-cols-2 gap-x-6 py-3 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="link-quiet block py-1.5">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
