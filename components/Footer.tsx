import { site } from "@/data/site";
import { asset } from "@/lib/utils";

export default function Footer() {
  // Evaluated at build time, so this is the date of the last deploy.
  const updated = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date());

  return (
    <footer className="hairline">
      <div className="container grid gap-8 py-12 text-sm text-muted sm:grid-cols-3">
        <div>
          <div className="display text-lg text-ink">{site.name}</div>
          <div className="mt-1">{site.location}</div>
          <a href={`mailto:${site.email}`} className="link-quiet">
            {site.email}
          </a>
        </div>
        <ul className="space-y-1">
          <li>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="link-quiet">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link-quiet">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a href={asset("/Aditya-Shah-Resume.pdf")} target="_blank" rel="noopener noreferrer" className="link-quiet">
              Résumé (PDF) <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
        <div className="leading-relaxed">
          Last updated {updated}. Set in Instrument Serif and IBM Plex. Built with Next.js, hosted on
          GitHub Pages;{" "}
          <a href={site.repo} target="_blank" rel="noopener noreferrer" className="link-quiet">
            source
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
