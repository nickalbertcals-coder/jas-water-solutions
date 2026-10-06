"use client";

import { useId, type ReactNode } from "react";

/*
 * One illustration per stop on "The journey of one cubic meter".
 *
 * Every scene is a small isometric vignette — the same 30° projection as the
 * hero — standing on a floating slab: shaded faces with a light from the upper
 * left, glass tanks, glowing mains with light travelling through them, and
 * frosted info cards hovering over the model. Shared gradients and filters live
 * in <JourneyDefs/>, rendered once by the section; the animation classes (j*)
 * are in globals.css and switch themselves off for reduced motion.
 */

type Pt = [number, number];
type PF = (x: number, y: number, z?: number) => Pt;

const DX = 36;
const DY = 20.78;
const U = 41;
const SQ2 = Math.SQRT2;

const AQ = "#4cc9e8";
const LV = "#3ee0b4";
const EDGE = "rgba(255,255,255,0.4)";
const EDGE_SOFT = "rgba(255,255,255,0.14)";

const mk =
  (ox: number, oy: number): PF =>
  (x, y, z = 0) => [ox + (x - y) * DX, oy + (x + y) * DY - z * U];

const f = (n: number) => n.toFixed(1);
const pts = (...p: Pt[]) => p.map((q) => `${f(q[0])},${f(q[1])}`).join(" ");

/* ───────────────────────── shared defs ───────────────────────── */

export function JourneyDefs() {
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        <linearGradient id="jg-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4a9cc9" />
          <stop offset="1" stopColor="#1f6590" />
        </linearGradient>
        <linearGradient id="jg-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b5379" />
          <stop offset="1" stopColor="#0b2d48" />
        </linearGradient>
        <linearGradient id="jg-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f3a58" />
          <stop offset="1" stopColor="#061c2e" />
        </linearGradient>
        <linearGradient id="jg-slab" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#15405f" />
          <stop offset="1" stopColor="#071f33" />
        </linearGradient>
        <linearGradient id="jg-slabl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d2d47" />
          <stop offset="1" stopColor="#051626" />
        </linearGradient>
        <linearGradient id="jg-slabr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#081f33" />
          <stop offset="1" stopColor="#030f19" />
        </linearGradient>
        <linearGradient id="jg-cyl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0a2a44" />
          <stop offset="0.3" stopColor="#3487b6" />
          <stop offset="0.55" stopColor="#1a5e88" />
          <stop offset="1" stopColor="#061c2f" />
        </linearGradient>
        <linearGradient id="jg-cyltop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#58b0dd" />
          <stop offset="1" stopColor="#2b79a6" />
        </linearGradient>
        <linearGradient id="jg-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#74e0f5" stopOpacity="0.92" />
          <stop offset="1" stopColor="#1a86ad" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="jg-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="0.3" stopColor="#bfeaff" stopOpacity="0.28" />
          <stop offset="0.6" stopColor="#7fc7e8" stopOpacity="0.1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="jg-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.07" />
        </linearGradient>
        <linearGradient id="jg-cardstroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="jg-bezel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d4eefa" />
          <stop offset="0.45" stopColor="#5d93b3" />
          <stop offset="1" stopColor="#1b3f58" />
        </linearGradient>
        <radialGradient id="jg-dial" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#0f3b5c" />
          <stop offset="1" stopColor="#04152a" />
        </radialGradient>
        <filter id="jf-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="jf-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id="jf-shadow" x="-20%" y="-30%" width="140%" height="190%">
          <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#00060d" floodOpacity="0.55" />
        </filter>
      </defs>
    </svg>
  );
}

/* ───────────────────────── primitives ───────────────────────── */

