import Image from "next/image";
import type { TeamMember } from "@/lib/data";
import { assetPath } from "@/lib/basePath";

function initials(name: string) {
  const words = name
    .replace(/^(Engr\.|Atty\.)\s+/i, "")
    .split(" ")
    .filter((w) => w.length > 1);
  const first = words[0]?.[0] ?? "";
  const last = words[words.length - 1]?.[0] ?? "";
  return `${first}${last}`.toUpperCase();
}

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex flex-col bg-white">
      <div className="flex items-start gap-4 border-b border-line p-6">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-line-strong">
          {member.image ? (
            <Image
              src={assetPath(member.image)}
              alt={member.name}
              fill
              sizes="80px"
              className="object-cover grayscale-[10%]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-ink-900 font-mono text-lg font-medium text-paper-50">
              {initials(member.name)}
            </div>
          )}
        </div>
        <div>
          <h3 className="font-display text-base font-semibold text-ink-900">
            {member.name}
          </h3>
          <p className="mt-0.5 font-mono text-xs font-medium uppercase tracking-[0.05em] text-signal-600">
            {member.role}
          </p>
          {member.profession && (
            <p className="mt-1 text-xs text-steel-600">{member.profession}</p>
          )}
        </div>
      </div>
      <ul className="flex flex-1 flex-col gap-2 p-6 text-sm text-steel-600">
        {member.expertise.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span className="mt-[7px] h-[3px] w-2 shrink-0 bg-signal-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
