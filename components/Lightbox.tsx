"use client";

import Image from "next/image";
import { useRef } from "react";

/** A plot thumbnail that opens full-size in a native dialog. */
export default function Lightbox({
  src,
  alt,
  caption,
  className
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className={`group/lb block w-full text-left ${className ?? ""}`}
        aria-label={`Enlarge: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={675}
          className="aspect-[16/9] w-full rounded-sm border border-rule object-cover transition-opacity group-hover/lb:opacity-90"
        />
      </button>
      <dialog
        ref={ref}
        onClick={(e) => {
          if (e.target === ref.current) ref.current?.close();
        }}
        className="w-auto max-w-[min(92vw,64rem)]"
        aria-label={alt}
      >
        <figure className="p-3 sm:p-4">
          <Image src={src} alt={alt} width={1600} height={900} className="mx-auto h-auto max-h-[72vh] w-auto" />
          <figcaption className="mt-3 flex items-start justify-between gap-4 text-sm text-ink-2">
            <span>{caption ?? alt}</span>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-muted hover:text-accent"
            >
              Close <span className="kbd">esc</span>
            </button>
          </figcaption>
        </figure>
      </dialog>
    </>
  );
}
