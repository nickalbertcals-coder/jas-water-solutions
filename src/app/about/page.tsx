import Image from "next/image";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { about, mission, vision } from "@/lib/data";
import { assetPath } from "@/lib/basePath";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about JAS Water Solutions Inc. — our story, vision, mission, and the disciplined, technology-driven approach behind our water utility operations.",
};

const VALUES = [
  {
    title: "Operational Control",
    description:
      "Digitized platforms and real-time monitoring keep every distribution network under close, consistent oversight.",
  },
  {
    title: "Accountability",
    description:
      "Transparent, KPI-based performance management ties every team and process to measurable outcomes.",
  },
  {
    title: "Financial Sustainability",
    description:
      "Disciplined revenue management and Non-Revenue Water reduction protect the long-term health of every utility we manage.",
  },
  {
    title: "Regulatory Compliance",
    description:
      "Deep experience in utility governance ensures operations meet regulatory and quality standards at every step.",
  },
];

export default function AboutPage() {
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
            About Us
          </span>
          <h1 className="font-display text-balance mt-6 text-4xl font-semibold text-paper-50 sm:text-5xl">
            Professionally managed water utilities, built on discipline
          </h1>
        </ScrollReveal>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <ScrollReveal as="div" className="lg:sticky lg:top-24" y={28}>
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-line">
              <Image
                src={assetPath("/images/photos/workers_orange.jpg")}
                alt="JAS Water Solutions field engineers at a water facility"
                fill
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover grayscale-[10%]"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal
            as="div"
            selector=":scope > p"
            stagger={0.12}
            y={16}
            className="space-y-5"
          >
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-steel-600">
                {p}
              </p>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="section-pad border-y border-line bg-paper-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal
            as="div"
            selector=":scope > div"
            stagger={0.12}
            className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2"
          >
            <div className="bg-white p-8">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-signal-600">
                Vision
              </p>
              <h2 className="font-display text-balance mt-3 text-2xl font-semibold text-ink-900">
                Where we&apos;re headed
              </h2>
              <p className="mt-3 text-base leading-relaxed text-steel-600">{vision}</p>
            </div>
            <div className="bg-white p-8">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-signal-600">
                Mission
              </p>
              <h2 className="font-display text-balance mt-3 text-2xl font-semibold text-ink-900">
                How we get there
              </h2>
              <p className="mt-3 text-base leading-relaxed text-steel-600">{mission}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="How We Operate"
              title="What guides every engagement"
              align="center"
            />
          </ScrollReveal>
          <ScrollReveal
            as="div"
            selector=":scope > div"
            stagger={0.08}
            className="mt-12 grid divide-y divide-line border-y border-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
          >
            {VALUES.map((v) => (
              <div key={v.title} className="p-6">
                <h3 className="font-display text-balance text-base font-semibold text-ink-900">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-600">
                  {v.description}
                </p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
