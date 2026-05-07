"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  ChevronLeft,
  ChevronRight,
  Clock,
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
  muted:       "rgba(255,255,255,0.45)",
  border:      "rgba(255,255,255,0.08)",
  borderLight: "rgba(255,255,255,0.14)",
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const product = {
  name:     "Panama 3 SC",
  range:    "Vertical Open Multideck · Remote",
  colour:   "Anthracite Grey",
  images:   ["/pro4.png", "/pro-4.png"], // replace with actual SC images
  cataloguePdf: "/catalogues/panama3sc.pdf",
  sizes:    ["1875mm", "2500mm", "3750mm"],
  dimensions: {
    "Height A": { value: "203", unit: "cm" },
    "Height B": { value: "216", unit: "cm" },
    "Depth":    { value: "750", unit: "mm" },
  },
  subtitle: "The Panama 3 SC is engineered around its class-leading low-energy EC fan system — a vertical open multideck that delivers precision chilling with measurably lower running costs across every store format.",
  highlight: "Low-Energy EC Fan System",
  preorder: true,
  leadTime: "10 weeks",
  specs: [
    { label: "Temperature",    value: "-1 to +5 °C",             note: "Preservation range",  icon: "temp"   },
    { label: "Cooling",        value: "Remote",                  note: "External condenser",  icon: "cool"   },
    { label: "Lighting",       value: "LED canopy + Door LED",   note: "Low energy",          icon: "light"  },
    { label: "Doors",          value: "Dual glass hinged",       note: "Double-glazed",       icon: "door"   },
    { label: "Controller",     value: "Electronic",              note: "Smart control",       icon: "ctrl"   },
    { label: "Pipework",       value: "Top entry",               note: "Clean install",       icon: "pipe"   },
    { label: "Shelving",       value: "Base + 5 × 450mm + EPOS", note: "Adj. levels",         icon: "shelf"  },
    { label: "EC Fan",         value: "Low-energy",              note: "Optimised airflow",   icon: "fan"    },
    { label: "End Walls",      value: "Solid or Mirrored",       note: "Your choice",         icon: "end"    },
    { label: "Manual Blind",   value: "Included",                note: "Night blind system",  icon: "blind"  },
    { label: "Solenoid Valve", value: "Not included",            note: "Simplified system",   icon: "valve"  },
  ],
  features: [
    { num: "01", title: "Low-Energy EC Fan Technology",   desc: "Electronically commutated fans are the headline feature: they deliver precision airflow distribution at a fraction of the power draw of conventional AC motors, cutting running costs year on year." },
    { num: "02", title: "Vertical Open Multideck Format", desc: "The SC open-front configuration maximises product visibility and customer access — the preferred layout for high-volume chilled dairy, deli, and convenience aisles." },
    { num: "03", title: "Dual Glass Hinged Doors",        desc: "Double-glazed hinged doors with integrated door LED lighting reduce ambient heat gain and slash energy consumption overnight while keeping products under perfectly lit display." },
    { num: "04", title: "Manual Night Blind Included",    desc: "The Panama SC ships standard with a manual blind system — roll it down at close and cut overnight energy consumption dramatically without any additional equipment cost." },
  ],
  ralColours: [
    { ral: "9010", name: "White",          hex: "#F5F4F2", bordered: true  },
    { ral: "7024", name: "Graphite Grey",  hex: "#474A51", bordered: false },
    { ral: "9006", name: "White Aluminium",hex: "#A6A8AB", bordered: false },
    { ral: "9004", name: "Signal Black",   hex: "#2B2B2C", bordered: false },
    { ral: "7016", name: "Anthracite Grey",hex: "#383E42", bordered: false },
  ],
};

