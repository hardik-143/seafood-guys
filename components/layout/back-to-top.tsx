"use client";

import { ArrowUp } from "lucide-react";

/** Scrolls to the top through Lenis when it's running, so the motion stays smooth. */
export function BackToTop() {
  return (
    <button
      className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-semibold text-white/70 text-xs uppercase tracking-[0.2em] transition hover:border-lime hover:text-lime"
      onClick={() => {
        const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number) => void } }).__lenis;
        if (lenis) {
          lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      type="button"
    >
      Back to top
      <ArrowUp className="size-3.5 transition group-hover:-translate-y-0.5" />
    </button>
  );
}
