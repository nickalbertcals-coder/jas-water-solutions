import type { ReactNode } from "react";

/*
 * One illustration per stop on "The journey of one cubic meter".
 * Flat, glowing line-and-fill drawings on a shared 600×460 canvas, each with a
 * few looping micro-animations (classes `j*` in globals.css) so every stage
 * feels like a live piece of the system. Gradients live in <JourneyDefs/>,
 * rendered once by the section, so these scenes carry no ids of their own.
 */

const AQ = "#4cc9e8";
const LV = "#3ee0b4";
const EDGE = "rgba(255,255,255,0.3)";

export function JourneyDefs() {
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        <linearGradient id="jg-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={AQ} stopOpacity="0.8" />
          <stop offset="1" stopColor="#1b7fa6" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="jg-tank" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1f5a80" />
          <stop offset="1" stopColor="#0d2f4d" />
        </linearGradient>
        <linearGradient id="jg-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a6c96" />
          <stop offset="1" stopColor="#174b72" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ───────────── shared pieces ───────────── */

function Pipe({ d, w = 16 }: { d: string; w?: number }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={EDGE} strokeWidth={w + 4} />
      <path d={d} stroke="#0d2f4d" strokeWidth={w + 2} />
      <path d={d} stroke="#164b70" strokeWidth={w - 2} />
      <path d={d} stroke={AQ} strokeWidth={3} strokeDasharray="3 15" className="jflow" />
    </g>
  );
}

function wavePath(x: number, y: number, w: number, h: number, amp: number, phase: number) {
  let d = `M${x} ${y + h} L${x} ${y.toFixed(1)}`;
  const n = Math.max(2, Math.round(w / 8));
  for (let k = 0; k <= n; k++) {
    const i = (k / n) * w;
    d += ` L${(x + i).toFixed(1)} ${(y + Math.sin((i / w) * Math.PI * 4 + phase) * amp).toFixed(1)}`;
  }
  return `${d} L${x + w} ${y + h} Z`;
}

function surfaceLine(x: number, y: number, w: number, amp: number, phase: number) {
  let d = `M${x} ${(y + Math.sin(phase) * amp).toFixed(1)}`;
  const n = Math.max(2, Math.round(w / 8));
  for (let k = 1; k <= n; k++) {
    const i = (k / n) * w;
    d += ` L${(x + i).toFixed(1)} ${(y + Math.sin((i / w) * Math.PI * 4 + phase) * amp).toFixed(1)}`;
  }
  return d;
}

/** Water body with a shimmering surface. */
function Water({ x, y, w, h, amp = 4 }: { x: number; y: number; w: number; h: number; amp?: number }) {
  return (
    <g>
      <path d={wavePath(x, y, w, h, amp, 0)} fill="url(#jg-water)" />
      <path d={surfaceLine(x, y, w, amp, 1.2)} stroke={AQ} strokeWidth="2" fill="none" className="jshimmer-a" />
      <path d={surfaceLine(x, y, w, amp, 3.1)} stroke="#fff" strokeOpacity="0.7" strokeWidth="1.4" fill="none" className="jshimmer-b" />
    </g>
  );
}

function Ground({ y = 392 }: { y?: number }) {
  return (
    <g>
      <ellipse cx="300" cy={y} rx="270" ry="16" fill={AQ} fillOpacity="0.07" />
      <line x1="40" y1={y - 6} x2="560" y2={y - 6} stroke="#fff" strokeOpacity="0.08" />
    </g>
  );
}

function Chip({
  x,
  y,
  w,
  text,
  icon = "check",
  className,
  delay,
}: {
  x: number;
  y: number;
  w: number;
  text: string;
  icon?: "check" | "dot";
  className?: string;
  delay?: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={className} style={delay ? { animationDelay: delay } : undefined}>
        <rect width={w} height="38" rx="19" fill="#06223a" fillOpacity="0.85" stroke="rgba(255,255,255,0.28)" />
        {icon === "check" ? (
          <path d="M14 19l5 5 9-10" stroke={LV} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <circle cx="21" cy="19" r="5" fill={LV} className="jblink" />
        )}
        <text x="38" y="24.5" fontSize="15" fontWeight="600" fill="#fff">
          {text}
        </text>
      </g>
    </g>
  );
}

function Valve({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <line x1="0" y1="-10" x2="0" y2="-24" stroke="#fff" strokeOpacity="0.55" strokeWidth="2.5" />
      <line x1="-9" y1="-24" x2="9" y2="-24" stroke={AQ} strokeWidth="3.5" strokeLinecap="round" />
      <circle r="13" fill="#0d2f4d" stroke={AQ} strokeWidth="2" />
      <path d="M-6 -6 L6 6 V-6 L-6 6 Z" fill={AQ} fillOpacity="0.9" />
    </g>
  );
}

