import Link from "next/link";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import Eyebrow from "@/components/Eyebrow";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import AboutStory from "@/components/motion/AboutStory";
import ScrambleText from "@/components/motion/ScrambleText";
import { about, mission, team, vision } from "@/lib/data";
import { initials } from "@/components/TeamCard";
import TeamPortrait from "@/components/TeamPortrait";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about JAS Water Solutions Inc. — our story, vision, mission, and the disciplined, technology-driven approach behind our water utility operations.",
};

const FACTS = [
  { value: "LEVEL III", label: "Water distribution systems operated" },
  { value: "24 / 7", label: "Digitized monitoring" },
  { value: "14", label: "Operating departments" },
  { value: String(team.length), label: "Leaders and specialists on our team" },
];

const VALUES = [
  {
    title: "Operational control",
    description:
      "Digitized platforms and real-time monitoring keep every distribution network under close, consistent oversight.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="12.5" rx="2.2" />
        <path d="M9 20.5h6M12 16.5v4" />
        <path d="M6.5 10.5h3l1.4-3 2.2 6 1.4-3H17.5" />
      </>
    ),
  },
  {
    title: "Accountability",
    description:
      "Transparent, KPI-based performance management ties every team and process to measurable outcomes.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      </>
    ),
  },
  {
    title: "Financial sustainability",
    description:
      "Disciplined revenue management and Non-Revenue Water reduction protect the long-term health of every utility we manage.",
    icon: (
      <>
        <path d="M12 2.8c-.3 0-.5.2-.7.4C9 5.8 5.5 9.8 5.5 13.8a6.5 6.5 0 0 0 13 0c0-4-3.5-8-5.8-10.6-.2-.2-.4-.4-.7-.4Z" />
        <path d="M9 14l2.2 2.2 4-4.4" />
      </>
    ),
  },
  {
    title: "Regulatory compliance",
    description:
      "Deep experience in utility governance ensures operations meet regulatory and quality standards at every step.",
    icon: (
      <>
        <path d="M12 3l7.5 3v5.5c0 4.4-3.1 8-7.5 9.5-4.4-1.5-7.5-5.1-7.5-9.5V6L12 3Z" />
        <path d="M8.8 12l2.3 2.3 4.2-4.6" />
      </>
    ),
  },
];

const LEADERS = team.slice(0, 5);

