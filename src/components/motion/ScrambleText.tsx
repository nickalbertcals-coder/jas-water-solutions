"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const CHARS = "01ABDEFGHIKLMNORSTUVWXZ";

export default function ScrambleText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = text;
      return;
    }

    const chars = text.split("");
    const obj = { progress: 0 };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            progress: chars.length,
            duration: 0.5 + chars.length * 0.025,
            delay,
            ease: "power1.out",
            onUpdate: () => {
              const revealed = Math.floor(obj.progress);
              el.textContent = chars
                .map((c, i) => {
                  if (c === " " || c === "/" || i < revealed) return c;
                  return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
                .join("");
            },
            onComplete: () => {
              el.textContent = text;
            },
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [text, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text}
    </span>
  );
}
