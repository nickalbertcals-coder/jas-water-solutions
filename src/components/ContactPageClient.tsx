"use client";

import { useState } from "react";
import { contact } from "@/lib/data";
import Eyebrow from "@/components/Eyebrow";
import Magnetic from "@/components/motion/Magnetic";
import ScrollReveal from "@/components/motion/ScrollReveal";
import PageHero from "@/components/PageHero";

const TOPICS = [
  "Operations & Maintenance",
  "Bulk water supply",
  "Hydraulic modeling",
  "Technical consultancy",
  "General inquiry",
];

const CHANNELS = [
  {
    label: "Email us",
    value: contact.email,
    href: `mailto:${contact.email}`,
    copy: true,
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m3.5 7 8.5 6 8.5-6" />
      </>
    ),
  },
  {
    label: "Call us",
    value: contact.phone,
    href: `tel:${contact.phone.replace(/[^\d+]/g, "")}`,
    copy: false,
    icon: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  },
  {
    label: "Where we work",
    value: contact.location,
    href: undefined,
    copy: false,
    icon: (
      <>
        <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </>
    ),
  },
];

const inputBase =
  "peer w-full rounded-2xl border border-line-strong bg-white px-5 pb-2.5 pt-6 text-base text-ink-900 outline-none transition-[border-color,box-shadow] placeholder-transparent focus:border-accent-600 focus:shadow-[0_0_0_4px_rgba(76,201,232,0.22)]";
const labelBase =
  "pointer-events-none absolute left-5 top-4 origin-left text-base text-steel-500 transition-all duration-200 peer-focus:top-2 peer-focus:scale-[0.8] peer-focus:font-semibold peer-focus:text-accent-600 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-[0.8] peer-[:not(:placeholder-shown)]:font-semibold";