export default function AboutPage() {
  return (
    <>
      <PageHero
        water
        eyebrow="About us"
        title="Professionally managed water utilities, built on discipline"
        description="We keep safe water flowing to the communities we serve — and back it with digital monitoring and measurable performance."
      />

      {/* ───────── Story ───────── */}
      <AboutStory paragraphs={about.paragraphs} />

      {/* ───────── By the numbers ───────── */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#05182b_0%,#0b4f78_100%)] py-14 text-paper-50 sm:py-16">
        <svg aria-hidden viewBox="0 0 800 400" className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] text-accent-500">
          {[80, 140, 200, 260, 320].map((r, i) => (
            <circle key={r} cx="400" cy="200" r={r} fill="none" stroke="currentColor" strokeOpacity={0.22 - i * 0.035} />
          ))}
        </svg>
        <ScrollReveal
          as="dl"
          selector=":scope > div"
          y={22}
          stagger={0.1}
          className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 sm:px-8 lg:grid-cols-4 lg:divide-x lg:divide-white/15"
        >
          {FACTS.map((fact) => (
            <div key={fact.label} className="lg:px-8 lg:first:pl-0">
              <dt className="sr-only">{fact.label}</dt>
              <dd className="font-statement whitespace-nowrap text-[clamp(1.9rem,3.4vw,3rem)] text-paper-50">
                <ScrambleText text={fact.value} />
              </dd>
              <p className="mt-2 max-w-[14rem] font-label text-sm leading-snug text-paper-50/75 sm:text-base">{fact.label}</p>
            </div>
          ))}
        </ScrollReveal>
      </section>

      {/* ───────── Vision & mission ───────── */}
      <section className="section-pad relative overflow-hidden bg-paper-100">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-32 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(62,224,180,0.16),transparent)]"
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal as="div" y={24} className="max-w-3xl">
            <Eyebrow>Where we&apos;re headed</Eyebrow>
            <h2 className="font-statement mt-5 text-balance text-[clamp(2rem,3.6vw,3.2rem)] text-ink-900">
              A clear destination, and the way we get there
            </h2>
          </ScrollReveal>
          <ScrollReveal as="div" selector=":scope > article" y={34} stagger={0.14} className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <article className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(150deg,#05182b_0%,#0f4468_100%)] p-8 text-paper-50 shadow-[0_40px_80px_-40px_rgba(10,39,64,0.85)] sm:p-12">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.4),transparent)]" />
              <span className="font-display absolute right-8 top-2 select-none text-[9rem] font-extrabold leading-none text-white/[0.06]" aria-hidden>
                01
              </span>
              <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-accent-500">
                <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
              <h3 className="font-display relative mt-7 text-3xl font-bold">Our vision</h3>
              <p className="relative mt-4 text-pretty text-lg leading-relaxed text-paper-50/85">{vision}</p>
            </article>
            <article className="relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-[0_40px_80px_-46px_rgba(10,114,154,0.55)] ring-1 ring-accent-600/15 sm:p-12">
              <span className="font-display absolute right-8 top-2 select-none text-[9rem] font-extrabold leading-none text-accent-600/[0.07]" aria-hidden>
                02
              </span>
              <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-tint text-accent-600">
                <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                </svg>
              </span>
              <h3 className="font-display relative mt-7 text-3xl font-bold text-ink-900">Our mission</h3>
              <p className="relative mt-4 text-pretty text-lg leading-relaxed text-steel-600">{mission}</p>
            </article>
          </ScrollReveal>
        </div>
      </section>

      {/* ───────── How we operate ───────── */}
      <section className="section-pad bg-paper-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal as="div" y={24} className="mx-auto max-w-3xl text-center">
            <Eyebrow>How we operate</Eyebrow>
            <h2 className="font-statement mt-5 text-balance text-[clamp(2rem,3.6vw,3.2rem)] text-ink-900">
              What guides every engagement
            </h2>
          </ScrollReveal>
          <ScrollReveal as="div" selector=":scope > div" y={30} stagger={0.1} className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="group relative flex gap-6 overflow-hidden rounded-[1.75rem] border border-line bg-white p-7 shadow-[0_24px_50px_-36px_rgba(10,39,64,0.5)] transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-accent-500/50 hover:shadow-[0_34px_60px_-34px_rgba(10,114,154,0.5)] sm:p-9"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#05182b,#0f4468)] text-accent-500 shadow-[0_12px_28px_-10px_rgba(10,39,64,0.7)]">
                  <svg aria-hidden viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {v.icon}
                  </svg>
                </span>
                <div>
                  <span className="font-label text-sm font-bold tabular-nums text-accent-600">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display mt-1 text-balance text-xl font-bold text-ink-900 sm:text-2xl">{v.title}</h3>
                  <p className="mt-2.5 text-pretty text-base leading-relaxed text-steel-600">{v.description}</p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ───────── Meet the team ───────── */}
      <section className="section-pad relative overflow-hidden bg-[linear-gradient(180deg,#05182b_0%,#082a45_100%)] text-paper-50">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[56rem] max-w-none -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.14),transparent)]" />
        <ScrollReveal as="div" selector=":scope > *" y={26} stagger={0.12} className="relative mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8">
          <Eyebrow tone="light">The people behind it</Eyebrow>
          <h2 className="font-statement mt-5 text-balance text-[clamp(2rem,3.8vw,3.4rem)]">
            Engineers, finance and legal specialists guiding every operation
          </h2>
          <ul className="mt-10 flex items-center justify-center -space-x-4">
            {LEADERS.map((m) => (
              <li key={m.slug} className="relative h-20 w-20 overflow-hidden rounded-full bg-ink-800 ring-4 ring-[#06223a] sm:h-24 sm:w-24">
                {m.image ? (
                  <TeamPortrait src={m.image} slug={m.slug} alt={m.name} sizes="96px" className="h-full w-full" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center font-display text-xl font-bold">{initials(m.name)}</span>
                )}
              </li>
            ))}
            {team.length > LEADERS.length && (
              <li className="relative flex h-20 w-20 items-center justify-center rounded-full bg-accent-500 font-display text-lg font-bold text-void ring-4 ring-[#06223a] sm:h-24 sm:w-24">
                +{team.length - LEADERS.length}
              </li>
            )}
          </ul>
          <Link
            href="/team"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-3.5 font-label text-base font-bold text-void transition-colors hover:bg-paper-50"
          >
            Meet the team <span aria-hidden>→</span>
          </Link>
        </ScrollReveal>
      </section>

      <CTASection />
    </>
  );
}
