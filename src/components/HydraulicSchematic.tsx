"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  className?: string;
  tone?: "ink" | "paper";
  /** Enables hover/focus readouts on the reservoir, pump, and DMA nodes. */
  interactive?: boolean;
};

type TooltipState = { x: number; y: number; text: string } | null;

const FLOW_BLUE = "#3e7ca6";

/**
 * Signature graphic: a stylized hydraulic distribution-network schematic
 * (reservoir, booster, trunk main, DMA branches) in the drafting style of
 * an EPANET model — the actual diagram type JAS's engineers produce.
 *
 * Draws itself in on scroll using each path's real length, then settles
 * into a continuous ambient state: water visibly moving through the
 * mains, the reservoir level breathing, and the monitored DMA pulsing.
 * When `interactive`, hovering or focusing a node surfaces a short
 * readout describing what that node actually represents operationally.
 */
export default function HydraulicSchematic({ className, tone = "ink", interactive = false }: Props) {
  const stroke = tone === "ink" ? "#16283a" : "#eef2f2";
  const dim = tone === "ink" ? "#5f7080" : "#9fb0b8";
  const label = tone === "ink" ? "#3a4a58" : "#c7d2d6";

  const uid = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState>(null);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll<SVGPathElement>(".sig-path");
    const flowPaths = svg.querySelectorAll<SVGPathElement>(".sig-flow");
    const nodes = svg.querySelectorAll<SVGElement>(".sig-node");
    const liveRing = svg.querySelector<SVGCircleElement>(".sig-live-ring");
    const liveDot = svg.querySelector<SVGCircleElement>(".sig-live-dot");
    const waterLevel = svg.querySelector<SVGRectElement>(".sig-water-level");

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
      flowPaths.forEach((p) => {
        p.style.strokeDasharray = "5 15";
      });
      gsap.set(nodes, { opacity: 0, scale: 0.6, transformOrigin: "center" });
      gsap.set(flowPaths, { opacity: 0 });

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

      tl.call(() => {
        // Water visibly moving through the mains, continuously.
        gsap.to(flowPaths, { opacity: 1, duration: 0.6 });
        gsap.to(flowPaths, {
          strokeDashoffset: "-=240",
          duration: 5,
          ease: "none",
          repeat: -1,
        });

        // Reservoir level breathing gently.
        if (waterLevel) {
          gsap.to(waterLevel, {
            attr: { y: "+=2.5", height: "-=2.5" },
            duration: 2.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }

        // Monitored DMA node pulsing.
        if (liveRing && liveDot) {
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
        }
      });
    }, svg);

    return () => ctx.revert();
  }, []);

  function showTooltip(e: { currentTarget: SVGElement }, text: string) {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    setTooltip({
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top,
      text,
    });
  }

  function hideTooltip() {
    setTooltip(null);
  }

  const hotspotClass = interactive
    ? "sig-node cursor-pointer outline-none transition-opacity hover:opacity-70 focus-visible:opacity-70"
    : "sig-node";

  const hotspotProps = (text: string) =>
    interactive
      ? {
          tabIndex: 0,
          onMouseEnter: (e: React.MouseEvent<SVGElement>) => showTooltip(e, text),
          onMouseLeave: hideTooltip,
          onFocus: (e: React.FocusEvent<SVGElement>) => showTooltip(e, text),
          onBlur: hideTooltip,
        }
      : {};

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`}>
      <svg
        ref={svgRef}
        viewBox="0 0 560 460"
        fill="none"
        className="h-full w-full"
        role="img"
        aria-label="Schematic diagram of a water distribution network: reservoir, booster pump, trunk main, and monitored distribution zones"
      >
        <style>{`text { font-family: var(--font-plex-mono), monospace; }`}</style>
        <clipPath id={`reservoir-clip-${uid}`}>
          <rect x="37" y="67" width="38" height="28" />
        </clipPath>

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

        {/* animated flow overlays — same routes, moving dash pattern */}
        <path d="M76 96 H240 V196" stroke={FLOW_BLUE} strokeWidth="2" strokeLinecap="round" className="sig-flow" />
        <path d="M240 196 V300" stroke={FLOW_BLUE} strokeWidth="2" strokeLinecap="round" className="sig-flow" />
        <path d="M240 196 H392 V150" stroke={FLOW_BLUE} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" className="sig-flow" />
        <path d="M240 196 H392" stroke={FLOW_BLUE} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" className="sig-flow" />
        <path d="M240 300 H108 V370" stroke={FLOW_BLUE} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" className="sig-flow" />
        <path d="M240 300 H392 V352" stroke={FLOW_BLUE} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" className="sig-flow" />

        {/* reservoir symbol */}
        <rect x="36" y="66" width="40" height="30" rx="1" stroke={stroke} strokeWidth="2" className="sig-node" />
        <rect
          x="37"
          y="76"
          width="38"
          height="19"
          fill={FLOW_BLUE}
          opacity="0.3"
          clipPath={`url(#reservoir-clip-${uid})`}
          className="sig-node sig-water-level"
        />
        <path d="M36 76 H76 M36 86 H76" stroke={stroke} strokeWidth="1" opacity="0.5" className="sig-node" />
        <rect
          x="34"
          y="64"
          width="44"
          height="34"
          fill="transparent"
          className={hotspotClass}
          aria-label="Reservoir — level and inflow monitored"
          {...hotspotProps("Reservoir — level & inflow monitored")}
        />
        <text x="16" y="118" fontSize="10" letterSpacing="0.06em" fill={label} className="sig-node">
          RESERVOIR
        </text>

        {/* booster pump symbol */}
        <circle cx="240" cy="196" r="14" stroke={stroke} strokeWidth="2" className="sig-node" />
        <path d="M233 202 L247 190 M233 190 L247 202" stroke={stroke} strokeWidth="1.5" className="sig-node" />
        <circle
          cx="240"
          cy="196"
          r="16"
          fill="transparent"
          className={hotspotClass}
          aria-label="Booster pump — scheduled and monitored"
          {...hotspotProps("Booster pump — scheduled & monitored")}
        />
        <text x="260" y="200" fontSize="10" letterSpacing="0.06em" fill={label} className="sig-node">
          BOOSTER PUMP
        </text>

        {/* junction at 240,300 */}
        <circle cx="240" cy="300" r="4" fill={stroke} className="sig-node" />

        {/* DMA-01 node */}
        <circle cx="392" cy="150" r="6" stroke={stroke} strokeWidth="2" fill="none" className="sig-node" />
        <circle
          cx="392"
          cy="150"
          r="10"
          fill="transparent"
          className={hotspotClass}
          aria-label="District Metered Area — leak and loss monitoring"
          {...hotspotProps("District Metered Area — leak & loss monitoring")}
        />
        <text x="410" y="154" fontSize="10" letterSpacing="0.06em" fill={label} className="sig-node">
          DMA-01
        </text>

        {/* DMA-02 node */}
        <circle cx="392" cy="196" r="6" stroke={stroke} strokeWidth="2" fill="none" className="sig-node" />
        <circle
          cx="392"
          cy="196"
          r="10"
          fill="transparent"
          className={hotspotClass}
          aria-label="District Metered Area — leak and loss monitoring"
          {...hotspotProps("District Metered Area — leak & loss monitoring")}
        />
        <text x="410" y="200" fontSize="10" letterSpacing="0.06em" fill={label} className="sig-node">
          DMA-02
        </text>

        {/* DMA-03 node */}
        <circle cx="108" cy="370" r="6" stroke={stroke} strokeWidth="2" fill="none" className="sig-node" />
        <circle
          cx="108"
          cy="370"
          r="10"
          fill="transparent"
          className={hotspotClass}
          aria-label="District Metered Area — leak and loss monitoring"
          {...hotspotProps("District Metered Area — leak & loss monitoring")}
        />
        <text x="70" y="394" fontSize="10" letterSpacing="0.06em" fill={label} className="sig-node">
          DMA-03
        </text>

        {/* DMA-04 — monitored node, signal accent, pulses once drawn */}
        <circle cx="392" cy="352" r="10" stroke="#d6791f" strokeWidth="1" opacity="0.35" className="sig-node sig-live-ring" />
        <circle cx="392" cy="352" r="6" fill="#d6791f" className="sig-node sig-live-dot" />
        <circle
          cx="392"
          cy="352"
          r="12"
          fill="transparent"
          className={hotspotClass}
          aria-label="District Metered Area — real-time telemetry"
          {...hotspotProps("District Metered Area — real-time telemetry")}
        />
        <text x="410" y="356" fontSize="10" letterSpacing="0.06em" fill="#d6791f" className="sig-node">
          DMA-04 — LIVE
        </text>
      </svg>

      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+8px)] whitespace-nowrap border border-line-strong bg-white px-2.5 py-1.5 font-mono text-[11px] text-ink-900 shadow-sm"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
