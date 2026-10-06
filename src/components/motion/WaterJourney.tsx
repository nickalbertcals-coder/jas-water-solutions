"use client";

import Eyebrow from "@/components/Eyebrow";
import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { processStages } from "@/lib/data";

const pad = (n: number) => String(n).padStart(2, "0");

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const getReducedMotion = () => window.matchMedia(REDUCED_QUERY).matches;
const getReducedMotionServer = () => false;

/**
 * The journey of one cubic meter, driven by scroll.
 *
 * On desktop the section pins to the viewport and scrolling carries a
 * drop of water down the line through each real operating stage: the
 * headline, description and ghost numeral change per stage, the line
 * fills, passed nodes light up and the current one glows seafoam.
 *
 * On small screens, and for visitors who prefer reduced motion, it
 * renders as a plain stacked list — same content, no pinning.
 */
export default function WaterJourney() {
  const rootRef = useRef<HTMLElement>(null);
  // reduced motion → render the stacked list for everyone, no pinning
  const staticMode = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getReducedMotionServer);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || staticMode) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const n = processStages.length;
      const blocks = gsap.utils.toArray<HTMLElement>("[data-stage-block]", root);
      const nodes = gsap.utils.toArray<HTMLElement>("[data-stage-node]", root);
      const fill = root.querySelector<HTMLElement>("[data-fill]");
      const drop = root.querySelector<HTMLElement>("[data-drop]");
      const counter = root.querySelector<HTMLElement>("[data-counter]");
      const ghost = gsap.utils.toArray<HTMLElement>("[data-ghost]", root);
      if (!fill || !drop) return;

      gsap.set(blocks, { autoAlpha: 0, y: 36 });
      gsap.set(blocks[0], { autoAlpha: 1, y: 0 });
      gsap.set(ghost, { autoAlpha: 0 });
      gsap.set(ghost[0], { autoAlpha: 1 });
      gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });

      let lastIndex = -1;
      const setActive = (index: number) => {
        if (index === lastIndex) return;
        lastIndex = index;
        nodes.forEach((node, i) => {
          node.dataset.state = i < index ? "passed" : i === index ? "active" : "idle";
        });
        if (counter) counter.textContent = `${pad(index + 1)} / ${pad(n)}`;
      };
      setActive(0);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 4.2)}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // follow the timeline's own clock (it includes a rest beat), so the node
          // flips right as the text arrives — not on raw scroll progress
          onUpdate: () => setActive(Math.min(n - 1, Math.floor(tl.time() + 0.25))),
        },
      });

      // water moves along the line for the whole scroll distance
      tl.to(fill, { scaleX: 1, duration: n - 1 }, 0);
      tl.to(drop, { left: "100%", duration: n - 1 }, 0);

      // stage copy hands off at each node
      for (let i = 0; i < n - 1; i++) {
        const t = i + 0.5;
        tl.to(blocks[i], { autoAlpha: 0, y: -36, duration: 0.35, ease: "power2.in" }, t - 0.2);
        tl.to(ghost[i], { autoAlpha: 0, duration: 0.3 }, t - 0.2);
        tl.fromTo(
          blocks[i + 1],
          { autoAlpha: 0, y: 36 },
          { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out", immediateRender: false },
          t + 0.1
        );
        tl.fromTo(ghost[i + 1], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, immediateRender: false }, t + 0.1);
      }
      // a beat of rest on the last stage
      tl.to({}, { duration: 0.4 });

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  }, [staticMode]);

  return (
    <section
      ref={rootRef}
      aria-labelledby="journey-heading"
      className="relative overflow-hidden bg-void text-paper-50"
    >
      <div className="contours" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_35%,rgba(3,18,31,0.8)_100%)]"
      />

      {/* ── Pinned, scroll-driven version (desktop) ── */}
      <div
        className={`relative mx-auto h-[100svh] max-w-7xl flex-col justify-between px-8 pb-14 pt-28 ${
          staticMode ? "hidden" : "hidden lg:flex"
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <Eyebrow tone="light">The journey of one cubic meter</Eyebrow>
            <h2 id="journey-heading" className="sr-only">
              From bulk supply to every customer
            </h2>
          </div>
          <p data-counter className="font-label text-sm tabular-nums text-paper-50/70">
            01 / {pad(processStages.length)}
          </p>
        </div>

        <div className="relative flex-1">
          {/* ghost numerals */}
          {processStages.map((stage, i) => (
            <span
              key={`ghost-${stage.key}`}
              data-ghost
              aria-hidden
              className="font-statement pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 select-none text-[clamp(11rem,26vw,24rem)] font-bold"
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.2)",
              }}
            >
              {pad(i + 1)}
            </span>
          ))}

          {/* stage copy */}
          {processStages.map((stage) => (
            <div
              key={stage.key}
              data-stage-block
              className="absolute inset-y-0 left-0 flex max-w-3xl flex-col justify-center"
            >
              <h3 className="font-statement text-[clamp(2.8rem,6.5vw,6rem)] font-semibold">
                {stage.label}
              </h3>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper-50/70 sm:text-xl">
                {stage.description}
              </p>
            </div>
          ))}
        </div>

        {/* the line */}
        <div className="relative pb-10 pt-6">
          <div className="absolute inset-x-0 top-[1.875rem] h-px bg-white/15" />
          <div
            data-fill
            className="absolute inset-x-0 top-[1.875rem] h-px bg-aqua-400 shadow-[0_0_14px_2px_rgba(76,201,232,0.55)]"
          />
          <span
            data-drop
            aria-hidden
            className="absolute top-[1.875rem] z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aqua-400 shadow-[0_0_18px_4px_rgba(76,201,232,0.7)]"
            style={{ left: "0%" }}
          />
          <ol className="relative flex justify-between">
            {processStages.map((stage) => (
              <li
                key={stage.key}
                data-stage-node
                data-state="idle"
                className="group flex w-0 flex-col items-center"
              >
                <span className="h-3 w-3 rounded-full border border-white/40 bg-void transition-all duration-300 group-data-[state=passed]:border-aqua-400 group-data-[state=passed]:bg-aqua-400 group-data-[state=active]:scale-150 group-data-[state=active]:border-live-500 group-data-[state=active]:bg-live-500" />
                <span className="mt-4 whitespace-nowrap font-label text-[0.8125rem] text-paper-50/70 transition-colors duration-300 group-data-[state=active]:text-paper-50 group-data-[state=passed]:text-paper-50/70">
                  {stage.label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ── Static version (mobile, tablet, reduced motion) ── */}
      <div className={`relative mx-auto max-w-7xl px-5 py-20 sm:px-8 ${staticMode ? "block" : "lg:hidden"}`}>
        <Eyebrow tone="light">The journey of one cubic meter</Eyebrow>
        <ol className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {processStages.map((stage, i) => (
            <li key={stage.key} className="grid grid-cols-[3rem_1fr] gap-4 py-6 sm:grid-cols-[5rem_1fr]">
              <span className="font-label text-sm tabular-nums text-accent-500">{pad(i + 1)}</span>
              <div>
                <h3 className="font-statement text-3xl font-semibold sm:text-4xl">{stage.label}</h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-paper-50/78">
                  {stage.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
