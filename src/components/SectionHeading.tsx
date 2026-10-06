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
    <div className={`max-w-4xl ${isCenter ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.18em] ${
            light ? "text-accent-500" : "text-accent-600"
          }`}
        >
          <span className="h-px w-8 bg-current" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-statement mt-4 text-balance text-[clamp(2.5rem,5.2vw,4.75rem)] font-semibold ${
          light ? "text-paper-50" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-6 max-w-2xl text-pretty text-lg leading-relaxed sm:text-xl ${
            isCenter ? "mx-auto" : ""
          } ${light ? "text-paper-50/70" : "text-steel-600"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
