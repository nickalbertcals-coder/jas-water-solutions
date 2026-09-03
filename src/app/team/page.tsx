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
            Our Leadership &amp; Team Structure
          </span>
          <h1 className="font-heading mt-6 text-4xl font-bold text-white sm:text-5xl">
            The people behind every reliable water system
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
            Engineers, system operators, finance professionals, and legal
            specialists with deep utility management expertise.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Chairman" title="Executive Leadership" />
          <div className="mt-10 max-w-md">
            <TeamCard member={chairman} />
          </div>
        </div>
      </section>

      <section className="section-pad bg-tint-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Management Team" title="Officers & Vice Presidents" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
