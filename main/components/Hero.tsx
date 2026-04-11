"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const noiseRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap }        = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      /* ── master timeline ── */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /* 1 · cinematic wipe */
      tl.fromTo(
        overlayRef.current,
        { scaleX: 1, transformOrigin: "left" },
        { scaleX: 0, duration: 1.4, ease: "expo.inOut" }
      );

      /* 2 · noise grain fade-in */
      tl.fromTo(noiseRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");

      /* 3 · badge */
      tl.fromTo(
        badgeRef.current,
        { y: 16, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7 },
        "-=0.3"
      );

      /* 4 · red line */
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: "expo.out" },
        "-=0.4"
      );

      /* 5 · heading words – split reveal */
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".word");
        tl.fromTo(
          words,
          { y: "110%", opacity: 0, rotateX: -30, filter: "blur(4px)" },
          {
            y: "0%",
            opacity: 1,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.07,
            ease: "power4.out",
          },
          "-=0.55"
        );
      }

      /* 6 · sub-copy */
      tl.fromTo(
        subRef.current,
        { y: 22, opacity: 0, filter: "blur(4px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8 },
        "-=0.55"
      );

      /* 7 · CTAs */
      tl.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.45"
      );

      /* 8 · stats */
      if (statsRef.current) {
        const items = statsRef.current.querySelectorAll(".stat-item");
        tl.fromTo(
          items,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.09 },
          "-=0.4"
        );
      }

      /* 9 · scroll caret */
      tl.fromTo(
        scrollRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );

      /* ── scroll-driven parallax (all devices) ── */
      gsap.to(".hero-bg-img", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      /* ── continuous caret bounce ── */
      gsap.to(".scroll-caret", {
        y: 7,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* ── subtle red glow pulse ── */
      gsap.to(".red-glow", {
        opacity: 0.55,
        scale: 1.12,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    };

    init();
  }, []);

  const words = ["Commercial", "Refrigeration,", "Engineered", "for the UK."];

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#000d1f] flex flex-col"
    >
      {/* ════════════════════════════════════
          BACKGROUND — photo always visible
      ════════════════════════════════════ */}
      <div className="hero-bg-img absolute inset-0 scale-[1.08]">
        <Image
          src="/hero-bg.jpeg"
          alt="ILK Technology – commercial refrigeration"
          fill
          /* on mobile show right side of image (equipment); shift left on desktop */
          className="object-cover object-[62%_50%] sm:object-[55%_50%] lg:object-center"
          priority
          quality={90}
        />

        {/* Mobile: dark left + bottom vignette so text is always legible */}
        <div className="absolute inset-0 bg-gradient-to-r
          from-[#000d1f]/92 via-[#000d1f]/70 to-[#000d1f]/30
          sm:from-[#000d1f]/90 sm:via-[#000d1f]/60 sm:to-[#000d1f]/15" />
        <div className="absolute inset-0 bg-gradient-to-t
          from-[#000d1f] via-[#000d1f]/20 to-transparent" />

        {/* Subtle red bloom bottom-left — depth cue */}
        <div className="red-glow absolute -bottom-20 -left-20 w-[420px] h-[420px]
          rounded-full bg-red-700/25 blur-[90px] opacity-40 pointer-events-none" />
      </div>

      {/* ════════════════════════════════════
          NOISE GRAIN TEXTURE — premium feel
      ════════════════════════════════════ */}
      <div
        ref={noiseRef}
        className="absolute inset-0 z-[1] opacity-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
          mixBlendMode: "overlay",
        }}
      />

      {/* ════════════════════════════════════
          CINEMATIC WIPE OVERLAY
      ════════════════════════════════════ */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-30 bg-[#000d1f]"
      />

      {/* ════════════════════════════════════
          LEFT RULE — sm and up
      ════════════════════════════════════ */}
      <div className="hidden sm:block absolute left-8 lg:left-12 top-0 bottom-0 w-px bg-white/[0.07] z-10" />

      {/* ════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col justify-center
        min-h-[100dvh] max-w-7xl mx-auto w-full
        px-5 sm:px-10 lg:px-16
        pt-24 pb-10 sm:py-0">

        {/* BADGE */}
        <div ref={badgeRef} className="mb-5 opacity-0">
          <span className="inline-flex items-center gap-2
            border border-white/[0.12] bg-white/[0.05] backdrop-blur-md
            px-3.5 py-1.5
            text-[9px] sm:text-[10px] font-bold tracking-[0.32em] uppercase text-white/55">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
            Arneg UK Distribution Partner
          </span>
        </div>

        {/* RED LINE */}
        <div
          ref={lineRef}
          className="mb-6 sm:mb-8 h-[2px] w-12 sm:w-20 bg-red-600 origin-left scale-x-0"
        />

        {/* HEADING */}
        <div
          ref={headingRef}
          className="mb-5 sm:mb-6"
          style={{ perspective: "900px" }}
        >
          <h1 className="
            text-[clamp(2.6rem,10.5vw,6rem)]
            sm:text-[clamp(2.8rem,7vw,6rem)]
            font-black leading-[1.0] tracking-[-0.025em] text-white uppercase">
            {words.map((word, i) => (
              /* clip wrapper so words slide up from beneath */
              <span key={i} className="inline-block overflow-hidden mr-[0.22em] align-top">
                <span className="word inline-block opacity-0">
                  {word.includes("Refrigeration") ? (
                    <span
                      className="text-transparent bg-clip-text"
                      style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.32)" }}
                    >
                      {word}
                    </span>
                  ) : word.includes("UK") ? (
                    <span className="text-red-500">{word}</span>
                  ) : (
                    word
                  )}
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* SUB-COPY */}
        <p
          ref={subRef}
          className="mb-8 max-w-[min(420px,90vw)] sm:max-w-lg
            text-[13.5px] sm:text-[15px] leading-[1.85] text-white/45 font-light opacity-0"
        >
          We&apos;re{" "}
          <span className="text-white font-semibold">ILK Technology</span> —
          a UK-based commercial refrigeration supplier and proud{" "}
          <span className="text-white/70 font-medium">Arneg</span> distribution
          partner delivering industry-leading cooling solutions for retail, food
          service, and industrial environments.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col xs:flex-row gap-3 mb-10 sm:mb-14 opacity-0"
        >
          <a
            href="/products"
            className="group relative inline-flex items-center justify-center gap-3
              bg-red-600 hover:bg-red-500 active:bg-red-700
              overflow-hidden
              px-7 py-3.5 sm:px-8 sm:py-4
              text-[11px] sm:text-[11.5px] font-black tracking-[0.22em] uppercase text-white
              transition-colors duration-300 w-full xs:w-auto"
          >
            {/* shimmer sweep */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full
              bg-gradient-to-r from-transparent via-white/15 to-transparent
              transition-transform duration-700 ease-in-out" />
            View Products
            <svg
              className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1.5"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <a
            href="/contact"
            className="group inline-flex items-center justify-center gap-3
              border border-white/20 hover:border-white/50
              bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-sm
              px-7 py-3.5 sm:px-8 sm:py-4
              text-[11px] sm:text-[11.5px] font-black tracking-[0.22em] uppercase
              text-white/60 hover:text-white
              transition-all duration-300 w-full xs:w-auto"
          >
            Get in Touch
          </a>
        </div>

        {/* STATS */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-4
            border-t border-white/[0.08] pt-6 sm:pt-7
            gap-y-5 sm:gap-y-0"
        >
          {[
            { value: "20+",   label: "Years Experience" },
            { value: "500+",  label: "Installations"    },
            { value: "Arneg", label: "Official Partner" },
            { value: "UK",    label: "Nationwide"       },
          ].map((stat, i) => (
            <div key={i} className="stat-item opacity-0 pr-4 sm:pr-8">
              {/* thin left accent on each stat */}
              <div className="flex items-start gap-2.5">
                <span className="mt-1.5 block w-[2px] h-7 sm:h-8 bg-red-600/60 shrink-0" />
                <div>
                  <p className="text-[clamp(1.45rem,4.5vw,2rem)] sm:text-[clamp(1.4rem,2.2vw,1.9rem)]
                    font-black text-white tracking-tight leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-semibold
                    tracking-[0.2em] uppercase text-white/30">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════
          BOTTOM FADE
      ════════════════════════════════════ */}
      <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36
        bg-gradient-to-t from-[#000d1f] to-transparent z-10 pointer-events-none" />

      {/* ════════════════════════════════════
          SCROLL INDICATOR
      ════════════════════════════════════ */}
      <div
        ref={scrollRef}
        className="absolute bottom-6 sm:bottom-9 left-1/2 -translate-x-1/2
          z-10 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-[8px] font-bold tracking-[0.45em] uppercase text-white/20">
          Scroll
        </span>
        <div className="scroll-caret flex flex-col items-center gap-[3px]">
          <span className="block w-px h-6 bg-gradient-to-b from-white/25 to-transparent" />
          {/* chevron */}
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
            className="text-white/20">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}