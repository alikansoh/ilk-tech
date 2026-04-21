"use client";

import Image from "next/image";
import {
  Thermometer,
  Snowflake,
  Lightbulb,
  DoorOpen,
  MonitorDot,
  ArrowDownToLine,
  LayoutList,
  Gauge,
} from "lucide-react";

const T = {
  navy:   "#001845",
  navy2:  "#05213a",
  red:    "#C8102E",
  red2:   "#A10A22",
  white:  "#FFFFFF",
  cream:  "#F5F3EF",
  muted:  "#C8102E",
  border: "rgba(0,24,69,0.08)",
};

const product = {
  name:     "Osaka 2",
  range:    "Remote Multideck",
  tagline:  "Dual-Glass Precision Cooling",
  subtitle: "The Osaka 2 delivers consistent chilled performance in an elegant white finish — built for modern retail environments that demand both reliability and style.",
  colour:   "Elegant White",
  colourHex:"#F5F4F2",
  image:    "/pro2.png",
  cataloguePdf: "/catalogues/osaka2.pdf",
  sizes:    ["1250mm", "1875mm", "2500mm", "3750mm"],
  dimensions: { Height: "203 cm", Depth: "75 cm" },
  specs: [
    { label: "Temperature",    value: "+1 to +4 °C",               note: "Chilled range" },
    { label: "Cooling",        value: "Remote",                     note: "External condenser" },
    { label: "Lighting",       value: "LED canopy",                 note: "Low energy" },
    { label: "Doors",          value: "Hinged dual-glass",          note: "Double-glazed" },
    { label: "Controller",     value: "Electronic ",          note: "Smart control" },
    { label: "Pipework",       value: "Top entry",                  note: "Clean install" },
    { label: "Shelving",       value: "Base + 5 × 450 mm + EPOS",          note: "Adjustable levels" },
    { label: "Solenoid Valve", value: "Not included",               note: "Simplified system" },
  ],
  features: [
    { num: "01", title: "Precision Temperature", desc: "Maintains +1 to +4 °C with uniform consistency across every shelf level, regardless of ambient conditions." },
    { num: "02", title: "Dual-Glass Doors",      desc: "Hinged double-glazed doors dramatically reduce energy loss while keeping product fully visible." },
    { num: "03", title: "LED Canopy Lighting",   desc: "Engineered LEDs cast even, flattering light across shelves — lowering running costs without compromise." },
    { num: "04", title: "Flexible Shelving",     desc: "Five adjustable 450 mm shelf levels on a robust base. Configure precisely for your product range." },
  ],
};

