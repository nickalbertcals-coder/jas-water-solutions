"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/operations", label: "Operations" },
  { href: "/team", label: "Leadership" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header || prefersReducedMotion()) return;

    const trigger = ScrollTrigger.create({
      start: 24,
      end: 99999,
      onUpdate: (self) => {
        header.dataset.scrolled = self.scroll() > 24 ? "true" : "false";
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-line bg-paper-50/95 backdrop-blur transition-shadow"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="JAS Water Solutions Inc."
            width={168}
            height={78}
            priority
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex lg:gap-6">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-xs font-medium uppercase tracking-[0.08em] transition-colors ${
                  active
                    ? "text-signal-600"
                    : "text-ink-700/70 hover:text-ink-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="rounded border border-ink-900 bg-ink-900 px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.06em] text-paper-50 transition-colors hover:bg-ink-700"
          >
            Get in Touch
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded border border-line lg:hidden"
        >
          <span className="relative block h-3.5 w-4">
            <span
              className={`absolute left-0 top-0 h-0.5 w-4 bg-ink-900 transition-transform ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-4 bg-ink-900 transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-4 bg-ink-900 transition-transform ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-paper-50 lg:hidden">
          <nav className="flex flex-col gap-1 px-5 py-4">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded px-3 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.08em] ${
                    active
                      ? "bg-paper-100 text-signal-600"
                      : "text-ink-700/80 hover:bg-paper-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-2 rounded border border-ink-900 bg-ink-900 px-5 py-2.5 text-center font-mono text-xs font-medium uppercase tracking-[0.06em] text-paper-50"
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
