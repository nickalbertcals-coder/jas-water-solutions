import type { TeamMember } from "@/lib/data";
import TiltCard from "@/components/motion/TiltCard";
import TeamPortrait from "@/components/TeamPortrait";
import { initials } from "@/components/TeamCard";

/** Management-team card: tilts toward the cursor, with a spotlight and a portrait that gains a ripple ring on hover. */
export default function TeamProfileCard({ member }: { member: TeamMember }) {
  return (
    <TiltCard className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white p-7 shadow-[0_30px_60px_-38px_rgba(10,39,64,0.55)] transition-[border-color,box-shadow] duration-500 hover:border-accent-500/50 hover:shadow-[0_44px_80px_-34px_rgba(10,114,154,0.55)] sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(circle 16rem at var(--mx,50%) var(--my,0%), rgba(76,201,232,0.2), transparent 70%)" }}
        />
        <div className="relative flex flex-col items-center">
          <div className="relative h-28 w-28 shrink-0">
            <span aria-hidden className="ring-pulse absolute inset-0 rounded-full border-2 border-accent-500/60" />
            <span aria-hidden className="ring-pulse absolute inset-0 rounded-full border-2 border-accent-500/60 [animation-delay:1.2s]" />
            <div className="relative h-full w-full rounded-full bg-white shadow-[0_16px_32px_-14px_rgba(10,39,64,0.6)] ring-4 ring-white">
              {member.image ? (
                <TeamPortrait src={member.image} slug={member.slug} alt={member.name} sizes="112px" className="h-full w-full" />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[linear-gradient(160deg,#0f3556,#05182b)] font-display text-3xl font-bold text-paper-50/90">
                  {initials(member.name)}
                </div>
              )}
            </div>
          </div>
          <span className="mt-7 inline-flex rounded-full bg-accent-tint px-4 py-1.5 text-center font-label text-[0.82rem] font-bold leading-snug text-accent-600">
            {member.role}
          </span>
        </div>
        <h3 className="font-display relative mt-5 text-balance text-center text-[1.45rem] font-bold leading-tight text-ink-900">{member.name}</h3>
        <p className="relative mt-1.5 text-center font-label text-sm font-bold text-accent-600">{member.profession}</p>
        <ul className="relative mt-5 space-y-2.5 border-t border-line pt-5 text-[0.95rem] leading-snug text-steel-600">
          {member.expertise.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-accent-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </article>
    </TiltCard>
  );
}
