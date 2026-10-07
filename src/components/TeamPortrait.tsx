import Image from "next/image";

/**
 * The supplied portraits are square images with a blue ring and white corners
 * baked in around an inner photo circle (roughly 84% of the width), and that
 * inner circle isn't dead-centre in every file. Cropping them to a CSS circle
 * as-is shows the ring and pushes faces off-centre, so this scales each image
 * up until its inner circle exactly fills our circle, recentred per file.
 */
const INNER = 0.84; // inner photo diameter / image width
const CENTER: Record<string, [number, number]> = {
  baldelovar: [0.505, 0.5],
  masangcay: [0.5, 0.5],
  elago: [0.535, 0.502],
};

export default function TeamPortrait({
  src,
  alt,
  slug,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  slug?: string;
  sizes: string;
  className?: string;
}) {
  const [cx, cy] = (slug && CENTER[slug]) || [0.5, 0.5];
  const scale = 1 / INNER;
  return (
    <span className={`relative block overflow-hidden rounded-full ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={350}
        height={350}
        sizes={sizes}
        className="absolute max-w-none"
        style={{
          width: `${scale * 100}%`,
          height: `${scale * 100}%`,
          left: `${(0.5 - cx * scale) * 100}%`,
          top: `${(0.5 - cy * scale) * 100}%`,
        }}
      />
    </span>
  );
}
