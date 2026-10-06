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
      className="sticky top-0 z-50 border-b border-white/10 bg-void/95 backdrop-blur-md transition-[background-color,box-shadow]"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="JAS Water Solutions Inc."
            width={168}
            height={78}
            priority
            className="h-10 w-auto brightness-0 invert sm:h-11"
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
                className={`font-label text-sm font-semibold transition-colors ${
                  active
                    ? "text-accent-500"
                    : "text-paper-50/78 hover:text-paper-50"
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
            className="border border-paper-50 bg-paper-50 px-5 py-2.5 font-label text-sm font-semibold text-ink-900 transition-colors hover:border-accent-500 hover:bg-accent-500"
          >
            Get in Touch
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center border border-white/20 lg:hidden"
        >
          <span className="relative block h-3.5 w-4">
            <span
              className={`absolute left-0 top-0 h-0.5 w-4 bg-paper-50 transition-transform ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-4 bg-paper-50 transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-4 bg-paper-50 transition-transform ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-void lg:hidden">
          <nav className="flex flex-col gap-1 px-5 py-4">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded px-3 py-2.5 font-label text-sm font-semibold ${
                    active
                      ? "bg-white/5 text-accent-500"
                      : "text-paper-50/75 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-2 border border-paper-50 bg-paper-50 px-5 py-2.5 text-center font-label text-sm font-semibold text-ink-900"
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
