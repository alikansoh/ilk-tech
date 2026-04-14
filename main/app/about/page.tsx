"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="w-full bg-white text-[#0d1117]">

      {/* ━━━ PAGE HEADER ━━━ */}
      <section className="bg-[#0d1117] text-white">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-20 py-20 sm:py-28">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-red-500 mb-5 block">
            ILK Technology
          </span>
          <h1 className="text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] max-w-[700px]">
            About Us
          </h1>
        </div>
      </section>

      {/* ━━━ SECTION 1 — WHO WE ARE ━━━ */}
      <section className="border-b border-[#0d1117]/[0.07]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-20 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Text */}
            <div>
              <div className="flex items-center gap-4 mb-7">
                <span className="w-8 h-[2px] bg-red-600 block" />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-red-600">
                  01
                </span>
              </div>
              <h2 className="text-[clamp(1.6rem,3vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] mb-7">
                Who We Are
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.9] text-[#0d1117]/60 font-light">
                ILK Technology was founded with a clear vision: to deliver
                unmatched expertise in refrigeration, drawing on over 20 years
                of experience from our founding Refrigeration Engineer. Since
                then, we have grown our team with dedicated professionals
                committed to excellence.
              </p>
            </div>

            {/* Image */}
            <div className="relative overflow-hidden aspect-[16/10] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.12)]">
              <Image
                src="/about-1.jpg"
                alt="ILK Technology team and refrigeration engineers"
                fill
                quality={90}
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600" />
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ SECTION 2 — WHAT WE DO ━━━ */}
      <section className="bg-[#f7f6f3] border-b border-[#0d1117]/[0.07]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-20 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Image — left on desktop */}
            <div className="relative overflow-hidden aspect-[16/10] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.12)] order-2 lg:order-1">
              <Image
                src="/about-2.jpg"
                alt="Arneg commercial refrigeration cabinets and display units"
                fill
                quality={90}
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600" />
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-7">
                <span className="w-8 h-[2px] bg-red-600 block" />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-red-600">
                  02
                </span>
              </div>
              <h2 className="text-[clamp(1.6rem,3vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] mb-7">
                What We Do
              </h2>
              <div className="space-y-5 text-[15px] sm:text-[16px] leading-[1.9] text-[#0d1117]/60 font-light">
                <p>
                  As a trusted distribution partner of Arneg, we offer an
                  extensive selection of Arneg cabinets crafted to leave a
                  positive, lasting impression on our customers.
                </p>
                <p>
                  We also offer a wide variety of products from our trusted
                  partners — Arneg, Oscartielle, Intrac, and Incold. These
                  bespoke products are available for quotation, tailored to your
                  specific needs. Visit our Arneg Partners page for links to
                  standalone websites and explore our full product range.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-8">
                {["Arneg", "Oscartielle", "Intrac", "Incold"].map((brand) => (
                  <span
                    key={brand}
                    className="px-4 py-2 bg-white border border-[#0d1117]/10 text-[11px] font-bold tracking-[0.15em] uppercase text-[#0d1117]/50"
                  >
                    {brand}
                  </span>
                ))}
              </div>

              <a
                href="/arneg-group"
                className="inline-flex items-center gap-2 mt-8 text-[13px] font-bold tracking-wide text-red-600 hover:text-red-700 transition-colors"
              >
                Visit Arneg Partners Page →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ SECTION 3 — OUR MISSION ━━━ */}
      <section className="border-b border-[#0d1117]/[0.07]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-20 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">

            {/* Text */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-7">
                <span className="w-8 h-[2px] bg-red-600 block" />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-red-600">
                  03
                </span>
              </div>
              <h2 className="text-[clamp(1.6rem,3vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] mb-7">
                Our Mission
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.9] text-[#0d1117]/60 font-light max-w-[540px]">
                At ILK Technology, we pride ourselves on our reputation for
                expertise, exceptional technical service, and smooth business
                interactions. Our mission is to provide our customers with an
                outstanding experience — because they truly deserve nothing less.
              </p>

              <a
                href="mailto:sales@ilktechnology.com"
                className="inline-flex items-center gap-3 mt-10 bg-red-600 hover:bg-red-700 text-white font-bold text-[13px] tracking-wide px-7 py-4 transition-colors duration-200"
              >
                Get in Touch
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Image — portrait */}
            <div className="lg:col-span-5 relative overflow-hidden aspect-[4/5] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.12)]">
              <Image
                src="/about-3.jpg"
                alt="ILK Technology service excellence and customer experience"
                fill
                quality={90}
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600" />
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ SECTION 4 — OUR VISION ━━━ */}
      <section className="bg-[#0d1117] text-white">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-20 py-20 sm:py-28">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-8 h-[2px] bg-red-500 block" />
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-red-500">
              04
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-end">
            <div>
              <h2 className="text-[clamp(1.6rem,3vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] mb-7">
                Our Vision
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.9] text-white/50 font-light">
                To be the UK&apos;s most trusted name in commercial refrigeration —
                a company where deep technical know-how meets genuine care, and
                where every client relationship is built on transparency,
                reliability, and results that speak for themselves.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-[1px] bg-white/[0.07]">
              {[
                { value: "20+", label: "Years Experience" },
                { value: "500+", label: "Projects" },
                { value: "4", label: "Brand Partners" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#0d1117] py-10 px-4 text-center">
                  <span className="block text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold tracking-[-0.04em] text-white">
                    {stat.value}
                  </span>
                  <span className="block mt-1 text-[10px] font-bold tracking-[0.2em] uppercase text-white/30">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="bg-white border-t border-[#0d1117]/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-20 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[12px] text-[#0d1117]/35 tracking-wide">
            © {new Date().getFullYear()} ILK Technology — All rights reserved.
          </span>
          <a
            href="mailto:sales@ilktechnology.com"
            className="text-[12px] font-bold tracking-[0.1em] text-red-600 hover:text-red-700 transition-colors"
          >
            sales@ilktechnology.com
          </a>
        </div>
      </footer>
    </main>
  );
}