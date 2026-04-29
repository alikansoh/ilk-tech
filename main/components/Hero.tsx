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
// FIX 1: backdrop-filter only declared inside an sm media query so the
//         property never hits the GPU on mobile at all — not just skipped
//         at runtime, but absent from the style cascade entirely.
// FIX 3: perspective removed from inline style; applied only on sm+ via CSS
//         so mobile never creates a compositing layer for the content div.
// FIX 4: WebkitTextStroke moved behind @media (min-width:640px) in CSS so
//         the paint cost is skipped on mobile entirely.
// FIX 5: box-shadow declarations scoped to sm+ so mobile never parses them.
// FIX 6: hero-stat and hero-word animations gated behind sm media query —
//         mobile gets opacity:1 / transform:none from the start, zero
//         compositing layers triggered.
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

  /* Mobile wipe: fast, no delay */
  .hero-wipe {
    transform-origin: left center;
    animation: hero-wipe 0.3s cubic-bezier(0.87,0,0.13,1) 0s forwards;
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

  /* FIX 6: hero-word — mobile: no animation, already visible */
  .hero-word {
    display: inline-block;
  }
  @media (min-width: 640px) {
    .hero-word {
      opacity: 0;
      animation: hero-word 0.48s cubic-bezier(0.16,1,0.3,1) both;
    }
  }

  /* FIX 6: hero-desc / hero-cta — skip fade-up on mobile */
  .hero-desc { }
  .hero-cta  { }
  @media (min-width: 640px) {
    .hero-desc {
      opacity: 0;
      animation: hero-fade-up 0.42s ease-out both;
    }
    .hero-cta {
      opacity: 0;
      animation: hero-fade-up 0.38s ease-out both;
    }
  }

  /* FIX 6: hero-stat — mobile: no animation, no compositing layer */
  .hero-stat { }
  @media (min-width: 640px) {
    .hero-stat {
      animation: hero-fade-up 0.38s ease-out both;
    }
  }

  .hero-stat-card {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    text-align: center;
    min-height: 90px;
    padding: 1.25rem 0.75rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    /* FIX 1: backdrop-filter ONLY on sm+ — never parsed on mobile */
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

  /* FIX 4: WebkitTextStroke — mobile gets plain white, no paint cost */
  .hero-outline-word {
    color: transparent;
  }
  @media (min-width: 640px) {
    .hero-outline-word {
      -webkit-text-stroke: 2.5px rgba(255,255,255,0.5);
    }
  }

  /* FIX 3: perspective only on sm+ — no compositing layer on mobile */
  .hero-content-perspective { }
  @media (min-width: 640px) {
    .hero-content-perspective {
      perspective: 1000px;
    }
  }

  /* Shimmer — disabled on mobile */
  @media (max-width: 639px) {
    .hero-cta-shimmer { display: none; }
  }

  /* FIX 5: box-shadow on CTA only on sm+ */
  .hero-cta-primary {
    /* no shadow on mobile */
  }
  @media (min-width: 640px) {
    .hero-cta-primary {
      box-shadow: 0 0 32px rgba(239,68,68,0.2);
    }
    .hero-cta-primary:hover {
      box-shadow: 0 0 48px rgba(239,68,68,0.35);
    }
  }

  /* Reduced-motion: kill everything */
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
      else setValue(target);
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
    const mobile = window.innerWidth < 640;

    // FIX 7: On mobile, defer counter start to after first paint settles.
    // requestIdleCallback fires when the browser has idle time post-LCP,
    // completely decoupling JS counter work from paint. Falls back to a
    // generous setTimeout on browsers that don't support rIC.
    let countHandle: number | ReturnType<typeof setTimeout>;
    if (mobile) {
      if ("requestIdleCallback" in window) {
        countHandle = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
          .requestIdleCallback(() => setCounting(true), { timeout: 2500 });
      } else {
        countHandle = setTimeout(() => setCounting(true), 1800);
      }
    } else {
      countHandle = setTimeout(() => setCounting(true), 700);
    }

    // FIX 2: GSAP dynamic import is now fully skipped on mobile — the
    // import() call itself is never issued, so the JS module is never
    // fetched, parsed, or executed on mobile devices.
    const conn = (navigator as Navigator & {
      connection?: { effectiveType?: string; saveData?: boolean };
    }).connection;
    const isSlowNetwork =
      conn?.saveData ||
      conn?.effectiveType === "slow-2g" ||
      conn?.effectiveType === "2g";

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let gsapCtx: { revert: () => void } | null = null;
    let gsapTimer: ReturnType<typeof setTimeout> | null = null;

    // FIX 2: `!mobile` guard is now the first check — short-circuits before
    // any further evaluation, ensuring zero GSAP work on mobile.
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
      if (mobile && "cancelIdleCallback" in window) {
        (window as Window & { cancelIdleCallback: (id: number) => void })
          .cancelIdleCallback(countHandle as number);
      } else {
        clearTimeout(countHandle as ReturnType<typeof setTimeout>);
      }
      if (gsapTimer) clearTimeout(gsapTimer);
      gsapCtx?.revert();
    };
  }, []);

  return (
    <>
      <style id="hero-styles">{HERO_STYLES}</style>

      <section
        ref={heroRef}
        className="relative min-h-[70vh] sm:min-h-[100dvh] w-full overflow-hidden bg-[#050a12] flex flex-col"
      >
        {/* Background image */}
        <div ref={bgRef} className="absolute inset-0">
          <div className="block sm:hidden absolute inset-0">
            <Image
              src="/hero-bg-mobile.webp"
              alt="ILK Technology commercial refrigeration"
              fill
              priority
              loading="eager"
              fetchPriority="high"
              quality={25}
              sizes="100vw"
              className="object-cover object-[50%_30%]"
            />
          </div>

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

          <div className="absolute inset-0 bg-gradient-to-r from-[#050a12]/95 via-[#050a12]/70 to-[#050a12]/30 sm:from-[#050a12]/88 sm:via-[#050a12]/50 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050a12] via-[#050a12]/30 to-transparent" />
        </div>

        {/* Wipe overlay */}
        <div className="hero-wipe absolute inset-0 z-30 bg-[#050a12] origin-left" aria-hidden="true" />

        {/* Content */}
        {/* FIX 3: perspective class applied via CSS, sm+ only */}
        <div
          className="hero-content-perspective relative z-10 flex flex-col items-center justify-center text-center min-h-[70vh] sm:min-h-[100dvh] max-w-5xl mx-auto w-full px-4 sm:px-10 lg:px-16 pt-12 sm:pt-20 pb-6 sm:pb-8"
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
                      // FIX 4: outline-word class handles WebkitTextStroke
                      // at sm+ only via CSS; mobile gets plain white text
                      <span className="hero-outline-word">
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
              // FIX 5: shadow classes removed; handled via .hero-cta-primary CSS (sm+ only)
              className="hero-cta hero-cta-primary group relative inline-flex items-center justify-center gap-3
                bg-red-500 hover:bg-red-400 active:bg-red-600 overflow-hidden
                px-6 py-3 sm:px-9 sm:py-4 text-[11px] sm:text-[12px] font-black tracking-[0.25em] uppercase text-white
                transition-colors duration-200 sm:transition-all sm:duration-300 w-full sm:w-auto"
              style={{ animationDelay: "0.55s" }}
            >
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
                <p className="relative z-10 text-2xl sm:text-3xl lg:text-4xl font-black leading-none tracking-tight tabular-nums mb-2 text-white">
                  <Counter target={s.n} suffix={s.suf} started={counting} />
                </p>
                <div className="w-5 h-px bg-white/10 mx-auto mb-2" aria-hidden="true" />
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