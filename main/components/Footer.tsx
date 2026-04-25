"use client";

import Link from "next/link";

const products = [
  { name: "Osaka 2", href: "/products/osaka-2" },
  { name: "Osaka 3", href: "/products/osaka-3" },
  { name: "Panama 3", href: "/products/panama-3" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "ARNEG", href: "/arneg" },
  { name: "Contact", href: "/contact" },
];

const socials = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ilktechnology?igsh=MTZpdWtuZW1scXdkOQ%3D%3D&utm_source=qr",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/ilk-technology27/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#001845] text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-14 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand / short text (title in red as requested) */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-lg font-black tracking-wide uppercase text-red-600">Arneg Distribution Partner</div>
              <span className="inline-block h-1 w-8 rounded bg-red-600" aria-hidden />
            </div>

            <p className="max-w-sm text-sm text-white/75">
              Delivering industry-leading refrigeration and display solutions with elegant design and engineering excellence.
            </p>

            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/6 hover:bg-red-600 hover:text-white transition"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-xs font-bold tracking-widest text-red-600 uppercase">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 hover:text-red-500 transition">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-3 text-xs font-bold tracking-widest text-red-600 uppercase">Product Lines</h3>
            <ul className="space-y-2 text-sm">
              {products.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-white/70 hover:text-red-500 transition">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-xs font-bold tracking-widest text-red-600 uppercase">Contact</h3>
            <address className="not-italic text-sm text-white/70">
              <a href="tel:02030510367" className="hover:text-red-500 transition block">0203 051 0367</a>
              <Link href="/contact" className="text-white/70 hover:text-red-500 transition block mt-1">Contact page</Link>
              <a href="mailto:sales@ilktechnology.com" className="text-white/70 hover:text-red-500 transition block mt-1">sales@ilktechnology.com</a>
              <a href="mailto:info@ilktechnology.com" className="text-white/70 hover:text-red-500 transition block mt-1">info@ilktechnology.com</a>
            </address>
          </div>
        </div>

        <div className="mt-10 border-t border-white/6 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-white/60 flex items-center gap-2">
              <span className="inline-block h-1 w-1 rounded-full bg-red-600" aria-hidden />
              © {new Date().getFullYear()} ILK Technology. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-sm text-white/60 hover:text-red-500 transition">Privacy</Link>
              <Link href="/terms" className="text-sm text-white/60 hover:text-red-500 transition">Terms</Link>

              {/* Sitemap intentionally low-visibility but shows red on hover */}
              <Link
                href="/sitemap.xml"
                className="text-xs text-white/20 hover:text-red-400 ml-3 transition"
                aria-label="Sitemap (less prominent)"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}