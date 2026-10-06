import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import TeamRow from "@/components/TeamRow";
import CTASection from "@/components/CTASection";
import HeroVideo from "@/components/HeroVideo";
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

const Eyebrow = ({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "light" }) => (
  <span
    className={`inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.18em] ${
      tone === "light" ? "text-accent-500" : "text-accent-600"
    }`}
  >
    <span className="h-px w-8 bg-current" />
    {children}
  </span>
);

const highlight =
  "bg-gradient-to-t from-accent-500/35 to-accent-500/35 bg-[length:100%_0.34em] bg-bottom bg-no-repeat";

export default function Home() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative isolate overflow-hidden bg-void">
        <div className="contours" aria-hidden />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_22%,rgba(23,75,114,0.32)_0%,transparent_46%),radial-gradient(ellipse_at_72%_22%,transparent_22%,rgba(3,18,31,0.9)_100%)]"
        />

        <div className="relative mx-auto flex min-h-[calc(100svh-4.3rem)] max-w-7xl flex-col px-5 pb-8 pt-8 sm:px-8 lg:pt-10">
          {/* top row: intro + live schematic/video */}
          <div className="order-2 grid gap-10 lg:order-1 lg:grid-cols-[minmax(0,26rem)_1fr] lg:items-center">
            <ScrollReveal selector=":scope > *" y={18} stagger={0.1}>
              <span className="hidden lg:block">
                <Eyebrow tone="light">Water utility operations &amp; maintenance</Eyebrow>
              </span>
              <p className="mt-0 text-pretty text-[1.05rem] leading-relaxed text-paper-50/70 lg:mt-5">
                JAS Water Solutions delivers end-to-end Operation &amp; Maintenance of Level III water
                distribution systems — from network operations and preventive maintenance to
                computerized billing, collection, and Non-Revenue Water reduction.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="border border-paper-50 bg-paper-50 px-7 py-3.5 text-center font-mono text-xs font-medium uppercase tracking-[0.08em] text-ink-900 transition-colors hover:border-accent-500 hover:bg-accent-500"
                >
                  Get in touch
                </Link>
                <Link
                  href="/services"
                  className="border border-white/25 px-7 py-3.5 text-center font-mono text-xs font-medium uppercase tracking-[0.08em] text-paper-50 transition-colors hover:border-paper-50"
                >
                  Our core services
                </Link>
              </div>
              <dl className="mt-8 grid grid-cols-3 border-t border-white/15 pt-5">
                {HERO_STATS.map((stat) => (
                  <div key={stat.label} className="pr-3">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-statement text-3xl font-semibold text-paper-50 sm:text-4xl">
                      <ScrambleText text={stat.value} />
                    </dd>
                    <p className="mt-1.5 font-mono text-[10px] uppercase leading-snug tracking-[0.1em] text-paper-50/50">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </dl>
            </ScrollReveal>

            <HeroVideo className="hidden aspect-[540/392] w-full max-w-none justify-self-end lg:-mr-10 lg:block xl:-mr-16 xl:w-[calc(100%+2rem)]" />
          </div>

          {/* headline + stats */}
          <ScrollReveal
            as="div"
            selector="h1 > span"
            y={56}
            stagger={0.14}
            className="order-1 mb-10 mt-0 lg:order-2 lg:mb-0 lg:mt-auto lg:pt-8"
          >
            <div className="mb-6 lg:hidden">
              <Eyebrow tone="light">Water utility operations &amp; maintenance</Eyebrow>
            </div>
            <h1 className="font-statement text-[clamp(2.9rem,7.1vw,7.8rem)] font-semibold text-paper-50">
              <span className="block">Digitized water systems.</span>
              <span className="block">Managed with precision.</span>
              <span className="text-water block w-fit">Built for sustainability.</span>
            </h1>
          </ScrollReveal>

        </div>
      </section>

      {/* ───────── Who we are ───────── */}
      <section className="section-pad bg-paper-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <ScrollReveal as="div" y={28} className="lg:col-span-7">
              <Eyebrow>Who we are</Eyebrow>
              <p className="font-display mt-7 text-balance text-[clamp(1.85rem,3.4vw,3.2rem)] font-medium leading-[1.14] tracking-tight text-ink-900">
                JAS runs <span className={highlight}>Level III water distribution systems</span> end to
                end — from network operations and preventive maintenance to computerized meter
                reading, billing and collection.
              </p>
              <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-steel-600">
                {about.paragraphs[3]}
              </p>
              <Link
                href="/about"
                className="mt-9 inline-flex items-center gap-3 border-b border-ink-900 pb-1 font-mono text-xs font-medium uppercase tracking-[0.1em] text-ink-900 transition-colors hover:border-accent-600 hover:text-accent-600"
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
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent-600">Vision</p>
              <p className="font-display mt-5 text-pretty text-xl leading-snug text-ink-900 sm:text-2xl">
                {vision}
              </p>
            </div>
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent-600">Mission</p>
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
            <h2 className="font-statement mt-5 text-balance text-[clamp(2.6rem,5.2vw,4.8rem)] font-semibold">
              Control. Accountability. Results you can measure.
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-paper-50/65">
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
                <p className="text-pretty text-lg leading-relaxed text-paper-50/65">{item.description}</p>
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
              className="inline-flex shrink-0 items-center gap-3 border-b border-ink-900 pb-1 font-mono text-xs font-medium uppercase tracking-[0.1em] text-ink-900 transition-colors hover:border-accent-600 hover:text-accent-600"
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
