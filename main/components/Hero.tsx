"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   Count-up hook — cubic ease-out
───────────────────────────────────────────── */
function useCountUp(target: number, duration: number, started: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) return;
    const t0 = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(ease * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, started]);

  return value;
}

/* ─────────────────────────────────────────────
   Single animated stat number
───────────────────────────────────────────── */
function AnimatedNumber({
  target,
  suffix,
  started,
}: {
  target: number;
  suffix: string;
  started: boolean;
}) {
  const n = useCountUp(target, 2400, started);
  return (
    <>
      {n}
      {suffix}
    </>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [counting, setCounting] = useState(false);

  const boot = useCallback(async () => {
    const { gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    /* 1 — wipe */
    tl.fromTo(
      wipeRef.current,
      { scaleX: 1, transformOrigin: "left" },
      { scaleX: 0, duration: 1.4, ease: "expo.inOut" }
    );

    /* 2 — bg zoom-out */
    tl.fromTo(
      bgRef.current,
      { scale: 1.35 },
      { scale: 1.05, duration: 2.8, ease: "power2.out" },
      "-=1.0"
    );

    /* 3 — red line */
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: "expo.out" },
      "-=2.0"
    );

    /* 4 — heading words */
    if (headRef.current) {
      tl.fromTo(
        headRef.current.querySelectorAll(".word"),
        { y: "120%", opacity: 0, rotateX: -45 },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          duration: 1.1,
          stagger: 0.09,
          ease: "power4.out",
        },
        "-=1.6"
      );
    }

    /* 5 — description */
    tl.fromTo(
      descRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.5"
    );

    /* 6 — buttons */
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.querySelectorAll(".cta"),
        { y: 22, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "back.out(1.4)",
        },
        "-=0.5"
      );
    }

    /* 7 — stats */
    if (statsRef.current) {
      tl.fromTo(
        statsRef.current.querySelectorAll(".stat"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          onStart: () => setCounting(true),
        },
        "-=0.35"
      );
    }

    /* scroll parallax */
    gsap.to(bgRef.current, {
      yPercent: 16,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    });
  }, []);

  useEffect(() => {
    boot();
  }, [boot]);

  const heading = ["Commercial", "Refrigeration,", "Engineered", "for the UK."];

  const stats = [
    { n: 20, suf: "+", label: "Years" },
    { n: 500, suf: "+", label: "Projects" },
    { n: 100, suf: "%", label: "Coverage" },
    { n: 24, suf: "/7", label: "Support" },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#060b14] flex flex-col"
    >
      {/* ─── BACKGROUND ─── */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/hero-bg.jpeg"
          alt="ILK Technology commercial refrigeration"
          fill
          priority
          quality={90}
          className="object-cover object-[65%_50%] sm:object-[55%_50%] lg:object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r
          from-[#060b14]/90 via-[#060b14]/60 to-[#060b14]/20
          sm:from-[#060b14]/88 sm:via-[#060b14]/50 sm:to-transparent"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t
          from-[#060b14] via-[#060b14]/30 to-transparent"
        />
      </div>

      {/* ─── WIPE ─── */}
      <div ref={wipeRef} className="absolute inset-0 z-30 bg-[#060b14]" />

      {/* ─── CONTENT ─── */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center
        min-h-[100dvh] max-w-5xl mx-auto w-full px-5 sm:px-10 lg:px-16 pt-20 pb-8 sm:py-0"
      >
        {/* red accent */}
        <div
          ref={lineRef}
          className="mb-7 sm:mb-9 h-[2px] w-12 sm:w-20 bg-red-500 origin-center scale-x-0"
        />
        {/* ─── HEADING ─── */}
        <div
          ref={headRef}
          className="mb-6 sm:mb-8"
          style={{ perspective: "1000px" }}
        >
          <h1
            className="text-[clamp(2.5rem,10vw,5.8rem)] sm:text-[clamp(3rem,7vw,6rem)]
            font-black leading-[1.0] tracking-[-0.03em] text-white uppercase"
          >
            {heading.map((w, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden mr-[0.2em] align-top"
              >
                <span className="word inline-block opacity-0 will-change-transform">
                  {w.includes("Refrigeration") ? (
                    <span
                      className="text-transparent"
                      style={{
                        WebkitTextStroke: "3px rgba(255,255,255,0.5)",
                      }}
                    >
                      {w}
                    </span>
                  ) : w.includes("UK") ? (
                    <span className="text-red-500">{w}</span>
                  ) : (
                    w
                  )}
                </span>
              </span>
            ))}
          </h1>
        </div>
        {/* ─── DESCRIPTION — bigger, with Arneg in red ─── */}
        <div ref={descRef} className="mb-10 sm:mb-12 opacity-0 max-w-2xl">
          <p
            className="text-[15px] sm:text-[18px] lg:text-[20px] leading-[1.8] sm:leading-[1.9]
            text-white/60 font-light"
          >
            We&apos;re{" "}
            <span className="text-white font-semibold">ILK Technology</span> — a
            UK-based commercial refrigeration supplier and proud{" "}
            <span className="text-red-500 font-semibold">Arneg</span>{" "}
            distribution partner delivering industry-leading cooling solutions
            for retail, food service, and industrial environments.
          </p>
        </div>
        {/* ─── BUTTONS ─── */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-16 sm:mb-20 w-full sm:w-auto"
        >
          <a
            href="/about"
            className="cta group relative inline-flex items-center justify-center gap-3
              bg-red-500 hover:bg-red-400 active:bg-red-600 overflow-hidden
              px-9 py-4 text-[11px] sm:text-[12px] font-black tracking-[0.25em] uppercase text-white
              transition-colors duration-300
              shadow-[0_0_32px_rgba(239,68,68,0.2)] hover:shadow-[0_0_48px_rgba(239,68,68,0.35)]
              w-full sm:w-auto opacity-0"
          >
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full
              bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700"
            />
            <span className="relative flex items-center gap-3">
              About Us
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </a>

          <a
            href="/contact"
            className="cta group inline-flex items-center justify-center gap-3
              border border-white/10 hover:border-white/30
              bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-sm
              px-9 py-4 text-[11px] sm:text-[12px] font-black tracking-[0.25em] uppercase
              text-white/50 hover:text-white transition-all duration-300
              w-full sm:w-auto opacity-0"
          >
            <span className="relative flex items-center gap-3">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Let&apos;s Talk
            </span>
          </a>
        </div>
        {/* ═════════════════════════════════════
    STATS — high contrast cards
═════════════════════════════════════ */}
        <div
          ref={statsRef}
          className="w-full max-w-3xl grid grid-cols-4 gap-2 sm:gap-3"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat group opacity-0
        rounded-xl
        bg-white/[0.08] border border-white/[0.1]
        hover:border-red-500/40
        px-3 py-4 sm:px-5 sm:py-6
        backdrop-blur-md
        transition-all duration-400
        text-center"
            >
              {/* number */}
              <p
                className="text-xl sm:text-3xl font-black text-white leading-none
        tracking-tight tabular-nums mb-1.5"
              >
                <AnimatedNumber
                  target={s.n}
                  suffix={s.suf}
                  started={counting}
                />
              </p>

              {/* label */}
              <p
                className="text-[9px] sm:text-[11px] font-extrabold tracking-[0.15em] sm:tracking-[0.2em]
        uppercase text-red-400 group-hover:text-red-300 transition-colors duration-400"
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>{" "}
      </div>

      {/* ─── BOTTOM FADE ─── */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 sm:h-40
        bg-gradient-to-t from-[#060b14] to-transparent z-10 pointer-events-none"
      />
    </section>
  );
}
