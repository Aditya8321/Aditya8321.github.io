"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { projectCategories, type Project, type ProjectCategory } from "@/data/projects";

function matches(p: Project, q: string) {
  if (!q) return true;
  const hay = `${p.title} ${p.oneLiner} ${p.description} ${p.category} ${p.tech.join(" ")} ${p.highlights.join(" ")}`.toLowerCase();
  return q
    .split(/\s+/)
    .filter(Boolean)
    .every((w) => hay.includes(w));
}

/** The long tail of projects: searchable, filterable by area, expandable. */
export default function ProjectIndex({ items }: { items: Project[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProjectCategory | "All">("All");
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const q = useDeferredValue(query.trim().toLowerCase());

  const filtered = useMemo(
    () => items.filter((p) => (category === "All" || p.category === category) && matches(p, q)),
    [items, category, q]
  );

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of items) m.set(p.category, (m.get(p.category) ?? 0) + 1);
    return m;
  }, [items]);

  const groups = projectCategories
    .map((cat) => ({ cat, list: filtered.filter((p) => p.category === cat) }))
    .filter((g) => g.list.length > 0);

  const allOpen = filtered.length > 0 && filtered.every((p) => open.has(p.id));

  function toggleAll() {
    setOpen(allOpen ? new Set() : new Set(filtered.map((p) => p.id)));
  }

  function setOne(id: string, isOpen: boolean) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (isOpen) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <label className="block min-w-[14rem] flex-1">
          <span className="label">Filter</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. VaR, momentum, R, Monte Carlo"
            className="field mt-1"
            aria-label="Filter projects"
          />
        </label>
        <button type="button" onClick={toggleAll} className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted hover:text-accent">
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm" aria-label="Filter by area">
        {(["All", ...projectCategories] as const).map((cat) => {
          const n = cat === "All" ? items.length : (counts.get(cat) ?? 0);
          if (n === 0) return null;
          const active = category === cat;
          return (
            <li key={cat}>
              <button
                type="button"
                onClick={() => setCategory(cat)}
                aria-pressed={active}
                className={`link-quiet ${active ? "text-ink underline decoration-accent underline-offset-4" : ""}`}
              >
                {cat} <span className="font-mono text-[11px] text-muted tnum">{n}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-xs text-muted tnum" aria-live="polite">
        {filtered.length === items.length ? `${items.length} projects` : `${filtered.length} of ${items.length} projects`}
        {q && ` matching “${query.trim()}”`}
      </p>

      {groups.length === 0 && (
        <p className="mt-6 text-sm text-ink-2">
          Nothing matches. Try a broader word, or{" "}
          <button type="button" onClick={() => { setQuery(""); setCategory("All"); }} className="link">
            clear the filters
          </button>
          .
        </p>
      )}

      {groups.map((g) => (
        <div key={g.cat} className="hairline mt-2 grid gap-2 py-5 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-8">
          <h4 className="font-sans text-sm font-medium text-ink">
            {g.cat} <span className="font-mono text-muted tnum">{g.list.length}</span>
          </h4>
          <ol className="space-y-4">
            {g.list.map((p) => (
              <li key={p.id} id={`project-${p.id}`}>
                <div className="font-sans text-[0.95rem] font-medium text-ink">{p.title}</div>
                <p className="mt-0.5 text-sm text-ink-2">{p.oneLiner}</p>
                <details
                  className="group mt-2"
                  open={open.has(p.id)}
                  onToggle={(e) => setOne(p.id, (e.currentTarget as HTMLDetailsElement).open)}
                >
                  <summary className="inline-flex items-center gap-1 text-sm text-accent hover:underline">
                    <span className="inline-block transition-transform group-open:rotate-90" aria-hidden="true">
                      ›
                    </span>
                    Details
                  </summary>
                  <div className="mt-3 max-w-2xl space-y-3 text-sm leading-relaxed text-ink-2">
                    <p className="text-pretty">{p.description}</p>
                    <ul className="list-disc space-y-1 pl-5 marker:text-rule">
                      {p.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                    <p className="tag">{p.tech.join(" · ")}</p>
                  </div>
                </details>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
