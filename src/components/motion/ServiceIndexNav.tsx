"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type Item = { slug: string; title: string; index: number };

export default function ServiceIndexNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.slug);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const triggers = items.map((item) =>
      ScrollTrigger.create({
        trigger: `#${item.slug}`,
        start: "top 45%",
        end: "bottom 45%",
        onEnter: () => setActive(item.slug),
        onEnterBack: () => setActive(item.slug),
      })
    );

    return () => triggers.forEach((t) => t.kill());
  }, [items]);

  return (
    <nav aria-label="Service index" className="border-b border-line bg-paper-100">
      <div className="mx-auto flex max-w-7xl flex-wrap gap-x-8 gap-y-3 px-5 py-5 sm:px-8">
        {items.map((item) => {
          const isActive = active === item.slug;
          return (
            <Link
              key={item.slug}
              href={`#${item.slug}`}
              className={`border-b-2 pb-1 font-mono text-xs font-medium uppercase tracking-[0.05em] transition-colors ${
                isActive
                  ? "border-signal-500 text-ink-900"
                  : "border-transparent text-steel-600 hover:text-ink-900"
              }`}
            >
              <span className="text-signal-600">§{String(item.index + 1).padStart(2, "0")}</span>{" "}
              {item.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
