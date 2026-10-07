"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import Eyebrow from "@/components/Eyebrow";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const pad = (n: number) => String(n).padStart(2, "0");

/** Labels for the three middle paragraphs (the company's own text sits under each). */
const CHAPTER_LABELS = ["What we do", "Who does the work", "How we stay accountable"];

/** The phrase in the opening line that takes the accent colour. */
const EMPHASIS = "Level III Water Distribution Systems.";

/** Photo capsules set inside the opening sentence, placed after these words (first match). */
const PILLS: Record<string, { src: string; pos: string }> = {
  "Inc.": { src: "/images/photos/workers_orange.jpg", pos: "66% 50%" },
  company: { src: "/images/photos/treatment_aerial.jpg", pos: "40% 50%" },
  of: { src: "/images/photos/meter_reading.jpg", pos: "50% 50%" },
};

/** Phrases picked out in the closing statement. */
const CLOSING_EMPHASIS = ["technical excellence", "disciplined revenue management"];

type Token = { kind: "word"; text: string; accent: boolean } | { kind: "pill"; src: string; pos: string };

function tokenize(lead: string): Token[] {
  const emphasisStart = lead.indexOf(EMPHASIS);
  const used = new Set<string>();
  const out: Token[] = [];
  let offset = 0;
  lead.split(" ").forEach((w) => {
    const start = offset;
    offset += w.length + 1;
    const accent = emphasisStart >= 0 && start >= emphasisStart && start < emphasisStart + EMPHASIS.length;
    out.push({ kind: "word", text: w, accent });
    if (PILLS[w] && !used.has(w)) {
      used.add(w);
      out.push({ kind: "pill", ...PILLS[w] });
    }
  });
  return out;
}

function emphasise(text: string) {
  const parts: React.ReactNode[] = [];
  let rest = text;
  let key = 0;
  while (rest.length) {
    let hit = -1;
    let phrase = "";
    for (const p of CLOSING_EMPHASIS) {
      const i = rest.indexOf(p);
      if (i >= 0 && (hit < 0 || i < hit)) {
        hit = i;
        phrase = p;
      }
    }
    if (hit < 0) {
      parts.push(rest);
      break;
    }
    if (hit > 0) parts.push(rest.slice(0, hit));
    parts.push(
      <span key={key++} className="bg-[linear-gradient(90deg,#1f9fd6,#5ccbf2)] bg-clip-text text-transparent">
        {phrase}
      </span>
    );
    rest = rest.slice(hit + phrase.length);
  }
  return parts;
}

/**
 * "Our story" as a brand manifesto:
 *  1. the opening sentence at poster size, its words lighting up as you scroll
 *     while three photo capsules open up inside the line;
 *  2. a slow outlined marquee;
 *  3. a wide photograph that drifts as you pass;
 *  4. the three working paragraphs as clean typographic columns;
 *  5. the closing paragraph set large and centred.
 * Reduced motion: everything is simply visible.
 */
