"use client";

import { useEffect, useRef } from "react";
import {
  Thermometer, Snowflake, Lightbulb, DoorOpen,
  MonitorDot, ArrowDownToLine, LayoutList, Gauge,
} from "lucide-react";

const T = {
  white:    "#FFFFFF",
  bg:       "#F7F8FA",
  surface:  "#FFFFFF",
  gray50:   "#F0F2F5",
  gray100:  "#E4E7EC",
  gray200:  "#C9CDD6",
  gray400:  "#8A93A3",
  gray600:  "#4B5262",
  gray900:  "#111827",
  red:      "#C8102E",
  red2:     "#A10A22",
  border:   "rgba(17,24,39,0.08)",
  borderMd: "rgba(17,24,39,0.13)",
};

const product = {
  name:    "Osaka 2",
  range:   "Remote Multideck",
  colour:  "Elegant White",
  image:   "/pro2.png",
  cataloguePdf: "/catalogues/osaka2.pdf",
  subtitle: "Consistent chilled performance in an elegant white finish — built for modern retail environments that demand both reliability and style.",
  sizes: ["1250", "1875", "2500", "3750"],
  specs: [
    { label: "Temperature",    value: "+1 to +4 °C",              note: "Chilled",        icon: "temp",  idx: "01" },
    { label: "Cooling",        value: "Remote",                    note: "External cond.", icon: "cool",  idx: "02" },
    { label: "Lighting",       value: "LED Canopy",                note: "Low energy",     icon: "light", idx: "03" },
    { label: "Doors",          value: "Hinged dual-glass",         note: "Double-glazed",  icon: "door",  idx: "04" },
    { label: "Controller",     value: "Electronic",                note: "Smart ctrl",     icon: "ctrl",  idx: "05" },
    { label: "Pipework",       value: "Top entry",                 note: "Clean install",  icon: "pipe",  idx: "06" },
    { label: "Shelving",       value: "Base + 5 × 450 mm + EPOS", note: "Adj. levels",    icon: "shelf", idx: "07" },
    { label: "Solenoid Valve", value: "Not included",              note: "Simplified",     icon: "valve", idx: "08" },
  ],
  features: [
    { title: "Precision Temperature", desc: "Maintains +1 to +4 °C with uniform consistency across every shelf level." },
    { title: "Dual-Glass Doors",      desc: "Hinged double-glazed doors reduce energy loss while keeping product fully visible." },
    { title: "LED Canopy Lighting",   desc: "Engineered LEDs cast even, flattering light across shelves at minimal running cost." },
    { title: "Flexible Shelving",     desc: "Five adjustable 450 mm shelf levels on a robust base for any product range." },
  ],
};

const ICON_P = { size: 15, strokeWidth: 1.6, color: T.red } as const;
const ICONS: Record<string, React.ReactNode> = {
  temp:  <Thermometer     {...ICON_P} />,
  cool:  <Snowflake       {...ICON_P} />,
  light: <Lightbulb       {...ICON_P} />,
  door:  <DoorOpen        {...ICON_P} />,
  ctrl:  <MonitorDot      {...ICON_P} />,
  pipe:  <ArrowDownToLine {...ICON_P} />,
  shelf: <LayoutList      {...ICON_P} />,
  valve: <Gauge           {...ICON_P} />,
};

