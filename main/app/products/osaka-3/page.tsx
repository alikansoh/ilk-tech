"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  Thermometer,
  Snowflake,
  Lightbulb,
  DoorOpen,
  MonitorDot,
  ArrowDownToLine,
  LayoutList,
  Gauge,
  Wind,
  Layers,
} from "lucide-react";

/* ─────────────────────────────────────────────
   TOKENS
───────────────────────────────────────────── */
const T = {
  anthracite:  "#2B2D2F",
  anthracite2: "#1C1E20",
  anthracite3: "#3A3C3E",
  red:         "#C8102E",
  red2:        "#A10A22",
  white:       "#FFFFFF",
  off:         "#F2F1EE",
  muted:       "rgba(255,255,255,0.45)",
  mutedDark:   "rgba(255,255,255,0.2)",
  border:      "rgba(255,255,255,0.08)",
  borderLight: "rgba(255,255,255,0.14)",
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const product = {
  name:     "Osaka 3",
  range:    "Remote Multideck",
  colour:   "Anthracite Grey",
  colourHex:"#2B2D2F",
  image:    "/pro3.png",
  cataloguePdf: "/catalogues/osaka3.pdf",
  sizes:    ["1250mm", "1875mm", "2500mm", "3750mm"],
  dimensions: { Height: "203 cm", Depth: "75 cm" },
  subtitle: "The Osaka 3 in Anthracite Grey brings industrial confidence to the chilled aisle — EC fan efficiency, mirrored end walls, and precision temperature control in one authoritative package.",
  specs: [
    { label: "Temperature",    value: "+1 to +4 °C",        note: "Chilled range",      icon: "temp"     },
    { label: "Cooling",        value: "Remote",              note: "External condenser", icon: "cool"     },
    { label: "Lighting",       value: "LED canopy",          note: "Low energy",         icon: "light"    },
    { label: "Doors",          value: "Hinged dual-glass",   note: "Double-glazed",      icon: "door"     },
    { label: "Controller",     value: "Electronic",          note: "Smart control",      icon: "ctrl"     },
    { label: "Pipework",       value: "Top entry",           note: "Clean install",      icon: "pipe"     },
    { label: "Shelving",       value: "Base + 5 × 450 mm + EPOS", note: "Adj. levels",  icon: "shelf"    },
    { label: "EC Fans",        value: "Low-energy",          note: "Optimised airflow",  icon: "fan"      },
    { label: "End Walls",      value: "Solid or Mirrored",   note: "Your choice",        icon: "end"      },
    { label: "Solenoid Valve", value: "Not included",        note: "Simplified system",  icon: "valve"    },
  ],
  features: [
    { num: "01", title: "EC Fan Technology",       desc: "Low-energy electronically commutated fans deliver optimised airflow with substantially reduced running costs — an upgrade over standard AC motors." },
    { num: "02", title: "Anthracite Grey Finish",  desc: "The deep anthracite powder coat commands attention on the shop floor. Paired with mirrored end walls, it creates a premium retail environment." },
    { num: "03", title: "Dual-Glass Doors",        desc: "Hinged double-glazed doors minimise energy loss while keeping every product fully visible, uncompromised from every angle." },
    { num: "04", title: "Flexible Configuration",  desc: "Choice of solid or mirrored end walls, five adjustable 450 mm shelves, and EPOS rail — configure precisely for your range and space." },
  ],
};

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300;1,9..40,400&display=swap');

  .o3 *, .o3 *::before, .o3 *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .o3 {
    font-family: 'DM Sans', system-ui, sans-serif;
    background: ${T.anthracite2};
    color: ${T.white};
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── NOISE OVERLAY ── */
  .o3::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.028;
    background-size: 180px 180px;
  }

  /* ── TOPBAR ── */
  .o3-topbar {
    position: relative;
    z-index: 100;
    height: 60px;
    padding: 0 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${T.border};
    background: rgba(28,30,32,0.92);
    backdrop-filter: blur(12px);
  }
  .o3-topbar-brand {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 0.12em;
    color: ${T.white};
  }
  .o3-topbar-tag {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${T.muted};
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .o3-topbar-tag::before {
    content: "";
    width: 24px; height: 1px;
    background: ${T.red};
  }

  /* ── HERO ── */
  .o3-hero {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: calc(100vh - 60px);
  }

  /* Image panel */
  .o3-hero-img {
    position: relative;
    overflow: hidden;
    background: ${T.anthracite3};
  }
  .o3-hero-img::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 55%, ${T.anthracite2} 100%);
    z-index: 2;
    pointer-events: none;
  }
  /* Red top accent line */
  .o3-hero-img::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: ${T.red};
    z-index: 10;
  }
  .o3-hero-img-inner {
    position: absolute;
    inset: 0;
    z-index: 1;
  }
  .o3-hero-img-inner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }

  /* Floating colour badge */
  .o3-colour-badge {
    position: absolute;
    bottom: 40px;
    left: 40px;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(28,30,32,0.82);
    backdrop-filter: blur(10px);
    border: 1px solid ${T.borderLight};
    border-radius: 40px;
    padding: 10px 20px 10px 12px;
  }
  .o3-colour-swatch {
    width: 20px; height: 20px;
    border-radius: 50%;
    background: ${T.anthracite};
    border: 1.5px solid rgba(255,255,255,0.2);
    flex-shrink: 0;
  }
  .o3-colour-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${T.white};
  }

  /* Text panel */
  .o3-hero-txt {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 72px 80px 64px;
    position: relative;
    z-index: 1;
  }

  .o3-eyebrow {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${T.red};
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
    opacity: 0;
  }
  .o3-eyebrow::before {
    content: "";
    width: 28px; height: 1.5px;
    background: ${T.red};
    flex-shrink: 0;
  }

  /* Giant headline using Bebas */
  .o3-h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(110px, 13vw, 170px);
    line-height: 0.85;
    color: ${T.white};
    letter-spacing: 0.01em;
    margin-bottom: 0;
    opacity: 0;
  }
  .o3-h1-accent {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(110px, 13vw, 170px);
    line-height: 0.85;
    color: transparent;
    -webkit-text-stroke: 1.5px ${T.red};
    letter-spacing: 0.01em;
    margin-bottom: 40px;
    opacity: 0;
  }

  .o3-rule {
    width: 48px; height: 1px;
    background: rgba(255,255,255,0.15);
    margin-bottom: 36px;
    opacity: 0;
  }

  .o3-tagline {
    font-size: clamp(15px, 1.8vw, 18px);
    font-weight: 300;
    color: rgba(255,255,255,0.72);
    line-height: 1.65;
    max-width: 500px;
    margin-bottom: 52px;
    opacity: 0;
  }

  .o3-dims {
    display: flex;
    gap: 0;
    margin-bottom: 52px;
    border: 1px solid ${T.borderLight};
    border-radius: 8px;
    overflow: hidden;
    max-width: 280px;
    opacity: 0;
  }
  .o3-dim {
    flex: 1;
    padding: 18px 24px;
    border-right: 1px solid ${T.border};
    background: rgba(255,255,255,0.03);
  }
  .o3-dim:last-child { border-right: none; }
  .o3-dim-k {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${T.red};
    margin-bottom: 6px;
  }
  .o3-dim-v {
    font-size: 26px;
    font-weight: 600;
    color: ${T.white};
    line-height: 1;
    letter-spacing: -0.01em;
  }

  .o3-hero-actions {
    display: flex;
    align-items: center;
    gap: 20px;
    opacity: 0;
  }
  .o3-btn-primary {
    padding: 15px 30px;
    background: ${T.red};
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 3px;
    border: none;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: background 0.22s, transform 0.18s;
    font-family: 'DM Sans', sans-serif;
  }
  .o3-btn-primary:hover {
    background: ${T.red2};
    transform: translateY(-1px);
  }
  .o3-btn-ghost {
    padding: 14px 28px;
    background: transparent;
    color: rgba(255,255,255,0.7);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 3px;
    border: 1px solid ${T.borderLight};
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.22s;
    font-family: 'DM Sans', sans-serif;
  }
  .o3-btn-ghost:hover {
    background: rgba(255,255,255,0.06);
    color: ${T.white};
    border-color: rgba(255,255,255,0.28);
  }

  /* ── TICKER STRIP ── */
  .o3-ticker-wrap {
    position: relative;
    z-index: 1;
    overflow: hidden;
    border-top: 1px solid ${T.border};
    border-bottom: 1px solid ${T.border};
    background: ${T.red};
    padding: 12px 0;
  }
  .o3-ticker-track {
    display: flex;
    gap: 0;
    width: max-content;
    animation: o3-ticker 22s linear infinite;
    will-change: transform;
  }
  .o3-ticker-item {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 13px;
    letter-spacing: 0.2em;
    color: rgba(255,255,255,0.9);
    padding: 0 32px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 32px;
  }
  .o3-ticker-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: rgba(255,255,255,0.5);
    flex-shrink: 0;
  }
  @keyframes o3-ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* ── BODY ── */
  .o3-body {
    position: relative;
    z-index: 1;
  }
  .o3-body-inner {
    max-width: 1360px;
    margin: 0 auto;
    padding: 110px 64px 130px;
    display: grid;
    grid-template-columns: 1fr 1.45fr;
    gap: 100px;
    align-items: start;
  }

  /* ── SIZES ── */
  .o3-section-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${T.red};
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .o3-section-label::before {
    content: "";
    width: 18px; height: 1.5px;
    background: ${T.red};
    flex-shrink: 0;
  }
  .o3-sizes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 52px;
  }
  .o3-size-btn {
    padding: 16px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: rgba(255,255,255,0.7);
    background: rgba(255,255,255,0.04);
    border: 1px solid ${T.border};
    border-radius: 5px;
    text-align: center;
    transition: all 0.2s;
    cursor: default;
    font-family: 'DM Sans', sans-serif;
  }
  .o3-size-btn:hover {
    background: rgba(255,255,255,0.07);
    border-color: ${T.borderLight};
    color: ${T.white};
  }

  /* ── SPEC CARDS ── */
  .o3-specs-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .o3-specs-count {
    font-size: 10px;
    font-weight: 700;
    color: ${T.red};
    background: rgba(200,16,46,0.12);
    border: 1px solid rgba(200,16,46,0.2);
    border-radius: 20px;
    padding: 4px 12px;
    letter-spacing: 0.08em;
  }
  .o3-specs-grid {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .o3-spec-card {
    display: flex;
    align-items: center;
    gap: 14px;
    background: rgba(255,255,255,0.03);
    border: 1px solid ${T.border};
    border-radius: 8px;
    padding: 13px 16px;
    transition: background 0.2s, border-color 0.2s, transform 0.2s;
    position: relative;
    overflow: hidden;
    cursor: default;
  }
  .o3-spec-card::before {
    content: "";
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: ${T.red};
    opacity: 0;
    transition: opacity 0.2s;
  }
  .o3-spec-card:hover {
    background: rgba(255,255,255,0.055);
    border-color: rgba(255,255,255,0.14);
    transform: translateX(3px);
  }
  .o3-spec-card:hover::before { opacity: 1; }

  .o3-spec-icon {
    width: 38px; height: 38px;
    border-radius: 8px;
    background: rgba(200,16,46,0.1);
    border: 1px solid rgba(200,16,46,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .o3-spec-body { flex: 1; min-width: 0; }
  .o3-spec-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 3px;
  }
  .o3-spec-value {
    font-size: 13px;
    font-weight: 600;
    color: ${T.white};
    letter-spacing: -0.01em;
  }
  .o3-spec-note {
    font-size: 10px;
    font-weight: 500;
    color: rgba(255,255,255,0.28);
    letter-spacing: 0.06em;
    text-align: right;
    flex-shrink: 0;
    white-space: nowrap;
  }

  /* ── RIGHT COLUMN ── */
  .o3-h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(58px, 6.5vw, 88px);
    line-height: 0.88;
    color: ${T.white};
    margin-bottom: 32px;
    letter-spacing: 0.01em;
  }
  .o3-h2 span {
    color: transparent;
    -webkit-text-stroke: 1.5px ${T.red};
  }

  .o3-right-sub {
    font-size: clamp(15px, 1.7vw, 17px);
    font-weight: 300;
    color: rgba(255,255,255,0.6);
    line-height: 1.7;
    max-width: 580px;
    margin-bottom: 60px;
  }

  /* Features */
  .o3-feats { margin-bottom: 68px; }
  .o3-feat {
    display: grid;
    grid-template-columns: 44px 1fr;
    gap: 24px;
    padding: 28px 0;
    border-bottom: 1px solid ${T.border};
    align-items: start;
    transition: background 0.2s;
    position: relative;
    overflow: hidden;
  }
  .o3-feat:first-child { border-top: 1px solid ${T.border}; }
  .o3-feat::before {
    content: "";
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: rgba(200,16,46,0.04);
    transition: left 0.4s ease;
    pointer-events: none;
  }
  .o3-feat:hover::before { left: 0; }

  .o3-feat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    color: ${T.red};
    line-height: 1;
    padding-top: 2px;
    opacity: 0.7;
  }
  .o3-feat-title {
    font-size: 14px;
    font-weight: 700;
    color: ${T.white};
    margin-bottom: 7px;
    letter-spacing: -0.01em;
  }
  .o3-feat-desc {
    font-size: 13px;
    font-weight: 300;
    color: rgba(255,255,255,0.5);
    line-height: 1.65;
  }

  /* CTA card */
  .o3-cta {
    border: 1px solid ${T.borderLight};
    border-radius: 8px;
    padding: 44px;
    background: rgba(255,255,255,0.03);
    position: relative;
    overflow: hidden;
  }
  .o3-cta::before {
    content: "";
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 3px;
    background: ${T.red};
  }
  .o3-cta-overline {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${T.red};
    margin-bottom: 16px;
  }
  .o3-cta-heading {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 38px;
    color: ${T.white};
    line-height: 1.1;
    margin-bottom: 12px;
    letter-spacing: 0.03em;
  }
  .o3-cta-sub {
    font-size: 13px;
    font-weight: 300;
    color: rgba(255,255,255,0.5);
    line-height: 1.7;
    margin-bottom: 30px;
    max-width: 380px;
  }
  .o3-cta-actions {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  .o3-cta-link {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: color 0.2s;
    border-bottom: 1px solid transparent;
  }
  .o3-cta-link:hover {
    color: rgba(255,255,255,0.75);
    border-color: rgba(255,255,255,0.2);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 1000px) {
    .o3-hero { grid-template-columns: 1fr; }
    .o3-hero-img { height: 55vw; min-height: 320px; }
    .o3-hero-txt { padding: 52px 32px; }
    .o3-topbar { padding: 0 24px; }
    .o3-body-inner {
      grid-template-columns: 1fr;
      gap: 60px;
      padding: 72px 28px 80px;
    }
    .o3-h1, .o3-h1-accent { font-size: clamp(80px, 18vw, 130px); }
  }
`;

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
const ICON_P = { size: 17, strokeWidth: 1.5, color: T.red, "aria-hidden": true } as const;
const ICONS: Record<string, React.ReactNode> = {
  temp:  <Thermometer     {...ICON_P} />,
  cool:  <Snowflake       {...ICON_P} />,
  light: <Lightbulb       {...ICON_P} />,
  door:  <DoorOpen        {...ICON_P} />,
  ctrl:  <MonitorDot      {...ICON_P} />,
  pipe:  <ArrowDownToLine  {...ICON_P} />,
  shelf: <LayoutList      {...ICON_P} />,
  fan:   <Wind            {...ICON_P} />,
  end:   <Layers          {...ICON_P} />,
  valve: <Gauge           {...ICON_P} />,
};

/* ─────────────────────────────────────────────
   TICKER items (doubled for seamless loop)
───────────────────────────────────────────── */
const TICKER_ITEMS = [
  "Anthracite Grey",
  "Remote Cooling",
  "EC Fan Technology",
  "Dual Glass Doors",
  "+1 to +4 °C",
  "Fast UK Delivery",
  "Professional Installation",
  "5 Shelf Levels",
  "LED Canopy",
  "Mirrored End Walls",
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function Osaka3Page() {
  const heroRef   = useRef<HTMLDivElement>(null);
  const bodyRef   = useRef<HTMLElement>(null);
  const gsapLoaded = useRef(false);

  useEffect(() => {
    if (gsapLoaded.current) return;
    gsapLoaded.current = true;

    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // ── Hero stagger entrance ──
      const hero = heroRef.current;
      if (!hero) return;

      const eyebrow   = hero.querySelector(".o3-eyebrow");
      const h1        = hero.querySelector(".o3-h1");
      const h1accent  = hero.querySelector(".o3-h1-accent");
      const rule      = hero.querySelector(".o3-rule");
      const tagline   = hero.querySelector(".o3-tagline");
      const dims      = hero.querySelector(".o3-dims");
      const actions   = hero.querySelector(".o3-hero-actions");
      const imgInner  = hero.querySelector(".o3-hero-img-inner");
      const badge     = hero.querySelector(".o3-colour-badge");

      // Image: zoom in from slightly large
      gsap.fromTo(imgInner,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out" }
      );

      // Badge slide up
      gsap.fromTo(badge,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 1.1 }
      );

      // Text stagger
      gsap.fromTo(
        [eyebrow, h1, h1accent, rule, tagline, dims, actions],
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.75,
          stagger: 0.09,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // ── Spec cards: scroll-triggered stagger ──
      const specCards = document.querySelectorAll(".o3-spec-card");
      gsap.fromTo(specCards,
        { x: -24, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.55,
          stagger: 0.055,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".o3-specs-grid",
            start: "top 82%",
          },
        }
      );

      // ── Size buttons pop ──
      const sizeBtns = document.querySelectorAll(".o3-size-btn");
      gsap.fromTo(sizeBtns,
        { scale: 0.88, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 0.45,
          stagger: 0.07,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".o3-sizes",
            start: "top 85%",
          },
        }
      );

      // ── Feature rows slide in ──
      const feats = document.querySelectorAll(".o3-feat");
      gsap.fromTo(feats,
        { x: 30, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".o3-feats",
            start: "top 80%",
          },
        }
      );

      // ── Heading counter/reveal on right column ──
      const h2 = document.querySelector(".o3-h2");
      gsap.fromTo(h2,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".o3-h2",
            start: "top 85%",
          },
        }
      );

      // ── CTA card: fade + slight scale ──
      const cta = document.querySelector(".o3-cta");
      gsap.fromTo(cta,
        { y: 30, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".o3-cta",
            start: "top 85%",
          },
        }
      );

      // ── Dims counter animation ──
      // (purely visual pulse on the dimension values)
      const dimVals = document.querySelectorAll(".o3-dim-v");
      gsap.fromTo(dimVals,
        { opacity: 0, y: 12 },
        {
          opacity: 1, y: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "power2.out",
          delay: 1.2,
        }
      );
    };

    load();
  }, []);

  return (
    <div className="o3">
      <style>{css}</style>

      {/* TOPBAR */}
      <header className="o3-topbar">
        <span className="o3-topbar-brand">ILK Technology</span>
        <span className="o3-topbar-tag">{product.range}</span>
      </header>

      {/* HERO */}
      <section className="o3-hero" ref={heroRef}>
        {/* Image */}
        <div className="o3-hero-img">
          <div className="o3-hero-img-inner">
            <Image
              src={product.image}
              alt={product.name}
              fill
              quality={95}
              style={{ objectFit: "cover", objectPosition: "center top" }}
              sizes="50vw"
            />
          </div>
          <div className="o3-colour-badge">
            <div className="o3-colour-swatch" />
            <span className="o3-colour-label">{product.colour}</span>
          </div>
        </div>

        {/* Text */}
        <div className="o3-hero-txt">
          <span className="o3-eyebrow">{product.range}</span>

          <div className="o3-h1">OSAKA</div>
          <div className="o3-h1-accent">3.</div>

          <div className="o3-rule" />
          <p className="o3-tagline">{product.subtitle}</p>

          <div className="o3-dims">
            {Object.entries(product.dimensions).map(([k, v]) => (
              <div key={k} className="o3-dim">
                <div className="o3-dim-k">{k}</div>
                <div className="o3-dim-v">{v}</div>
              </div>
            ))}
          </div>

          <div className="o3-hero-actions">
            <a
              href={`mailto:sales@ilktechnology.com?subject=Quote%20—%20${encodeURIComponent(product.name)}`}
              className="o3-btn-primary"
            >
              Request a Quote
            </a>
            <a
              href={product.cataloguePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="o3-btn-ghost"
            >
              Download Catalogue
            </a>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="o3-ticker-wrap" aria-hidden>
        <div className="o3-ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="o3-ticker-item">
              {item}
              <span className="o3-ticker-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* BODY */}
      <section className="o3-body" ref={bodyRef}>
        <div className="o3-body-inner">

          {/* LEFT */}
          <div>
            <p className="o3-section-label">Available Widths</p>
            <div className="o3-sizes">
              {product.sizes.map(s => (
                <div key={s} className="o3-size-btn">{s}</div>
              ))}
            </div>

            <div>
              <div className="o3-specs-header">
                <span className="o3-section-label" style={{ margin: 0 }}>Specifications</span>
                <span className="o3-specs-count">{product.specs.length} points</span>
              </div>
              <div className="o3-specs-grid">
                {product.specs.map(s => (
                  <div key={s.label} className="o3-spec-card">
                    <div className="o3-spec-icon">{ICONS[s.icon] ?? <Gauge {...ICON_P} />}</div>
                    <div className="o3-spec-body">
                      <div className="o3-spec-label">{s.label}</div>
                      <div className="o3-spec-value">{s.value}</div>
                    </div>
                    <div className="o3-spec-note">{s.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h2 className="o3-h2">
              BUILT FOR<br />
              <span>RETAIL</span><br />
              PERFORMANCE.
            </h2>
            <p className="o3-right-sub">{product.subtitle}</p>

            <div className="o3-feats">
              {product.features.map((f, i) => (
                <div key={i} className="o3-feat">
                  <div className="o3-feat-num">{f.num}</div>
                  <div>
                    <div className="o3-feat-title">{f.title}</div>
                    <div className="o3-feat-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="o3-cta">
              <div className="o3-cta-overline">Ready to order</div>
              <div className="o3-cta-heading">
                Professional installation available.
              </div>
              <p className="o3-cta-sub">
                In stock and ready to deliver across the UK. We respond within one business day with a tailored proposal for your store layout.
              </p>
              <div className="o3-cta-actions">
                <a
                  href={`mailto:sales@ilktechnology.com?subject=Quote%20Request%20—%20${encodeURIComponent(product.name)}`}
                  className="o3-btn-primary"
                >
                  Request a Quote
                </a>
                <a
                  href={product.cataloguePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="o3-cta-link"
                >
                  Download Catalogue →
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}