function Slab({ P, w, d }: { P: PF; w: number; d: number }) {
  const T = 0.45;
  const grid =
    Array.from({ length: Math.floor(w) + 1 }, (_, i) => `M${P(i, 0).map(f).join(" ")}L${P(i, d).map(f).join(" ")}`).join("") +
    Array.from({ length: Math.floor(d) + 1 }, (_, j) => `M${P(0, j).map(f).join(" ")}L${P(w, j).map(f).join(" ")}`).join("");
  const [cx, cy] = P(w / 2, d / 2, -1.2);
  return (
    <g strokeLinejoin="round">
      {/* soft light underneath, and a ground shadow beyond it */}
      <ellipse cx={cx} cy={cy + 26} rx={(w + d) * DX * 0.62} ry={(w + d) * DY * 0.7} fill="#000" opacity="0.5" filter="url(#jf-soft)" />
      <ellipse cx={cx} cy={cy + 6} rx={(w + d) * DX * 0.5} ry={(w + d) * DY * 0.5} fill={AQ} opacity="0.13" filter="url(#jf-soft)" />
      <polygon points={pts(P(0, d), P(w, d), P(w, d, -T), P(0, d, -T))} fill="url(#jg-slabl)" stroke={EDGE_SOFT} />
      <polygon points={pts(P(w, 0), P(w, d), P(w, d, -T), P(w, 0, -T))} fill="url(#jg-slabr)" stroke={EDGE_SOFT} />
      <polygon points={pts(P(0, 0), P(w, 0), P(w, d), P(0, d))} fill="url(#jg-slab)" stroke={EDGE} />
      <path d={grid} stroke="#fff" strokeOpacity="0.055" fill="none" />
      {/* glowing underside edge */}
      <path
        d={`M${P(0, d, -T).map(f).join(" ")}L${P(w, d, -T).map(f).join(" ")}L${P(w, 0, -T).map(f).join(" ")}`}
        stroke={AQ}
        strokeOpacity="0.8"
        strokeWidth="1.4"
        fill="none"
        filter="url(#jf-glow)"
      />
    </g>
  );
}

type WinCfg = { cols: number; rows: number; lit?: boolean };

function Box({
  P, x, y, z = 0, w, d, h, win,
}: { P: PF; x: number; y: number; z?: number; w: number; d: number; h: number; win?: WinCfg }) {
  const a = P(x, y, z + h), b = P(x + w, y, z + h), c = P(x + w, y + d, z + h), dd = P(x, y + d, z + h);
  const e = P(x + w, y, z), g = P(x, y + d, z), ff = P(x + w, y + d, z);
  const wins: ReactNode[] = [];
  if (win) {
    const colour = win.lit ? LV : "#8fd0f5";
    const op = win.lit ? 0.85 : 0.5;
    for (let r = 0; r < win.rows; r++) {
      for (let cc = 0; cc < win.cols; cc++) {
        const u0 = (cc + 0.22) / win.cols, u1 = (cc + 0.78) / win.cols;
        const v0 = (r + 0.2) / win.rows, v1 = (r + 0.72) / win.rows;
        const zl = z + h * (1 - v1) * 0.84 + h * 0.08, zh = z + h * (1 - v0) * 0.84 + h * 0.08;
        wins.push(
          <polygon key={`l${r}-${cc}`} className="jwin" style={{ animationDelay: `${((r * 7 + cc * 3) % 9) * 0.5}s` }} fill={colour} fillOpacity={op}
            points={pts(P(x + w * u0, y + d, zh), P(x + w * u1, y + d, zh), P(x + w * u1, y + d, zl), P(x + w * u0, y + d, zl))} />,
          <polygon key={`r${r}-${cc}`} className="jwin" style={{ animationDelay: `${((r * 5 + cc * 4) % 9) * 0.5}s` }} fill={colour} fillOpacity={op * 0.7}
            points={pts(P(x + w, y + d * u0, zh), P(x + w, y + d * u1, zh), P(x + w, y + d * u1, zl), P(x + w, y + d * u0, zl))} />
        );
      }
    }
  }
  return (
    <g strokeLinejoin="round">
      <polygon points={pts(dd, c, ff, g)} fill="url(#jg-left)" stroke={EDGE_SOFT} />
      <polygon points={pts(b, c, ff, e)} fill="url(#jg-right)" stroke={EDGE_SOFT} />
      <polygon points={pts(a, b, c, dd)} fill="url(#jg-top)" stroke={EDGE} />
      <path d={`M${dd.map(f).join(" ")}L${c.map(f).join(" ")}L${b.map(f).join(" ")}`} stroke="#fff" strokeOpacity="0.55" strokeWidth="1" fill="none" />
      {wins}
    </g>
  );
}

