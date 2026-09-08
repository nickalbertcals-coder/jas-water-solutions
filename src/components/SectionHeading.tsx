type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: Props) {
  const isCenter = align === "center";
  return (
    <div className={`max-w-2xl ${isCenter ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.14em] ${
            light ? "text-signal-500" : "text-signal-600"
          }`}
        >
          <span className={`h-2.5 w-[3px] ${light ? "bg-signal-500" : "bg-signal-600"}`} />
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl ${
          light ? "text-paper-50" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-pretty text-base leading-relaxed sm:text-lg ${
            light ? "text-paper-50/70" : "text-steel-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
