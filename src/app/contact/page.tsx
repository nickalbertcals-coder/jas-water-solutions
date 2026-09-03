import type { Metadata } from "next";
import ContactPageClient from "@/components/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with JAS Water Solutions Inc. for Operations & Maintenance, bulk water supply, hydraulic engineering, and digital water solutions.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
