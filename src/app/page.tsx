import Eyebrow from "@/components/Eyebrow";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import TeamRow from "@/components/TeamRow";
import CTASection from "@/components/CTASection";
import HeroVideo from "@/components/HeroVideo";
import WaterBackground from "@/components/WaterBackground";
import WaveEdge from "@/components/WaveEdge";
import WhoVisual from "@/components/WhoVisual";
import ServiceList from "@/components/ServiceList";
import ScrollReveal from "@/components/motion/ScrollReveal";
import ScrambleText from "@/components/motion/ScrambleText";
import WaterJourney from "@/components/motion/WaterJourney";
import { differentiators, services, team, vision, mission } from "@/lib/data";

const HERO_STATS = [
  { value: "LEVEL III", label: "Distribution systems operated" },
  { value: "24 / 7", label: "Digitized monitoring" },
  { value: "14", label: "Operating departments" },
];

const WHO_POINTS = [
  {
    title: "Network operations & maintenance",
    text: "Daily distribution operations and preventive maintenance, so water keeps flowing.",
    icon: (
      <>
        <path d="M3 8h9a3 3 0 0 1 3 3v2a3 3 0 0 0 3 3h3" />
        <path d="M3 8V5M21 16v3" />
        <circle cx="12" cy="12" r="0.8" fill="currentColor" />
      </>
    ),
  },
  {
    title: "Meter reading, billing & collection",
    text: "Computerized, accurate and transparent — from the meter to the payment.",
    icon: (
      <>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 13l3.5-3.5" />
        <path d="M8 4.5h8" />
      </>
    ),
  },
  {
    title: "Fewer losses, steadier service",
    text: "We track and reduce water losses so the utility stays financially sustainable.",
    icon: (
      <>
        <path d="M12 3c-.3 0-.5.2-.7.4C9 6 5.5 10 5.5 13.8a6.5 6.5 0 0 0 13 0C18.5 10 15 6 12.7 3.4c-.2-.2-.4-.4-.7-.4Z" />
        <path d="M9.5 14.5l1.7 1.7 3.3-3.4" />
      </>
    ),
  },
];

const WHY_ICONS = [
  // digitized platforms: monitor with a live pulse line
  <>
    <rect x="3" y="4" width="18" height="12.5" rx="2.2" />
    <path d="M9 20.5h6M12 16.5v4" />
    <path d="M6.5 10.5h3l1.4-3 2.2 6 1.4-3H17.5" className="wj-draw" strokeDasharray="6 4" />
  </>,
  // KPI-based performance: bars that keep growing
  <>
    <path d="M3.5 20.5h17" />
    <rect x="5" y="12" width="3.4" height="8" rx="1" className="wj-bar" />
    <rect x="10.3" y="8" width="3.4" height="12" rx="1" className="wj-bar" style={{ animationDelay: "0.35s" }} />
    <rect x="15.6" y="4" width="3.4" height="16" rx="1" className="wj-bar" style={{ animationDelay: "0.7s" }} />
  </>,
  // experienced team
  <>
    <circle cx="12" cy="8" r="3.2" />
    <path d="M5.5 20c0-3.8 2.8-6 6.5-6s6.5 2.2 6.5 6" />
    <circle cx="4.8" cy="10" r="2" />
    <circle cx="19.2" cy="10" r="2" />
  </>,
  // revenue assurance: a drop that is accounted for
  <>
    <path d="M12 2.8c-.3 0-.5.2-.7.4C9 5.8 5.5 9.8 5.5 13.8a6.5 6.5 0 0 0 13 0c0-4-3.5-8-5.8-10.6-.2-.2-.4-.4-.7-.4Z" />
    <path d="M9 14l2.2 2.2 4-4.4" className="wj-draw" strokeDasharray="10 4" />
  </>,
];

const leadershipPreview = team.slice(0, 3);

const highlight =
  "bg-gradient-to-t from-accent-500/35 to-accent-500/35 bg-[length:100%_0.34em] bg-bottom bg-no-repeat";

