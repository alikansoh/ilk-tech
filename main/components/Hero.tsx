"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

/* ── count-up hook ── */
function useCountUp(target: number, duration: number, started: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) return;
    const t0 = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, started]);

  return value;
}

function Counter({ target, suffix, started }: { target: number; suffix: string; started: boolean }) {
  const n = useCountUp(target, 2400, started);
  return <>{n}{suffix}</>;
}

/* ── component ── */
export default function HeroSection() {
  const heroRef  = useRef<HTMLDivElement>(null);
  const wipeRef  = useRef<HTMLDivElement>(null);
  const bgRef    = useRef<HTMLDivElement>(null);
  const lineRef  = useRef<HTMLDivElement>(null);
  const headRef  = useRef<HTMLDivElement>(null);
  const descRef  = useRef<HTMLDivElement>(null);
  const ctaRef   = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [counting, setCounting] = useState(false);

  const boot = useCallback(async () => {
    const { gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(wipeRef.current,
      { scaleX: 1, transformOrigin: "left" },
      { scaleX: 0, duration: 1.4, ease: "expo.inOut" }
    );

    tl.fromTo(bgRef.current,
      { scale: 1.35 },
      { scale: 1.05, duration: 2.8, ease: "power2.out" },
      "-=1.0"
    );

    tl.fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: "expo.out" },
      "-=2.0"
    );

    if (headRef.current) {
      tl.fromTo(
        headRef.current.querySelectorAll(".word"),
        { y: "120%", opacity: 0, rotateX: -45 },
        { y: "0%", opacity: 1, rotateX: 0, duration: 1.1, stagger: 0.09, ease: "power4.out" },
        "-=1.6"
      );
    }

    tl.fromTo(descRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.5"
    );

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.querySelectorAll(".cta"),
        { y: 22, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: "back.out(1.4)" },
        "-=0.5"
      );
    }

    if (statsRef.current) {
      tl.fromTo(
        statsRef.current.querySelectorAll(".stat"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out", onStart: () => setCounting(true) },
        "-=0.35"
      );
    }

    gsap.to(bgRef.current, {
      yPercent: 16, ease: "none",
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.2 },
    });
  }, []);

  useEffect(() => { boot(); }, [boot]);

  const heading = ["Commercial", "Refrigeration,", "Engineered", "for the UK."];

  const stats = [
    { n: 20,   suf: "+", label: "Years Experience" },
    { n: 1000, suf: "+", label: "Clients Served" },
    { n: 5000, suf: "+", label: "Installations" },
    { n: 100,  suf: "%", label: "Satisfaction" },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#050a12] flex flex-col"
    >
      {/* ── BACKGROUND ── */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/hero-bg.webp"
          alt="ILK Technology commercial refrigeration"
          fill
          priority
          quality={90}
          className="object-cover object-[65%_50%] sm:object-[55%_50%] lg:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050a12]/90 via-[#050a12]/60 to-[#050a12]/15 sm:from-[#050a12]/88 sm:via-[#050a12]/50 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a12] via-[#050a12]/30 to-transparent" />
      </div>

      {/* ── WIPE ── */}
      <div ref={wipeRef} className="absolute inset-0 z-30 bg-[#050a12]" />

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[100dvh] max-w-5xl mx-auto w-full px-5 sm:px-10 lg:px-16 pt-20 pb-8 sm:py-0">

        <div ref={lineRef} className="mb-7 sm:mb-9 h-[2px] w-12 sm:w-20 bg-red-500 origin-center scale-x-0" />

        {/* ── HEADING ── */}
        <div ref={headRef} className="mb-6 sm:mb-8" style={{ perspective: "1000px" }}>
          <h1 className="text-[clamp(2.5rem,10vw,5.8rem)] sm:text-[clamp(3rem,7vw,6rem)] font-black leading-[1.0] tracking-[-0.03em] text-white uppercase">
            {heading.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.2em] align-top">
                <span className="word inline-block opacity-0 will-change-transform">
                  {w.includes("Refrigeration") ? (
                    <span className="text-transparent" style={{ WebkitTextStroke: "3px rgba(255,255,255,0.5)" }}>{w}</span>
                  ) : w.includes("UK") ? (
                    <span className="text-red-500">{w}</span>
                  ) : (w)}
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* ── DESCRIPTION ── */}
        <div ref={descRef} className="mb-10 sm:mb-12 opacity-0 max-w-2xl">
          <p className="text-[15px] sm:text-[18px] lg:text-[20px] leading-[1.8] sm:leading-[1.9] text-white/60 font-light">
            <span className="text-white font-semibold">ILK Technology</span> —
            Commercial Refrigeration Supplier and{" "}
            <span className="text-red-500 font-semibold">Arneg</span>{" "}
            Distribution Partner here in the UK.
          </p>
        </div>

        {/* ── BUTTONS ── */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-14 sm:mb-16 w-full sm:w-auto">
          <a href="/about"
            className="cta group relative inline-flex items-center justify-center gap-3
              bg-red-500 hover:bg-red-400 active:bg-red-600 overflow-hidden
              px-9 py-4 text-[11px] sm:text-[12px] font-black tracking-[0.25em] uppercase text-white
              shadow-[0_0_32px_rgba(239,68,68,0.2)] hover:shadow-[0_0_48px_rgba(239,68,68,0.35)]
              transition-all duration-300 w-full sm:w-auto opacity-0">
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
            <span className="relative flex items-center gap-3">
              About Us
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>

          <a href="/contact"
            className="cta group inline-flex items-center justify-center gap-3
              border border-white/10 hover:border-white/30
              bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-sm
              px-9 py-4 text-[11px] sm:text-[12px] font-black tracking-[0.25em] uppercase
              text-white/50 hover:text-white transition-all duration-300
              w-full sm:w-auto opacity-0">
            <span className="relative flex items-center gap-3">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Let&apos;s Talk
            </span>
          </a>
        </div>

        {/* ── STATS ── */}
        <div
          ref={statsRef}
          className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat opacity-0 relative overflow-hidden rounded-2xl text-center px-4 py-7 sm:px-6 sm:py-9"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, rgba(239,68,68,0.10) 0%, transparent 65%)",
                }}
              />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[2px] rounded-b-full bg-red-500" />
              <p className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-black leading-none tracking-tight tabular-nums mb-2 text-white">
                <Counter target={s.n} suffix={s.suf} started={counting} />
              </p>
              <div className="w-5 h-px bg-white/10 mx-auto mb-2" />
              <p className="relative z-10 text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase text-white">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM FADE ── */}
      <div className="absolute bottom-0 inset-x-0 h-32 sm:h-40 bg-gradient-to-t from-[#050a12] to-transparent z-10 pointer-events-none" />
    </section>
  );
}