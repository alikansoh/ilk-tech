"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// ── Static data outside component → no re-allocation on render ──────────────
const BRANDS = ["Arneg", "Oscartielle", "Intrac", "Incold"] as const;

const PILLS = [
  "Refrigeration Cabinets",
  "Remote & Plug-in Systems",
  "Cold Rooms",
  "Checkouts & Shelving",
  "Bespoke Installs",
] as const;

const STATS = [
  { v: "1,000+", l: "Clients Served" },
  { v: "5,000+", l: "Installations" },
] as const;

// ── Component ────────────────────────────────────────────────────────────────
export default function WhoWeAre() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scheduleAnimation = () => {
      let ctx: { revert: () => void } | null = null;

      (async () => {
        const { gsap }          = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const shared = {
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
          };

          gsap.fromTo(imageRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, ...shared });
          gsap.fromTo(textRef.current,  { x:  40, opacity: 0 }, { x: 0, opacity: 1, ...shared });
        }, sectionRef);
      })();

      return () => ctx?.revert();
    };

    if ("requestIdleCallback" in window) {
      const id = (window as Window & typeof globalThis).requestIdleCallback(scheduleAnimation);
      return () => (window as Window & typeof globalThis).cancelIdleCallback(id);
    }

    const t = setTimeout(scheduleAnimation, 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-4 sm:py-12 lg:py-10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── IMAGE COLUMN ── */}
          <div
            ref={imageRef}
            className="relative opacity-0"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="absolute top-0 -left-3 w-[3px] h-24 bg-red-600" />

            <div className="relative overflow-hidden aspect-[4/3] shadow-[0_24px_64px_rgba(0,24,69,0.12)]">
              <Image
                src="/about.webp"
                alt="ILK Technology refrigeration showroom"
                fill
                priority
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001845]/60 via-transparent to-transparent" />
            </div>

            {/* ── BELOW-IMAGE BLOCK ── */}
            <div className="mt-3 flex flex-col gap-2">

              {/* badge */}
              <div
                className="flex items-center gap-4 px-5 py-4"
                style={{
                  background: "rgba(255,255,255,0.97)",
                  border: "1px solid rgba(0,24,69,0.10)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  boxShadow: "0 8px 32px rgba(0,24,69,0.10)",
                }}
              >
                <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center bg-[#001845]">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[#001845] font-bold text-sm leading-tight">
                    Authorised{" "}
                    <span className="text-red-600">Arneg</span>{" "}
                    Group Dealer
                  </p>
                  <p className="text-[#001845]/45 text-xs mt-0.5 font-medium">UK Distribution Partner</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-[#001845] font-black text-2xl leading-none">20+</p>
                  <p className="text-[#001845]/40 text-[10px] uppercase tracking-widest mt-0.5 font-semibold">Years</p>
                </div>
              </div>

              {/* stat cards */}
              <div className="flex gap-2">
                {STATS.map((s) => (
                  <div
                    key={s.l}
                    className="flex flex-1 items-center gap-3 px-4 py-3"
                    style={{ background: "#001845" }}
                  >
                    <span className="w-[3px] h-8 bg-red-500 flex-shrink-0" />
                    <div>
                      <p className="text-white font-black text-base leading-none">{s.v}</p>
                      <p className="text-white/45 text-[10px] font-semibold tracking-widest uppercase mt-0.5">{s.l}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ── TEXT COLUMN ── */}
          <div
            ref={textRef}
            className="opacity-0 flex flex-col"
            style={{ willChange: "transform, opacity" }}
          >

            {/* eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-8 bg-red-600" />
              <span className="text-[11px] font-black tracking-[0.28em] uppercase text-red-600">
                Who We Are
              </span>
            </div>

            {/* heading */}
            <h2 className="text-[clamp(2rem,4.2vw,3rem)] font-black leading-[1.1] tracking-[-0.03em] uppercase mb-8">
              Why Choose{" "}
              <span className="ml-2 whitespace-nowrap">
                <span className="text-[#001845]">ILK</span>{" "}
                <span className="text-[#001845]/25">Technology?</span>
              </span>
            </h2>

            {/* rule */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-[#001845]/10" />
              <div className="w-1.5 h-1.5 rotate-45 bg-red-600/40" />
            </div>

            {/* body */}
            <div className="space-y-5 mb-8">
              <p className="text-[15px] sm:text-[16px] leading-[1.9] text-[#001845]/55 font-light">
                We are a{" "}
                <span className="text-[#001845] font-semibold">highly customer-focused team</span>,
                backed by over{" "}
                <span className="text-[#001845] font-semibold">20 years of experience</span>{" "}
                in the refrigeration industry and retail solutions. Our expertise ensures complete
                satisfaction with every purchase.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.9] text-[#001845]/55 font-light">
                As an{" "}
                <span className="text-[#001845] font-semibold">authorised dealer</span>{" "}
                for the{" "}
                <span className="text-red-600 font-semibold">Arneg Partners </span>{" "}
                — including{" "}
                <span className="text-red-600 font-semibold">Arneg</span>,{" "}
                <span className="text-[#001845] font-semibold">Oscartielle</span>,{" "}
                <span className="text-[#001845] font-semibold">Intrac</span>, and{" "}
                <span className="text-[#001845] font-semibold">Incold</span>{" "}
                — we offer a broad range of retail solutions from refrigeration cabinets and remote
                &amp; plug-in systems to checkouts, shelving, and cold rooms. Some products are in
                stock, or we can supply{" "}
                <span className="text-[#001845] font-semibold">bespoke solutions</span>{" "}
                tailored to your needs.
              </p>
            </div>

            {/* brand tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {BRANDS.map((b) => {
                const isArneg = b === "Arneg";
                return (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] uppercase"
                    style={
                      isArneg
                        ? { background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626" }
                        : { background: "#f0f4ff", border: "1px solid rgba(0,24,69,0.12)", color: "#001845" }
                    }
                  >
                    <span
                      className="w-1 h-1 inline-block"
                      style={{ background: isArneg ? "#dc2626" : "rgba(0,24,69,0.35)" }}
                    />
                    {b}
                  </span>
                );
              })}
            </div>

            {/* capability pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {PILLS.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center px-3.5 py-2 text-[12px] font-semibold text-[#001845]/60"
                  style={{
                    background: "#f8fafc",
                    border: "1px solid rgba(0,24,69,0.08)",
                  }}
                >
                  {p}
                </span>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/about"
              className="group relative inline-flex items-center justify-center gap-3 self-start overflow-hidden
                border-[1.5px] border-[#001845] bg-[#001845] hover:bg-white
                px-8 py-4 text-[11px] sm:text-[12px] font-black tracking-[0.22em] uppercase
                text-white hover:text-[#001845] transition-all duration-300"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700" />
              <span className="relative flex items-center gap-3">
                Learn More About Us
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}