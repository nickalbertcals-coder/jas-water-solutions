import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/motion/ScrollReveal";
import type { Service } from "@/lib/data";

/** Column spans on the 12-col desktop grid: 7+5, 5+7, then one full-width card. */
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-12"];

/**
 * Core services as a bento of photo cards. Every card shows its photo and
 * copy all the time — nothing appears on hover except a gentle lift, a slow
 * photo zoom and the arrow lighting up — so it reads the same on a laptop,
 * a tablet and a phone.
 */
export default function ServiceList({ services }: { services: Service[] }) {
  return (
    <ScrollReveal as="div" selector=":scope > a" y={34} stagger={0.1} className="grid gap-5 lg:grid-cols-12 lg:gap-6">
      {services.map((service, i) => {
        const wide = service.subItems && SPANS[i] === "lg:col-span-12";
        return (
          <Link
            key={service.slug}
            href={`/services#${service.slug}`}
            className={`group relative isolate flex min-h-[22rem] overflow-hidden rounded-[1.75rem] bg-ink-900 shadow-[0_30px_60px_-34px_rgba(10,39,64,0.7)] ring-1 ring-ink-900/10 transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_70px_-30px_rgba(10,114,154,0.55)] focus-visible:-translate-y-1.5 lg:min-h-[26rem] ${SPANS[i] ?? "lg:col-span-6"} ${wide ? "lg:min-h-[19rem]" : ""}`}
          >
            <Image
              src={service.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,24,43,0.2)_0%,rgba(5,24,43,0.5)_42%,rgba(3,14,26,0.95)_100%)]"
            />
            <div aria-hidden className="absolute inset-0 bg-accent-600/10 mix-blend-multiply" />

            <span className="absolute left-6 top-6 inline-flex h-10 items-center rounded-full border border-white/25 bg-white/10 px-4 font-label text-sm font-bold text-paper-50 backdrop-blur-md sm:left-8 sm:top-8">
              {String(i + 1).padStart(2, "0")}
            </span>

            <span
              aria-hidden
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-paper-50 backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:border-accent-500 group-hover:bg-accent-500 group-hover:text-void sm:right-8 sm:top-8"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 14 14 4M6 4h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>

            <div className={`relative mt-auto w-full p-6 pt-28 text-paper-50 sm:p-8 sm:pt-28 ${wide ? "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-12" : ""}`}>
              <div>
                <h3 className="font-display text-balance text-2xl font-bold leading-tight sm:text-[1.75rem]">{service.title}</h3>
                <p className="mt-3 max-w-lg text-pretty text-base leading-relaxed text-paper-50/85">{service.summary}</p>
              </div>
              {service.subItems && (
                <ul className="mt-5 flex flex-wrap gap-2 lg:mt-0 lg:justify-end">
                  {service.subItems.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 font-label text-[0.8125rem] font-semibold text-paper-50 backdrop-blur-md"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Link>
        );
      })}
    </ScrollReveal>
  );
}
