"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const NAVY = "#0B2540";
const RED = "#C8102E";
const BORDER = "rgba(11,37,64,0.1)";
const MUTED = "#6B7280";

type Brand = {
  name: string;
  tagline: string;
  desc: string;
  index: string;
  logo: string;
  url?: string;
};

const BRANDS: Brand[] = [
  {
    name: "Arneg",
    tagline: "Industrial Visionaries",
    index: "01",
    logo: "/logo1.png",
    desc: "A dynamic international collective and cutting-edge industrial organisation. Visionaries with an artisan spirit, blending craftsmanship and relentless innovation to exceed every expectation.",
    url: "https://www.arneg.com/",
  },
  {
    name: "Oscartielle",
    tagline: "European Refrigeration Leader",
    index: "02",
    logo: "/logo3.png",
    desc: "Premier European manufacturer of custom integral refrigerated cabinets, offering innovative plug-in systems and solutions for retail and food industries.",
    url: "https://www.oscartielle.it/",
  },
  {
    name: "Intrac",
    tagline: "Retail Space Designers",
    index: "03",
    logo: "/logo2.png",
    desc: "Designers crafting compelling retail spaces. Specializing in shelving, checkouts, and accessories to turn ideas into successful environments.",
    url: "https://www.intrac.it/",
  },
  {
    name: "Incold",
    tagline: "Cold Room Specialists",
    index: "04",
    logo: "/logo4.png",
    desc: "Leading manufacturer of modular cold rooms, insulated panels, rapid doors, and specialized insulation solutions for every refrigeration need.",
    url: "https://www.incold.it/",
  },
];

