import Eyebrow from "@/components/Eyebrow";
import type { ReactNode } from "react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import WaterBackground from "@/components/WaterBackground";
import WaveEdge from "@/components/WaveEdge";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
  /** Live caustic-water backdrop and a wave edge, as on the home hero. */
  water?: boolean;
};

/**
 * Opening band for inner pages: true-black with the drifting topographic
 * contour layer, and a huge signage-style statement — the same visual
 * system as the home hero, so the site reads as one place.
 */
export default function PageHero({ eyebrow, title, description, children, water = false }: Props) {
  return (
    <section
      className={`relative isolate overflow-hidden ${
        water ? "bg-[linear-gradient(135deg,#02131f_0%,#06304d_55%,#0a5a6c_100%)]" : "bg-void"
      }`}
    >
      {water ? (
        <>
          <WaterBackground />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,19,31,0.75)_0%,rgba(2,19,31,0.35)_45%,transparent_75%)]"
          />
        </>
      ) : (
        <>
          <div className="contours" aria-hidden />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(23,75,114,0.3)_0%,transparent_50%),radial-gradient(ellipse_at_20%_30%,transparent_30%,rgba(3,18,31,0.8)_100%)]"
          />
        </>
      )}
      <ScrollReveal
        as="div"
        selector=":scope > *"
        y={22}
        stagger={0.12}
        className={`relative mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 sm:pt-28 ${water ? "sm:pb-36" : "sm:pb-24"}`}
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
      {water && <WaveEdge />}
    </section>
  );
}