function Cyl({ P, cx, cy, z = 0, r, h }: { P: PF; cx: number; cy: number; z?: number; r: number; h: number }) {
  const [sx, sy] = P(cx, cy, z);
  const rx = r * DX * SQ2, ry = r * DY * SQ2;
  const top = sy - h * U;
  const body = `M${f(sx - rx)} ${f(top)}L${f(sx - rx)} ${f(sy)}A${f(rx)} ${f(ry)} 0 0 0 ${f(sx + rx)} ${f(sy)}L${f(sx + rx)} ${f(top)}Z`;
  return (
    <g>
      <path d={body} fill="url(#jg-cyl)" stroke={EDGE_SOFT} />
      <rect x={sx - rx * 0.62} y={top + 4} width={Math.max(3, rx * 0.07)} height={Math.max(2, h * U - 8)} rx="2" fill="#fff" fillOpacity="0.16" />
      <ellipse cx={sx} cy={top} rx={rx} ry={ry} fill="url(#jg-cyltop)" stroke={EDGE} />
      <ellipse cx={sx} cy={top} rx={rx * 0.74} ry={ry * 0.74} fill="#06233a" stroke={EDGE_SOFT} />
    </g>
  );
}

function Pipe({ P, path, w = 10 }: { P: PF; path: [number, number, number?][]; w?: number }) {
  const d = path.map(([x, y, z = 0.05], i) => `${i ? "L" : "M"}${P(x, y, z).map(f).join(" ")}`).join("");
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke="#fff" strokeOpacity="0.2" strokeWidth={w + 3.5} />
      <path d={d} stroke="#0a2a44" strokeWidth={w + 1.5} />
      <path d={d} stroke="#1a5d86" strokeWidth={w - 2.5} />
      <path d={d} stroke="#3a93c0" strokeOpacity="0.55" strokeWidth={Math.max(1.5, w * 0.22)} transform="translate(-0.8 -1.2)" />
      <g filter="url(#jf-glow)">
        <path d={d} stroke={AQ} strokeWidth="2.8" strokeDasharray="3 15" className="jflow" />
      </g>
    </g>
  );
}

function Valve({ P, x, y }: { P: PF; x: number; y: number }) {
  const [sx, sy] = P(x, y, 0.08);
  return (
    <g>
      <ellipse cx={sx} cy={sy + 3} rx="13" ry="7.5" fill="#06223a" stroke={EDGE_SOFT} />
      <ellipse cx={sx} cy={sy} rx="13" ry="7.5" fill="url(#jg-cyltop)" stroke={EDGE} />
      <ellipse cx={sx} cy={sy} rx="5" ry="2.9" fill={AQ} filter="url(#jf-glow)" />
    </g>
  );
}

function Node({ P, x, y, z = 0.1, color = LV }: { P: PF; x: number; y: number; z?: number; color?: string }) {
  const [sx, sy] = P(x, y, z);
  return (
    <g>
      <ellipse cx={sx} cy={sy} rx="9" ry="5.2" fill="none" stroke={color} strokeWidth="1.6" className="jpulse" />
      <ellipse cx={sx} cy={sy} rx="4.4" ry="2.6" fill={color} filter="url(#jf-glow)" />
    </g>
  );
}

function Ripples({ sx, sy, rx, ry }: { sx: number; sy: number; rx: number; ry: number }) {
  return (
    <g fill="none" stroke="#fff" strokeOpacity="0.55">
      {[0, 1].map((i) => (
        <ellipse key={i} cx={sx} cy={sy} rx={rx} ry={ry} className="jripple" style={{ animationDelay: `${i * 1.6}s` }} />
      ))}
    </g>
  );
}

