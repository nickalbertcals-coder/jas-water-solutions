"use client";

import { useEffect, useState } from "react";
import HydraulicSchematic from "./HydraulicSchematic";

const EDGE_FADE =
  "radial-gradient(ellipse at center, black 55%, transparent 88%)";
const VIDEO_SRC = "/videos/hero.mp4";

/**
 * Hero background video: an ambient, muted, looping clip meant to
 * blend directly into the black hero — no frame, no border. Edges
 * are masked with a radial fade so it dissolves into the section
 * rather than reading as a boxed video, regardless of what's near
 * the edge of the source clip.
 *
 * Until /public/videos/hero.mp4 exists (or if it fails to load, or
 * the visitor prefers reduced motion), this renders the site's own
 * glowing hydraulic schematic instead — the same visual language the
 * video is meant to extend, so the hero looks intentional either way.
 *
 * Presence is checked with a HEAD request rather than the video
 * element's `error` event: browsers don't reliably fire that event
 * for a plain missing file, so relying on it left this silently
 * rendering an empty box with no fallback.
 */
export default function HeroVideo({ className }: { className?: string }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoAvailable, setVideoAvailable] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    let cancelled = false;
    fetch(VIDEO_SRC, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setVideoAvailable(res.ok);
      })
      .catch(() => {
        if (!cancelled) setVideoAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const showVideo = videoAvailable && !reducedMotion;

  return (
    <div className={`relative ${className ?? ""}`}>
      {showVideo ? (
        <video
          className="h-full w-full object-cover"
          style={{ WebkitMaskImage: EDGE_FADE, maskImage: EDGE_FADE }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setVideoAvailable(false)}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      ) : (
        <>
          <HydraulicSchematic tone="paper" interactive className="h-full w-full" />
          <p className="pointer-events-none absolute bottom-0 right-1 font-mono text-[10px] uppercase tracking-[0.06em] text-paper-50/40">
            Hover the network to explore
          </p>
        </>
      )}
    </div>
  );
}
