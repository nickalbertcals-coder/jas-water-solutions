import Eyebrow from "@/components/Eyebrow";
import type { ReactNode } from "react";
import ScrollReveal from "@/components/motion/ScrollReveal";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

/**
 * Opening band for inner pages: true-black with the drifting topographic
 * contour layer, and a huge signage-style statement — the same visual
 * system as the home hero, so the site reads as one place.
 */
export default function PageHero({ eyebrow, title, description, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-void">
      <div className="contours" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(23,75,114,0.3)_0%,transparent_50%),radial-gradient(ellipse_at_20%_30%,transparent_30%,rgba(3,18,31,0.8)_100%)]"
      />
      <ScrollReveal
        as="div"
        selector=":scope > *"
        y={22}
        stagger={0.12}
        className="relative mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28"
      >
        <Eyebrow tone="light">{eyebrow}</Eyebrow>
        <h1 className="font-statement mt-6 max-w-5xl text-balance text-[clamp(2.4rem,5.6vw,5rem)] font-semibold text-paper-50">
          {title}
        </h1>
        {description && (
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-paper-50/78 sm:text-xl">
            {description}
          </p>
        )}
        {children}
      </ScrollReveal>
    </section>
  );
}