const css = `
  .p *, .p *::before, .p *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .p {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background: ${T.bg};
    color: ${T.gray900};
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ══════════════════════════════════════════
     SECTION 1 — CINEMATIC COVER
  ══════════════════════════════════════════ */
  .cover {
    position: relative;
    width: 100%;
    height: 100vh;
    min-height: 600px;
    overflow: hidden;
    background: ${T.gray900};
  }

  .cover-img {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  .cover-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 65% top;
    display: block;
    opacity: 0;
    transform: scale(1.06);
    transition: opacity 1.4s ease, transform 1.6s ease;
  }
  .cover-img img.loaded {
    opacity: 1;
    transform: scale(1);
  }

  .cover-veil {
    position: absolute;
    inset: 0;
    z-index: 1;
    background:
      linear-gradient(100deg, rgba(17,24,39,0.88) 0%, rgba(17,24,39,0.5) 55%, transparent 80%),
      linear-gradient(0deg, rgba(17,24,39,0.7) 0%, transparent 45%);
    pointer-events: none;
  }

  .cover::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: ${T.red};
    z-index: 10;
  }

  .cover-vert {
    position: absolute;
    left: 48px;
    top: 50%;
    transform: translateY(-50%) rotate(-90deg);
    transform-origin: center center;
    z-index: 5;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    white-space: nowrap;
    opacity: 0;
  }

  /* Main text block */
  .cover-content {
    position: absolute;
    bottom: 72px;
    left: 72px;
    z-index: 5;
    max-width: 640px;
  }

  .cover-eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: ${T.red};
    margin-bottom: 20px;
    opacity: 0;
    transform: translateY(24px);
  }
  .cover-eyebrow-line {
    width: 32px; height: 1.5px;
    background: ${T.red};
    flex-shrink: 0;
  }

  /* Title row: OSAKA + 2 inline */
  .cover-title-row {
    display: flex;
    align-items: flex-start;
    flex-wrap: nowrap;
    line-height: 0.82;
    margin-bottom: 24px;
  }
  .cover-name {
    font-size: clamp(64px, 12vw, 180px);
    font-weight: 700;
    line-height: 0.82;
    color: ${T.white};
    letter-spacing: -0.04em;
    opacity: 0;
    transform: translateY(40px);
    white-space: nowrap;
  }
  .cover-name-sub {
    font-size: clamp(64px, 12vw, 180px);
    font-weight: 300;
    font-style: italic;
    line-height: 0.82;
    color: ${T.red};
    letter-spacing: -0.04em;
    opacity: 0;
    transform: translateY(40px);
    white-space: nowrap;
    margin-left: 0.12em;
  }

  .cover-tagline {
    font-size: clamp(13px, 1.6vw, 17px);
    font-weight: 300;
    color: rgba(255,255,255,0.85);
    line-height: 1.7;
    max-width: 420px;
    margin-bottom: 44px;
    opacity: 0;
    transform: translateY(24px);
  }

  .cover-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    opacity: 0;
    transform: translateY(20px);
  }
  .btn-red {
    padding: 14px 28px;
    background: ${T.red};
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 2px;
    transition: background 0.22s, transform 0.18s;
    display: inline-flex; align-items: center; gap: 8px;
    font-family: inherit;
    border: none; cursor: pointer;
    white-space: nowrap;
  }
  .btn-red:hover { background: ${T.red2}; transform: translateY(-1px); }
  .btn-outline-white {
    padding: 13px 26px;
    background: transparent;
    color: rgba(255,255,255,0.7);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 2px;
    border: 1px solid rgba(255,255,255,0.2);
    transition: all 0.2s;
    display: inline-flex; align-items: center; gap: 8px;
    font-family: inherit; cursor: pointer;
    white-space: nowrap;
  }
  .btn-outline-white:hover {
    background: rgba(255,255,255,0.08);
    color: #fff;
    border-color: rgba(255,255,255,0.38);
  }

  /* Right-side vertical stats strip */
  .cover-stats {
    position: absolute;
    right: 52px;
    top: 50%;
    transform: translateY(calc(-50% + 20px));
    z-index: 5;
    display: flex;
    flex-direction: column;
    gap: 0;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px;
    overflow: hidden;
    backdrop-filter: blur(12px);
    background: rgba(17,24,39,0.4);
    opacity: 0;
  }
  .cover-stat {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    min-width: 140px;
    position: relative;
  }
  .cover-stat::before {
    content: "";
    position: absolute;
    left: 0; top: 20%; bottom: 20%;
    width: 2px;
    background: ${T.red};
    opacity: 0;
    transition: opacity 0.2s;
  }
  .cover-stat:hover::before { opacity: 1; }
  .cover-stat:last-child { border-bottom: none; }
  .cover-stat-val {
    font-size: 20px;
    font-weight: 700;
    color: ${T.white};
    letter-spacing: -0.02em;
    line-height: 1;
    margin-bottom: 5px;
  }
  .cover-stat-lbl {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
  }

  /* Scroll indicator */
  .cover-scroll {
    position: absolute;
    bottom: 40px;
    right: 52px;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0;
  }
  .cover-scroll-line {
    width: 1px;
    height: 48px;
    background: linear-gradient(180deg, rgba(255,255,255,0.4), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.4; transform: scaleY(1); }
    50%       { opacity: 1;   transform: scaleY(0.7) translateY(8px); }
  }

  /* ══════════════════════════════════════════
     SECTION 2 — SIZES BAND
  ══════════════════════════════════════════ */
  .sizes-band {
    background: ${T.surface};
    border-top: 1px solid ${T.border};
    border-bottom: 1px solid ${T.border};
    padding: 0;
    overflow: hidden;
    position: relative;
  }
  .sizes-band-inner {
    display: flex;
    align-items: stretch;
  }
  .sizes-label {
    flex-shrink: 0;
    padding: 0 32px;
    background: ${T.red};
    display: flex;
    align-items: center;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.9);
    white-space: nowrap;
    clip-path: polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%);
    padding-right: 48px;
  }
  .sizes-pills {
    display: flex;
    align-items: center;
    gap: 0;
    flex: 1;
    overflow: hidden;
  }
  .size-pill {
    flex: 1;
    padding: 24px 12px;
    text-align: center;
    border-right: 1px solid ${T.border};
    position: relative;
    cursor: default;
    overflow: hidden;
    transition: background 0.2s;
    min-width: 0;
  }
  .size-pill:last-child { border-right: none; }
  .size-pill::before {
    content: "";
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2.5px;
    background: ${T.red};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  .size-pill:hover { background: ${T.gray50}; }
  .size-pill:hover::before { transform: scaleX(1); }
  .size-pill-val {
    font-size: clamp(16px, 3vw, 22px);
    font-weight: 700;
    color: ${T.gray900};
    letter-spacing: -0.02em;
    line-height: 1;
    margin-bottom: 4px;
  }
  .size-pill-unit {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${T.gray400};
  }

  /* ══════════════════════════════════════════
     SECTION 3 — SPECS MANIFEST
  ══════════════════════════════════════════ */
  .manifest {
    padding: 110px 72px;
    background: ${T.bg};
    position: relative;
    overflow: hidden;
  }
  .manifest-inner {
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 96px;
    align-items: start;
  }
  .manifest-head {
    position: sticky;
    top: 40px;
  }
  .manifest-eyebrow {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: ${T.red};
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: 0;
    transform: translateX(-20px);
  }
  .manifest-eyebrow::before {
    content: "";
    width: 20px; height: 1.5px;
    background: ${T.red};
    flex-shrink: 0;
  }
  .manifest-title {
    font-size: clamp(36px, 5vw, 64px);
    font-weight: 700;
    line-height: 0.92;
    letter-spacing: -0.035em;
    color: ${T.gray900};
    margin-bottom: 28px;
    opacity: 0;
    transform: translateX(-20px);
  }
  .manifest-title em {
    font-style: italic;
    font-weight: 300;
    color: ${T.red};
  }
  .manifest-rule {
    width: 36px; height: 2px;
    background: ${T.red};
    margin-bottom: 28px;
    opacity: 0;
  }
  .manifest-sub {
    font-size: 14px;
    font-weight: 400;
    color: ${T.gray600};
    line-height: 1.75;
    margin-bottom: 44px;
    opacity: 0;
    transform: translateX(-16px);
  }
  .manifest-cta-inline {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${T.gray900};
    text-decoration: none;
    border-bottom: 1.5px solid ${T.gray900};
    padding-bottom: 2px;
    transition: color 0.2s, border-color 0.2s;
    opacity: 0;
  }
  .manifest-cta-inline:hover {
    color: ${T.red};
    border-color: ${T.red};
  }
  .manifest-rows {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .manifest-row {
    display: grid;
    grid-template-columns: 44px 1fr auto;
    gap: 16px;
    align-items: center;
    padding: 22px 0;
    border-bottom: 1px solid ${T.border};
    position: relative;
    cursor: default;
    overflow: hidden;
    opacity: 0;
    transform: translateX(24px);
  }
  .manifest-row:first-child { border-top: 1px solid ${T.border}; }
  .manifest-row::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${T.surface};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s ease;
    z-index: -1;
  }
  .manifest-row:hover::before { transform: scaleX(1); }
  .manifest-row-idx {
    font-size: 11px;
    font-weight: 700;
    color: ${T.gray200};
    letter-spacing: 0.06em;
    font-variant-numeric: tabular-nums;
    transition: color 0.2s;
  }
  .manifest-row:hover .manifest-row-idx { color: ${T.red}; }
  .manifest-row-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${T.gray400};
    margin-bottom: 3px;
  }
  .manifest-row-value {
    font-size: 15px;
    font-weight: 600;
    color: ${T.gray900};
    letter-spacing: -0.01em;
  }
  .manifest-row-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .manifest-row-icon {
    width: 34px; height: 34px;
    border-radius: 6px;
    background: rgba(200,16,46,0.06);
    border: 1px solid rgba(200,16,46,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s;
  }
  .manifest-row:hover .manifest-row-icon {
    background: rgba(200,16,46,0.1);
  }
  .manifest-row-note {
    font-size: 10px;
    font-weight: 500;
    color: ${T.gray400};
    letter-spacing: 0.06em;
    white-space: nowrap;
    min-width: 80px;
    text-align: right;
  }

  /* ══════════════════════════════════════════
     SECTION 4 — FEATURES EDITORIAL
  ══════════════════════════════════════════ */
  .editorial {
    background: ${T.surface};
    border-top: 1px solid ${T.border};
    padding: 0 72px;
  }
  .editorial-inner {
    max-width: 1280px;
    margin: 0 auto;
  }
  .editorial-header {
    padding: 80px 0 60px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    border-bottom: 1px solid ${T.border};
    gap: 40px;
  }
  .editorial-header-title {
    font-size: clamp(32px, 5vw, 62px);
    font-weight: 700;
    line-height: 0.9;
    letter-spacing: -0.035em;
    color: ${T.gray900};
    opacity: 0;
    transform: translateY(24px);
  }
  .editorial-header-title em {
    font-style: italic;
    font-weight: 300;
    color: transparent;
    -webkit-text-stroke: 1.5px ${T.red};
  }
  .editorial-header-meta {
    text-align: right;
    flex-shrink: 0;
    opacity: 0;
    transform: translateY(16px);
  }
  .editorial-header-count {
    font-size: 52px;
    font-weight: 700;
    color: ${T.red};
    letter-spacing: -0.04em;
    line-height: 1;
  }
  .editorial-header-count-lbl {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${T.gray400};
  }
  .editorial-feat {
    display: grid;
    grid-template-columns: 80px 1fr 1fr;
    gap: 48px;
    padding: 52px 0;
    border-bottom: 1px solid ${T.border};
    align-items: start;
    cursor: default;
    opacity: 0;
    transform: translateY(28px);
    position: relative;
  }
  .editorial-feat::after {
    content: "";
    position: absolute;
    bottom: -1px; left: 0; right: 0;
    height: 1px;
    background: ${T.red};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }
  .editorial-feat:hover::after { transform: scaleX(1); }
  .editorial-feat-num {
    font-size: 52px;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 0.85;
    color: ${T.gray100};
    transition: color 0.25s;
    padding-top: 4px;
  }
  .editorial-feat:hover .editorial-feat-num { color: ${T.red}; }
  .editorial-feat-title {
    font-size: clamp(18px, 2.4vw, 28px);
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 1.1;
    color: ${T.gray900};
    padding-top: 8px;
  }
  .editorial-feat-desc {
    font-size: 14px;
    font-weight: 400;
    color: ${T.gray600};
    line-height: 1.75;
    padding-top: 10px;
  }

  /* ══════════════════════════════════════════
     SECTION 5 — DARK CTA PANEL
  ══════════════════════════════════════════ */
  .cta-panel {
    background: ${T.gray900};
    padding: 120px 72px;
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(32px);
  }
  .cta-panel::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 28px,
        rgba(255,255,255,0.018) 28px,
        rgba(255,255,255,0.018) 29px
      );
    pointer-events: none;
  }
  .cta-panel-ghost {
    position: absolute;
    bottom: -30px;
    right: -20px;
    font-size: clamp(120px, 18vw, 220px);
    font-weight: 700;
    letter-spacing: -0.05em;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,0.05);
    pointer-events: none;
    user-select: none;
  }
  .cta-panel-inner {
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
  .cta-panel-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: ${T.red};
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .cta-panel-label::before {
    content: "";
    width: 28px; height: 1.5px;
    background: ${T.red};
    flex-shrink: 0;
  }
  .cta-panel-title {
    font-size: clamp(36px, 5.5vw, 68px);
    font-weight: 700;
    line-height: 0.9;
    letter-spacing: -0.04em;
    color: ${T.white};
    margin-bottom: 8px;
  }
  .cta-panel-title-ghost {
    font-size: clamp(36px, 5.5vw, 68px);
    font-weight: 300;
    font-style: italic;
    line-height: 0.9;
    letter-spacing: -0.04em;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,0.25);
    margin-bottom: 44px;
  }
  .cta-panel-sub {
    font-size: 16px;
    font-weight: 300;
    color: rgba(255,255,255,0.5);
    line-height: 1.75;
    margin-bottom: 48px;
  }
  .cta-panel-actions {
    display: flex;
    flex-direction: column;
    gap: 14px;
    align-items: flex-start;
    width: 100%;
  }
  .cta-link-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.2s;
    background: none; border-top: none; border-left: none; border-right: none;
    font-family: inherit;
  }
  .cta-link-row:last-child { border-bottom: 1px solid rgba(255,255,255,0.06); }
  .cta-link-row:hover { opacity: 0.75; }
  .cta-link-row-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .cta-link-row-icon {
    width: 40px; height: 40px;
    border-radius: 4px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .cta-link-row-label {
    font-size: 13px;
    font-weight: 600;
    color: ${T.white};
    letter-spacing: -0.01em;
    margin-bottom: 2px;
  }
  .cta-link-row-sub {
    font-size: 11px;
    font-weight: 400;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.04em;
  }
  .cta-link-row-arrow {
    font-size: 18px;
    color: rgba(255,255,255,0.2);
    flex-shrink: 0;
  }

  /* ══════════════════════════════════════════
     RESPONSIVE — TABLET (≤960px)
  ══════════════════════════════════════════ */
  @media (max-width: 960px) {
    /* Cover */
    .cover { height: 100svh; min-height: 580px; }
    .cover-content { left: 32px; right: 32px; bottom: 48px; max-width: none; }
    .cover-vert { display: none; }
    .cover-stats { display: none; }
    .cover-scroll { right: 32px; }

    /* Sizes band */
    .sizes-label { display: none; }
    .size-pill { padding: 20px 8px; }

    /* Manifest */
    .manifest { padding: 72px 32px; }
    .manifest-inner { grid-template-columns: 1fr; gap: 48px; }
    .manifest-head { position: static; }
    .manifest-row { grid-template-columns: 40px 1fr auto; gap: 12px; }
    .manifest-row-note { display: none; }

    /* Editorial */
    .editorial { padding: 0 32px; }
    .editorial-header { flex-direction: column; align-items: flex-start; gap: 20px; padding: 60px 0 40px; }
    .editorial-feat { grid-template-columns: 60px 1fr; gap: 20px 24px; padding: 36px 0; }
    .editorial-feat-desc { grid-column: 2; }

    /* CTA */
    .cta-panel { padding: 80px 32px; }
    .cta-panel-inner { grid-template-columns: 1fr; gap: 48px; }
  }

  /* ══════════════════════════════════════════
     RESPONSIVE — MOBILE (≤600px)
  ══════════════════════════════════════════ */
  @media (max-width: 600px) {
    /* Cover */
    .cover-content { left: 20px; right: 20px; bottom: 36px; }
    .cover-eyebrow { margin-bottom: 12px; font-size: 9px; }
    .cover-tagline { font-size: 13px; margin-bottom: 28px; max-width: 100%; }
    .cover-actions { flex-direction: column; align-items: flex-start; gap: 10px; }
    .btn-red, .btn-outline-white { width: 100%; justify-content: center; padding: 14px 20px; }

    /* Sizes */
    .sizes-band-inner { flex-direction: column; }
    .sizes-pills { flex-wrap: wrap; }
    .size-pill { flex: 1 1 50%; border-bottom: 1px solid ${T.border}; }

    /* Manifest */
    .manifest { padding: 56px 20px; }
    .manifest-row { grid-template-columns: 36px 1fr 34px; gap: 10px; }
    .manifest-row-note { display: none; }

    /* Editorial */
    .editorial { padding: 0 20px; }
    .editorial-header { padding: 48px 0 32px; }
    .editorial-feat { grid-template-columns: 48px 1fr; gap: 16px 16px; padding: 28px 0; }
    .editorial-feat-num { font-size: 36px; }
    .editorial-feat-desc { grid-column: 1 / -1; padding-top: 4px; }

    /* CTA */
    .cta-panel { padding: 60px 20px; }
    .cta-panel-title-ghost { margin-bottom: 32px; }
    .cta-panel-sub { font-size: 14px; margin-bottom: 32px; }
    .cta-link-row-sub { display: none; }
  }
`;

