"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Line = { text: string; className?: string };

/**
 * Hero headline whose lines rise one after another out of a mask. Each line is
 * its own block so a gradient line (background-clip: text) stays intact. Plain,
 * fully visible text for reduced-motion visitors and before scripts run.
 */
export default function HeroTitle({ lines, className = "" }: { lines: Line[]; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const inner = el.querySelectorAll<HTMLElement>("[data-line]");
    gsap.set(inner, { yPercent: 118 });
    const tween = gsap.to(inner, { yPercent: 0, duration: 1.05, ease: "power4.out", stagger: 0.16, delay: 0.15 });
    return () => {
      tween.kill();
      gsap.set(inner, { clearProps: "all" });
    };
  }, []);

  return (
    <h1 ref={ref} className={className}>
      {lines.map((l) => (
        /* the line box is shorter than a descender (the "y" in "sustainability"), and gradient text only paints inside its own box, so give each line room below and pull the next one back up */
        <span key={l.text} className="-mb-[0.08em] block overflow-hidden">
          <span data-line className={`block w-fit pb-[0.22em] will-change-transform ${l.className ?? ""}`}>
            {l.text}
          </span>
        </span>
      ))}
    </h1>
  );
}
