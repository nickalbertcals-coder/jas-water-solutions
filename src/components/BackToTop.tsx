"use client";

import { prefersReducedMotion } from "@/lib/gsap";

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })}
      className="group inline-flex items-center gap-3 rounded-full border border-white/20 py-2 pl-5 pr-2 font-label text-sm font-semibold text-paper-50 transition-colors hover:border-accent-500 hover:bg-white/5"
    >
      Back to top
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-void transition-transform duration-500 group-hover:-translate-y-1">
        <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
        </svg>
      </span>
    </button>
  );
}
