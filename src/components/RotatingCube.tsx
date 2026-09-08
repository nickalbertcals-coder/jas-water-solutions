"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Face = { key: string; label: string; image: string };

const FACES: Face[] = [
  { key: "front", label: "Water Treatment", image: "/images/photos/treatment_aerial.jpg" },
  { key: "right", label: "Field Monitoring", image: "/images/photos/worker_tablet.jpg" },
  { key: "back", label: "Field Operations", image: "/images/photos/workers_orange.jpg" },
  { key: "left", label: "Hydraulic Engineering", image: "/images/photos/blueprint_review.jpg" },
  { key: "top", label: "Meter Reading", image: "/images/photos/meter_reading.jpg" },
  { key: "bottom", label: "Digital Systems", image: "/images/photos/digital_tech.jpg" },
];

function faceTransform(key: string, half: number) {
  switch (key) {
    case "front":
      return `translateZ(${half}px)`;
    case "back":
      return `rotateY(180deg) translateZ(${half}px)`;
    case "right":
      return `rotateY(90deg) translateZ(${half}px)`;
    case "left":
      return `rotateY(-90deg) translateZ(${half}px)`;
    case "top":
      return `rotateX(90deg) translateZ(${half}px)`;
    case "bottom":
      return `rotateX(-90deg) translateZ(${half}px)`;
    default:
      return "";
  }
}

/**
 * A slowly rotating 3D cube showcasing six facets of JAS's water
 * operations — built with real CSS 3D transforms (perspective +
 * preserve-3d), not an image or video. Pauses on hover so a visitor
 * can actually read a face; settles into a static isometric view
 * when the visitor prefers reduced motion.
 */
export default function RotatingCube({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      setSize(Math.round(w * 0.68));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;

    if (prefersReducedMotion()) {
      gsap.set(cube, { rotateX: -18, rotateY: -28 });
      return;
    }

    gsap.set(cube, { rotateX: -18, rotateY: 0 });
    const tween = gsap.to(cube, {
      rotateY: "+=360",
      duration: 28,
      ease: "none",
      repeat: -1,
    });

    const pause = () => tween.pause();
    const resume = () => tween.resume();
    cube.addEventListener("mouseenter", pause);
    cube.addEventListener("mouseleave", resume);
    cube.addEventListener("focusin", pause);
    cube.addEventListener("focusout", resume);

    return () => {
      tween.kill();
      cube.removeEventListener("mouseenter", pause);
      cube.removeEventListener("mouseleave", resume);
      cube.removeEventListener("focusin", pause);
      cube.removeEventListener("focusout", resume);
    };
  }, []);

  const half = size / 2;

  return (
    <div
      ref={containerRef}
      className={`relative aspect-square w-full ${className ?? ""}`}
      style={{ perspective: "1600px" }}
    >
      <div
        ref={cubeRef}
        tabIndex={0}
        role="img"
        aria-label="A rotating cube showcasing water treatment, field monitoring, field operations, hydraulic engineering, meter reading, and digital systems"
        className="absolute left-1/2 top-1/2 outline-none"
        style={{
          width: size,
          height: size,
          marginLeft: -half,
          marginTop: -half,
          transformStyle: "preserve-3d",
        }}
      >
        {FACES.map((face) => (
          <div
            key={face.key}
            className="absolute inset-0 overflow-hidden border border-white/20"
            style={{
              backgroundImage: `url(${face.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: faceTransform(face.key, half),
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/85 via-ink-900/15 to-transparent px-3 pb-2 pt-6">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-paper-50">
                {face.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
