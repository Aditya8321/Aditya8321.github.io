"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={`no-print fixed bottom-5 right-5 z-30 border border-rule bg-paper px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-all hover:border-accent hover:text-accent ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      ↑ Top
    </a>
  );
}
