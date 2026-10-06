import Eyebrow from "@/components/Eyebrow";
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
        <Eyebrow tone={light ? "light" : "dark"}>{eyebrow}</Eyebrow>
      )}
      <h2
        className={`font-statement mt-4 text-balance text-[clamp(2.1rem,3.8vw,3.5rem)] font-semibold ${
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
