"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  className?: string;
  tone?: "ink" | "paper";
};

/**
 * Signature graphic: a stylized hydraulic distribution-network schematic
 * (reservoir, booster, trunk main, DMA branches) in the drafting style of
 * an EPANET model — the actual diagram type JAS's engineers produce.
 * Draws itself in on scroll, using each path's real length so the line
 * weight and dash spacing stay correct at any size.
 */
export default function HydraulicSchematic({ className, tone = "ink" }: Props) {
  const stroke = tone === "ink" ? "#16283a" : "#eef2f2";
  const dim = tone === "ink" ? "#5f7080" : "#9fb0b8";
  const label = tone === "ink" ? "#3a4a58" : "#c7d2d6";

  const svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll<SVGPathElement>(".sig-path");
    const nodes = svg.querySelectorAll<SVGElement>(".sig-node");
    const liveRing = svg.querySelector<SVGCircleElement>(".sig-live-ring");
    const liveDot = svg.querySelector<SVGCircleElement>(".sig-live-dot");

    if (prefersReducedMotion()) {
      gsap.set([paths, nodes], { opacity: 1 });
      paths.forEach((p) => p.style.removeProperty("stroke-dasharray"));
      return;
    }

    const ctx = gsap.context(() => {
      paths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });
      gsap.set(nodes, { opacity: 0, scale: 0.6, transformOrigin: "center" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 80%", once: true },
      });

      tl.to(paths, {
        strokeDashoffset: 0,
        duration: 0.9,
        ease: "power2.inOut",
        stagger: 0.16,
      }).to(
        nodes,
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.4)", stagger: 0.06 },
        "-=0.7"
      );

      if (liveRing && liveDot) {
        tl.call(() => {
          gsap.to(liveRing, {
            scale: 1.9,
            opacity: 0,
            duration: 1.6,
            ease: "power1.out",
            repeat: -1,
            transformOrigin: "center",
          });
          gsap.to(liveDot, {
            scale: 1.15,
            duration: 0.8,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
            transformOrigin: "center",
          });
        });
      }
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 560 460"
      fill="none"
      className={className}
      role="img"
      aria-label="Schematic diagram of a water distribution network: reservoir, booster pump, trunk main, and monitored distribution zones"
    >
      <style>{`text { font-family: var(--font-plex-mono), monospace; }`}</style>
      {/* trunk main */}
      <path d="M76 96 H240 V196" stroke={stroke} strokeWidth="2" className="sig-path" />
      <path d="M240 196 V300" stroke={stroke} strokeWidth="2" className="sig-path" />
      {/* branch to DMA-01 */}
      <path d="M240 196 H392 V150" stroke={dim} strokeWidth="1.5" className="sig-path" />
      {/* branch to DMA-02 */}
      <path d="M240 196 H392" stroke={dim} strokeWidth="1.5" className="sig-path" />
      {/* branch to DMA-03 */}
      <path d="M240 300 H108 V370" stroke={dim} strokeWidth="1.5" className="sig-path" />
      {/* branch to DMA-04 (monitored) */}
      <path d="M240 300 H392 V352" stroke={dim} strokeWidth="1.5" className="sig-path" />

      {/* reservoir symbol */}
      <rect x="36" y="66" width="40" height="30" rx="1" stroke={stroke} strokeWidth="2" className="sig-node" />
      <path d="M36 76 H76 M36 86 H76" stroke={stroke} strokeWidth="1" opacity="0.5" className="sig-node" />
      <text x="16" y="118" fontSize="10" letterSpacing="0.06em" fill={label} className="sig-node">
        RESERVOIR
      </text>

      {/* booster pump symbol */}
      <circle cx="240" cy="196" r="14" stroke={stroke} strokeWidth="2" className="sig-node" />
      <path d="M233 202 L247 190 M233 190 L247 202" stroke={stroke} strokeWidth="1.5" className="sig-node" />
      <text x="260" y="200" fontSize="10" letterSpacing="0.06em" fill={label} className="sig-node">
        BOOSTER PUMP
      </text>

      {/* junction at 240,300 */}
      <circle cx="240" cy="300" r="4" fill={stroke} className="sig-node" />

      {/* DMA-01 node */}
      <circle cx="392" cy="150" r="6" stroke={stroke} strokeWidth="2" fill="none" className="sig-node" />
      <text x="410" y="154" fontSize="10" letterSpacing="0.06em" fill={label} className="sig-node">
        DMA-01
      </text>

      {/* DMA-02 node */}
      <circle cx="392" cy="196" r="6" stroke={stroke} strokeWidth="2" fill="none" className="sig-node" />
      <text x="410" y="200" fontSize="10" letterSpacing="0.06em" fill={label} className="sig-node">
        DMA-02
      </text>

      {/* DMA-03 node */}
      <circle cx="108" cy="370" r="6" stroke={stroke} strokeWidth="2" fill="none" className="sig-node" />
      <text x="70" y="394" fontSize="10" letterSpacing="0.06em" fill={label} className="sig-node">
        DMA-03
      </text>

      {/* DMA-04 — monitored node, signal accent, pulses once drawn */}
      <circle cx="392" cy="352" r="10" stroke="#d6791f" strokeWidth="1" opacity="0.35" className="sig-node sig-live-ring" />
      <circle cx="392" cy="352" r="6" fill="#d6791f" className="sig-node sig-live-dot" />
      <text x="410" y="356" fontSize="10" letterSpacing="0.06em" fill="#d6791f" className="sig-node">
        DMA-04 — LIVE
      </text>
    </svg>
  );
}
