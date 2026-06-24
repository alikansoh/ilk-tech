"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface SpecRow {
  key: string;
  val: string;
  accent?: boolean;
}

interface SpecGroup {
  title: string;
  rows: SpecRow[];
}

/* ─────────────────────────────────────────────
   DATA  — exact values from spec sheet only
───────────────────────────────────────────── */
const SPECS: SpecGroup[] = [
  {
    title: "Technical",
    rows: [
      { key: "Temperature Range", val: "0.5 – 3.3°C", accent: true },
      { key: "Refrigerant", val: "R290" },
      { key: "Voltage / Freq / Phase", val: "220–240V / 50–60Hz / 1Ph" },
      { key: "Amps", val: "13 A" },
      { key: "Watts", val: "299 W" },
      { key: "Defrost Type", val: "Auto" },
    ],
  },
  {
    title: "Dimensions",
    rows: [
      { key: "External Width", val: "1219 mm" },
      { key: "External Depth", val: "631 mm" },
      { key: "External Height", val: "881 mm" },
      { key: "Internal Net Height", val: "730 mm" },
      { key: "Packaged (W×D×H)", val: "1397 × 724 × 1067 mm" },
    ],
  },
  {
    title: "Storage",
    rows: [
      { key: "Gross Volume", val: "440 Litres", accent: true },
      { key: "Supplied Shelves", val: "6" },
      { key: "Shelf Size", val: "394 × 458 mm" },
    ],
  },
  {
    title: "Weight & Extras",
    rows: [
      { key: "Unpackaged Weight", val: "141 kg" },
      { key: "Packaged Weight", val: "152 kg" },
      { key: "Warranty", val: "7 Years", accent: true },
      { key: "Coverage", val: "Parts + Compressor + Labour" },
      { key: "Included", val: "Levelling Screws" },
      { key: "Optional", val: "Castors (sold separately)" },
    ],
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function TBR48Content() {
  const tempFillRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const productImgRef = useRef<HTMLDivElement>(null);
  const volCounterRef = useRef<HTMLSpanElement>(null);
  const bpInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsap: typeof import("gsap").gsap;
    let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;

    const init = async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      gsap = gsapMod.gsap;
      ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      /* Hero entrance */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("#tbr-img-wrap", { x: -60, opacity: 0, duration: 0.9 })
        .from("#tbr-eyebrow", { y: 20, opacity: 0, duration: 0.5 }, "-=0.4")
        .from("#tbr-title", { y: 28, opacity: 0, duration: 0.65 }, "-=0.3")
        .from("#tbr-sub", { y: 18, opacity: 0, duration: 0.5 }, "-=0.3")
        .from("#tbr-temp-badge", { y: 18, opacity: 0, duration: 0.5 }, "-=0.3")
        .from("#tbr-warranty", { y: 18, opacity: 0, duration: 0.5 }, "-=0.2")
        .from("#tbr-cta", { y: 18, opacity: 0, duration: 0.5 }, "-=0.2");

      /* Temp gauge fill */
      if (tempFillRef.current) {
        gsap.to(tempFillRef.current, {
          height: "86%",
          duration: 2.4,
          ease: "power2.inOut",
          delay: 1.0,
        });
      }

      /* Scan line loop */
      if (scanLineRef.current) {
        gsap
          .timeline({ repeat: -1, repeatDelay: 3.5, delay: 1.6 })
          .to(scanLineRef.current, { opacity: 0.8, duration: 0.12 })
          .fromTo(
            scanLineRef.current,
            { top: "6%" },
            { top: "94%", duration: 1.5, ease: "power1.inOut" }
          )
          .to(scanLineRef.current, { opacity: 0, duration: 0.12 });
      }

      /* Float */
      if (productImgRef.current) {
        gsap.to(productImgRef.current, {
          y: -12,
          duration: 3.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 1.3,
        });
      }

      /* Spec cards */
      gsap.from(".tbr-spec-card", {
        scrollTrigger: { trigger: "#tbr-specs", start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power2.out",
      });

      /* Blueprint — fade in the 3D SVG groups sequentially */
      ScrollTrigger.create({
        trigger: "#tbr-blueprint",
        start: "top 76%",
        onEnter: () => {
          const bt = gsap.timeline();
          bt.to("#bp3-side", { opacity: 1, duration: 0.35 })
            .to("#bp3-top", { opacity: 1, duration: 0.3 }, "-=0.1")
            .to("#bp3-body", { opacity: 1, duration: 0.35 }, "-=0.1")
            .to("#bp3-louvre", { opacity: 1, duration: 0.35 }, "-=0.2")
            .to("#bp3-door-l", { opacity: 1, duration: 0.35 }, "-=0.2")
            .to("#bp3-door-r", { opacity: 1, duration: 0.35 }, "-=0.2")
            .to(
              ".bp3-shelf-l",
              { opacity: 1, duration: 0.22, stagger: 0.08, ease: "power1.out" },
              "-=0.1"
            )
            .to(
              ".bp3-shelf-r",
              { opacity: 1, duration: 0.22, stagger: 0.08, ease: "power1.out" },
              "-=0.4"
            )
            .to("#bp3-legs", { opacity: 1, duration: 0.3 }, "-=0.1")
            .to("#bp3-dims", { opacity: 1, duration: 0.55 }, "-=0.1")
            .to("#bp3-label", { opacity: 1, duration: 0.4 });

          /* Volume counter */
          if (volCounterRef.current) {
            const obj = { v: 0 };
            gsap.to(obj, {
              v: 440,
              duration: 2.0,
              delay: 0.5,
              ease: "power2.out",
              onUpdate: () => {
                if (volCounterRef.current) {
                  volCounterRef.current.textContent = Math.round(obj.v).toString();
                }
              },
            });
          }
          if (bpInfoRef.current) {
            gsap.from(bpInfoRef.current, {
              x: 40,
              opacity: 0,
              duration: 0.75,
              delay: 0.3,
              ease: "power2.out",
            });
          }
        },
      });
    };

    init();
    return () => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) =>
        ScrollTrigger.getAll().forEach((t) => t.kill())
      );
    };
  }, []);

  return (
    <main className="tbr-root">
      <div className="tbr-page">
        {/* ════════════════ HERO ════════════════ */}
        <section className="tbr-hero">
          {/* Product image */}
          <div className="tbr-img-side" id="tbr-img-wrap">
            <div className="tbr-img-glow" />
            <div className="tbr-frame">
              <span className="tbr-corner tbr-corner--tl" />
              <span className="tbr-corner tbr-corner--tr" />
              <span className="tbr-corner tbr-corner--br" />
              <span className="tbr-corner tbr-corner--bl" />
              <div className="tbr-scan" ref={scanLineRef} />
              <div ref={productImgRef} className="tbr-img-inner">
                <Image
                  src="/media1.png"
                  alt="TBR48-RISZ1 Bar Refrigerator — Black Exterior, 2 Glass Swing Doors"
                  width={480}
                  height={600}
                  priority
                  className="tbr-product-img"
                />
              </div>
            </div>
          </div>

          {/* Text block */}
          <div className="tbr-hero-text">
            <p className="tbr-eyebrow" id="tbr-eyebrow">
              Bar Refrigerator
            </p>
            <h1 className="tbr-title" id="tbr-title">
              TBR48‑RISZ1
              <br />
              L‑B‑GG‑2
            </h1>
            <p className="tbr-sub" id="tbr-sub">
              Black Exterior &nbsp;·&nbsp; 2 Glass Swing Doors &nbsp;·&nbsp; 440 L
            </p>

            {/* Temperature badge */}
            <div className="tbr-temp-badge" id="tbr-temp-badge">
              <div className="tbr-gauge">
                <div className="tbr-gauge-fill" ref={tempFillRef} />
              </div>
              <div className="tbr-gauge-labels">
                <div>
                  <div className="tbr-gauge-val">3.3°C</div>
                  <div className="tbr-gauge-lbl">Max</div>
                </div>
                <div>
                  <div className="tbr-gauge-val">0.5°C</div>
                  <div className="tbr-gauge-lbl">Min</div>
                </div>
              </div>
              <div className="tbr-temp-main">
                <div className="tbr-temp-range">0.5 – 3.3°C</div>
                <div className="tbr-temp-label">Temperature Range</div>
                <div className="tbr-temp-note">R290 Refrigerant · Auto Defrost</div>
              </div>
            </div>

            {/* Warranty */}
            <div className="tbr-warranty" id="tbr-warranty">
              <Image
                src="/warranty-7yr.png"
                alt="7 Year Warranty Badge"
                width={120}
                height={120}
                className="tbr-warranty-img"
              />
              <div>
                <h3 className="tbr-warranty-title">7 Year Warranty</h3>
                <p className="tbr-warranty-sub">
                  Parts · Compressor · Labour
                  <br />
                  Full coverage from day one
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="tbr-cta-group" id="tbr-cta">
              <a href="/contact" className="tbr-btn tbr-btn--primary">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Enquiry
              </a>
              <a
                href="/TBR48-RISZ1-L-B-GG-2.pdf"
                download="TBR48-RISZ1-L-B-GG-2.pdf"
                className="tbr-btn tbr-btn--secondary"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Spec Sheet
              </a>
            </div>
          </div>
        </section>

        {/* ════════════════ DIVIDER ════════════════ */}
        <div className="tbr-divider" />

        {/* ════════════════ SPECS ════════════════ */}
        <section id="tbr-specs">
          <div className="tbr-sec-hd">
            <span className="tbr-sec-label">Full Data</span>
            <h2 className="tbr-sec-title">Technical Specifications</h2>
          </div>

          <div className="tbr-specs-grid">
            {SPECS.map((group) => (
              <div key={group.title} className="tbr-spec-card">
                <div className="tbr-spec-head">{group.title}</div>
                {group.rows.map((row) => (
                  <div key={row.key} className="tbr-spec-row">
                    <span className="tbr-spec-key">{row.key}</span>
                    <span className={`tbr-spec-val${row.accent ? " tbr-spec-val--accent" : ""}`}>
                      {row.val}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="tbr-excl-note">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ flexShrink: 0, marginTop: 2 }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>
              Depth (631 mm) excludes 35 mm for door handle. Height (881 mm) excludes 7 mm for
              adjustable leg levellers.
            </span>
          </div>
        </section>

        {/* ════════════════ DIVIDER ════════════════ */}
        <div className="tbr-divider" />

        {/* ════════════════ BLUEPRINT — 3/4 PERSPECTIVE ════════════════ */}
        <section id="tbr-blueprint">
          <div className="tbr-sec-hd">
            <span className="tbr-sec-label">3D View</span>
            <h2 className="tbr-sec-title">Chamber Layout</h2>
          </div>

          <div className="tbr-bp-wrap">
            <svg
              viewBox="0 0 640 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="tbr-bp-svg"
              role="img"
              aria-label="TBR48-RISZ1 three-quarter perspective illustration"
            >
              <defs>
                <linearGradient id="bp-ss-top" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d4d4d4" />
                  <stop offset="100%" stopColor="#9a9a9a" />
                </linearGradient>
                <linearGradient id="bp-glass-l" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#b8ccd8" stopOpacity="0.55" />
                  <stop offset="45%" stopColor="#ddeaf4" stopOpacity="0.30" />
                  <stop offset="100%" stopColor="#aabccc" stopOpacity="0.60" />
                </linearGradient>
                <linearGradient id="bp-glass-r" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#b0c4d4" stopOpacity="0.55" />
                  <stop offset="50%" stopColor="#d8eaf4" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#a0b4c4" stopOpacity="0.62" />
                </linearGradient>
                <linearGradient id="bp-int" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3a3a3a" />
                  <stop offset="100%" stopColor="#242424" />
                </linearGradient>
              </defs>

              <g id="bp3-side" opacity="0">
                <polygon
                  points="490,130 575,88 575,370 490,420"
                  fill="#1a1a1a"
                  stroke="#3c3c3c"
                  strokeWidth="0.8"
                />
                <line x1="490" y1="200" x2="575" y2="162" stroke="#222" strokeWidth="0.9" />
                <line x1="490" y1="270" x2="575" y2="233" stroke="#222" strokeWidth="0.9" />
                <line x1="490" y1="340" x2="575" y2="303" stroke="#222" strokeWidth="0.9" />
              </g>

              <g id="bp3-top" opacity="0">
                <polygon
                  points="100,130 490,130 575,88 185,88"
                  fill="url(#bp-ss-top)"
                  stroke="#888"
                  strokeWidth="0.8"
                />
                <polygon points="105,133 485,133 568,92 190,92" fill="#e0e0e0" fillOpacity="0.20" />
                <rect x="100" y="126" width="390" height="7" rx="1" fill="#b4b4b4" stroke="#999" strokeWidth="0.5" />
                <polygon points="490,127 575,86 575,91 490,132" fill="#9c9c9c" stroke="#888" strokeWidth="0.5" />
              </g>

              <g id="bp3-body" opacity="0">
                <rect x="100" y="130" width="390" height="290" fill="#1e1e1e" stroke="#383838" strokeWidth="0.8" />
              </g>

              <g id="bp3-louvre" opacity="0">
                <rect x="100" y="130" width="93" height="290" fill="#181818" stroke="#303030" strokeWidth="0.5" />
                {[148, 157, 166, 175, 184, 193, 202, 211, 220, 229].map((y) => (
                  <g key={y}>
                    <line x1="108" y1={y} x2="186" y2={y} stroke="#3a3a3a" strokeWidth="1.2" />
                    <line x1="108" y1={y + 4} x2="186" y2={y + 4} stroke="#111" strokeWidth="0.6" />
                  </g>
                ))}
                <rect x="112" y="250" width="70" height="28" rx="2" fill="#141414" />
                <text
                  x="147"
                  y="269"
                  textAnchor="middle"
                  fontFamily="Georgia, serif"
                  fontStyle="italic"
                  fontSize="15"
                  fontWeight="700"
                  fill="#c0c0c0"
                  letterSpacing="-0.5"
                >
                  true
                </text>
                <path d="M119,272 Q147,276 175,272" fill="none" stroke="#888" strokeWidth="0.8" />
                <rect x="121" y="291" width="52" height="20" rx="3" fill="#0a180a" stroke="#1e301e" strokeWidth="0.8" />
                <text
                  x="147"
                  y="305"
                  textAnchor="middle"
                  fontFamily="'Courier New', monospace"
                  fontSize="10"
                  fill="#00cc44"
                  letterSpacing="1"
                >
                  2.0°C
                </text>
                {[325, 334, 343, 352, 361, 370, 379, 388, 397, 406].map((y) => (
                  <g key={y}>
                    <line x1="108" y1={y} x2="186" y2={y} stroke="#3a3a3a" strokeWidth="1.2" />
                    <line x1="108" y1={y + 4} x2="186" y2={y + 4} stroke="#111" strokeWidth="0.6" />
                  </g>
                ))}
                <rect x="191" y="130" width="3" height="290" fill="#282828" stroke="#3c3c3c" strokeWidth="0.4" />
              </g>

              <g id="bp3-door-l" opacity="0">
                <rect x="194" y="131" width="147" height="288" fill="#161616" stroke="#3c3c3c" strokeWidth="1" />
                <rect x="200" y="137" width="135" height="276" fill="#111" stroke="#303030" strokeWidth="0.5" />
                <rect x="203" y="140" width="129" height="270" fill="url(#bp-glass-l)" stroke="#5a6a7a" strokeWidth="0.5" rx="1" />
                <rect x="206" y="143" width="18" height="264" fill="#ffffff" fillOpacity="0.06" rx="1" />
                <rect x="203" y="140" width="129" height="270" fill="url(#bp-int)" fillOpacity="0.58" />
                <rect x="222" y="137" width="90" height="7" rx="3" fill="#3c3c3c" stroke="#585858" strokeWidth="0.8" />
                <circle cx="230" cy="141" r="2" fill="#505050" stroke="#707070" strokeWidth="0.5" />
                <circle cx="304" cy="141" r="2" fill="#505050" stroke="#707070" strokeWidth="0.5" />
                <circle cx="264" cy="130" r="4" fill="#282828" stroke="#606060" strokeWidth="0.8" />
                <circle cx="264" cy="130" r="2" fill="#505050" />
              </g>

              {[181, 223, 265, 307, 349, 391].map((y, i) => (
                <g key={i} className="bp3-shelf-l" opacity="0">
                  <line x1="206" y1={y} x2="329" y2={y} stroke="#848484" strokeWidth="1.1" />
                  <line x1="206" y1={y + 3} x2="329" y2={y + 3} stroke="#848484" strokeWidth="1.1" />
                  {[218, 236, 254, 272, 290, 308, 322].map((x) => (
                    <line key={x} x1={x} y1={y} x2={x} y2={y + 3} stroke="#727272" strokeWidth="0.8" />
                  ))}
                </g>
              ))}

              <rect x="340" y="131" width="5" height="288" fill="#0d0d0d" stroke="#272727" strokeWidth="0.4" />

              <g id="bp3-door-r" opacity="0">
                <rect x="345" y="131" width="144" height="288" fill="#161616" stroke="#3c3c3c" strokeWidth="1" />
                <rect x="351" y="137" width="132" height="276" fill="#111" stroke="#303030" strokeWidth="0.5" />
                <rect x="354" y="140" width="126" height="270" fill="url(#bp-glass-r)" stroke="#5a6a7a" strokeWidth="0.5" rx="1" />
                <rect x="357" y="143" width="16" height="264" fill="#ffffff" fillOpacity="0.05" rx="1" />
                <rect x="354" y="140" width="126" height="270" fill="url(#bp-int)" fillOpacity="0.53" />
                <rect x="372" y="137" width="90" height="7" rx="3" fill="#3c3c3c" stroke="#585858" strokeWidth="0.8" />
                <circle cx="380" cy="141" r="2" fill="#505050" stroke="#707070" strokeWidth="0.5" />
                <circle cx="454" cy="141" r="2" fill="#505050" stroke="#707070" strokeWidth="0.5" />
                <circle cx="413" cy="130" r="4" fill="#282828" stroke="#606060" strokeWidth="0.8" />
                <circle cx="413" cy="130" r="2" fill="#505050" />
              </g>

              {[181, 223, 265, 307, 349, 391].map((y, i) => (
                <g key={i} className="bp3-shelf-r" opacity="0">
                  <line x1="357" y1={y} x2="477" y2={y} stroke="#808080" strokeWidth="1.1" />
                  <line x1="357" y1={y + 3} x2="477" y2={y + 3} stroke="#808080" strokeWidth="1.1" />
                  {[369, 387, 405, 423, 441, 459, 472].map((x) => (
                    <line key={x} x1={x} y1={y} x2={x} y2={y + 3} stroke="#6e6e6e" strokeWidth="0.8" />
                  ))}
                </g>
              ))}

              <g id="bp3-legs" opacity="0">
                <rect x="100" y="418" width="390" height="5" rx="1" fill="#242424" stroke="#404040" strokeWidth="0.5" />
                <polygon points="490,418 575,370 575,375 490,423" fill="#181818" stroke="#404040" strokeWidth="0.5" />
                <rect x="116" y="423" width="13" height="22" rx="2" fill="#282828" stroke="#505050" strokeWidth="0.8" />
                <rect x="114" y="442" width="17" height="5" rx="1" fill="#404040" stroke="#606060" strokeWidth="0.5" />
                <rect x="460" y="423" width="13" height="22" rx="2" fill="#282828" stroke="#505050" strokeWidth="0.8" />
                <rect x="458" y="442" width="17" height="5" rx="1" fill="#404040" stroke="#606060" strokeWidth="0.5" />
                <rect x="550" y="374" width="11" height="20" rx="2" fill="#1c1c1c" stroke="#404040" strokeWidth="0.7" />
                <rect x="548" y="391" width="15" height="4" rx="1" fill="#363636" stroke="#525252" strokeWidth="0.5" />
              </g>

              <g id="bp3-dims" opacity="0">
                {/* Height */}
                <line x1="596" y1="130" x2="596" y2="420" stroke="#651641" strokeWidth="0.8" strokeDasharray="3,3" />
                <line x1="590" y1="130" x2="602" y2="130" stroke="#651641" strokeWidth="1" />
                <line x1="590" y1="420" x2="602" y2="420" stroke="#651641" strokeWidth="1" />
                <text x="610" y="272" fontFamily="Space Grotesk,sans-serif" fontSize="12" fill="#651641" textAnchor="start">
                  881 mm
                </text>
                <text x="610" y="287" fontFamily="Space Grotesk,sans-serif" fontSize="10" fill="#9e7a8c" textAnchor="start">
                  height
                </text>

                {/* Width */}
                <line x1="100" y1="458" x2="490" y2="458" stroke="#651641" strokeWidth="0.8" strokeDasharray="3,3" />
                <line x1="100" y1="452" x2="100" y2="464" stroke="#651641" strokeWidth="1" />
                <line x1="490" y1="452" x2="490" y2="464" stroke="#651641" strokeWidth="1" />
                <text x="295" y="475" fontFamily="Space Grotesk,sans-serif" fontSize="12" fill="#651641" textAnchor="middle">
                  1219 mm
                </text>
                <text x="295" y="489" fontFamily="Space Grotesk,sans-serif" fontSize="10" fill="#9e7a8c" textAnchor="middle">
                  width
                </text>

                {/* Depth */}
                <line x1="492" y1="128" x2="577" y2="86" stroke="#651641" strokeWidth="0.8" strokeDasharray="3,3" />
                <line x1="489" y1="128" x2="495" y2="128" stroke="#651641" strokeWidth="1" />
                <line x1="574" y1="84" x2="580" y2="88" stroke="#651641" strokeWidth="1" />
                <text x="540" y="116" fontFamily="Space Grotesk,sans-serif" fontSize="11.5" fill="#651641" textAnchor="middle">
                  631 mm depth
                </text>
              </g>

              <text
                id="bp3-label"
                x="100"
                y="510"
                fontFamily="Space Grotesk,sans-serif"
                fontSize="10.5"
                fill="#9e7a8c"
                letterSpacing="0.7"
                opacity="0"
              >
                TBR48-RISZ1-L-B-GG-2  ·  440 L  ·  6 Shelves  ·  R290
              </text>
            </svg>

            <div className="tbr-bp-info" ref={bpInfoRef}>
              <h3 className="tbr-bp-title">6‑Shelf Cold Chamber</h3>
              <p className="tbr-bp-body">
                The TBR48 houses six adjustable shelves within a 730 mm net interior — engineered
                for maximum bottle density without compromising cold-air circulation.
              </p>
              <div className="tbr-bp-stats">
                <div className="tbr-bp-stat">
                  <span className="tbr-bp-num" ref={volCounterRef}>
                    0
                  </span>
                  <span className="tbr-bp-unit">Litres Capacity</span>
                </div>
                <div className="tbr-bp-stat">
                  <span className="tbr-bp-num">6</span>
                  <span className="tbr-bp-unit">Shelves Supplied</span>
                </div>
                <div className="tbr-bp-stat">
                  <span className="tbr-bp-num">730</span>
                  <span className="tbr-bp-unit">mm Net Height</span>
                </div>
              </div>
              <p className="tbr-bp-body">
                Each shelf measures <strong>394 × 458 mm</strong>. Optional castors allow
                repositioning within any bar or hospitality setup.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════ DIVIDER ════════════════ */}
        <div className="tbr-divider" />

        {/* ════════════════ REF STRIP ════════════════ */}
        <div className="tbr-ref-strip">
          TBR48-RISZ1-L-B-GG-2 &nbsp;·&nbsp; Bar Refrigerator &nbsp;·&nbsp; Black Ext
          &nbsp;·&nbsp; 2 Glass Swing Doors
        </div>
      </div>

      {/* ════════════════ STYLES ════════════════ */}
      <style>{`
        .tbr-root {
          --cr: #651641;
          --cr2: #8b1f59;
          --cr3: #a8246a;
          --crl: #f5e8ef;
          --crll: #fdf5f9;
          --white: #ffffff;
          --off: #fafafa;
          --muted: #9e7a8c;
          --border: rgba(101, 22, 65, 0.18);
          --bord2: rgba(101, 22, 65, 0.32);
          background: var(--white);
          color: #1a0811;
          font-family: "Inter", "Helvetica Neue", sans-serif;
          font-size: 15px;
          line-height: 1.65;
          overflow-x: hidden;
        }

        .tbr-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 36px 80px;
        }

        .tbr-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          min-height: 90vh;
        }

        .tbr-img-side {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tbr-img-glow {
          position: absolute;
          width: 460px;
          height: 460px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(101, 22, 65, 0.1) 0%, transparent 70%);
          pointer-events: none;
          animation: tbr-breathe 4.5s ease-in-out infinite;
        }

        @keyframes tbr-breathe {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.07);
            opacity: 1;
          }
        }

        .tbr-frame {
          position: relative;
          width: 100%;
          max-width: 460px;
          padding: 28px;
        }

        .tbr-corner {
          position: absolute;
          width: 30px;
          height: 30px;
          border-color: var(--cr);
          border-style: solid;
          opacity: 0.6;
        }

        .tbr-corner--tl {
          top: 0;
          left: 0;
          border-width: 2px 0 0 2px;
        }

        .tbr-corner--tr {
          top: 0;
          right: 0;
          border-width: 2px 2px 0 0;
        }

        .tbr-corner--br {
          bottom: 0;
          right: 0;
          border-width: 0 2px 2px 0;
        }

        .tbr-corner--bl {
          bottom: 0;
          left: 0;
          border-width: 0 0 2px 2px;
        }

        .tbr-scan {
          position: absolute;
          left: 28px;
          right: 28px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--cr2), transparent);
          top: 50%;
          opacity: 0;
          pointer-events: none;
        }

        .tbr-img-inner {
          width: 100%;
        }

        .tbr-product-img {
          width: 100%;
          height: auto;
          display: block;
          filter: drop-shadow(0 20px 56px rgba(101, 22, 65, 0.22));
        }

        .tbr-eyebrow {
          font-family: "Space Grotesk", sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--cr);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tbr-eyebrow::before {
          content: "";
          display: block;
          width: 36px;
          height: 1px;
          background: var(--cr);
          opacity: 0.5;
        }

        .tbr-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(32px, 4vw, 54px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: #1a0811;
          margin-bottom: 10px;
        }

        .tbr-sub {
          font-family: "Space Grotesk", sans-serif;
          font-size: 14px;
          color: var(--muted);
          letter-spacing: 0.03em;
          margin-bottom: 32px;
        }

        .tbr-temp-badge {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          background: var(--crll);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 16px 22px;
          margin-bottom: 28px;
        }

        .tbr-gauge {
          position: relative;
          width: 8px;
          height: 68px;
          background: var(--crl);
          border-radius: 4px;
          overflow: hidden;
        }

        .tbr-gauge-fill {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, var(--cr), var(--cr2));
          border-radius: 4px;
          height: 0%;
        }

        .tbr-gauge-labels {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 68px;
        }

        .tbr-gauge-val {
          font-family: "Space Grotesk", sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: var(--cr);
        }

        .tbr-gauge-lbl {
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .tbr-temp-range {
          font-family: "Space Grotesk", sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--cr);
        }

        .tbr-temp-label {
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 3px;
        }

        .tbr-temp-note {
          font-size: 11px;
          color: var(--cr3);
          margin-top: 8px;
          letter-spacing: 0.03em;
        }

        .tbr-warranty {
          display: flex;
          align-items: center;
          gap: 22px;
          padding: 22px 26px;
          background: var(--crll);
          border: 1px solid var(--border);
          border-radius: 10px;
          margin-bottom: 32px;
        }

        .tbr-warranty-img {
          object-fit: contain;
          flex-shrink: 0;
          width: 120px;
          height: 120px;
        }

        .tbr-warranty-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--cr);
        }

        .tbr-warranty-sub {
          font-size: 12px;
          color: var(--muted);
          margin-top: 3px;
        }

        .tbr-cta-group {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .tbr-btn {
          font-family: "Space Grotesk", sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 13px 24px;
          border-radius: 7px;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.22s, box-shadow 0.22s, background 0.22s;
          text-decoration: none;
        }

        .tbr-btn--primary {
          background: var(--cr);
          color: var(--white);
          box-shadow: 0 4px 20px rgba(101, 22, 65, 0.3);
        }

        .tbr-btn--primary:hover {
          background: var(--cr2);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(101, 22, 65, 0.38);
        }

        .tbr-btn--secondary {
          background: var(--white);
          color: var(--cr);
          border: 1.5px solid var(--bord2);
        }

        .tbr-btn--secondary:hover {
          background: var(--crll);
          transform: translateY(-2px);
        }

        .tbr-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--cr), transparent);
          margin: 72px 0;
          opacity: 0.35;
        }

        .tbr-sec-hd {
          display: flex;
          align-items: baseline;
          gap: 18px;
          margin-bottom: 40px;
        }

        .tbr-sec-label {
          font-family: "Space Grotesk", sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--cr);
        }

        .tbr-sec-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: #1a0811;
        }

        .tbr-specs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }

        .tbr-spec-card {
          background: var(--off);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.25s, box-shadow 0.25s;
        }

        .tbr-spec-card:hover {
          border-color: var(--bord2);
          box-shadow: 0 4px 24px rgba(101, 22, 65, 0.08);
        }

        .tbr-spec-head {
          font-family: "Space Grotesk", sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--cr);
          padding: 13px 20px;
          border-bottom: 1px solid var(--border);
          background: var(--crll);
        }

        .tbr-spec-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 11px 20px;
          border-bottom: 1px solid rgba(101, 22, 65, 0.07);
          transition: background 0.18s;
        }

        .tbr-spec-row:last-child {
          border-bottom: none;
        }

        .tbr-spec-row:hover {
          background: var(--crll);
        }

        .tbr-spec-key {
          font-size: 12px;
          color: var(--muted);
        }

        .tbr-spec-val {
          font-family: "Space Grotesk", sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #1a0811;
          text-align: right;
        }

        .tbr-spec-val--accent {
          color: var(--cr);
        }

        .tbr-excl-note {
          display: flex;
          gap: 10px;
          padding: 13px 16px;
          background: var(--crll);
          border-left: 2px solid var(--cr);
          border-radius: 0 6px 6px 0;
          margin-top: 20px;
          font-size: 12px;
          color: var(--muted);
          line-height: 1.6;
        }

        .tbr-bp-wrap {
          display: flex;
          align-items: center;
          gap: 48px;
        }

        .tbr-bp-svg {
          width: 100%;
          max-width: 520px;
          display: block;
          flex-shrink: 0;
          overflow: visible;
        }

        .tbr-bp-info {
          flex: 1;
        }

        .tbr-bp-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #1a0811;
          margin-bottom: 12px;
        }

        .tbr-bp-body {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .tbr-bp-body strong {
          color: var(--cr);
          font-weight: 600;
        }

        .tbr-bp-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 0;
          margin-bottom: 20px;
        }

        .tbr-bp-stat {
          display: flex;
          flex-direction: column;
          margin-right: 32px;
          margin-bottom: 12px;
        }

        .tbr-bp-num {
          font-family: "Space Grotesk", sans-serif;
          font-size: 36px;
          font-weight: 700;
          line-height: 1;
          color: var(--cr);
        }

        .tbr-bp-unit {
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 3px;
        }

        .tbr-ref-strip {
          font-family: "Space Grotesk", sans-serif;
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.06em;
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid var(--border);
        }

        @media (max-width: 900px) {
          .tbr-hero {
            grid-template-columns: 1fr;
            gap: 40px;
            min-height: auto;
          }

          .tbr-specs-grid {
            grid-template-columns: 1fr;
          }

          .tbr-bp-wrap {
            flex-direction: column;
          }

          .tbr-bp-svg {
            max-width: 100%;
          }

          .tbr-page {
            padding: 32px 20px 56px;
          }

          .tbr-warranty-img {
            width: 96px;
            height: 96px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}