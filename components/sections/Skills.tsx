import Section from "@/components/ui/Section";
import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <Section
      id="skills"
      number="05"
      title="Skills"
      intro="What I reach for, grouped the way I think about it. Depth varies; ask me."
    >
      <dl>
        {skills.map((group, idx) => (
          <div
            key={group.category}
            className={`grid gap-1 py-4 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-8 ${idx === 0 ? "" : "hairline"}`}
          >
            <dt className="font-sans text-sm font-medium text-ink">{group.category}</dt>
            <dd className="body text-pretty">{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
