"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ── Static data ───────────────────────────────────────────────────────────────
const HEADING = ["Commercial", "Refrigeration,", "Engineered", "for the UK."];

const STATS = [
  { n: 20,   suf: "+", label: "Years Experience" },
  { n: 1000, suf: "+", label: "Clients Served" },
  { n: 5000, suf: "+", label: "Installations" },
  { n: 100,  suf: "%", label: "Satisfaction" },
] as const;

// ── Count-up hook ─────────────────────────────────────────────────────────────
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

const Counter = ({ target, suffix, started }: { target: number; suffix: string; started: boolean }) => {
  const n = useCountUp(target, 1200, started);
  return <>{n}{suffix}</>;
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const heroRef  = useRef<HTMLDivElement>(null);
  const bgRef    = useRef<HTMLDivElement>(null);
  const [counting, setCounting] = useState(false);

  // Lazy-load GSAP ONLY for scroll parallax — after paint
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const timer = setTimeout(async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
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
      });
    }, 400); // defer until after first paint

    // Fire counters after CSS animations complete (~900ms)
    const countTimer = setTimeout(() => setCounting(true), 900);

    return () => {
      clearTimeout(timer);
      clearTimeout(countTimer);
      ctx?.revert();
    };
  }, []);

  return (
    <>
      {/* ── CRITICAL CSS injected once ── */}
      <style>{`
        @keyframes hero-wipe {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
        @keyframes hero-scale-in {
          from { transform: scale(1.3); }
          to   { transform: scale(1.05); }
        }
        @keyframes hero-line {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes hero-word {
          from { transform: translateY(110%) rotateX(-40deg); opacity: 0; }
          to   { transform: translateY(0)   rotateX(0deg);   opacity: 1; }
        }
        @keyframes hero-fade-up {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        .hero-wipe {
          animation: hero-wipe 0.6s cubic-bezier(0.87,0,0.13,1) 0.05s forwards;
        }
        .hero-bg {
          animation: hero-scale-in 1.4s cubic-bezier(0.25,0.46,0.45,0.94) 0.05s both;
        }
        .hero-line {
          transform-origin: center;
          animation: hero-line 0.55s cubic-bezier(0.16,1,0.3,1) 0.2s both;
        }
        .hero-word {
          display: inline-block;
          opacity: 0;
          animation: hero-word 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        .hero-desc {
          opacity: 0;
          animation: hero-fade-up 0.45s ease-out both;
        }
        .hero-cta {
          opacity: 0;
          animation: hero-fade-up 0.4s ease-out both;
        }
        .hero-stat {
          opacity: 0;
          animation: hero-fade-up 0.4s ease-out both;
        }
      `}</style>

      <section
        ref={heroRef}
        className="relative min-h-[100dvh] w-full overflow-hidden bg-[#050a12] flex flex-col"
      >
        {/* ── BACKGROUND ── */}
        <div ref={bgRef} className="hero-bg absolute inset-0" style={{ willChange: "transform" }}>
          <Image
            src="/hero-bg.webp"
            alt="ILK Technology commercial refrigeration"
            fill
            priority
            fetchPriority="high"
            quality={85}
            sizes="100vw"
            className="object-cover object-[65%_50%] sm:object-[55%_50%] lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050a12]/90 via-[#050a12]/60 to-[#050a12]/15 sm:from-[#050a12]/88 sm:via-[#050a12]/50 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050a12] via-[#050a12]/30 to-transparent" />
        </div>

        {/* ── WIPE ── */}
        <div className="hero-wipe absolute inset-0 z-30 bg-[#050a12] origin-left" />

        {/* ── CONTENT ── */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[100dvh] max-w-5xl mx-auto w-full px-5 sm:px-10 lg:px-16 pt-20 pb-8 sm:py-0">

          {/* Line */}
          <div className="hero-line mb-7 sm:mb-9 h-[2px] w-12 sm:w-20 bg-red-500" />

          {/* ── HEADING ── */}
          <div className="mb-6 sm:mb-8" style={{ perspective: "1000px" }}>
            <h1 className="text-[clamp(2.5rem,10vw,5.8rem)] sm:text-[clamp(3rem,7vw,6rem)] font-black leading-[1.0] tracking-[-0.03em] text-white uppercase">
              {HEADING.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.2em] align-top">
                  <span
                    className="hero-word"
                    style={{ animationDelay: `${0.25 + i * 0.055}s`, willChange: "transform, opacity" }}
                  >
                    {w.includes("Refrigeration") ? (
                      <span className="text-transparent" style={{ WebkitTextStroke: "3px rgba(255,255,255,0.5)" }}>{w}</span>
                    ) : w.includes("UK") ? (
                      <span className="text-red-500">{w}</span>
                    ) : w}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          {/* ── DESCRIPTION ── */}
          <div
            className="hero-desc mb-10 sm:mb-12 max-w-2xl"
            style={{ animationDelay: "0.55s", willChange: "transform, opacity" }}
          >
            <p className="text-[15px] sm:text-[18px] lg:text-[20px] leading-[1.8] sm:leading-[1.9] text-white/60 font-light">
              <span className="text-white font-semibold">ILK Technology</span> —
              Commercial Refrigeration Supplier and{" "}
              <span className="text-red-500 font-semibold">Arneg</span>{" "}
              Distribution Partner here in the UK.
            </p>
          </div>

          {/* ── BUTTONS ── */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-14 sm:mb-16 w-full sm:w-auto">
            <Link
              href="/about"
              className="hero-cta group relative inline-flex items-center justify-center gap-3
                bg-red-500 hover:bg-red-400 active:bg-red-600 overflow-hidden
                px-9 py-4 text-[11px] sm:text-[12px] font-black tracking-[0.25em] uppercase text-white
                shadow-[0_0_32px_rgba(239,68,68,0.2)] hover:shadow-[0_0_48px_rgba(239,68,68,0.35)]
                transition-all duration-300 w-full sm:w-auto"
              style={{ animationDelay: "0.65s" }}
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
              <span className="relative flex items-center gap-3">
                About Us
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>

            <Link
              href="/contact"
              className="hero-cta group inline-flex items-center justify-center gap-3
                border border-white/10 hover:border-white/30
                bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-sm
                px-9 py-4 text-[11px] sm:text-[12px] font-black tracking-[0.25em] uppercase
                text-white/50 hover:text-white transition-all duration-300
                w-full sm:w-auto"
              style={{ animationDelay: "0.72s" }}
            >
              <span className="relative flex items-center gap-3">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Let&apos;s Talk
              </span>
            </Link>
          </div>

          {/* ── STATS ── */}
          <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="hero-stat relative overflow-hidden rounded-2xl text-center px-4 py-7 sm:px-6 sm:py-9"
                style={{
                  animationDelay: `${0.78 + i * 0.06}s`,
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  willChange: "transform, opacity",
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(239,68,68,0.10) 0%, transparent 65%)" }}
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
    </>
  );
}