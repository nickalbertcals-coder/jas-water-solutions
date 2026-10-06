import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import TeamCard from "@/components/TeamCard";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { team } from "@/lib/data";
import PageHero from "@/components/PageHero";

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
      <PageHero
        eyebrow="Leadership & Team Structure"
        title="The people behind every reliable water system"
        description="Engineers, system operators, finance professionals, and legal specialists with deep utility management expertise."
      />

      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal>
            <SectionHeading eyebrow="Chairman" title="Executive Leadership" />
          </ScrollReveal>
          <ScrollReveal as="div" y={28} delay={0.1} className="mt-10 max-w-md border border-line">
            <TeamCard member={chairman} />
          </ScrollReveal>
        </div>
      </section>

      <section className="section-pad border-t border-line bg-paper-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal>
            <SectionHeading eyebrow="Management Team" title="Officers & Vice Presidents" />
          </ScrollReveal>
          <ScrollReveal
            as="div"
            selector=":scope > div"
            stagger={0.08}
            className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
          >
            {rest.map((member) => (
              <TeamCard member={member} key={member.slug} />
            ))}
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
