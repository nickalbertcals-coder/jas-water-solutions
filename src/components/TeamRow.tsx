import Image from "next/image";
import type { TeamMember } from "@/lib/data";
import { initials } from "./TeamCard";

/**
 * Leadership as an editorial row — the same visual grammar as the services
 * index — instead of a boxed card: portrait, oversized name, and the first
 * few areas of expertise.
 */
export default function TeamRow({ member }: { member: TeamMember }) {
  return (
    <div className="grid grid-cols-[4.5rem_1fr] items-center gap-x-5 gap-y-5 border-b border-ink-900/20 py-7 lg:grid-cols-[5rem_minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-x-10 lg:py-8">
      <div className="relative h-[4.5rem] w-[4.5rem] overflow-hidden bg-ink-900 lg:h-20 lg:w-20">
        {member.image ? (
          <Image src={member.image} alt={member.name} fill sizes="80px" className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-lg font-medium text-paper-50">
            {initials(member.name)}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-statement text-balance text-[clamp(2rem,3.6vw,3.4rem)] font-semibold text-ink-900">
          {member.name}
        </h3>
        <p className="mt-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-signal-600">
          {member.role}
        </p>
      </div>

      <ul className="col-span-2 space-y-1.5 text-sm text-steel-600 lg:col-span-1">
        {member.expertise.slice(0, 3).map((item) => (
          <li key={item} className="flex gap-2.5">
            <span className="mt-[9px] h-[2px] w-2.5 shrink-0 bg-signal-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