export default function ContactPageClient() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [copied, setCopied] = useState(false);
  const [topic, setTopic] = useState(TOPICS[0]);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Website inquiry: ${topic} — ${form.name || "a visitor"}`);
    const body = encodeURIComponent(
      `Topic: ${topic}\nName: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\n${form.message}`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setStatus("submitted");
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the address is still shown and linked */
    }
  }

  return (
    <>
      <PageHero
        water
        eyebrow="Contact"
        title="Let's talk about your water utility"
        description="Reach out for O&M partnerships, bulk water supply, technical consultancy, or general inquiries."
      />

      <section className="section-pad relative overflow-hidden bg-paper-50">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-28 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.2),transparent)]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-52 -left-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(62,224,180,0.14),transparent)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
          {/* ───────── Left: channels ───────── */}
          <ScrollReveal as="div" selector=":scope > *" y={30} stagger={0.1} className="space-y-5 lg:col-span-5">
            <div>
              <Eyebrow>Contact details</Eyebrow>
              <h2 className="font-statement mt-5 text-balance text-[clamp(1.9rem,3.2vw,2.8rem)] text-ink-900">Prefer to reach us directly?</h2>
              <p className="mt-3 text-pretty text-lg leading-relaxed text-steel-600">Use any of the channels below — we typically respond within one to two business days.</p>
            </div>

            {CHANNELS.map((c) => {
              const inner = (
                <>
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#05182b,#0f4468)] text-accent-500 shadow-[0_12px_28px_-10px_rgba(10,39,64,0.7)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      {c.icon}
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-label text-sm font-bold text-accent-600">{c.label}</span>
                    <span className="mt-0.5 block break-words font-display text-lg font-bold text-ink-900">{c.value}</span>
                  </span>
                </>
              );
              const cls =
                "group flex items-center gap-4 rounded-3xl border border-line bg-white p-5 shadow-[0_20px_44px_-32px_rgba(10,39,64,0.55)] transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-accent-500/50 hover:shadow-[0_30px_56px_-30px_rgba(10,114,154,0.5)]";
              return (
                <div key={c.label} className="relative">
                  {c.href ? (
                    <a href={c.href} className={cls}>
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                  {c.copy && (
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label="Copy email address"
                      className="absolute right-4 top-4 rounded-full border border-line-strong bg-white px-3 py-1 font-label text-xs font-bold text-ink-900 transition-colors hover:border-accent-600 hover:text-accent-600"
                    >
                      {copied ? "Copied" : "Copy"}
                    </button>
                  )}
                </div>
              );
            })}

            <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#05182b,#0b4f78)] p-7 text-paper-50 shadow-[0_34px_64px_-34px_rgba(5,24,43,0.9)]">
              <svg aria-hidden viewBox="0 0 400 400" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 text-accent-500">
                {[60, 100, 140, 180].map((r, i) => (
                  <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="currentColor" strokeOpacity={0.35 - i * 0.07} className="ring-pulse" style={{ animationDelay: `${i * 0.6}s` }} />
                ))}
              </svg>
              <p className="relative font-label text-sm font-bold text-accent-500">Who we serve</p>
              <p className="relative mt-2 text-pretty text-base leading-relaxed text-paper-50/90">
                Water Districts, Local Government Units (LGUs), industrial clients, and communities seeking Level III water distribution O&amp;M, bulk water supply, and digital water solutions.
              </p>
            </div>
          </ScrollReveal>

          {/* ───────── Right: form ───────── */}
          <ScrollReveal as="div" y={40} delay={0.15} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white p-6 shadow-[0_50px_90px_-50px_rgba(10,39,64,0.65)] sm:p-10">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(76,201,232,0.2),transparent)]" />
              {status === "submitted" ? (
                <div className="relative flex min-h-[26rem] flex-col items-center justify-center gap-4 py-10 text-center">
                  <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,#4cc9e8,#3ee0b4)] text-void shadow-[0_20px_44px_-14px_rgba(76,201,232,0.8)]">
                    <span aria-hidden className="ring-pulse absolute inset-0 rounded-full border-2 border-accent-500" />
                    <svg aria-hidden width="38" height="38" viewBox="0 0 24 24" fill="none">
                      <path className="check-draw" d="M4.5 12.5 9.5 17.5 19.5 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 className="font-display text-balance text-2xl font-bold text-ink-900">Your email app should now be open</h3>
                  <p className="max-w-sm text-pretty text-base leading-relaxed text-steel-600">
                    Finish sending your message from your email app. We typically respond within one to two business days.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-2 rounded-full border border-line-strong px-6 py-2.5 font-label text-sm font-bold text-ink-900 transition-colors hover:border-accent-600 hover:text-accent-600"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Send us a message</h2>
                    <p className="mt-2 text-base text-steel-600">Tell us a little about what you need. It opens in your email app, ready to send.</p>
                  </div>

                  <fieldset>
                    <legend className="font-label text-sm font-bold text-ink-900">What can we help with?</legend>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {TOPICS.map((t) => {
                        const on = topic === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            aria-pressed={on}
                            onClick={() => setTopic(t)}
                            className={`rounded-full border px-4 py-2 font-label text-sm font-semibold transition-all duration-300 ${
                              on
                                ? "border-ink-900 bg-ink-900 text-paper-50 shadow-[0_10px_24px_-10px_rgba(10,39,64,0.8)]"
                                : "border-line-strong bg-white text-ink-900 hover:border-accent-600 hover:text-accent-600"
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="relative">
                      <input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputBase} placeholder="Full name" />
                      <label htmlFor="name" className={labelBase}>Full name</label>
                    </div>
                    <div className="relative">
                      <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputBase} placeholder="Email address" />
                      <label htmlFor="email" className={labelBase}>Email address</label>
                    </div>
                  </div>
                  <div className="relative">
                    <input id="company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputBase} placeholder="Company / organization" />
                    <label htmlFor="company" className={labelBase}>Company / organization</label>
                  </div>
                  <div className="relative">
                    <textarea id="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputBase} resize-none`} placeholder="Your message" />
                    <label htmlFor="message" className={labelBase}>Tell us about your water utility needs</label>
                  </div>

                  <Magnetic strength={0.25} className="w-full sm:w-auto">
                    <button
                      type="submit"
                      className="btn-sheen group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-accent-500 px-9 py-4 font-label text-base font-bold text-void shadow-[0_20px_44px_-16px_rgba(76,201,232,0.9)] transition-colors hover:bg-ink-900 hover:text-paper-50 sm:w-auto"
                    >
                      Send message
                      <svg aria-hidden width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform duration-500 group-hover:translate-x-1.5 group-hover:-translate-y-1.5">
                        <path d="M4 16 16 4M7 4h9v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </Magnetic>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
