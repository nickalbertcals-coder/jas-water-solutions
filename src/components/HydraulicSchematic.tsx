"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/* ───────────────────────── isometric helpers ───────────────────────── */

const DX = 34.64; // horizontal screen px per grid unit (30° iso)
const DY = 20; // vertical screen px per grid unit
const U = 40; // screen px per unit of height
const OX = 285;
const OY = 118;

type Pt = [number, number];
/** grid (x, y, z) → screen point */
const P = (x: number, y: number, z = 0): Pt => [OX + (x - y) * DX, OY + (x + y) * DY - z * U];
const f1 = (n: number) => n.toFixed(1);
const poly = (...pts: Pt[]) => pts.map((p) => `${f1(p[0])},${f1(p[1])}`).join(" ");
const pathOf = (pts: Pt[], z = 0.1) =>
  pts.map(([x, y], i) => `${i ? "L" : "M"}${P(x, y, z).map(f1).join(" ")}`).join("");

const C = {
  aqua: "#4cc9e8",
  live: "#3ee0b4",
  window: "#6bb8f2",
  top: "#1f5578",
  left: "#12364f",
  right: "#0a2438",
  edge: "rgba(255,255,255,0.38)",
  edgeSoft: "rgba(255,255,255,0.2)",
};

/* ───────────────────────── scene data ───────────────────────── */

const TANK = { cx: 1.5, cy: 1.4, r: 0.95, h: 1.7 };
const PUMP = { x: 3.3, y: 1.1, w: 1.2, d: 1.0, h: 0.85 };

// pipe routes in grid space, source → destination (so flow moves outward)
const PIPES: Pt[][] = [
  [[2.3, 1.6], [3.3, 1.6]],
  [[4.5, 1.6], [6.0, 1.6]],
  [[6.0, 1.6], [7.2, 1.6]],
  [[6.0, 1.6], [6.0, 3.5]],
  [[6.0, 3.5], [6.0, 4.9]],
  [[6.0, 3.5], [2.6, 3.5]],
  [[2.6, 3.5], [2.6, 4.8]],
];
const VALVES: Pt[] = [[6.0, 1.6], [6.0, 3.5], [2.6, 3.5]];

type BoxDef = [dx: number, dy: number, w: number, d: number, h: number];
const CLUSTER_A: BoxDef[] = [
  [-0.65, -0.55, 0.55, 0.5, 0.55],
  [0.0, -0.6, 0.5, 0.55, 0.85],
  [-0.5, 0.05, 0.6, 0.5, 0.4],
  [0.15, 0.0, 0.55, 0.6, 0.65],
];
const CLUSTER_B: BoxDef[] = [
  [-0.6, -0.5, 0.5, 0.55, 0.7],
  [0.0, -0.55, 0.6, 0.5, 0.45],
  [-0.55, 0.1, 0.55, 0.5, 0.5],
  [0.1, 0.05, 0.6, 0.6, 0.9],
];

const DISTRICTS = [
  { id: "dma1", cx: 7.2, cy: 1.6, boxes: CLUSTER_A, live: false },
  { id: "dma2", cx: 6.0, cy: 4.9, boxes: CLUSTER_B, live: true },
  { id: "dma3", cx: 2.6, cy: 4.8, boxes: CLUSTER_A, live: false },
];

const TIPS = {
  tank: "Reservoir — water level checked around the clock",
  pump: "Booster pump — keeps water pressure steady",
  dma: "Community supply area — watched for leaks and losses",
  live: "Community supply area — live monitoring",
};

/* ───────────────────────── drawing primitives ───────────────────────── */

