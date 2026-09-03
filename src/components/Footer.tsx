import Image from "next/image";
import Link from "next/link";
import { company, contact } from "@/lib/data";
import { assetPath } from "@/lib/basePath";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Leadership" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="brand-gradient text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src={assetPath("/images/logo.png")}
              alt={company.name}
              width={168}
              height={78}
              className="h-11 w-auto brightness-0 invert"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              {company.tagline}
            </p>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-white/60">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/85 hover:text-cyan-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-white/60">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/85">
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-cyan-300">
                  {contact.email}
                </a>
              </li>
              <li>{contact.phone}</li>
              <li>{contact.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {company.name} All rights reserved.</p>
          <p>Operation &amp; Maintenance of Level III Water Distribution Systems</p>
        </div>
      </div>
    </footer>
  );
}
