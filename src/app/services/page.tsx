import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/motion/ScrollReveal";
import ServiceIndexNav from "@/components/motion/ServiceIndexNav";
import { services } from "@/lib/data";
import { assetPath } from "@/lib/basePath";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Operations & Maintenance of Level III water systems, bulk water supply, hydraulic modeling, bulk water retail, and technical consultancy from JAS Water Solutions Inc.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line bg-ink-900">
        <ScrollReveal
          as="div"
          selector=":scope > *"
          y={16}
          stagger={0.1}
          className="relative mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20"
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-signal-500">
            <span className="h-2.5 w-[3px] bg-signal-500" />
            Core Services
          </span>
          <h1 className="font-display mt-6 text-4xl font-semibold text-paper-50 sm:text-5xl">
            Innovative, sustainable, cost-effective water management
          </h1>
          <p className="mt-5 text-base leading-relaxed text-paper-50/70 sm:text-lg">
            Integrated engineering, operations, technical consultancy, and
            water supply services for water utilities, government agencies,
            and private sector clients.
          </p>
        </ScrollReveal>
      </section>

      <ServiceIndexNav
        items={services.map((s, i) => ({ slug: s.slug, title: s.title, index: i }))}
      />

      <div className="divide-y divide-line">
        {services.map((service, i) => {
          const reversed = i % 2 === 1;
          return (
            <section
              key={service.slug}
              id={service.slug}
              className="section-pad scroll-mt-24"
            >
              <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div
                  className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
                    reversed ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <ScrollReveal as="div" y={28}>
                    <div className="relative aspect-[4/3] w-full overflow-hidden border border-line">
                      <Image
                        src={assetPath(service.image)}
                        alt={service.title}
                        fill
                        sizes="(min-width: 1024px) 560px, 90vw"
                        className="object-cover grayscale-[10%]"
                      />
                    </div>
                  </ScrollReveal>
                  <ScrollReveal as="div" y={28} delay={0.1}>
                    <span className="font-mono text-sm font-medium text-signal-600">
                      §{String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display mt-2 text-2xl font-semibold text-ink-900 sm:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-steel-600">
                      {service.description}
                    </p>
                    {service.subItems && (
                      <ul className="mt-5 grid gap-x-6 gap-y-2.5 border-t border-line pt-5 sm:grid-cols-2">
                        {service.subItems.map((item) => (
                          <li key={item} className="flex gap-2.5 text-sm text-ink-900/80">
                            <span className="mt-2 h-[3px] w-2 shrink-0 bg-signal-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {service.learnMore && (
                      <Link
                        href={service.learnMore.href}
                        className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-[0.06em] text-ink-900 hover:text-signal-600"
                      >
                        {service.learnMore.label}
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M3 8h10M9 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    )}
                  </ScrollReveal>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <CTASection />
    </>
  );
}
