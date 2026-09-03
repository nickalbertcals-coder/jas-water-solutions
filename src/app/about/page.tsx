import Image from "next/image";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
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
      <section className="brand-gradient relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(143,220,245,0.25), transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-300">
            About Us
          </span>
          <h1 className="font-heading mt-6 text-4xl font-bold text-white sm:text-5xl">
            Professionally managed water utilities, built on discipline
          </h1>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <Image
                src={assetPath("/images/photos/workers_orange.jpg")}
                alt="JAS Water Solutions field engineers at a water facility"
                fill
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-slate-600">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-tint-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-700">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
              <h2 className="font-heading mt-5 text-2xl font-bold text-navy-950">
                Vision
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{vision}</p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/15 text-blue-700">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 21v-6a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path d="M12 11V3m0 0 3 3m-3-3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              <h2 className="font-heading mt-5 text-2xl font-bold text-navy-950">
                Mission
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{mission}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="How We Operate"
            title="What guides every engagement"
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
              >
                <span className="font-heading text-3xl font-bold text-cyan-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading mt-4 text-base font-semibold text-navy-950">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
