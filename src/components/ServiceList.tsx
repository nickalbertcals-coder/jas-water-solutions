"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import type { Service } from "@/lib/data";

/**
 * Services as an editorial index: oversized signage-style rows instead of
 * a grid of cards. On hover-capable screens a photo of the service follows
 * the cursor; other rows recede so the one you're on reads clearly. On
 * touch screens the rows simply link through with a thumbnail.
 */
export default function ServiceList({ services }: { services: Service[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const moveX = useRef<((v: number) => void) | null>(null);
  const moveY = useRef<((v: number) => void) | null>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    moveX.current = gsap.quickTo(preview, "x", { duration: 0.55, ease: "power3.out" });
    moveY.current = gsap.quickTo(preview, "y", { duration: 0.55, ease: "power3.out" });
  }, []);

  function handleMove(e: React.MouseEvent) {
    const list = listRef.current;
    if (!list) return;
    const rect = list.getBoundingClientRect();
    moveX.current?.(e.clientX - rect.left + 28);
    moveY.current?.(e.clientY - rect.top - 120);
  }

  return (
    <div
      ref={listRef}
      className="relative border-t border-ink-900/20"
      onMouseMove={handleMove}
      onMouseLeave={() => setActive(null)}
    >
      {services.map((service, i) => {
        const dimmed = active !== null && active !== i;
        return (
          <Link
            key={service.slug}
            href={`/services#${service.slug}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            className={`group grid grid-cols-[2.75rem_1fr] items-center gap-x-4 gap-y-3 border-b border-ink-900/20 py-7 transition-opacity duration-300 sm:grid-cols-[4rem_1fr_auto] sm:py-9 lg:grid-cols-[5rem_minmax(0,1.9fr)_minmax(0,1fr)_2.5rem] ${
              dimmed ? "opacity-35" : "opacity-100"
            }`}
          >
            <span className="font-label text-sm tabular-nums text-accent-600">
              §{String(i + 1).padStart(2, "0")}
            </span>

            <h3 className="font-statement text-[clamp(1.7rem,3vw,2.6rem)] font-semibold text-ink-900 transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:text-accent-600">
              {service.title}
            </h3>

            <p className="col-span-2 col-start-2 max-w-md text-base leading-relaxed text-steel-600 sm:col-span-1 sm:col-start-auto sm:max-w-xs lg:max-w-none">
              {service.summary}
            </p>

            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              className="hidden justify-self-end text-ink-900 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-600 lg:block"
              aria-hidden
            >
              <path d="M7 21 21 7M10 7h11v11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
            </svg>
          </Link>
        );
      })}

      {/* cursor-following preview — only on devices that can hover */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 hidden aspect-[4/3] w-[22rem] overflow-hidden shadow-[0_30px_60px_-20px_rgba(3,18,31,0.55)] [@media(hover:hover)]:block"
        style={{ opacity: active === null ? 0 : 1, transition: "opacity 0.25s ease" }}
      >
        {services.map((service, i) => (
          <Image
            key={service.slug}
            src={service.image}
            alt=""
            fill
            sizes="352px"
            className={`object-cover transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
    </div>
  );
}
