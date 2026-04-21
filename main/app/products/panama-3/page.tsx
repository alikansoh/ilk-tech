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
  EyeOff,
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
  silver:      "#D8D8D8",
  silverDim:   "rgba(216,216,216,0.15)",
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const product = {
  name:     "Panama 3",
  range:    "Remote Multideck",
  colour:   "Anthracite Grey",
  image:    "/pro3.png",
  cataloguePdf: "/catalogues/panama3.pdf",
  sizes:    ["1250mm", "1875mm", "2500mm", "3750mm"],
  dimensions: { Height: "203 cm", Depth: "75 cm" },
  subtitle: "The Panama 3 pairs a classic Arneg blind system with dual-glass doors and precision EC fan cooling — a masterclass in disciplined refrigeration for the modern chilled aisle.",
  specs: [
    { label: "Temperature",    value: "+1 to +4 °C",             note: "Chilled range",       icon: "temp"   },
    { label: "Cooling",        value: "Remote",                  note: "External condenser",  icon: "cool"   },
    { label: "Lighting",       value: "LED canopy",              note: "Low energy",          icon: "light"  },
    { label: "Doors",          value: "Dual glass",              note: "Double-glazed",       icon: "door"   },
    { label: "Controller",     value: "Electronic",              note: "Smart control",       icon: "ctrl"   },
    { label: "Pipework",       value: "Top entry",               note: "Clean install",       icon: "pipe"   },
    { label: "Shelving",       value: "Base + 5 × 450 mm + EPOS",note: "Adj. levels",         icon: "shelf"  },
    { label: "EC Fans",        value: "Low-energy",              note: "Optimised airflow",   icon: "fan"    },
    { label: "End Walls",      value: "Solid or Mirrored",       note: "Your choice",         icon: "end"    },
    { label: "Manual Blind",   value: "Included",                note: "Night blind system",  icon: "blind"  },
    { label: "Solenoid Valve", value: "Not included",            note: "Simplified system",   icon: "valve"  },
  ],
  features: [
    { num: "01", title: "Manual Blind System",      desc: "The signature Panama blind rolls down smoothly to seal the cabinet overnight, slashing energy consumption and extending refrigerant life for years of reliable performance." },
    { num: "02", title: "EC Fan Technology",        desc: "Low-energy electronically commutated fans deliver optimised airflow and substantially reduced running costs — a measurable upgrade over standard AC motors." },
    { num: "03", title: "Anthracite Grey Finish",   desc: "The deep powder coat finish commands respect on the shop floor. Paired with your choice of solid or mirrored end walls, it sets a premium retail tone." },
    { num: "04", title: "Flexible Configuration",   desc: "Five adjustable 450 mm shelves, full EPOS rail, dual-glass doors, and top-entry pipework — every detail engineered for a clean, professional installation." },
  ],
};

/* ─────────────────────────────────────────────
   BLIND SLAT COUNT
───────────────────────────────────────────── */
const SLAT_COUNT = 14;