const TICKER_ITEMS = [
  "Low-Energy EC Fans",
  "Vertical Open Multideck",
  "Remote Cooling",
  "Manual Blind Included",
  "Dual Glass Hinged Doors",
  "-1 to +5 °C",
  "Pre-Order · 10 Week Lead",
  "5 Shelf Levels",
  "LED Canopy + Door LED",
  "Anthracite Grey",
];

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300;1,9..40,400&display=swap');

  .p3sc *, .p3sc *::before, .p3sc *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .p3sc {
    font-family: 'DM Sans', system-ui, sans-serif;
    background: ${T.anthracite2};
    color: ${T.white};
    min-height: 100vh;
    overflow-x: hidden;
  }

  .p3sc::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.030;
    background-size: 180px 180px;
  }

  /* HERO */
  .p3sc-hero {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
  }

  /* IMAGE PANEL */
  .p3sc-img-panel {
    position: relative;
    overflow: hidden;
    background: ${T.anthracite3};
  }

  .p3sc-img-topline {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: ${T.red};
    z-index: 20;
  }

  /* SLIDESHOW */
  .p3sc-slides {
    position: absolute;
    inset: 0;
    z-index: 1;
  }
  .p3sc-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.7s ease;
  }
  .p3sc-slide.active { opacity: 1; }
  .p3sc-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  /* SLIDE DOOR ANIMATION OVERLAY (we keep overlays but no seam line) */
  .p3sc-door-left,
  .p3sc-door-right {
    position: absolute;
    top: 0; bottom: 0;
    width: 50%;
    background: ${T.anthracite};
    z-index: 10;
    transition: transform 1.1s cubic-bezier(0.77, 0, 0.175, 1);
  }
  .p3sc-door-left  { left: 0;  transform-origin: left;  }
  .p3sc-door-right { right: 0; transform-origin: right; }
  .p3sc-door-left.open  { transform: translateX(-100%); }
  .p3sc-door-right.open { transform: translateX(100%);  }

  .p3sc-img-fade {
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 55%, ${T.anthracite2} 100%);
    z-index: 2;
    pointer-events: none;
  }

  /* Slide nav arrows */
  .p3sc-slide-nav {
    position: absolute;
    bottom: 96px;
    left: 0; right: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
  .p3sc-slide-btn {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: rgba(28,30,32,0.85);
    border: 1px solid ${T.borderLight};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
    color: rgba(255,255,255,0.7);
  }
  .p3sc-slide-btn:hover { background: ${T.red}; border-color: ${T.red}; color: #fff; }
  .p3sc-slide-dots {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .p3sc-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
    transition: background 0.25s, transform 0.25s;
    cursor: pointer;
  }
  .p3sc-dot.active { background: ${T.red}; transform: scale(1.4); }

  /* Pre-order badge */
  .p3sc-preorder-badge {
    position: absolute;
    top: 28px;
    right: 28px;
    z-index: 20;
    background: rgba(200,16,46,0.92);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 4px;
    padding: 10px 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
  }
  .p3sc-preorder-badge-title {
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.9);
  }
  .p3sc-preorder-badge-lead {
    font-size: 11px;
    font-weight: 500;
    color: rgba(255,255,255,0.75);
    letter-spacing: 0.06em;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  /* Highlight badge */
  .p3sc-highlight-badge {
    position: absolute;
    bottom: 40px;
    left: 28px;
    z-index: 20;
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(28,30,32,0.88);
    backdrop-filter: blur(10px);
    border: 1px solid ${T.borderLight};
    border-radius: 40px;
    padding: 10px 18px 10px 12px;
  }
  .p3sc-highlight-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: ${T.red};
    box-shadow: 0 0 8px ${T.red};
    flex-shrink: 0;
    animation: p3sc-pulse 2s ease-in-out infinite;
  }
  @keyframes p3sc-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(0.8); }
  }
  .p3sc-highlight-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.8);
  }

  /* TEXT PANEL */
  .p3sc-hero-txt {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 72px 80px 64px;
    position: relative;
    z-index: 1;
  }

  .p3sc-eyebrow {
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
  .p3sc-eyebrow::before {
    content: "";
    width: 28px; height: 1.5px;
    background: ${T.red};
    flex-shrink: 0;
  }

  .p3sc-h1-row {
    display: flex;
    align-items: baseline;
    line-height: 0.85;
    margin-bottom: 40px;
    opacity: 0;
    flex-wrap: wrap;
  }
  .p3sc-h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(72px, 8.5vw, 120px);
    line-height: 0.85;
    color: ${T.white};
    letter-spacing: 0.01em;
  }
  .p3sc-h1-accent {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(72px, 8.5vw, 120px);
    line-height: 0.85;
    color: transparent;
    -webkit-text-stroke: 1.5px ${T.red};
    letter-spacing: 0.01em;
    margin-left: 14px;
  }

  .p3sc-rule {
    width: 48px; height: 1px;
    background: rgba(255,255,255,0.15);
    margin-bottom: 36px;
    opacity: 0;
  }

  .p3sc-tagline {
    font-size: clamp(14px, 1.6vw, 17px);
    font-weight: 300;
    color: rgba(255,255,255,0.68);
    line-height: 1.65;
    max-width: 480px;
    margin-bottom: 44px;
    opacity: 0;
  }

  /* Pre-order banner */
  .p3sc-preorder-bar {
    display: flex;
    align-items: center;
    gap: 14px;
    background: rgba(200,16,46,0.1);
    border: 1px solid rgba(200,16,46,0.25);
    border-radius: 6px;
    padding: 14px 18px;
    margin-bottom: 36px;
    opacity: 0;
  }
  .p3sc-preorder-bar-icon {
    flex-shrink: 0;
    color: ${T.red};
  }
  .p3sc-preorder-bar-text {
    font-size: 12px;
    font-weight: 600;
    color: rgba(255,255,255,0.75);
    letter-spacing: 0.04em;
  }
  .p3sc-preorder-bar-text strong {
    color: ${T.white};
    font-weight: 700;
  }

  .p3sc-dims {
    display: flex;
    gap: 0;
    margin-bottom: 44px;
    border: 1px solid ${T.borderLight};
    border-radius: 8px;
    overflow: hidden;
    opacity: 0;
  }
  .p3sc-dim {
    flex: 1;
    padding: 16px 18px;
    border-right: 1px solid ${T.border};
    background: rgba(255,255,255,0.03);
  }
  .p3sc-dim:last-child { border-right: none; }
  .p3sc-dim-k {
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${T.red};
    margin-bottom: 6px;
  }
  .p3sc-dim-v {
    display: flex;
    align-items: baseline;
    gap: 3px;
    line-height: 1;
  }
  .p3sc-dim-v-num {
    font-size: 22px;
    font-weight: 600;
    color: ${T.white};
    letter-spacing: -0.01em;
  }
  .p3sc-dim-v-unit {
    font-size: 11px;
    font-weight: 500;
    color: rgba(255,255,255,0.45);
  }

  .p3sc-hero-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    opacity: 0;
    flex-wrap: wrap;
  }
  .p3sc-btn-primary {
    padding: 14px 28px;
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
  .p3sc-btn-primary:hover { filter: brightness(0.92); transform: translateY(-1px); }
  .p3sc-btn-ghost {
    padding: 13px 24px;
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
  .p3sc-btn-ghost:hover { background: rgba(255,255,255,0.06); color: ${T.white}; border-color: rgba(255,255,255,0.28); }

  /* COLOR SELECTOR (enquiry areas) */
  .p3sc-color-select {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
    user-select: none;
  }
  .p3sc-color-label {
    font-size: 11px;
    font-weight: 700;
    color: rgba(255,255,255,0.68);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .p3sc-color-options {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .p3sc-color-btn {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.08);
    box-shadow: 0 2px 8px rgba(0,0,0,0.5);
    cursor: pointer;
    padding: 0;
    transition: transform 0.18s, box-shadow 0.18s, outline 0.12s;
    display: inline-block;
  }
  .p3sc-color-btn:focus { outline: 2px solid rgba(255,255,255,0.12); }
  .p3sc-color-btn:hover { transform: translateY(-3px); }
  .p3sc-color-btn.active {
    box-shadow: 0 6px 18px rgba(0,0,0,0.6), 0 0 0 3px rgba(255,255,255,0.06) inset, 0 0 0 3px rgba(255,255,255,0.06);
    transform: translateY(-4px) scale(1.04);
    border-color: rgba(255,255,255,0.18);
  }

  /* TICKER */
  .p3sc-ticker-wrap {
    position: relative; z-index: 1;
    overflow: hidden;
    border-top: 1px solid ${T.border};
    border-bottom: 1px solid ${T.border};
    background: ${T.red};
    padding: 12px 0;
  }
  .p3sc-ticker-track {
    display: flex;
    width: max-content;
    animation: p3sc-ticker 24s linear infinite;
    will-change: transform;
  }
  .p3sc-ticker-item {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 13px;
    letter-spacing: 0.2em;
    color: rgba(255,255,255,0.9);
    padding: 0 28px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 28px;
  }
  .p3sc-ticker-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.5); flex-shrink: 0; }
  @keyframes p3sc-ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* BODY */
  .p3sc-body { position: relative; z-index: 1; }
  .p3sc-body-inner {
    max-width: 1360px;
    margin: 0 auto;
    padding: 110px 64px 130px;
    display: grid;
    grid-template-columns: 1fr 1.45fr;
    gap: 100px;
    align-items: start;
  }

  .p3sc-section-label {
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
  .p3sc-section-label::before {
    content: "";
    width: 18px; height: 1.5px;
    background: ${T.red};
    flex-shrink: 0;
  }

  /* RAL swatches (static now) */
  .p3sc-ral-section {
    border-top: 1px solid ${T.border};
    padding-top: 28px;
    margin-bottom: 44px;
  }
  .p3sc-ral-swatches { display: flex; flex-wrap: wrap; gap: 10px; }
  .p3sc-ral-swatch { display: flex; flex-direction: column; align-items: center; gap: 5px; cursor: default; }
  .p3sc-ral-circle {
    width: 38px; height: 38px;
    border-radius: 50%;
    position: relative;
    box-shadow: 0 2px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
    transition: transform 0.22s cubic-bezier(.2,.9,.2,1), box-shadow 0.22s;
  }
  .p3sc-ral-circle::after {
    content: '';
    position: absolute;
    top: 5px; left: 8px;
    width: 12px; height: 7px;
    border-radius: 50%;
    background: rgba(255,255,255,0.22);
    pointer-events: none;
  }
  .p3sc-ral-swatch:hover .p3sc-ral-circle { transform: translateY(-3px) scale(1.06); box-shadow: 0 8px 18px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15); }
  .p3sc-ral-circle--bordered { border: 1.5px solid rgba(255,255,255,0.35); }
  .p3sc-ral-code { font-size: 9px; font-weight: 800; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); text-align: center; white-space: nowrap; }
  .p3sc-ral-name { font-size: 8px; font-weight: 600; color: rgba(255,255,255,0.3); text-align: center; white-space: nowrap; }

  .p3sc-sizes {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    margin-bottom: 44px;
  }
  .p3sc-size-btn {
    padding: 16px;
    font-size: 12px;
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
  .p3sc-size-btn::before {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(200,16,46,0.04) 4px, rgba(200,16,46,0.04) 5px);
    pointer-events: none;
  }
  .p3sc-size-btn:hover { background: rgba(255,255,255,0.07); border-color: ${T.borderLight}; color: ${T.white}; }

  .p3sc-specs-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .p3sc-specs-count {
    font-size: 10px; font-weight: 700;
    color: ${T.red};
    background: rgba(200,16,46,0.12);
    border: 1px solid rgba(200,16,46,0.2);
    border-radius: 20px;
    padding: 4px 12px;
    letter-spacing: 0.08em;
  }
  .p3sc-specs-grid { display: flex; flex-direction: column; gap: 5px; }
  .p3sc-spec-card {
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
  .p3sc-spec-card::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: ${T.red}; opacity: 0; transition: opacity 0.2s; }
  .p3sc-spec-card:hover { background: rgba(255,255,255,0.055); border-color: rgba(255,255,255,0.14); transform: translateX(3px); }
  .p3sc-spec-card:hover::before { opacity: 1; }
  .p3sc-spec-icon { width: 38px; height: 38px; border-radius: 8px; background: rgba(200,16,46,0.1); border: 1px solid rgba(200,16,46,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .p3sc-spec-body { flex: 1; min-width: 0; }
  .p3sc-spec-label { font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 3px; }
  .p3sc-spec-value { font-size: 13px; font-weight: 600; color: ${T.white}; letter-spacing: -0.01em; }
  .p3sc-spec-note { font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.28); letter-spacing: 0.06em; text-align: right; flex-shrink: 0; white-space: nowrap; }

  .p3sc-h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(52px, 6vw, 80px);
    line-height: 0.88;
    color: ${T.white};
    margin-bottom: 28px;
    letter-spacing: 0.01em;
  }
  .p3sc-h2 span { color: transparent; -webkit-text-stroke: 1.5px ${T.red}; }

  .p3sc-right-sub {
    font-size: clamp(14px, 1.6vw, 16px);
    font-weight: 300;
    color: rgba(255,255,255,0.58);
    line-height: 1.7;
    max-width: 560px;
    margin-bottom: 52px;
  }

  .p3sc-feats { margin-bottom: 60px; }
  .p3sc-feat {
    display: grid;
    grid-template-columns: 44px 1fr;
    gap: 24px;
    padding: 26px 0;
    border-bottom: 1px solid ${T.border};
    align-items: start;
    position: relative;
    overflow: hidden;
  }
  .p3sc-feat:first-child { border-top: 1px solid ${T.border}; }
  .p3sc-feat::before { content: ""; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: rgba(200,16,46,0.04); transition: left 0.4s ease; pointer-events: none; }
  .p3sc-feat:hover::before { left: 0; }
  .p3sc-feat-num { font-family: 'Bebas Neue', sans-serif; font-size: 26px; color: ${T.red}; line-height: 1; padding-top: 2px; opacity: 0.7; }
  .p3sc-feat-title { font-size: 14px; font-weight: 700; color: ${T.white}; margin-bottom: 7px; letter-spacing: -0.01em; }
  .p3sc-feat-desc { font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.5); line-height: 1.65; }

  .p3sc-cta {
    border: 1px solid ${T.borderLight};
    border-radius: 8px;
    padding: 40px;
    background: rgba(255,255,255,0.03);
    position: relative;
    overflow: hidden;
  }
  .p3sc-cta::before { content: ""; position: absolute; top: 0; left: 0; bottom: 0; width: 3px; background: ${T.red}; }
  .p3sc-cta::after { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(0deg, transparent, transparent 12px, rgba(255,255,255,0.012) 12px, rgba(255,255,255,0.012) 13px); pointer-events: none; }
  .p3sc-cta-overline { font-size: 9px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: ${T.red}; margin-bottom: 14px; position: relative; z-index: 1; }
  .p3sc-cta-heading { font-family: 'Bebas Neue', sans-serif; font-size: 34px; color: ${T.white}; line-height: 1.1; margin-bottom: 10px; letter-spacing: 0.03em; position: relative; z-index: 1; }
  .p3sc-cta-sub { font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.5); line-height: 1.7; margin-bottom: 26px; max-width: 380px; position: relative; z-index: 1; }
  .p3sc-cta-actions { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; position: relative; z-index: 1; }
  .p3sc-cta-link { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.38); text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: color 0.2s; border-bottom: 1px solid transparent; }
  .p3sc-cta-link:hover { color: rgba(255,255,255,0.72); border-color: rgba(255,255,255,0.18); }

  @media (max-width: 1000px) {
    .p3sc-hero { grid-template-columns: 1fr; }
    .p3sc-img-panel { height: 55vw; min-height: 320px; }
    .p3sc-hero-txt { padding: 52px 28px; }
    .p3sc-body-inner { grid-template-columns: 1fr; gap: 52px; padding: 64px 24px 80px; }
    .p3sc-h1, .p3sc-h1-accent { font-size: clamp(64px, 16vw, 110px); }
  }
