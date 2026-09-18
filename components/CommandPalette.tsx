"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { sections } from "@/components/Nav";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
import { site } from "@/data/site";
import { asset } from "@/lib/utils";
import { toggleTheme } from "@/lib/theme";

type Item = {
  id: string;
  group: "Sections" | "Projects" | "Papers" | "Links" | "Actions";
  title: string;
  hint?: string;
  keywords: string;
  run: () => void;
};

function isTyping(e: KeyboardEvent) {
  const t = e.target as HTMLElement | null;
  if (!t) return false;
  const tag = t.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || t.isContentEditable;
}

function jumpTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

/** Scroll to a project and open its details. */
function openProject(projectId: string) {
  const el = document.getElementById(`project-${projectId}`);
  if (!el) return;
  const details = el.querySelector("details");
  if (details) details.open = true;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
}

function score(item: Item, q: string): number {
  if (!q) return 1;
  const title = item.title.toLowerCase();
  if (title.startsWith(q)) return 4;
  if (title.includes(q)) return 3;
  const words = q.split(/\s+/).filter(Boolean);
  const hay = `${title} ${item.keywords}`.toLowerCase();
  if (words.every((w) => hay.includes(w))) return 2;
  return 0;
}

const GROUP_ORDER: Item["group"][] = ["Sections", "Projects", "Papers", "Links", "Actions"];

export default function CommandPalette() {
  const ref = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);

  const items = useMemo<Item[]>(() => {
    const list: Item[] = [];
    for (const s of sections) {
      list.push({ id: `s-${s.id}`, group: "Sections", title: s.label, keywords: "section jump go", run: () => jumpTo(s.id) });
    }
    for (const p of projects) {
      list.push({
        id: `p-${p.id}`,
        group: "Projects",
        title: p.title,
        hint: p.category,
        keywords: `${p.category} ${p.oneLiner} ${p.tech.join(" ")}`,
        run: () => openProject(p.id)
      });
    }
    for (const pub of publications) {
      list.push({
        id: `pub-${pub.id}`,
        group: "Papers",
        title: pub.title,
        hint: `${pub.venue.split(" - ")[0]} · ${pub.year}`,
        keywords: `${pub.venue} ${pub.tags.join(" ")} paper pdf`,
        run: () => {
          if (pub.pdf) window.open(asset(pub.pdf), "_blank", "noopener");
          else jumpTo("research");
        }
      });
    }
    const links: [string, string, string][] = [
      ["GitHub", site.github, "code repos"],
      ["LinkedIn", site.linkedin, "profile"],
      ["Résumé (PDF)", asset("/Aditya-Shah-Resume.pdf"), "cv resume download"],
      ["Source of this site", site.repo, "github code"]
    ];
    for (const [title, href, kw] of links) {
      list.push({ id: `l-${title}`, group: "Links", title, hint: "opens in a new tab", keywords: kw, run: () => window.open(href, "_blank", "noopener") });
    }
    list.push({
      id: "a-email",
      group: "Actions",
      title: `Copy email address`,
      hint: site.email,
      keywords: "contact mail copy",
      run: () => void navigator.clipboard?.writeText(site.email)
    });
    list.push({ id: "a-theme", group: "Actions", title: "Toggle light / dark theme", hint: "t", keywords: "dark light mode", run: toggleTheme });
    list.push({ id: "a-print", group: "Actions", title: "Print or save as PDF", hint: "the page prints as a CV", keywords: "print pdf cv", run: () => window.print() });
    return list;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const scored = items
      .map((it) => ({ it, s: score(it, q) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s || GROUP_ORDER.indexOf(a.it.group) - GROUP_ORDER.indexOf(b.it.group));
    return (q ? scored : scored.filter((x) => x.it.group !== "Projects" || projects.find((p) => `p-${p.id}` === x.it.id)?.featured))
      .map((x) => x.it)
      .slice(0, 40);
  }, [items, query]);

  const open = useCallback(() => {
    const d = ref.current;
    if (!d || d.open) return;
    setQuery("");
    setCursor(0);
    d.showModal();
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const close = useCallback(() => ref.current?.close(), []);

  const choose = useCallback(
    (item: Item) => {
      close();
      // Let the dialog close before scrolling so the page, not the dialog, scrolls.
      window.setTimeout(item.run, 30);
    },
    [close]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (ref.current?.open) close();
        else open();
        return;
      }
      if (e.key === "t" && !e.metaKey && !e.ctrlKey && !e.altKey && !isTyping(e) && !ref.current?.open) {
        toggleTheme();
      }
    };
    const onOpen = () => open();
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [open, close]);

  useEffect(() => setCursor(0), [query]);

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[cursor];
      if (item) choose(item);
    }
  }

  // Group the ordered results while keeping their order.
  const grouped: { group: Item["group"]; items: { item: Item; index: number }[] }[] = [];
  results.forEach((item, index) => {
    const last = grouped[grouped.length - 1];
    if (last && last.group === item.group) last.items.push({ item, index });
    else grouped.push({ group: item.group, items: [{ item, index }] });
  });

  return (
    <dialog
      ref={ref}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
      className="mt-[10vh] w-[min(92vw,38rem)] max-w-none"
      aria-label="Search the site"
    >
      <div className="flex items-center gap-3 border-b border-rule px-4">
        <span className="label" aria-hidden="true">
          Search
        </span>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onInputKey}
          placeholder="Sections, projects, papers, links…"
          className="w-full bg-transparent py-3.5 text-[0.95rem] text-ink placeholder:text-muted focus:outline-none"
          aria-label="Search"
          autoComplete="off"
          spellCheck={false}
        />
        <button type="button" onClick={close} className="kbd hover:text-accent" aria-label="Close">
          esc
        </button>
      </div>

      <div className="max-h-[60vh] overflow-y-auto py-2" role="listbox" aria-label="Results">
        {results.length === 0 && (
          <p className="px-4 py-6 text-sm text-muted">Nothing matches “{query}”.</p>
        )}
        {grouped.map((g) => (
          <div key={g.group} className="py-1">
            <div className="label px-4 py-1">{g.group}</div>
            <ul>
              {g.items.map(({ item, index }) => (
                <li key={item.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={index === cursor}
                    onMouseEnter={() => setCursor(index)}
                    onClick={() => choose(item)}
                    className={`flex w-full items-baseline justify-between gap-4 px-4 py-2 text-left text-[0.95rem] ${
                      index === cursor ? "bg-paper-2 text-ink" : "text-ink-2"
                    }`}
                  >
                    <span className="min-w-0 truncate">{item.title}</span>
                    {item.hint && <span className="shrink-0 font-mono text-[11px] text-muted">{item.hint}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-rule px-4 py-2 text-[11px] text-muted">
        <span>
          <span className="kbd">↑</span> <span className="kbd">↓</span> move
        </span>
        <span>
          <span className="kbd">↵</span> open
        </span>
        <span>
          <span className="kbd">esc</span> close
        </span>
        <span>
          <span className="kbd">t</span> theme
        </span>
      </div>
    </dialog>
  );
}