function Box({
  x, y, w, d, h, win, seed = 0,
}: { x: number; y: number; w: number; d: number; h: number; win: string; seed?: number }) {
  const a = P(x, y, h), b = P(x + w, y, h), c = P(x + w, y + d, h), dd = P(x, y + d, h);
  const e = P(x + w, y, 0), f = P(x + w, y + d, 0), g = P(x, y + d, 0);
  const slots: [number, number][] = [[0.14, 0.44], [0.56, 0.86]];
  const v: [number, number] = [0.26, 0.7];
  const windows: React.ReactNode[] = [];
  slots.forEach(([u0, u1], i) => {
    windows.push(
      <polygon
        key={`r${i}`}
        className="sc-win"
        style={{ animationDelay: `${(((seed + 1) * 7 + i * 13) % 50) / 10}s` }}
        fill={win}
        points={poly(P(x + w, y + d * u0, h * v[1]), P(x + w, y + d * u1, h * v[1]), P(x + w, y + d * u1, h * v[0]), P(x + w, y + d * u0, h * v[0]))}
      />,
      <polygon
        key={`l${i}`}
        className="sc-win"
        style={{ animationDelay: `${(((seed + 3) * 11 + i * 17) % 50) / 10}s` }}
        fill={win}
        points={poly(P(x + w * u0, y + d, h * v[1]), P(x + w * u1, y + d, h * v[1]), P(x + w * u1, y + d, h * v[0]), P(x + w * u0, y + d, h * v[0]))}
      />
    );
  });
  return (
    <g strokeLinejoin="round">
      <polygon points={poly(dd, c, f, g)} fill={C.left} stroke={C.edgeSoft} />
      <polygon points={poly(b, c, f, e)} fill={C.right} stroke={C.edgeSoft} />
      <polygon points={poly(a, b, c, dd)} fill={C.top} stroke={C.edge} />
      {windows}
    </g>
  );
}

function District({ cx, cy, boxes, live }: { cx: number; cy: number; boxes: BoxDef[]; live: boolean }) {
  const sorted = [...boxes].sort(
    (p, q) => p[0] + p[1] + (p[2] + p[3]) / 2 - (q[0] + q[1] + (q[2] + q[3]) / 2)
  );
  return (
    <g>
      {sorted.map(([dx, dy, w, d, h], i) => (
        <Box key={i} x={cx + dx} y={cy + dy} w={w} d={d} h={h} win={live ? C.live : C.window} seed={i + Math.round(cx * 3)} />
      ))}
    </g>
  );
}

/* ───────────────────────── component ───────────────────────── */

type Props = {
  className?: string;
  /** Enables hover/focus readouts on the reservoir, pump and districts. */
  interactive?: boolean;
};

type TooltipState = { x: number; y: number; text: string } | null;

/**
 * Signature illustration: an isometric "digital twin" of a Level III
 * distribution system — glass reservoir, pump house, glowing mains with
 * pulses of light moving through them, and metered districts. It builds
 * itself on scroll, then idles: water level breathing, light travelling
 * the pipes, windows twinkling, the live district sending out pressure
 * rings. Hovering or focusing an asset names what it monitors.
 */
