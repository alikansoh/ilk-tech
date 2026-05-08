"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const products = [
  { name: "Osaka 2", href: "/products/osaka-2" },
  { name: "Osaka 3", href: "/products/osaka-3", colorClass: "text-[#293133]" },
  { name: "Osaka 3 SC", href: "/products/osaka-3-sc" },
  { name: "Panama 3", href: "/products/panama-3", colorClass: "text-[#293133]" },
  { name: "Panama 3 SC", href: "/products/panama-3-sc" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "ARNEG", href: "/arneg" },
];

const socials = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61570825201141",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ilktechnology?igsh=MTZpdWtuZW1scXdkOQ%3D%3D&utm_source=qr",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname() ?? "";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isProductPath = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const isProductActive = products.some((p) => isProductPath(p.href));

  return (
    <nav className="sticky top-0 z-50 w-full">
      <div className="h-[2px] w-full bg-gradient-to-r from-[#001845] via-red-600 to-[#001845]" />

      <div className="bg-white shadow-[0_1px_0_rgba(0,24,69,0.06),0_4px_32px_rgba(0,24,69,0.08)]">
        <div className="mx-auto flex h-[84px] max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-14">
          {/* Brand */}
          <Link href="/" className="group flex-shrink-0">
            <div className="relative h-[72px] w-[108px] transition-all duration-500 group-hover:opacity-80">
              <Image src="/logo.webp" alt="Logo" fill className="object-contain" priority />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-5 py-[30px] text-[12px] font-bold tracking-[0.18em] uppercase transition-colors duration-200 group/link
                    ${link.name === "ARNEG"
                      ? active ? "text-red-600" : "text-red-500 hover:text-red-600"
                      : active ? "text-[#001845]" : "text-[#001845]/45 hover:text-[#001845]"
                    }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-red-600 transition-all duration-300
                    ${active ? "w-full" : "w-0 group-hover/link:w-full"}`} />
                </Link>
              );
            })}

            {/* Products Dropdown */}
            <div className="group/drop relative">
              <button
                className={`relative flex items-center gap-1.5 px-5 py-[30px] text-[12px] font-bold tracking-[0.18em] uppercase transition-colors duration-200 group/link
                ${isProductActive ? "text-[#001845]" : "text-[#001845]/45 hover:text-[#001845]"}`}
              >
                Products
                <svg className="h-3 w-3 transition-transform duration-300 group-hover/drop:rotate-180"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
                <span className={`absolute bottom-0 left-0 h-[2px] bg-red-600 transition-all duration-300
                  ${isProductActive ? "w-full" : "w-0 group-hover/link:w-full"}`} />
              </button>

              {/* Dropdown panel */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0 w-[280px] opacity-0 invisible translate-y-2 group-hover/drop:opacity-100 group-hover/drop:visible group-hover/drop:translate-y-0 transition-all duration-200 ease-out">
                <div className="flex justify-center">
                  <div className="h-2 w-4 overflow-hidden">
                    <div className="mx-auto h-3 w-3 rotate-45 border-l border-t border-[#001845]/10 bg-[#001845] translate-y-1.5" />
                  </div>
                </div>

                <div className="overflow-hidden border border-[#001845]/10 bg-white shadow-[0_20px_60px_rgba(0,24,69,0.16)]">
                  <div className="bg-[#001845] px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.45em] text-white/40">Browse</p>
                      <p className="text-[13px] font-bold text-white mt-0.5">Our Products</p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                      <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase">
                        {products.length} Lines
                      </span>
                    </div>
                  </div>

                  <div className="divide-y divide-[#001845]/6">
                    {products.map((p, i) => {
                      const productActive = isProductPath(p.href);
                      return (
                        <Link
                          key={p.href}
                          href={p.href}
                          className={`group/item flex items-center gap-4 px-6 py-3.5 transition-all duration-150
                            ${productActive ? "bg-[#001845]/[0.03]" : "hover:bg-[#001845]/[0.025]"}`}
                        >
                          <div
                            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center border transition-all duration-150
                            ${productActive
                              ? "border-red-600 bg-red-600 text-white"
                              : "border-[#001845]/12 bg-transparent text-[#001845]/25 group-hover/item:border-red-600 group-hover/item:text-red-600"
                            }`}
                          >
                            <span className="text-[11px] font-black tabular-nums">0{i + 1}</span>
                          </div>

                          <p
                            className={`flex-1 text-[13px] font-bold tracking-wide transition-colors duration-150
                            ${p.colorClass ?? (productActive ? "text-[#001845]" : "text-[#001845]/70 group-hover/item:text-[#001845]")}
                            `}
                          >
                            {p.name}
                          </p>

                          <svg
                            className={`h-3.5 w-3.5 flex-shrink-0 transition-all duration-200
                              ${productActive ? "text-red-600 translate-x-0" : "text-[#001845]/20 -translate-x-1 group-hover/item:text-red-500 group-hover/item:translate-x-0"}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-5 h-5 w-px bg-[#001845]/12" />

            <Link
              href="/contact"
              className={`group/cta relative inline-flex items-center gap-2.5 border-[1.5px] px-7 py-2.5 text-[11.5px] font-black tracking-[0.22em] uppercase transition-all duration-300
                ${isActive("/contact")
                  ? "border-[#001845] bg-white text-[#001845]"
                  : "border-[#001845] bg-[#001845] text-white hover:bg-white hover:text-[#001845]"
                }`}
            >
              Contact Us
              <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-1"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden inline-flex items-center justify-center border border-[#001845]/15 p-2.5 text-[#001845] transition-all hover:bg-[#001845]/5 active:scale-95"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Margin Bar */}
      <div className="w-full bg-[#001845] px-6 sm:px-8 lg:px-14 py-2 flex items-center justify-between">
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-red-500">
          Arneg Distribution Partner
        </p>
        <div className="flex items-center gap-1">
          {socials.map((s) => (
            <Link
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="flex items-center justify-center h-7 w-7 text-[#b0bec5] hover:text-white transition-colors duration-200"
            >
              {s.icon}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white shadow-[0_16px_48px_rgba(0,24,69,0.12)]">
          <div className="h-[2px] w-full bg-gradient-to-r from-[#001845] via-red-600 to-[#001845]" />

          {/* ↓ KEY CHANGE: fixed max-height + overflow-y-auto makes it scrollable */}
          <div
            className="overflow-y-auto overscroll-contain"
            style={{ maxHeight: "calc(100svh - 84px - 36px)" }}
          >
            <div className="px-5 py-3">
              <div className="space-y-1 py-2">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => {
                        setOpen(false);
                        setProductsOpen(false);
                      }}
                      className={`flex items-center justify-between border-l-[2px] px-4 py-3.5 text-[12px] font-bold tracking-[0.18em] uppercase transition-all duration-200
                        ${link.name === "ARNEG"
                          ? active
                            ? "border-red-600 bg-red-50/50 text-red-600"
                            : "border-transparent text-red-500 hover:border-red-400 hover:bg-red-50/30 hover:text-red-600"
                          : active
                            ? "border-red-600 bg-[#001845]/[0.04] text-[#001845]"
                            : "border-transparent text-[#001845]/50 hover:border-[#001845]/30 hover:bg-[#001845]/[0.02] hover:text-[#001845]"
                        }`}
                    >
                      <span>{link.name}</span>
                      {active && (
                        <span className="flex items-center gap-1.5 text-[9px] font-black tracking-[0.2em] uppercase text-red-600">
                          <span className="h-1 w-1 rounded-full bg-red-600 animate-pulse" />
                          Active
                        </span>
                      )}
                    </Link>
                  );
                })}

                {/* Mobile Products accordion */}
                <div>
                  <button
                    onClick={() => setProductsOpen(!productsOpen)}
                    className={`flex w-full items-center justify-between border-l-[2px] px-4 py-3.5 text-[12px] font-bold tracking-[0.18em] uppercase transition-all duration-200
                      ${isProductActive
                        ? "border-red-600 bg-[#001845]/[0.04] text-[#001845]"
                        : "border-transparent text-[#001845]/50 hover:border-[#001845]/30 hover:bg-[#001845]/[0.02] hover:text-[#001845]"
                      }`}
                  >
                    <span>Products</span>
                    <div className="flex items-center gap-2">
                      {isProductActive && (
                        <span className="flex items-center gap-1.5 text-[9px] font-black tracking-[0.2em] uppercase text-red-600">
                          <span className="h-1 w-1 rounded-full bg-red-600 animate-pulse" />
                          Active
                        </span>
                      )}
                      <svg
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${productsOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {productsOpen && (
                    <div className="mt-1 overflow-hidden border border-[#001845]/8">
                      <div className="bg-[#001845] px-5 py-3 flex items-center justify-between">
                        <p className="text-[9px] font-black uppercase tracking-[0.45em] text-white/50">Product Line</p>
                        <span className="text-[9px] font-bold text-white/30 tracking-widest">{products.length} Lines</span>
                      </div>
                      <div className="divide-y divide-[#001845]/6">
                        {products.map((p, i) => {
                          const productActive = isProductPath(p.href);
                          return (
                            <Link
                              key={p.href}
                              href={p.href}
                              onClick={() => setOpen(false)}
                              className={`flex items-center gap-4 px-5 py-4 transition-all
                                ${productActive ? "bg-[#001845]/[0.03]" : "hover:bg-[#001845]/[0.02]"}`}
                            >
                              <div
                                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center border transition-all
                                ${productActive ? "border-red-600 bg-red-600 text-white" : "border-[#001845]/12 text-[#001845]/25"}`}
                              >
                                <span className="text-[10px] font-black">0{i + 1}</span>
                              </div>
                              <p
                                className={`flex-1 text-[12px] font-bold tracking-wide
                                ${p.colorClass ?? (productActive ? "text-[#001845]" : "text-[#001845]/65")}`}
                              >
                                {p.name}
                              </p>
                              {productActive && (
                                <span className="flex items-center gap-1.5 text-[9px] font-black tracking-[0.2em] uppercase text-red-600 flex-shrink-0">
                                  <span className="h-1 w-1 rounded-full bg-red-600 animate-pulse" />
                                  Active
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="my-3 h-px bg-[#001845]/8" />

              {/* Mobile Social Links */}
              <div className="flex items-center justify-between py-3">
                <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#001845]/35">
                  Follow Us
                </p>
                <div className="flex items-center gap-1">
                  {socials.map((s) => (
                    <Link
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="flex items-center justify-center h-8 w-8 border border-[#001845]/10 text-[#001845]/40 hover:border-[#001845]/30 hover:text-[#001845] transition-all duration-200"
                    >
                      {s.icon}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pb-3">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between w-full border-[1.5px] px-5 py-4 text-[12px] font-black tracking-[0.22em] uppercase transition-all duration-200
                    ${isActive("/contact")
                      ? "border-[#001845] bg-white text-[#001845]"
                      : "border-[#001845] bg-[#001845] text-white hover:bg-white hover:text-[#001845]"
                    }`}
                >
                  <span>Contact Us</span>
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}