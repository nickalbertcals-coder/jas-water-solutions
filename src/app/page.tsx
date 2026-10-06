import Eyebrow from "@/components/Eyebrow";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import TeamRow from "@/components/TeamRow";
import CTASection from "@/components/CTASection";
import HeroVideo from "@/components/HeroVideo";
import WaterBackground from "@/components/WaterBackground";
import WaveEdge from "@/components/WaveEdge";
import RotatingCube from "@/components/RotatingCube";
import ServiceList from "@/components/ServiceList";
import ScrollReveal from "@/components/motion/ScrollReveal";
import ScrambleText from "@/components/motion/ScrambleText";
import WaterJourney from "@/components/motion/WaterJourney";
import { about, differentiators, services, team, vision, mission } from "@/lib/data";

const HERO_STATS = [
  { value: "LEVEL III", label: "Distribution systems operated" },
  { value: "24 / 7", label: "Digitized monitoring" },
  { value: "14", label: "Operating departments" },
];

const leadershipPreview = team.slice(0, 3);

const highlight =
  "bg-gradient-to-t from-accent-500/35 to-accent-500/35 bg-[length:100%_0.34em] bg-bottom bg-no-repeat";

export default function Home() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative isolate flex flex-col lg:min-h-[calc(100svh-4.5rem)] overflow-hidden bg-[linear-gradient(135deg,#02131f_0%,#06304d_55%,#0a5a6c_100%)]">
        <WaterBackground />
        {/* keep the left (text) side calm and legible */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,19,31,0.72)_0%,rgba(2,19,31,0.35)_42%,transparent_70%)]"
        />

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-24 pt-10 sm:px-8 sm:pb-28 lg:pb-32 lg:pt-12">
          <div className="relative flex flex-1 flex-col justify-center">
            {/* illustration: beside the text on desktop (allowed to run large), below it on tablets, hidden on phones */}
            <div className="pointer-events-none relative order-2 mx-auto mt-12 hidden w-full max-w-2xl md:block lg:absolute lg:-right-4 lg:top-1/2 lg:mx-0 lg:mt-0 lg:w-[54%] lg:max-w-none lg:-translate-y-1/2 xl:-right-6 xl:w-[56%]">
              <div
                aria-hidden
                className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.28),transparent)] blur-2xl"
              />
              <HeroVideo className="pointer-events-auto relative aspect-[540/392] w-full" />
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
                  Get in touch
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
      <section className="section-pad bg-paper-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <ScrollReveal as="div" y={28} className="lg:col-span-7">
              <Eyebrow>Who we are</Eyebrow>
              <p className="font-display mt-7 text-balance text-[clamp(1.7rem,2.8vw,2.6rem)] font-bold leading-[1.22] tracking-tight text-ink-900">
                JAS runs <span className={highlight}>Level III water distribution systems</span> end to
                end — from network operations and preventive maintenance to computerized meter
                reading, billing and collection.
              </p>
              <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-steel-600">
                {about.paragraphs[3]}
              </p>
              <Link
                href="/about"
                className="mt-9 inline-flex items-center gap-3 border-b border-ink-900 pb-1 font-label text-sm font-semibold text-ink-900 transition-colors hover:border-accent-600 hover:text-accent-600"
              >
                More about JAS Water Solutions
                <span aria-hidden>→</span>
              </Link>
            </ScrollReveal>

            <ScrollReveal as="div" y={28} delay={0.1} className="lg:col-span-5">
              <div className="relative isolate aspect-square overflow-hidden bg-void">
                <div className="contours" aria-hidden />
                <RotatingCube />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal
            as="div"
            selector=":scope > div"
            stagger={0.12}
            className="mt-20 grid gap-12 border-t border-ink-900/20 pt-10 md:grid-cols-2 md:gap-20"
          >
            <div>
              <Eyebrow as="p">Vision</Eyebrow>
              <p className="font-display mt-5 text-pretty text-xl leading-snug text-ink-900 sm:text-2xl">
                {vision}
              </p>
            </div>
            <div>
              <Eyebrow as="p">Mission</Eyebrow>
              <p className="font-display mt-5 text-pretty text-xl leading-snug text-ink-900 sm:text-2xl">
                {mission}
              </p>
            </div>
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
      <section className="section-pad relative bg-ink-900 text-paper-50">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow tone="light">Why JAS</Eyebrow>
            <h2 className="font-statement mt-5 text-balance text-[clamp(2.1rem,3.8vw,3.5rem)] font-semibold">
              Control. Accountability. Results you can measure.
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-paper-50/78">
              Our approach is anchored on digitized platforms, real-time monitoring, and transparent
              KPI-based performance management.
            </p>
          </div>

          <ScrollReveal
            as="div"
            selector=":scope > div"
            stagger={0.12}
            className="divide-y divide-white/15 border-y border-white/15"
          >
            {differentiators.map((item) => (
              <div key={item.title} className="grid gap-4 py-10 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-10">
                <h3 className="font-statement text-4xl font-semibold text-paper-50 sm:text-[2.6rem]">
                  {item.title}
                </h3>
                <p className="text-pretty text-lg leading-relaxed text-paper-50/78">{item.description}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ───────── Leadership ───────── */}
      <section className="section-pad bg-paper-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
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
              className="inline-flex shrink-0 items-center gap-3 border-b border-ink-900 pb-1 font-label text-sm font-semibold text-ink-900 transition-colors hover:border-accent-600 hover:text-accent-600"
            >
              Meet the full team <span aria-hidden>→</span>
            </Link>
          </ScrollReveal>
          <ScrollReveal
            as="div"
            selector=":scope > div"
            stagger={0.1}
            className="mt-14 border-t border-ink-900/20"
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
