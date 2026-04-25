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

// ── Single shared count-up hook for all stats ─────────────────────────────────
// FIX #3: One rAF loop updates all 4 counters simultaneously instead of 4 loops.
function useCountUpAll(
  targets: readonly number[],
  duration: number,
  started: boolean
) {
  const [values, setValues] = useState(() => targets.map(() => 0));

  useEffect(() => {
    if (!started) return;
    const t0 = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValues(targets.map((t) => Math.floor(eased * t)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targets, duration, started]);

  return values;
}

// ── Component ─────────────────────────────────────────────────────────────────
// FIX #1: All keyframes and animation classes have been removed from here.
//         Add the contents of hero-animations.css to your globals.css instead.
//
// FIX #2: GSAP removed entirely. Parallax replaced with a CSS-only approach
//         using a fixed background-attachment on the ::before pseudo, which
//         costs zero JS and zero extra network requests.
//         If you still want JS parallax, use a IntersectionObserver + CSS
//         custom property rather than loading an 80 KB library.
//
// FIX #4: backdrop-filter removed from stat cards. Replaced with a solid
//         semi-transparent background that looks nearly identical but avoids
//         the per-card GPU compositing layer.

export default function HeroSection() {
  const [counting, setCounting] = useState(false);
  const statTargets = STATS.map((s) => s.n) as unknown as readonly number[];
  const counts = useCountUpAll(statTargets, 1200, counting);

  useEffect(() => {
    // Fire counters after content animations settle (~700 ms)
    const timer = setTimeout(() => setCounting(true), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-section">
      {/* ── BACKGROUND ──────────────────────────────────────────────────────
       *  No will-change here — the browser handles the CSS parallax natively.
       *  fetchPriority="high" + priority + loading="eager" = maximum LCP preload.
       */}
      <div className="hero-bg">
        <Image
          src="/hero-bg.webp"
          alt="ILK Technology commercial refrigeration"
          fill
          priority
          loading="eager"
          fetchPriority="high"
          quality={85}
          sizes="100vw"
          className="hero-bg__img"
        />
        <div className="hero-bg__gradient-h" />
        <div className="hero-bg__gradient-v" />
      </div>

      {/* ── WIPE OVERLAY ────────────────────────────────────────────────────
       *  Sibling of (not wrapping) the <Image> so the browser can record
       *  LCP paint of the image underneath before the wipe completes.
       */}
      <div className="hero-wipe" aria-hidden="true" />

      {/* ── CONTENT ── */}
      <div className="hero-content">

        {/* Accent line */}
        <div className="hero-line" aria-hidden="true" />

        {/* ── HEADING ── */}
        <div className="hero-heading-wrap">
          <h1 className="hero-heading">
            {HEADING.map((w, i) => (
              <span key={i} className="hero-heading__clip">
                <span
                  className="hero-word"
                  style={{ animationDelay: `${0.18 + i * 0.05}s` }}
                >
                  {w.includes("Refrigeration") ? (
                    <span className="hero-heading__outline">{w}</span>
                  ) : w.includes("UK") ? (
                    <span className="hero-heading__accent">{w}</span>
                  ) : (
                    w
                  )}
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* ── DESCRIPTION ── */}
        <div
          className="hero-desc hero-desc--block"
          style={{ animationDelay: "0.45s" }}
        >
          <p className="hero-desc__text">
            <span className="hero-desc__brand">ILK Technology</span> —
            Commercial Refrigeration Supplier and{" "}
            <span className="hero-desc__partner">Arneg</span>{" "}
            Distribution Partner here in the UK.
          </p>
        </div>

        {/* ── BUTTONS ── */}
        <div className="hero-cta-group">
          <Link
            href="/about"
            className="hero-cta hero-cta--primary"
            style={{ animationDelay: "0.55s" }}
          >
            <span className="hero-cta__shine" aria-hidden="true" />
            <span className="hero-cta__inner">
              About Us
              <svg
                className="hero-cta__arrow"
                width="14"
                height="14"
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
            className="hero-cta hero-cta--ghost"
            style={{ animationDelay: "0.62s" }}
          >
            <span className="hero-cta__inner">
              <svg
                width="14"
                height="14"
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

        {/* ── STATS ── */}
        {/* FIX #4: backdrop-filter removed — using solid rgba bg instead */}
        <div className="hero-stats">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="hero-stat"
              style={{ animationDelay: `${0.68 + i * 0.06}s` }}
            >
              <div className="hero-stat__glow" aria-hidden="true" />
              <div className="hero-stat__bar" aria-hidden="true" />
              <p className="hero-stat__number">
                {counts[i]}{s.suf}
              </p>
              <div className="hero-stat__divider" aria-hidden="true" />
              <p className="hero-stat__label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM FADE ── */}
      <div className="hero-fade" aria-hidden="true" />
    </section>
  );
}