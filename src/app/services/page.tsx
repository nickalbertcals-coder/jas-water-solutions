import Link from "next/link";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import Eyebrow from "@/components/Eyebrow";
import ServicesHero from "@/components/ServicesHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import ServicesStack from "@/components/motion/ServicesStack";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Operations & Maintenance of Level III water systems, bulk water supply, hydraulic modeling, bulk water retail, and technical consultancy from JAS Water Solutions Inc.",
};

const AUDIENCE = ["Water Districts", "Local Government Units (LGUs)", "Industrial clients", "Communities"];

export default function ServicesPage() {
  return (
    <>
      <ServicesHero services={services} />
      <ServicesStack services={services} />

      {/* ───────── who we serve ───────── */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#05182b_0%,#082a45_100%)] py-20 text-paper-50 sm:py-28">
        <svg aria-hidden viewBox="0 0 800 800" className="pointer-events-none absolute -right-72 -top-72 h-[50rem] w-[50rem] text-accent-500">
          {[120, 200, 280, 360, 440].map((r, i) => (
            <circle key={r} cx="400" cy="400" r={r} fill="none" stroke="currentColor" strokeOpacity={0.18 - i * 0.03} />
          ))}
        </svg>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <ScrollReveal as="div" selector=":scope > *" y={26} stagger={0.1} className="lg:col-span-4">
            <Eyebrow tone="light">Who we serve</Eyebrow>
            <p className="mt-6 max-w-sm text-pretty text-lg leading-relaxed text-paper-50/80">
              We work with organizations seeking Level III water distribution O&amp;M, bulk water supply, and digital water solutions.
            </p>
            <Link
              href="/operations"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/30 py-2 pl-6 pr-2 font-label text-base font-semibold transition-colors hover:border-paper-50 hover:bg-white/10"
            >
              See how we work
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-void transition-transform duration-500 group-hover:rotate-45">
                <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12 12 4M5.5 4H12v6.5" />
                </svg>
              </span>
            </Link>
          </ScrollReveal>

          <ScrollReveal as="ol" selector=":scope > li" y={30} stagger={0.12} className="divide-y divide-white/15 border-y border-white/15 lg:col-span-8">
            {AUDIENCE.map((a, i) => (
              <li key={a} className="group flex items-baseline gap-6 py-6 sm:gap-10 sm:py-8">
                <span className="font-label text-sm font-bold tabular-nums text-accent-500">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-statement flex-1 text-balance text-[clamp(1.7rem,3.6vw,3.1rem)] transition-all duration-500 group-hover:translate-x-3 group-hover:text-accent-500">
                  {a}
                </span>
                <svg aria-hidden viewBox="0 0 16 16" className="h-6 w-6 shrink-0 translate-y-1 text-paper-50/40 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:text-accent-500" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12 12 4M5.5 4H12v6.5" />
                </svg>
              </li>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
