"use client";

import { useState } from "react";
import { contact } from "@/lib/data";

const CONTACT_DETAILS = [
  {
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: (
      <path
        d="M3 6h18v12H3V6Zm0 0 9 7 9-7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Phone",
    value: contact.phone,
    href: `tel:${contact.phone.replace(/[^\d+]/g, "")}`,
    icon: (
      <path
        d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.5 21 3 14.5 3 6a2 2 0 0 1 1-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Location",
    value: contact.location,
    href: undefined,
    icon: (
      <>
        <path
          d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
];

export default function ContactPageClient() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Website inquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\n${form.message}`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setStatus("submitted");
  }

  return (
    <>
      <section className="brand-gradient relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 15%, rgba(143,220,245,0.25), transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-300">
            Contact
          </span>
          <h1 className="font-heading mt-6 text-4xl font-bold text-white sm:text-5xl">
            Let&apos;s talk about your water utility
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
            Reach out for O&amp;M partnerships, bulk water supply, technical
            consultancy, or general inquiries.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-heading text-2xl font-bold text-navy-950">
              Contact details
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Prefer to reach us directly? Use any of the channels below.
            </p>
            <ul className="mt-8 space-y-5">
              {CONTACT_DETAILS.map((detail) => (
                <li key={detail.label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-700">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      {detail.icon}
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {detail.label}
                    </p>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="text-base font-medium text-navy-950 hover:text-blue-700"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-base font-medium text-navy-950">{detail.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-black/5 bg-tint-50 p-6">
              <p className="text-sm font-semibold text-navy-950">Service areas</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Water Districts, Local Government Units (LGUs), industrial
                clients, and communities seeking Level III water distribution
                O&amp;M, bulk water supply, and digital water solutions.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
            {status === "submitted" ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/15 text-blue-700">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 12.5 9.5 18 20 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3 className="font-heading text-lg font-semibold text-navy-950">
                  Your email app should now be open
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-slate-600">
                  Complete sending your message from your email client. We
                  typically respond within one to two business days.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-navy-950">
                      Full name
                    </label>
                    <input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Juan Dela Cruz"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-navy-950">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="text-sm font-medium text-navy-950">
                    Company / Organization
                  </label>
                  <input
                    id="company"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="mt-2 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Water District / LGU / Company name"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium text-navy-950">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="mt-2 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Tell us about your water utility needs..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-navy-900 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
