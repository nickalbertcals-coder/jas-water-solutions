"use client";

import BubblesBackground from "@/components/BubblesBackground";
import Eyebrow from "@/components/Eyebrow";
import { JourneyDefs, JourneyScene } from "@/components/JourneyScenes";
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

function PointChips({ points }: { points: string[] }) {
  return (
    <ul className="mt-7 flex flex-wrap gap-2.5">
      {points.map((point) => (
        <li
          key={point}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-4 py-2 font-label text-sm font-semibold text-paper-50/90"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-live-500" />
          {point}
        </li>
      ))}
    </ul>
  );
}

/**
 * The journey of one cubic meter, driven by scroll.
 *
 * On desktop the section pins to the viewport and scrolling carries a drop of
 * water down a pipe through each real operating stage. Every stop has its own
 * live illustration (reservoir level rising, pumps spinning, a meter reading
 * being validated…), the copy hands off in step with it, and the stops along
 * the pipe are clickable to jump straight to one.
 *
 * On small screens, and for visitors who prefer reduced motion, it renders as
 * a stack of cards — same illustrations and copy, no pinning.
 */
export default function WaterJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  // reduced motion → render the stacked list for everyone, no pinning
  const staticMode = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getReducedMotionServer);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || staticMode) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const n = processStages.length;
      const blocks = gsap.utils.toArray<HTMLElement>("[data-stage-block]", root);
      const scenes = gsap.utils.toArray<HTMLElement>("[data-stage-scene]", root);
      const nodes = gsap.utils.toArray<HTMLElement>("[data-stage-node]", root);
      const fill = root.querySelector<HTMLElement>("[data-fill]");
      const drop = root.querySelector<HTMLElement>("[data-drop]");
      const glow = root.querySelector<HTMLElement>("[data-glow]");
      const counter = root.querySelector<HTMLElement>("[data-counter]");
      if (!fill || !drop) return;

      gsap.set(blocks, { autoAlpha: 0, y: 36 });
      gsap.set(blocks[0], { autoAlpha: 1, y: 0 });
      gsap.set(scenes, { autoAlpha: 0, x: 70, scale: 0.95 });
      gsap.set(scenes[0], { autoAlpha: 1, x: 0, scale: 1 });
      gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });

      // timeline moments at which each stop is fully on screen (first stop = very start)
      const snapTimes = [0, ...Array.from({ length: n - 1 }, (_, i) => i + 1.12), n - 1 + 0.4];

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
          end: () => `+=${Math.round(window.innerHeight * 4.6)}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // follow the timeline's own clock (it includes a rest beat), so the node
          // flips right as the text arrives — not on raw scroll progress
          onUpdate: () => setActive(Math.min(n - 1, Math.floor(tl.time() + 0.5))),
          // settle on a stop: the drop rests exactly on a node, with its copy and picture in place
          snap: {
            snapTo: (progress: number) => {
              const total = tl.duration();
              let best = 0;
              for (const t of snapTimes) {
                const v = t / total;
                if (Math.abs(v - progress) < Math.abs(best - progress)) best = v;
              }
              return best;
            },
            duration: { min: 0.3, max: 0.8 },
            delay: 0.1,
            ease: "power2.inOut",
          },
        },
      });
      tlRef.current = tl;

      // the drop travels stop to stop: it moves while the copy swaps, then rests on the next node
      for (let i = 0; i < n - 1; i++) {
        const to = (i + 1) / (n - 1);
        const move = { duration: 0.6, ease: "power2.inOut" };
        tl.to(fill, { scaleX: to, ...move }, i + 0.2);
        tl.to(drop, { left: `${to * 100}%`, ...move }, i + 0.2);
        if (glow) tl.to(glow, { left: `${15 + to * 70}%`, ...move }, i + 0.2);
      }

      // copy and illustration hand off at each node
      for (let i = 0; i < n - 1; i++) {
        const t = i + 0.5;
        tl.to(blocks[i], { autoAlpha: 0, y: -36, duration: 0.35, ease: "power2.in" }, t - 0.2);
        tl.to(scenes[i], { autoAlpha: 0, x: -70, scale: 0.95, duration: 0.35, ease: "power2.in" }, t - 0.2);
        tl.fromTo(
          blocks[i + 1],
          { autoAlpha: 0, y: 36 },
          { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out", immediateRender: false },
          t + 0.1
        );
        tl.fromTo(
          scenes[i + 1],
          { autoAlpha: 0, x: 70, scale: 0.95 },
          { autoAlpha: 1, x: 0, scale: 1, duration: 0.5, ease: "power2.out", immediateRender: false },
          t + 0.1
        );
      }
      // a beat of rest on the last stage
      tl.to({}, { duration: 0.4 });

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => {
        tlRef.current = null;
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  }, [staticMode]);

  /** Scroll so the timeline rests on a given stop. */
  const goTo = (index: number) => {
    const tl = tlRef.current;
    const st = tl?.scrollTrigger;
    if (!tl || !st) return;
    const total = tl.duration();
    const time = index === 0 ? 0 : Math.min(total, index + 0.12);
    window.scrollTo({ top: st.start + (time / total) * (st.end - st.start), behavior: "smooth" });
  };

  return (
    <section
      ref={rootRef}
      aria-labelledby="journey-heading"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#05182b_0%,#000000_100%)] text-paper-50"
    >
      <JourneyDefs />
      {/* aquarium-style air bubbles rising behind everything (desktop only) */}
      {!staticMode && (
        <BubblesBackground className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" />
      )}
      {/* soft light that travels along with the water drop */}
      <div
        data-glow
        aria-hidden
        className="pointer-events-none absolute left-[15%] top-1/2 hidden h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.22),transparent)] lg:block"
      />

      {/* ── Pinned, scroll-driven version (desktop) ── */}
      <div
        className={`relative mx-auto h-[100svh] max-w-7xl flex-col justify-between px-8 pb-10 pt-24 ${
          staticMode ? "hidden" : "hidden lg:flex"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <Eyebrow tone="light">The journey of one cubic meter</Eyebrow>
            <h2 id="journey-heading" className="sr-only">
              From bulk supply to every customer
            </h2>
          </div>
          <p data-counter className="font-label text-sm font-semibold tabular-nums text-paper-50/75">
            01 / {pad(processStages.length)}
          </p>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-12 items-center gap-10 py-6">
          {/* stage copy */}
          <div className="relative col-span-5 h-full">
            {processStages.map((stage, i) => (
              <div key={stage.key} data-stage-block className="absolute inset-0 flex flex-col justify-center">
                <span className="font-label text-sm font-bold text-accent-500">
                  Stop {pad(i + 1)} of {pad(processStages.length)}
                </span>
                <h3 className="font-statement mt-3 text-balance text-[clamp(2.3rem,4.2vw,3.9rem)] text-paper-50">
                  {stage.label}
                </h3>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-paper-50/80">{stage.description}</p>
                <PointChips points={stage.points} />
              </div>
            ))}
          </div>

          {/* stage illustration */}
          <div className="relative col-span-7 aspect-[600/400] w-full self-center overflow-hidden rounded-[2rem] border border-[color-mix(in_oklab,var(--color-white)_20%,transparent)] bg-[#1999bd45] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.75)]">
            {processStages.map((stage) => (
              <div key={stage.key} data-stage-scene className="absolute inset-0 px-4 py-3">
                <JourneyScene stageKey={stage.key} label={stage.label} />
              </div>
            ))}
          </div>
        </div>

        {/* the pipe */}
        <div className="relative mx-12 pb-9 pt-4">
          <div className="absolute inset-x-0 top-[1.625rem] h-2.5 -translate-y-1/2 rounded-full bg-white/12 ring-1 ring-white/10" />
          <div
            data-fill
            className="absolute inset-x-0 top-[1.625rem] h-2.5 -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,#4cc9e8,#3ee0b4)] shadow-[0_0_18px_2px_rgba(76,201,232,0.55)]"
          />
          <span
            data-drop
            aria-hidden
            className="absolute top-[1.625rem] z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_22px_6px_rgba(76,201,232,0.75)]"
            style={{ left: "0%" }}
          />
          <ol className="relative flex justify-between">
            {processStages.map((stage, i) => (
              <li
                key={stage.key}
                data-stage-node
                data-state="idle"
                className="group flex w-0 flex-col items-center"
              >
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to stop ${i + 1}: ${stage.label}`}
                  className="flex cursor-pointer flex-col items-center gap-3 rounded-lg px-2 pb-1 pt-0.5 focus-visible:outline-offset-2"
                >
                  <span className="relative z-20 h-4 w-4 rounded-full border-2 border-[#ffd23f]/80 bg-[#052a44] transition-all duration-300 group-hover:border-[#ffd23f] group-data-[state=passed]:border-[#ffd23f] group-data-[state=passed]:bg-[#ffd23f] group-data-[state=active]:scale-[1.6] group-data-[state=active]:border-[#ffd23f] group-data-[state=active]:bg-[#ffd23f] group-data-[state=active]:shadow-[0_0_14px_3px_rgba(255,210,63,0.6)]" />
                  <span className="whitespace-nowrap font-label text-[0.8125rem] font-semibold text-paper-50/80 transition-colors duration-300 group-hover:text-paper-50 group-data-[state=active]:text-paper-50 group-data-[state=passed]:text-paper-50/80">
                    {stage.label}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ── Static version (mobile, tablet, reduced motion) ── */}
      <div className={`relative mx-auto max-w-7xl px-5 py-20 sm:px-8 ${staticMode ? "block" : "lg:hidden"}`}>
        <Eyebrow tone="light">The journey of one cubic meter</Eyebrow>
        <ol className="mt-10 grid gap-6">
          {processStages.map((stage, i) => (
            <li
              key={stage.key}
              className="grid items-center gap-6 rounded-[1.75rem] border border-white/15 bg-white/[0.05] p-5 backdrop-blur-sm sm:p-7 md:grid-cols-2 md:gap-10"
            >
              <div className={`aspect-[600/400] w-full overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--color-white)_20%,transparent)] bg-[#1999bd45] ${i % 2 ? "md:order-2" : ""}`}>
                <JourneyScene stageKey={stage.key} label={stage.label} />
              </div>
              <div>
                <span className="font-label text-sm font-bold text-accent-500">
                  Stop {pad(i + 1)} of {pad(processStages.length)}
                </span>
                <h3 className="font-statement mt-2 text-3xl text-paper-50 sm:text-4xl">{stage.label}</h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-paper-50/80">{stage.description}</p>
                <PointChips points={stage.points} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
