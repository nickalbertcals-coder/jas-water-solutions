"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/operations", label: "How We Work" },
  { href: "/team", label: "Our Team" },
  { href: "/contact", label: "Contact" },
];

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

/**
 * Floating glass navigation bar. A pill slides between the links to follow the
 * cursor and settles on the current page; a hairline along the bottom of the
 * bar fills as you scroll; the bar firms up once you leave the top. On small
 * screens the menu opens as a full-screen sheet with staggered links.
 */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  /* sliding highlight — pure DOM writes, no re-render */
  useEffect(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;

    const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a[data-nav]"));
    const rest = () => links.find((l) => l.dataset.active === "true") ?? null;
    let placed = false;

    const moveTo = (el: HTMLElement | null, animate = true) => {
      if (!el) {
        pill.style.opacity = "0";
        return;
      }
      pill.style.transition = animate && placed ? "" : "none";
      pill.style.opacity = "1";
      pill.style.width = `${el.offsetWidth}px`;
      pill.style.transform = `translateX(${el.offsetLeft}px)`;
      placed = true;
    };

    moveTo(rest(), false);
    const onEnter = (e: Event) => moveTo(e.currentTarget as HTMLElement);
    const onLeave = () => moveTo(rest());
    links.forEach((l) => {
      l.addEventListener("pointerenter", onEnter);
      l.addEventListener("focus", onEnter);
    });
    nav.addEventListener("pointerleave", onLeave);
    nav.addEventListener("focusout", onLeave);
    const onResize = () => moveTo(rest(), false);
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize);

    return () => {
      links.forEach((l) => {
        l.removeEventListener("pointerenter", onEnter);
        l.removeEventListener("focus", onEnter);
      });
      nav.removeEventListener("pointerleave", onLeave);
      nav.removeEventListener("focusout", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  /* scrolled state + reading progress */
  useEffect(() => {
    const wrap = wrapRef.current;
    const bar = progressRef.current;
    if (!wrap || prefersReducedMotion()) return;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        wrap.dataset.scrolled = self.scroll() > 24 ? "true" : "false";
        if (bar) bar.style.transform = `scaleX(${self.progress})`;
      },
    });
    return () => trigger.kill();
  }, []);

  /* menu sheet: lock page scroll, close on Escape */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      ref={wrapRef}
      data-scrolled="false"
      className="group/header sticky top-0 z-50 h-[4.5rem] bg-[#02131f] transition-colors duration-500 data-[scrolled=true]:bg-transparent"
    >
      <div className="mx-auto max-w-7xl px-3 pt-2 sm:px-6">
        <div className="relative flex h-14 items-center justify-between overflow-hidden rounded-full border border-white/12 bg-[#06223a]/60 pl-5 pr-2 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-500 group-data-[scrolled=true]/header:border-white/20 group-data-[scrolled=true]/header:bg-[#05182b]/95 group-data-[scrolled=true]/header:shadow-[0_24px_50px_-20px_rgba(0,0,0,1)] sm:pl-7">
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)} aria-label="JAS Water Solutions — home">
            <Image src="/images/logo.png" alt="JAS Water Solutions Inc." width={168} height={78} priority className="h-9 w-auto brightness-0 invert sm:h-10" />
          </Link>

          <nav ref={navRef} aria-label="Main" className="relative hidden items-center lg:flex">
            <span
              ref={pillRef}
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-white/12 opacity-0 ring-1 ring-white/15 transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            />
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-nav
                  data-active={active}
                  aria-current={active ? "page" : undefined}
                  className={`relative z-10 rounded-full px-4 py-2.5 font-label text-[0.95rem] font-semibold transition-colors ${
                    active ? "text-paper-50" : "text-paper-50/75 hover:text-paper-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="group hidden items-center gap-2 rounded-full bg-accent-500 py-2.5 pl-6 pr-3.5 font-label text-[0.95rem] font-bold text-void transition-colors hover:bg-paper-50 lg:inline-flex"
            >
              Get in touch
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-void text-accent-500 transition-transform duration-500 group-hover:rotate-45">
                <svg aria-hidden width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition-colors hover:bg-white/20 lg:hidden"
            >
              <span className="relative block h-3.5 w-[18px]">
                <span className={`absolute left-0 top-0 h-0.5 w-[18px] rounded-full bg-paper-50 transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-[18px] rounded-full bg-paper-50 transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 top-3 h-0.5 w-[18px] rounded-full bg-paper-50 transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>

          {/* reading progress, along the foot of the bar */}
          <span
            ref={progressRef}
            aria-hidden
            className="pointer-events-none absolute inset-x-6 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-[linear-gradient(90deg,#4cc9e8,#3ee0b4)] shadow-[0_0_10px_rgba(76,201,232,0.8)]"
          />
        </div>
      </div>

      {/* ── mobile sheet ── */}
      <div
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-0 -z-10 flex flex-col bg-[linear-gradient(180deg,#02131f_0%,#05263f_100%)] px-6 pb-10 pt-28 transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div aria-hidden className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.25),transparent)]" />
        <nav aria-label="Mobile" className="relative flex flex-col">
          {NAV_LINKS.map((link, i) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-baseline gap-4 border-b border-white/10 py-4 transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              >
                <span className="font-label text-sm font-bold tabular-nums text-accent-500">{String(i + 1).padStart(2, "0")}</span>
                <span className={`font-display text-3xl font-bold ${active ? "text-accent-500" : "text-paper-50"}`}>{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <Link
          href="/contact"
          onClick={() => setOpen(false)}
          className={`relative mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 py-4 font-label text-lg font-bold text-void transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          style={{ transitionDelay: open ? "540ms" : "0ms" }}
        >
          Get in touch <span aria-hidden>→</span>
        </Link>
      </div>
    </header>
  );
}