function Card({
  x, y, w, label, dot = false, delay = "0s", sheen = true,
}: { x: number; y: number; w: number; label: string; dot?: boolean; delay?: string; sheen?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="jfloat" style={{ animationDelay: delay }}>
        <rect width={w} height="46" rx="16" fill="#06223a" fillOpacity="0.55" />
        <rect width={w} height="46" rx="16" fill="url(#jg-card)" stroke="url(#jg-cardstroke)" filter="url(#jf-shadow)" />
        {sheen && <path d={`M18 1.6H${w - 18}`} stroke="#fff" strokeOpacity="0.42" strokeLinecap="round" />}
        <circle cx="27" cy="23" r="13" fill={LV} fillOpacity="0.16" stroke={LV} strokeOpacity="0.5" />
        {dot ? (
          <circle cx="27" cy="23" r="4.6" fill={LV} className="jblink" />
        ) : (
          <path d="M21.5 23.5l4 4 7.5-8.5" stroke={LV} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        )}
        <text x="50" y="28.4" fontSize="16" fontWeight="700" fill="#fff">
          {label}
        </text>
      </g>
    </g>
  );
}

function GabledRoof({ P, x, y, w, d, h, r, over = 0.18 }: { P: PF; x: number; y: number; w: number; d: number; h: number; r: number; over?: number }) {
  return (
    <g strokeLinejoin="round">
      <polygon
        points={pts(P(x - over, y + d + over, h), P(x + w + over, y + d + over, h), P(x + w + over, y + d / 2, h + r), P(x - over, y + d / 2, h + r))}
        fill="url(#jg-top)"
        stroke={EDGE}
      />
      <polygon
        points={pts(P(x + w + over, y - over, h), P(x + w + over, y + d + over, h), P(x + w + over, y + d / 2, h + r))}
        fill="url(#jg-right)"
        stroke={EDGE_SOFT}
      />
    </g>
  );
}

/* ───────────────────────── scenes ───────────────────────── */

function TreatmentScene() {
  const P = mk(300, 108);
  const tank = (cx: number, cy: number) => {
    const [sx, sy] = P(cx, cy, 0);
    const rx = 0.95 * DX * SQ2, ry = 0.95 * DY * SQ2;
    const top = sy - 1.35 * U;
    return (
      <g>
        <Cyl P={P} cx={cx} cy={cy} r={0.95} h={1.35} />
        <ellipse cx={sx} cy={top} rx={rx * 0.74} ry={ry * 0.74} fill="url(#jg-water)" />
        <Ripples sx={sx} sy={top} rx={rx * 0.5} ry={ry * 0.5} />
      </g>
    );
  };
  return (
    <>
      <Slab P={P} w={6} d={6} />
      <Pipe P={P} path={[[0, 3.2], [6, 3.2]]} w={12} />
      <Pipe P={P} path={[[1.5, 1.5], [1.5, 3.2]]} w={8} />
      <Pipe P={P} path={[[4.2, 1.5], [4.2, 3.2]]} w={8} />
      {tank(1.5, 1.5)}
      {tank(4.2, 1.5)}
      <Box P={P} x={2.4} y={3.9} w={2.4} d={1.5} h={0.95} win={{ cols: 4, rows: 1 }} />
      <Card x={26} y={30} w={196} label="Treated water" delay="0s" />
      <Card x={376} y={324} w={196} label="Quality-assured" delay="-2s" />
    </>
  );
}