function Pulse({ x, y, r = 12, color = LV }: { x: number; y: number; r?: number; color?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="none" stroke={color} strokeWidth="2" className="jpulse" />
      <circle cx={x} cy={y} r={4.5} fill={color} />
    </g>
  );
}

function House({ x, y, w, h, lit = false }: { x: number; y: number; w: number; h: number; lit?: boolean }) {
  const roofH = h * 0.5;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill="url(#jg-tank)" stroke={EDGE} />
      <path d={`M${x - 14} ${y + 2} L${x + w / 2} ${y - roofH} L${x + w + 14} ${y + 2} Z`} fill="url(#jg-roof)" stroke={EDGE} strokeLinejoin="round" />
      <rect x={x + w * 0.12} y={y + h * 0.2} width={w * 0.24} height={h * 0.28} rx="4" fill={lit ? LV : "#6bb8f2"} fillOpacity={lit ? 0.55 : 0.4} stroke={EDGE} />
      <rect x={x + w * 0.64} y={y + h * 0.2} width={w * 0.24} height={h * 0.28} rx="4" fill={lit ? LV : "#6bb8f2"} fillOpacity={lit ? 0.55 : 0.4} stroke={EDGE} />
      <rect x={x + w * 0.4} y={y + h * 0.5} width={w * 0.2} height={h * 0.5} rx="4" fill="#06223a" stroke={EDGE} />
    </g>
  );
}

/* ───────────── scenes ───────────── */

function TreatmentScene() {
  const tank = (x: number) => (
    <g>
      <rect x={x} y="200" width="150" height="130" rx="12" fill="url(#jg-tank)" stroke={EDGE} strokeWidth="1.5" />
      <rect x={x - 8} y="186" width="166" height="8" rx="4" fill="#2a6c96" stroke={EDGE} />
      <line x1={x + 30} y1="194" x2={x + 30} y2="200" stroke={EDGE} />
      <line x1={x + 120} y1="194" x2={x + 120} y2="200" stroke={EDGE} />
      <Water x={x + 4} y={246} w={142} h={80} amp={4} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + 40 + i * 35} cy="318" r="3" fill="#fff" fillOpacity="0.7" className="jrise" style={{ animationDelay: `${i * 0.9}s` }} />
      ))}
    </g>
  );
  return (
    <>
      <Ground />
      <Pipe d="M-60 300 H122" w={18} />
      <Pipe d="M268 300 H332" w={18} />
      <Pipe d="M478 300 H660" w={18} />
      {tank(120)}
      {tank(330)}
      <Chip x={44} y={66} w={190} text="Treated water" />
      <Chip x={380} y={118} w={176} text="Quality-assured" />
    </>
  );
}

function ReservoirScene() {
  return (
    <>
      <Ground />
      <Pipe d="M-60 150 H192" w={16} />
      <Pipe d="M408 322 H660" w={18} />
      {/* tank */}
      <rect x="190" y="112" width="220" height="238" rx="18" fill="url(#jg-tank)" stroke={EDGE} strokeWidth="1.5" />
      {[245, 300, 355].map((x) => (
        <line key={x} x1={x} y1="132" x2={x} y2="346" stroke="#fff" strokeOpacity="0.07" />
      ))}
      <ellipse cx="300" cy="112" rx="110" ry="14" fill="#2a6c96" stroke={EDGE} />
      {/* water: scales up from the tank floor so the level rises and falls */}
      <g className="jlevel">
        <Water x={194} y={232} w={212} h={114} amp={5} />
      </g>
      {[0, 1].map((i) => (
        <circle key={i} cx="212" cy="162" r="4.5" fill={AQ} className="jdrip" style={{ animationDelay: `${i * 0.85}s` }} />
      ))}
      {/* level gauge */}
      <rect x="448" y="120" width="10" height="222" rx="5" fill="#06223a" stroke={EDGE} />
      {Array.from({ length: 10 }, (_, i) => (
        <line key={i} x1="462" y1={132 + i * 22} x2={i % 3 === 0 ? 478 : 472} y2={132 + i * 22} stroke="#fff" strokeOpacity="0.4" />
      ))}
      <g className="jmark">
        <path d="M444 232 L430 224 V240 Z" fill={LV} />
        <line x1="444" y1="232" x2="458" y2="232" stroke={LV} strokeWidth="2" />
      </g>
      <Chip x={44} y={60} w={170} text="Level control" icon="dot" />
      <Chip x={402} y={380} w={160} text="Steady supply" />
    </>
  );
}