export default function HydraulicSchematic({ className, interactive = false }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState>(null);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const q = <T extends Element>(sel: string) => gsap.utils.toArray<T>(svg.querySelectorAll(sel));
    const platform = q<SVGElement>(".sc-platform");
    const grid = q<SVGElement>(".sc-grid");
    const bodies = q<SVGPathElement>(".sc-pipe-body");
    const flows = q<SVGPathElement>(".sc-flow");
    const valves = q<SVGElement>(".sc-valve");
    const objs = q<SVGElement>(".sc-obj");
    const labels = q<SVGElement>(".sc-label");
    const rings = q<SVGElement>(".sc-ring");
    const water = q<SVGElement>(".sc-water");
    const float = q<SVGElement>(".sc-float");
    const pipeGroups = q<SVGGElement>(".sc-pipe");

    flows.forEach((p) => (p.style.strokeDasharray = "3 26"));
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // starting state (set before first paint)
      bodies.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });
      gsap.set(platform, { opacity: 0, y: 16 });
      gsap.set(grid, { opacity: 0 });
      gsap.set(valves, { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" });
      gsap.set(objs, { opacity: 0, y: 26 });
      gsap.set(labels, { opacity: 0 });
      gsap.set(flows, { opacity: 0 });
      gsap.set(rings, { opacity: 0 });

      const tl = gsap.timeline({ scrollTrigger: { trigger: svg, start: "top 88%", once: true } });
      tl.to(platform, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, 0).to(
        grid,
        { opacity: 1, duration: 0.9 },
        0.3
      );
      pipeGroups.forEach((g, i) => {
        const paths = Array.from(g.querySelectorAll<SVGPathElement>(".sc-pipe-body"));
        tl.to(paths, { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" }, 0.55 + i * 0.1);
      });
      tl.to(valves, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.5)", stagger: 0.08 }, 1.1)
        .to(objs, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.11 }, 1.0)
        .to(labels, { opacity: 1, duration: 0.5, stagger: 0.08 }, 1.8)
        .call(
          () => {
            gsap.to(flows, { opacity: 1, duration: 0.8 });
            gsap.to(flows, { strokeDashoffset: "-=290", duration: 5, ease: "none", repeat: -1 });
            gsap.fromTo(
              rings,
              { scale: 0.55, opacity: 0.8 },
              { scale: 1.3, opacity: 0, duration: 2.6, ease: "power1.out", repeat: -1, stagger: 0.85, transformOrigin: "50% 50%" }
            );
            gsap.to(water, { y: -3.5, duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
            gsap.to(float, { y: -5, duration: 4.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
          },
          [],
          1.9
        );
    }, svg);

    return () => ctx.revert();
  }, []);

  /* hover / keyboard readouts — delegated, so every asset just carries data-tip */
  function show(e: React.SyntheticEvent) {
    if (!interactive) return;
    const el = (e.target as Element).closest<SVGElement>("[data-tip]");
    const box = containerRef.current?.getBoundingClientRect();
    if (!el || !box) return;
    const r = el.getBoundingClientRect();
    setTooltip({ x: r.left - box.left + r.width / 2, y: r.top - box.top, text: el.dataset.tip ?? "" });
  }
  const hide = () => setTooltip(null);

  const hot = interactive ? { tabIndex: 0, className: "sc-hot" } : { className: "sc-hot" };

  const [tx, ty] = P(TANK.cx, TANK.cy, 0);
  const trx = TANK.r * 49;
  const try_ = TANK.r * 28.3;
  const tTop = ty - TANK.h * U;
  const tankBody = `M${f1(tx - trx)} ${f1(tTop)}L${f1(tx - trx)} ${f1(ty)}A${f1(trx)} ${f1(try_)} 0 0 0 ${f1(tx + trx)} ${f1(ty)}L${f1(tx + trx)} ${f1(tTop)}Z`;
  const waterY = tTop + TANK.h * U * 0.38;

  const pumpTop = P(PUMP.x + PUMP.w / 2, PUMP.y + PUMP.d / 2, PUMP.h);
  const led = P(PUMP.x + PUMP.w, PUMP.y + PUMP.d * 0.5, PUMP.h * 0.5);
  const mast = P(PUMP.x + 0.22, PUMP.y + 0.22, PUMP.h);

  const live = DISTRICTS.find((d) => d.live)!;
  const [lx, ly] = P(live.cx, live.cy, 0);

  const platform = {
    top: poly(P(0, 0), P(8, 0), P(8, 6), P(0, 6)),
    left: poly(P(0, 6), P(8, 6), P(8, 6, -0.38), P(0, 6, -0.38)),
    right: poly(P(8, 0), P(8, 6), P(8, 6, -0.38), P(8, 0, -0.38)),
  };
  const gridPath =
    Array.from({ length: 9 }, (_, i) => `M${P(i, 0).map(f1).join(" ")}L${P(i, 6).map(f1).join(" ")}`).join("") +
    Array.from({ length: 7 }, (_, j) => `M${P(0, j).map(f1).join(" ")}L${P(8, j).map(f1).join(" ")}`).join("");

  const objectsInOrder = [
    { key: "tank", order: TANK.cx + TANK.cy },
    { key: "pump", order: PUMP.x + PUMP.y + 1 },
    ...DISTRICTS.map((d) => ({ key: d.id, order: d.cx + d.cy })),
  ].sort((a, b) => a.order - b.order);

  const label = (
    x: number,
    y: number,
    text: string,
    color = "rgba(255,255,255,0.78)",
    anchor: "middle" | "start" = "middle",
    lx2?: number,
    ly2?: number
  ) => (
    <g className="sc-label" key={text}>
      {lx2 !== undefined && ly2 !== undefined && (
        <line x1={anchor === "start" ? lx2 : x} y1={y + 6} x2={lx2} y2={ly2} stroke={color} strokeOpacity="0.5" strokeWidth="1" />
      )}
      <text x={x} y={y} textAnchor={anchor} fontSize="14" fontWeight="600" letterSpacing="0.01em" fill={color}>
        {text}
      </text>
    </g>
  );

  const d1 = P(7.2, 1.6, 0);
  const d3 = P(2.6, 4.8, 0);

  return (
    <div
      ref={containerRef}
      className={`relative ${className ?? ""}`}
      onPointerOver={show}
      onPointerOut={hide}
      onFocus={show}
      onBlur={hide}
    >
      <svg
        ref={svgRef}
        viewBox="50 30 540 392"
        fill="none"
        className="h-full w-full overflow-visible"
        role="img"
        aria-label="Isometric illustration of a water distribution system: a reservoir, booster pump house, glowing supply mains and metered districts, with one district reporting live"
      >
        <style>{`
          text { font-family: var(--font-figtree), sans-serif; }
          .sc-hot { outline: none; cursor: ${interactive ? "pointer" : "default"}; }
          .sc-hot:focus-visible .sc-hit { stroke: ${C.live}; stroke-width: 1.5; }
          @media (prefers-reduced-motion: no-preference) {
            .sc-win { animation: sc-twinkle 5s ease-in-out infinite; }
            .sc-led { animation: sc-blink 2.4s ease-in-out infinite; }
            .sc-ping { transform-box: fill-box; transform-origin: center; animation: sc-ping 2.6s ease-out infinite; }
          }
          @keyframes sc-twinkle { 0%,100% { opacity: .9 } 45% { opacity: .25 } 70% { opacity: .75 } }
          @keyframes sc-ping { 0% { transform: scale(.6); opacity: .9 } 100% { transform: scale(4.2); opacity: 0 } }
          @keyframes sc-blink { 0%,100% { opacity: 1 } 50% { opacity: .25 } }
        `}</style>

        <defs>
          <linearGradient id={`tank-${uid}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#07213a" />
            <stop offset="0.38" stopColor="#1f5a80" />
            <stop offset="0.7" stopColor="#0f3a58" />
            <stop offset="1" stopColor="#051a2b" />
          </linearGradient>
          <linearGradient id={`plat-${uid}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#0b2c47" />
            <stop offset="1" stopColor="#04131f" />
          </linearGradient>
          <radialGradient id={`ring-${uid}`}>
            <stop offset="0" stopColor={C.live} stopOpacity="0.4" />
            <stop offset="1" stopColor={C.live} stopOpacity="0" />
          </radialGradient>
          <clipPath id={`tankclip-${uid}`}>
            <path d={tankBody} />
          </clipPath>
          <filter id={`glow-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`soft-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        <g className="sc-float">
          {/* platform */}
          <g className="sc-platform" strokeLinejoin="round">
            <polygon points={platform.left} fill="#051624" stroke={C.edgeSoft} />
            <polygon points={platform.right} fill="#030f19" stroke={C.edgeSoft} />
            <polygon points={platform.top} fill={`url(#plat-${uid})`} stroke={C.edge} />
            <path className="sc-grid" d={gridPath} stroke="rgba(255,255,255,0.075)" strokeWidth="1" />
          </g>

          {/* contact shadows */}
          <g filter={`url(#soft-${uid})`} opacity="0.65">
            <ellipse cx={tx + 34} cy={ty + 14} rx="70" ry="30" fill="#000" />
            <ellipse cx={pumpTop[0] + 26} cy={pumpTop[1] + 44} rx="58" ry="22" fill="#000" />
            {DISTRICTS.map((d) => {
              const [sx, sy] = P(d.cx + 0.3, d.cy + 0.3, 0);
              return <ellipse key={d.id} cx={sx} cy={sy + 4} rx="62" ry="26" fill="#000" />;
            })}
          </g>

          {/* live-district pressure rings (on the ground) */}
          <ellipse cx={lx} cy={ly} rx="88" ry="50" fill={`url(#ring-${uid})`} />
          {[0, 1, 2].map((i) => (
            <ellipse key={i} className="sc-ring" cx={lx} cy={ly} rx="84" ry="48" stroke={C.live} strokeWidth="1.8" strokeOpacity="0.95" />
          ))}

          {/* mains */}
          {PIPES.map((pts, i) => {
            const d = pathOf(pts);
            return (
              <g className="sc-pipe" key={i} strokeLinecap="round" strokeLinejoin="round">
                <path className="sc-pipe-body" d={d} stroke="#2a6a92" strokeWidth="9.5" />
                <path className="sc-pipe-body" d={d} stroke="#03111d" strokeWidth="6" />
                <path d={d} stroke={C.aqua} strokeOpacity="0.16" strokeWidth="2" />
                <g filter={`url(#glow-${uid})`}>
                  <path className="sc-flow" d={d} stroke={C.aqua} strokeWidth="2.6" />
                </g>
              </g>
            );
          })}
          {VALVES.map(([vx, vy], i) => {
            const [sx, sy] = P(vx, vy, 0.1);
            return (
              <g className="sc-valve" key={i}>
                <ellipse cx={sx} cy={sy + 2.5} rx="11" ry="6.4" fill="#07213a" stroke={C.edge} />
                <ellipse cx={sx} cy={sy} rx="11" ry="6.4" fill="#1d4d6e" stroke={C.edge} />
                <ellipse cx={sx} cy={sy} rx="4.2" ry="2.4" fill={C.aqua} fillOpacity="0.85" />
              </g>
            );
          })}

          {/* structures, back to front */}
          {objectsInOrder.map(({ key }) => {
            if (key === "tank")
              return (
                <g className="sc-obj" key={key}>
                  <g {...hot} data-tip={TIPS.tank} aria-label={TIPS.tank}>
                    <path d={tankBody} fill={`url(#tank-${uid})`} stroke={C.edgeSoft} />
                    <g clipPath={`url(#tankclip-${uid})`}>
                      <g className="sc-water">
                        <rect x={tx - trx} y={waterY} width={trx * 2} height={ty - waterY + try_ + 6} fill={C.aqua} fillOpacity="0.34" />
                        <ellipse cx={tx} cy={waterY} rx={trx} ry={try_} fill="#2f9fc4" stroke={C.aqua} strokeOpacity="0.95" />
                        <ellipse cx={tx - trx * 0.28} cy={waterY - 1} rx={trx * 0.42} ry={try_ * 0.34} fill="#fff" fillOpacity="0.12" />
                      </g>
                    </g>
                    {[0.28, 0.58].map((t) => (
                      <path
                        key={t}
                        d={`M${f1(tx - trx)} ${f1(tTop + (ty - tTop) * t)}A${f1(trx)} ${f1(try_)} 0 0 0 ${f1(tx + trx)} ${f1(tTop + (ty - tTop) * t)}`}
                        stroke="rgba(255,255,255,0.13)"
                      />
                    ))}
                    <rect x={tx - trx * 0.55} y={tTop + 10} width="7" height={ty - tTop - 14} fill="#fff" fillOpacity="0.07" />
                    <ellipse cx={tx} cy={tTop} rx={trx} ry={try_} fill="#235f86" stroke={C.edge} />
                    <ellipse cx={tx} cy={tTop} rx={trx * 0.62} ry={try_ * 0.62} fill="#071e33" stroke={C.edgeSoft} />
                    <ellipse cx={tx} cy={tTop} rx={trx * 0.2} ry={try_ * 0.2} fill={C.aqua} fillOpacity="0.8" />
                    <ellipse className="sc-hit" cx={tx} cy={(tTop + ty) / 2} rx={trx + 6} ry={(ty - tTop) / 2 + try_ + 4} fill="transparent" />
                  </g>
                </g>
              );
            if (key === "pump")
              return (
                <g className="sc-obj" key={key}>
                  <g {...hot} data-tip={TIPS.pump} aria-label={TIPS.pump}>
                    <Box x={PUMP.x} y={PUMP.y} w={PUMP.w} d={PUMP.d} h={PUMP.h} win={C.window} seed={5} />
                    {/* rooftop motor */}
                    <path
                      d={`M${f1(pumpTop[0] - 14)} ${f1(pumpTop[1] - 12)}L${f1(pumpTop[0] - 14)} ${f1(pumpTop[1])}A14 8 0 0 0 ${f1(pumpTop[0] + 14)} ${f1(pumpTop[1])}L${f1(pumpTop[0] + 14)} ${f1(pumpTop[1] - 12)}Z`}
                      fill="#13405e"
                      stroke={C.edgeSoft}
                    />
                    <ellipse cx={pumpTop[0]} cy={pumpTop[1] - 12} rx="14" ry="8" fill="#2c6a92" stroke={C.edge} />
                    <ellipse cx={pumpTop[0]} cy={pumpTop[1] - 12} rx="5" ry="2.8" fill={C.aqua} fillOpacity="0.75" />
                    <circle className="sc-led" cx={led[0]} cy={led[1]} r="2.6" fill={C.live} />
                    {/* telemetry mast — the "digitized monitoring" in one glance */}
                    <line x1={mast[0]} y1={mast[1]} x2={mast[0]} y2={mast[1] - 46} stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" />
                    <line x1={mast[0] - 6} y1={mast[1] - 30} x2={mast[0] + 6} y2={mast[1] - 30} stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" />
                    <circle cx={mast[0]} cy={mast[1] - 47} r="2.8" fill={C.aqua} />
                    {[0, 1].map((i) => (
                      <circle key={i} className="sc-ping" cx={mast[0]} cy={mast[1] - 47} r="5" stroke={C.aqua} strokeWidth="1.2" style={{ animationDelay: `${i * 1.3}s` }} />
                    ))}

                    <polygon
                      className="sc-hit"
                      points={poly(P(PUMP.x, PUMP.y, PUMP.h + 0.45), P(PUMP.x + PUMP.w, PUMP.y, PUMP.h + 0.45), P(PUMP.x + PUMP.w, PUMP.y + PUMP.d, 0), P(PUMP.x, PUMP.y + PUMP.d, 0))}
                      fill="transparent"
                    />
                  </g>
                </g>
              );
            const dist = DISTRICTS.find((d) => d.id === key)!;
            const [sx, sy] = P(dist.cx, dist.cy, 0.4);
            const tip = dist.live ? TIPS.live : TIPS.dma;
            return (
              <g className="sc-obj" key={key}>
                <g {...hot} data-tip={tip} aria-label={tip}>
                  <District cx={dist.cx} cy={dist.cy} boxes={dist.boxes} live={dist.live} />
                  <ellipse className="sc-hit" cx={sx} cy={sy - 6} rx="58" ry="40" fill="transparent" />
                </g>
              </g>
            );
          })}

          {/* labels */}
          {label(tx, tTop - 40, "Reservoir", undefined, "middle", tx, tTop - 22)}
          {label(pumpTop[0] + 16, pumpTop[1] - 66, "Booster pump", undefined, "start")}
          {label(d1[0], d1[1] - 78, "Area A", undefined, "middle", d1[0], d1[1] - 52)}
          {label(d3[0], d3[1] - 78, "Area C", undefined, "middle", d3[0], d3[1] - 52)}
          {label(lx + 62, ly - 2, "Area B — live", C.live, "start", lx + 40, ly - 8)}
        </g>
      </svg>

      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap border border-white/20 bg-void/95 px-3 py-2 font-label text-[0.8125rem] text-paper-50 shadow-lg backdrop-blur"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