export default function AboutStory({ paragraphs }: { paragraphs: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [lead, ...rest] = paragraphs;
  const chapters = rest.slice(0, 3);
  const closing = rest[3];
  const tokens = tokenize(lead);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const anims: gsap.core.Animation[] = [];
      const cleanEls: Element[] = [];
      const q = <T extends HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel, root);

      /* 1. the manifesto: words brighten and capsules open, in order, tied to scroll */
      const lineEl = root.querySelector<HTMLElement>("[data-manifesto]");
      const parts = q("[data-token]");
      if (lineEl && parts.length) {
        cleanEls.push(...parts);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: lineEl, start: "top 82%", end: "bottom 42%", scrub: 0.5 },
        });
        parts.forEach((el, i) => {
          if (el.dataset.token === "pill") {
            gsap.set(el, { width: 0, opacity: 0, marginInline: 0 });
            tl.to(el, { width: "1.95em", opacity: 1, marginInline: "0.14em", duration: 0.9, ease: "power2.out" }, i * 0.1);
          } else {
            gsap.set(el, { opacity: 0.14 });
            tl.to(el, { opacity: 1, duration: 0.45 }, i * 0.1);
          }
        });
        anims.push(tl);
      }

      /* 3. the wide photo: opens from the centre, then drifts */
      const band = root.querySelector<HTMLElement>("[data-band]");
      const bandImg = root.querySelector<HTMLElement>("[data-band-img]");
      if (band && bandImg) {
        cleanEls.push(band, bandImg);
        gsap.set(band, { clipPath: "inset(14% 8% 14% 8% round 40px)" });
        anims.push(
          gsap.to(band, {
            clipPath: "inset(0% 0% 0% 0% round 40px)",
            ease: "power3.inOut",
            duration: 1.5,
            scrollTrigger: { trigger: band, start: "top 88%", once: true },
          })
        );
        gsap.set(bandImg, { scale: 1.14 });
        anims.push(
          gsap.fromTo(
            bandImg,
            { yPercent: -5 },
            { yPercent: 5, ease: "none", scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: 0.6 } }
          )
        );
      }

      /* 4. columns: the hairline draws, then numeral and text rise */
      q("[data-col]").forEach((col) => {
        const rule = col.querySelector<HTMLElement>("[data-rule]");
        const items = col.querySelectorAll<HTMLElement>("[data-col-item]");
        cleanEls.push(...Array.from(items));
        if (rule) {
          cleanEls.push(rule);
          gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
        }
        gsap.set(items, { autoAlpha: 0, y: 36 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: col, start: "top 82%", once: true } });
        if (rule) tl.to(rule, { scaleX: 1, duration: 1.2, ease: "power3.inOut" }, 0);
        tl.to(items, { autoAlpha: 1, y: 0, duration: 0.95, ease: "power3.out", stagger: 0.12 }, 0.15);
        anims.push(tl);
      });

      /* 5. closing statement */
      const closeItems = q("[data-close]");
      if (closeItems.length) {
        cleanEls.push(...closeItems);
        gsap.set(closeItems, { autoAlpha: 0, y: 40 });
        anims.push(
          gsap.to(closeItems, {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.14,
            scrollTrigger: { trigger: closeItems[0], start: "top 86%", once: true },
          })
        );
      }

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => {
        anims.forEach((a) => a.kill());
        gsap.set(cleanEls, { clearProps: "all" });
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="relative overflow-x-clip bg-paper-50">
      <div aria-hidden className="pointer-events-none absolute -right-48 -top-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.2),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -left-48 top-[55%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.12),transparent)]" />

      <div ref={rootRef} className="relative">
        {/* ───────── 1. manifesto ───────── */}
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8 sm:pb-24 sm:pt-32 lg:pt-40">
          <div className="flex items-center gap-5">
            <Eyebrow>Our story</Eyebrow>
            <span aria-hidden className="h-px flex-1 bg-ink-900/15" />
          </div>

          <p
            data-manifesto
            className="font-display mt-10 max-w-[68rem] text-[clamp(2rem,5.1vw,4.9rem)] font-bold leading-[1.1] tracking-[-0.025em] text-ink-900 sm:mt-14"
          >
            {tokens.map((t, i) =>
              t.kind === "word" ? (
                <span key={i} data-token="word" className={t.accent ? "text-accent-600" : undefined}>
                  {t.text}{" "}
                </span>
              ) : (
                <span
                  key={i}
                  data-token="pill"
                  aria-hidden
                  className="relative mx-[0.14em] inline-block h-[0.82em] w-[1.95em] -translate-y-[0.06em] overflow-hidden rounded-full align-middle shadow-[0_14px_30px_-14px_rgba(5,24,43,0.7)] ring-1 ring-ink-900/10"
                >
                  <Image src={t.src} alt="" fill sizes="260px" className="scale-[1.25] object-cover" style={{ objectPosition: t.pos }} />
                  <span className="absolute inset-0 bg-[#0a3d63]/18 mix-blend-multiply" />
                </span>
              )
            )}
          </p>
        </div>

        {/* ───────── 2. marquee ───────── */}
        <div aria-hidden className="select-none overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="team-marquee-a flex w-max whitespace-nowrap">
            {[0, 1].map((n) => (
              <span
                key={n}
                className="font-display flex items-center text-[clamp(4.5rem,11vw,10rem)] font-extrabold leading-none"
                style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(10,114,154,0.34)" }}
              >
                {["Reliable", "Efficient", "Financially sustainable"].map((w) => (
                  <span key={w} className="flex items-center">
                    {w}
                    <svg viewBox="0 0 24 24" className="mx-[0.35em] h-[0.5em] w-[0.5em] text-accent-500/70" fill="currentColor" style={{ WebkitTextStroke: 0 }}>
                      <path d="M12 2.5c-.3 0-.6.2-.8.4C9 5.6 5 10.2 5 14.5a7 7 0 0 0 14 0c0-4.3-4-8.9-6.2-11.6-.2-.2-.5-.4-.8-.4Z" />
                    </svg>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ───────── 3. wide photograph ───────── */}
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-14">
          <div
            data-band
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_70px_120px_-60px_rgba(5,24,43,0.9)] ring-1 ring-ink-900/10 sm:aspect-[16/9] sm:rounded-[2.5rem] lg:aspect-[21/9]"
          >
            <div data-band-img className="absolute inset-0 will-change-transform">
              <Image
                src="/images/photos/workers_orange.jpg"
                alt="JAS Water Solutions engineers at a water facility"
                fill
                sizes="(min-width: 1280px) 1200px, 94vw"
                className="object-cover object-[76%_50%] sm:object-[62%_84%]"
              />
            </div>
            <div aria-hidden className="absolute inset-0 bg-[#0a3d63]/22 mix-blend-multiply" />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,24,43,0.88)_0%,rgba(5,24,43,0.35)_42%,transparent_70%)] sm:bg-[linear-gradient(90deg,rgba(5,24,43,0.72)_0%,rgba(5,24,43,0.12)_55%,transparent_100%)]" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 sm:bottom-9 sm:left-10 sm:right-10">
              <p className="font-display max-w-md text-balance text-[clamp(1.2rem,2.1vw,1.9rem)] font-bold leading-snug text-paper-50">
                Reliable, efficient, and financially sustainable water supply for the communities we serve.
              </p>
              <span className="flex items-center gap-2.5 rounded-full border border-white/25 bg-[#05182b]/55 px-4 py-2.5 backdrop-blur-xl">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live-500 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-live-500" />
                </span>
                <span className="font-label text-sm font-bold text-paper-50">24/7 digitized monitoring</span>
              </span>
            </div>
          </div>
        </div>

        {/* ───────── 4. three columns ───────── */}
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-14 md:grid-cols-3 md:gap-10 lg:gap-16">
            {chapters.map((text, i) => (
              <div key={i} data-col>
                <span data-rule aria-hidden className="block h-px w-full bg-ink-900/30" />
                <p
                  data-col-item
                  className="font-display mt-6 text-[clamp(3.4rem,6vw,5.4rem)] font-extrabold leading-none"
                  style={{ color: "transparent", WebkitTextStroke: "1.6px rgba(10,114,154,0.5)" }}
                >
                  {pad(i + 1)}
                </p>
                <p data-col-item className="font-display mt-6 text-xl font-bold text-ink-900">
                  {CHAPTER_LABELS[i] ?? ""}
                </p>
                <p data-col-item className="mt-3 text-pretty text-[1.05rem] leading-[1.8] text-steel-600">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ───────── 5. closing statement ───────── */}
        {closing && (
          <div className="mx-auto max-w-5xl px-5 pb-28 pt-24 text-center sm:px-8 sm:pb-36 sm:pt-32">
            <span data-close className="relative mx-auto flex h-16 w-16 items-center justify-center">
              <span aria-hidden className="ring-pulse absolute inset-0 rounded-full border border-accent-600/50" />
              <span aria-hidden className="ring-pulse absolute inset-0 rounded-full border border-accent-600/50 [animation-delay:1.3s]" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#05182b,#0f4468)] text-accent-500 shadow-[0_20px_40px_-14px_rgba(5,24,43,0.8)]">
                <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                  <path d="M12 2.5c-.3 0-.6.2-.8.4C9 5.6 5 10.2 5 14.5a7 7 0 0 0 14 0c0-4.3-4-8.9-6.2-11.6-.2-.2-.5-.4-.8-.4Z" />
                </svg>
              </span>
            </span>
            <p data-close className="font-display mt-10 text-balance text-[clamp(1.7rem,3.6vw,3.3rem)] font-bold leading-[1.2] tracking-[-0.02em] text-ink-900">
              {emphasise(closing)}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