function ReservoirScene() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const P = mk(300, 126);
  const [sx, sy] = P(3, 3, 0);
  const R = 1.7;
  const rx = R * DX * SQ2, ry = R * DY * SQ2;
  const H = 2.3;
  const top = sy - H * U;
  const body = `M${f(sx - rx)} ${f(top)}L${f(sx - rx)} ${f(sy)}A${f(rx)} ${f(ry)} 0 0 0 ${f(sx + rx)} ${f(sy)}L${f(sx + rx)} ${f(top)}Z`;
  const wy = top + H * U * 0.34;
  return (
    <>
      <Slab P={P} w={6} d={6} />
      <Pipe P={P} path={[[0, 3], [1.4, 3]]} w={12} />
      <Pipe P={P} path={[[4.6, 3], [6, 3]]} w={12} />
      <clipPath id={`rc-${uid}`}>
        <path d={body} />
      </clipPath>
      <path d={body} fill="url(#jg-cyl)" stroke={EDGE_SOFT} />
      <g clipPath={`url(#rc-${uid})`}>
        <g className="jlevel">
          <rect x={sx - rx} y={wy} width={rx * 2} height={sy - wy + ry + 24} fill="url(#jg-water)" fillOpacity="0.9" />
          <ellipse cx={sx} cy={wy} rx={rx} ry={ry} fill="#8fe8f8" fillOpacity="0.85" stroke="#fff" strokeOpacity="0.7" />
          <ellipse cx={sx - rx * 0.3} cy={wy - 1} rx={rx * 0.4} ry={ry * 0.32} fill="#fff" fillOpacity="0.2" />
          <Ripples sx={sx + rx * 0.1} sy={wy} rx={rx * 0.5} ry={ry * 0.5} />
        </g>
      </g>
      <path d={body} fill="url(#jg-glass)" />
      {[0.3, 0.62].map((t) => (
        <path key={t} d={`M${f(sx - rx)} ${f(top + (sy - top) * t)}A${f(rx)} ${f(ry)} 0 0 0 ${f(sx + rx)} ${f(top + (sy - top) * t)}`} stroke="#fff" strokeOpacity="0.16" fill="none" />
      ))}
      <rect x={sx - rx * 0.66} y={top + 6} width="9" height={H * U - 14} rx="4" fill="#fff" fillOpacity="0.2" />
      <ellipse cx={sx} cy={top} rx={rx} ry={ry} fill="url(#jg-cyltop)" stroke={EDGE} />
      <ellipse cx={sx} cy={top} rx={rx * 0.8} ry={ry * 0.8} fill="#06233a" stroke={EDGE_SOFT} />
      <ellipse cx={sx} cy={top} rx={rx * 0.8} ry={ry * 0.8} fill="url(#jg-water)" fillOpacity="0.55" />
      {/* level tower */}
      <Box P={P} x={5.0} y={0.7} w={0.4} d={0.4} h={2.3} />
      {Array.from({ length: 8 }, (_, i) => {
        const [tx, ty] = P(5.0, 1.1, 0.3 + i * 0.26);
        return <line key={i} x1={tx - 12} y1={ty} x2={tx - 4} y2={ty + 2.3} stroke="#fff" strokeOpacity="0.5" />;
      })}
      <g className="jmark">
        {(() => {
          const [tx, ty] = P(5.0, 1.1, 1.1);
          return <path d={`M${f(tx - 15)} ${f(ty)}l-8 -5v10z`} fill={LV} filter="url(#jf-glow)" />;
        })()}
      </g>
      <Card x={26} y={30} w={188} label="Level control" dot delay="0s" />
      <Card x={392} y={324} w={180} label="Steady supply" delay="-2.4s" />
    </>
  );
}

