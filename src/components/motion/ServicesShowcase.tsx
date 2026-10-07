"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SERVICE_ICONS, SERVICE_SHORT } from "@/lib/serviceIcons";
import type { Service } from "@/lib/data";

const pad = (n: number) => String(n).padStart(2, "0");

/** True on desktop widths with motion allowed — the only case that gets the pinned showcase. */
const QUERY_A = "(min-width: 1024px)";
const QUERY_B = "(prefers-reduced-motion: reduce)";
const subscribe = (onChange: () => void) => {
  const a = window.matchMedia(QUERY_A);
  const b = window.matchMedia(QUERY_B);
  a.addEventListener("change", onChange);
  b.addEventListener("change", onChange);
  return () => {
    a.removeEventListener("change", onChange);
    b.removeEventListener("change", onChange);
  };
};
const getPinned = () => window.matchMedia(QUERY_A).matches && !window.matchMedia(QUERY_B).matches;

function Chips({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-[0.92rem] font-semibold leading-snug ${
            dark ? "border-white/12 bg-white/[0.06] text-paper-50" : "border-line bg-white text-ink-900 shadow-[0_14px_30px_-24px_rgba(10,39,64,0.5)]"
          }`}
        >
          <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent-600">
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3.5 8.5 3 3 6-6.5" />
            </svg>
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function LearnMore({ service }: { service: Service }) {
  if (!service.learnMore) return null;
  return (
    <Link
      href={service.learnMore.href}
      className="group mt-7 inline-flex w-fit items-center gap-3 self-start rounded-full bg-ink-900 py-2.5 pl-6 pr-2.5 font-label text-base font-semibold text-paper-50 transition-colors hover:bg-accent-600"
    >
      {service.learnMore.label}
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-void transition-transform duration-500 group-hover:rotate-45">
        <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12 12 4M5.5 4H12v6.5" />
        </svg>
      </span>
    </Link>
  );
}

/**
 * The services, told one at a time. On desktop the section pins to the screen:
 * scrolling wipes each service's photo in over the last (with a slow zoom
 * settling underneath), swaps the copy, and fills a segmented progress rail;
 * it settles on each service. Links like /services#hydraulic-modeling land on
 * the right one, and the rail is clickable. On phones, tablets and for
 * reduced motion it is a plain stack of cards with the same content.
 */
export default function ServicesShowcase({ services }: { services: Service[] }) {
  const pinned = useSyncExternalStore(subscribe, getPinned, () => false);
  const rootRef = useRef<HTMLDivElement>(null);
  const goToRef = useRef<(i: number, instant?: boolean) => void>(() => {});

  useLayoutEffect(() => {
    if (!pinned) return;
    const root = rootRef.current;
    if (!root) return;
    const n = services.length;

    const ctx = gsap.context(() => {
      const pin = root.querySelector<HTMLElement>("[data-pin]")!;
      const slides = gsap.utils.toArray<HTMLElement>("[data-slide]", root);
      const zooms = gsap.utils.toArray<HTMLElement>("[data-zoom]", root);
      const blocks = gsap.utils.toArray<HTMLElement>("[data-block]", root);
      const bars = gsap.utils.toArray<HTMLElement>("[data-bar]", root);
      const items = gsap.utils.toArray<HTMLElement>("[data-rail]", root);
      const anchors = gsap.utils.toArray<HTMLElement>("[data-anchor]", root);
      const counter = root.querySelector<HTMLElement>("[data-counter]");
      const headerH = () => document.querySelector("header")?.offsetHeight ?? 88;

      gsap.set(slides.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(zooms, { scale: 1.22 });
      gsap.set(zooms[0], { scale: 1.04 });
      gsap.set(blocks.slice(1), { autoAlpha: 0, y: 44 });
      gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(bars[0], { scaleX: 1 });

      // the moments at which each service is fully on screen
      const stops = [0, ...Array.from({ length: n - 1 }, (_, i) => i + 1.15)];

      let last = -1;
      const setActive = (index: number) => {
        if (index === last) return;
        last = index;
        items.forEach((el, i) => (el.dataset.state = i < index ? "passed" : i === index ? "active" : "idle"));
        if (counter) counter.textContent = `${pad(index + 1)} / ${pad(n)}`;
      };
      setActive(0);

      const holder: { tl?: gsap.core.Timeline } = {};
      const place = () => {
        const st = holder.tl?.scrollTrigger;
        if (!st || !holder.tl) return;
        const total = holder.tl.duration();
        const pinStartDoc = st.start; // scroll offset at which pinning begins
        anchors.forEach((a, k) => {
          const target = pinStartDoc + (stops[k] / total) * (st.end - st.start);
          a.style.top = `${target - (pinStartDoc + headerH())}px`;
        });
      };

      const tl = (holder.tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pin,
          start: () => `top ${headerH()}px`,
          end: () => `+=${Math.round(window.innerHeight * 0.95 * (n - 1) + window.innerHeight * 0.35)}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: place,
          onUpdate: () => setActive(Math.min(n - 1, Math.floor((holder.tl?.time() ?? 0) + 0.5))),
          snap: {
            snapTo: (progress: number) => {
              const total = holder.tl!.duration();
              let best = 0;
              for (const t of stops) {
                const v = t / total;
                if (Math.abs(v - progress) < Math.abs(best - progress)) best = v;
              }
              return best;
            },
            inertia: false,
            directional: false,
            duration: { min: 0.3, max: 0.85 },
            delay: 0.08,
            ease: "power2.inOut",
          },
        },
      }));

      for (let i = 0; i < n - 1; i++) {
        const t = i + 0.5;
        // the next photo wipes up over the current one while it settles from a zoom
        tl.to(slides[i + 1], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.75, ease: "power3.inOut" }, t - 0.15);
        tl.to(zooms[i + 1], { scale: 1.04, duration: 1, ease: "power2.out" }, t - 0.15);
        tl.to(zooms[i], { scale: 1.12, duration: 0.9 }, t - 0.15);
        // copy hands off
        tl.to(blocks[i], { autoAlpha: 0, y: -40, duration: 0.35, ease: "power2.in" }, t - 0.2);
        tl.fromTo(
          blocks[i + 1],
          { autoAlpha: 0, y: 44 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", immediateRender: false },
          t + 0.12
        );
        // the rail's next segment fills
        tl.to(bars[i + 1], { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, t - 0.1);
      }
      tl.to({}, { duration: 0.5 });

      goToRef.current = (i, instant = false) => {
        const st = tl.scrollTrigger;
        if (!st) return;
        const top = st.start + (stops[i] / tl.duration()) * (st.end - st.start);
        window.scrollTo({ top, behavior: instant ? "instant" : "smooth" });
      };

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      requestAnimationFrame(() => {
        place();
        const idx = services.findIndex((s) => `#${s.slug}` === window.location.hash);
        if (idx >= 0) setTimeout(() => goToRef.current(idx, true), 150);
      });
    }, root);

    return () => ctx.revert();
  }, [pinned, services]);

  /* ───────────── pinned (desktop) ───────────── */
  if (pinned) {
    return (
      <div ref={rootRef} className="relative bg-paper-50">
        {services.map((s) => (
          <span key={s.slug} id={s.slug} data-anchor aria-hidden className="pointer-events-none absolute left-0 h-px w-px" style={{ top: 0 }} />
        ))}

        <div data-pin className="relative flex h-[calc(100svh-5.5rem)] min-h-[36rem] flex-col overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -right-40 -top-24 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.2),transparent)]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-32 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(62,224,180,0.1),transparent)]" />

          <div className="relative mx-auto grid w-full max-w-7xl flex-1 grid-cols-12 items-center gap-12 px-8 pt-8">
            {/* copy */}
            <div className="relative col-span-5 h-full">
              <p className="absolute left-0 top-2 z-10 font-label text-sm font-bold tabular-nums text-accent-600">
                Service <span data-counter>{`01 / ${pad(services.length)}`}</span>
              </p>
              {services.map((s) => (
                <div key={s.slug} data-block className="absolute inset-0 flex flex-col justify-center pt-8">
                  <h2 className="font-statement text-balance text-[clamp(1.9rem,min(3.3vw,5.6vh),3.1rem)] text-ink-900">{s.title}</h2>
                  <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-steel-600">{s.description}</p>
                  {s.subItems && <Chips items={s.subItems} />}
                  <LearnMore service={s} />
                </div>
              ))}
            </div>

            {/* photo stack */}
            <div className="relative col-span-7 h-[min(100%,34rem)] max-h-full">
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-[0_60px_100px_-44px_rgba(10,39,64,0.85)] ring-1 ring-ink-900/10">
                {services.map((s, i) => (
                  <div key={s.slug} data-slide className="absolute inset-0" style={{ zIndex: i + 1 }}>
                    <div data-zoom className="absolute inset-0 will-change-transform">
                      <Image src={s.image} alt={s.title} fill sizes="(min-width: 1280px) 700px, 58vw" className="object-cover" priority={i === 0} />
                    </div>
                    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,24,43,0.1)_0%,transparent_40%,rgba(5,24,43,0.72)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7">
                      <div>
                        <span className="font-display text-6xl font-extrabold leading-none text-white/90">{pad(i + 1)}</span>
                        <p className="mt-2 font-label text-base font-bold text-paper-50">{SERVICE_SHORT[s.slug] ?? s.title}</p>
                      </div>
                      <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-[#05182b]/90 text-accent-500 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                        <svg aria-hidden viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          {SERVICE_ICONS[s.slug]}
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* segmented progress rail */}
          <div className="relative mx-auto grid w-full max-w-7xl shrink-0 grid-cols-5 gap-3 px-8 pb-7 pt-5">
            {services.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                data-rail
                data-state={i === 0 ? "active" : "idle"}
                onClick={() => goToRef.current(i)}
                aria-label={`Go to ${s.title}`}
                className="group text-left"
              >
                <span className="block h-[3px] w-full overflow-hidden rounded-full bg-ink-900/15">
                  <span data-bar className="block h-full w-full rounded-full bg-[linear-gradient(90deg,#27b6ee,#8fdcff)]" />
                </span>
                <span className="mt-3 flex items-baseline gap-2 font-label text-[0.9rem] font-bold text-ink-900/45 transition-colors duration-300 group-hover:text-ink-900 group-data-[state=active]:text-ink-900 group-data-[state=passed]:text-ink-900/70">
                  <span className="tabular-nums text-accent-600">{pad(i + 1)}</span>
                  {SERVICE_SHORT[s.slug] ?? s.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ───────────── stacked cards (phones, tablets, reduced motion) ───────────── */
  return (
    <div className="bg-paper-50">
      {services.map((s, i) => (
        <section key={s.slug} id={s.slug} className="scroll-mt-28 px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className={`relative lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}>
              <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-[0_44px_80px_-44px_rgba(10,39,64,0.75)] ring-1 ring-ink-900/10">
                <Image src={s.image} alt={s.title} fill sizes="(min-width: 1024px) 620px, 92vw" className="object-cover" />
                <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(5,24,43,0.55)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
                  <span className="font-display text-5xl font-extrabold leading-none text-white/90">{pad(i + 1)}</span>
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-[#05182b]/90 text-accent-500 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                    <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {SERVICE_ICONS[s.slug]}
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6">
              <h2 className="font-statement text-balance text-[clamp(1.9rem,4.4vw,2.9rem)] text-ink-900">{s.title}</h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-steel-600">{s.description}</p>
              {s.subItems && <Chips items={s.subItems} />}
              <LearnMore service={s} />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
