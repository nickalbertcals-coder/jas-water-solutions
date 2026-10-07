"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Headline whose words rise out of a mask one after another. Static for reduced motion. */
export default function SplitTitle({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const words = el.querySelectorAll<HTMLElement>("[data-w]");
    const tween = gsap.fromTo(
      words,
      { yPercent: 115, rotate: 4 },
      { yPercent: 0, rotate: 0, duration: 0.95, ease: "power4.out", stagger: 0.07, delay: 0.1 }
    );
    return () => {
      tween.kill();
      gsap.set(words, { clearProps: "all" });
    };
  }, []);

  return (
    <span ref={ref} aria-label={text} className="inline">
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <span data-w className="inline-block origin-bottom-left will-change-transform">
            {w}
            {" "}
          </span>
        </span>
      ))}
    </span>
  );
}
