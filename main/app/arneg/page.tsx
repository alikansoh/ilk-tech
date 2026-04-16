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

export default function BrandsPage({
  heroHeight = "92vh",
}: {
  heroHeight?: string;
}) {
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

        gsap.from(".brand-row", {
          opacity: 0,
          y: 36,
          stagger: 0.13,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 82%" },
        });

        gsap.from(".visit-callout", {
          opacity: 0,
          y: 32,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".visit-callout", start: "top 82%" },
        });

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

        /* ─── HERO ─── */
        .hero {
          position: relative;
          width: 100%;
          height: var(--hero-height, 92vh);
          min-height: 520px;
          /* Increased from 880px to 1080px for large screens */
          max-height: 1080px;
          overflow: hidden;
          background: ${NAVY};
          display: flex;
          align-items: flex-end;
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
          padding: 0 64px 80px;
          max-width: 1160px;
          margin: 0 auto;
          left: 0;
          right: 0;
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

        .hero-title {
          font-size: clamp(2rem, 4.5vw, 5.5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: #fff;
          max-width: 640px;
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

        /* ─── HERO RESPONSIVE ─── */
        @media (max-width: 1100px) {
          .hero { height: 80vh; min-height: 370px; max-height: 760px; }
        }
        @media (max-width: 820px) {
          .hero-content { padding: 0 28px 52px; }
          .hero-scroll-hint { right: 28px; }
        }
        @media (max-width: 800px) {
          .hero-bottom { grid-template-columns: 1fr; gap: 20px; }
          .hero-meta { text-align: left; }
          .hero-meta-label { text-align: left; }
        }
        @media (max-width: 600px) {
          .hero { height: 72vh; min-height: 320px; max-height: 580px; }
          .hero-content { padding: 0 20px 36px; }
          .hero-meta { display: none; }
          .hero-scroll-hint { right: 20px; bottom: 20px; }
          .hero-desc { font-size: 14px; margin-top: 14px; }
        }
        @media (max-width: 420px) {
          .hero { height: 80vh; }
          .hero-content { padding: 0 16px 28px; }
          .hero-title { font-size: clamp(1.6rem, 8vw, 2.2rem); }
          .hero-desc { font-size: 13px; }
        }

        /* ─── PAGE BODY ─── */
        .brands-inner {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 40px 100px;
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

        /* ─── BRAND ROWS ─── */
        .brands-list { margin-top: 0; }

        .brand-row {
          display: grid;
          grid-template-columns: 52px 160px 1fr auto;
          grid-template-areas: "index logo body link";
          align-items: center;
          gap: 32px;
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

        @media (hover: hover) {
          .brand-row:hover::before { background: rgba(11,37,64,0.025); }
          .brand-row:hover .brand-name { color: ${RED}; }
        }

        .brand-row > * { position: relative; z-index: 1; }

        .brand-index {
          grid-area: index;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: ${RED};
        }

        .brand-logo-wrap {
          grid-area: logo;
          width: 160px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-shrink: 0;
          min-width: 0;
        }

        .brand-logo,
        .brand-logo-wrap img {
          max-width: 100%;
          height: auto;
          display: block;
        }

        .brand-body {
          grid-area: body;
          min-width: 0;
        }

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

        .brand-desc {
          font-size: 13.5px;
          line-height: 1.7;
          color: #4B5563;
          max-width: 480px;
        }

        .brand-link {
          grid-area: link;
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
          align-self: center;
        }
        .brand-link:hover { background: ${NAVY}; color: #fff; border-color: ${NAVY}; }
        .brand-link .arrow { display: inline-block; transition: transform 0.18s; }
        .brand-link:hover .arrow { transform: translateX(3px); }

        /* ─── BRAND ROW RESPONSIVE ─── */
        @media (max-width: 960px) {
          .brands-inner { padding: 0 24px 80px; }
          .brand-row {
            grid-template-columns: 130px 1fr auto;
            grid-template-areas: "logo body link";
            gap: 20px;
          }
          .brand-index { display: none; }
          .brand-logo-wrap { width: 130px; height: 52px; }
          .brand-desc { max-width: 100%; }
        }

        @media (max-width: 680px) {
          .brand-row {
            grid-template-columns: 100px 1fr;
            grid-template-areas:
              "logo  body"
              "logo  link";
            gap: 10px 16px;
            padding: 24px 0;
            align-items: start;
          }
          .brand-logo-wrap {
            grid-area: logo;
            width: 100px;
            height: 48px;
            padding-top: 4px;
          }
          .brand-link {
            justify-self: start;
            margin-top: 4px;
            padding: 9px 14px;
            font-size: 9px;
          }
          .brand-name { font-size: 1.25rem; }
          .brand-desc { font-size: 13px; }
        }

        @media (max-width: 460px) {
          .brands-inner { padding: 0 16px 60px; }
          .brand-row {
            grid-template-columns: 80px 1fr;
            gap: 8px 12px;
            padding: 20px 0;
          }
          .brand-logo-wrap { width: 80px; height: 40px; }
          .brand-name { font-size: 1.1rem; }
          .brand-tagline { font-size: 9px; margin-bottom: 8px; }
          .brand-desc { font-size: 12.5px; }
          .brand-link { padding: 8px 12px; font-size: 9px; }
        }

        @media (max-width: 360px) {
          .brand-row {
            grid-template-columns: 1fr;
            grid-template-areas:
              "logo"
              "body"
              "link";
          }
          .brand-logo-wrap { width: 100px; height: 44px; }
          .brand-link { width: 100%; justify-content: center; }
        }

        /* ─── VISIT BRANDS CALLOUT ─── */
        .visit-callout {
          margin-top: 64px;
          padding: 64px 72px;
          background: ${NAVY};
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
          position: relative;
          overflow: hidden;
        }

        .visit-callout::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: ${RED};
        }

        .visit-callout::after {
          content: '';
          position: absolute;
          width: 420px; height: 420px;
          border-radius: 50%;
          border: 1px solid rgba(200,16,46,0.12);
          top: -120px; right: -100px;
          pointer-events: none;
        }

        .visit-callout-left {
          position: relative;
          z-index: 1;
        }

        .visit-callout-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: ${RED};
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .visit-callout-eyebrow::before {
          content: '';
          display: block;
          width: 24px;
          height: 1.5px;
          background: ${RED};
          flex-shrink: 0;
        }

        .visit-callout-heading {
          font-size: clamp(1.8rem, 3.2vw, 3.2rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.05;
          color: #fff;
          max-width: 540px;
        }

        .visit-callout-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.5);
          line-height: 1.72;
          max-width: 460px;
          margin-top: 18px;
        }

        .visit-callout-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          min-width: 220px;
        }

        .visit-brand-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          text-decoration: none;
          padding: 14px 20px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 3px;
          transition: background 0.18s, border-color 0.18s;
          background: rgba(255,255,255,0.04);
        }
        .visit-brand-btn:hover {
          background: rgba(200,16,46,0.18);
          border-color: rgba(200,16,46,0.4);
        }
        .visit-brand-btn-name {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.01em;
        }
        .visit-brand-btn-arrow {
          font-size: 14px;
          color: ${RED};
          display: inline-block;
          transition: transform 0.18s;
        }
        .visit-brand-btn:hover .visit-brand-btn-arrow {
          transform: translateX(4px);
        }

        /* ─── VISIT CALLOUT RESPONSIVE ─── */
        @media (max-width: 1000px) {
          .visit-callout { padding: 52px 48px; gap: 36px; }
        }
        @media (max-width: 820px) {
          .visit-callout {
            flex-direction: column;
            align-items: flex-start;
            padding: 44px 36px;
            gap: 32px;
          }
          .visit-callout-links { min-width: unset; width: 100%; }
          .visit-brand-btn { width: 100%; }
        }
        @media (max-width: 560px) {
          .visit-callout { padding: 36px 24px; margin-top: 48px; }
          .visit-callout-heading { font-size: clamp(1.5rem, 7vw, 2rem); }
        }
        @media (max-width: 420px) {
          .visit-callout { padding: 28px 18px; }
        }

        /* ─── VIDEO SECTION ─── */
        .video-section {
          margin-top: 72px;
          padding-top: 52px;
          border-top: 1px solid ${BORDER};
        }
        .video-section-header {
          margin-bottom: 24px;
        }
        .video-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: ${MUTED};
        }
        .video-wrap {
          width: 100%;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid ${BORDER};
          background: #000;
          line-height: 0;
        }
        .brand-video {
          width: 100%;
          display: block;
          max-height: 560px;
          object-fit: cover;
        }
        @media (max-width: 600px) {
          .video-section { margin-top: 48px; padding-top: 36px; }
          .brand-video { max-height: 240px; }
        }

        /* ─── CTA ─── */
        .bottom-section {
          margin-top: 80px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid ${BORDER};
          min-height: 400px;
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

        /* ─── CTA RESPONSIVE ─── */
        @media (max-width: 900px) {
          .bottom-section { grid-template-columns: 1fr; min-height: unset; }
          .cta-left {
            padding: 40px 32px;
            border-right: none;
            border-bottom: 1px solid ${BORDER};
          }
          .cta-right { padding: 40px 32px; }
          .cta-right-inner { max-width: 100%; }
          .cta-stats { gap: 24px; }
        }
        @media (max-width: 560px) {
          .bottom-section { margin-top: 52px; }
          .cta-left { padding: 32px 20px; }
          .cta-right { padding: 32px 20px; }
          .cta-right-inner { text-align: left; }
          .cta-stats { gap: 20px; }
        }
        @media (max-width: 400px) {
          .enquiry-btn { width: 100%; justify-content: center; padding: 13px 16px; }
        }
      `}</style>

      <div className="brands-root">
        {/* HERO */}
        <section
          ref={heroRef}
          className="hero"
          style={{ height: heroHeight }}
        >
          <div className="hero-image-parallax">
            <Image
              src="/arneg.jpeg"
              alt="Arneg — ILK Technology distribution partner"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center 65%" }}
            />
          </div>
          <div className="hero-overlay" />

          <div className="hero-content">
            <p className="hero-eyebrow">Our Brands</p>
            <div className="hero-bottom">
              <div>
                <h1 className="hero-title">
                  Your Distribution<br />Partner
                </h1>
                <p className="hero-desc">
                  ILK Technology is the trusted UK distribution partner for the most
                  respected names in refrigeration and retail equipment — bringing
                  world-class brands directly to your door.
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

        {/* BODY */}
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

          {/* VISIT BRANDS CALLOUT */}
          <div className="visit-callout">
            <div className="visit-callout-left">
              <p className="visit-callout-eyebrow">Explore the Full Range</p>
              <h2 className="visit-callout-heading">
                Visit Our Brand Websites to See the Full Product Range
              </h2>
              <p className="visit-callout-sub">
                Each of our partners offers an extensive catalogue of products beyond what we list here.
                Head directly to their websites to explore the complete range, technical specs, and the
                latest innovations.
              </p>
            </div>

            <div className="visit-callout-links">
              {BRANDS.filter((b) => b.url).map((brand) => (
                <Link
                  key={brand.name}
                  className="visit-brand-btn"
                  href={brand.url!}
                  target="_blank"
                  rel="noopener"
                >
                  <span className="visit-brand-btn-name">{brand.name}</span>
                  <span className="visit-brand-btn-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* VIDEO */}
          <div className="video-section">
            <div className="video-section-header">
              <span className="video-eyebrow">See It In Action</span>
            </div>
            <div className="video-wrap">
              <video
                src="/arneg.mp4"
                controls
                playsInline
                className="brand-video"
              />
            </div>
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="bottom-section">
            <div className="cta-left">
              <div className="cta-left-rule" />
              <h3 className="cta-left-title">
                Your UK<br />Distribution Partner
              </h3>
              <p className="cta-left-text">
                ILK Technology is the <strong>official UK distributor</strong> for each
                of these brands — giving you direct access to the right products,
                the right support, and the right expertise.
              </p>
              <p className="cta-left-text">
                We handle sourcing, supply, and logistics so you can focus on
                <strong> running your business</strong> with confidence.
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
                    <div className="cta-stat-num">UK</div>
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