`;

/* ICONS */
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
   Utilities
───────────────────────────────────────────── */
function hexToLuminance(hex: string) {
  const parsed = hex.replace("#", "");
  const bigint = parseInt(parsed.length === 3 ? parsed.split("").map(c => c + c).join("") : parsed, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;
  const srgb = [r, g, b].map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function Panama3SCPage() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const gsapLoaded = useRef(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // selected RAL colour (object from product.ralColours) or null
  const [selectedRal, setSelectedRal] = useState<{ ral: string; name: string; hex: string } | null>(null);

  /* Auto-advance slideshow */
  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % product.images.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  /* GSAP - down -> up reveal sequence (image up, overlays up, badge + text stagger) */
  useEffect(() => {
    if (gsapLoaded.current) return;
    gsapLoaded.current = true;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const hero = heroRef.current;
      if (!hero) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      const eyebrow = hero.querySelector(".p3sc-eyebrow");
      const h1row   = hero.querySelector(".p3sc-h1-row");
      const rule    = hero.querySelector(".p3sc-rule");
      const tagline = hero.querySelector(".p3sc-tagline");
      const prebar  = hero.querySelector(".p3sc-preorder-bar");
      const dims    = hero.querySelector(".p3sc-dims");
      const actions = hero.querySelector(".p3sc-hero-actions");
      const slidesWrap = hero.querySelector(".p3sc-slides");
      const doorLeft = hero.querySelector(".p3sc-door-left");
      const doorRight = hero.querySelector(".p3sc-door-right");
      const highlight = hero.querySelector(".p3sc-highlight-badge");

      // 1) Image slides up subtly
      tl.fromTo(
        slidesWrap,
        { y: 40, scale: 1.04, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.65 },
        0
      );

      // 2) Overlays slide up to reveal the image (down -> up reveal)
      if (doorLeft && doorRight) {
        tl.fromTo(
          [doorLeft, doorRight],
          { y: "0%" },
          { y: "-100%", duration: 0.75, ease: "power2.inOut" },
          0.35
        );
      }

      // 3) Highlight badge slides up
      if (highlight) {
        tl.fromTo(
          highlight,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45 },
          1.1
        );
      }

      // 4) Text stagger reveal
      tl.fromTo(
        [eyebrow, h1row, rule, tagline, prebar, dims, actions],
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.085 },
        0.85
      );

      /* Scroll-triggered reveals for sections */
      gsap.fromTo(".p3sc-spec-card", { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, stagger: 0.055, ease: "power2.out", scrollTrigger: { trigger: ".p3sc-specs-grid", start: "top 82%" } });
      gsap.fromTo(".p3sc-size-btn",  { scaleY: 0, opacity: 0, transformOrigin: "top" }, { scaleY: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: ".p3sc-sizes", start: "top 85%" } });
      gsap.fromTo(".p3sc-feat",      { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".p3sc-feats", start: "top 80%" } });
      gsap.fromTo(".p3sc-h2",        { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".p3sc-h2", start: "top 85%" } });
      gsap.fromTo(".p3sc-cta",       { y: 30, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: ".p3sc-cta", start: "top 85%" } });
    })();
  }, []);

  const prev = () => setActiveSlide(i => (i - 1 + product.images.length) % product.images.length);
  const next = () => setActiveSlide(i => (i + 1) % product.images.length);

  // chosen color text color for contrast
  const getButtonColors = (hex?: string) => {
    if (!hex) return { bg: T.red, color: "#fff", hover: T.red2 };
    const lum = hexToLuminance(hex);
    return { bg: hex, color: lum > 0.55 ? T.anthracite2 : "#fff", hover: hex };
  };

  const handleSelectRal = (c: { ral: string; name: string; hex: string }) => {
    setSelectedRal(c);
  };

  const mailtoWithRal = (baseSubject: string) => {
    const ralPart = selectedRal ? ` — RAL ${selectedRal.ral} ${selectedRal.name}` : "";
    return `mailto:sales@ilktechnology.com?subject=${encodeURIComponent(`${baseSubject}${ralPart} — ${product.name}`)}`;
  };

  return (
    <div className="p3sc">
      <style>{css}</style>

      {/* HERO */}
      <section className="p3sc-hero" ref={heroRef}>
        {/* Image panel */}
        <div className="p3sc-img-panel">
          <div className="p3sc-img-topline" />

          {/* Slideshow */}
          <div className="p3sc-slides">
            {product.images.map((src, i) => (
              <div key={i} className={`p3sc-slide${i === activeSlide ? " active" : ""}`}>
                <Image src={src} alt={`${product.name} view ${i + 1}`} fill quality={95} sizes="60vw" style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>

          <div className="p3sc-img-fade" />

          {/* Slide doors (we animate these upwards with GSAP) */}
          <div className="p3sc-door-left" />
          <div className="p3sc-door-right" />

          {/* Pre-order badge */}
          <div className="p3sc-preorder-badge">
            <div className="p3sc-preorder-badge-title">Pre-Order</div>
            <div className="p3sc-preorder-badge-lead">
              <Clock size={11} />
              {product.leadTime} lead time
            </div>
          </div>

          {/* Slide nav */}
          <div className="p3sc-slide-nav">
            <button className="p3sc-slide-btn" onClick={prev} aria-label="Previous"><ChevronLeft size={16} /></button>
            <div className="p3sc-slide-dots">
              {product.images.map((_, i) => (
                <div key={i} className={`p3sc-dot${i === activeSlide ? " active" : ""}`} onClick={() => setActiveSlide(i)} />
              ))}
            </div>
            <button className="p3sc-slide-btn" onClick={next} aria-label="Next"><ChevronRight size={16} /></button>
          </div>

          {/* Highlight badge */}
          <div className="p3sc-highlight-badge">
            <div className="p3sc-highlight-dot" />
            <span className="p3sc-highlight-label">{product.highlight}</span>
          </div>
        </div>

        {/* Text panel */}
        <div className="p3sc-hero-txt">
          <span className="p3sc-eyebrow">{product.range}</span>
          <div className="p3sc-h1-row">
            <span className="p3sc-h1">PANAMA 3</span>
            <span className="p3sc-h1-accent">SC.</span>
          </div>
          <div className="p3sc-rule" />
          <p className="p3sc-tagline">{product.subtitle}</p>

          {/* Pre-order bar */}
          <div className="p3sc-preorder-bar">
            <Clock size={18} className="p3sc-preorder-bar-icon" />
            <span className="p3sc-preorder-bar-text">
              <strong>Pre-Order Only</strong> — Lead time turnaround <strong>{product.leadTime}</strong> from confirmed order.
            </span>
          </div>

          <div className="p3sc-dims">
            {Object.entries(product.dimensions).map(([k, v]) => (
              <div key={k} className="p3sc-dim">
                <div className="p3sc-dim-k">{k}</div>
                <div className="p3sc-dim-v">
                  <span className="p3sc-dim-v-num">{v.value}</span>
                  <span className="p3sc-dim-v-unit">{v.unit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Colour selector in the enquiry section (hero) */}
          <div className="p3sc-color-select" aria-hidden={false}>
            <div className="p3sc-color-label">Select Colour</div>
            <div className="p3sc-color-options">
              {product.ralColours.map(c => (
                <button
                  key={c.ral}
                  onClick={() => handleSelectRal(c)}
                  className={`p3sc-color-btn${selectedRal?.ral === c.ral ? " active" : ""}`}
                  title={`Select RAL ${c.ral} — ${c.name}`}
                  aria-label={`Select RAL ${c.ral} ${c.name}`}
                  style={{ background: c.hex }}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSelectRal(c); } }}
                />
              ))}
            </div>
          </div>

          <div className="p3sc-hero-actions">
            {(() => {
              const { bg, color } = getButtonColors(selectedRal?.hex);
              return (
                <>
                  <a
                    href={mailtoWithRal("Pre-Order")}
                    className="p3sc-btn-primary"
                    style={{ background: bg, color }}
                  >
                    Pre-Order Enquiry
                  </a>
                  <a href={product.cataloguePdf} target="_blank" rel="noopener noreferrer" className="p3sc-btn-ghost">
                    Download Catalogue
                  </a>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="p3sc-ticker-wrap" aria-hidden>
        <div className="p3sc-ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="p3sc-ticker-item">
              {item}<span className="p3sc-ticker-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* BODY */}
      <section className="p3sc-body">
        <div className="p3sc-body-inner">
          {/* LEFT */}
          <div>
            <p className="p3sc-section-label">Available Widths</p>
            <div className="p3sc-sizes">
              {product.sizes.map(s => <div key={s} className="p3sc-size-btn">{s}</div>)}
            </div>

            {/* RAL Colours (static display now) */}
            <div className="p3sc-ral-section">
              <p className="p3sc-section-label" style={{ marginBottom: 16 }}>Available RAL Colours</p>
              <div className="p3sc-ral-swatches">
                {product.ralColours.map(c => (
                  <div key={c.ral} className="p3sc-ral-swatch" title={`RAL ${c.ral} — ${c.name}`}>
                    <div className={`p3sc-ral-circle${c.bordered ? " p3sc-ral-circle--bordered" : ""}`} style={{ background: c.hex }} />
                    <span className="p3sc-ral-code">RAL {c.ral}</span>
                    <span className="p3sc-ral-name">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 44 }}>
              <div className="p3sc-specs-header">
                <span className="p3sc-section-label" style={{ margin: 0 }}>Specifications</span>
                <span className="p3sc-specs-count">{product.specs.length} points</span>
              </div>
              <div className="p3sc-specs-grid">
                {product.specs.map(s => (
                  <div key={s.label} className="p3sc-spec-card">
                    <div className="p3sc-spec-icon">{ICONS[s.icon] ?? <Gauge {...ICON_P} />}</div>
                    <div className="p3sc-spec-body">
                      <div className="p3sc-spec-label">{s.label}</div>
                      <div className="p3sc-spec-value">{s.value}</div>
                    </div>
                    <div className="p3sc-spec-note">{s.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h2 className="p3sc-h2">
              EC FANS.<br />
              LOWER COSTS.<br />
              <span>BETTER CHILL.</span>
            </h2>
            <p className="p3sc-right-sub">{product.subtitle}</p>

            <div className="p3sc-feats">
              {product.features.map((f, i) => (
                <div key={i} className="p3sc-feat">
                  <div className="p3sc-feat-num">{f.num}</div>
                  <div>
                    <div className="p3sc-feat-title">{f.title}</div>
                    <div className="p3sc-feat-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p3sc-cta">
              <div className="p3sc-cta-overline">Pre-Order Now</div>
              <div className="p3sc-cta-heading">10-week lead time.<br />UK delivery included.</div>
              <p className="p3sc-cta-sub">
                This product is available to pre-order only. We&apos;ll confirm your order within one business day and keep you updated through production.
              </p>

              {/* Colour selector in the CTA enquiry area */}
              <div style={{ marginBottom: 12 }}>
                <div className="p3sc-color-select">
                  <div className="p3sc-color-label">Select Colour</div>
                  <div className="p3sc-color-options">
                    {product.ralColours.map(c => (
                      <button
                        key={c.ral}
                        onClick={() => handleSelectRal(c)}
                        className={`p3sc-color-btn${selectedRal?.ral === c.ral ? " active" : ""}`}
                        title={`Select RAL ${c.ral} — ${c.name}`}
                        aria-label={`Select RAL ${c.ral} ${c.name}`}
                        style={{ background: c.hex }}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSelectRal(c); } }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="p3sc-cta-actions">
                {(() => {
                  const { bg, color } = getButtonColors(selectedRal?.hex);
                  return (
                    <>
                      <a href={mailtoWithRal("Pre-Order Enquiry")} className="p3sc-btn-primary" style={{ background: bg, color }}>
                        Pre-Order Enquiry
                      </a>
                      <a href={product.cataloguePdf} target="_blank" rel="noopener noreferrer" className="p3sc-cta-link">
                        Download Catalogue →
                      </a>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}