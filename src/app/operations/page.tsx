import Eyebrow from "@/components/Eyebrow";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/motion/ScrollReveal";
import PageHero from "@/components/PageHero";
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

function Heading({ eyebrow, title, description, light = false, center = true }: { eyebrow: string; title: string; description?: string; light?: boolean; center?: boolean }) {
  return (
    <ScrollReveal as="div" selector=":scope > *" y={24} stagger={0.1} className={`flex flex-col ${center ? "mx-auto items-center text-center" : "items-start"} max-w-3xl`}>
      <Eyebrow tone={light ? "light" : "dark"}>{eyebrow}</Eyebrow>
      <h2 className={`font-statement mt-5 text-balance text-[clamp(2rem,3.7vw,3.2rem)] ${light ? "text-paper-50" : "text-ink-900"}`}>{title}</h2>
      {description && (
        <p className={`mt-4 max-w-2xl text-pretty text-lg leading-relaxed ${light ? "text-paper-50/80" : "text-steel-600"}`}>{description}</p>
      )}
    </ScrollReveal>
  );
}

export default function OperationsPage() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <PageHero water video={{ src: "/videos/ops-hands.mp4", poster: "/images/ops-hands-poster.jpg" }} eyebrow={operations.eyebrow} title={operations.title} description={operations.subtitle}>
        <div className="mt-10 max-w-2xl rounded-3xl border border-white/20 bg-white/[0.08] p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-7">
          <Eyebrow tone="light" as="p">Our operational mission</Eyebrow>
          <p className="mt-4 text-pretty text-base leading-relaxed text-paper-50/90 sm:text-lg">{operations.mission}</p>
        </div>
      </PageHero>

      {/* ───────── The water journey (7 stops) ───────── */}
      <section className="section-pad relative overflow-hidden bg-paper-50">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-24 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.18),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Heading
            eyebrow="The water journey"
            title="From bulk supply to every customer"
            description="Every cubic meter follows the same disciplined path — sourced, stored, pumped, distributed, connected, measured, and delivered."
          />
          <ScrollReveal as="ol" selector=":scope > li" y={30} stagger={0.08} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {processStages.map((stage, i) => (
              <li
                key={stage.key}
                className={`group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white p-7 shadow-[0_24px_50px_-36px_rgba(10,39,64,0.55)] transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-accent-500/50 hover:shadow-[0_34px_60px_-34px_rgba(10,114,154,0.5)] ${i === processStages.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <span aria-hidden className="font-display pointer-events-none absolute -right-2 -top-4 select-none text-[6.5rem] font-extrabold leading-none text-accent-600/[0.07]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#05182b,#0f4468)] text-accent-500 shadow-[0_12px_28px_-10px_rgba(10,39,64,0.7)]">
                  <svg width="26" height="26" viewBox="0 0 22 22" fill="none" aria-hidden>
                    {PROCESS_ICONS[stage.key]}
                  </svg>
                </span>
                <h3 className="font-display relative mt-6 text-balance text-xl font-bold text-ink-900">{stage.label}</h3>
                <p className="relative mt-2.5 text-pretty text-[0.95rem] leading-relaxed text-steel-600">{stage.description}</p>
              </li>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ───────── Departments ───────── */}
      <section className="section-pad relative overflow-hidden bg-[linear-gradient(180deg,#05182b_0%,#082a45_100%)] text-paper-50">
        <svg aria-hidden viewBox="0 0 800 800" className="pointer-events-none absolute -right-72 -top-72 h-[50rem] w-[50rem] text-accent-500">
          {[120, 200, 280, 360, 440].map((r, i) => (
            <circle key={r} cx="400" cy="400" r={r} fill="none" stroke="currentColor" strokeOpacity={0.2 - i * 0.03} />
          ))}
        </svg>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Heading
            light
            eyebrow="How we're organized"
            title="Fourteen departments, one operation"
            description="Level III operation is both technical and commercial. Each department owns a distinct part of the system — together they keep water flowing and the utility financially sound."
          />
          <ScrollReveal as="div" selector=":scope > article" y={30} stagger={0.06} className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
            {departments.map((dept) => (
              <article
                key={dept.number}
                className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.03)_100%)] p-7 shadow-[0_30px_60px_-36px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-[transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-accent-500/50"
              >
                <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.28),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="font-display inline-flex h-11 min-w-11 items-center justify-center self-start rounded-xl border border-accent-500/30 bg-accent-500/10 px-3 text-base font-extrabold tabular-nums text-accent-500">
                  {dept.number}
                </span>
                <h3 className="font-display mt-5 text-balance text-xl font-bold leading-snug">{dept.title}</h3>
                {dept.goal && (
                  <p className="mt-3 rounded-2xl border border-live-500/25 bg-live-500/[0.08] px-4 py-3 text-[0.9rem] leading-relaxed text-paper-50/90">
                    <span className="font-bold text-live-500">Goal: </span>
                    {dept.goal}
                  </p>
                )}
                <ul className="mt-5 space-y-2.5 text-[0.95rem] leading-snug text-paper-50/80">
                  {dept.functions.map((fn) => (
                    <li key={fn} className="flex gap-3">
                      <span aria-hidden className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-accent-500" />
                      <span>{fn}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ───────── Emergency readiness ───────── */}
      <section className="section-pad relative overflow-hidden bg-paper-100">
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-24 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(62,224,180,0.16),transparent)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <ScrollReveal as="div" selector=":scope > *" y={24} stagger={0.1} className="lg:col-span-5">
            <span className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,#05182b,#0f4468)] text-accent-500 shadow-[0_24px_46px_-18px_rgba(10,39,64,0.7)]">
              <span aria-hidden className="jpulse absolute inset-0 rounded-3xl border border-accent-500/60" />
              <svg aria-hidden viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l9 16H3L12 3Z" />
                <path d="M12 10v4.5M12 17v.2" />
              </svg>
            </span>
            <div className="mt-7">
              <Eyebrow>Emergency response &amp; business continuity</Eyebrow>
            </div>
            <h2 className="font-statement mt-5 text-balance text-[clamp(2rem,3.5vw,3rem)] text-ink-900">Ready for the unexpected</h2>
            <p className="mt-5 inline-flex max-w-md items-start gap-3 rounded-2xl bg-white px-5 py-4 text-lg font-semibold leading-snug text-ink-900 shadow-[0_20px_40px_-26px_rgba(10,39,64,0.5)] ring-1 ring-accent-600/15">
              <svg aria-hidden viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0 text-live-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l7.5 3v5.5c0 4.4-3.1 8-7.5 9.5-4.4-1.5-7.5-5.1-7.5-9.5V6L12 3Z" />
                <path d="M8.8 12l2.3 2.3 4.2-4.6" />
              </svg>
              {emergencyGoal}
            </p>
          </ScrollReveal>
          <ScrollReveal as="ul" selector=":scope > li" y={22} stagger={0.06} className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {emergencyScenarios.map((scenario, i) => (
              <li
                key={scenario}
                className={`flex items-center gap-4 rounded-2xl border border-line bg-white px-5 py-4 text-base font-semibold text-ink-900 shadow-[0_16px_34px_-26px_rgba(10,39,64,0.5)] ${i === emergencyScenarios.length - 1 ? "sm:col-span-2" : ""}`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-tint text-sm font-extrabold tabular-nums text-accent-600">
                  {i + 1}
                </span>
                {scenario}
              </li>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ───────── One team, one system ───────── */}
      <section className="section-pad bg-paper-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Heading eyebrow="One team, one system" title="The journey of one cubic meter of water" />
          <ScrollReveal as="ol" selector=":scope > li" y={26} stagger={0.05} className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {waterJourney.map((stage, i) => (
              <li
                key={stage.label}
                className="group relative flex flex-col items-center rounded-3xl border border-line bg-white px-4 py-7 text-center shadow-[0_20px_40px_-30px_rgba(10,39,64,0.5)] transition-[transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-accent-500/50"
              >
                <span className="absolute left-4 top-4 font-label text-xs font-bold tabular-nums text-accent-600/70">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#05182b,#0f4468)] text-accent-500 shadow-[0_14px_30px_-12px_rgba(10,39,64,0.7)] transition-transform duration-500 group-hover:scale-110">
                  <svg width="28" height="28" viewBox="0 0 22 22" fill="none" aria-hidden>
                    {JOURNEY_ICONS[stage.label]}
                  </svg>
                </span>
                <p className="font-display mt-4 text-balance text-base font-bold leading-snug text-ink-900">{stage.label}</p>
                {stage.sublabel && <p className="mt-1 text-sm leading-snug text-steel-600">{stage.sublabel}</p>}
              </li>
            ))}
          </ScrollReveal>
          <ScrollReveal y={20} delay={0.1} className="mt-12 text-center">
            <p className="font-display mx-auto max-w-2xl text-balance text-xl font-bold text-accent-600 sm:text-2xl">{journeyTagline}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ───────── Key takeaways ───────── */}
      <section className="section-pad relative overflow-hidden bg-[linear-gradient(135deg,#05182b_0%,#0b4f78_100%)] text-paper-50">
        <svg aria-hidden viewBox="0 0 800 800" className="pointer-events-none absolute -bottom-72 -left-72 h-[48rem] w-[48rem] text-accent-500">
          {[120, 200, 280, 360].map((r, i) => (
            <circle key={r} cx="400" cy="400" r={r} fill="none" stroke="currentColor" strokeOpacity={0.2 - i * 0.04} />
          ))}
        </svg>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Heading light eyebrow="Key takeaways" title="What Level III operation means in practice" />
          <ScrollReveal as="ul" selector=":scope > li" y={26} stagger={0.07} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {keyTakeaways.map((point, i) => (
              <li key={point} className="flex gap-4 rounded-3xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm">
                <span className="font-display text-3xl font-extrabold leading-none tabular-nums text-accent-500">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-pretty text-base leading-relaxed text-paper-50/90">{point}</span>
              </li>
            ))}
          </ScrollReveal>
          <ScrollReveal y={20} delay={0.1} className="mt-14 text-center">
            <p className="font-statement text-balance text-[clamp(1.6rem,3vw,2.6rem)]">
              <span className="text-water">{keyTakeawaysTagline}</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
