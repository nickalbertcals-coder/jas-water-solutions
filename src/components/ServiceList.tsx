"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { SERVICE_ICONS, SERVICE_SHORT } from "@/lib/serviceIcons";
import type { Service } from "@/lib/data";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Core services as expanding photo panels. On desktop the five panels share one
 * row; whichever you hover or focus widens to show its title, summary and a
 * button while the rest fold into slim strips with vertical labels. Nothing
 * pops up over the page. Below the desktop breakpoint (touch devices) it is a
 * plain stack of cards, so there is no hover to depend on.
 */
export default function ServiceList({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* ───────── desktop: expanding panels ───────── */}
      <ScrollReveal as="div" selector=":scope > a" y={40} stagger={0.1} className="hidden h-[34rem] gap-3 lg:flex">
        {services.map((s, i) => {
          const on = active === i;
          return (
            <Link
              key={s.slug}
              href={`/services#${s.slug}`}
              data-on={on}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-label={s.title}
              className={`group relative isolate overflow-hidden rounded-[1.75rem] bg-ink-900 shadow-[0_34px_70px_-40px_rgba(10,39,64,0.85)] ring-1 ring-ink-900/10 outline-none transition-[flex-grow,box-shadow] duration-[800ms] ease-[cubic-bezier(0.65,0,0.2,1)] focus-visible:ring-2 focus-visible:ring-accent-500 ${
                on ? "grow-[5] shadow-[0_44px_80px_-36px_rgba(10,114,154,0.7)]" : "grow-[1]"
              } basis-0`}
            >
              <Image
                src={s.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 700px, 100vw"
                className={`object-cover transition-transform duration-[1400ms] ease-out ${on ? "scale-105" : "scale-125"}`}
              />
              <div
                aria-hidden
                className={`absolute inset-0 transition-opacity duration-700 ${on ? "opacity-100" : "opacity-0"} bg-[linear-gradient(180deg,rgba(5,24,43,0.25)_0%,rgba(5,24,43,0.35)_40%,rgba(3,14,26,0.94)_100%)]`}
              />
              <div
                aria-hidden
                className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(5,24,43,0.35)_0%,rgba(5,24,43,0.78)_100%)] transition-opacity duration-700 ${on ? "opacity-0" : "opacity-100 group-hover:opacity-80"}`}
              />

              {/* number + icon, always visible */}
              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                <span className="font-display text-2xl font-extrabold leading-none text-white/90">{pad(i + 1)}</span>
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/30 bg-[#05182b]/90 text-accent-500 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-transform duration-700 ${on ? "scale-100" : "scale-90"}`}>
                  <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {SERVICE_ICONS[s.slug]}
                  </svg>
                </span>
              </div>

              {/* collapsed: vertical label */}
              <span
                aria-hidden
                className={`absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-lg font-bold text-paper-50 transition-opacity duration-300 [writing-mode:vertical-rl] rotate-180 ${on ? "opacity-0" : "opacity-100 delay-300"}`}
              >
                {SERVICE_SHORT[s.slug] ?? s.title}
              </span>

              {/* expanded: copy */}
              <div
                className={`absolute inset-x-0 bottom-0 p-8 text-paper-50 transition-[opacity,transform] duration-500 ${
                  on ? "translate-y-0 opacity-100 delay-300" : "pointer-events-none translate-y-6 opacity-0"
                }`}
              >
                <h3 className="font-display max-w-md text-balance text-[1.75rem] font-bold leading-tight xl:text-[2rem]">{s.title}</h3>
                <p className="mt-3 max-w-md text-pretty text-base leading-relaxed text-paper-50/85">{s.summary}</p>
                <span className="mt-6 inline-flex items-center gap-3 rounded-full bg-accent-500 py-2 pl-5 pr-2 font-label text-sm font-bold text-void transition-colors group-hover:bg-paper-50">
                  Explore this service
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-void text-accent-500 transition-transform duration-500 group-hover:rotate-45">
                    <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12 12 4M5.5 4H12v6.5" />
                    </svg>
                  </span>
                </span>
              </div>
            </Link>
          );
        })}
      </ScrollReveal>

      {/* ───────── tablets and phones: stacked cards ───────── */}
      <ScrollReveal as="div" selector=":scope > a" y={34} stagger={0.1} className="grid gap-4 sm:grid-cols-2 lg:hidden">
        {services.map((s, i) => (
          <Link
            key={s.slug}
            href={`/services#${s.slug}`}
            className={`group relative isolate flex min-h-[20rem] overflow-hidden rounded-[1.75rem] bg-ink-900 shadow-[0_30px_60px_-34px_rgba(10,39,64,0.7)] ring-1 ring-ink-900/10 ${i === services.length - 1 ? "sm:col-span-2" : ""}`}
          >
            <Image src={s.image} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,24,43,0.2)_0%,rgba(5,24,43,0.45)_40%,rgba(3,14,26,0.94)_100%)]" />
            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
              <span className="font-display text-2xl font-extrabold leading-none text-white/90">{pad(i + 1)}</span>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/30 bg-[#05182b]/90 text-accent-500 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {SERVICE_ICONS[s.slug]}
                </svg>
              </span>
            </div>
            <div className="relative mt-auto w-full p-6 pt-24 text-paper-50">
              <h3 className="font-display text-balance text-2xl font-bold leading-tight">{s.title}</h3>
              <p className="mt-2 max-w-lg text-pretty text-base leading-relaxed text-paper-50/85">{s.summary}</p>
            </div>
          </Link>
        ))}
      </ScrollReveal>
    </>
  );
}
