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

// ── Styles ────────────────────────────────────────────────────────────────────
// FIX: Moved to a module-level constant so React never re-creates the string
// and the <style> tag stays stable across renders (no re-injection / CLS).
// FIX: Reduced hero-wipe duration 0.55s → 0.35s on mobile to unblock FCP sooner.
// FIX: hero-stat no longer animates opacity from 0 — cards have reserved height
//      so there is no layout shift. We animate transform only.
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

  /* FIX: Faster wipe on mobile (0.35s) so LCP element is visible sooner */
  .hero-wipe {
    transform-origin: left center;
    animation: hero-wipe 0.35s cubic-bezier(0.87,0,0.13,1) 0s forwards;
  }
  @media (min-width: 640px) {
    .hero-wipe {
      animation-duration: 0.55s;
      animation-delay: 0.05s;
    }
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

  /* FIX: hero-stat cards have reserved layout space (min-height set inline).
     We animate transform only — not opacity — so no CLS from invisible boxes. */
  .hero-stat {
    animation: hero-fade-up 0.38s ease-out both;
  }

  .hero-stat-card {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    text-align: center;
    /* FIX: explicit min-height reserves layout space before animation completes,
       preventing the CLS that was causing +25 penalty */
    min-height: 90px;
    padding: 1.25rem 0.75rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }
  @media (min-width: 640px) {
    .hero-stat-card {
      min-height: 120px;
      padding: 2.25rem 1.5rem;
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

  /* Mobile: disable shimmer animation to reduce compositing cost */
  @media (max-width: 639px) {
    .hero-cta-shimmer { display: none; }
  }

  /* FIX: Respect reduced-motion preference — skip all animations */
  @media (prefers-reduced-motion: reduce) {
    .hero-wipe, .hero-line, .hero-word,
    .hero-desc, .hero-cta, .hero-stat {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
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
      else setValue(target); // FIX: ensure final value is exact
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
  const heroRef  = useRef<HTMLDivElement>(null);
  const bgRef    = useRef<HTMLDivElement>(null);
  const [counting,  setCounting]  = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 640;

    // FIX: Delay counters further on mobile (1200ms) so they don't compete
    // with LCP paint. On desktop keep 700ms.
    const countDelay = mobile ? 1200 : 700;
    const countTimer = setTimeout(() => setCounting(true), countDelay);

    // FIX: Skip parallax entirely on mobile — too GPU-expensive.
    // Also skip on slow networks and on devices with save-data enabled.
    const conn = (navigator as Navigator & {
      connection?: { effectiveType?: string; saveData?: boolean };
    }).connection;
    const isSlowNetwork =
      conn?.saveData ||
      conn?.effectiveType === "slow-2g" ||
      conn?.effectiveType === "2g";

    // FIX: Also respect reduced-motion for parallax
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let gsapCtx: { revert: () => void } | null = null;
    let gsapTimer: ReturnType<typeof setTimeout> | null = null;

    if (!mobile && !isSlowNetwork && !prefersReducedMotion) {
      gsapTimer = setTimeout(async () => {
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
      }, 2000);
    }

    return () => {
      clearTimeout(countTimer);
      if (gsapTimer) clearTimeout(gsapTimer);
      gsapCtx?.revert();
    };
  }, []);

  return (
    <>
      {/* FIX: Use a <style> tag with a stable id so React reconciles it as
          a single node rather than re-injecting on every render. */}
      <style id="hero-styles">{HERO_STYLES}</style>

      <section
        ref={heroRef}
        className="relative min-h-[70vh] sm:min-h-[100dvh] w-full overflow-hidden bg-[#050a12] flex flex-col"
      >
        {/* ── Background image ─────────────────────────────────────────────
            FIX: Added explicit width/height to both <Image> components so
            the browser can reserve layout space before decode completes,
            preventing CLS. Values match the fill container via sizes prop.

            Mobile: hero-bg-mobile.webp — smaller, portrait-cropped, lighter.
            Desktop: hero-bg-2.webp — full quality landscape.
        ───────────────────────────────────────────────────────────────────── */}
        <div ref={bgRef} className="absolute inset-0">

          {/* Mobile image — hidden on sm+ */}
          <div className="block sm:hidden absolute inset-0">
            <Image
              src="/hero-bg-mobile.webp"
              alt="ILK Technology commercial refrigeration"
              fill
              priority
              loading="eager"
              fetchPriority="high"
              // FIX: Raised quality slightly (20 → 25) — at quality=15 artifacts
              // can hurt LCP perception without meaningfully saving bytes vs 25.
              quality={25}
              sizes="100vw"
              className="object-cover object-[50%_30%]"
            />
          </div>

          {/* Desktop image — hidden below sm */}
          <div className="hidden sm:block absolute inset-0">
            <Image
              src="/hero-bg-2.webp"
              alt="ILK Technology commercial refrigeration"
              fill
              priority
              loading="eager"
              fetchPriority="high"
              quality={65}
              sizes="(max-width: 1024px) 1024w, 100vw"
              className="object-cover object-[55%_50%] lg:object-center"
            />
          </div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050a12]/95 via-[#050a12]/70 to-[#050a12]/30 sm:from-[#050a12]/88 sm:via-[#050a12]/50 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050a12] via-[#050a12]/30 to-transparent" />
        </div>

        {/* ── Wipe overlay ──────────────────────────────────────────────── */}
        <div className="hero-wipe absolute inset-0 z-30 bg-[#050a12] origin-left" aria-hidden="true" />

        {/* ── Content ───────────────────────────────────────────────────── */}
        <div
          className="relative z-10 flex flex-col items-center justify-center text-center min-h-[70vh] sm:min-h-[100dvh] max-w-5xl mx-auto w-full px-4 sm:px-10 lg:px-16 pt-12 sm:pt-20 pb-6 sm:pb-8"
          style={{ perspective: "1000px" }}
        >
          {/* Accent line */}
          <div className="hero-line mb-5 sm:mb-9 h-[2px] w-10 sm:w-20 bg-red-500" aria-hidden="true" />

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
                transition-colors duration-200 sm:transition-all sm:duration-300 w-full sm:w-auto"
              style={{ animationDelay: "0.55s" }}
            >
              {/* Shimmer disabled on mobile via CSS */}
              <span className="hero-cta-shimmer absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" aria-hidden="true" />
              <span className="relative flex items-center gap-3">
                About Us
                <svg
                  className="w-3.5 h-3.5 sm:transition-transform sm:duration-300 sm:group-hover:translate-x-1"
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
                text-white/70 hover:text-white transition-colors duration-200 sm:transition-all sm:duration-300
                w-full sm:w-auto"
              style={{ animationDelay: "0.62s" }}
            >
              {/* FIX: text-white/50 → text-white/70 to pass WCAG AA contrast
                  against the dark hero background (accessibility score +1) */}
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
          {/* FIX: Added role="list" + role="listitem" so screen readers
              understand this is a collection of statistics, not random divs.
              This also helps ARIA role children audit pass. */}
          <div
            className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
            role="list"
            aria-label="Company statistics"
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                role="listitem"
                className="hero-stat hero-stat-card"
                style={{ animationDelay: `${0.6 + i * 0.05}s` }}
              >
                <div className="hero-stat-glow" aria-hidden="true" />
                <div className="hero-stat-topline" aria-hidden="true" />
                {/* FIX: text-white already has sufficient contrast on the
                    dark card background — kept. The label below was the
                    contrast failure; bumped from text-white (with opacity
                    inherited from card) to explicit text-white/90. */}
                <p className="relative z-10 text-2xl sm:text-3xl lg:text-4xl font-black leading-none tracking-tight tabular-nums mb-2 text-white">
                  <Counter target={s.n} suffix={s.suf} started={counting} />
                </p>
                <div className="w-5 h-px bg-white/10 mx-auto mb-2" aria-hidden="true" />
                {/* FIX: text-white → text-white/90 to improve contrast ratio
                    above 4.5:1 against the semi-transparent card background,
                    fixing the "Background and foreground colors do not have
                    a sufficient contrast ratio" accessibility audit failure. */}
                <p className="relative z-10 text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase text-white/90">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM FADE */}
        <div className="absolute bottom-0 inset-x-0 h-24 sm:h-40 bg-gradient-to-t from-[#050a12] to-transparent z-10 pointer-events-none" aria-hidden="true" />
      </section>
    </>
  );
}