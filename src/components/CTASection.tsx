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
        <span className="inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent-500">
          <span className="h-px w-8 bg-current" />
          Start a conversation
        </span>
        <h2 className="font-statement mt-6 max-w-5xl text-balance text-[clamp(3rem,8vw,8rem)] font-semibold text-paper-50">
          Ready for a professionally managed <span className="text-water">water utility?</span>
        </h2>
        <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-paper-50/65 sm:text-xl">
          Let&apos;s talk about how digitized operations, transparent revenue management, and
          disciplined O&amp;M can strengthen your water service delivery.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="border border-paper-50 bg-paper-50 px-8 py-4 text-center font-mono text-xs font-medium uppercase tracking-[0.08em] text-ink-900 transition-colors hover:border-accent-500 hover:bg-accent-500"
          >
            Talk to our team
          </Link>
          <Link
            href="/services"
            className="border border-white/25 px-8 py-4 text-center font-mono text-xs font-medium uppercase tracking-[0.08em] text-paper-50 transition-colors hover:border-paper-50"
          >
            Explore our services
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