const css = `
  .p2 *, .p2 *::before, .p2 *::after { box-sizing: border-box; }

  .p2 {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background: ${T.cream};
    color: ${T.navy};
    min-height: 100vh;
  }

  .p2-topbar {
    border-bottom: 1px solid rgba(0,24,69,0.07);
    padding: 0 48px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: ${T.cream};
  }
  .p2-topbar-brand {
    font-size: 20px;
    font-weight: 600;
    color: ${T.navy};
    letter-spacing: 0.02em;
  }

  .p2-hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: calc(100vh - 56px);
  }

  .p2-hero-img {
    position: relative;
    background: ${T.navy};
    overflow: hidden;
  }
  .p2-hero-img-inner {
    position: absolute;
    inset: 0;
  }
  /* Show the image as-is: remove blend/opacity so the photo appears clean and true to source */
  .p2-hero-img-inner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }
  .p2-hero-img::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: ${T.red};
    z-index: 10;
  }
  /* remove the dark gradient overlay so hero image remains clean and bright */
  .p2-hero-img::after {
    content: "";
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 0;
    background: transparent;
    z-index: 2;
    pointer-events: none;
  }

  .p2-hero-txt {
    background: ${T.cream};
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 72px 64px 72px 72px;
    position: relative;
  }
  .p2-hero-txt::before {
    content: "";
    position: absolute;
    top: 10%; left: 0; bottom: 10%;
    width: 1px;
    background: rgba(0,24,69,0.06);
  }

  .p2-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${T.red};
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .p2-label::before {
    content: "";
    width: 20px; height: 1.5px;
    background: ${T.red};
    display: block;
    flex-shrink: 0;
  }

  .p2-h1 {
    font-size: clamp(72px, 8vw, 108px);
    font-weight: 600;
    line-height: 0.88;
    color: ${T.navy};
    margin-bottom: 10px;
    letter-spacing: -0.02em;
  }
  .p2-h1-sub {
    font-size: clamp(72px, 8vw, 108px);
    font-weight: 400;
    font-style: italic;
    line-height: 0.88;
    color: ${T.red};
    margin-bottom: 40px;
    letter-spacing: -0.02em;
  }

  .p2-rule {
    width: 40px; height: 1px;
    background: rgba(0,24,69,0.15);
    margin-bottom: 32px;
  }

  /* Tagline made larger, cleaner, and more prominent */
  .p2-tagline {
    font-size: clamp(18px, 2.6vw, 22px);
    font-weight: 400;
    color: ${T.navy};
    line-height: 1.45;
    max-width: 720px;
    margin-bottom: 52px;
    letter-spacing: -0.01em;
  }

  .p2-dims {
    display: flex;
    gap: 0;
    margin-bottom: 52px;
    border: 1px solid ${T.border};
    border-radius: 8px;
    overflow: hidden;
    max-width: 300px;
  }
  .p2-dim {
    flex: 1;
    padding: 16px 22px;
    border-right: 1px solid ${T.border};
  }
  .p2-dim:last-child { border-right: none; }
  .p2-dim-k {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${T.muted};
    margin-bottom: 5px;
  }
  .p2-dim-v {
    font-size: 28px;
    font-weight: 600;
    color: ${T.navy};
    line-height: 1;
    letter-spacing: -0.01em;
  }

  .p2-hero-actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .p2-btn-primary {
    padding: 14px 28px;
    background: ${T.navy};
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 4px;
    border: 1.5px solid ${T.navy};
    transition: background 0.22s, color 0.22s, border-color 0.22s;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }
  .p2-btn-primary:hover {
    background: ${T.red};
    border-color: ${T.red};
  }
  .p2-btn-text {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${T.muted};
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: color 0.2s;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  .p2-btn-text:hover { color: ${T.navy}; }

  .p2-body {
    border-top: 1px solid ${T.border};
  }
  .p2-body-inner {
    max-width: 1320px;
    margin: 0 auto;
    padding: 100px 64px 120px;
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 100px;
    align-items: start;
  }

  /* ── SIZES ── */
  .p2-sizes-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${T.muted};
    margin-bottom: 16px;
  }
  .p2-sizes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 10px;
  }
  .p2-size-btn {
    padding: 14px 16px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: ${T.navy};
    background: #fff;
    border: 1px solid ${T.border};
    border-radius: 4px;
    cursor: default;
    transition: all 0.18s;
    text-align: center;
    font-family: inherit;
    user-select: none;
  }
  .p2-size-btn:hover {
    border-color: rgba(0,24,69,0.2);
  }
  .p2-size-note {
    font-size: 12px;
    font-weight: 400;
    color: ${T.muted};
    margin-top: 12px;
    margin-bottom: 48px;
  }
  .p2-size-note strong {
    color: ${T.navy};
    font-weight: 700;
  }

  /* ── SPECS (redesigned) ── */
  .p2-specs-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .p2-specs-title {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${T.navy};
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .p2-specs-title::before {
    content: "";
    width: 16px; height: 1.5px;
    background: ${T.red};
    display: block;
    flex-shrink: 0;
  }
  .p2-specs-count {
    font-size: 11px;
    font-weight: 600;
    color: ${T.red};
    background: rgba(200,16,46,0.07);
    border-radius: 20px;
    padding: 3px 10px;
    letter-spacing: 0.04em;
  }

  .p2-specs-grid {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .p2-spec-card {
    display: flex;
    align-items: center;
    gap: 14px;
    background: #fff;
    border: 1px solid ${T.border};
    border-radius: 8px;
    padding: 14px 18px;
    transition: border-color 0.18s, box-shadow 0.18s;
    position: relative;
    overflow: hidden;
  }
  .p2-spec-card::before {
    content: "";
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: ${T.red};
    opacity: 0;
    transition: opacity 0.18s;
  }
  .p2-spec-card:hover {
    border-color: rgba(0,24,69,0.15);
    box-shadow: 0 2px 12px rgba(0,24,69,0.05);
  }
  .p2-spec-card:hover::before {
    opacity: 1;
  }

  .p2-spec-icon-wrap {
    width: 38px;
    height: 38px;
    border-radius: 8px;
    background: rgba(200,16,46,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .p2-spec-body {
    flex: 1;
    min-width: 0;
  }
  .p2-spec-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(0,24,69,0.45);
    margin-bottom: 3px;
  }
  .p2-spec-value {
    font-size: 14px;
    font-weight: 700;
    color: ${T.navy};
    letter-spacing: -0.01em;
    line-height: 1.2;
  }

  .p2-spec-note {
    font-size: 11px;
    font-weight: 500;
    color: rgba(0,24,69,0.35);
    letter-spacing: 0.04em;
    text-align: right;
    flex-shrink: 0;
    white-space: nowrap;
  }

  /* ── RIGHT COLUMN ── */
  .p2-right-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${T.red};
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .p2-right-label::before {
    content: "";
    width: 20px; height: 1.5px;
    background: ${T.red};
    flex-shrink: 0;
  }
  .p2-h2 {
    font-size: clamp(40px, 4.5vw, 60px);
    font-weight: 600;
    line-height: 1.0;
    color: ${T.navy};
    margin-bottom: 10px;
    letter-spacing: -0.02em;
  }
  .p2-h2 em {
    font-style: italic;
    color: ${T.red};
    font-weight: 400;
  }
  /* Subtitle on right made larger and cleaner to match hero tagline */
  .p2-subtitle {
    font-size: clamp(16px, 2vw, 18px);
    font-weight: 400;
    color: ${T.navy};
    line-height: 1.6;
    max-width: 620px;
    margin-bottom: 56px;
  }

  .p2-feats {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-bottom: 64px;
  }
  .p2-feat {
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: 24px;
    padding: 28px 0;
    border-bottom: 1px solid ${T.border};
    align-items: start;
  }
  .p2-feat:first-child { border-top: 1px solid ${T.border}; }
  .p2-feat-num {
    font-size: 13px;
    font-weight: 400;
    color: ${T.red};
    padding-top: 2px;
    letter-spacing: 0.04em;
  }
  .p2-feat-title {
    font-size: 14px;
    font-weight: 700;
    color: ${T.navy};
    margin-bottom: 6px;
    letter-spacing: -0.01em;
  }
  .p2-feat-desc {
    font-size: 13px;
    font-weight: 300;
    color: ${T.muted};
    line-height: 1.65;
  }

  .p2-enquiry {
    border: 1px solid ${T.border};
    border-radius: 6px;
    padding: 40px;
    position: relative;
    overflow: hidden;
    background: #fff;
  }
  .p2-enquiry::before {
    content: "";
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 3px;
    background: ${T.red};
  }
  .p2-enquiry-overline {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${T.muted};
    margin-bottom: 14px;
  }
  .p2-enquiry-heading {
    font-size: 28px;
    font-weight: 600;
    color: ${T.navy};
    line-height: 1.2;
    margin-bottom: 8px;
    letter-spacing: -0.01em;
  }
  .p2-enquiry-sub {
    font-size: 13px;
    font-weight: 300;
    color: ${T.muted};
    line-height: 1.65;
    margin-bottom: 28px;
    max-width: 340px;
  }
  .p2-enquiry-actions {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  .p2-enquiry-link {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${T.muted};
    text-decoration: none;
    transition: color 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border-bottom: 1px solid transparent;
  }
  .p2-enquiry-link:hover {
    color: ${T.navy};
    border-color: rgba(0,24,69,0.2);
  }

  @media (max-width: 960px) {
    .p2-hero { grid-template-columns: 1fr; min-height: auto; }
    .p2-hero-img { height: 50vw; min-height: 300px; }
    .p2-hero-txt { padding: 48px 32px; }
    .p2-topbar { padding: 0 24px; }
    .p2-body-inner {
      grid-template-columns: 1fr;
      gap: 56px;
      padding: 64px 32px 80px;
    }
    .p2-tagline { font-size: 18px; max-width: 100%; }
    .p2-subtitle { font-size: 15px; max-width: 100%; }
  }
`;

