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
    <div className="flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
      <div className="flex items-center gap-4 border-b border-black/5 bg-tint-50 p-6">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-white">
          {member.image ? (
            <Image
              src={assetPath(member.image)}
              alt={member.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          ) : (
            <div className="brand-gradient flex h-full w-full items-center justify-center font-heading text-xl font-bold text-white">
              {initials(member.name)}
            </div>
          )}
        </div>
        <div>
          <h3 className="font-heading text-base font-semibold text-navy-950">
            {member.name}
          </h3>
          <p className="text-sm font-medium text-blue-600">{member.role}</p>
          {member.profession && (
            <p className="mt-0.5 text-xs text-slate-500">{member.profession}</p>
          )}
        </div>
      </div>
      <ul className="flex flex-1 flex-col gap-2 p-6 text-sm text-slate-600">
        {member.expertise.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
