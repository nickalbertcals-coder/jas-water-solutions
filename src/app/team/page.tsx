import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import TeamCard from "@/components/TeamCard";
import CTASection from "@/components/CTASection";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet the leadership and management team of JAS Water Solutions Inc. — engineers, finance professionals, and legal specialists in water utility operations.",
};

const chairman = team[0];
const rest = team.slice(1);

export default function TeamPage() {
  return (
    <>
      <section className="border-b border-line bg-ink-900">
        <div className="relative mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-signal-500">
            <span className="h-2.5 w-[3px] bg-signal-500" />
            Our Leadership &amp; Team Structure
          </span>
          <h1 className="font-display mt-6 text-4xl font-semibold text-paper-50 sm:text-5xl">
            The people behind every reliable water system
          </h1>
          <p className="mt-5 text-base leading-relaxed text-paper-50/70 sm:text-lg">
            Engineers, system operators, finance professionals, and legal
            specialists with deep utility management expertise.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Chairman" title="Executive Leadership" />
          <div className="mt-10 max-w-md border border-line">
            <TeamCard member={chairman} />
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-line bg-paper-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Management Team" title="Officers & Vice Presidents" />
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((member) => (
              <TeamCard member={member} key={member.slug} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
