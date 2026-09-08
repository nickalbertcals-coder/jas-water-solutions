import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import TeamCard from "@/components/TeamCard";
import CTASection from "@/components/CTASection";
import HeroVideo from "@/components/HeroVideo";
import RotatingCube from "@/components/RotatingCube";
import ScrollReveal from "@/components/motion/ScrollReveal";
import ScrambleText from "@/components/motion/ScrambleText";
import { about, differentiators, services, team, vision, mission } from "@/lib/data";

const HERO_STATS = [
  { value: "LEVEL III", label: "Water Distribution Systems" },
  { value: "24 / 7", label: "Digitized Monitoring" },
  { value: "07", label: "Leadership Specialists" },
];

const DIFFERENTIATOR_ICONS: Record<string, React.ReactNode> = {
  "Digitized Platforms": (
    <path
      d="M4 18V9m6 9V4m6 14v-7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  ),
  "KPI-Based Performance": (
    <path
      d="M4 15l4-5 3 3 6-8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "Experienced Team": (
    <>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.5 19c.6-3 2.7-5 5.5-5s4.9 2 5.5 5M15 10.5c1.9.4 3 1.6 3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  ),
  "Revenue Assurance": (
    <>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11 7.5v7M8.5 9.3c0-1 1-1.8 2.5-1.8s2.5.7 2.5 1.6c0 2.2-5 1-5 3.2 0 .9 1 1.7 2.5 1.7s2.5-.7 2.5-1.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
};

const leadershipPreview = team.slice(0, 3);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-black">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <ScrollReveal selector=":scope > *" y={16} stagger={0.1} once>
            <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-signal-500">
              <span className="h-2.5 w-[3px] bg-signal-500" />
              Water Utility Operations &amp; Maintenance
            </span>
            <h1 className="font-display text-balance mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-paper-50 sm:text-5xl lg:text-[3.1rem]">
              Digitized water systems.
              <br />
              Managed with precision.
              <br />
              Built for sustainability.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-paper-50/70 sm:text-lg">
              JAS Water Solutions Inc. delivers end-to-end Operation &amp;
              Maintenance of Level III water distribution systems — from
              network operations and preventive maintenance to computerized
              billing, collection, and Non-Revenue Water reduction.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded border border-paper-50 bg-paper-50 px-7 py-3 text-center font-mono text-xs font-medium uppercase tracking-[0.06em] text-ink-900 transition-colors hover:bg-paper-50/90"
              >
                Get in Touch
              </Link>
              <Link
                href="/services"
                className="rounded border border-white/25 px-7 py-3 text-center font-mono text-xs font-medium uppercase tracking-[0.06em] text-paper-50 transition-colors hover:border-white/60"
              >
                Our Core Services
              </Link>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-6">
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-mono text-xl font-medium text-paper-50">
                    <ScrambleText text={stat.value} />
                  </dd>
                  <p className="mt-1 text-xs leading-snug text-paper-50/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>
          </ScrollReveal>

          <HeroVideo className="hidden aspect-[6/5] w-full lg:block" />
        </div>
      </section>

      {/* About snapshot */}
      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-start">
          <ScrollReveal y={28}>
            <RotatingCube />
            <div className="mt-6 grid grid-cols-2 gap-px border border-line bg-line">
              <div className="bg-white p-5">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-signal-600">
                  Vision
                </p>
                <p className="mt-2 text-sm leading-relaxed text-steel-600">{vision}</p>
              </div>
              <div className="bg-white p-5">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-signal-600">
                  Mission
                </p>
                <p className="mt-2 text-sm leading-relaxed text-steel-600">{mission}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal y={28} delay={0.1}>
            <SectionHeading eyebrow="About Us" title="A disciplined, technology-driven water utility partner" />
            <p className="mt-5 text-base leading-relaxed text-steel-600">
              {about.paragraphs[0]}
            </p>
            <p className="mt-4 text-base leading-relaxed text-steel-600">
              {about.paragraphs[1]}
            </p>
            <p className="mt-4 text-base leading-relaxed text-steel-600">
              {about.paragraphs[3]}
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-[0.06em] text-ink-900 hover:text-signal-600"
            >
              More about JAS Water Solutions
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
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section className="section-pad border-y border-line bg-paper-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Core Services"
              title="Integrated water management, end to end"
              description="From daily distribution operations to hydraulic engineering and digital transformation — sustainable, cost-effective solutions for utilities, LGUs, and industry."
              align="center"
            />
          </ScrollReveal>
          <ScrollReveal
            as="div"
            selector=":scope > a"
            stagger={0.1}
            className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, i) => (
              <ServiceCard service={service} index={i} key={service.slug} />
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Differentiators */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Why JAS"
              title="Operational control, accountability, measurable results"
              description="Our approach is anchored on digitized platforms, real-time monitoring, and transparent KPI-based performance management."
            />
          </ScrollReveal>
          <ScrollReveal
            as="div"
            selector=":scope > div"
            stagger={0.08}
            className="mt-12 grid divide-y divide-line border-y border-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
          >
            {differentiators.map((item) => (
              <div key={item.title} className="p-6">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-signal-600">
                  {DIFFERENTIATOR_ICONS[item.title]}
                </svg>
                <h3 className="font-display text-balance mt-4 text-base font-semibold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-600">
                  {item.description}
                </p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Leadership preview */}
      <section className="section-pad border-t border-line bg-paper-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal
            as="div"
            className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
          >
            <SectionHeading
              eyebrow="Our Team"
              title="Leadership built on utility expertise"
              description="Engineers, finance professionals, and legal specialists guiding every operation."
            />
            <Link
              href="/team"
              className="inline-flex shrink-0 items-center gap-1.5 rounded border border-ink-900/25 px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.06em] text-ink-900 hover:border-ink-900"
            >
              Meet the full team
            </Link>
          </ScrollReveal>
          <ScrollReveal
            as="div"
            selector=":scope > div"
            stagger={0.1}
            className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
          >
            {leadershipPreview.map((member) => (
              <TeamCard member={member} key={member.slug} />
            ))}
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
