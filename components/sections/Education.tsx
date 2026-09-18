import Section from "@/components/ui/Section";
import { education, certifications } from "@/data/education";
import { asset } from "@/lib/utils";

export default function Education() {
  return (
    <Section id="education" number="06" title="Education">
      <ol>
        {education.map((edu, idx) => (
          <li
            key={edu.institution}
            className={`grid gap-2 py-6 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-8 ${idx === 0 ? "" : "hairline"}`}
          >
            <div className="font-mono text-[13px] text-muted tnum">
              {edu.start} – {edu.end}
            </div>
            <div>
              <h3 className="font-sans text-[1.05rem] font-medium leading-snug text-ink">{edu.institution}</h3>
              <p className="mt-0.5 text-sm text-ink-2">
                {edu.degree}, {edu.field}
                {edu.gpa && <span className="text-muted"> · GPA {edu.gpa}</span>}
                <span className="text-muted"> · {edu.location}</span>
              </p>
              <ul className="body mt-3 list-disc space-y-1.5 pl-5 marker:text-rule">
                {edu.highlights.map((h, i) => (
                  <li key={i} className="text-pretty">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <h3 className="label mt-10">Certifications and awards</h3>
      <ol className="mt-2">
        {certifications.map((c) => {
          const href = c.pdf || c.image;
          return (
            <li key={c.name} className="hairline grid gap-1 py-4 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-8">
              <div className="font-mono text-[13px] text-muted tnum">{c.year}</div>
              <div>
                <div className="text-[0.95rem] text-ink">
                  {href ? (
                    <a
                      href={asset(href)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      {c.name} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    c.name
                  )}
                  <span className="text-muted"> · {c.issuer}</span>
                </div>
                {c.description && <p className="mt-1 text-sm text-ink-2">{c.description}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