export default function Home() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative isolate flex flex-col lg:min-h-[calc(100svh-5rem)] overflow-hidden bg-[linear-gradient(135deg,#02131f_0%,#06304d_55%,#0a5a6c_100%)]">
        <WaterBackground />
        {/* keep the left (text) side calm and legible */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,19,31,0.72)_0%,rgba(2,19,31,0.35)_42%,transparent_70%)]"
        />

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-24 pt-10 sm:px-8 sm:pb-28 lg:pb-32 lg:pt-12">
          <div className="flex flex-1 flex-col justify-center">
            {/* illustration: beside the text on desktop (allowed to run large), below it on tablets, hidden on phones */}
            <div className="pointer-events-none relative order-2 mx-auto mt-12 hidden aspect-[400/676] w-full max-w-[22rem] md:block lg:absolute lg:right-2 lg:top-[47%] lg:mx-0 lg:mt-0 lg:h-[min(80vh,50rem)] lg:w-auto lg:max-w-none lg:-translate-y-1/2 xl:right-10">
              <div
                aria-hidden
                className="absolute inset-[6%] rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.28),transparent)] blur-2xl"
              />
              <HeroVideo className="pointer-events-auto relative h-full w-full" />
            </div>

            <ScrollReveal as="div" selector=":scope > *" y={20} stagger={0.12} className="relative z-10 order-1 max-w-[44rem]">
              <Eyebrow tone="light">Water utility operations &amp; maintenance</Eyebrow>
              <h1 className="font-statement mt-6 text-[clamp(2.3rem,3.9vw,3.4rem)] text-paper-50">
                <span className="block">Digitized water systems.</span>
                <span className="block">Managed with precision.</span>
                <span className="text-water block w-fit">Built for sustainability.</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-paper-50/80">
                JAS Water Solutions runs and maintains water distribution systems from the reservoir to
                your tap — network operations, preventive maintenance, and computerized billing and
                collection.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-full bg-accent-500 px-8 py-3.5 text-center font-label text-base font-bold text-void transition-colors hover:bg-paper-50"
                >
                  Request a consultation
                </Link>
                <Link
                  href="/services"
                  className="rounded-full border border-white/30 px-8 py-3.5 text-center font-label text-base font-semibold text-paper-50 transition-colors hover:border-paper-50 hover:bg-white/10"
                >
                  Our core services
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal
            as="dl"
            selector=":scope > div"
            y={16}
            stagger={0.1}
            delay={0.3}
            className="relative z-10 mt-10 grid grid-cols-3 gap-3 sm:gap-4 lg:max-w-[44rem]"
          >
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/15 bg-white/[0.07] px-3 py-3.5 backdrop-blur-md sm:px-5 sm:py-4"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-statement whitespace-nowrap text-xl text-paper-50 sm:text-2xl">
                  <ScrambleText text={stat.value} />
                </dd>
                <p className="mt-1 font-label text-xs leading-snug text-paper-50/75 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>

        <WaveEdge />
      </section>

      {/* ───────── Who we are ───────── */}
      <section className="section-pad relative overflow-hidden bg-paper-50">
        {/* soft depth: faint aqua light in the corners */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.18),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-52 -left-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(62,224,180,0.12),transparent)]"
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-14">
            <ScrollReveal as="div" selector=":scope > *" y={26} stagger={0.1} className="lg:col-span-6">
              <Eyebrow>Who we are</Eyebrow>
              <h2 className="font-statement mt-6 text-balance text-[clamp(2.1rem,3.8vw,3.4rem)] text-ink-900">
                We run water distribution systems{" "}
                <span className={highlight}>end to end.</span>
              </h2>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-steel-600">
                JAS Water Solutions is a professional water utility operations company. We keep safe
                water flowing to the communities we serve — and we back it with digital monitoring and
                transparent, measurable performance.
              </p>

              <ul className="mt-9 grid gap-5">
                {WHO_POINTS.map((point) => (
                  <li key={point.title} className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-tint text-accent-600">
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {point.icon}
                      </svg>
                    </span>
                    <span>
                      <span className="block font-display text-lg font-bold text-ink-900">{point.title}</span>
                      <span className="mt-0.5 block text-base leading-relaxed text-steel-600">{point.text}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/about"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink-900 px-7 py-3.5 font-label text-base font-semibold text-paper-50 transition-colors hover:bg-accent-600"
              >
                More about JAS Water Solutions
                <span aria-hidden>→</span>
              </Link>
            </ScrollReveal>

            <ScrollReveal as="div" y={30} delay={0.1} className="lg:col-span-6">
              <WhoVisual />
            </ScrollReveal>
          </div>

          <ScrollReveal
            as="div"
            selector=":scope > div"
            y={30}
            stagger={0.14}
            className="mt-20 grid gap-6 md:grid-cols-2 lg:mt-24 lg:gap-8"
          >
            <article className="relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(150deg,#0a2740_0%,#0f3f66_100%)] p-8 text-paper-50 shadow-[0_30px_70px_-35px_rgba(10,39,64,0.8)] sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.35),transparent)]"
              />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-accent-500 ring-1 ring-white/15">
                <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
              <h3 className="relative mt-6 font-display text-2xl font-bold">Our vision</h3>
              <p className="relative mt-3 text-pretty text-lg leading-relaxed text-paper-50/85">{vision}</p>
            </article>

            <article className="relative overflow-hidden rounded-[1.75rem] bg-white p-8 shadow-[0_30px_70px_-40px_rgba(10,114,154,0.5)] ring-1 ring-accent-600/15 sm:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-tint text-accent-600">
                <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                </svg>
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold text-ink-900">Our mission</h3>
              <p className="mt-3 text-pretty text-lg leading-relaxed text-steel-600">{mission}</p>
            </article>
          </ScrollReveal>
        </div>
      </section>

      {/* ───────── The journey (scroll-driven) ───────── */}
      <WaterJourney />

      {/* ───────── Services ───────── */}
      <section className="section-pad bg-paper-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal
            as="div"
            className="mb-14 grid gap-6 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end lg:gap-16"
          >
            <SectionHeading eyebrow="Core services" title="Everything between the reservoir and the customer" />
            <p className="text-pretty text-lg leading-relaxed text-steel-600">
              From daily distribution operations to hydraulic engineering and digital transformation —
              for water districts, LGUs and industry.
            </p>
          </ScrollReveal>
          <ServiceList services={services} />
        </div>
      </section>

      {/* ───────── Why JAS ───────── */}
      <section className="section-pad relative isolate overflow-hidden bg-[linear-gradient(180deg,#05182b_0%,#082a45_100%)] text-paper-50">
        {/* concentric ripple rings, anchored top-right and bottom-left */}
        <svg aria-hidden viewBox="0 0 800 800" className="pointer-events-none absolute -right-72 -top-72 -z-10 h-[50rem] w-[50rem] text-accent-500">
          {[120, 200, 280, 360, 440].map((r, i) => (
            <circle key={r} cx="400" cy="400" r={r} fill="none" stroke="currentColor" strokeOpacity={0.2 - i * 0.03} />
          ))}
        </svg>
        <svg aria-hidden viewBox="0 0 800 800" className="pointer-events-none absolute -bottom-80 -left-80 -z-10 h-[46rem] w-[46rem] text-live-500">
          {[120, 200, 280, 360].map((r, i) => (
            <circle key={r} cx="400" cy="400" r={r} fill="none" stroke="currentColor" strokeOpacity={0.14 - i * 0.025} />
          ))}
        </svg>
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[28rem] w-[60rem] max-w-none -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.14),transparent)]"
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal
            as="div"
            selector=":scope > *"
            y={26}
            stagger={0.1}
            className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16"
          >
            <div>
              <Eyebrow tone="light">Why JAS</Eyebrow>
              <h2 className="font-statement mt-5 text-[clamp(2rem,3.7vw,3.3rem)]">
                <span className="block">Control. Accountability.</span>
                <span className="text-water block w-fit">Results you can measure.</span>
              </h2>
            </div>
            <p className="max-w-md text-pretty text-lg leading-relaxed text-paper-50/80 lg:justify-self-end">
              Our approach is anchored on digitized platforms, real-time monitoring, and transparent
              KPI-based performance management.
            </p>
          </ScrollReveal>

          <ScrollReveal
            as="div"
            selector=":scope > div"
            y={34}
            stagger={0.12}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6"
          >
            {differentiators.map((item, i) => (
              <div
                key={item.title}
                className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.03)_100%)] p-7 shadow-[0_30px_60px_-36px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-[transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-accent-500/50 sm:p-8"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.28),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="flex items-center justify-between">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-accent-500/30 bg-accent-500/10 text-accent-500 shadow-[0_0_30px_-8px_rgba(76,201,232,0.6)]">
                    <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {WHY_ICONS[i]}
                    </svg>
                  </span>
                  <span className="font-label text-sm font-bold tabular-nums text-paper-50/45">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-display mt-8 text-balance text-xl font-bold leading-snug sm:text-[1.4rem]">{item.title}</h3>
                <p className="mt-3 text-pretty text-base leading-relaxed text-paper-50/78">{item.description}</p>
                <span aria-hidden className="mt-7 block h-1 w-12 rounded-full bg-[linear-gradient(90deg,#4cc9e8,#3ee0b4)] transition-[width] duration-500 group-hover:w-24" />
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ───────── Leadership ───────── */}
      <section className="section-pad relative overflow-hidden bg-paper-100">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.2),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-52 -right-32 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(62,224,180,0.14),transparent)]"
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal
            as="div"
            className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
          >
            <SectionHeading
              eyebrow="Our team"
              title="Leadership built on utility expertise"
              description="Engineers, finance professionals, and legal specialists guiding every operation."
            />
            <Link
              href="/team"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink-900 px-7 py-3.5 font-label text-base font-semibold text-paper-50 transition-colors hover:bg-accent-600"
            >
              Meet the full team <span aria-hidden>→</span>
            </Link>
          </ScrollReveal>
          <ScrollReveal
            as="div"
            selector=":scope > article"
            y={34}
            stagger={0.12}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {leadershipPreview.map((member) => (
              <TeamRow member={member} key={member.slug} />
            ))}
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