export default function BrandsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;
    const animate = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // ── HERO ──
        gsap.from(".hero-image-parallax", {
          scale: 1.08,
          duration: 1.6,
          ease: "power3.out",
        });
        gsap.from(".hero-overlay", {
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
        });

        const heroTl = gsap.timeline({ delay: 0.3 });
        heroTl
          .from(".hero-eyebrow", { opacity: 0, x: -24, duration: 0.7, ease: "power3.out" })
          .from(".hero-title", { opacity: 0, y: 36, duration: 0.95, ease: "power3.out" }, "-=0.4")
          .from(".hero-desc", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.55")
          .from(".hero-meta", { opacity: 0, scale: 0.88, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .from(".hero-scroll-hint", { opacity: 0, y: 10, duration: 0.6, ease: "power2.out" }, "-=0.3");

        // Parallax scroll
        gsap.to(".hero-image-parallax", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Fade hero content as you scroll away
        gsap.to(".hero-content", {
          opacity: 0,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "40% top",
            end: "bottom top",
            scrub: true,
          },
        });

        // ── BRAND ROWS ──
        gsap.from(".brand-row", {
          opacity: 0,
          y: 36,
          stagger: 0.13,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 82%" },
        });

        // ── CTA ──
        gsap.from(".cta-left-rule", {
          scaleX: 0,
          transformOrigin: "left",
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 78%" },
        });
        gsap.from([".cta-left-title", ".cta-left-text"], {
          opacity: 0,
          y: 24,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 78%" },
        });
        gsap.from(".cta-right-inner", {
          opacity: 0,
          x: 30,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: { trigger: ctaRef.current, start: "top 78%" },
        });
      });
    };
    animate();
    return () => ctx?.revert();
  }, []);

  return (
    <>
      <style>{`
        .brands-root {
          background: #fff;
          color: ${NAVY};
          min-height: 100vh;
        }

        /* ─────────────────────────
           HERO
        ───────────────────────── */
        .hero {
          position: relative;
          width: 100%;
          height: 92vh;
          min-height: 520px;
          max-height: 860px;
          overflow: hidden;
          background: ${NAVY};
          display: flex;
          align-items: flex-end;
        }

        @media (max-width: 1100px) {
          .hero {
            height: 75vh;
            min-height: 370px;
            max-height: 640px;
          }
        }

        @media (max-width: 520px) {
          .hero {
            height: 62vh;
            min-height: 300px;
            max-height: 520px;
          }
        }

        .hero-image-parallax {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 115%;
          top: -8%;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            rgba(11,37,64,0.82) 0%,
            rgba(11,37,64,0.52) 48%,
            rgba(11,37,64,0.18) 100%
          );
          z-index: 1;
        }

        .hero::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: ${RED};
          z-index: 3;
        }

        .hero-content {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 64px 64px;
          max-width: 1160px;
          margin: 0 auto;
          left: 0;
          right: 0;
        }

        @media (max-width: 820px) {
          .hero-content {
            padding: 0 24px 40px;
            max-width: 98vw;
          }
        }

        @media (max-width: 450px) {
          .hero-content {
            padding: 0 10px 22px;
          }
        }

        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: ${RED};
          margin-bottom: 20px;
        }
        .hero-eyebrow::before {
          content: '';
          display: block;
          width: 28px;
          height: 1.5px;
          background: ${RED};
          flex-shrink: 0;
        }

        .hero-bottom {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          gap: 48px;
        }

        @media (max-width: 800px) {
          .hero-bottom {
            grid-template-columns: 1fr;
            gap: 22px;
          }
        }
        .hero-title {
          font-size: clamp(2.2rem, 4.5vw, 5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: #fff;
          max-width: 640px;
        }
        @media (max-width: 520px) {
          .hero-title { font-size: 1.6rem; max-width: 100%; }
        }

        .hero-desc {
          font-size: 15px;
          color: rgba(255,255,255,0.6);
          line-height: 1.75;
          max-width: 480px;
          margin-top: 20px;
        }

        .hero-meta {
          text-align: right;
          flex-shrink: 0;
        }
        .hero-meta-count {
          font-size: 5rem;
          font-weight: 900;
          line-height: 1;
          color: #fff;
          letter-spacing: -0.06em;
          opacity: 0.9;
        }
        .hero-meta-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-top: 6px;
          text-align: right;
        }

        @media (max-width: 800px) {
          .hero-meta {
            text-align: left;
          }
        }

        .hero-scroll-hint {
          position: absolute;
          bottom: 32px;
          right: 64px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          z-index: 2;
        }
        .hero-scroll-line {
          width: 1px;
          height: 32px;
          background: rgba(255,255,255,0.25);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.5); }
        }

        @media (max-width: 600px) {
          .hero-scroll-hint { right: 24px; }
          .hero-meta { display: none; }
        }

        /* ─────────────────────────
           PAGE BODY
        ───────────────────────── */
        .brands-inner {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 40px 100px;
        }

        @media (max-width: 900px) {
          .brands-inner {
            padding: 0 16px 60px;
          }
        }

        @media (max-width: 520px) {
          .brands-inner {
            padding: 0 4vw 44px;
          }
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 52px 0 0;
          border-bottom: 1px solid ${BORDER};
        }
        .section-header-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: ${MUTED};
        }
        .section-header-count {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: ${RED};
        }

        /* ── BRAND ROWS ── */
        .brands-list { margin-top: 0; }

        .brand-row {
          display: grid;
          grid-template-columns: 52px 180px 1fr auto;
          align-items: center;
          gap: 40px;
          padding: 36px 0;
          border-bottom: 1px solid ${BORDER};
          position: relative;
        }
        .brand-row::before {
          content: '';
          position: absolute;
          inset: 0 -40px;
          background: transparent;
          transition: background 0.2s;
          pointer-events: none;
          z-index: 0;
        }

        /* Only show hover interaction on devices that support hover */
        @media (hover: hover) {
          .brand-row:hover::before { background: rgba(11,37,64,0.025); }
          .brand-row:hover .brand-name { color: ${RED}; }
        }

        .brand-row > * { position: relative; z-index: 1; }

        @media (max-width: 950px) {
          .brand-row {
            grid-template-columns: 36px 120px 1fr auto;
            gap: 14px;
            padding: 22px 0;
          }
          .brand-logo-wrap { width: 120px; height: 44px; }
        }

        /* Mobile-first reflow: keep logo visible, stack into two columns */
        @media (max-width: 700px) {
          .brand-row {
            grid-template-columns: 64px 1fr;
            gap: 12px;
            padding: 18px 0;
            align-items: start;
          }

          /* hide index to save space on small screens */
          .brand-index { display: none; }

          .brand-logo-wrap {
            display: flex;
            width: 64px;
            height: 44px;
            align-items: center;
            justify-content: flex-start;
            flex-shrink: 0;
          }

          /* move brand link to the second column and right align it */
          .brand-link {
            display: inline-flex;
            grid-column: 2 / 3;
            justify-self: end;
            align-self: center;
            padding: 8px 12px;
            font-size: 10px;
            margin-top: 8px;
          }

          .brand-logo-wrap img { max-width: 100%; height: auto; }
        }

        @media (max-width: 500px) {
          .brand-row { padding: 12px 0; }
        }

        .brand-index {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: ${RED};
        }

        .brand-logo-wrap {
          width: 180px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-shrink: 0;
          /* allow the wrapper to shrink in tight grid constraints */
          min-width: 0;
        }

        /* Ensure the actual <img> from next/image is constrained and responsive */
        .brand-logo,
        .brand-logo-wrap img {
          max-width: 100%;
          height: auto;
          display: block;
        }

        .brand-body { min-width: 0; }

        .brand-name {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: ${NAVY};
          margin-bottom: 4px;
          transition: color 0.2s;
          line-height: 1.1;
        }

        .brand-tagline {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${MUTED};
          margin-bottom: 12px;
        }

        /* allow descriptions to use the available width on smaller screens */
        .brand-desc {
          font-size: 13.5px;
          line-height: 1.7;
          color: #4B5563;
          max-width: 480px;
        }
        @media (max-width: 950px) {
          .brand-desc { max-width: 100%; }
        }

        .brand-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          color: ${NAVY};
          padding: 11px 20px;
          border: 1.5px solid ${BORDER};
          border-radius: 3px;
          white-space: nowrap;
          transition: background 0.18s, color 0.18s, border-color 0.18s;
          flex-shrink: 0;
        }
        .brand-link:hover { background: ${NAVY}; color: #fff; border-color: ${NAVY}; }
        .brand-link .arrow { display: inline-block; transition: transform 0.18s; }
        .brand-link:hover .arrow { transform: translateX(3px); }

        /* ── CTA ── */
        .bottom-section {
          margin-top: 80px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid ${BORDER};
          min-height: 400px;
        }
        @media (max-width: 900px) {
          .bottom-section { grid-template-columns: 1fr; }
        }
        .cta-left {
          background: #fff;
          padding: 56px 52px;
          display: flex;
          flex-direction: column;
          border-right: 1px solid ${BORDER};
        }
        .cta-left-rule {
          width: 28px;
          height: 1.5px;
          background: ${RED};
          margin-bottom: 20px;
          transform-origin: left;
        }
        .cta-left-title {
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.18;
          color: ${NAVY};
          margin-bottom: 18px;
        }
        .cta-left-text {
          font-size: 14px;
          line-height: 1.82;
          color: ${MUTED};
          margin-bottom: 14px;
        }
        .cta-left-text strong { color: ${NAVY}; font-weight: 600; }

        .cta-right {
          background: ${NAVY};
          padding: 56px 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .cta-right::before {
          content: '';
          position: absolute;
          width: 320px; height: 320px;
          border-radius: 50%;
          border: 1px solid rgba(200,16,46,0.18);
          top: -80px; right: -80px;
          pointer-events: none;
        }
        .cta-right::after {
          content: '';
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          border: 1px solid rgba(200,16,46,0.12);
          bottom: -40px; left: -40px;
          pointer-events: none;
        }

        .cta-right-inner {
          position: relative;
          z-index: 1;
          max-width: 340px;
          width: 100%;
        }
        .cta-right-rule {
          width: 28px; height: 1.5px;
          background: ${RED};
          margin-bottom: 20px;
        }
        .cta-right-title {
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.18;
          color: #fff;
          margin-bottom: 18px;
        }
        .cta-right-text {
          font-size: 14px;
          line-height: 1.82;
          color: rgba(255,255,255,0.5);
          margin-bottom: 32px;
        }

        .enquiry-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          color: #fff;
          background: ${RED};
          padding: 15px 28px;
          border-radius: 3px;
          transition: background 0.18s, transform 0.18s;
        }
        .enquiry-btn:hover { background: #a50d24; transform: translateX(3px); }
        .enquiry-btn .arrow { display: inline-block; transition: transform 0.18s; }
        .enquiry-btn:hover .arrow { transform: translateX(4px); }

        .cta-stats {
          display: flex;
          gap: 32px;
          margin-top: 40px;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.08);
          flex-wrap: wrap;
        }
        .cta-stat-num {
          font-size: 1.2rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #fff;
          line-height: 1;
          margin-bottom: 4px;
        }
        .cta-stat-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        /* ── RESPONSIVE CTA ── */
        @media (max-width: 900px) {
          .cta-left, .cta-right {
            padding: 36px 26px;
          }
          .cta-left { border-right: none; border-bottom: 1px solid ${BORDER}; }
          .cta-stats { gap: 18px; }
          .cta-right-inner { text-align: center; margin: 0 auto; max-width: 100%; }
        }

        @media (max-width: 570px) {
          .cta-left, .cta-right {
            padding: 22px 6vw 18px 6vw;
          }
        }

        @media (max-width: 420px) {
          .enquiry-btn { width: 100%; justify-content: center; padding: 12px 16px; }
        }
      `}</style>

      <div className="brands-root">
        {/* ── HERO ── */}
        <section ref={heroRef} className="hero">
          <div className="hero-image-parallax">
            <Image
              src="/arneg.jpeg"
              alt="Arneg 60th Anniversary — 1963 to 2023"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center 18%" }}
            />
          </div>
          <div className="hero-overlay" />

          <div className="hero-content">
            <p className="hero-eyebrow">Our Brands</p>
            <div className="hero-bottom">
              <div>
                <h1 className="hero-title">
                  Partners in Craft<br />&amp; Innovation
                </h1>
                <p className="hero-desc">
                  From global innovation leaders to European specialists, ILK Technology
                  partners with the most trusted names in refrigeration and retail —
                  authenticity, performance, and Italian style under one roof.
                </p>
              </div>
              <div className="hero-meta">
                <div className="hero-meta-count">04</div>
                <p className="hero-meta-label">Brand Partners</p>
              </div>
            </div>
          </div>

          <div className="hero-scroll-hint">
            <div className="hero-scroll-line" />
            Scroll
          </div>
        </section>

        {/* ── BODY ── */}
        <div className="brands-inner">
          <div className="section-header">
            <span className="section-header-label">Brand Portfolio</span>
            <span className="section-header-count">04 Partners</span>
          </div>

          <div ref={cardsRef} className="brands-list">
            {BRANDS.map((brand) => (
              <article className="brand-row" key={brand.name}>
                <span className="brand-index">{brand.index}</span>

                <div className="brand-logo-wrap">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={140}
                    height={52}
                    className="brand-logo"
                    style={{ objectFit: "contain", objectPosition: "left center" }}
                  />
                </div>

                <div className="brand-body">
                  <h2 className="brand-name">{brand.name}</h2>
                  <p className="brand-tagline">{brand.tagline}</p>
                  <p className="brand-desc">{brand.desc}</p>
                </div>

                {brand.url && (
                  <Link
                    className="brand-link"
                    href={brand.url}
                    target="_blank"
                    rel="noopener"
                  >
                    Visit Website <span className="arrow">→</span>
                  </Link>
                )}
              </article>
            ))}
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="bottom-section">
            <div className="cta-left">
              <div className="cta-left-rule" />
              <h3 className="cta-left-title">
                Craftsmanship<br />Meets Innovation
              </h3>
              <p className="cta-left-text">
                Every partner combines <strong>rigorous expertise</strong>, creative
                spirit, and a relentless pursuit of progress — raising the standard
                for the industry year after year.
              </p>
              <p className="cta-left-text">
                Rooted in the rich tradition of <strong>Italian design and technology</strong>,
                each brand delivers authentic, sustainable solutions.
              </p>
            </div>

            <div className="cta-right">
              <div className="cta-right-inner">
                <div className="cta-right-rule" />
                <h3 className="cta-right-title">
                  Ready to Work<br />Together?
                </h3>
                <p className="cta-right-text">
                  Looking for a bespoke solution or tailored partnership? Our team is on
                  hand to discuss your exact requirements and connect you with the right
                  brand for your project.
                </p>
                <Link className="enquiry-btn" href="/contact">
                  Make an Enquiry <span className="arrow">→</span>
                </Link>

                <div className="cta-stats">
                  <div>
                    <div className="cta-stat-num">25+</div>
                    <div className="cta-stat-label">Years Experience</div>
                  </div>
                  <div>
                    <div className="cta-stat-num">04</div>
                    <div className="cta-stat-label">Brand Partners</div>
                  </div>
                  <div>
                    <div className="cta-stat-num">uk</div>
                    <div className="cta-stat-label">Wide Reach</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}