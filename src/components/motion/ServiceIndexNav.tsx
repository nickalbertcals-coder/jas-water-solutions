"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type Item = { slug: string; title: string; index: number };

/** Short labels for the pill tabs (the full titles are long). */
const SHORT: Record<string, string> = {
  "om-level-iii": "Operations & Maintenance",
  "bulk-water-supply": "Bulk Water Supply",
  "hydraulic-modeling": "Hydraulic Modeling",
  "bulk-water-retail": "Bulk Water Retail",
  "technical-consultancy": "Technical Consultancy",
};

/** Sticky pill tabs under the header; the one for the section on screen lights up. */
export default function ServiceIndexNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.slug);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const triggers = items.map((item) =>
      ScrollTrigger.create({
        trigger: `#${item.slug}`,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => setActive(item.slug),
        onEnterBack: () => setActive(item.slug),
      })
    );

    return () => triggers.forEach((t) => t.kill());
  }, [items]);

  return (
    <nav
      aria-label="Service index"
      className="sticky top-[4.5rem] z-30 border-b border-line bg-paper-50/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 sm:px-8 [scrollbar-width:none]">
        {items.map((item) => {
          const isActive = active === item.slug;
          return (
            <Link
              key={item.slug}
              href={`#${item.slug}`}
              aria-current={isActive ? "true" : undefined}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 font-label text-sm font-semibold transition-colors ${
                isActive
                  ? "border-ink-900 bg-ink-900 text-paper-50"
                  : "border-line-strong bg-white text-ink-900 hover:border-accent-600 hover:text-accent-600"
              }`}
            >
              <span className={`tabular-nums ${isActive ? "text-accent-500" : "text-accent-600"}`}>
                {String(item.index + 1).padStart(2, "0")}
              </span>
              {SHORT[item.slug] ?? item.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