function PumpScene() {
  const P = mk(300, 110);
  const pump = (cx: number, cy: number, delay: string) => {
    const [sx, sy] = P(cx, cy, 0);
    const r = 0.55;
    const rx = r * DX * SQ2, ry = r * DY * SQ2;
    const top = sy - 1.0 * U;
    return (
      <g>
        <Cyl P={P} cx={cx} cy={cy} r={r} h={1.0} />
        <ellipse cx={sx} cy={top} rx={rx * 0.74} ry={ry * 0.74} fill="none" stroke={AQ} strokeWidth="2.2" strokeDasharray="7 9" className="jflow" style={{ animationDuration: "1.1s", animationDelay: delay }} filter="url(#jf-glow)" />
        <ellipse cx={sx} cy={top} rx={rx * 0.3} ry={ry * 0.3} fill={AQ} fillOpacity="0.85" />
      </g>
    );
  };
  const [gx, gy] = P(3.1, 2.0, 1.9);
  return (
    <>
      <Slab P={P} w={6} d={6} />
      <Pipe P={P} path={[[0, 4.6], [6, 4.6]]} w={13} />
      <Pipe P={P} path={[[2.1, 4.6], [2.1, 3.6]]} w={8} />
      <Pipe P={P} path={[[3.9, 4.6], [3.9, 3.6]]} w={8} />
      <Box P={P} x={1.4} y={1.0} w={3.2} d={2.1} h={1.5} win={{ cols: 5, rows: 1 }} />
      <Box P={P} x={2.6} y={1.5} w={1.0} d={0.9} z={1.5} h={0.4} />
      <g transform={`translate(${f(gx)} ${f(gy - 20)})`}>
        <path d="M0 -26 L0 -6" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.6" />
        <circle cx="0" cy="-28" r="3" fill={AQ} filter="url(#jf-glow)" />
        <circle cx="0" cy="-28" r="6" fill="none" stroke={AQ} className="jpulse" />
      </g>
      {pump(2.1, 3.6, "0s")}
      {pump(3.9, 3.6, "-0.5s")}
      <g transform="translate(26 26)">
        <g className="jfloat">
          <rect width="150" height="104" rx="18" fill="#06223a" fillOpacity="0.55" />
          <rect width="150" height="104" rx="18" fill="url(#jg-card)" stroke="url(#jg-cardstroke)" filter="url(#jf-shadow)" />
          <path d="M18 1.6H132" stroke="#fff" strokeOpacity="0.42" strokeLinecap="round" />
          <g transform="translate(75 68)">
            <path d="M-40 0 A40 40 0 0 1 40 0" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="9" strokeLinecap="round" />
            <path d="M-40 0 A40 40 0 0 1 22 -33.4" fill="none" stroke={LV} strokeWidth="9" strokeLinecap="round" filter="url(#jf-glow)" />
            <g className="jgauge">
              <line x1="0" y1="0" x2="0" y2="-32" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            </g>
            <circle r="5.5" fill="#fff" />
          </g>
          <text x="75" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff" fillOpacity="0.85">
            Pressure
          </text>
        </g>
      </g>
      <Card x={352} y={322} w={220} label="Scheduled pumping" delay="-2.2s" />
    </>
  );
}

function NetworkScene() {
  const P = mk(300, 104);
  const house = (x: number, y: number, lit = false) => <Box P={P} x={x} y={y} w={0.95} d={0.95} h={0.75} win={{ cols: 2, rows: 1, lit }} />;
  return (
    <>
      <Slab P={P} w={6} d={6} />
      <Pipe P={P} path={[[0, 3], [3, 3]]} w={13} />
      <Pipe P={P} path={[[0.9, 0.9], [5.1, 0.9], [5.1, 5.1], [0.9, 5.1], [0.9, 0.9]]} w={8} />
      <Pipe P={P} path={[[3, 0.9], [3, 5.1]]} w={8} />
      <Pipe P={P} path={[[3, 3], [5.1, 3]]} w={8} />
      <Valve P={P} x={1.8} y={3} />
      <Valve P={P} x={3} y={1.8} />
      <Valve P={P} x={4.2} y={5.1} />
      {house(1.55, 1.55)}
      {house(3.55, 1.55)}
      {house(1.55, 3.55, true)}
      {house(3.55, 3.55)}
      <Node P={P} x={3} y={3} />
      <Node P={P} x={0.9} y={0.9} color={AQ} />
      <Node P={P} x={5.1} y={5.1} color={AQ} />
      <Card x={26} y={30} w={206} label="Pressure managed" delay="0s" />
      <Card x={380} y={324} w={192} label="Valves isolate" dot delay="-2.1s" />
    </>
  );
}

