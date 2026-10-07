"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SERVICE_ICONS, SERVICE_SHORT } from "@/lib/serviceIcons";
import type { Service } from "@/lib/data";

const pad = (n: number) => String(n).padStart(2, "0");
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** Stick position: below the 5.5rem header, each card a touch lower than the one under it so an edge of every card stays visible. */
const STICK_BASE = 6.75; // rem
const STICK_STEP = 0.7; // rem

/**
 * "The descent": each service is a chapter card whose surface gets deeper as
 * you go — pale surface water for the first service, deep navy for the last.
 * On desktop the cards stack: each one sticks as you scroll and the next slides
 * up over it while it recedes (scales back and dims). Photos drift inside their
 * frames, and every chapter's copy and photo reveal as it arrives. A slim
 * depth gauge on the right edge shows where you are and jumps between chapters.
 *
 * It is plain CSS sticky, so there is no pinned scroll to fight: on phones and
 * tablets, and for reduced motion, the cards simply stack in the normal flow.
 */
const THEMES = [
  { surface: "bg-white", dark: false },
  { surface: "bg-[#dcefF8]", dark: false },
  { surface: "bg-[linear-gradient(135deg,#1170a3_0%,#0c5683_100%)]", dark: true },
  { surface: "bg-[linear-gradient(135deg,#0b4a76_0%,#083656_100%)]", dark: true },
  { surface: "bg-[linear-gradient(135deg,#071f36_0%,#04121f_100%)]", dark: true },
];

