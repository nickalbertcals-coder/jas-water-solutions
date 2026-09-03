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
          className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${
            light ? "text-cyan-300" : "text-blue-600"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${light ? "bg-cyan-300" : "bg-blue-600"}`}
          />
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-navy-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            light ? "text-white/75" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
