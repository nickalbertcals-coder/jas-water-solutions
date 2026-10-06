import Image from "next/image";
import type { TeamMember } from "@/lib/data";
import { initials } from "./TeamCard";

/**
 * Leadership card: a deep-ocean banner carrying the person's role, a round
 * portrait straddling the banner's edge, then their name, background and main
 * areas of expertise. (The supplied portraits are round cut-outs, so they are
 * shown as circles rather than cropped to fill a rectangle.)
 */
export default function TeamRow({ member }: { member: TeamMember }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_30px_60px_-38px_rgba(10,39,64,0.55)] ring-1 ring-ink-900/8 transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_70px_-34px_rgba(10,114,154,0.5)]">
      <div className="relative h-36 overflow-hidden bg-[linear-gradient(135deg,#05182b_0%,#0b4f78_100%)]">
        <svg aria-hidden viewBox="0 0 400 200" className="absolute -right-16 -top-24 h-[22rem] w-[22rem] text-accent-500" fill="none">
          {[50, 90, 130, 170].map((r, i) => (
            <circle key={r} cx="200" cy="100" r={r} stroke="currentColor" strokeOpacity={0.4 - i * 0.08} />
          ))}
        </svg>
        <div aria-hidden className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.35),transparent)]" />
        <span className="absolute right-5 top-5 inline-flex items-center rounded-full border border-white/25 bg-white/15 px-4 py-1.5 font-label text-sm font-bold text-paper-50 backdrop-blur-md">
          {member.role}
        </span>
      </div>

      <div className="relative -mt-16 px-6 sm:px-7">
        <div className="relative h-32 w-32 overflow-hidden rounded-full bg-white shadow-[0_18px_36px_-14px_rgba(10,39,64,0.6)] ring-4 ring-white">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="128px"
              className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(160deg,#0f3556,#05182b)] font-display text-4xl font-bold text-paper-50/85">
              {initials(member.name)}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-5 sm:p-7 sm:pt-5">
        <h3 className="font-display text-balance text-[1.6rem] font-bold leading-tight text-ink-900">{member.name}</h3>
        <p className="mt-1.5 font-label text-sm font-bold text-accent-600">{member.profession}</p>
        <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-[0.95rem] leading-snug text-steel-600">
          {member.expertise.slice(0, 3).map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-accent-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
