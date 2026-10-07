"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * "Who we are" visual: an editorial photo composition instead of a cube.
 * A tall arched portrait, a round detail shot and a small landscape inset
 * overlap on a offset outline, joined by a slowly turning text seal. On
 * scroll each layer drifts at its own speed for depth.
 *
 * The source photos have white margins and rounded corners baked in (they were
 * cut from a PDF), so every image is scaled up inside its mask until the baked
 * edge is cropped away.
 */
export default function WhoVisual() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-depth]", root).forEach((el) => {
        const depth = Number(el.dataset.depth);
        gsap.fromTo(
          el,
          { y: -depth * 40 },
          { y: depth * 40, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.8 } }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative mx-auto aspect-[1/1.02] w-full max-w-[34rem]">
      {/* offset outline arch + soft glow behind */}
      <div aria-hidden className="absolute left-[2%] top-[8%] h-[70%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.35),transparent)] blur-2xl" />

      {/* arched portrait */}
      <div data-depth="0.5" className="absolute left-0 top-0 h-[84%] w-[66%]">
        <div className="relative h-full w-full overflow-hidden rounded-t-full rounded-b-[2rem] shadow-[0_50px_90px_-36px_rgba(10,39,64,0.8)] ring-1 ring-ink-900/10">
          <Image
            src="/images/photos/workers_orange.jpg"
            alt="JAS Water Solutions engineers reviewing a site"
            fill
            sizes="(min-width: 1024px) 360px, 70vw"
            className="max-w-none scale-[1.28] object-cover"
            style={{ objectPosition: "72% 50%" }}
            priority={false}
          />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,24,43,0)_55%,rgba(5,24,43,0.5)_100%)]" />
        </div>
      </div>

      {/* inset landscape */}
      <div data-depth="-0.7" className="absolute right-0 top-[6%] w-[36%]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_34px_60px_-26px_rgba(10,39,64,0.75)] ring-[6px] ring-paper-50">
          <Image
            src="/images/photos/treatment_aerial.jpg"
            alt="Water treatment channels"
            fill
            sizes="200px"
            className="max-w-none scale-[1.3] object-cover"
            style={{ objectPosition: "42% 55%" }}
          />
        </div>
      </div>

      {/* round detail shot */}
      <div data-depth="0.9" className="absolute bottom-0 right-[4%] w-[46%]">
        <div className="relative aspect-square overflow-hidden rounded-full shadow-[0_40px_70px_-26px_rgba(10,39,64,0.8)] ring-[7px] ring-paper-50">
          <Image
            src="/images/photos/hand_water.jpg"
            alt="Clean water running over a hand"
            fill
            sizes="260px"
            className="max-w-none object-cover"
            style={{ width: "132%", left: "-28%", objectPosition: "60% 58%" }}
          />
        </div>
      </div>

      {/* turning text seal */}
      <div data-depth="-0.4" className="absolute bottom-[2%] left-[2%] h-[28%] w-[28%]">
        <div className="relative h-full w-full rounded-full bg-[linear-gradient(135deg,#05182b,#0f4468)] shadow-[0_26px_50px_-18px_rgba(10,39,64,0.8)] ring-[5px] ring-paper-50">
          <svg viewBox="0 0 120 120" className="seal-spin absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <path id="who-seal" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1 -88 0" />
            </defs>
            <text fontSize="9.5" fontWeight="700" letterSpacing="1.5" fill="#9fe6f7" fontFamily="var(--font-figtree), sans-serif">
              <textPath href="#who-seal" textLength="272" lengthAdjust="spacing">Level III · Water distribution · O&amp;M · </textPath>
            </text>
          </svg>
          <svg viewBox="0 0 24 24" className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 text-accent-500" fill="currentColor" aria-hidden>
            <path d="M12 2.5c-.3 0-.6.2-.8.4C9 5.6 5 10.2 5 14.5a7 7 0 0 0 14 0c0-4.3-4-8.9-6.2-11.6-.2-.2-.5-.4-.8-.4Z" />
          </svg>
        </div>
      </div>

      {/* monitoring chip */}
      <div data-depth="0.3" className="absolute -left-2 top-[14%] sm:-left-6">
        <div className="float-y flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 shadow-[0_18px_40px_-14px_rgba(10,39,64,0.4)] ring-1 ring-ink-900/5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live-500 opacity-70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-live-500" />
          </span>
          <span className="whitespace-nowrap text-sm font-semibold text-ink-900">24/7 digitized monitoring</span>
        </div>
      </div>
    </div>
  );
}