function PumpScene() {
  const pump = (cx: number) => (
    <g>
      <circle cx={cx} cy="292" r="46" fill="#0a2740" stroke={AQ} strokeOpacity="0.7" strokeWidth="2" />
      <g transform={`translate(${cx} 292)`}>
        <g className="jspin">
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <path key={a} d="M0 0 Q14 -6 30 -24" stroke={AQ} strokeWidth="6" strokeLinecap="round" fill="none" transform={`rotate(${a})`} />
          ))}
        </g>
        <circle r="8" fill="#fff" />
      </g>
    </g>
  );
  return (
    <>
      <Ground />
      <path d="M118 196 L300 118 L482 196 Z" fill="url(#jg-roof)" stroke={EDGE} strokeLinejoin="round" />
      <rect x="140" y="196" width="320" height="164" rx="8" fill="url(#jg-tank)" stroke={EDGE} strokeWidth="1.5" />
      <Pipe d="M-60 330 H660" w={18} />
      {pump(235)}
      {pump(365)}
      {/* pressure gauge */}
      <circle cx="300" cy="232" r="26" fill="#06223a" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
      {Array.from({ length: 9 }, (_, i) => {
        const a = (-120 + i * 30) * (Math.PI / 180);
        return (
          <line
            key={i}
            x1={300 + Math.sin(a) * 19}
            y1={232 - Math.cos(a) * 19}
            x2={300 + Math.sin(a) * 23}
            y2={232 - Math.cos(a) * 23}
            stroke="#fff"
            strokeOpacity="0.6"
          />
        );
      })}
      <g transform="translate(300 232)">
        <g className="jswing">
          <line x1="0" y1="-18" x2="0" y2="0" stroke={LV} strokeWidth="3" strokeLinecap="round" />
        </g>
        <circle r="3.5" fill="#fff" />
      </g>
      <path d="M300 150 l-9 15 h8 l-4 14 l12 -18 h-8 z" fill={AQ} />
      <Chip x={44} y={60} w={190} text="Real-time status" icon="dot" />
      <Chip x={392} y={60} w={160} text="Pump schedule" />
    </>
  );
}

function NetworkScene() {
  const house = (x: number, y: number) => (
    <g>
      <rect x={x - 22} y={y - 22} width="44" height="44" rx="9" fill="url(#jg-tank)" stroke={EDGE} />
      <rect x={x - 12} y={y - 12} width="9" height="9" rx="2" fill="#6bb8f2" fillOpacity="0.8" />
      <rect x={x + 3} y={y - 12} width="9" height="9" rx="2" fill="#6bb8f2" fillOpacity="0.8" />
      <rect x={x - 12} y={y + 3} width="9" height="9" rx="2" fill="#6bb8f2" fillOpacity="0.5" />
      <rect x={x + 3} y={y + 3} width="9" height="9" rx="2" fill={LV} fillOpacity="0.8" className="jblink" />
    </g>
  );
  return (
    <>
      <Ground />
      <Pipe d="M-60 230 H300" w={18} />
      <Pipe d="M300 230 V110 H536" w={13} />
      <Pipe d="M300 230 H536" w={13} />
      <Pipe d="M300 230 V350 H536" w={13} />
      <Pipe d="M440 110 V230 V350" w={9} />
      <circle cx="300" cy="230" r="22" fill="#0d2f4d" stroke={AQ} strokeWidth="2" />
      <Pulse x={300} y={230} r={14} color={AQ} />
      <Valve x={360} y={110} />
      <Valve x={370} y={230} />
      <Valve x={360} y={350} />
      {house(570, 110)}
      {house(570, 230)}
      {house(570, 350)}
      <Pulse x={440} y={170} r={9} />
      <Pulse x={440} y={290} r={9} />
      <Chip x={44} y={60} w={200} text="Pressure managed" />
      <Chip x={44} y={364} w={182} text="Valves isolate" icon="dot" />
    </>
  );
}

