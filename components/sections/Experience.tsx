import Section from "@/components/ui/Section";
import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <Section
      id="experience"
      number="02"
      title="Experience"
      intro="Internships, teaching, research, and one competition, most recent first."
    >
      <ol>
        {experience.map((item, idx) => (
          <li
            key={`${item.company}-${item.start}`}
            className={`grid gap-2 py-6 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-8 ${idx === 0 ? "" : "hairline"}`}
          >
            <div className="font-mono text-[13px] text-muted tnum">
              <time>{item.start}</time>
              <span aria-hidden="true"> – </span>
              <time>{item.current ? "Present" : item.end}</time>
            </div>
            <div className="min-w-0">
              <h3 className="font-sans text-[1.05rem] font-medium leading-snug text-ink">{item.role}</h3>
              <p className="mt-0.5 text-sm text-ink-2">
                {item.company}
                <span className="text-muted"> · {item.location}</span>
              </p>
              <ul className="body mt-3 list-disc space-y-1.5 pl-5 marker:text-rule">
                {item.bullets.map((b, i) => (
                  <li key={i} className="text-pretty">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
