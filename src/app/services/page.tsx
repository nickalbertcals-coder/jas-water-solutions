import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import Eyebrow from "@/components/Eyebrow";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import ServiceIndexNav from "@/components/motion/ServiceIndexNav";
import { services } from "@/lib/data";
import { SERVICE_ICONS as ICONS } from "@/lib/serviceIcons";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Operations & Maintenance of Level III water systems, bulk water supply, hydraulic modeling, bulk water retail, and technical consultancy from JAS Water Solutions Inc.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        water
        eyebrow="Core services"
        title="Innovative, sustainable, cost-effective water management"
        description="Integrated engineering, operations, technical consultancy, and water supply services for water utilities, government agencies, and private sector clients."
      />

      <ServiceIndexNav items={services.map((s, i) => ({ slug: s.slug, title: s.title, index: i }))} />

      <div>
        {services.map((service, i) => {
          const reversed = i % 2 === 1;
          const dark = i % 2 === 1;
          return (
            <section
              key={service.slug}
              id={service.slug}
              className={`section-pad relative scroll-mt-32 overflow-hidden ${
                dark ? "bg-[linear-gradient(180deg,#05182b_0%,#082a45_100%)] text-paper-50" : "bg-paper-50"
              }`}
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute h-[30rem] w-[30rem] rounded-full ${
                  reversed ? "-left-40 -top-24" : "-right-40 -top-24"
                } ${
                  dark
                    ? "bg-[radial-gradient(closest-side,rgba(76,201,232,0.16),transparent)]"
                    : "bg-[radial-gradient(closest-side,rgba(76,201,232,0.18),transparent)]"
                }`}
              />
              <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
                <div className={`grid items-center gap-12 lg:grid-cols-12 lg:gap-16 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <ScrollReveal as="div" y={34} className="lg:col-span-6">
                    <div className="relative mx-auto max-w-xl pb-8 lg:max-w-none">
                      <div
                        className={`relative aspect-[5/4] overflow-hidden rounded-[2rem] ring-1 ${
                          dark
                            ? "shadow-[0_50px_90px_-40px_rgba(0,0,0,0.9)] ring-white/15"
                            : "shadow-[0_44px_80px_-44px_rgba(10,39,64,0.75)] ring-ink-900/10"
                        }`}
                      >
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(min-width: 1024px) 620px, 90vw"
                          className="object-cover"
                        />
                        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(5,24,43,0.5)_100%)]" />
                      </div>
                      <span className="font-display absolute -top-5 left-5 flex h-16 min-w-16 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4cc9e8,#3ee0b4)] px-4 text-2xl font-extrabold text-void shadow-[0_18px_36px_-14px_rgba(76,201,232,0.8)] sm:left-8">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`float-y absolute -bottom-0 right-4 flex h-20 w-20 items-center justify-center rounded-3xl backdrop-blur-xl sm:right-8 ${
                          dark
                            ? "border border-white/20 bg-[#06223a]/80 text-accent-500"
                            : "border border-ink-900/5 bg-white text-accent-600 shadow-[0_24px_46px_-18px_rgba(10,39,64,0.45)]"
                        }`}
                      >
                        <svg aria-hidden viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          {ICONS[service.slug]}
                        </svg>
                      </span>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal as="div" selector=":scope > *" y={24} stagger={0.1} className="lg:col-span-6">
                    <h2 className={`font-statement text-balance text-[clamp(1.9rem,3.2vw,2.9rem)] ${dark ? "text-paper-50" : "text-ink-900"}`}>
                      {service.title}
                    </h2>
                    <p className={`mt-5 text-pretty text-lg leading-relaxed ${dark ? "text-paper-50/80" : "text-steel-600"}`}>
                      {service.description}
                    </p>
                    {service.subItems && (
                      <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                        {service.subItems.map((item) => (
                          <li
                            key={item}
                            className={`flex items-start gap-3 rounded-2xl border p-4 text-[0.95rem] font-semibold leading-snug ${
                              dark
                                ? "border-white/12 bg-white/[0.06] text-paper-50"
                                : "border-line bg-white text-ink-900 shadow-[0_14px_30px_-24px_rgba(10,39,64,0.5)]"
                            }`}
                          >
                            <span
                              aria-hidden
                              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${dark ? "bg-live-500/20 text-live-500" : "bg-accent-tint text-accent-600"}`}
                            >
                              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m3.5 8.5 3 3 6-6.5" />
                              </svg>
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {service.learnMore && (
                      <Link
                        href={service.learnMore.href}
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink-900 px-7 py-3.5 font-label text-base font-semibold text-paper-50 transition-colors hover:bg-accent-600"
                      >
                        {service.learnMore.label} <span aria-hidden>→</span>
                      </Link>
                    )}
                  </ScrollReveal>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="section-pad bg-paper-100">
        <ScrollReveal as="div" selector=":scope > *" y={24} stagger={0.1} className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-8">
          <Eyebrow>See it in action</Eyebrow>
          <h2 className="font-statement mt-5 text-balance text-[clamp(1.9rem,3.4vw,3rem)] text-ink-900">
            Follow one cubic meter from the plant to the customer
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-steel-600">
            See how our departments work together at every stop along the way.
          </p>
          <Link
            href="/operations"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink-900 px-8 py-3.5 font-label text-base font-semibold text-paper-50 transition-colors hover:bg-accent-600"
          >
            How we work <span aria-hidden>→</span>
          </Link>
        </ScrollReveal>
      </section>

      <CTASection />
    </>
  );
}
