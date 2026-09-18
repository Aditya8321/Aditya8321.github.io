import Section from "@/components/ui/Section";
import Lightbox from "@/components/Lightbox";
import ProjectIndex from "@/components/sections/ProjectIndex";
import { projects, type Project } from "@/data/projects";
import { site } from "@/data/site";
import { asset } from "@/lib/utils";

function Details({ p }: { p: Project }) {
  return (
    <details className="group mt-2">
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
  );
}

export default function Projects() {
  const selected = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section
      id="projects"
      number="04"
      title="Projects"
      intro={
        <>
          A working catalogue of {projects.length} projects across trading, risk, portfolios, and
          AI. The first {selected.length} are the ones I would show first; the rest are indexed by
          area below and can be filtered. Code and write-ups are on{" "}
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="link">
            GitHub
          </a>
          .
        </>
      }
    >
      <h3 className="label">Selected</h3>
      <ol className="mt-4 grid gap-x-8 gap-y-10 sm:grid-cols-2">
        {selected.map((p) => (
          <li key={p.id} id={`project-${p.id}`} className="hairline pt-4">
            {p.image && (
              <Lightbox
                src={asset(p.image)}
                alt={p.imageAlt || p.title}
                caption={`${p.title}: ${p.imageAlt ?? ""}`}
                className="mb-4"
              />
            )}
            <div className="tag">{p.category}</div>
            <h4 className="mt-1 text-[1.2rem] leading-snug text-ink">{p.title}</h4>
            <p className="body mt-1.5 text-pretty">{p.oneLiner}</p>
            <Details p={p} />
          </li>
        ))}
      </ol>

      <h3 className="label mt-16">Everything else, by area</h3>
      <div className="mt-4">
        <ProjectIndex items={rest} />
      </div>
    </Section>
  );
}
