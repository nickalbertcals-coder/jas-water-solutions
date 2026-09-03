import Image from "next/image";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import { services } from "@/lib/data";
import { assetPath } from "@/lib/basePath";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Operations & Maintenance of Level III water systems, bulk water supply, hydraulic modeling, bulk water retail, and technical consultancy from JAS Water Solutions Inc.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="brand-gradient relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 15%, rgba(143,220,245,0.25), transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-300">
            Core Services
          </span>
          <h1 className="font-heading mt-6 text-4xl font-bold text-white sm:text-5xl">
            Innovative, sustainable, cost-effective water management
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
            Integrated engineering, operations, technical consultancy, and
            water supply services for water utilities, government agencies,
            and private sector clients.
          </p>
        </div>
      </section>

      <div className="divide-y divide-black/5">
        {services.map((service, i) => {
          const reversed = i % 2 === 1;
          return (
            <section
              key={service.slug}
              id={service.slug}
              className="section-pad scroll-mt-24"
            >
              <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div
                  className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
                    reversed ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={assetPath(service.image)}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 560px, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-heading text-sm font-bold text-cyan-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-heading mt-2 text-2xl font-bold text-navy-950 sm:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-600">
                      {service.description}
                    </p>
                    {service.subItems && (
                      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                        {service.subItems.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2.5 rounded-lg bg-tint-50 p-3 text-sm text-navy-950/80"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <CTASection />
    </>
  );
}
