"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Looping water footage for the right side of the call-to-action band.
 * Light on the page by design: an 8-second, ~1.3 MB, muted loop; nothing is
 * downloaded until the band is near the screen; it pauses whenever it is off
 * screen; and phones, data-saver mode and reduced-motion visitors get only the
 * still poster. The left edge fades into the section so copy stays on dark.
 */
const FADE = "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 22%, #000 62%)";

export default function CTAVideo({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const ok =
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !conn?.saveData;
    if (!ok) return;

    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (entry.isIntersecting) {
          setEnabled(true); // mounts the <video> (and starts the download) on first approach
          v?.play().catch(() => {});
        } else {
          v?.pause();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 right-0 hidden w-[68%] lg:block ${className}`}
      style={{ WebkitMaskImage: FADE, maskImage: FADE }}
    >
      {/* the poster doubles as the still frame for anyone who doesn't get the video */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/cta-water-poster.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
      {enabled && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/cta-water.mp4"
          poster="/images/cta-water-poster.jpg"
          muted
          loop
          playsInline
          preload="auto"
          autoPlay
          disablePictureInPicture
        />
      )}
      {/* tint + vignette so the footage sits in the blue palette */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,24,43,0.35)_0%,rgba(5,24,43,0.05)_50%,rgba(5,24,43,0.5)_100%)]" />
    </div>
  );
}
