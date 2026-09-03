import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/data";
import { assetPath } from "@/lib/basePath";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={assetPath(service.image)}
          alt={service.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/0 to-transparent" />
        <span className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-blue-700">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="font-heading text-lg font-semibold text-navy-950">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-600">{service.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-blue-600 group-hover:text-cyan-400">
          Learn more
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform group-hover:translate-x-1"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
