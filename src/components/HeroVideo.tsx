"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Hero background video: an ambient, muted, looping clip of JAS's
 * water operations. Falls back to a static poster frame if the
 * visitor prefers reduced motion, if the video source isn't present
 * yet, or if autoplay is blocked by the browser.
 *
 * Drop the generated clip at /public/videos/hero.mp4 — everything
 * else (poster fallback, reduced motion, mobile behavior) is already
 * wired up.
 */
export default function HeroVideo({ className }: { className?: string }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const showVideo = !reducedMotion && !videoFailed;

  return (
    <div className={`relative overflow-hidden border border-white/10 ${className ?? ""}`}>
      {showVideo ? (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/photos/treatment_aerial.jpg"
          onError={() => setVideoFailed(true)}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      ) : (
        <Image
          src="/images/photos/treatment_aerial.jpg"
          alt="JAS Water Solutions treatment facility"
          fill
          sizes="(min-width: 1024px) 560px, 90vw"
          className="object-cover"
          priority
        />
      )}

      {/* vignette so the frame melts into the black hero background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 90px 40px rgba(0,0,0,0.55)" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />

      <p className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-paper-50/80">
        Water Treatment Operations
      </p>
    </div>
  );
}