function Words({ text }: { text: string }) {
  return (
    <span aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <span data-w className="inline-block will-change-transform">
            {w}
            {" "}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function ServicesStack({ services }: { services: Service[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const goRef = useRef<(i: number) => void>(() => {});
  const [active, setActive] = useState(0);
  const [showNav, setShowNav] = useState(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = gsap.utils.toArray<HTMLElement>("[data-card]", root);
    const scalers = gsap.utils.toArray<HTMLElement>("[data-scale]", root);
    const veils = gsap.utils.toArray<HTMLElement>("[data-veil]", root);
    const imgs = gsap.utils.toArray<HTMLElement>("[data-img]", root);
    const n = cards.length;

    /* the site's global smooth-scroll fights GSAP's snap tween (landings end up hundreds of px off), so switch it off while this page is mounted */
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    /* Scroll position at which chapter i is fully settled. Computed from layout, not from the card itself: a card that is already stuck reports its stuck position, which would make scrollIntoView a no-op for earlier chapters. */
    const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;
    const chapterY = (i: number) => {
      const rootTop = root.getBoundingClientRect().top + window.scrollY;
      const h = cards[0].offsetHeight;
      const gap = parseFloat(getComputedStyle(cards[0]).marginBottom) || 0;
      const top = parseFloat(getComputedStyle(cards[i]).top) || 0;
      return Math.round(rootTop + i * (h + gap) - top);
    };
    const scrollToChapter = (i: number, instant = false) => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const behavior: ScrollBehavior = instant || reduce ? "instant" : "smooth";
      if (isDesktop()) window.scrollTo({ top: chapterY(i), behavior });
      else cards[i].scrollIntoView({ behavior, block: "start" });
    };
    goRef.current = scrollToChapter;

    /* #service links on this page (header dropdown, hero index, footer): route them through scrollToChapter */
    const onLinkClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.getAttribute("href")) return;
      const url = new URL(a.href, window.location.href);
      const strip = (x: string) => x.replace(/\/$/, "");
      if (strip(url.pathname) !== strip(window.location.pathname)) return;
      const idx = services.findIndex((sv) => `#${sv.slug}` === url.hash);
      if (idx < 0) return;
      e.preventDefault();
      e.stopPropagation();
      window.history.pushState(null, "", url.hash);
      scrollToChapter(idx);
    };
    document.addEventListener("click", onLinkClick, true);

    const mm = gsap.matchMedia();
    mm.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 1024px)" }, (ctx) => {
      const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
      if (!motion) return;

      /* ── chapter reveals, played once as each card scrolls into view ── */
      const timelines = cards.map((card) => {
        const rule = card.querySelector<HTMLElement>("[data-rule]");
        const words = card.querySelectorAll<HTMLElement>("[data-w]");
        const fades = card.querySelectorAll<HTMLElement>("[data-fade]");
        const photo = card.querySelector<HTMLElement>("[data-photo]");
        const numeral = card.querySelector<HTMLElement>("[data-numeral]");
        const CLIP_HIDDEN = "inset(14% 14% 14% 14% round 24px)";
        const CLIP_SHOWN = "inset(0% 0% 0% 0% round 24px)";
        gsap.set(words, { yPercent: 115 });
        gsap.set(fades, { autoAlpha: 0, y: 26 });
        if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
        if (photo) gsap.set(photo, { clipPath: CLIP_HIDDEN });
        if (numeral) gsap.set(numeral, { autoAlpha: 0, y: 60 });
        const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
        if (rule) tl.to(rule, { scaleX: 1, duration: 1.1 }, 0);
        tl.to(words, { yPercent: 0, duration: 0.95, stagger: 0.06 }, 0.1);
        tl.to(fades, { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.08 }, 0.4);
        if (photo) tl.to(photo, { clipPath: CLIP_SHOWN, duration: 1.25, ease: "power3.inOut" }, 0.15);
        if (numeral) tl.to(numeral, { autoAlpha: 1, y: 0, duration: 1.2 }, 0.25);
        return tl;
      });

      const played = new Set<number>();
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const i = cards.indexOf(e.target as HTMLElement);
            if (e.isIntersecting && i >= 0 && !played.has(i)) {
              played.add(i);
              timelines[i].play();
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -12% 0px" }
      );
      cards.forEach((c) => io.observe(c));

      /* ── desktop only: stacking, recede and photo drift, driven by scroll ── */
      let st: ScrollTrigger | undefined;
      let snapST: ScrollTrigger | undefined;
      if (desktop) {
        let tops: number[] = [];
        const measure = () => {
          tops = cards.map((c) => parseFloat(getComputedStyle(c).top));
        };
        const update = () => {
          if (!tops.length) measure();
          const vh = window.innerHeight;
          let current = 0;
          cards.forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            const pIn = clamp((vh - rect.top) / Math.max(1, vh - tops[i]));
            let pOut = 0;
            if (i < n - 1) {
              const nextTop = cards[i + 1].getBoundingClientRect().top;
              pOut = clamp((vh - nextTop) / Math.max(1, vh - tops[i + 1]));
            }
            scalers[i].style.transform = `scale(${1 - pOut * 0.055})`;
            veils[i].style.opacity = String(pOut * 0.55);
            const t = (pIn + pOut) / 2;
            imgs[i].style.transform = `translate3d(0, ${((0.5 - t) * 2 * 34).toFixed(1)}px, 0)`;
            if (rect.top <= vh * 0.6 && pOut < 0.5) current = i;
          });
          setActive((prev) => (prev === current ? prev : current));
        };
        st = ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onUpdate: update,
          onRefresh: () => {
            measure();
            update();
          },
        });
        measure();
        update();

        /* ── snap: glide to the nearest chapter so a card always rests fully on screen ── */
        const points = () => cards.map((_, i) => chapterY(i));
        snapST = ScrollTrigger.create({
          start: () => points()[0],
          end: () => points()[n - 1],
          invalidateOnRefresh: true,
          snap: {
            snapTo: (progress: number, self?: ScrollTrigger) => {
              const pts = points();
              const first = pts[0];
              const span = pts[n - 1] - first;
              if (span <= 0) return progress;
              const px = first + progress * span;
              const dir = self?.direction ?? 1;
              let i = 0;
              while (i < n - 2 && px >= pts[i + 1]) i++;
              const seg = pts[i + 1] - pts[i];
              const f = (px - pts[i]) / seg;
              // a nudge of about a fifth of a card advances to the next one, in either direction
              const target = dir > 0 ? (f > 0.2 ? pts[i + 1] : pts[i]) : f < 0.8 ? pts[i] : pts[i + 1];
              return (target - first) / span;
            },
            inertia: false,
            duration: { min: 0.45, max: 0.95 },
            delay: 0.09,
            ease: "power2.inOut",
          },
        });
      }

      return () => {
        io.disconnect();
        st?.kill();
        snapST?.kill();
        timelines.forEach((t) => t.kill());
        cards.forEach((c) => {
          gsap.set(c.querySelectorAll("[data-w],[data-fade],[data-rule],[data-photo],[data-numeral]"), { clearProps: "all" });
        });
        scalers.forEach((s) => (s.style.transform = ""));
        veils.forEach((v) => (v.style.opacity = ""));
        imgs.forEach((im) => (im.style.transform = ""));
      };
    });

    /* depth gauge visibility */
    const navIo = new IntersectionObserver(([e]) => setShowNav(e.isIntersecting), { threshold: 0.05 });
    navIo.observe(root);

    /* A #service link on first load: the browser jumps before images and fonts have settled, so land on the right card ourselves. */
    const idx = services.findIndex((sv) => `#${sv.slug}` === window.location.hash);
    const land = () => {
      if (idx >= 0) scrollToChapter(idx, true);
    };
    const timers = idx >= 0 ? [setTimeout(land, 120), setTimeout(land, 700)] : [];
    window.addEventListener("load", land);

    document.fonts?.ready.then(() => {
      ScrollTrigger.refresh();
      land();
    });
    return () => {
      mm.revert();
      navIo.disconnect();
      timers.forEach(clearTimeout);
      window.removeEventListener("load", land);
      document.removeEventListener("click", onLinkClick, true);
      html.style.scrollBehavior = prevBehavior;
    };
  }, [services]);

  const go = (i: number) => goRef.current(i);

  return (
    <section className="relative overflow-x-clip bg-paper-50 pb-16 pt-12 sm:pt-16 lg:pb-28 lg:pt-20">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.2),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.14),transparent)]" />

      {/* depth gauge */}
      <nav
        aria-label="Service chapters"
        className={`fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3.5 transition-opacity duration-500 xl:flex ${showNav ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        {services.map((s, i) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to ${SERVICE_SHORT[s.slug] ?? s.title}`}
            aria-current={active === i ? "true" : undefined}
            className="group relative flex h-5 w-5 items-center justify-center"
          >
            <span
              className={`block rounded-full transition-all duration-500 ${
                active === i ? "h-5 w-2 bg-accent-600 shadow-[0_0_12px_rgba(10,114,154,0.6)]" : "h-2 w-2 bg-ink-900/25 group-hover:bg-ink-900/60"
              }`}
            />
            <span className="pointer-events-none absolute right-8 whitespace-nowrap rounded-full bg-ink-900 px-3 py-1.5 font-label text-xs font-bold text-paper-50 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
              {pad(i + 1)} · {SERVICE_SHORT[s.slug] ?? s.title}
            </span>
          </button>
        ))}
      </nav>

      <div ref={rootRef} className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="space-y-6 lg:space-y-0">
          {services.map((s, i) => {
            const theme = THEMES[i % THEMES.length];
            const dark = theme.dark;
            const stick = STICK_BASE + i * STICK_STEP;
            const cardH = STICK_BASE + (services.length - 1) * STICK_STEP + 1.25;
            const action = s.learnMore ?? { href: "/contact", label: "Request a consultation" };
            return (
              <div
                key={s.slug}
                id={s.slug}
                data-card
                className="lg:sticky lg:mb-[16vh] lg:last:mb-0 lg:h-[calc(100svh-var(--stack-h))] lg:min-h-[33rem]"
                style={
                  {
                    top: `${stick}rem`,
                    scrollMarginTop: `${stick}rem`,
                    "--stack-h": `${cardH}rem`,
                  } as React.CSSProperties
                }
              >
                <div
                  data-scale
                  className={`relative flex h-full origin-top flex-col overflow-hidden rounded-[2rem] shadow-[0_50px_90px_-44px_rgba(5,24,43,0.7)] ring-1 lg:block lg:rounded-[2.25rem] ${theme.surface} ${
                    dark ? "ring-white/10" : "ring-ink-900/10"
                  }`}
                >
                  {/* photo */}
                  <div
                    data-photo
                    className="relative m-3 aspect-[4/3] shrink-0 overflow-hidden rounded-3xl lg:absolute lg:inset-y-4 lg:right-4 lg:m-0 lg:aspect-auto lg:w-[44%]"
                  >
                    <div data-img className="absolute inset-0 will-change-transform lg:-inset-y-10">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        sizes="(min-width: 1024px) 560px, 92vw"
                        className="scale-[1.08] object-cover saturate-[0.9]"
                      />
                    </div>
                    <div aria-hidden className="absolute inset-0 bg-[#0a3d63]/15 mix-blend-multiply" />
                    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,24,43,0.05)_30%,rgba(5,24,43,0.7)_100%)]" />
                    <span className="absolute left-4 top-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-accent-600 shadow-[0_14px_30px_-10px_rgba(0,0,0,0.55)]">
                      <svg aria-hidden viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        {SERVICE_ICONS[s.slug]}
                      </svg>
                    </span>
                    <span className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-[#05182b]/60 px-4 py-2 font-label text-sm font-bold text-paper-50 backdrop-blur-md">
                      {SERVICE_SHORT[s.slug] ?? s.title}
                    </span>
                  </div>

                  {/* copy */}
                  <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pb-8 pt-3 lg:h-full lg:w-[54%] lg:px-12 lg:py-10">
                    <div className="pt-5 lg:pt-0">
                    <div className="mb-5 flex items-center gap-4 lg:mb-6">
                      <span className="font-label text-sm font-bold tabular-nums">
                        {/* the big outline numeral carries the number on tall screens; on short ones the row does */}
                        <span className="lg:[@media(min-height:860px)]:hidden">
                          <span className={dark ? "text-accent-500" : "text-accent-600"}>{pad(i + 1)}</span>
                          <span className={dark ? "text-paper-50/45" : "text-ink-900/35"}> / {pad(services.length)}</span>
                        </span>
                        <span className={`hidden lg:[@media(min-height:860px)]:inline ${dark ? "text-accent-500" : "text-accent-600"}`}>Service</span>
                      </span>
                      <span data-rule className={`h-px flex-1 ${dark ? "bg-white/20" : "bg-ink-900/15"}`} />
                    </div>

                      {/* outline numeral sitting directly above the title (only when the screen is tall enough) */}
                      <span
                        aria-hidden
                        data-numeral
                        className="mb-4 hidden select-none font-display font-extrabold leading-[0.85] lg:[@media(min-height:860px)]:block"
                        style={{
                          fontSize: "clamp(5rem, 12vh, 9rem)",
                          color: "transparent",
                          WebkitTextStroke: `1.6px ${dark ? "rgba(255,255,255,0.36)" : "rgba(10,114,154,0.42)"}`,
                        }}
                      >
                        {pad(i + 1)}
                      </span>
                      <h2
                        className={`font-statement text-balance text-[clamp(1.8rem,min(3vw,5.1vh),3.1rem)] ${dark ? "text-paper-50" : "text-ink-900"}`}
                      >
                        <Words text={s.title} />
                      </h2>
                      <p data-fade className={`mt-4 max-w-lg text-pretty text-[1.02rem] leading-relaxed lg:text-[1.15rem] ${dark ? "text-paper-50/80" : "text-steel-600"}`}>
                        {s.description}
                      </p>

                      {s.subItems && (
                        <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:gap-2.5">
                          {s.subItems.map((item) => (
                            <li
                              key={item}
                              data-fade
                              className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-2.5 text-[0.88rem] font-semibold leading-snug ${
                                dark ? "border-white/15 bg-white/[0.08] text-paper-50" : "border-line bg-paper-50 text-ink-900"
                              }`}
                            >
                              <span aria-hidden className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full ${dark ? "bg-accent-500/25 text-accent-500" : "bg-accent-tint text-accent-600"}`} style={{ width: 18, height: 18 }}>
                                <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m3.5 8.5 3 3 6-6.5" />
                                </svg>
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      <Link
                        data-fade
                        href={action.href}
                        className={`group mt-6 inline-flex w-fit items-center gap-3 rounded-full py-2 pl-6 pr-2 font-label text-[0.95rem] font-bold transition-colors ${
                          dark ? "bg-accent-500 text-void hover:bg-paper-50" : "bg-ink-900 text-paper-50 hover:bg-accent-600"
                        }`}
                      >
                        {action.label}
                        <span className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-45 ${dark ? "bg-void text-accent-500" : "bg-accent-500 text-void"}`}>
                          <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12 12 4M5.5 4H12v6.5" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* dim veil, raised as the next card covers this one */}
                  <div data-veil aria-hidden className="pointer-events-none absolute inset-0 bg-[#02101b] opacity-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
