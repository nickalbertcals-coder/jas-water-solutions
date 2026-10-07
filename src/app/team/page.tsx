import Link from "next/link";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import Eyebrow from "@/components/Eyebrow";
import PageHero from "@/components/PageHero";
import TeamPortrait from "@/components/TeamPortrait";
import TeamProfileCard from "@/components/TeamProfileCard";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the leadership and management team of JAS Water Solutions Inc. — engineers, finance professionals, and legal specialists in water utility operations.",
};

const chairman = team[0];
const rest = team.slice(1);

/** Short phrases for the scrolling ribbon: every profession plus the shorter areas of expertise. */
const PHRASES = Array.from(
  new Set([...team.map((m) => m.profession), ...team.flatMap((m) => m.expertise).filter((e) => e.length <= 38)])
);
const ROW_A = PHRASES.filter((_, i) => i % 2 === 0);
const ROW_B = PHRASES.filter((_, i) => i % 2 === 1);

function Ribbon({ items, className }: { items: string[]; className: string }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <ul className={`flex w-max gap-3 ${className}`}>
        {doubled.map((t, i) => (
          <li
            key={`${t}-${i}`}
            aria-hidden={i >= items.length}
            className="whitespace-nowrap rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 font-label text-base font-semibold text-paper-50/90"
          >
            <span className="mr-2.5 inline-block h-1.5 w-1.5 rounded-full bg-live-500 align-middle" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TeamPage() {
  return (
    <>
      <PageHero
        water
        eyebrow="Leadership & team"
        title="The people behind every reliable water system"
        description="Engineers, system operators, finance professionals, and legal specialists with deep utility management expertise."
      />

      {/* ───────── Chairman spotlight ───────── */}
      <section className="section-pad relative overflow-hidden bg-paper-50">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-24 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.2),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal as="div" y={34}>
            <article className="relative grid overflow-hidden rounded-[2.25rem] bg-[linear-gradient(135deg,#05182b_0%,#0b4f78_100%)] text-paper-50 shadow-[0_60px_110px_-50px_rgba(5,24,43,0.9)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              <svg aria-hidden viewBox="0 0 800 800" className="pointer-events-none absolute -left-40 -top-40 h-[42rem] w-[42rem] text-accent-500">
                {[110, 180, 250, 320, 390].map((r, i) => (
                  <circle key={r} cx="400" cy="400" r={r} fill="none" stroke="currentColor" strokeOpacity={0.25 - i * 0.04} />
                ))}
              </svg>
              <div className="relative flex items-center justify-center px-8 py-14 lg:py-20">
                <div className="relative h-60 w-60 sm:h-72 sm:w-72">
                  {[0, 0.9, 1.8].map((d) => (
                    <span key={d} aria-hidden className="ring-pulse absolute inset-0 rounded-full border-2 border-accent-500/70" style={{ animationDelay: `${d}s` }} />
                  ))}
                  <div className="float-y relative h-full w-full rounded-full bg-white shadow-[0_40px_80px_-24px_rgba(0,0,0,0.7)] ring-8 ring-white/90">
                    {chairman.image && <TeamPortrait src={chairman.image} slug={chairman.slug} alt={chairman.name} sizes="288px" className="h-full w-full" />}
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col justify-center px-8 pb-12 pt-2 sm:px-12 lg:py-16 lg:pl-4 lg:pr-14">
                <Eyebrow tone="light">Chairman</Eyebrow>
                <h2 className="font-statement mt-5 text-balance text-[clamp(2rem,3.6vw,3.2rem)]">{chairman.name}</h2>
                <p className="mt-2 font-label text-lg font-bold text-accent-500">{chairman.profession}</p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {chairman.expertise.map((item) => (
                    <li key={item} className="flex gap-3 rounded-2xl border border-white/15 bg-white/[0.07] p-4 text-[0.95rem] font-semibold leading-snug backdrop-blur-sm">
                      <span aria-hidden className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-live-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>

      {/* ───────── Scrolling ribbon of expertise ───────── */}
      <section aria-label="Areas of expertise" className="relative overflow-hidden bg-[linear-gradient(180deg,#05182b_0%,#082a45_100%)] py-12 sm:py-14">
        <p className="mb-7 text-center font-label text-base font-bold text-accent-500">Expertise across the team</p>
        <div className="space-y-3">
          <Ribbon items={ROW_A} className="team-marquee-a" />
          <Ribbon items={ROW_B} className="team-marquee-b" />
        </div>
      </section>

      {/* ───────── Management team ───────── */}
      <section className="section-pad relative overflow-hidden bg-paper-100">
        <div aria-hidden className="pointer-events-none absolute -left-40 top-24 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(62,224,180,0.15),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal as="div" selector=":scope > *" y={24} stagger={0.1} className="max-w-3xl">
            <Eyebrow>Management team</Eyebrow>
            <h2 className="font-statement mt-5 text-balance text-[clamp(2rem,3.7vw,3.2rem)] text-ink-900">Officers &amp; vice presidents</h2>
          </ScrollReveal>
          <ScrollReveal as="div" selector=":scope > div" y={44} stagger={0.12} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {rest.map((member) => (
              <TeamProfileCard member={member} key={member.slug} />
            ))}
          </ScrollReveal>
          <ScrollReveal y={24} delay={0.1} className="mt-14 text-center">
            <p className="mx-auto max-w-xl text-pretty text-lg text-steel-600">
              Want to know how this team can support your utility?{" "}
              <Link href="/contact" className="font-semibold text-accent-600 underline decoration-accent-500/50 underline-offset-4 hover:text-ink-900">
                Get in touch
              </Link>
              .
            </p>
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
