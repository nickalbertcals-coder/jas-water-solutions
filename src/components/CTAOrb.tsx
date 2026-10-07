/**
 * Centrepiece for the call-to-action band: a frosted-glass medallion holding a
 * glossy water drop. Around it: a slowly turning ring of light, a counter-
 * rotating ring of fine tick marks, and thin ripples spreading outward. All
 * motion is CSS and switches off for reduced motion.
 */
export default function CTAOrb() {
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const a = (i / 72) * Math.PI * 2;
    const major = i % 6 === 0;
    const r1 = major ? 47 : 48.6;
    return (
      <line
        key={i}
        x1={50 + Math.sin(a) * r1}
        y1={50 - Math.cos(a) * r1}
        x2={50 + Math.sin(a) * 50}
        y2={50 - Math.cos(a) * 50}
        stroke="#fff"
        strokeOpacity={major ? 0.7 : 0.3}
        strokeWidth={major ? 0.5 : 0.3}
      />
    );
  });

  return (
    <div aria-hidden className="relative aspect-square w-full">
      {/* ripples */}
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="ring-pulse absolute inset-[30%] rounded-full border border-white/35"
          style={{ animationDelay: `${i * 1.2}s`, animationDuration: "3.6s" }}
        />
      ))}

      {/* ambient glow */}
      <span className="absolute inset-[22%] rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.35),transparent)] blur-xl" />

      {/* tick marks, turning the other way */}
      <svg viewBox="0 0 100 100" className="orb-spin-rev absolute inset-[18%] h-[64%] w-[64%]">
        {ticks}
      </svg>

      {/* ring of light */}
      <span
        className="orb-spin absolute inset-[25%] rounded-full"
        style={{
          background: "conic-gradient(from 0deg, rgba(76,201,232,0) 0%, rgba(76,201,232,0.95) 18%, rgba(62,224,180,0.9) 34%, rgba(62,224,180,0) 52%, rgba(255,255,255,0) 100%)",
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2px))",
        }}
      />

      {/* glass medallion */}
      <div className="float-y absolute inset-[31%]">
        <div className="relative h-full w-full overflow-hidden rounded-full border border-white/40 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.34)_0%,rgba(190,236,255,0.12)_42%,rgba(8,60,95,0.35)_100%)] shadow-[0_30px_70px_-20px_rgba(2,12,22,0.9),0_0_60px_-6px_rgba(76,201,232,0.55),inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-18px_36px_rgba(76,201,232,0.25)] backdrop-blur-xl">
          {/* specular arc */}
          <span className="absolute left-[12%] top-[8%] h-[34%] w-[62%] -rotate-[24deg] rounded-[50%] bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0))] blur-[1px]" />
          {/* caustic shimmer at the base */}
          <span className="absolute inset-x-[14%] bottom-[6%] h-[22%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(62,224,180,0.5),transparent)] blur-md" />

          {/* the drop */}
          <svg viewBox="0 0 64 64" className="absolute left-1/2 top-1/2 h-[54%] w-[54%] -translate-x-1/2 -translate-y-[54%] drop-shadow-[0_8px_14px_rgba(5,40,70,0.55)]">
            <defs>
              <linearGradient id="orb-drop" x1="0.2" y1="0" x2="0.8" y2="1">
                <stop offset="0" stopColor="#f4fdff" />
                <stop offset="0.38" stopColor="#8fe8f8" />
                <stop offset="0.75" stopColor="#2fb4d6" />
                <stop offset="1" stopColor="#3ee0b4" />
              </linearGradient>
            </defs>
            <path d="M32 4C31.2 4 30.4 4.5 29.8 5.3 22 15.8 11 28.4 11 40.5 11 51.8 20.4 60 32 60s21-8.2 21-19.5C53 28.4 42 15.8 34.2 5.3 33.6 4.5 32.800 4 32 4Z" fill="url(#orb-drop)" />
            <path d="M32 4C31.2 4 30.4 4.5 29.8 5.3 22 15.8 11 28.4 11 40.5 11 51.8 20.4 60 32 60s21-8.2 21-19.5C53 28.4 42 15.8 34.2 5.3 33.6 4.5 32.800 4 32 4Z" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="0.8" />
            {/* gloss */}
            <path d="M22 41c0-6.500 4-12.500 8.500-18.800" fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="3" strokeLinecap="round" />
            <circle cx="24.5" cy="49" r="1.600" fill="#fff" fillOpacity="0.7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