const ICON_PROPS = {
  size: 18,
  strokeWidth: 1.5,
  color: T.red,
  "aria-hidden": true,
} as const;

const SPEC_ICONS: Record<string, React.ReactNode> = {
  temperature:      <Thermometer    {...ICON_PROPS} />,
  cooling:          <Snowflake      {...ICON_PROPS} />,
  lighting:         <Lightbulb      {...ICON_PROPS} />,
  doors:            <DoorOpen       {...ICON_PROPS} />,
  controller:       <MonitorDot     {...ICON_PROPS} />,
  pipework:         <ArrowDownToLine {...ICON_PROPS} />,
  shelving:         <LayoutList     {...ICON_PROPS} />,
  "solenoid valve": <Gauge          {...ICON_PROPS} />,
};

function SpecIcon({ label }: { label: string }) {
  const icon = SPEC_ICONS[label.toLowerCase()] ?? <Gauge {...ICON_PROPS} />;
  return <span className="p2-spec-icon-wrap">{icon}</span>;
}

export default function Osaka2Page() {
  return (
    <div className="p2">
      <style>{css}</style>

      {/* TOPBAR */}
      <header className="p2-topbar">
        <span className="p2-topbar-brand">ILK Technology</span>
      </header>

      {/* HERO */}
      <section className="p2-hero">
        <div className="p2-hero-img">
          <div className="p2-hero-img-inner">
            <Image
              src={product.image}
              alt={product.name}
              fill
              quality={95}
              style={{ objectFit: "cover", objectPosition: "center top" }}
              sizes="50vw"
            />
          </div>
        </div>

        <div className="p2-hero-txt">
          <span className="p2-label">{product.range}</span>

          <div className="p2-h1">Osaka</div>
          <div className="p2-h1-sub">2.</div>

          <div className="p2-rule" />

          <p className="p2-tagline">{product.subtitle}</p>

          <div className="p2-dims">
            {Object.entries(product.dimensions).map(([k, v]) => (
              <div key={k} className="p2-dim">
                <div className="p2-dim-k">{k}</div>
                <div className="p2-dim-v">{v}</div>
              </div>
            ))}
          </div>

          <div className="p2-hero-actions">
            
              <a href={`mailto:sales@ilktechnology.com?subject=Quote%20—%20${encodeURIComponent(product.name)}`}
              className="p2-btn-primary"
            >
              Request a Quote
            </a>
            
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="p2-body">
        <div className="p2-body-inner">

          {/* LEFT */}
          <div>
            <p className="p2-sizes-label">Available Widths</p>
            <div className="p2-sizes">
              {product.sizes.map(s => (
                <div key={s} className="p2-size-btn" aria-hidden>
                  {s}
                </div>
              ))}
            </div>

            {/* SPECS — redesigned */}
            <div style={{ marginTop: 48 }}>
              <div className="p2-specs-header">
                <span className="p2-specs-title">Specifications</span>
                <span className="p2-specs-count">{product.specs.length} points</span>
              </div>
              <div className="p2-specs-grid">
                {product.specs.map(s => (
                  <div key={s.label} className="p2-spec-card">
                    <SpecIcon label={s.label} />
                    <div className="p2-spec-body">
                      <div className="p2-spec-label">{s.label}</div>
                      <div className="p2-spec-value">{s.value}</div>
                    </div>
                    <div className="p2-spec-note">{s.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <span className="p2-right-label">Key Features</span>
            <h2 className="p2-h2">
              Built for <em>retail</em><br />performance.
            </h2>
            <p className="p2-subtitle">{product.subtitle}</p>

            <div className="p2-feats">
              {product.features.map((f, i) => (
                <div key={i} className="p2-feat">
                  <div className="p2-feat-num">{f.num}</div>
                  <div>
                    <div className="p2-feat-title">{f.title}</div>
                    <div className="p2-feat-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p2-enquiry">
              <div className="p2-enquiry-overline">Ready to order</div>
              <div className="p2-enquiry-heading">
                Professional installation available.
              </div>
              <p className="p2-enquiry-sub">
                In stock and ready to deliver. We respond within one business day with a tailored proposal for your store layout.
              </p>
              <div className="p2-enquiry-actions">
                
                  <a href={`mailto:sales@ilktechnology.com?subject=Quote%20Request%20—%20${encodeURIComponent(product.name)}`}
                  className="p2-btn-primary"
                >
                  Request a Quote
                </a>
                
                  <a href={product.cataloguePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p2-enquiry-link"
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