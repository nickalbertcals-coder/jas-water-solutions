"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import Eyebrow from "@/components/Eyebrow";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const pad = (n: number) => String(n).padStart(2, "0");

/** Labels for the three middle paragraphs (the company's own text follows each one). */
const CHAPTER_LABELS = ["What we do", "Who does the work", "How we stay accountable"];

/** The phrase in the opening line that gets the accent colour. */
const EMPHASIS = "Level III Water Distribution Systems.";

/**
 * "Our story", set as an editorial spread rather than a wall of paragraphs:
 *  - a sticky photo that drifts inside its frame;
 *  - the opening sentence at display size, whose words light up as you scroll;
 *  - three numbered chapters hung on a thread that fills as you read;
 *  - the closing paragraph as a dark pull-quote card.
 * With reduced motion everything is simply visible and static.
 */
export default function AboutStory({ paragraphs }: { paragraphs: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [lead, ...rest] = paragraphs;
  const chapters = rest.slice(0, 3);
  const closing = rest[3];

  /* split the lead into words, marking those inside the emphasised phrase */
  const emphasisStart = lead.indexOf(EMPHASIS);
  const wordMeta = lead.split(" ").map((w, i, arr) => {
    const start = arr.slice(0, i).reduce((n, x) => n + x.length + 1, 0);
    const inEmphasis = emphasisStart >= 0 && start >= emphasisStart && start < emphasisStart + EMPHASIS.length;
    return { w, inEmphasis };
  });

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctxEls = {
        words: gsap.utils.toArray<HTMLElement>("[data-lead-word]", root),
        lead: root.querySelector<HTMLElement>("[data-lead]"),
        fill: root.querySelector<HTMLElement>("[data-thread-fill]"),
        list: root.querySelector<HTMLElement>("[data-chapters]"),
        chapters: gsap.utils.toArray<HTMLElement>("[data-chapter]", root),
        photo: root.querySelector<HTMLElement>("[data-story-photo]"),
        img: root.querySelector<HTMLElement>("[data-story-img]"),
        inset: root.querySelector<HTMLElement>("[data-story-inset]"),
        quote: root.querySelector<HTMLElement>("[data-quote]"),
      };
      const triggers: ScrollTrigger[] = [];
      const tweens: gsap.core.Animation[] = [];

      /* opening line: words brighten in sequence, tied to scroll */
      if (ctxEls.lead && ctxEls.words.length) {
        gsap.set(ctxEls.words, { opacity: 0.16 });
        const t = gsap.to(ctxEls.words, {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: ctxEls.lead, start: "top 82%", end: "bottom 48%", scrub: 0.4 },
        });
        tweens.push(t);
      }

      /* thread fill */
      if (ctxEls.fill && ctxEls.list) {
        gsap.set(ctxEls.fill, { scaleY: 0, transformOrigin: "top center" });
        tweens.push(
          gsap.to(ctxEls.fill, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: ctxEls.list, start: "top 70%", end: "bottom 62%", scrub: 0.4 },
          })
        );
      }

      /* chapters: rise in, and the node lights up when reached */
      ctxEls.chapters.forEach((ch) => {
        const body = ch.querySelectorAll<HTMLElement>("[data-chapter-body]");
        gsap.set(body, { autoAlpha: 0, y: 34 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ch,
            start: "top 78%",
            once: true,
            onEnter: () => ch.setAttribute("data-on", "true"),
          },
        });
        tl.to(body, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 });
        tweens.push(tl);
      });

      /* photo: opens from the centre, then drifts slowly inside the frame */
      if (ctxEls.photo) {
        gsap.set(ctxEls.photo, { clipPath: "inset(10% 10% 10% 10% round 36px)" });
        tweens.push(
          gsap.to(ctxEls.photo, {
            clipPath: "inset(0% 0% 0% 0% round 36px)",
            duration: 1.4,
            ease: "power3.inOut",
            scrollTrigger: { trigger: ctxEls.photo, start: "top 85%", once: true },
          })
        );
      }
      if (ctxEls.img && ctxEls.photo) {
        gsap.set(ctxEls.img, { scale: 1.2 });
        tweens.push(
          gsap.fromTo(
            ctxEls.img,
            { yPercent: -7 },
            { yPercent: 7, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.6 } }
          )
        );
      }
      if (ctxEls.inset) {
        tweens.push(
          gsap.fromTo(
            ctxEls.inset,
            { y: 36 },
            { y: -36, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.8 } }
          )
        );
      }

      /* closing quote card */
      if (ctxEls.quote) {
        gsap.set(ctxEls.quote, { autoAlpha: 0, y: 50 });
        tweens.push(
          gsap.to(ctxEls.quote, {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: ctxEls.quote, start: "top 88%", once: true },
          })
        );
      }

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => {
        tweens.forEach((t) => t.kill());
        triggers.forEach((t) => t.kill());
        gsap.set(
          [...ctxEls.words, ...ctxEls.chapters.flatMap((c) => Array.from(c.querySelectorAll("[data-chapter-body]"))), ctxEls.photo, ctxEls.img, ctxEls.inset, ctxEls.quote, ctxEls.fill].filter(Boolean) as Element[],
          { clearProps: "all" }
        );
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="relative overflow-x-clip bg-paper-50 py-20 sm:py-28 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-32 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.18),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.12),transparent)]" />

      <div ref={rootRef} className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        {/* ───────── photo column ───────── */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-md pb-14 lg:sticky lg:top-28 lg:max-w-none">
            <div
              data-story-photo
              className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] shadow-[0_60px_110px_-50px_rgba(5,24,43,0.85)] ring-1 ring-ink-900/10"
            >
              <div data-story-img className="absolute inset-0 will-change-transform">
                <Image
                  src="/images/photos/workers_orange.jpg"
                  alt="JAS Water Solutions engineers at a water facility"
                  fill
                  sizes="(min-width: 1024px) 520px, 90vw"
                  className="object-cover"
                  style={{ objectPosition: "62% 50%" }}
                />
              </div>
              <div aria-hidden className="absolute inset-0 bg-[#0a3d63]/10 mix-blend-multiply" />
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(5,24,43,0.78)_100%)]" />

              {/* caption on the photo */}
              <div className="absolute inset-x-5 bottom-5 flex items-center gap-4 rounded-2xl border border-white/20 bg-[#05182b]/55 p-4 backdrop-blur-xl">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-accent-600">
                  <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2.8c-.3 0-.5.2-.7.4C9 5.8 5.5 9.8 5.5 13.8a6.5 6.5 0 0 0 13 0c0-4-3.5-8-5.8-10.6-.2-.2-.4-.4-.7-.4Z" />
                    <path d="M9 14l2.2 2.2 4-4.4" />
                  </svg>
                </span>
                <p className="font-display text-[0.98rem] font-bold leading-snug text-paper-50">
                  Reliable, efficient, and financially sustainable water supply
                </p>
              </div>
            </div>

            {/* inset photo */}
            <div data-story-inset className="absolute -right-3 top-12 w-[40%] sm:-right-8">
              <div className="float-y relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_30px_60px_-24px_rgba(5,24,43,0.7)] ring-[5px] ring-paper-50">
                <Image src="/images/photos/meter_reading.jpg" alt="" fill sizes="220px" className="scale-[1.12] object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* ───────── story column ───────── */}
        <div className="min-w-0 lg:col-span-7">
          <Eyebrow>Our story</Eyebrow>

          {/* opening line, lights up word by word */}
          <p data-lead className="font-display mt-7 text-[clamp(1.65rem,2.9vw,2.65rem)] font-bold leading-[1.22] tracking-tight text-ink-900">
            {wordMeta.map(({ w, inEmphasis }, i) => (
              <span key={i} data-lead-word className={inEmphasis ? "text-accent-600" : undefined}>
                {w}{" "}
              </span>
            ))}
          </p>

          {/* chapters on a thread */}
          <div data-chapters className="relative mt-14 lg:mt-20">
            <span aria-hidden className="absolute bottom-3 left-[1.15rem] top-3 w-px bg-ink-900/12" />
            <span
              aria-hidden
              data-thread-fill
              className="absolute bottom-3 left-[1.15rem] top-3 w-px bg-[linear-gradient(180deg,#27b6ee,#8fdcff)] shadow-[0_0_10px_rgba(76,201,232,0.7)]"
            />

            <ol className="space-y-12 lg:space-y-14">
              {chapters.map((text, i) => (
                <li key={i} data-chapter data-on="false" className="group relative grid grid-cols-[2.4rem_1fr] gap-x-6 sm:gap-x-8">
                  <span className="relative z-10 flex h-[2.4rem] w-[2.4rem] items-center justify-center rounded-full border border-ink-900/15 bg-paper-50 font-label text-[0.8rem] font-bold tabular-nums text-ink-900/50 transition-all duration-700 group-data-[on=true]:scale-110 group-data-[on=true]:border-accent-500 group-data-[on=true]:bg-accent-500 group-data-[on=true]:text-void group-data-[on=true]:shadow-[0_0_0_6px_rgba(76,201,232,0.2)]">
                    {pad(i + 1)}
                  </span>
                  <div>
                    <p data-chapter-body className="font-label text-sm font-bold text-accent-600">
                      {CHAPTER_LABELS[i] ?? ""}
                    </p>
                    <p data-chapter-body className="mt-2 max-w-2xl text-pretty text-[1.1rem] leading-[1.75] text-steel-600">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* closing paragraph as a pull-quote card */}
          {closing && (
            <figure
              data-quote
              className="relative mt-16 overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#05182b_0%,#0b4f78_100%)] p-8 text-paper-50 shadow-[0_50px_90px_-44px_rgba(5,24,43,0.9)] sm:p-12 lg:mt-20"
            >
              <svg aria-hidden viewBox="0 0 800 800" className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] text-accent-500">
                {[100, 170, 240, 310].map((r, i) => (
                  <circle key={r} cx="400" cy="400" r={r} fill="none" stroke="currentColor" strokeOpacity={0.28 - i * 0.06} />
                ))}
              </svg>
              <svg aria-hidden viewBox="0 0 48 40" className="relative h-10 w-12 text-accent-500" fill="currentColor">
                <path d="M0 40V22C0 9 7 2 20 0l2 6C14 8 11 13 11 18h9v22H0Zm26 0V22c0-13 7-20 20-22l2 6c-8 2-11 7-11 12h9v22H26Z" />
              </svg>
              <blockquote className="font-display relative mt-6 text-balance text-[clamp(1.35rem,2.2vw,1.95rem)] font-bold leading-[1.35]">
                {closing}
              </blockquote>
              <figcaption className="relative mt-7 flex items-center gap-3 font-label text-sm font-bold text-paper-50/75">
                <span aria-hidden className="h-px w-10 bg-accent-500" />
                JAS Water Solutions Inc.
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