/* ─────────────────────────────────────────────
   TICKER ITEMS
───────────────────────────────────────────── */
const TICKER_ITEMS = [
  "Anthracite Grey",
  "Remote Cooling",
  "Manual Blind System",
  "Dual Glass Doors",
  "+1 to +4 °C",
  "Fast UK Delivery",
  "Professional Installation",
  "5 Shelf Levels",
  "LED Canopy",
  "EC Fan Technology",
];

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300;1,9..40,400&display=swap');

  .p3 *, .p3 *::before, .p3 *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .p3 {
    font-family: 'DM Sans', system-ui, sans-serif;
    background: ${T.anthracite2};
    color: ${T.white};
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Noise texture */
  .p3::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.030;
    background-size: 180px 180px;
  }

  /* ── HERO ── */
  .p3-hero {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
  }

  /* ─── IMAGE PANEL ─── */
  .p3-hero-img {
    position: relative;
    overflow: hidden;
    background: ${T.anthracite3};
  }

  /* Red top accent line */
  .p3-hero-img-topline {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: ${T.red};
    z-index: 20;
  }

  /* Actual image */
  .p3-hero-img-actual {
    position: absolute;
    inset: 0;
    z-index: 1;
  }
  .p3-hero-img-actual img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }

  /* Right-side fade into text panel */
  .p3-hero-img-fade {
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 55%, ${T.anthracite2} 100%);
    z-index: 2;
    pointer-events: none;
  }

  /* ─── BLIND SLATS OVERLAY ─── */
  .p3-blind {
    position: absolute;
    inset: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    pointer-events: none;
  }
  .p3-slat {
    flex: 1;
    background: ${T.anthracite};
    transform-origin: top center;
    transform: scaleY(1);
    /* Each slat will be animated via GSAP */
  }
  /* Slat separator lines — gives venetian blind feel */
  .p3-slat::after {
    content: "";
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: rgba(0,0,0,0.3);
  }
  .p3-slat { position: relative; }

  /* Blind cord decorative lines */
  .p3-blind-cord {
    position: absolute;
    top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, rgba(200,16,46,0.6), rgba(200,16,46,0.1));
    z-index: 11;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.5s;
  }
  .p3-blind-cord-left  { left: 15%; }
  .p3-blind-cord-right { right: 15%; }

  /* ─── TEXT PANEL ─── */
  .p3-hero-txt {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 72px 80px 64px;
    position: relative;
    z-index: 1;
  }

  .p3-eyebrow {
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
  .p3-eyebrow::before {
    content: "";
    width: 28px; height: 1.5px;
    background: ${T.red};
    flex-shrink: 0;
  }

  .p3-h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(110px, 13vw, 170px);
    line-height: 0.85;
    color: ${T.white};
    letter-spacing: 0.01em;
    margin-bottom: 0;
    opacity: 0;
  }
  .p3-h1-accent {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(110px, 13vw, 170px);
    line-height: 0.85;
    color: transparent;
    -webkit-text-stroke: 1.5px ${T.red};
    letter-spacing: 0.01em;
    margin-bottom: 40px;
    opacity: 0;
  }

  .p3-rule {
    width: 48px; height: 1px;
    background: rgba(255,255,255,0.15);
    margin-bottom: 36px;
    opacity: 0;
  }

  .p3-tagline {
    font-size: clamp(15px, 1.8vw, 18px);
    font-weight: 300;
    color: rgba(255,255,255,0.72);
    line-height: 1.65;
    max-width: 500px;
    margin-bottom: 52px;
    opacity: 0;
  }

  .p3-dims {
    display: flex;
    gap: 0;
    margin-bottom: 52px;
    border: 1px solid ${T.borderLight};
    border-radius: 8px;
    overflow: hidden;
    max-width: 280px;
    opacity: 0;
  }
  .p3-dim {
    flex: 1;
    padding: 18px 24px;
    border-right: 1px solid ${T.border};
    background: rgba(255,255,255,0.03);
  }
  .p3-dim:last-child { border-right: none; }
  .p3-dim-k {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${T.red};
    margin-bottom: 6px;
  }
  .p3-dim-v {
    font-size: 26px;
    font-weight: 600;
    color: ${T.white};
    line-height: 1;
    letter-spacing: -0.01em;
  }

  .p3-hero-actions {
    display: flex;
    align-items: center;
    gap: 20px;
    opacity: 0;
  }
  .p3-btn-primary {
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
  .p3-btn-primary:hover {
    background: ${T.red2};
    transform: translateY(-1px);
  }
  .p3-btn-ghost {
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
  .p3-btn-ghost:hover {
    background: rgba(255,255,255,0.06);
    color: ${T.white};
    border-color: rgba(255,255,255,0.28);
  }

  /* ── BLIND STATUS BADGE ── */
  .p3-blind-badge {
    position: absolute;
    bottom: 40px;
    left: 40px;
    z-index: 20;
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(28,30,32,0.88);
    backdrop-filter: blur(10px);
    border: 1px solid ${T.borderLight};
    border-radius: 40px;
    padding: 10px 18px 10px 12px;
    opacity: 0;
    transform: translateY(12px);
  }
  .p3-blind-badge-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: ${T.red};
    box-shadow: 0 0 8px ${T.red};
    flex-shrink: 0;
    animation: p3-pulse 2s ease-in-out infinite;
  }
  @keyframes p3-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(0.8); }
  }
  .p3-blind-badge-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.8);
  }

  /* ── TICKER ── */
  .p3-ticker-wrap {
    position: relative;
    z-index: 1;
    overflow: hidden;
    border-top: 1px solid ${T.border};
    border-bottom: 1px solid ${T.border};
    background: ${T.red};
    padding: 12px 0;
  }
  .p3-ticker-track {
    display: flex;
    width: max-content;
    animation: p3-ticker 22s linear infinite;
    will-change: transform;
  }
  .p3-ticker-item {
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
  .p3-ticker-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: rgba(255,255,255,0.5);
    flex-shrink: 0;
  }
  @keyframes p3-ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* ── BODY ── */
  .p3-body {
    position: relative;
    z-index: 1;
  }
  .p3-body-inner {
    max-width: 1360px;
    margin: 0 auto;
    padding: 110px 64px 130px;
    display: grid;
    grid-template-columns: 1fr 1.45fr;
    gap: 100px;
    align-items: start;
  }

  /* ── SECTION LABEL ── */
  .p3-section-label {
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
  .p3-section-label::before {
    content: "";
    width: 18px; height: 1.5px;
    background: ${T.red};
    flex-shrink: 0;
  }

  /* ── SIZES ── */
  .p3-sizes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 52px;
  }
  .p3-size-btn {
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
    position: relative;
    overflow: hidden;
  }
  /* Blind-stripe decorative background */
  .p3-size-btn::before {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 4px,
      rgba(200,16,46,0.04) 4px,
      rgba(200,16,46,0.04) 5px
    );
    pointer-events: none;
  }
  .p3-size-btn:hover {
    background: rgba(255,255,255,0.07);
    border-color: ${T.borderLight};
    color: ${T.white};
  }

  /* ── SPEC CARDS ── */
  .p3-specs-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .p3-specs-count {
    font-size: 10px;
    font-weight: 700;
    color: ${T.red};
    background: rgba(200,16,46,0.12);
    border: 1px solid rgba(200,16,46,0.2);
    border-radius: 20px;
    padding: 4px 12px;
    letter-spacing: 0.08em;
  }
  .p3-specs-grid {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .p3-spec-card {
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
  .p3-spec-card::before {
    content: "";
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: ${T.red};
    opacity: 0;
    transition: opacity 0.2s;
  }
  .p3-spec-card:hover {
    background: rgba(255,255,255,0.055);
    border-color: rgba(255,255,255,0.14);
    transform: translateX(3px);
  }
  .p3-spec-card:hover::before { opacity: 1; }
  .p3-spec-icon {
    width: 38px; height: 38px;
    border-radius: 8px;
    background: rgba(200,16,46,0.1);
    border: 1px solid rgba(200,16,46,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .p3-spec-body { flex: 1; min-width: 0; }
  .p3-spec-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 3px;
  }
  .p3-spec-value {
    font-size: 13px;
    font-weight: 600;
    color: ${T.white};
    letter-spacing: -0.01em;
  }
  .p3-spec-note {
    font-size: 10px;
    font-weight: 500;
    color: rgba(255,255,255,0.28);
    letter-spacing: 0.06em;
    text-align: right;
    flex-shrink: 0;
    white-space: nowrap;
  }

  /* ── RIGHT COLUMN ── */
  .p3-h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(58px, 6.5vw, 88px);
    line-height: 0.88;
    color: ${T.white};
    margin-bottom: 32px;
    letter-spacing: 0.01em;
  }
  .p3-h2 span {
    color: transparent;
    -webkit-text-stroke: 1.5px ${T.red};
  }

  .p3-right-sub {
    font-size: clamp(15px, 1.7vw, 17px);
    font-weight: 300;
    color: rgba(255,255,255,0.6);
    line-height: 1.7;
    max-width: 580px;
    margin-bottom: 60px;
  }

  /* Features */
  .p3-feats { margin-bottom: 68px; }
  .p3-feat {
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
  .p3-feat:first-child { border-top: 1px solid ${T.border}; }
  .p3-feat::before {
    content: "";
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: rgba(200,16,46,0.04);
    transition: left 0.4s ease;
    pointer-events: none;
  }
  .p3-feat:hover::before { left: 0; }
  .p3-feat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    color: ${T.red};
    line-height: 1;
    padding-top: 2px;
    opacity: 0.7;
  }
  .p3-feat-title {
    font-size: 14px;
    font-weight: 700;
    color: ${T.white};
    margin-bottom: 7px;
    letter-spacing: -0.01em;
  }
  .p3-feat-desc {
    font-size: 13px;
    font-weight: 300;
    color: rgba(255,255,255,0.5);
    line-height: 1.65;
  }

  /* CTA card */
  .p3-cta {
    border: 1px solid ${T.borderLight};
    border-radius: 8px;
    padding: 44px;
    background: rgba(255,255,255,0.03);
    position: relative;
    overflow: hidden;
  }
  .p3-cta::before {
    content: "";
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 3px;
    background: ${T.red};
  }
  /* Blind stripe texture on CTA */
  .p3-cta::after {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 12px,
      rgba(255,255,255,0.012) 12px,
      rgba(255,255,255,0.012) 13px
    );
    pointer-events: none;
  }
  .p3-cta-overline {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${T.red};
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
  }
  .p3-cta-heading {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 38px;
    color: ${T.white};
    line-height: 1.1;
    margin-bottom: 12px;
    letter-spacing: 0.03em;
    position: relative;
    z-index: 1;
  }
  .p3-cta-sub {
    font-size: 13px;
    font-weight: 300;
    color: rgba(255,255,255,0.5);
    line-height: 1.7;
    margin-bottom: 30px;
    max-width: 380px;
    position: relative;
    z-index: 1;
  }
  .p3-cta-actions {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }
  .p3-cta-link {
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
  .p3-cta-link:hover {
    color: rgba(255,255,255,0.75);
    border-color: rgba(255,255,255,0.2);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 1000px) {
    .p3-hero { grid-template-columns: 1fr; }
    .p3-hero-img { height: 55vw; min-height: 320px; }
    .p3-hero-txt { padding: 52px 32px; }
    .p3-body-inner {
      grid-template-columns: 1fr;
      gap: 60px;
      padding: 72px 28px 80px;
    }
    .p3-h1, .p3-h1-accent { font-size: clamp(80px, 18vw, 130px); }
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
  pipe:  <ArrowDownToLine {...ICON_P} />,
  shelf: <LayoutList      {...ICON_P} />,
  fan:   <Wind            {...ICON_P} />,
  end:   <Layers          {...ICON_P} />,
  valve: <Gauge           {...ICON_P} />,
  blind: <EyeOff          {...ICON_P} />,
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function Panama3Page() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const blindRef   = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const gsapLoaded = useRef(false);

  useEffect(() => {
    if (gsapLoaded.current) return;
    gsapLoaded.current = true;

    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const hero = heroRef.current;
      if (!hero) return;

      const slats   = blindRef.current?.querySelectorAll(".p3-slat");
      const cords   = hero.querySelectorAll(".p3-blind-cord");
      const badge   = badgeRef.current;
      const eyebrow = hero.querySelector(".p3-eyebrow");
      const h1      = hero.querySelector(".p3-h1");
      const h1acc   = hero.querySelector(".p3-h1-accent");
      const rule    = hero.querySelector(".p3-rule");
      const tagline = hero.querySelector(".p3-tagline");
      const dims    = hero.querySelector(".p3-dims");
      const actions = hero.querySelector(".p3-hero-actions");
      const imgEl   = hero.querySelector(".p3-hero-img-actual");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /* 1. Image zooms in subtly */
      tl.fromTo(imgEl, { scale: 1.06, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 }, 0);

      /* 2. Cords flash in briefly (venetian blind cue) */
      tl.to(cords, { opacity: 1, duration: 0.25 }, 0.3);

      /* 3. BLIND OPENS: slats collapse upward like venetian blinds
            Each slat scaleY goes from 1 → 0 (folding up),
            staggered from top to bottom */
      if (slats && slats.length) {
        tl.to(slats,
          {
            scaleY: 0,
            duration: 0.55,
            stagger: {
              each: 0.048,
              from: "start",
            },
            ease: "power2.inOut",
            transformOrigin: "top center",
          },
          0.5
        );
      }

      /* 4. Cords fade out after blind opens */
      tl.to(cords, { opacity: 0, duration: 0.3 }, 1.3);

      /* 5. Badge slides up */
      tl.fromTo(badge,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 },
        1.2
      );

      /* 6. Text stagger */
      tl.fromTo(
        [eyebrow, h1, h1acc, rule, tagline, dims, actions],
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.085 },
        0.65
      );

      /* ── Spec cards: scroll reveal ── */
      gsap.fromTo(".p3-spec-card",
        { x: -24, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.55,
          stagger: 0.055,
          ease: "power2.out",
          scrollTrigger: { trigger: ".p3-specs-grid", start: "top 82%" },
        }
      );

      /* ── Size buttons ── */
      gsap.fromTo(".p3-size-btn",
        { scaleY: 0, opacity: 0, transformOrigin: "top" },
        {
          scaleY: 1, opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".p3-sizes", start: "top 85%" },
        }
      );

      /* ── Feature rows ── */
      gsap.fromTo(".p3-feat",
        { x: 30, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".p3-feats", start: "top 80%" },
        }
      );

      /* ── h2 reveal ── */
      gsap.fromTo(".p3-h2",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".p3-h2", start: "top 85%" },
        }
      );

      /* ── CTA card ── */
      gsap.fromTo(".p3-cta",
        { y: 30, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: ".p3-cta", start: "top 85%" },
        }
      );
    };

    load();
  }, []);

  return (
    <div className="p3">
      <style>{css}</style>

      {/* HERO */}
      <section className="p3-hero" ref={heroRef}>

        {/* Image panel */}
        <div className="p3-hero-img">
          <div className="p3-hero-img-topline" />

          {/* Actual image beneath blind */}
          <div className="p3-hero-img-actual">
            <Image
              src={product.image}
              alt={product.name}
              fill
              quality={95}
              style={{ objectFit: "cover", objectPosition: "center top" }}
              sizes="50vw"
            />
          </div>

          {/* Right-edge fade */}
          <div className="p3-hero-img-fade" />

          {/* Venetian blind slats */}
          <div className="p3-blind" ref={blindRef}>
            {Array.from({ length: SLAT_COUNT }).map((_, i) => (
              <div key={i} className="p3-slat" />
            ))}
          </div>

          {/* Decorative cord lines */}
          <div className="p3-blind-cord p3-blind-cord-left" />
          <div className="p3-blind-cord p3-blind-cord-right" />

          {/* Badge */}
          <div className="p3-blind-badge" ref={badgeRef}>
            <div className="p3-blind-badge-dot" />
            <span className="p3-blind-badge-label">Manual Blind Included</span>
          </div>
        </div>

        {/* Text panel */}
        <div className="p3-hero-txt">
          <span className="p3-eyebrow">{product.range}</span>

          <div className="p3-h1">PANAMA</div>
          <span className="p3-h1-accent">3.</span>

          <div className="p3-rule" />
          <p className="p3-tagline">{product.subtitle}</p>

          <div className="p3-dims">
            {Object.entries(product.dimensions).map(([k, v]) => (
              <div key={k} className="p3-dim">
                <div className="p3-dim-k">{k}</div>
                <div className="p3-dim-v">{v}</div>
              </div>
            ))}
          </div>

          <div className="p3-hero-actions">
            <a
              href={`mailto:sales@ilktechnology.com?subject=Quote%20—%20${encodeURIComponent(product.name)}`}
              className="p3-btn-primary"
            >
              Request a Quote
            </a>
            <a
              href={product.cataloguePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="p3-btn-ghost"
            >
              Download Catalogue
            </a>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="p3-ticker-wrap" aria-hidden>
        <div className="p3-ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="p3-ticker-item">
              {item}
              <span className="p3-ticker-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* BODY */}
      <section className="p3-body">
        <div className="p3-body-inner">

          {/* LEFT */}
          <div>
            <p className="p3-section-label">Available Widths</p>
            <div className="p3-sizes">
              {product.sizes.map(s => (
                <div key={s} className="p3-size-btn">{s}</div>
              ))}
            </div>

            <div>
              <div className="p3-specs-header">
                <span className="p3-section-label" style={{ margin: 0 }}>Specifications</span>
                <span className="p3-specs-count">{product.specs.length} points</span>
              </div>
              <div className="p3-specs-grid">
                {product.specs.map(s => (
                  <div key={s.label} className="p3-spec-card">
                    <div className="p3-spec-icon">{ICONS[s.icon] ?? <Gauge {...ICON_P} />}</div>
                    <div className="p3-spec-body">
                      <div className="p3-spec-label">{s.label}</div>
                      <div className="p3-spec-value">{s.value}</div>
                    </div>
                    <div className="p3-spec-note">{s.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h2 className="p3-h2">
              ENGINEERED<br />
              FOR THE<br />
              <span>CHILLED AISLE.</span>
            </h2>
            <p className="p3-right-sub">{product.subtitle}</p>

            <div className="p3-feats">
              {product.features.map((f, i) => (
                <div key={i} className="p3-feat">
                  <div className="p3-feat-num">{f.num}</div>
                  <div>
                    <div className="p3-feat-title">{f.title}</div>
                    <div className="p3-feat-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p3-cta">
              <div className="p3-cta-overline">Ready to order</div>
              <div className="p3-cta-heading">
                Professional installation available.
              </div>
              <p className="p3-cta-sub">
                In stock and ready to deliver across the UK. We respond within one business day with a tailored proposal for your store layout.
              </p>
              <div className="p3-cta-actions">
                <a
                  href={`mailto:sales@ilktechnology.com?subject=Quote%20Request%20—%20${encodeURIComponent(product.name)}`}
                  className="p3-btn-primary"
                >
                  Request a Quote
                </a>
                <a
                  href={product.cataloguePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p3-cta-link"
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