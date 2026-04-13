"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const steps = [
  {
    index: "01",
    label: "Consult",
    headline: "Tell Us Your Vision",
    desc: "We begin with a focused consultation to understand your store layout, footfall patterns, product range, and energy requirements. No generic advice — just precise guidance.",
  },
  {
    index: "02",
    label: "Specify",
    headline: "Engineer the Right Fit",
    desc: "Our technical team draws up a precise equipment specification — cabinet models, refrigeration type, capacity, and energy class — tailored to your environment and budget.",
  },
  {
    index: "03",
    label: "Supply",
    headline: "Delivered to Your Door",
    desc: "As an authorised Arneg distribution partner, we source and deliver your units directly from our warehouse  on schedule, fully tracked, with zero compromise on quality.",
  },
  {
    index: "04",
    label: "Install",
    headline: "Ready to Run",
    desc: "Prepared for installation by your engineer or through our installation services. Designed to look professional, with accessories included, and built to last.",
  },
];

const stats = [
  { value: "48hrs",   label: "Quotation turnaround" },
  { value: "100%",    label: "Authorised Arneg range" },
  { value: "UK-wide", label: "Supply coverage" },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    (async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {

        /* ── eyebrow line ── */
        gsap.fromTo(".hiw-line",
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1, duration: 1.2, ease: "expo.out",
            scrollTrigger: { trigger: ".hiw-eyebrow-wrap", start: "top 85%" },
          }
        );

        gsap.fromTo(".hiw-eyebrow-text",
          { opacity: 0, x: -16 },
          {
            opacity: 1, x: 0, duration: 0.7, ease: "power3.out", delay: 0.4,
            scrollTrigger: { trigger: ".hiw-eyebrow-wrap", start: "top 85%" },
          }
        );

        /* ── headline letters ── */
        gsap.fromTo(".hiw-word",
          { y: "110%", opacity: 0, rotateX: -40 },
          {
            y: "0%", opacity: 1, rotateX: 0,
            stagger: 0.1, duration: 1.1, ease: "power4.out",
            scrollTrigger: { trigger: ".hiw-title-wrap", start: "top 82%" },
          }
        );

        gsap.fromTo(".hiw-sub",
          { y: 24, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: ".hiw-title-wrap", start: "top 78%" },
          }
        );

        /* ── step cards ── */
        gsap.fromTo(".step-card",
          { y: 60, opacity: 0, scale: 0.97 },
          {
            y: 0, opacity: 1, scale: 1,
            stagger: 0.15, duration: 1.0, ease: "power4.out",
            scrollTrigger: { trigger: ".steps-grid", start: "top 80%" },
          }
        );

        /* ── step index numbers count up feel ── */
        gsap.fromTo(".step-index",
          { y: 20 },
          {
            y: 0,
            stagger: 0.15, duration: 0.8, ease: "back.out(1.5)",
            scrollTrigger: { trigger: ".steps-grid", start: "top 80%" },
          }
        );

        /* ── divider lines between cards ── */
        gsap.fromTo(".step-divider",
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1, duration: 1.0, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: ".steps-grid", start: "top 78%" },
          }
        );

        /* ── red accent bar ── */
        gsap.fromTo(".hiw-red-bar",
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1, duration: 1.4, ease: "expo.out",
            scrollTrigger: { trigger: ".steps-grid", start: "bottom 85%" },
          }
        );

        /* ── banner ── */
        gsap.fromTo(".banner-copy > *",
          { x: -40, opacity: 0 },
          {
            x: 0, opacity: 1,
            stagger: 0.12, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: ".banner-wrap", start: "top 82%" },
          }
        );

        gsap.fromTo(".banner-truck",
          { x: 80, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: ".banner-wrap", start: "top 82%" },
          }
        );

        /* ── stats ── */
        gsap.fromTo(".stat-item",
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            stagger: 0.12, duration: 0.85, ease: "back.out(1.3)",
            scrollTrigger: { trigger: ".stats-grid", start: "top 86%" },
          }
        );

        /* ── stat value wipe ── */
        gsap.fromTo(".stat-line",
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1, stagger: 0.12, duration: 1.0, ease: "expo.out",
            scrollTrigger: { trigger: ".stats-grid", start: "top 86%" },
          }
        );

      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden"
    >

      {/* ══════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════ */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-7 sm:pt-7 pb-20 sm:pb-24">

        {/* eyebrow */}
        <div className="hiw-eyebrow-wrap flex items-center gap-4 mb-10">
          <div className="hiw-line h-[2px] w-14 bg-red-600 origin-left" />
          <span className="hiw-eyebrow-text opacity-0 text-[11px] font-black tracking-[0.28em] uppercase text-red-600">
            The Process
          </span>
        </div>

        {/* headline + sub side by side on desktop */}
        <div className="hiw-title-wrap flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

          {/* big title with masked words */}
          <div style={{ perspective: "1200px" }}>
            <h2 className="text-[clamp(52px,9vw,110px)] font-black leading-[0.88] tracking-[-0.04em] text-[#001845] uppercase">
              {["How", "It", "Works"].map((w, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.15em] align-top">
                  <span className="hiw-word inline-block opacity-0 will-change-transform">
                    {i === 2
                      ? <span className="text-transparent" style={{ WebkitTextStroke: "2.5px #001845" }}>{w}</span>
                      : w}
                  </span>
                </span>
              ))}
            </h2>
          </div>

          {/* sub */}
          <p className="hiw-sub opacity-0 text-[16px] sm:text-[17px] leading-[1.85] text-[#001845]/60 font-normal max-w-[400px] lg:pb-2 lg:text-right">
            Four steps. No surprises. From your first call to
            your cabinets running cold — we manage every part of the journey.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          STEPS
      ══════════════════════════════════════════ */}
      <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pb-0 overflow-hidden">



        <div className="steps-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-[#001845]/[0.07]">
          {steps.map((step, i) => (
            <div key={step.index} className="relative flex">
              {/* vertical divider */}
              {i > 0 && (
                <div className="step-divider hidden md:block absolute left-0 top-0 bottom-0 w-px bg-[#001845]/[0.07]" />
              )}

              <div className="step-card opacity-0 flex flex-col gap-7 px-8 sm:px-10 py-12 w-full
                border-b md:border-b-0 border-[#001845]/[0.07] last:border-b-0
                hover:bg-[#001845]/[0.015] transition-colors duration-500 group">

                {/* index */}
                <span className="step-index text-[clamp(42px,6vw,64px)] font-black leading-none
                  tracking-[-0.04em] text-[#001845]/[0.07] tabular-nums select-none">
                  {step.index}
                </span>

                {/* label */}
                <div>
                  <p className="text-[10px] font-black tracking-[0.3em] uppercase text-red-600 mb-4">
                    {step.label}
                  </p>
                  <h3 className="text-[clamp(20px,2.4vw,28px)] font-black tracking-[-0.03em]
                    text-[#001845] uppercase leading-tight mb-4">
                    {step.headline}
                  </h3>
                  {/* ✅ Fixed: was font-light text-[#001845]/40 — now readable */}
                  <p className="text-[15px] leading-[1.85] text-[#001845]/65 font-medium">
                    {step.desc}
                  </p>
                </div>

                {/* bottom accent line on hover */}
                <div className="mt-auto h-[2px] w-0 group-hover:w-12 bg-red-600
                  transition-all duration-500 ease-out" />
              </div>
            </div>
          ))}
        </div>

        {/* red bar below cards */}
        <div className="hiw-red-bar h-[3px] w-full bg-red-600 origin-left" />
      </div>

      {/* ══════════════════════════════════════════
          TRUCK BANNER
      ══════════════════════════════════════════ */}
      <div className="banner-wrap max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
        <div className="relative overflow-hidden bg-[#001845] flex flex-col lg:flex-row min-h-[340px]">

          {/* top red stripe */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-red-600" />

          {/* copy */}
          <div className="banner-copy flex-1 px-10 sm:px-14 py-14 lg:py-16 flex flex-col justify-center z-10">
            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-white/25 mb-5">
              UK‑Wide Delivery
            </p>
            <h3 className="text-[clamp(28px,4vw,46px)] font-black tracking-[-0.03em]
              text-white uppercase leading-[1.05] mb-6">
              Your units arrive<br />
              <span className="text-red-500">on time, every time.</span>
            </h3>
            {/* ✅ Fixed: was text-white/35 font-light — now readable */}
            <p className="text-[15px] leading-[1.85] text-white/60 font-medium max-w-[300px] mb-10">
              Direct from our ILK warehouse warehouse. Fully tracked,
              blanket-wrapped, and delivered to your site .
            </p>
            <div className="flex flex-col gap-4">
              {["Direct from ILK warehouse", "Fully tracked delivery", "Carefully handled delivery to your location"].map((tag) => (
                <div key={tag} className="flex items-center gap-4">
                  <div className="w-5 h-[2px] bg-red-600 flex-shrink-0" />
                  {/* ✅ Fixed: was text-white/40 — now text-white/65 */}
                  <span className="text-[12px] font-semibold tracking-[0.12em] uppercase text-white/65">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* truck */}
          <div className="banner-truck relative w-full lg:w-[52%] h-64 sm:h-80 lg:h-auto flex-shrink-0">
            <div className="absolute inset-y-0 left-0 w-40 z-10
              bg-gradient-to-r from-[#001845] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-14 z-10
              bg-gradient-to-t from-[#001845] to-transparent" />
            <Image
              src="/truck.png"
              alt="ILK Technology delivery truck — nationwide refrigeration supply"
              fill
              quality={95}
              className="object-contain object-bottom lg:object-right-bottom"
              style={{ mixBlendMode: "screen" }}
              priority
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          STATS
      ══════════════════════════════════════════ */}
      <div className="stats-grid max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pb-24 sm:pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-3 border border-[#001845]/[0.07]">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`stat-item opacity-0 flex flex-col px-10 py-12 group
                ${i < stats.length - 1
                  ? "border-b sm:border-b-0 sm:border-r border-[#001845]/[0.07]"
                  : ""}`}
            >
              <span className="text-[clamp(40px,6vw,64px)] font-black tracking-[-0.04em]
                text-[#001845] leading-none mb-4">
                {stat.value}
              </span>
              <div className="stat-line h-[2px] w-8 bg-red-600 mb-4 origin-left" />
              {/* ✅ Fixed: was text-[#001845]/30 — now text-[#001845]/55 */}
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#001845]/55">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}