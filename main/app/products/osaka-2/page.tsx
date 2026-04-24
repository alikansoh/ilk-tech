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
  GitMerge,
} from "lucide-react";

/* ─────────────────────────────────────────────
   TOKENS — light palette (Osaka 2 colours)
───────────────────────────────────────────── */
const T = {
  bg:          "#F7F8FA",
  surface:     "#FFFFFF",
  gray50:      "#F0F2F5",
  gray100:     "#E4E7EC",
  gray200:     "#C9CDD6",
  gray400:     "#8A93A3",
  gray600:     "#4B5262",
  gray900:     "#111827",
  red:         "#C8102E",
  red2:        "#A10A22",
  white:       "#FFFFFF",
  border:      "rgba(17,24,39,0.08)",
  borderMd:    "rgba(17,24,39,0.13)",
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const product = {
  name:     "Osaka 2",
  range:    "Remote Multideck",
  colour:   "Elegant White",
  image:    "/pro2.png",
  cataloguePdf: "/catalogues/osaka2.pdf",
  sizes:    ["1250mm", "1875mm", "2500mm", "3750mm"],
  dimensions: { Height: { value: "203", unit: "cm" }, Depth: { value: "75", unit: "cm" } },
  subtitle: "The Osaka 2 in Elegant White brings refined clarity to the chilled aisle — multiplexed system compatibility, dual-glass doors, and precision temperature control in one clean, authoritative package.",
  specs: [
    { label: "Temperature",    value: "+1 to +4 °C",              note: "Chilled range",      icon: "temp"  },
    { label: "Cooling",        value: "Remote",                   note: "External condenser", icon: "cool"  },
    { label: "Lighting",       value: "LED canopy",               note: "Low energy",         icon: "light" },
    { label: "Doors",          value: "Hinged dual-glass",        note: "Double-glazed",      icon: "door"  },
    { label: "Controller",     value: "Electronic",               note: "Smart control",      icon: "ctrl"  },
    { label: "Pipework",       value: "Top entry",                note: "Clean install",      icon: "pipe"  },
    { label: "Shelving",       value: "Base + 5 × 450 mm + EPOS",note: "Adj. levels",        icon: "shelf" },
    { label: "Multiplexed",    value: "Compatible",               note: "Shared system",      icon: "mplex" },
    { label: "End Walls",      value: "Solid or Mirrored",        note: "Your choice",        icon: "end"   },
    { label: "Solenoid Valve", value: "Not included",             note: "Simplified system",  icon: "valve" },
  ],
  features: [
    { num: "01", title: "Elegant White Finish",   desc: "The crisp white powder coat brings a clean, premium feel to any retail environment — bright, approachable, designed to let your products take centre stage." },
    { num: "02", title: "Multiplexed Compatible", desc: "Designed to run on a shared refrigeration system, the Osaka 2 integrates seamlessly into multiplexed store setups — reducing plant room complexity and overall running costs." },
    { num: "03", title: "Dual-Glass Doors",       desc: "Hinged double-glazed doors minimise energy loss while keeping every product fully visible, uncompromised from every angle." },
    { num: "04", title: "Flexible Configuration", desc: "Choice of solid or mirrored end walls, five adjustable 450 mm shelves, and EPOS rail — configure precisely for your range and space." },
  ],
};

const TICKER_ITEMS = [
  "Elegant White",
  "Remote Cooling",
  "Multiplexed Compatible",
  "Dual Glass Doors",
  "+1 to +4 °C",
  "Fast UK Delivery",
  "Professional Installation",
  "5 Shelf Levels",
  "LED Canopy",
  "Solid end walls",
];

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300;1,9..40,400&display=swap');

  .o2 *, .o2 *::before, .o2 *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .o2 {
    font-family: 'DM Sans', system-ui, sans-serif;
    background: ${T.bg};
    color: ${T.gray900};
    min-height: 100vh;
    overflow-x: hidden;
  }

  .o2::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.018;
    background-size: 180px 180px;
  }

  .o2-hero {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
  }

  .o2-hero-img {
    position: relative;
    overflow: hidden;
    background: ${T.white};
  }

  .o2-hero-img::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: ${T.red};
    z-index: 20;
  }

  .o2-hero-img-inner {
    position: absolute;
    inset: 0;
    z-index: 1;
    will-change: transform;
    opacity: 1;
  }
  .o2-hero-img-inner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    backface-visibility: hidden;
  }

  /* ── Sliding DOORS ── */
  .o2-doors {
    position: absolute;
    inset: 0;
    z-index: 10;
    pointer-events: none;
  }

  .o2-door {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    background: ${T.white};
    box-shadow: 0 6px 30px rgba(17,24,39,0.06);
    will-change: transform;
    opacity: 1;
  }
  .o2-door-left  { left: 0; }
  .o2-door-right { right: 0; }

  .o2-door-handle {
    position: absolute;
    top: 52%;
    width: 8px;
    height: 28px;
    background: ${T.gray200};
    border-radius: 3px;
    transform: translateX(-50%);
    box-shadow: 0 2px 6px rgba(17,24,39,0.06);
    opacity: 0.9;
  }

  .o2-colour-badge {
    position: absolute;
    bottom: 40px;
    left: 40px;
    z-index: 15;
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(10px);
    border: 1px solid ${T.borderMd};
    border-radius: 40px;
    padding: 10px 20px 10px 12px;
    opacity: 0;
    transform: translateY(12px);
  }
  .o2-colour-swatch {
    width: 20px; height: 20px;
    border-radius: 50%;
    background: ${T.white};
    border: 1.5px solid ${T.gray200};
    box-shadow: inset 0 0 0 5px ${T.gray50};
    flex-shrink: 0;
  }
  .o2-colour-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${T.gray900};
  }

  .o2-hero-txt { display:flex; flex-direction:column; justify-content:center; padding:80px 72px 80px 64px; position:relative; z-index:1; }
  .o2-eyebrow { font-size:10px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:${T.red}; margin-bottom:24px; display:flex; align-items:center; gap:12px; opacity:0; }
  .o2-eyebrow::before { content:""; width:28px; height:1.5px; background:${T.red}; flex-shrink:0; }

  /* OSAKA 2 on one line */
  .o2-h1-row {
    display: flex;
    align-items: baseline;
    line-height: 0.85;
    margin-bottom: 40px;
    opacity: 0;
  }
  .o2-h1 { font-family:'Bebas Neue', sans-serif; font-size:clamp(110px,13vw,170px); line-height:0.85; color:${T.gray900}; letter-spacing:0.01em; }
  .o2-h1-accent { font-family:'Bebas Neue', sans-serif; font-size:clamp(110px,13vw,170px); line-height:0.85; color:transparent; -webkit-text-stroke:1.5px ${T.red}; margin-left:16px; }

  .o2-rule { width:48px; height:1px; background:${T.gray200}; margin-bottom:36px; opacity:0; }
  .o2-tagline { font-size:clamp(15px,1.8vw,18px); font-weight:300; color:${T.gray600}; line-height:1.65; max-width:500px; margin-bottom:52px; opacity:0; }

  /* Dimensions box — value + unit on same line */
  .o2-dims { display:flex; gap:0; margin-bottom:52px; border:1px solid ${T.borderMd}; border-radius:8px; overflow:hidden; max-width:280px; opacity:0; }
  .o2-dim { flex:1; padding:18px 24px; border-right:1px solid ${T.border}; background:${T.surface}; } .o2-dim:last-child{ border-right:none; }
  .o2-dim-k { font-size:9px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:${T.red}; margin-bottom:6px; }
  .o2-dim-v { display:flex; align-items:baseline; gap:4px; line-height:1; }
  .o2-dim-v-num { font-size:26px; font-weight:600; color:${T.gray900}; letter-spacing:-0.01em; }
  .o2-dim-v-unit { font-size:13px; font-weight:500; color:${T.gray400}; letter-spacing:0.04em; }

  .o2-hero-actions{ display:flex; align-items:center; gap:20px; opacity:0; }
  .o2-btn-primary{ padding:15px 30px; background:${T.red}; color:#fff; font-size:11px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; border-radius:3px; border:none; display:inline-flex; gap:10px; cursor:pointer; font-family:'DM Sans',sans-serif; transition:background .22s, transform .18s; }
  .o2-btn-primary:hover{ background:${T.red2}; transform:translateY(-1px); }
  .o2-btn-ghost{ padding:14px 28px; background:transparent; color:${T.gray600}; font-size:11px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; border-radius:3px; border:1px solid ${T.borderMd}; display:inline-flex; gap:10px; cursor:pointer; transition:all .22s; }
  .o2-btn-ghost:hover{ background:${T.gray50}; color:${T.gray900}; border-color:${T.gray200}; }

  .o2-ticker-wrap{ position:relative; z-index:1; overflow:hidden; border-top:1px solid ${T.border}; border-bottom:1px solid ${T.border}; background:${T.red}; padding:12px 0; }
  .o2-ticker-track{ display:flex; width:max-content; animation:o2-ticker 22s linear infinite; will-change:transform; }
  .o2-ticker-item{ font-family:'Bebas Neue',sans-serif; font-size:13px; letter-spacing:0.2em; color:rgba(255,255,255,0.9); padding:0 32px; white-space:nowrap; display:flex; align-items:center; gap:32px; }
  .o2-ticker-dot{ width:4px; height:4px; border-radius:50%; background:rgba(255,255,255,0.5); flex-shrink:0; }
  @keyframes o2-ticker{ 0%{ transform:translateX(0); } 100%{ transform:translateX(-50%); } }

  .o2-body{ position:relative; z-index:1; }
  .o2-body-inner{ max-width:1360px; margin:0 auto; padding:110px 64px 130px; display:grid; grid-template-columns:1fr 1.45fr; gap:100px; align-items:start; }

  .o2-section-label{ font-size:9px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:${T.red}; margin-bottom:18px; display:flex; align-items:center; gap:10px; }
  .o2-section-label::before{ content:""; width:18px; height:1.5px; background:${T.red}; flex-shrink:0; }

  .o2-sizes{ display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:52px; }
  .o2-size-btn{ padding:16px; font-size:13px; font-weight:500; letter-spacing:0.06em; color:${T.gray600}; background:${T.surface}; border:1px solid ${T.border}; border-radius:5px; text-align:center; transition:all .2s; cursor:default; font-family:'DM Sans',sans-serif; }
  .o2-size-btn:hover{ background:${T.gray50}; border-color:${T.borderMd}; color:${T.gray900}; }

  .o2-specs-header{ display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
  .o2-specs-count{ font-size:10px; font-weight:700; color:${T.red}; background:rgba(200,16,46,0.08); border:1px solid rgba(200,16,46,0.14); border-radius:20px; padding:4px 12px; letter-spacing:0.08em; }
  .o2-specs-grid{ display:flex; flex-direction:column; gap:5px; }
  .o2-spec-card{ display:flex; align-items:center; gap:14px; background:${T.surface}; border:1px solid ${T.border}; border-radius:8px; padding:13px 16px; transition:background .2s, border-color .2s, transform .2s; position:relative; overflow:hidden; cursor:default; }
  .o2-spec-card::before{ content:""; position:absolute; left:0; top:0; bottom:0; width:2px; background:${T.red}; opacity:0; transition:opacity .2s; }
  .o2-spec-card:hover{ background:${T.gray50}; border-color:${T.borderMd}; transform:translateX(3px); }
  .o2-spec-card:hover::before{ opacity:1; }
  .o2-spec-icon{ width:38px; height:38px; border-radius:8px; background:rgba(200,16,46,0.06); border:1px solid rgba(200,16,46,0.1); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .o2-spec-body{ flex:1; min-width:0; }
  .o2-spec-label{ font-size:9px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:${T.gray400}; margin-bottom:3px; }
  .o2-spec-value{ font-size:13px; font-weight:600; color:${T.gray900}; letter-spacing:-0.01em; }
  .o2-spec-note{ font-size:10px; font-weight:500; color:${T.gray400}; letter-spacing:0.06em; text-align:right; flex-shrink:0; white-space:nowrap; }

  .o2-h2{ font-family:'Bebas Neue',sans-serif; font-size:clamp(58px,6.5vw,88px); line-height:0.88; color:${T.gray900}; margin-bottom:32px; letter-spacing:0.01em; }
  .o2-h2 span{ color:transparent; -webkit-text-stroke:1.5px ${T.red}; }
  .o2-right-sub{ font-size:clamp(15px,1.7vw,17px); font-weight:300; color:${T.gray600}; line-height:1.7; max-width:580px; margin-bottom:60px; }

  .o2-feats{ margin-bottom:68px; }
  .o2-feat{ display:grid; grid-template-columns:44px 1fr; gap:24px; padding:28px 0; border-bottom:1px solid ${T.border}; align-items:start; position:relative; overflow:hidden; cursor:default; }
  .o2-feat:first-child{ border-top:1px solid ${T.border}; }
  .o2-feat::before{ content:""; position:absolute; top:0; left:-100%; width:100%; height:100%; background:rgba(200,16,46,0.03); transition:left .4s ease; pointer-events:none; }
  .o2-feat:hover::before{ left:0; }
  .o2-feat-num{ font-family:'Bebas Neue',sans-serif; font-size:28px; color:${T.red}; line-height:1; padding-top:2px; opacity:0.6; }
  .o2-feat-title{ font-size:14px; font-weight:700; color:${T.gray900}; margin-bottom:7px; letter-spacing:-0.01em; }
  .o2-feat-desc{ font-size:13px; font-weight:300; color:${T.gray600}; line-height:1.65; }

  .o2-cta{ border:1px solid ${T.borderMd}; border-radius:8px; padding:44px; background:${T.surface}; position:relative; overflow:hidden; }
  .o2-cta::before{ content:""; position:absolute; top:0; left:0; bottom:0; width:3px; background:${T.red}; }
  .o2-cta-overline{ font-size:9px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:${T.red}; margin-bottom:16px; }
  .o2-cta-heading{ font-family:'Bebas Neue',sans-serif; font-size:38px; color:${T.gray900}; line-height:1.1; margin-bottom:12px; letter-spacing:0.03em; }
  .o2-cta-sub{ font-size:13px; font-weight:300; color:${T.gray600}; line-height:1.7; margin-bottom:30px; max-width:380px; }
  .o2-cta-actions{ display:flex; align-items:center; gap:20px; flex-wrap:wrap; }
  .o2-cta-link{ font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:${T.gray400}; text-decoration:none; display:inline-flex; align-items:center; gap:6px; transition:color .2s; border-bottom:1px solid transparent; }
  .o2-cta-link:hover{ color:${T.gray900}; border-color:${T.gray200}; }

  @media (max-width: 1000px) {
    .o2-hero { grid-template-columns: 1fr; }
    .o2-hero-img { height: 55vw; min-height: 320px; }
    .o2-hero-txt { padding: 52px 32px; }
    .o2-body-inner { grid-template-columns: 1fr; gap: 60px; padding: 72px 28px 80px; }
    .o2-h1, .o2-h1-accent { font-size: clamp(80px, 18vw, 130px); }
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
  mplex: <GitMerge        {...ICON_P} />,
  end:   <Layers          {...ICON_P} />,
  valve: <Gauge           {...ICON_P} />,
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function Osaka2Page() {
  const leftDoorRef  = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const heroRef      = useRef<HTMLDivElement>(null);
  const gsapLoaded   = useRef(false);

  useEffect(() => {
    if (gsapLoaded.current) return;
    gsapLoaded.current = true;

    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const hero  = heroRef.current;
      const left  = leftDoorRef.current;
      const right = rightDoorRef.current;
      const badge = badgeRef.current;
      if (!hero || !left || !right) return;

      const eyebrow  = hero.querySelector(".o2-eyebrow");
      const h1row    = hero.querySelector(".o2-h1-row");
      const rule     = hero.querySelector(".o2-rule");
      const tagline  = hero.querySelector(".o2-tagline");
      const dims     = hero.querySelector(".o2-dims");
      const actions  = hero.querySelector(".o2-hero-actions");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Doors slide apart
      tl.to(left,  { xPercent: -100, duration: 0.85, ease: "power2.inOut" }, 0);
      tl.to(right, { xPercent:  100, duration: 0.85, ease: "power2.inOut" }, 0);

      // 2. Badge slides up after doors finish
      tl.fromTo(
        badge,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45 },
        0.9
      );

      // 3. Text cascade
      tl.fromTo(
        [eyebrow, h1row, rule, tagline, dims, actions],
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
        0.75
      );

      /* ── SCROLL ANIMATIONS ── */
      gsap.fromTo(".o2-spec-card",
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.55, stagger: 0.055, ease: "power2.out",
          scrollTrigger: { trigger: ".o2-specs-grid", start: "top 82%" } }
      );
      gsap.fromTo(".o2-size-btn",
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, stagger: 0.07, ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".o2-sizes", start: "top 85%" } }
      );
      gsap.fromTo(".o2-feat",
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ".o2-feats", start: "top 80%" } }
      );
      gsap.fromTo(".o2-h2",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".o2-h2", start: "top 85%" } }
      );
      gsap.fromTo(".o2-cta",
        { y: 30, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: ".o2-cta", start: "top 85%" } }
      );
    };

    load();
  }, []);

  return (
    <div className="o2">
      <style>{css}</style>

      {/* HERO */}
      <section className="o2-hero" ref={heroRef}>

        <div className="o2-hero-img">
          {/* Product photo */}
          <div className="o2-hero-img-inner">
            <Image
              src={product.image}
              alt={product.name}
              fill
              quality={95}
              priority
              style={{ objectFit: "cover", objectPosition: "center top" }}
              sizes="50vw"
            />
          </div>

          {/* ── Sliding DOORS ── */}
          <div className="o2-doors" aria-hidden>
            <div className="o2-door o2-door-left" ref={leftDoorRef}>
              <div className="o2-door-handle" style={{ left: "75%", transform: "translateX(-50%)" }} />
            </div>
            <div className="o2-door o2-door-right" ref={rightDoorRef}>
              <div className="o2-door-handle" style={{ left: "25%", transform: "translateX(-50%)" }} />
            </div>
          </div>

          {/* Elegant White badge */}
          <div className="o2-colour-badge" ref={badgeRef}>
            <div className="o2-colour-swatch" />
            <span className="o2-colour-label">{product.colour}</span>
          </div>
        </div>

        {/* Text panel */}
        <div className="o2-hero-txt">
          <span className="o2-eyebrow">{product.range}</span>

          {/* OSAKA 2 — both on one line */}
          <div className="o2-h1-row">
            <span className="o2-h1">OSAKA</span>
            <span className="o2-h1-accent">2.</span>
          </div>

          <div className="o2-rule" />
          <p className="o2-tagline">{product.subtitle}</p>

          <div className="o2-dims">
            {Object.entries(product.dimensions).map(([k, v]) => (
              <div key={k} className="o2-dim">
                <div className="o2-dim-k">{k}</div>
                <div className="o2-dim-v">
                  <span className="o2-dim-v-num">{v.value}</span>
                  <span className="o2-dim-v-unit">{v.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="o2-hero-actions">
            <a
              href={`mailto:sales@ilktechnology.com?subject=Quote%20—%20${encodeURIComponent(product.name)}`}
              className="o2-btn-primary"
            >
              Request a Quote
            </a>
            <a
              href={product.cataloguePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="o2-btn-ghost"
            >
              Download Catalogue
            </a>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="o2-ticker-wrap" aria-hidden>
        <div className="o2-ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="o2-ticker-item">
              {item}
              <span className="o2-ticker-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* BODY */}
      <section className="o2-body">
        <div className="o2-body-inner">

          {/* LEFT */}
          <div>
            <p className="o2-section-label">Available Widths</p>
            <div className="o2-sizes">
              {product.sizes.map(s => (
                <div key={s} className="o2-size-btn">{s}</div>
              ))}
            </div>

            <div>
              <div className="o2-specs-header">
                <span className="o2-section-label" style={{ margin: 0 }}>Specifications</span>
                <span className="o2-specs-count">{product.specs.length} points</span>
              </div>
              <div className="o2-specs-grid">
                {product.specs.map(s => (
                  <div key={s.label} className="o2-spec-card">
                    <div className="o2-spec-icon">{ICONS[s.icon] ?? <Gauge {...ICON_P} />}</div>
                    <div className="o2-spec-body">
                      <div className="o2-spec-label">{s.label}</div>
                      <div className="o2-spec-value">{s.value}</div>
                    </div>
                    <div className="o2-spec-note">{s.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h2 className="o2-h2">
              BUILT FOR<br />
              <span>RETAIL</span><br />
              PERFORMANCE.
            </h2>
            <p className="o2-right-sub">{product.subtitle}</p>

            <div className="o2-feats">
              {product.features.map((f, i) => (
                <div key={i} className="o2-feat">
                  <div className="o2-feat-num">{f.num}</div>
                  <div>
                    <div className="o2-feat-title">{f.title}</div>
                    <div className="o2-feat-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="o2-cta">
              <div className="o2-cta-overline">Ready to order</div>
              <div className="o2-cta-heading">
                Professional installation available.
              </div>
              <p className="o2-cta-sub">
                In stock and ready to deliver across the UK. We respond within one business day with a tailored proposal for your store layout.
              </p>
              <div className="o2-cta-actions">
                <a
                  href={`mailto:sales@ilktechnology.com?subject=Quote%20Request%20—%20${encodeURIComponent(product.name)}`}
                  className="o2-btn-primary"
                >
                  Request a Quote
                </a>
                <a
                  href={product.cataloguePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="o2-cta-link"
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