import type { ReactNode } from "react";

/** One 24px line icon per service, keyed by slug. */
export const SERVICE_ICONS: Record<string, ReactNode> = {
  "om-level-iii": (
    <>
      <path d="M14.5 6.5a4 4 0 0 1-5.2 5.2L4 17l3 3 5.3-5.3a4 4 0 0 0 5.2-5.2l-2.4 2.4-2.4-.6-.6-2.4 2.4-2.4Z" />
    </>
  ),
  "bulk-water-supply": (
    <>
      <path d="M12 2.8c-.3 0-.5.2-.7.4C9 5.8 5.5 9.8 5.5 13.8a6.5 6.5 0 0 0 13 0c0-4-3.5-8-5.8-10.6-.2-.2-.4-.4-.7-.4Z" />
      <path d="M9 14.5a3 3 0 0 0 3 3" />
    </>
  ),
  "hydraulic-modeling": (
    <>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="8" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M7 6.4 17 7.7M6 8l5 8M18 10l-5 6" />
    </>
  ),
  "bulk-water-retail": (
    <>
      <path d="M9 3h6M10 3v3l-2 2.5V20a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V8.5L14 6V3" />
      <path d="M8 13h8" />
    </>
  ),
  "technical-consultancy": (
    <>
      <rect x="3" y="4" width="18" height="12.5" rx="2.2" />
      <path d="M9 20.5h6M12 16.5v4" />
      <path d="M7 12l3-3 2.5 2.5L17 7" />
    </>
  ),
};


/** Short display names (the full titles are long). */
export const SERVICE_SHORT: Record<string, string> = {
  "om-level-iii": "Operations & Maintenance",
  "bulk-water-supply": "Bulk Water Supply",
  "hydraulic-modeling": "Hydraulic Modeling",
  "bulk-water-retail": "Bulk Water Retail",
  "technical-consultancy": "Technical Consultancy",
};