function ConnectionScene() {
  return (
    <>
      {/* below-ground tint */}
      <rect x="-80" y="300" width="760" height="200" fill="#02131f" fillOpacity="0.35" />
      <line x1="-80" y1="300" x2="680" y2="300" stroke="#fff" strokeOpacity="0.18" />
      <Pipe d="M-60 390 H660" w={22} />
      <Pipe d="M280 390 V345 H500 V300" w={12} />
      <circle cx="280" cy="390" r="17" fill="#0d2f4d" stroke={AQ} strokeWidth="2" />
      <Pulse x={280} y={390} r={14} />
      <Valve x={380} y={345} />
      <House x={430} y={192} w={140} h={108} />
      {/* inspection / record card */}
      <g transform="translate(44 70)">
        <rect width="196" height="118" rx="14" fill="#06223a" fillOpacity="0.88" stroke="rgba(255,255,255,0.28)" />
        <text x="18" y="30" fontSize="15" fontWeight="700" fill="#fff">
          Connection record
        </text>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(18 ${48 + i * 22})`}>
            <path d="M0 8l4 4 8-9" stroke={LV} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" className="jchip" style={{ animationDelay: `${i * 0.7}s` }} />
            <rect x="24" y="4" width={[110, 88, 100][i]} height="7" rx="3.5" fill="#fff" fillOpacity="0.28" />
          </g>
        ))}
      </g>
    </>
  );
}

function MeterScene() {
  const ticks = Array.from({ length: 36 }, (_, i) => {
    const a = (i * 10 * Math.PI) / 180;
    const major = i % 3 === 0;
    const r1 = major ? 70 : 76;
    return (
      <line
        key={i}
        x1={Math.sin(a) * r1}
        y1={-Math.cos(a) * r1}
        x2={Math.sin(a) * 84}
        y2={-Math.cos(a) * 84}
        stroke="#fff"
        strokeOpacity={major ? 0.7 : 0.3}
        strokeWidth={major ? 2.5 : 1.5}
      />
    );
  });
  return (
    <>
      <Ground />
      <Pipe d="M-60 345 H660" w={18} />
      {/* meter body */}
      <rect x="236" y="302" width="128" height="84" rx="14" fill="url(#jg-tank)" stroke={EDGE} strokeWidth="1.5" />
      <rect x="224" y="330" width="14" height="30" rx="3" fill="#2a6c96" stroke={EDGE} />
      <rect x="362" y="330" width="14" height="30" rx="3" fill="#2a6c96" stroke={EDGE} />
      {/* dial */}
      <g transform="translate(300 176)">
        <circle r="98" fill="#0a2740" stroke={EDGE} strokeWidth="3" />
        <circle r="88" fill="none" stroke={AQ} strokeOpacity="0.35" />
        {ticks}
        <g className="jdial">
          <line x1="0" y1="-66" x2="0" y2="0" stroke={LV} strokeWidth="4.5" strokeLinecap="round" />
        </g>
        <circle r="9" fill="#fff" />
        {/* odometer */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${-60 + i * 25} 38)`}>
            <rect width="21" height="29" rx="4" fill="#02131f" stroke={EDGE} />
            <text x="10.5" y="21" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff" fillOpacity={i === 4 ? 0 : 0.9}>
              {[0, 0, 4, 8, 7][i]}
            </text>
          </g>
        ))}
        <text x="50.5" y="59" textAnchor="middle" fontSize="18" fontWeight="700" fill={LV} className="jshimmer-a">
          7
        </text>
        <text x="50.5" y="59" textAnchor="middle" fontSize="18" fontWeight="700" fill={LV} className="jshimmer-b">
          8
        </text>
      </g>
      <Chip x={402} y={70} w={170} text="Reading validated" />
      <Chip x={40} y={70} w={170} text="Calibrated" icon="dot" />
    </>
  );
}

function CustomerScene() {
  return (
    <>
      <Ground y={366} />
      <House x={330} y={190} w={200} h={160} lit />
      {/* tap */}
      <Pipe d="M-60 330 H120 V250 H200 V272" w={14} />
      <circle cx="120" cy="250" r="12" fill="#0d2f4d" stroke={AQ} strokeWidth="2" />
      <line x1="120" y1="238" x2="120" y2="226" stroke="#fff" strokeOpacity="0.6" strokeWidth="2.5" />
      <line x1="108" y1="226" x2="132" y2="226" stroke={AQ} strokeWidth="4" strokeLinecap="round" />
      {[0, 1].map((i) => (
        <path key={i} d="M200 286 q-5 8 0 12 q5 -4 0 -12 Z" fill={AQ} className="jdrip" style={{ animationDelay: `${i * 0.85}s` }} />
      ))}
      {/* glass */}
      <path d="M168 308 L174 352 H226 L232 308" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="175" y="328" width="50" height="22" rx="3" fill="url(#jg-water)" />
      <path d="M175 328 H225" stroke={AQ} strokeWidth="2" className="jshimmer-a" />
      {/* what happens at the end of the line */}
      <Chip x={44} y={52} w={150} text="Read" className="jchip" delay="0s" />
      <Chip x={44} y={100} w={178} text="Billed" className="jchip" delay="0.8s" />
      <Chip x={44} y={148} w={196} text="Collected" className="jchip" delay="1.6s" />
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
    <svg viewBox="0 30 600 400" role="img" aria-label={`Illustration: ${label}`} className="h-full w-full overflow-visible" fontFamily="var(--font-figtree), sans-serif">
      {Scene ? <Scene /> : null}
    </svg>
  );
}
