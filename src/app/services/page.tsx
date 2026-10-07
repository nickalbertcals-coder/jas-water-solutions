import Link from "next/link";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import Eyebrow from "@/components/Eyebrow";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import ServicesShowcase from "@/components/motion/ServicesShowcase";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Operations & Maintenance of Level III water systems, bulk water supply, hydraulic modeling, bulk water retail, and technical consultancy from JAS Water Solutions Inc.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        water
        eyebrow="Core services"
        title="Innovative, sustainable, cost-effective water management"
        description="Integrated engineering, operations, technical consultancy, and water supply services for water utilities, government agencies, and private sector clients."
      />

      <ServicesShowcase services={services} />

      <section className="section-pad bg-paper-100">
        <ScrollReveal as="div" selector=":scope > *" y={24} stagger={0.1} className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-8">
          <Eyebrow>See it in action</Eyebrow>
          <h2 className="font-statement mt-5 text-balance text-[clamp(1.9rem,3.4vw,3rem)] text-ink-900">
            Follow one cubic meter from the plant to the customer
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-steel-600">
            See how our departments work together at every stop along the way.
          </p>
          <Link
            href="/operations"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink-900 px-8 py-3.5 font-label text-base font-semibold text-paper-50 transition-colors hover:bg-accent-600"
          >
            How we work <span aria-hidden>→</span>
          </Link>
        </ScrollReveal>
      </section>

      <CTASection />
    </>
  );
}
