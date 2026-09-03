import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/data";
import { assetPath } from "@/lib/basePath";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = `§${String(index + 1).padStart(2, "0")}`;
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group flex flex-col overflow-hidden bg-white transition-colors hover:bg-paper-50"
    >
      <div className="relative h-40 w-full overflow-hidden border-b border-line">
        <Image
          src={assetPath(service.image)}
          alt={service.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover grayscale-[15%] transition-[filter] duration-300 group-hover:grayscale-0"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <span className="font-mono text-xs font-medium tracking-[0.06em] text-signal-600">
          {ref}
        </span>
        <h3 className="font-display text-lg font-semibold text-ink-900">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-steel-600">{service.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 font-mono text-xs font-medium uppercase tracking-[0.06em] text-ink-900 group-hover:text-signal-600">
          View detail
          <svg
            width="12"
            height="12"
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
