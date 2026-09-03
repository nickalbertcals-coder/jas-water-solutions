import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import TeamCard from "@/components/TeamCard";
import CTASection from "@/components/CTASection";
import { about, differentiators, services, team, vision, mission } from "@/lib/data";
import { assetPath } from "@/lib/basePath";

const HERO_STATS = [
  { value: "Level III", label: "Water Distribution Systems" },
  { value: "24/7", label: "Digitized Monitoring" },
  { value: "7", label: "Leadership Specialists" },
];

const leadershipPreview = team.slice(0, 3);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="brand-gradient relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 10%, rgba(143,220,245,0.25), transparent 40%), radial-gradient(circle at 90% 30%, rgba(79,195,236,0.18), transparent 45%)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-300">
              Water Utility Operations &amp; Maintenance
            </span>
            <h1 className="font-heading mt-6 text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-[3.25rem]">
              Digitized Water Systems.
              <br />
              Managed with Precision.
              <br />
              <span className="brand-gradient-text bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
                Built for Sustainability.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              JAS Water Solutions Inc. delivers end-to-end Operation &amp;
              Maintenance of Level III water distribution systems — from
              network operations and preventive maintenance to computerized
              billing, collection, and Non-Revenue Water reduction.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-white px-7 py-3 text-center text-sm font-semibold text-navy-900 transition-transform hover:scale-105"
              >
                Get in Touch
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-white/30 px-7 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Our Core Services
              </Link>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-8">
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-heading text-2xl font-bold text-white">
                    {stat.value}
                  </dd>
                  <p className="mt-1 text-xs leading-snug text-white/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/10">
              <Image
                src={assetPath("/images/photos/treatment_aerial.jpg")}
                alt="Water treatment facility operated by JAS Water Solutions"
                fill
                priority
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -left-6 -top-6 hidden w-56 rounded-2xl bg-white p-4 shadow-xl sm:block">
              <div className="relative h-28 w-full overflow-hidden rounded-xl">
                <Image
                  src={assetPath("/images/photos/worker_tablet.jpg")}
                  alt="Field technician monitoring water operations digitally"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-xs font-semibold text-navy-950">
                Real-time field monitoring
              </p>
            </div>
            <div className="absolute -bottom-6 -right-4 hidden w-48 rounded-2xl bg-white/95 p-4 shadow-xl sm:block">
              <p className="font-heading text-2xl font-bold text-blue-700">KPI</p>
              <p className="mt-1 text-xs leading-snug text-slate-600">
                Transparent, data-driven performance management
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About snapshot */}
      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src={assetPath("/images/photos/hand_water.jpg")}
                alt="Clean potable water delivered by JAS Water Solutions"
                fill
                sizes="(min-width: 1024px) 560px, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden w-52 rounded-2xl border border-black/5 bg-white p-5 shadow-lg sm:block">
              <p className="font-heading text-lg font-bold text-navy-950">
                Level III O&amp;M
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Full-scope operation and maintenance for water distribution
                systems.
              </p>
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="About Us" title="A disciplined, technology-driven water utility partner" />
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              {about.paragraphs[0]}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {about.paragraphs[1]}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-tint-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  Vision
                </p>
                <p className="mt-2 text-sm leading-relaxed text-navy-950/80">
                  {vision}
                </p>
              </div>
              <div className="rounded-xl bg-tint-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  Mission
                </p>
                <p className="mt-2 text-sm leading-relaxed text-navy-950/80">
                  {mission}
                </p>
              </div>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              More about JAS Water Solutions
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-pad bg-tint-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Core Services"
            title="Integrated water management, end to end"
            description="From daily distribution operations to hydraulic engineering and digital transformation — sustainable, cost-effective solutions for utilities, LGUs, and industry."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard service={service} index={i} key={service.slug} />
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Why JAS"
            title="Operational control, accountability, measurable results"
            description="Our approach is anchored on digitized platforms, real-time monitoring, and transparent KPI-based performance management."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item, i) => (
              <div
                key={item.title}
                className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
              >
                <span className="font-heading text-3xl font-bold text-cyan-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading mt-4 text-base font-semibold text-navy-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership preview */}
      <section className="section-pad bg-tint-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Our Team"
              title="Leadership built on utility expertise"
              description="Engineers, finance professionals, and legal specialists guiding every operation."
            />
            <Link
              href="/team"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-navy-900/15 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:bg-white"
            >
              Meet the full team
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadershipPreview.map((member) => (
              <TeamCard member={member} key={member.slug} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
