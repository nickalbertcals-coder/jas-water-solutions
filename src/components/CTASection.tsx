import Link from "next/link";
import HydraulicSchematic from "./HydraulicSchematic";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-ink-900">
      <HydraulicSchematic
        tone="paper"
        className="pointer-events-none absolute -right-16 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 opacity-[0.08] lg:block"
      />
      <div className="section-pad relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-5 text-center sm:px-8">
        <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-signal-500">
          <span className="h-2.5 w-[3px] bg-signal-500" />
          Start a conversation
        </span>
        <h2 className="font-display text-balance text-3xl font-semibold text-paper-50 sm:text-4xl">
          Ready for a professionally managed water utility?
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-paper-50/70 sm:text-lg">
          Let&apos;s talk about how digitized operations, transparent revenue
          management, and disciplined O&amp;M can strengthen your water
          service delivery.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="rounded border border-paper-50 bg-paper-50 px-7 py-3 font-mono text-xs font-medium uppercase tracking-[0.06em] text-ink-900 transition-colors hover:bg-transparent hover:text-paper-50"
          >
            Talk to Our Team
          </Link>
          <Link
            href="/services"
            className="rounded border border-signal-500 px-7 py-3 font-mono text-xs font-medium uppercase tracking-[0.06em] text-signal-500 transition-colors hover:bg-signal-500 hover:text-ink-900"
          >
            Explore Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
