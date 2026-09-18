import Image from "next/image";
import CopyButton from "@/components/CopyButton";
import LocalTime from "@/components/LocalTime";
import { site } from "@/data/site";
import { asset } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="container animate-rise py-14 sm:py-20">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_14rem] md:gap-16">
        <div>
          <p className="label">
            {site.name} · {site.location}
            <LocalTime />
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-[2.5rem] leading-[1.05] sm:text-5xl md:text-[3.5rem]">
            {site.headline}
          </h1>
          <p className="lede mt-6 max-w-2xl text-pretty">{site.lede}</p>

          <dl className="mt-10 max-w-2xl border-t border-rule">
            {site.now.map((row) => (
              <div key={row.label} className="grid gap-1 border-b border-rule py-3 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="label pt-0.5">{row.label}</dt>
                <dd className="text-[0.95rem] text-ink-2">{row.value}</dd>
              </div>
            ))}
            <div className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-6">
              <dt className="label pt-0.5">Elsewhere</dt>
              <dd className="flex flex-wrap gap-x-4 text-[0.95rem]">
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="link">
                  GitHub
                </a>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link">
                  LinkedIn
                </a>
                <span className="inline-flex items-baseline gap-2">
                  <a href={`mailto:${site.email}`} className="link">
                    {site.email}
                  </a>
                  <CopyButton text={site.email} />
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <figure className="order-first w-40 md:order-none md:w-auto">
          <Image
            src={asset("/profile.jpg")}
            alt={`${site.name}, photographed in 2026`}
            width={666}
            height={1000}
            priority
            className="w-full rounded-sm border border-rule object-cover"
          />
          <figcaption className="mt-2 text-xs text-muted">NYU Tandon, Brooklyn</figcaption>
        </figure>
      </div>
    </section>
  );
}
