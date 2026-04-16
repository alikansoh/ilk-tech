"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const PRIMARY = "#0B2540";
const LOGO_GRAY = "#BDBDBD";
const PRIMARY_SOFT = "rgba(11,37,64,0.12)";
const ACCENT = "#dc2626";

const STATS = [
  { value: 25, suffix: "+", label: "Years Experience" },
  { value: 5000, suffix: "+", label: "Projects Delivered" },
  { value: 4, suffix: "", label: "Brand Partners" },
];

const BRANDS = ["Arneg", "Oscartielle", "Intrac", "Incold"];

function SectionTag({ number, label }: { number: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
      <div
        style={{
          width: 26,
          height: 26,
          background: PRIMARY,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          border: `2px solid ${LOGO_GRAY}33`,
          boxShadow: `0 0 0 4px ${PRIMARY_SOFT}`,
        }}
      >
        <span style={{ fontSize: 9, fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.08em" }}>
          {number}
        </span>
      </div>
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.32em",
          textTransform: "uppercase" as const,
          color: "#8A9BB5",
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "#E2E8F0", maxWidth: 48 }} />
    </div>
  );
}

function LogoSquares() {
  return (
    <div
      className="logo-squares"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        pointerEvents: "none",
        zIndex: 0,
        width: 320,
        height: 210,
      }}
    >
      <div style={{ position: "absolute", top: 10, right: 200, width: 80, height: 80, background: LOGO_GRAY }} />
      <div style={{ position: "absolute", top: 14, right: 130, width: 60, height: 60, background: PRIMARY }} />
      <div style={{ position: "absolute", top: 30, right: 52, width: 58, height: 58, background: LOGO_GRAY }} />
      <div style={{ position: "absolute", top: 5, right: 0, width: 38, height: 38, background: LOGO_GRAY }} />
      <div style={{ position: "absolute", top: 108, right: 196, width: 108, height: 96, background: PRIMARY }} />
      <div style={{ position: "absolute", top: 108, right: 140, width: 46, height: 46, background: PRIMARY }} />
    </div>
  );
}

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const statsRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;

    const initGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Hero entrance
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
        heroTl
          .from(".hero-brand", { opacity: 0, x: -24, duration: 0.6 })
          .from(".hero-tag", { opacity: 0, y: 10, duration: 0.5 }, "-=0.3")
          .from(".hero-h1", { opacity: 0, y: 40, duration: 0.8 }, "-=0.3")
          .from(".hero-stat", { opacity: 0, x: 30, stagger: 0.12, duration: 0.5 }, "-=0.5")
          .from(".hero-divider", { scaleX: 0, duration: 0.6, transformOrigin: "left" }, "-=0.3");

        // Count-up for stats in hero
        statsRefs.current.forEach((el, i) => {
          if (!el) return;
          const target = STATS[i].value;
          ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: () => {
              const obj = { val: 0 };
              gsap.to(obj, {
                val: target,
                duration: 1.8,
                ease: "power2.out",
                onUpdate: () => {
                  if (el) el.textContent = Math.round(obj.val) + STATS[i].suffix;
                },
              });
            },
          });
        });

        // Section fade-up helper
        const fadeUp = (containerEl: HTMLElement | null, selector: string, stagger = 0.15) => {
          if (!containerEl) return;
          gsap.from(containerEl.querySelectorAll(selector), {
            opacity: 0,
            y: 48,
            stagger,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerEl,
              start: "top 78%",
            },
          });
        };

        fadeUp(section1Ref.current, ".s1-item");
        fadeUp(teamRef.current, ".team-item");
        fadeUp(section2Ref.current, ".s2-item");
        fadeUp(missionRef.current, ".mission-item");
        fadeUp(visionRef.current, ".vision-item");

        // Image parallax
        document.querySelectorAll(".parallax-img").forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        });

        // Vision stats count-up
        document.querySelectorAll(".vision-count").forEach((el) => {
          const raw = el.getAttribute("data-value") ?? "";
          const suffix = el.getAttribute("data-suffix") ?? "";
          const num = parseInt(raw);
          if (isNaN(num)) return;
          ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: () => {
              const obj = { val: 0 };
              gsap.to(obj, {
                val: num,
                duration: 1.8,
                ease: "power2.out",
                onUpdate: () => {
                  (el as HTMLElement).textContent = Math.round(obj.val) + suffix;
                },
              });
            },
          });
        });
      });
    };

    initGSAP();
    return () => ctx?.revert();
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .team-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 60px;
          align-items: start;
        }
        .mission-grid {
          display: grid;
          grid-template-columns: 7fr 5fr;
          gap: 80px;
          align-items: center;
        }
        .vision-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .stats-grid-2x2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: #E2E8F0;
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 60px;
          align-items: end;
        }
        .section-pad {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 48px;
        }
        .hero-pad {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 48px 72px;
          position: relative;
          z-index: 1;
        }

        .img-natural {
          position: relative;
          overflow: hidden;
          background: #EEF2F7;
        }
        .img-natural img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain !important;
        }

        .logo-squares {
          opacity: 0.9;
        }

        /* Make the stats container a vertical flex column with gap between items */
        .hero-stats {
          display: flex;
          flex-direction: column;
          gap: 16px; /* adjust this value to increase/decrease gap */
        }

        @media (max-width: 900px) {
          .two-col,
          .mission-grid,
          .vision-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .team-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .section-pad,
          .hero-pad {
            padding: 56px 28px;
          }
          .two-col-img-first { order: -1; }
          .logo-squares {
            transform: scale(0.65);
            transform-origin: top right;
          }

          /* Correctly override the inline marginTop on the stats container */
          .hero-pad .hero-inner > .hero-stats {
            margin-top: 40px !important;
            border-left: none;
            padding-left: 0;
          }
        }

        @media (max-width: 560px) {
          .section-pad,
          .hero-pad {
            padding: 40px 18px;
          }
          .hero-h1 { font-size: 3rem !important; }
          .stats-grid-2x2 {
            grid-template-columns: 1fr 1fr;
          }
          .brands-row { flex-wrap: wrap; }
          .logo-squares {
            transform: scale(0.45);
            transform-origin: top right;
            opacity: 0.65;
          }

          .hero-pad .hero-inner > .hero-stats {
            margin-top: 28px !important;
            border-left: none;
            padding-left: 0;
          }
        }
      `}</style>

      <main style={{ background: "#ffffff", color: "#0F1F3D" }}>
        {/* HERO */}
        <section style={{ borderBottom: "1px solid #E2E8F0", position: "relative", overflow: "hidden" }}>
          <LogoSquares />

          <div className="hero-pad" ref={heroRef}>
            <div className="hero-brand" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 56 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 8px)", gap: 3 }}>
                {[1, 0, 1, 1].map((v, i) => (
                  <div
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      background: v ? (i % 2 === 0 ? PRIMARY : LOGO_GRAY) : "transparent",
                      border: v ? "none" : "1px solid #CBD5E1",
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#8A9BB5" }}>
                ILK Technology
              </span>
            </div>

            <div className="hero-inner">
              <div>
                <p
                  className="hero-tag"
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: ACCENT,
                    marginBottom: 14,
                  }}
                >
                  Commercial Refrigeration Specialists
                </p>
                <h1
                  className="hero-h1"
                  style={{
                    fontSize: "clamp(3rem, 7vw, 6rem)",
                    fontWeight: 800,
                    lineHeight: 1.0,
                    letterSpacing: "-0.04em",
                    color: "#0F1F3D",
                    margin: 0,
                  }}
                >
                  About<br />
                  <span style={{ color: PRIMARY }}>Us.</span>
                </h1>
              </div>

              <div
                className="hero-stats"
                style={{
                  borderLeft: `2px solid ${PRIMARY}`,
                  paddingLeft: 28,
                  marginTop: 160, // desktop: large push
                }}
              >
                {STATS.map((s, i) => (
                  <div
                    key={i}
                    className="hero-stat"
                    style={{
                      padding: "20px 1", // slightly reduced padding to balance the added gap
                      // removed borderBottom in favor of gap
                    }}
                  >
                    <div
                      style={{
                        fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                        fontWeight: 800,
                        letterSpacing: "-0.04em",
                        color: "#0F1F3D",
                        lineHeight: 1,
                      }}
                    >
                      <span
                        ref={(el) => {
                          statsRefs.current[i] = el;
                        }}
                      >
                        {s.value}
                        {s.suffix}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#8A9BB5",
                        marginTop: 4,
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-divider" style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 52 }}>
              <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
              <div style={{ display: "flex", gap: 4 }}>
                {[1, 0, 1, 1, 0, 1].map((v, i) => (
                  <div
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      background: v ? (i % 2 === 0 ? PRIMARY : LOGO_GRAY) : "transparent",
                      border: v ? "none" : "1px solid #CBD5E1",
                      opacity: v ? 1 : 0.7,
                    }}
                  />
                ))}
              </div>
              <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
            </div>
          </div>
        </section>

        {/* SECTION 1 — WHO WE ARE */}
        <section style={{ borderBottom: "1px solid #E2E8F0" }}>
          <div className="section-pad two-col" ref={section1Ref}>
            <div className="s1-item">
              <SectionTag number="01" label="Who We Are" />
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  color: "#0F1F3D",
                  marginBottom: 20,
                }}
              >
                Built on two decades of refrigeration expertise.
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: "#64748B" }}>
                ILK Technology was founded with a clear vision: to deliver unmatched expertise in
                refrigeration, drawing on over 20 years of experience from our founding Refrigeration
                Engineer. Since then, we have grown our team with dedicated professionals committed
                to excellence.
              </p>
            </div>

            <div className="s1-item" style={{ position: "relative" }}>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="img-natural parallax-img">
                  <Image
                    src="/about-1.jpeg"
                    alt="ILK Technology engineers"
                    width={800}
                    height={500}
                    quality={90}
                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                  />
                </div>
                <div style={{ height: 3, background: PRIMARY }} />
              </div>
            </div>
          </div>
        </section>

        {/* TEAM PHOTO */}
        <section style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
          <div className="section-pad team-grid" ref={teamRef}>
            <div className="team-item">
              <SectionTag number="—" label="Our People" />
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#0F1F3D",
                  marginBottom: 16,
                  lineHeight: 1.1,
                }}
              >
                The specialists behind every project.
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "#64748B" }}>
                Seasoned engineers and project managers dedicated to precision, reliability and
                outstanding client outcomes.
              </p>
            </div>

            <div className="team-item" style={{ position: "relative" }}>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="img-natural parallax-img">
                  <Image
                    src="/about-2.jpeg"
                    alt="ILK Technology team"
                    width={1200}
                    height={525}
                    quality={90}
                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                  />
                </div>
                <div style={{ height: 3, background: PRIMARY }} />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — WHAT WE DO */}
        <section style={{ borderBottom: "1px solid #E2E8F0" }}>
          <div className="section-pad two-col" ref={section2Ref}>
            <div className="s2-item two-col-img-first" style={{ position: "relative" }}>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="img-natural parallax-img">
                  <Image
                    src="/about-3.png"
                    alt="Arneg refrigeration cabinets"
                    width={800}
                    height={500}
                    quality={90}
                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                  />
                </div>
                <div style={{ height: 3, background: PRIMARY }} />
              </div>
            </div>

            <div className="s2-item">
              <SectionTag number="02" label="What We Do" />
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  color: "#0F1F3D",
                  marginBottom: 20,
                }}
              >
                Trusted distributor of world-class refrigeration brands.
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 15, lineHeight: 1.85, color: "#64748B" }}>
                <p>
                  As a trusted distribution partner of Arneg, we offer an extensive selection of
                  Arneg cabinets crafted to leave a positive, lasting impression on our customers.
                </p>
                <p>
                  We also offer products from our trusted partners — bespoke, available for
                  quotation and tailored to your specific needs.
                </p>
              </div>

              <div className="brands-row" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
                {BRANDS.map((b, idx) => (
                  <div
                    key={b}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      border: `1px solid ${idx % 2 === 0 ? PRIMARY_SOFT : LOGO_GRAY + "33"}`,
                      padding: "7px 14px",
                      background: "#ffffff",
                    }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 5px)", gap: 2 }}>
                      {[1, 0, 0, 1].map((v, i) => (
                        <div
                          key={i}
                          style={{
                            width: 5,
                            height: 5,
                            background: v ? (i % 2 === 0 ? PRIMARY : LOGO_GRAY) : "transparent",
                          }}
                        />
                      ))}
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#64748B",
                      }}
                    >
                      {b}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="/arneg-group"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 24,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  textDecoration: "none",
                  borderBottom: `1px solid ${PRIMARY}`,
                  paddingBottom: 3,
                }}
              >
                Visit Arneg Partners Page →
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 3 — MISSION */}
        <section style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
          <div className="section-pad mission-grid" ref={missionRef}>
            <div className="mission-item">
              <SectionTag number="03" label="Our Mission" />
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  color: "#0F1F3D",
                  marginBottom: 20,
                }}
              >
                Expertise, service &amp; seamless business interactions.
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: "#64748B", maxWidth: 500 }}>
                At ILK Technology, we pride ourselves on our reputation for expertise, exceptional
                technical service, and smooth business interactions. Our mission is to provide our
                customers with an outstanding experience — because they truly deserve nothing less.
              </p>
              <a
                href="mailto:sales@ilktechnology.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 32,
                  background: PRIMARY,
                  color: "#ffffff",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  padding: "14px 24px",
                  border: `2px solid ${ACCENT}20`,
                }}
              >
                Get in Touch →
              </a>
            </div>

            <div className="mission-item" style={{ position: "relative" }}>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="img-natural parallax-img">
                  <Image
                    src="/about-4.png"
                    alt="ILK Technology service"
                    width={600}
                    height={750}
                    quality={90}
                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                  />
                </div>
                <div style={{ height: 3, background: PRIMARY }} />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — VISION */}
        <section style={{ position: "relative", overflow: "hidden", background: "#ffffff" }}>
          <div
            style={{
              position: "absolute",
              bottom: -30,
              left: -30,
              display: "grid",
              gridTemplateColumns: "repeat(6, 52px)",
              gap: 6,
              opacity: 0.05,
              pointerEvents: "none",
            }}
          >
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} style={{ width: 52, height: 52, background: i % 2 === 0 ? PRIMARY : LOGO_GRAY }} />
            ))}
          </div>

          <div className="section-pad" style={{ position: "relative", zIndex: 1 }} ref={visionRef}>
            <div className="vision-item">
              <SectionTag number="04" label="Our Vision" />
            </div>

            <div className="vision-grid">
              <div className="vision-item">
                <h2
                  style={{
                    fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    color: "#0F1F3D",
                    marginBottom: 20,
                  }}
                >
                  The UK&apos;s most trusted name in commercial refrigeration.
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.85, color: "#64748B" }}>
                  A company where deep technical know-how meets genuine care, and where every client
                  relationship is built on transparency, reliability, and results that speak for
                  themselves.
                </p>
              </div>

              <div className="vision-item stats-grid-2x2">
                {[...STATS, { value: 0, suffix: "", label: "Based & Operated" }].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#ffffff",
                      padding: "28px 22px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, background: "#E2E8F0" }} />
                    <div
                      style={{
                        fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                        fontWeight: 800,
                        letterSpacing: "-0.04em",
                        color: "#0F1F3D",
                        lineHeight: 1,
                        marginBottom: 6,
                      }}
                    >
                      {i === 3 ? (
                        <span>UK</span>
                      ) : (
                        <span className="vision-count" data-value={s.value} data-suffix={s.suffix}>
                          {s.value}
                          {s.suffix}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#8A9BB5",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}