"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { services } from "@/lib/data";
import { SERVICE_ICONS } from "@/lib/serviceIcons";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services", mega: true },
  { href: "/operations", label: "How We Work" },
  { href: "/team", label: "Our Team" },
];

const SHORT: Record<string, string> = {
  "om-level-iii": "Operations & Maintenance",
  "bulk-water-supply": "Bulk Water Supply",
  "hydraulic-modeling": "Hydraulic Modeling",
  "bulk-water-retail": "Bulk Water Retail",
  "technical-consultancy": "Technical Consultancy",
};

const isMouse = (e: React.PointerEvent) => e.pointerType === "mouse";
const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const barRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  /* hairline + shadow once the page leaves the top */
  useEffect(() => {
    const bar = barRef.current;
    if (!bar || prefersReducedMotion()) return;
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        bar.dataset.scrolled = self.scroll() > 8 ? "true" : "false";
      },
    });
    return () => trigger.kill();
  }, []);

  /* mobile sheet: lock page scroll; Escape closes sheet and dropdown */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMega(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMega(true);
  };
  const closeMega = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(false), 140);
  };

  return (
    <>
      {/* ── main bar ── */}
      <header
        ref={barRef}
        data-scrolled="false"
        className="sticky top-0 z-50 h-20 border-b border-white/10 bg-[#05182b] transition-shadow duration-300 data-[scrolled=true]:shadow-[0_14px_34px_-18px_rgba(0,0,0,0.8)]"
        onPointerLeave={(e) => isMouse(e) && closeMega()}
      >
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center" onClick={() => { setOpen(false); setMega(false); }} aria-label="JAS Water Solutions — home">
            <Image src="/images/logo.png" alt="JAS Water Solutions Inc." width={168} height={78} priority className="h-[3.9rem] w-auto brightness-0 invert" />
          </Link>

          <div className="flex h-full items-center gap-2 lg:gap-6">
          <nav aria-label="Main" className="hidden h-full items-stretch gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              const underline =
                "after:absolute after:inset-x-4 after:-bottom-px after:h-[3px] after:origin-center after:rounded-t-full after:bg-accent-500 after:transition-transform after:duration-300";
              return (
                <div key={link.href} className="relative flex" onPointerEnter={(e) => isMouse(e) && (link.mega ? openMega() : setMega(false))}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMega(false)}
                    className={`relative flex items-center px-4 font-label text-[1.05rem] font-semibold transition-colors ${underline} ${
                      active ? "text-paper-50 after:scale-x-100" : "text-paper-50/75 after:scale-x-0 hover:text-paper-50 hover:after:scale-x-100"
                    } ${link.mega && mega ? "text-paper-50 after:scale-x-100" : ""}`}
                  >
                    {link.label}
                  </Link>
                  {link.mega && (
                    <button
                      type="button"
                      aria-label="Show services menu"
                      aria-expanded={mega}
                      aria-controls="services-menu"
                      onClick={() => setMega((v) => !v)}
                      className="-ml-3 flex w-7 items-center justify-center text-paper-50/75 transition-colors hover:text-paper-50"
                    >
                      <svg aria-hidden viewBox="0 0 16 16" className={`h-3.5 w-3.5 transition-transform duration-300 ${mega ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3.5 6 4.5 4.5L12.5 6" />
                      </svg>
                    </button>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              aria-current={pathname.startsWith("/contact") ? "page" : undefined}
              className="hidden items-center gap-2 rounded-full bg-accent-500 px-7 py-3 font-label text-[1.05rem] font-bold text-void transition-colors hover:bg-paper-50 lg:inline-flex"
            >
              Contact us
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10 lg:hidden"
            >
              <span className="relative block h-3.5 w-[18px]">
                <span className={`absolute left-0 top-0 h-0.5 w-[18px] rounded-full bg-paper-50 transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-[18px] rounded-full bg-paper-50 transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 top-3 h-0.5 w-[18px] rounded-full bg-paper-50 transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
          </div>
        </div>

        {/* ── services dropdown ── */}
        <div
          id="services-menu"
          onPointerEnter={(e) => isMouse(e) && openMega()}
          className={`absolute inset-x-0 top-full hidden origin-top transition-[opacity,transform,visibility] duration-300 lg:block ${
            mega ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
          }`}
        >
          <div className="mx-auto max-w-7xl px-8">
            <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] overflow-hidden rounded-b-3xl border border-t-0 border-line bg-paper-50 shadow-[0_44px_80px_-30px_rgba(0,0,0,0.65)]">
              <ul className="grid grid-cols-2 gap-1 p-5">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services#${s.slug}`}
                      tabIndex={mega ? 0 : -1}
                      onClick={() => setMega(false)}
                      className="group flex gap-4 rounded-2xl p-4 transition-colors hover:bg-white focus-visible:bg-white"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#05182b] text-accent-500 transition-transform duration-300 group-hover:scale-105">
                        <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          {SERVICE_ICONS[s.slug]}
                        </svg>
                      </span>
                      <span>
                        <span className="block font-label text-[0.95rem] font-bold text-ink-900 group-hover:text-accent-600">{SHORT[s.slug] ?? s.title}</span>
                        <span className="mt-0.5 line-clamp-2 block text-sm leading-snug text-steel-600">{s.summary}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col justify-between bg-[linear-gradient(135deg,#05182b,#0b4f78)] p-7 text-paper-50">
                <div>
                  <p className="font-display text-xl font-bold leading-snug">Everything between the reservoir and the customer</p>
                  <p className="mt-2 text-sm leading-relaxed text-paper-50/80">Operations, supply, engineering and digital water solutions for districts, LGUs and industry.</p>
                </div>
                <div className="mt-6 flex flex-col gap-2.5">
                  <Link href="/services" tabIndex={mega ? 0 : -1} onClick={() => setMega(false)} className="inline-flex items-center justify-center rounded-full bg-accent-500 px-5 py-2.5 font-label text-sm font-bold text-void transition-colors hover:bg-paper-50">
                    View all services
                  </Link>
                  <Link href="/operations" tabIndex={mega ? 0 : -1} onClick={() => setMega(false)} className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2.5 font-label text-sm font-semibold transition-colors hover:bg-white/10">
                    See how we work
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── mobile sheet ── */}
        <div
          aria-hidden={!open}
          inert={!open}
          className={`fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-[linear-gradient(180deg,#02131f_0%,#05263f_100%)] px-6 pb-10 pt-28 transition-[opacity,visibility] duration-500 lg:hidden ${
            open ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV_LINKS.map((link, i) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-baseline gap-4 border-b border-white/10 py-4 transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                  style={{ transitionDelay: open ? `${100 + i * 55}ms` : "0ms" }}
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
            className={`mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 py-4 font-label text-lg font-bold text-void transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: open ? "480ms" : "0ms" }}
          >
            Contact us <span aria-hidden>→</span>
          </Link>
        </div>
      </header>
    </>
  );
}
