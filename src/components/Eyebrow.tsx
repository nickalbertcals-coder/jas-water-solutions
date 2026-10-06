import type { ReactNode } from "react";

/**
 * Small section tag: a soft pill with a water-drop mark, in plain sentence
 * case. "light" sits on dark backgrounds, "dark" on pale ones.
 */
export default function Eyebrow({
  children,
  tone = "dark",
  as: Tag = "span",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  as?: "span" | "p";
}) {
  const palette =
    tone === "light"
      ? "border-accent-500/35 bg-accent-500/10 text-accent-500"
      : "border-accent-600/20 bg-accent-tint text-accent-600";
  return (
    <Tag
      className={`inline-flex items-center gap-2 rounded-full border py-1.5 pl-2.5 pr-4 font-label text-sm font-semibold ${palette}`}
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor">
        <path d="M12 2.5c-.3 0-.6.2-.8.4C9 5.6 5 10.2 5 14.5a7 7 0 0 0 14 0c0-4.3-4-8.9-6.2-11.6-.2-.2-.5-.4-.8-.4Z" />
      </svg>
      {children}
    </Tag>
  );
}
