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

// ── Styles (static — defined outside component to avoid re-injection) ─────────
const HERO_STYLES = `
  @keyframes hero-wipe {
    from { transform: scaleX(1); }
    to   { transform: scaleX(0); }
  }
  @keyframes hero-line {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes hero-word {
    from { transform: translateY(110%) rotateX(-40deg); opacity: 0; }
    to   { transform: translateY(0)     rotateX(0deg);  opacity: 1; }
  }
  @keyframes hero-fade-up {
    from { transform: translateY(20px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }

  .hero-wipe {
    transform-origin: left center;
    animation: hero-wipe 0.55s cubic-bezier(0.87,0,0.13,1) 0.05s forwards;
  }
  .hero-line {
    transform-origin: center;
    animation: hero-line 0.5s cubic-bezier(0.16,1,0.3,1) 0.15s both;
  }
  .hero-word {
    display: inline-block;
    opacity: 0;
    animation: hero-word 0.48s cubic-bezier(0.16,1,0.3,1) both;
  }
  .hero-desc {
    opacity: 0;
    animation: hero-fade-up 0.42s ease-out both;
  }
  .hero-cta {
    opacity: 0;
    animation: hero-fade-up 0.38s ease-out both;
  }
  .hero-stat {
    opacity: 0;
    animation: hero-fade-up 0.38s ease-out both;
  }

  /* Stat card — no backdrop-filter on mobile (GPU-expensive) */
  .hero-stat-card {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    text-align: center;
    padding: 1.25rem 0.75rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }
  @media (min-width: 640px) {
    .hero-stat-card {
      padding: 2.25rem 1.5rem;
      /* Only apply expensive filter on sm+ where GPU headroom is more reliable */
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
  }

  .hero-stat-glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(ellipse at 50% 0%, rgba(239,68,68,0.08) 0%, transparent 65%);
  }
  .hero-stat-topline {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2rem;
    height: 2px;
    border-radius: 0 0 9999px 9999px;
    background: rgb(239, 68, 68);
  }
`;

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