function ConnectionScene() {
  const P = mk(300, 108);
  const [bx, by] = P(3.6, 3.6, 0.35);
  return (
    <>
      <Slab P={P} w={6} d={6} />
      <Pipe P={P} path={[[0, 5.1], [6, 5.1]]} w={14} />
      <Pipe P={P} path={[[2.4, 5.1], [2.4, 3.6], [3.6, 3.6]]} w={8} />
      <Pipe P={P} path={[[3.6, 3.6], [3.6, 2.9]]} w={8} />
      <Valve P={P} x={2.4} y={4.3} />
      <Box P={P} x={3.25} y={3.25} w={0.7} d={0.7} h={0.35} />
      <ellipse cx={bx} cy={by} rx="7" ry="4" fill={LV} fillOpacity="0.85" filter="url(#jf-glow)" />
      <Box P={P} x={2.4} y={0.7} w={2.6} d={2.1} h={1.5} win={{ cols: 3, rows: 1, lit: true }} />
      <GabledRoof P={P} x={2.4} y={0.7} w={2.6} d={2.1} h={1.5} r={0.85} />
      <Node P={P} x={2.4} y={5.1} color={AQ} />
      <g transform="translate(26 26)">
        <g className="jfloat">
          <rect width="210" height="132" rx="18" fill="#06223a" fillOpacity="0.55" />
          <rect width="210" height="132" rx="18" fill="url(#jg-card)" stroke="url(#jg-cardstroke)" filter="url(#jf-shadow)" />
          <path d="M18 1.6H192" stroke="#fff" strokeOpacity="0.42" strokeLinecap="round" />
          <text x="20" y="32" fontSize="16" fontWeight="700" fill="#fff">
            Connection record
          </text>
          {["Inspected", "Installed", "Recorded"].map((t, i) => (
            <g key={t} transform={`translate(20 ${50 + i * 25})`}>
              <circle cx="9" cy="9" r="9" fill={LV} fillOpacity="0.16" stroke={LV} strokeOpacity="0.5" />
              <path d="M4.5 9.3l3.2 3.2 6-6.8" stroke={LV} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="jchip" style={{ animationDelay: `${i * 0.7}s` }} />
              <text x="28" y="14" fontSize="14" fontWeight="600" fill="#fff" fillOpacity="0.9">
                {t}
              </text>
            </g>
          ))}
        </g>
      </g>
    </>
  );
}

