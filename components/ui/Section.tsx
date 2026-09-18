import type { ReactNode } from "react";

/**
 * Editorial two-column section: a sticky numbered title on the left, content
 * on the right. Collapses to a single column on small screens.
 */
export default function Section({
  id,
  number,
  title,
  intro,
  children
}: {
  id: string;
  number: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="hairline scroll-mt-16">
      <div className="container grid gap-8 py-14 sm:py-20 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-14">
        <div className="md:sticky md:top-20 md:self-start">
          <div className="label tnum">{number}</div>
          <h2 className="group mt-1 text-[1.75rem] leading-tight sm:text-3xl">
            <a href={`#${id}`} className="no-underline hover:text-accent">
              {title}
              <span className="ml-2 text-rule opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
                #
              </span>
            </a>
          </h2>
          {intro && <div className="mt-3 max-w-[16rem] text-sm leading-relaxed text-muted">{intro}</div>}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
