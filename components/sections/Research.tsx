import Section from "@/components/ui/Section";
import { publications } from "@/data/publications";
import { asset } from "@/lib/utils";

export default function Research() {
  return (
    <Section
      id="research"
      number="03"
      title="Research"
      intro="One competition-winning paper and three peer-reviewed publications."
    >
      <ol>
        {publications.map((p, idx) => (
          <li key={p.id} className={`py-6 ${idx === 0 ? "" : "hairline"}`}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-[13px] text-muted tnum">{p.year}</span>
              <span
                className={`label ${p.status === "Winner" ? "text-accent" : ""}`}
              >
                {p.status === "Winner" ? "Competition winner" : p.status}
              </span>
            </div>
            <h3 className="mt-2 text-[1.35rem] leading-snug text-ink">{p.title}</h3>
            <p className="mt-1 text-sm text-ink-2">{p.venue}</p>
            <p className="mt-1 text-sm text-muted">{p.authors}</p>
            <p className="body mt-3 max-w-2xl text-pretty">{p.abstract}</p>
            {(p.pdf || p.external) && (
              <p className="mt-3 flex flex-wrap gap-4 text-sm">
                {p.pdf && (
                  <a href={asset(p.pdf)} target="_blank" rel="noopener noreferrer" className="link">
                    Read the paper (PDF) <span aria-hidden="true">↗</span>
                  </a>
                )}
                {p.external && (
                  <a href={p.external} target="_blank" rel="noopener noreferrer" className="link">
                    Publisher page <span aria-hidden="true">↗</span>
                  </a>
                )}
              </p>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
