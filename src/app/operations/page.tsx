import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/motion/ScrollReveal";
import {
  operations,
  processStages,
  departments,
  emergencyScenarios,
  emergencyGoal,
  waterJourney,
  journeyTagline,
  keyTakeaways,
  keyTakeawaysTagline,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Operations",
  description:
    "Inside JAS Water Solutions' Level III distribution operation — the water journey from bulk supply to customer, and the 14 departments that run it day to day.",
};

const PROCESS_ICONS: Record<string, React.ReactNode> = {
  "bulk-supply": (
    <path
      d="M11 3s6 6.2 6 10.2a6 6 0 1 1-12 0C5 9.2 11 3 11 3Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  ),
  reservoir: (
    <>
      <path d="M4 8h14v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 8c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3Z" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
  pumping: (
    <>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7.5 13.5 14.5 8.5M7.5 8.5l7 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  network: (
    <>
      <circle cx="5" cy="6" r="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="6" r="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="11" cy="16" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 6h8M6.3 7.7 9.7 14.3M15.7 7.7 12.3 14.3" stroke="currentColor" strokeWidth="1.4" />
    </>
  ),
  connection: (
    <path
      d="M4 10.5 11 4l7 6.5M6 9v8h10V9"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  meter: (
    <>
      <circle cx="11" cy="11" r="7.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11 11 14 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="11" cy="11" r="1.2" fill="currentColor" />
    </>
  ),
  customer: (
    <>
      <circle cx="11" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 18.5c.7-3.5 3-5.5 6.5-5.5s5.8 2 6.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
};

const JOURNEY_ICONS: Record<string, React.ReactNode> = {
  "Bulk Water Supply": PROCESS_ICONS["bulk-supply"],
  Operations: PROCESS_ICONS.pumping,
  "Water Quality": (
    <path
      d="M8.5 3.5h5M9 3.5v5.3L5.3 15a2 2 0 0 0 1.7 3h8a2 2 0 0 0 1.7-3L13 8.8V3.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  ),
  "Distribution Network": PROCESS_ICONS.network,
  Metering: PROCESS_ICONS.meter,
  Billing: (
    <>
      <path d="M6 3h10v16l-2.5-1.5L11 19l-2.5-1.5L6 19V3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.5 8h5M8.5 11.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  Collection: (
    <>
      <circle cx="11" cy="11" r="7.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.7 13.2c0 1 1 1.7 2.3 1.7s2.3-.6 2.3-1.6c0-2-4.9-1-4.9-3 0-1 1-1.6 2.3-1.6s2.2.6 2.3 1.5M11 7.3v1M11 14.9v.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  "Customer Service": (
    <path
      d="M5 11a6 6 0 0 1 12 0v4a2 2 0 0 1-2 2h-1M5 11v3.5A1.5 1.5 0 0 0 6.5 16H7M5 11H4.2A1.2 1.2 0 0 0 3 12.2v1.6A1.2 1.2 0 0 0 4.2 15H5m12-4h.8a1.2 1.2 0 0 1 1.2 1.2v1.6a1.2 1.2 0 0 1-1.2 1.2H17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  Finance: (
    <>
      <ellipse cx="11" cy="6" rx="6" ry="2.3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 6v10c0 1.3 2.7 2.3 6 2.3s6-1 6-2.3V6M5 11c0 1.3 2.7 2.3 6 2.3s6-1 6-2.3" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
  "Happy Customers": (
    <>
      <circle cx="7.5" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="14.5" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 18c.5-2.6 2.2-4 4.5-4s3.6 1.2 4 2.7c.4-1.5 1.7-2.7 4-2.7s4 1.4 4.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
};

export default function OperationsPage() {
  return (
    <>
      {/* Hero */}
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
            {operations.eyebrow}
          </span>
          <h1 className="font-display mt-6 text-4xl font-semibold text-paper-50 sm:text-5xl">
            {operations.title}
          </h1>
          <p className="mt-4 font-mono text-sm uppercase tracking-[0.08em] text-signal-500/90 sm:text-base">
            {operations.subtitle}
          </p>
          <div className="mx-auto mt-8 max-w-2xl border border-white/15 bg-white/5 p-6 text-left">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-signal-500">
              Our Operational Mission
            </p>
            <p className="mt-2 text-sm leading-relaxed text-paper-50/80 sm:text-base">
              {operations.mission}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Process flow */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="The Water Journey"
              title="From bulk supply to every customer"
              description="Every cubic meter follows the same disciplined path — sourced, stored, pumped, distributed, connected, measured, and delivered."
              align="center"
            />
          </ScrollReveal>
          <ScrollReveal
            as="div"
            selector=":scope > div"
            stagger={0.06}
            className="mt-12 flex flex-wrap items-start justify-center gap-x-2 gap-y-8"
          >
            {processStages.map((stage, i) => (
              <div key={stage.key} className="flex items-start">
                <div className="flex w-28 flex-col items-center text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ink-900/20 text-ink-900">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      {PROCESS_ICONS[stage.key]}
                    </svg>
                  </span>
                  <p className="mt-3 font-mono text-xs font-medium uppercase leading-snug tracking-[0.02em] text-ink-900">
                    {stage.label}
                  </p>
                </div>
                {i < processStages.length - 1 && (
                  <span className="mt-6 hidden px-1 font-mono text-steel-500 sm:inline">→</span>
                )}
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Departments directory */}
      <section className="section-pad border-y border-line bg-paper-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="How We're Organized"
              title="Fourteen departments, one operation"
              description="Level III operation is both technical and commercial. Each department owns a distinct part of the system — together they keep water flowing and the utility financially sound."
              align="center"
            />
          </ScrollReveal>
          <ScrollReveal
            as="div"
            selector=":scope > div"
            stagger={0.05}
            y={20}
            className="mt-12 divide-y divide-line border-y border-line"
          >
            {departments.map((dept) => (
              <div key={dept.number} className="grid gap-4 py-7 lg:grid-cols-[auto_1fr] lg:gap-10">
                <div className="flex items-start gap-4 lg:w-72">
                  <span className="font-mono text-sm font-medium text-signal-600">
                    {dept.number}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink-900">
                      {dept.title}
                    </h3>
                    {dept.goal && (
                      <p className="mt-1.5 text-sm italic leading-relaxed text-steel-600">
                        Goal: {dept.goal}
                      </p>
                    )}
                  </div>
                </div>
                <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {dept.functions.map((fn) => (
                    <li key={fn} className="flex gap-2.5 text-sm text-ink-900/80">
                      <span className="mt-2 h-[3px] w-2 shrink-0 bg-signal-500" />
                      <span>{fn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Emergency readiness */}
      <section className="border-b border-line bg-ink-900">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-signal-500">
              <span className="h-2.5 w-[3px] bg-signal-500" />
              Emergency Response &amp; Business Continuity
            </span>
            <h2 className="font-display mt-5 text-2xl font-semibold text-paper-50 sm:text-3xl">
              Ready for the unexpected
            </h2>
          </ScrollReveal>
          <ScrollReveal
            as="div"
            selector=":scope > span"
            stagger={0.05}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {emergencyScenarios.map((scenario) => (
              <span
                key={scenario}
                className="border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-[0.03em] text-paper-50/85"
              >
                {scenario}
              </span>
            ))}
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-8 font-mono text-sm uppercase tracking-[0.06em] text-signal-500">
              {emergencyGoal}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Water journey loop */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="One Team, One System"
              title="The journey of one cubic meter of water"
              align="center"
            />
          </ScrollReveal>
          <ScrollReveal
            as="div"
            selector=":scope > div"
            stagger={0.04}
            className="mt-12 flex flex-wrap items-start justify-center gap-x-2 gap-y-8"
          >
            {waterJourney.map((stage) => (
              <div key={stage.label} className="flex w-24 flex-col items-center text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-900/20 text-ink-900">
                  <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
                    {JOURNEY_ICONS[stage.label]}
                  </svg>
                </span>
                <p className="mt-2.5 font-mono text-[11px] font-medium uppercase leading-snug tracking-[0.02em] text-ink-900">
                  {stage.label}
                </p>
                {stage.sublabel && (
                  <p className="mt-0.5 text-[11px] leading-snug text-steel-500">{stage.sublabel}</p>
                )}
              </div>
            ))}
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="mt-10 text-center">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-signal-600 sm:text-sm">
              {journeyTagline}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Key takeaways */}
      <section className="section-pad border-t border-line bg-paper-100">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <ScrollReveal>
            <SectionHeading eyebrow="Key Takeaways" title="What Level III operation means in practice" align="center" />
          </ScrollReveal>
          <ScrollReveal
            as="ul"
            selector=":scope > li"
            stagger={0.06}
            y={16}
            className="mx-auto mt-10 max-w-2xl space-y-3"
          >
            {keyTakeaways.map((point) => (
              <li key={point} className="flex gap-3 border border-line bg-white p-4 text-sm text-ink-900/85">
                <span className="mt-1.5 h-[3px] w-2 shrink-0 bg-signal-500" />
                <span>{point}</span>
              </li>
            ))}
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="mt-8 text-center">
            <p className="font-display text-xl font-semibold text-ink-900">{keyTakeawaysTagline}</p>
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
