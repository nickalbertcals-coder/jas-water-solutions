import Eyebrow from "@/components/Eyebrow";
import Link from "next/link";
import ScrollReveal from "@/components/motion/ScrollReveal";

export default function CTASection() {
  return (
    <section className="relative isolate overflow-hidden bg-void">
      <div className="contours" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(23,75,114,0.3)_0%,transparent_48%),radial-gradient(ellipse_at_80%_80%,transparent_20%,rgba(3,18,31,0.85)_100%)]"
      />
      <ScrollReveal
        as="div"
        selector=":scope > *"
        y={26}
        stagger={0.12}
        className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32"
      >
        <Eyebrow tone="light">Start a conversation</Eyebrow>
        <h2 className="font-statement mt-6 max-w-5xl text-balance text-[clamp(2.4rem,5.6vw,5.4rem)] font-semibold text-paper-50">
          Ready for a professionally managed <span className="text-water">water utility?</span>
        </h2>
        <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-paper-50/78 sm:text-xl">
          Let&apos;s talk about how digitized operations, transparent revenue management, and
          disciplined O&amp;M can strengthen your water service delivery.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-accent-500 px-8 py-3.5 text-center font-label text-base font-bold text-void transition-colors hover:bg-paper-50"
          >
            Talk to our team
          </Link>
          <Link
            href="/services"
            className="rounded-full border border-white/30 px-8 py-3.5 text-center font-label text-base font-semibold text-paper-50 transition-colors hover:border-paper-50 hover:bg-white/10"
          >
            Explore our services
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
