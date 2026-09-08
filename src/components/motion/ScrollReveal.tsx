"use client";

import { createElement, useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** If set, animates the direct children matching this selector individually (staggered). */
  selector?: string;
  y?: number;
  stagger?: number;
  delay?: number;
  /** Animate once vs. every time it re-enters the viewport. */
  once?: boolean;
};

export default function ScrollReveal({
  children,
  className,
  as: Comp = "div",
  selector,
  y = 22,
  stagger = 0.08,
  delay = 0,
  once = true,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = selector ? root.querySelectorAll(selector) : root;

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: root,
            start: "top 88%",
            once,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [selector, y, stagger, delay, once]);

  return createElement(Comp, { ref, className }, children);
}

export { gsap, ScrollTrigger };
