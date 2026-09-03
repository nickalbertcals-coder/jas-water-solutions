import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { assetPath } from "@/lib/basePath";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "JAS Water Solutions Inc. | Digitized Water Utility Operations",
    template: "%s | JAS Water Solutions Inc.",
  },
  description:
    "JAS Water Solutions Inc. delivers Operation & Maintenance of Level III water distribution systems, bulk water supply, hydraulic engineering, and digital water solutions — managed with precision, built for sustainability.",
  icons: {
    icon: [{ url: assetPath("/icon-192.png"), sizes: "192x192", type: "image/png" }],
    apple: assetPath("/apple-icon.png"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sora.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