function MeterScene() {
  const P = mk(300, 120);
  const [sx, sy] = P(3, 3, 1.5);
  const R = 74;
  const ticks = Array.from({ length: 40 }, (_, i) => {
    const a = (i / 40) * Math.PI * 2;
    const major = i % 5 === 0;
    const r1 = major ? R * 0.72 : R * 0.8;
    return (
      <line key={i} x1={Math.sin(a) * r1} y1={-Math.cos(a) * r1} x2={Math.sin(a) * R * 0.88} y2={-Math.cos(a) * R * 0.88} stroke="#fff" strokeOpacity={major ? 0.85 : 0.35} strokeWidth={major ? 3 : 1.6} />
    );
  });
  return (
    <>
      <Slab P={P} w={6} d={6} />
      <Pipe P={P} path={[[0, 3], [6, 3]]} w={15} />
      <Cyl P={P} cx={3} cy={3} r={1.7} h={1.5} />
      {/* dial lying flat on top: a circle squashed by the isometric tilt */}
      <g transform={`translate(${f(sx)} ${f(sy)}) scale(1 0.577)`}>
        <circle r={R + 10} fill="url(#jg-bezel)" />
        <circle r={R + 3} fill="#06233a" />
        <circle r={R} fill="url(#jg-dial)" />
        <circle r={R * 0.93} fill="none" stroke={AQ} strokeOpacity="0.4" />
        {ticks}
        <g className="jdialflat">
          <path d={`M0 ${f(-R * 0.66)}L5 0L-5 0Z`} fill={LV} filter="url(#jf-glow)" />
        </g>
        <circle r="9" fill="#fff" />
        <circle r="4" fill="#06233a" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${-52 + i * 21} 22)`}>
            <rect width="18" height="25" rx="4" fill="#02101e" stroke="rgba(255,255,255,0.3)" />
            <text x="9" y="18.5" textAnchor="middle" fontSize="16" fontWeight="700" fill={i === 4 ? LV : "#fff"}>
              {[0, 0, 4, 8, 7][i]}
            </text>
          </g>
        ))}
      </g>
      <Card x={26} y={30} w={170} label="Calibrated" dot delay="0s" />
      <Card x={376} y={324} w={196} label="Reading validated" delay="-2.3s" />
    </>
  );
}

function CustomerScene() {
  const P = mk(352, 104);
  const x = 2.4, y = 0.8, w = 2.8, d = 2.3, h = 1.7;
  const [tx, ty] = P(1.6, 4.8, 0.05);
  const spout = `M${f(tx)} ${f(ty)}L${f(tx)} ${f(ty - 46)}L${f(tx + 26)} ${f(ty - 46)}L${f(tx + 26)} ${f(ty - 38)}`;
  return (
    <>
      <Slab P={P} w={6} d={6} />
      <Pipe P={P} path={[[0, 4.8], [1.6, 4.8]]} w={12} />
      <Box P={P} x={x} y={y} w={w} d={d} h={h} win={{ cols: 3, rows: 2, lit: true }} />
      <GabledRoof P={P} x={x} y={y} w={w} d={d} h={h} r={0.95} />
      <polygon points={pts(P(x + 1.15, y + d, 0), P(x + 1.65, y + d, 0), P(x + 1.65, y + d, 1.0), P(x + 1.15, y + d, 1.0))} fill="#04182a" stroke={EDGE_SOFT} />
      <g>
        <path d={spout} stroke="#fff" strokeOpacity="0.3" strokeWidth="11" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={spout} stroke="#2e7aa6" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={tx} cy={ty - 46} r="9" fill="url(#jg-cyltop)" stroke={EDGE} />
        {[0, 1].map((i) => (
          <path key={i} d={`M${f(tx + 26)} ${f(ty - 32)}q-5 8 0 12q5 -4 0 -12Z`} fill="#8fe8f8" className="jdrip" style={{ animationDelay: `${i * 0.85}s` }} />
        ))}
        <path d={`M${f(tx + 14)} ${f(ty - 2)}l3 24h22l3 -24`} fill="#fff" fillOpacity="0.1" stroke="#fff" strokeOpacity="0.65" strokeWidth="2" strokeLinejoin="round" />
        <rect x={tx + 17.5} y={ty + 10} width="19" height="12" rx="2" fill="url(#jg-water)" />
      </g>
      {[
        ["Read", 128],
        ["Billed", 150],
        ["Collected", 188],
      ].map(([t, wd], i) => (
        <Card key={t as string} x={26} y={26 + i * 58} w={wd as number} label={t as string} sheen={false} delay={`${-i * 0.8}s`} />
      ))}
    </>
  );
}

const SCENES: Record<string, () => ReactNode> = {
  "bulk-supply": TreatmentScene,
  reservoir: ReservoirScene,
  pumping: PumpScene,
  network: NetworkScene,
  connection: ConnectionScene,
  meter: MeterScene,
  customer: CustomerScene,
};

export function JourneyScene({ stageKey, label }: { stageKey: string; label: string }) {
  const Scene = SCENES[stageKey];
  return (
    <svg viewBox="0 0 600 400" role="img" aria-label={`Illustration: ${label}`} className="h-full w-full overflow-visible" fontFamily="var(--font-figtree), sans-serif">
      {Scene ? <Scene /> : null}
    </svg>
  );
}
