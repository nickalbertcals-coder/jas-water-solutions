"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Face = {
  key: string;
  label: string;
  image: string;
  /** Y-rotation (deg) this face's normal points at when the cube is unrotated — only set for the 4 side faces, used to compute lighting as the cube spins. */
  yAngle?: number;
  /** Fixed lighting for faces whose orientation doesn't change under Y rotation (top/bottom). */
  staticShade?: number;
};

const FACES: Face[] = [
  { key: "front", label: "Water Treatment", image: "/images/photos/treatment_aerial.jpg", yAngle: 0 },
  { key: "right", label: "Field Monitoring", image: "/images/photos/worker_tablet.jpg", yAngle: 90 },
  { key: "back", label: "Field Operations", image: "/images/photos/workers_orange.jpg", yAngle: 180 },
  { key: "left", label: "Hydraulic Engineering", image: "/images/photos/blueprint_review.jpg", yAngle: 270 },
  { key: "top", label: "Meter Reading", image: "/images/photos/meter_reading.jpg", staticShade: 0 },
  { key: "bottom", label: "Digital Systems", image: "/images/photos/digital_tech.jpg", staticShade: 0.4 },
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

/** 0 (facing the viewer, lit) .. 1 (facing away, in shadow), as a face with the given base yAngle spins with the cube. */
function sideDarkness(yAngle: number, cubeRotateY: number) {
  const angle = (((yAngle + cubeRotateY) % 360) + 360) % 360;
  const facing = Math.cos((angle * Math.PI) / 180); // 1 = toward viewer, -1 = away
  return (1 - facing) / 2;
}

/**
 * A slowly rotating 3D cube showcasing six facets of JAS's water
 * operations — built with real CSS 3D transforms (perspective +
 * preserve-3d), not an image or video. Faces are semi-transparent,
 * frosted panels rather than flat photos, and each is dynamically
 * shaded as it turns — the two faces angled toward the viewer read
 * brighter, the two turning away darken, so the lighting itself
 * sells the rotation instead of just the shape. A soft ground
 * shadow breathes in sync. Pauses on hover/focus so a visitor can
 * actually read a face; settles into a static isometric view when
 * the visitor prefers reduced motion.
 */
export default function RotatingCube({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const shadeRefs = useRef<Record<string, HTMLDivElement | null>>({});
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

    const applyShading = (cubeRotateY: number) => {
      for (const face of FACES) {
        const shade = shadeRefs.current[face.key];
        if (!shade) continue;
        const darkness = face.yAngle !== undefined ? sideDarkness(face.yAngle, cubeRotateY) : (face.staticShade ?? 0);
        shade.style.opacity = `${Math.max(0, Math.min(1, darkness)) * 0.55}`;
      }
      if (shadowRef.current) {
        const breathe = 0.94 + 0.06 * Math.abs(Math.cos((cubeRotateY * Math.PI) / 180));
        shadowRef.current.style.transform = `translateX(-50%) scaleX(${breathe})`;
      }
    };

    if (prefersReducedMotion()) {
      const angle = -28;
      gsap.set(cube, { rotateX: -18, rotateY: angle });
      applyShading(angle);
      return;
    }

    gsap.set(cube, { rotateX: -18, rotateY: 0 });
    applyShading(0);

    const tween = gsap.to(cube, {
      rotateY: "+=360",
      duration: 28,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        applyShading(Number(gsap.getProperty(cube, "rotateY")));
      },
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
      {/* soft grounded shadow, outside the rotating 3D group so it stays on the "floor" */}
      <div
        ref={shadowRef}
        className="pointer-events-none absolute bottom-[6%] left-1/2 h-6 w-[62%] rounded-[50%] bg-ink-900/25 blur-xl"
        style={{ transform: "translateX(-50%)" }}
      />

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
            className="absolute inset-0 overflow-hidden border border-white/25"
            style={{
              transform: faceTransform(face.key, half),
              backfaceVisibility: "hidden",
            }}
          >
            {/* photo, semi-transparent */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${face.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.55,
              }}
            />
            {/* frosted paper wash, ties the panel to the site's palette */}
            <div className="absolute inset-0 bg-paper-50/30" />
            {/* dynamic lighting — darkens as the face turns away from the viewer */}
            <div
              ref={(el) => {
                shadeRefs.current[face.key] = el;
              }}
              className="absolute inset-0 bg-ink-900"
              style={{ opacity: 0 }}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent px-3 pb-2 pt-6">
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
