/**
 * Animated water line along the bottom of the hero: two slow, offset waves in
 * the colour of the section below, so the hero "pours" into the page instead
 * of ending on a hard edge. The strip is twice the viewport wide and slides by
 * exactly half, which loops seamlessly (see `wave-slide` in globals.css).
 */
function wavePath(amp: number, base: number, phase: number) {
  const W = 2880;
  const period = 720;
  let d = `M0 ${base}`;
  for (let x = 0; x <= W; x += 24) {
    const y = base + Math.sin(((x + phase) / period) * Math.PI * 2) * amp;
    d += ` L${x} ${y.toFixed(2)}`;
  }
  return `${d} L${W} 120 L0 120 Z`;
}

const BACK = wavePath(11, 52, 180);
const FRONT = wavePath(9, 70, 0);

export default function WaveEdge() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-14 overflow-hidden sm:h-20 lg:h-24">
      <div className="wave-slide absolute bottom-0 left-0 h-full w-[200%]" style={{ animationDuration: "46s" }}>
        <svg viewBox="0 0 2880 120" preserveAspectRatio="none" className="h-full w-full">
          <path d={BACK} fill="#7fd3ea" fillOpacity="0.38" />
        </svg>
      </div>
      <div className="wave-slide absolute bottom-0 left-0 h-full w-[200%]" style={{ animationDuration: "32s", animationDirection: "reverse" }}>
        <svg viewBox="0 0 2880 120" preserveAspectRatio="none" className="h-full w-full">
          <path d={FRONT} fill="var(--paper-50)" />
        </svg>
      </div>
    </div>
  );
}
