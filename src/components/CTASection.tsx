import Link from "next/link";

export default function CTASection() {
  return (
    <section className="brand-gradient relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(143,220,245,0.25), transparent 45%), radial-gradient(circle at 85% 80%, rgba(79,195,236,0.2), transparent 40%)",
        }}
      />
      <div className="section-pad relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-5 text-center sm:px-8">
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          Ready for a professionally managed water utility?
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
          Let&apos;s talk about how digitized operations, transparent revenue
          management, and disciplined O&amp;M can strengthen your water
          service delivery.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-navy-900 transition-transform hover:scale-105"
          >
            Talk to Our Team
          </Link>
          <Link
            href="/services"
            className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Explore Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
