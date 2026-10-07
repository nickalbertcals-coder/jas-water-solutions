import Image from "next/image";
import Link from "next/link";
import BackToTop from "@/components/BackToTop";
import { company, contact, services } from "@/lib/data";

const COMPANY_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/operations", label: "How We Work" },
  { href: "/team", label: "Our Team" },
  { href: "/contact", label: "Contact Us" },
];

const SHORT: Record<string, string> = {
  "om-level-iii": "Operations & Maintenance",
  "bulk-water-supply": "Bulk Water Supply",
  "hydraulic-modeling": "Hydraulic Modeling",
  "bulk-water-retail": "Bulk Water Retail",
  "technical-consultancy": "Technical Consultancy",
};

const FACTS = ["Level III distribution systems", "24/7 digitized monitoring", "14 operating departments"];

const linkCls = "group inline-flex items-center text-base text-paper-50/75 transition-colors hover:text-paper-50";
const Dash = () => <span aria-hidden className="mr-0 h-px w-0 bg-accent-500 transition-all duration-300 group-hover:mr-2 group-hover:w-3" />;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#05182b_0%,#02101b_100%)] text-paper-50">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(76,201,232,0.7),transparent)]" />
      <svg aria-hidden viewBox="0 0 800 800" className="pointer-events-none absolute -right-72 -top-72 h-[52rem] w-[52rem] text-accent-500">
        {[120, 200, 280, 360, 440].map((r, i) => (
          <circle key={r} cx="400" cy="400" r={r} fill="none" stroke="currentColor" strokeOpacity={0.16 - i * 0.025} />
        ))}
      </svg>
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(62,224,180,0.1),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8 sm:pt-20">
        {/* statement */}
        <div className="flex flex-col gap-10 border-b border-white/12 pb-14 lg:flex-row lg:items-end lg:justify-between">
          <p className="font-statement max-w-3xl text-balance text-[clamp(2rem,4.2vw,3.6rem)]">
            Digitized water systems. Managed with precision.{" "}
            <span className="text-water">Built for sustainability.</span>
          </p>
          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-accent-500 py-2.5 pl-7 pr-2.5 font-label text-base font-bold text-void transition-colors hover:bg-paper-50 lg:self-auto"
          >
            Request a consultation
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-void text-accent-500 transition-transform duration-500 group-hover:rotate-45">
              <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12 12 4M5.5 4H12v6.5" />
              </svg>
            </span>
          </Link>
        </div>

        {/* columns */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1.2fr] lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Image src="/images/logo.png" alt={company.name} width={168} height={78} className="h-14 w-auto brightness-0 invert" />
            <p className="mt-5 max-w-xs text-pretty text-base leading-relaxed text-paper-50/70">
              Professional operation and maintenance of Level III water distribution systems — from the reservoir to your tap.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {FACTS.map((f) => (
                <li key={f} className="rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1.5 font-label text-[0.8125rem] font-semibold text-paper-50/85">
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Company">
            <h3 className="font-label text-base font-bold text-accent-500">Company</h3>
            <ul className="mt-5 space-y-3.5">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    <Dash />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h3 className="font-label text-base font-bold text-accent-500">Services</h3>
            <ul className="mt-5 space-y-3.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className={linkCls}>
                    <Dash />
                    {SHORT[s.slug] ?? s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-label text-base font-bold text-accent-500">Get in touch</h3>
            <ul className="mt-5 space-y-4 text-base text-paper-50/80">
              <li className="flex gap-3">
                <svg aria-hidden viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 text-accent-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2.5" />
                  <path d="m3.5 7 8.5 6 8.5-6" />
                </svg>
                <a href={`mailto:${contact.email}`} className="break-all transition-colors hover:text-paper-50">
                  {contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <svg aria-hidden viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 text-accent-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                {contact.location}
              </li>
            </ul>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-paper-50/60">
              Serving Water Districts, Local Government Units, industrial clients, and communities.
            </p>
          </div>
        </div>

        {/* base line */}
        <div className="flex flex-col gap-5 border-t border-white/12 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 font-label text-sm text-paper-50/65">
            <p>
              &copy; {new Date().getFullYear()} {company.name} All rights reserved.
            </p>
            <p>Operation &amp; Maintenance of Level III Water Distribution Systems</p>
          </div>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