export default function Osaka2Page() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img) {
      if (img.complete) img.classList.add("loaded");
      else img.onload = () => img.classList.add("loaded");
    }

    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Cover entrance
      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(".cover-vert",     { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.3)
        .to(".cover-eyebrow",  { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0.4)
        .to(".cover-name",     { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }, 0.5)
        .to(".cover-name-sub", { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }, 0.58)
        .to(".cover-tagline",  { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" }, 0.72)
        .to(".cover-actions",  { opacity: 1, y: 0, duration: 0.6,  ease: "power2.out" }, 0.84)
        .to(".cover-stats",    { opacity: 1, duration: 0.7, ease: "power3.out" }, 0.5)
        .to(".cover-scroll",   { opacity: 1, duration: 0.5, ease: "power2.out" }, 1.2);

      // Manifest
      gsap.to([".manifest-eyebrow", ".manifest-title", ".manifest-sub", ".manifest-cta-inline"], {
        opacity: 1, x: 0,
        duration: 0.65, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: ".manifest", start: "top 75%" }
      });
      gsap.to(".manifest-rule", {
        opacity: 1, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: ".manifest-rule", start: "top 85%" }
      });
      gsap.to(".manifest-row", {
        opacity: 1, x: 0,
        duration: 0.5, stagger: 0.06, ease: "power2.out",
        scrollTrigger: { trigger: ".manifest-rows", start: "top 80%" }
      });

      // Editorial
      gsap.to(".editorial-header-title", {
        opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
        scrollTrigger: { trigger: ".editorial-header", start: "top 82%" }
      });
      gsap.to(".editorial-header-meta", {
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.12,
        scrollTrigger: { trigger: ".editorial-header", start: "top 82%" }
      });
      gsap.to(".editorial-feat", {
        opacity: 1, y: 0,
        duration: 0.65, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: ".editorial-feat", start: "top 82%" }
      });

      // CTA
      gsap.to(".cta-panel", {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".cta-panel", start: "top 80%" }
      });
    };

    load();
  }, []);

  return (
    <div className="p">
      <style>{css}</style>

      {/* ══ SECTION 1: COVER ══ */}
      <section className="cover">
        <div className="cover-img">
          <img ref={imgRef} src={product.image} alt={product.name} />
        </div>
        <div className="cover-veil" />

        <div className="cover-content">
          <div className="cover-eyebrow">
            <div className="cover-eyebrow-line" />
            {product.range}
          </div>

          {/* OSAKA 2 inline */}
          <div className="cover-title-row">
            <div className="cover-name">OSAKA</div>
            <span className="cover-name-sub">2.</span>
          </div>

          <p className="cover-tagline">{product.subtitle}</p>
          <div className="cover-actions">
            <a
              href={`mailto:sales@ilktechnology.com?subject=Quote — ${product.name}`}
              className="btn-red"
            >
              Request a Quote
            </a>
            <a
              href={product.cataloguePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-white"
            >
              Download Catalogue
            </a>
          </div>
        </div>

        {/* Stats strip — hidden on mobile/tablet */}
        <div className="cover-stats">
          {[
            { val: "+1–4°C", lbl: "Temp. range" },
            { val: "203 cm", lbl: "Height"       },
            { val: "75 cm",  lbl: "Depth"        },
            { val: "5",      lbl: "Shelf levels" },
            { val: "4",      lbl: "Widths"       },
            { val: "LED",    lbl: "Lighting"     },
          ].map(s => (
            <div key={s.lbl} className="cover-stat">
              <div className="cover-stat-val">{s.val}</div>
              <div className="cover-stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>

        <div className="cover-scroll">
          <div className="cover-scroll-line" />
        </div>
      </section>

      {/* ══ SECTION 2: SIZES BAND ══ */}
      <div className="sizes-band">
        <div className="sizes-band-inner">
          <div className="sizes-label">Available widths</div>
          <div className="sizes-pills">
            {product.sizes.map(s => (
              <div key={s} className="size-pill">
                <div className="size-pill-val">{s}</div>
                <div className="size-pill-unit">mm</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ SECTION 3: SPECS MANIFEST ══ */}
      <section className="manifest">
        <div className="manifest-inner">
          <div className="manifest-head">
            <div className="manifest-eyebrow">Specifications</div>
            <div className="manifest-title">
              Every<br />
              detail.<br />
              <em>Specified.</em>
            </div>
            <div className="manifest-rule" />
            <p className="manifest-sub">
              Eight technical points — each one chosen to ensure the Osaka 2 performs flawlessly in your retail environment.
            </p>
            <a
              href={product.cataloguePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="manifest-cta-inline"
            >
              Full catalogue →
            </a>
          </div>

          <div className="manifest-rows">
            {product.specs.map(s => (
              <div key={s.label} className="manifest-row">
                <div className="manifest-row-idx">{s.idx}</div>
                <div>
                  <div className="manifest-row-label">{s.label}</div>
                  <div className="manifest-row-value">{s.value}</div>
                </div>
                <div className="manifest-row-right">
                  <div className="manifest-row-note">{s.note}</div>
                  <div className="manifest-row-icon">
                    {ICONS[s.icon] ?? <Gauge {...ICON_P} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 4: EDITORIAL FEATURES ══ */}
      <section className="editorial">
        <div className="editorial-inner">
          <div className="editorial-header">
            <div className="editorial-header-title">
              Built for<br /><em>retail</em><br />performance.
            </div>
            <div className="editorial-header-meta">
              <div className="editorial-header-count">04</div>
              <div className="editorial-header-count-lbl">Key features</div>
            </div>
          </div>

          {product.features.map((f, i) => (
            <div key={i} className="editorial-feat">
              <div className="editorial-feat-num">0{i + 1}</div>
              <div className="editorial-feat-title">{f.title}</div>
              <div className="editorial-feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SECTION 5: DARK CTA PANEL ══ */}
      <section className="cta-panel">
        <div className="cta-panel-ghost">O2</div>
        <div className="cta-panel-inner">
          <div className="cta-panel-left">
            <div className="cta-panel-label">Ready to order</div>
            <div className="cta-panel-title">Order.<br />Install.</div>
            <div className="cta-panel-title-ghost">Perform.</div>
          </div>

          <div className="cta-panel-right">
            <p className="cta-panel-sub">
              In stock and ready to deliver across the UK. Professional installation available. We respond within one business day with a tailored proposal for your store layout.
            </p>
            <div className="cta-panel-actions">
              <a
                href={`mailto:sales@ilktechnology.com?subject=Quote Request — ${product.name}`}
                className="cta-link-row"
                style={{ textDecoration: "none" }}
              >
                <div className="cta-link-row-left">
                  <div className="cta-link-row-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.red} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <div className="cta-link-row-label">Request a Quote</div>
                    <div className="cta-link-row-sub">sales@ilktechnology.com</div>
                  </div>
                </div>
                <div className="cta-link-row-arrow">→</div>
              </a>

              <a
                href={product.cataloguePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-link-row"
                style={{ textDecoration: "none" }}
              >
                <div className="cta-link-row-left">
                  <div className="cta-link-row-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.red} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7,10 12,15 17,10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </div>
                  <div>
                    <div className="cta-link-row-label">Download Catalogue</div>
                    <div className="cta-link-row-sub">osaka2.pdf — Full spec sheet</div>
                  </div>
                </div>
                <div className="cta-link-row-arrow">→</div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}