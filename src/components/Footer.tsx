import Image from "next/image";
import Link from "next/link";
import { company, contact } from "@/lib/data";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/operations", label: "Operations" },
  { href: "/team", label: "Leadership" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-paper-50">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src="/images/logo.png"
              alt={company.name}
              width={168}
              height={78}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper-50/60">
              {company.tagline}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-paper-50/45">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-paper-50/80 hover:text-signal-500">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-paper-50/45">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-paper-50/80">
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-signal-500">
                  {contact.email}
                </a>
              </li>
              <li>{contact.phone}</li>
              <li>{contact.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/12 pt-6 font-mono text-xs text-paper-50/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {company.name} — All rights reserved.</p>
          <p>Operation &amp; Maintenance of Level III Water Distribution Systems</p>
        </div>
      </div>
    </footer>
  );
}
