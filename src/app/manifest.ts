import type { MetadataRoute } from "next";
import { assetPath } from "@/lib/basePath";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JAS Water Solutions Inc.",
    short_name: "JAS Water Solutions",
    icons: [
      { src: assetPath("/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: assetPath("/icon-512.png"), sizes: "512x512", type: "image/png" },
    ],
    theme_color: "#0a1c47",
    background_color: "#ffffff",
    display: "standalone",
  };
}