const Counter = ({
  target,
  suffix,
  started,
}: {
  target: number;
  suffix: string;
  started: boolean;
}) => {
  const n = useCountUp(target, 1200, started);
  return <>{n}{suffix}</>;
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef   = useRef<HTMLDivElement>(null);
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    // Fire counters after content animations settle (~700 ms)
    const countTimer = setTimeout(() => setCounting(true), 700);

    // Skip parallax entirely on mobile — saves battery and avoids jank.
    // Also skip on slow connections (2G / save-data).
    const isMobile = window.innerWidth < 768;
    const conn = (navigator as Navigator & {
      connection?: { effectiveType?: string; saveData?: boolean };
    }).connection;
    const isSlowNetwork =
      conn?.saveData ||
      conn?.effectiveType === "slow-2g" ||
      conn?.effectiveType === "2g";

    let gsapCtx: { revert: () => void } | null = null;

    if (!isMobile && !isSlowNetwork) {
      const gsapTimer = setTimeout(async () => {
        try {
          const [{ gsap }, { ScrollTrigger }] = await Promise.all([
            import("gsap"),
            import("gsap/ScrollTrigger"),
          ]);
          gsap.registerPlugin(ScrollTrigger);
          gsapCtx = gsap.context(() => {
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
        } catch {
          // GSAP unavailable — parallax silently skipped
        }
      }, 1500); // well after LCP

      return () => {
        clearTimeout(countTimer);
        clearTimeout(gsapTimer);
        gsapCtx?.revert();
      };
    }

    return () => clearTimeout(countTimer);
  }, []);

  return (
    <>
      {/* Static styles injected once — no per-render re-injection */}
      <style>{HERO_STYLES}</style>

      <section
        ref={heroRef}
        className="relative min-h-[70vh] sm:min-h-[100dvh] w-full overflow-hidden bg-[#050a12] flex flex-col"
      >
        {/* Background */}
        <div ref={bgRef} className="absolute inset-0">
          <Image
            src="/hero-bg-2.webp"
            alt="ILK Technology commercial refrigeration"
            fill
            priority
            loading="eager"
            fetchPriority="high"
            quality={70}
            sizes="(max-width: 640px) 640w, (max-width: 1024px) 1024w, 100vw"
            className="object-cover object-[65%_50%] sm:object-[55%_50%] lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050a12]/90 via-[#050a12]/60 to-[#050a12]/15 sm:from-[#050a12]/88 sm:via-[#050a12]/50 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050a12] via-[#050a12]/30 to-transparent" />
        </div>

        {/* Wipe Overlay */}
        <div className="hero-wipe absolute inset-0 z-30 bg-[#050a12] origin-left" />

        {/* CONTENT */}
        {/*
          perspective moved here (parent) instead of on the h1 wrapper —
          avoids forcing a new stacking context mid-paint on mobile.
        */}
        <div
          className="relative z-10 flex flex-col items-center justify-center text-center min-h-[70vh] sm:min-h-[100dvh] max-w-5xl mx-auto w-full px-4 sm:px-10 lg:px-16 pt-12 sm:pt-20 pb-6 sm:pb-8"
          style={{ perspective: "1000px" }}
        >
          {/* Accent line */}
          <div className="hero-line mb-5 sm:mb-9 h-[2px] w-10 sm:w-20 bg-red-500" />

          {/* HEADING */}
          <div className="mb-4 sm:mb-8">
            <h1 className="text-[clamp(2rem,9.5vw,3.6rem)] sm:text-[clamp(3rem,7vw,6rem)] font-black leading-[1.0] tracking-[-0.03em] text-white uppercase">
              {HEADING.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.16em] align-top">
                  <span
                    className="hero-word"
                    style={{ animationDelay: `${0.15 + i * 0.045}s` }}
                  >
                    {w.includes("Refrigeration") ? (
                      <span
                        className="text-transparent"
                        style={{ WebkitTextStroke: "2.5px rgba(255,255,255,0.5)" }}
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

          {/* DESCRIPTION */}
          <div
            className="hero-desc mb-8 sm:mb-12 max-w-2xl"
            style={{ animationDelay: "0.45s" }}
          >
            <p className="text-[14px] sm:text-[18px] lg:text-[20px] leading-[1.7] sm:leading-[1.9] text-white/60 font-light">
              <span className="text-white font-semibold">ILK Technology</span> —
              Commercial Refrigeration Supplier and{" "}
              <span className="text-red-500 font-semibold">Arneg</span>{" "}
              Distribution Partner here in the UK.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-10 sm:mb-16 w-full sm:w-auto">
            <Link
              href="/about"
              className="hero-cta group relative inline-flex items-center justify-center gap-3
                bg-red-500 hover:bg-red-400 active:bg-red-600 overflow-hidden
                px-6 py-3 sm:px-9 sm:py-4 text-[11px] sm:text-[12px] font-black tracking-[0.25em] uppercase text-white
                sm:shadow-[0_0_32px_rgba(239,68,68,0.2)] sm:hover:shadow-[0_0_48px_rgba(239,68,68,0.35)]
                transition-all duration-300 w-full sm:w-auto"
              style={{ animationDelay: "0.55s" }}
            >
              {/* Shimmer — GPU composited translate, fine on mobile */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
              <span className="relative flex items-center gap-3">
                About Us
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

            <Link
              href="/contact"
              className="hero-cta group inline-flex items-center justify-center gap-3
                border border-white/10 hover:border-white/30
                bg-white/[0.04] hover:bg-white/[0.08]
                px-6 py-3 sm:px-9 sm:py-4 text-[11px] sm:text-[12px] font-black tracking-[0.25em] uppercase
                text-white/50 hover:text-white transition-all duration-300
                w-full sm:w-auto"
              style={{ animationDelay: "0.62s" }}
            >
              <span className="relative flex items-center gap-3">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
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
            </Link>
          </div>

          {/* STATS */}
          <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="hero-stat hero-stat-card"
                style={{ animationDelay: `${0.6 + i * 0.05}s` }}
              >
                <div className="hero-stat-glow" />
                <div className="hero-stat-topline" />
                <p className="relative z-10 text-2xl sm:text-3xl lg:text-4xl font-black leading-none tracking-tight tabular-nums mb-2 text-white">
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

        {/* BOTTOM FADE */}
        <div className="absolute bottom-0 inset-x-0 h-24 sm:h-40 bg-gradient-to-t from-[#050a12] to-transparent z-10 pointer-events-none" />
      </section>
    </>
  );
}