import Link from "next/link";
import CTAVideo from "@/components/CTAVideo";
import Eyebrow from "@/components/Eyebrow";
import Magnetic from "@/components/motion/Magnetic";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { contact } from "@/lib/data";

const CHIPS = [
  { label: "O&M partnerships", pos: "left-0 top-[14%]", delay: "0s" },
  { label: "Bulk water supply", pos: "right-0 top-[34%]", delay: "-2s" },
  { label: "Technical consultancy", pos: "left-[6%] bottom-[12%]", delay: "-4s" },
];

export default function CTASection() {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#05182b_0%,#0a3d63_55%,#0b5f86_100%)] text-paper-50">
      <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 -z-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.28),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-24 -z-10 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(62,224,180,0.16),transparent)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)]" />
      <CTAVideo className="-z-10" />

      <ScrollReveal as="div" y={40} className="relative">
        <div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-14 pt-20 sm:px-8 sm:pt-24 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-6 lg:pb-20 lg:pt-28">
            <div>
              <Eyebrow tone="light">Start a conversation</Eyebrow>
              <h2 className="font-statement mt-6 max-w-3xl text-balance text-[clamp(2.1rem,3.8vw,3.5rem)]">
                Ready for a professionally managed <span className="text-water">water utility?</span>
              </h2>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-paper-50/80">
                Let&apos;s talk about how digitized operations, transparent revenue management, and disciplined O&amp;M can strengthen your water service delivery.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Magnetic strength={0.2}>
                  <Link
                    href="/contact"
                    className="btn-sheen group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-accent-500 py-3 pl-8 pr-3 font-label text-base font-bold text-void shadow-[0_20px_44px_-16px_rgba(76,201,232,0.9)] transition-colors hover:bg-paper-50 sm:w-auto"
                  >
                    Talk to our team
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-void text-accent-500 transition-transform duration-500 group-hover:rotate-45">
                      <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12 12 4M5.5 4H12v6.5" />
                      </svg>
                    </span>
                  </Link>
                </Magnetic>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-[1.0625rem] text-center font-label text-base font-semibold transition-colors hover:border-paper-50 hover:bg-white/10"
                >
                  Explore our services
                </Link>
              </div>
            </div>

            {/* ripple + floating topic chips */}
            <div aria-hidden className="relative mx-auto hidden aspect-square w-full max-w-[26rem] lg:block">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="ring-pulse absolute inset-[28%] rounded-full border-2 border-accent-500/70" style={{ animationDelay: `${i * 0.9}s`, animationDuration: "3.6s" }} />
              ))}
              <span className="float-y absolute inset-[34%] flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#4cc9e8,#3ee0b4)] shadow-[0_30px_70px_-16px_rgba(76,201,232,0.9)]">
                <svg viewBox="0 0 24 24" className="h-1/2 w-1/2 text-void" fill="currentColor">
                  <path d="M12 2.5c-.3 0-.6.2-.8.4C9 5.6 5 10.2 5 14.5a7 7 0 0 0 14 0c0-4.3-4-8.9-6.2-11.6-.2-.2-.5-.4-.8-.4Z" />
                </svg>
              </span>
              {CHIPS.map((c) => (
                <span
                  key={c.label}
                  className={`jfloat absolute ${c.pos} whitespace-nowrap rounded-full border border-white/25 bg-[#06223a]/70 px-4 py-2 font-label text-sm font-semibold text-paper-50 shadow-[0_18px_36px_-16px_rgba(0,0,0,0.8)] backdrop-blur-md`}
                  style={{ animationDelay: c.delay }}
                >
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-live-500 align-middle" />
                  {c.label}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-white/12 bg-[#04121f]/70 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-[0.95rem] text-paper-50/80 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2.5 font-semibold text-paper-50 transition-colors hover:text-accent-500">
              <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-accent-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <path d="m3.5 7 8.5 6 8.5-6" />
              </svg>
              {contact.email}
            </a>
            <p>We typically respond within one to two business days.</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
