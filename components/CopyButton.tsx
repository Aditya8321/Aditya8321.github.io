"use client";

import { useEffect, useRef, useState } from "react";

/** Copies `text` to the clipboard and confirms inline for a moment. */
export default function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.prompt("Copy this:", text);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
      aria-live="polite"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
