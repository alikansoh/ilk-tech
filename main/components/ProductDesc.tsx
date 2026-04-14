"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const products = [
  { src: "/pic3.png", label: "Remote Multidecks" },
  { src: "/pic2.png", label: "Coldroom" },
  { src: "/pic6.png", label: "Plug in Freezer" },
  { src: "/pic4.png", label: "Shelving" },
  { src: "/pic1.png", label: "Checkouts" },
];

const productList = [
  "Remote Multidecks",
  "Coldroom",
  "Plug in Freezer",
  "Checkouts",
  "Shelving",
];

export default function ArnegProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    (async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {

        /* red eyebrow line */
        gsap.fromTo(".ap-red-line",
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1, duration: 1.2, ease: "expo.out",
            scrollTrigger: { trigger: ".ap-header", start: "top 85%" },
          }
        );

        /* header title words */
        gsap.fromTo(".ap-header-title > span",
          { y: "110%", opacity: 0, rotateX: -40 },
          {
            y: "0%", opacity: 1, rotateX: 0,
            stagger: 0.1, duration: 1.1, ease: "power4.out",
            scrollTrigger: { trigger: ".ap-header", start: "top 82%" },
          }
        );

        /* left copy block */
        gsap.fromTo(".ap-logo",
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.0, ease: "power3.out",
            scrollTrigger: { trigger: ".ap-left", start: "top 82%" },
          }
        );
        gsap.fromTo(".ap-tagline",
          { y: 24, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.85, ease: "power3.out", delay: 0.15,
            scrollTrigger: { trigger: ".ap-left", start: "top 82%" },
          }
        );
        gsap.fromTo(".ap-list-item",
          { x: -20, opacity: 0 },
          {
            x: 0, opacity: 1, stagger: 0.08, duration: 0.65, ease: "power3.out", delay: 0.25,
            scrollTrigger: { trigger: ".ap-left", start: "top 80%" },
          }
        );
        gsap.fromTo(".ap-ilk-logo",
          { scale: 0.88, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.9, ease: "back.out(1.4)", delay: 0.4,
            scrollTrigger: { trigger: ".ap-left", start: "top 80%" },
          }
        );
        gsap.fromTo(".ap-email",
          { y: 12, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.55,
            scrollTrigger: { trigger: ".ap-left", start: "top 80%" },
          }
        );

        /* product images */
        gsap.fromTo(".ap-img-item",
          { y: 50, opacity: 0, scale: 0.94 },
          {
            y: 0, opacity: 1, scale: 1,
            stagger: { amount: 0.7, from: "start" },
            duration: 1.1, ease: "power4.out",
            scrollTrigger: { trigger: ".ap-grid", start: "top 80%" },
          }
        );

        /* label chips */
        gsap.fromTo(".ap-img-label",
          { opacity: 0, y: 8 },
          {
            opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power2.out", delay: 0.4,
            scrollTrigger: { trigger: ".ap-grid", start: "top 78%" },
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
      <div className="ap-header max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-24 sm:pt-32 pb-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="ap-red-line h-[2px] w-14 bg-red-600 origin-left" />
          <span className="text-[11px] font-black tracking-[0.28em] uppercase text-red-600">
            Arneg Products
          </span>
        </div>
        <div style={{ perspective: "1200px" }}>
          <h2 className="ap-header-title flex flex-wrap gap-x-[0.18em] text-[clamp(48px,8vw,100px)] font-black leading-[0.9] tracking-[-0.04em] text-[#001845] uppercase">
            {["We", "Create", "Your", "Space."].map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-top">

              </span>
            ))}
          </h2>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MAIN LAYOUT
      ══════════════════════════════════════════ */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-0 pb-28 sm:pb-36">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">

          {/* ── LEFT PANEL ── */}
          <div className="ap-left w-full lg:w-[280px] flex-shrink-0 lg:pr-12 flex flex-col justify-between gap-10">

            <div>
              {/* Arneg wordmark replaced with logo1.png */}
              <div className="ap-logo opacity-0">
                <div className="inline-flex items-center bg-red-600 px-5 py-3 mb-6">
                  <Image
                    src="/logo1.png"
                    alt="Arneg"
                    width={140}
                    height={42}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* tagline */}
              <p className="ap-tagline opacity-0 text-[clamp(15px,1.6vw,19px)] font-black leading-[1.35] tracking-[-0.02em] text-[#001845] uppercase mb-8">
                We create your space with a bespoke retail design project.
              </p>

              {/* product list */}
              <ul className="flex flex-col gap-3 mb-10">
                {productList.map((item) => (
                  <li key={item} className="ap-list-item opacity-0 flex items-center gap-3">
                    <div className="w-4 h-[2px] bg-red-600 flex-shrink-0" />
                    <span className="text-[14px] font-semibold text-[#001845]/55 tracking-wide">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ILK logo + email */}
            <div className="flex flex-col gap-5">
              <div className="ap-ilk-logo opacity-0 border border-[#001845]/[0.08] p-4 w-fit">
                <Image
                  src="/logo.png"
                  alt="ILK Technology"
                  width={120}
                  height={56}
                  className="object-contain"
                />
              </div>
              <a
                href="mailto:sales@ilktechnology.com"
                className="ap-email opacity-0 text-[13px] font-bold text-[#001845]/35 tracking-wide hover:text-red-600 transition-colors duration-300"
              >
                sales@ilktechnology.com
              </a>
            </div>
          </div>

          {/* ── RIGHT PRODUCT GRID ── */}
          <div className="ap-grid flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 lg:pl-10 lg:border-l border-[#001845]/[0.07]">
            {products.map((p) => (
              <div
                key={p.label}
                className="ap-img-item opacity-0 flex flex-col gap-4 group cursor-default"
              >
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <Image
                    src={p.src}
                    alt={p.label}
                    fill
                    quality={90}
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="ap-img-label opacity-0 flex items-center gap-2.5">
                  <div className="w-3 h-[2px] bg-red-600 flex-shrink-0" />
                  <span className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#001845]/50">
                    {p.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* bottom border */}
      <div className="h-[3px] w-full bg-[#001845]" />
    </section>
  );
}