"use client";

import { useState } from "react";
import { contact } from "@/lib/data";

const CONTACT_DETAILS = [
  {
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    label: "Phone",
    value: contact.phone,
    href: `tel:${contact.phone.replace(/[^\d+]/g, "")}`,
  },
  {
    label: "Location",
    value: contact.location,
    href: undefined,
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
      <section className="border-b border-line bg-ink-900">
        <div className="relative mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-signal-500">
            <span className="h-2.5 w-[3px] bg-signal-500" />
            Contact
          </span>
          <h1 className="font-display mt-6 text-4xl font-semibold text-paper-50 sm:text-5xl">
            Let&apos;s talk about your water utility
          </h1>
          <p className="mt-5 text-base leading-relaxed text-paper-50/70 sm:text-lg">
            Reach out for O&amp;M partnerships, bulk water supply, technical
            consultancy, or general inquiries.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink-900">
              Contact details
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-steel-600">
              Prefer to reach us directly? Use any of the channels below.
            </p>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {CONTACT_DETAILS.map((detail) => (
                <div key={detail.label} className="flex items-baseline justify-between gap-4 py-4">
                  <dt className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-steel-500">
                    {detail.label}
                  </dt>
                  <dd>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="text-base font-medium text-ink-900 hover:text-signal-600"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-base font-medium text-ink-900">{detail.value}</p>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 border border-line bg-paper-100 p-6">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-signal-600">
                Service areas
              </p>
              <p className="mt-2 text-sm leading-relaxed text-steel-600">
                Water Districts, Local Government Units (LGUs), industrial
                clients, and communities seeking Level III water distribution
                O&amp;M, bulk water supply, and digital water solutions.
              </p>
            </div>
          </div>

          <div className="border border-line bg-white p-6 sm:p-8">
            {status === "submitted" ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
                <span className="flex h-12 w-12 items-center justify-center border border-signal-500 text-signal-600">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 12.5 9.5 18 20 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3 className="font-display text-lg font-semibold text-ink-900">
                  Your email app should now be open
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-steel-600">
                  Complete sending your message from your email client. We
                  typically respond within one to two business days.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-2 font-mono text-xs font-medium uppercase tracking-[0.06em] text-ink-900 hover:text-signal-600"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="font-mono text-xs font-medium uppercase tracking-[0.05em] text-steel-600">
                      Full name
                    </label>
                    <input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-2 w-full rounded border border-line-strong bg-white px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-ink-900"
                      placeholder="Juan Dela Cruz"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-mono text-xs font-medium uppercase tracking-[0.05em] text-steel-600">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-2 w-full rounded border border-line-strong bg-white px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-ink-900"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="font-mono text-xs font-medium uppercase tracking-[0.05em] text-steel-600">
                    Company / Organization
                  </label>
                  <input
                    id="company"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="mt-2 w-full rounded border border-line-strong bg-white px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-ink-900"
                    placeholder="Water District / LGU / Company name"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="font-mono text-xs font-medium uppercase tracking-[0.05em] text-steel-600">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="mt-2 w-full rounded border border-line-strong bg-white px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-ink-900"
                    placeholder="Tell us about your water utility needs..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded border border-ink-900 bg-ink-900 px-7 py-3 font-mono text-xs font-medium uppercase tracking-[0.06em] text-paper-50 transition-colors hover:bg-ink-700 sm:w-auto"
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
