import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import SplitTitle from "@/components/motion/SplitTitle";
import ScrollReveal from "@/components/motion/ScrollReveal";
import WaterBackground from "@/components/WaterBackground";
import WaveEdge from "@/components/WaveEdge";
import { SERVICE_ICONS, SERVICE_SHORT } from "@/lib/serviceIcons";
import type { Service } from "@/lib/data";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Services hero: the statement on the left and, on the right, a live index of
 * all five services — so the first screen already tells a visitor everything
 * we do, and each row jumps straight to its chapter below.
 */
export default function ServicesHero({ services }: { services: Service[] }) {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#02131f_0%,#06304d_55%,#0a5a6c_100%)]">
      <WaterBackground />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,19,31,0.78)_0%,rgba(2,19,31,0.4)_48%,transparent_80%)]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-12 px-5 pb-28 pt-16 sm:px-8 sm:pb-36 sm:pt-24 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-7">
          <Eyebrow tone="light">Core services</Eyebrow>
          <h1 className="font-statement mt-6 max-w-3xl text-balance text-[clamp(2.2rem,4.2vw,4rem)] text-paper-50">
            <SplitTitle text="Innovative, sustainable, cost-effective water management" />
          </h1>
          <ScrollReveal as="div" selector=":scope > *" y={22} stagger={0.12} delay={0.5} className="max-w-xl">
            <p className="mt-7 text-pretty text-lg leading-relaxed text-paper-50/80 sm:text-xl">
              Integrated engineering, operations, technical consultancy, and water supply services for water utilities,
              government agencies, and private sector clients.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-accent-500 px-8 py-3.5 text-center font-label text-base font-bold text-void transition-colors hover:bg-paper-50"
              >
                Request a consultation
              </Link>
              <Link
                href="/operations"
                className="rounded-full border border-white/30 px-8 py-3.5 text-center font-label text-base font-semibold text-paper-50 transition-colors hover:border-paper-50 hover:bg-white/10"
              >
                See how we work
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal as="div" y={40} delay={0.45} className="min-w-0 lg:col-span-5">
          <nav
            aria-label="Services index"
            className="rounded-[2rem] border border-white/15 bg-[#05182b]/55 p-3 shadow-[0_50px_90px_-40px_rgba(0,0,0,0.85)] backdrop-blur-xl"
          >
            <p className="flex items-center justify-between px-5 pb-3 pt-4 font-label text-sm font-bold text-paper-50/70">
              <span>Five services, one operation</span>
              <span className="tabular-nums text-accent-500">05</span>
            </p>
            <ul className="space-y-1">
              {services.map((s, i) => (
                <li key={s.slug}>
                  <a
                    href={`#${s.slug}`}
                    className="group flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-colors duration-300 hover:bg-white/10 focus-visible:bg-white/10"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-accent-600 shadow-[0_10px_22px_-10px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
                      <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        {SERVICE_ICONS[s.slug]}
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-label text-xs font-bold tabular-nums text-accent-500">{pad(i + 1)}</span>
                      <span className="block truncate font-display text-[1.05rem] font-bold text-paper-50 transition-transform duration-500 group-hover:translate-x-1">
                        {SERVICE_SHORT[s.slug] ?? s.title}
                      </span>
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 text-paper-50 transition-all duration-500 group-hover:rotate-90 group-hover:border-accent-500 group-hover:bg-accent-500 group-hover:text-void">
                      <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3v10M3.5 8.5 8 13l4.5-4.5" />
                      </svg>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </ScrollReveal>
      </div>

      <WaveEdge />
    </section>
  );
}
