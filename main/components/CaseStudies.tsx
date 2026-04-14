"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const works = [
  { src: "/gallery1.jpg", alt: "Store Fitout A", category: "Fitout", location: "Tooting" },
  { src: "/gallery2.jpeg", alt: "Supermarket B", category: "Retail", location: "South End On Sea" },
  { src: "/gallery3.jpeg", alt: "Checkout Area C", category: "Checkout", location: "Cotswold" },
  { src: "/gallery4.jpg", alt: "Coldroom D", category: "Coldroom", location: "Brighton" },
  { src: "/gallery5.jpg", alt: "Display Shelves E", category: "Shelving", location: "South London" },
  { src: "/gallery6.jpg", alt: "Backroom F", category: "Storage", location: "Tooting" },
  { src: "/gallery7.jpeg", alt: "Backroom F", category: "Storage", location: "Chelmsford" },
  { src: "/gallery8 .jpg", alt: "Backroom F", category: "Storage", location: "South London" },


  
];

export default function ArnegWorks() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // GSAP animations
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".aw-eyebrow",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ".aw-eyebrow", start: "top 92%" },
          }
        );

        gsap.fromTo(
          ".aw-heading",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            delay: 0.1,
            scrollTrigger: { trigger: ".aw-heading", start: "top 92%" },
          }
        );

        gsap.fromTo(
          ".aw-sub",
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: { trigger: ".aw-sub", start: "top 92%" },
          }
        );

        gsap.fromTo(
          ".aw-slider-wrap",
          { y: 60, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "expo.out",
            duration: 1.1,
            scrollTrigger: { trigger: ".aw-slider-wrap", start: "top 85%" },
          }
        );
      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, []);

  // Stable callbacks to avoid stale closure in keyboard handler
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + works.length) % works.length
    );
  }, []);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % works.length
    );
  }, []);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, nextLightbox, prevLightbox]);

  // Cleanup body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const lightbox =
    mounted && lightboxIndex !== null
      ? createPortal(
          <div
            className="aw-lightbox"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <div className="aw-lb-bg" />
            <div className="aw-lb-inner" onClick={(e) => e.stopPropagation()}>
              <div className="aw-lb-frame">
                <button
                  className="aw-lb-nav aw-lb-prev"
                  onClick={prevLightbox}
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  className="aw-lb-nav aw-lb-next"
                  onClick={nextLightbox}
                  aria-label="Next"
                >
                  ›
                </button>
                <Image
                  src={works[lightboxIndex].src}
                  alt={works[lightboxIndex].alt}
                  fill
                  quality={95}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&display=swap');

        .aw-section {
          position: relative;
          overflow: hidden;
          background: #001845;
        }

        .aw-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.35;
          pointer-events: none;
          z-index: 0;
        }

        .aw-blob-1 {
          position: absolute;
          top: -180px;
          left: -120px;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(220,38,38,0.13) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          filter: blur(40px);
        }

        .aw-blob-2 {
          position: absolute;
          bottom: -200px;
          right: -100px;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          filter: blur(60px);
        }

        .aw-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 72px 72px;
          pointer-events: none;
          z-index: 0;
        }

        .aw-inner {
          position: relative;
          z-index: 1;
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .aw-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 48px;
          margin-bottom: 48px;
        }

        .aw-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .aw-eyebrow-line {
          width: 36px;
          height: 2px;
          background: #dc2626;
          border-radius: 999px;
        }

        .aw-eyebrow-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: #dc2626;
        }

        .aw-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(58px, 8vw, 108px);
          line-height: 0.88;
          letter-spacing: 0.015em;
          color: #f8f4ef;
          margin: 0;
          white-space: nowrap;
        }

        .aw-heading em {
          font-style: normal;
          -webkit-text-stroke: 1.5px rgba(248,244,239,0.22);
          color: transparent;
        }

        .aw-heading mark {
          background: none;
          color: #dc2626;
        }

        .aw-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(248,244,239,0.52);
          max-width: 420px;
          margin-top: 20px;
        }

        .aw-header-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 20px;
          flex-shrink: 0;
        }

        .aw-side-copy {
          max-width: 320px;
          margin: 0;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          line-height: 1.7;
          color: rgba(248,244,239,0.58);
          text-align: right;
        }

        .aw-cta {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 14px 20px 14px 24px;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(220,38,38,0.18), rgba(220,38,38,0.06));
          border: 1px solid rgba(220,38,38,0.28);
          color: #f8f4ef;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          backdrop-filter: blur(12px);
        }

        .aw-cta:hover {
          background: linear-gradient(135deg, rgba(220,38,38,0.35), rgba(220,38,38,0.14));
          border-color: rgba(220,38,38,0.55);
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(220,38,38,0.2);
        }

        .aw-cta-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #dc2626;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          transition: transform 0.3s ease;
          box-shadow: 0 4px 14px rgba(220,38,38,0.45);
        }

        .aw-cta:hover .aw-cta-icon {
          transform: translateX(3px);
        }

        .aw-slider-wrap {
          position: relative;
        }

        .aw-slide-card {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          background: #0d1117;
          cursor: pointer;
          border: none;
          padding: 0;
          aspect-ratio: 16 / 11;
          width: 100%;
          isolation: isolate;
          transition: transform 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.5s ease;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.05) inset,
            0 24px 48px rgba(0,0,0,0.4);
        }

        .aw-slide-card:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.07) inset,
            0 32px 64px rgba(0,0,0,0.55),
            0 0 0 1px rgba(220,38,38,0.22);
        }

        .aw-item-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(3,7,18,0.88) 0%,
            rgba(3,7,18,0.4) 40%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 2;
        }

        .aw-slide-card:hover .aw-item-overlay {
          opacity: 1;
        }

        .aw-img {
          object-fit: cover;
          transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.6s ease;
          filter: grayscale(8%) brightness(0.88) saturate(1.1);
        }

        .aw-slide-card:hover .aw-img {
          transform: scale(1.09);
          filter: grayscale(0%) brightness(1) saturate(1.15);
        }

        .aw-location-tag {
          position: absolute;
          top: 16px;
          left: 16px;
          background: transparent;
          border: 1px solid #f8f4ef;
          color: #f8f4ef;
          padding: 4px 8px;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          z-index: 3;
          backdrop-filter: blur(8px);
        }

        .swiper {
          padding-bottom: 48px !important;
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: #f8f4ef !important;
          background: rgba(255,255,255,0.06);
          width: 48px !important;
          height: 48px !important;
          border-radius: 50%;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 16px !important;
          font-weight: 700;
        }

        .swiper-pagination-bullet {
          background: rgba(248,244,239,0.28) !important;
          opacity: 1 !important;
          transition: width 0.3s ease, background 0.3s ease !important;
        }

        .swiper-pagination-bullet-active {
          width: 30px !important;
          border-radius: 999px !important;
          background: #dc2626 !important;
        }

        .aw-lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          animation: lb-fade 0.3s ease;
        }

        @keyframes lb-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes lb-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .aw-lb-bg {
          position: absolute;
          inset: 0;
          background: rgba(3,7,18,0.97);
          backdrop-filter: blur(24px) saturate(0.4);
        }

        .aw-lb-inner {
          position: relative;
          z-index: 1;
          width: min(94vw, 1280px);
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: lb-up 0.35s cubic-bezier(0.4,0,0.2,1);
        }

        .aw-lb-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 20px;
          overflow: hidden;
          background: #0d1117;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.06),
            0 48px 120px rgba(0,0,0,0.85);
        }

        .aw-lb-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(15,20,35,0.7);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(12px);
          transition: all 0.25s ease;
          font-size: 20px;
        }

        .aw-lb-nav:hover {
          background: #dc2626;
          border-color: #dc2626;
          transform: translateY(-50%) scale(1.08);
          box-shadow: 0 8px 24px rgba(220,38,38,0.35);
        }

        .aw-lb-prev { left: -72px; }
        .aw-lb-next { right: -72px; }

        @media (max-width: 1100px) {
          .aw-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .aw-header-right {
            align-items: flex-start;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .aw-side-copy {
            text-align: left;
          }
          .aw-heading {
            white-space: normal;
          }
          .aw-lb-prev { left: 10px; }
          .aw-lb-next { right: 10px; }
        }

        @media (max-width: 640px) {
          .aw-inner { padding: 0 20px; }
          .aw-lightbox { padding: 16px; }
          .aw-lb-prev { left: 8px; }
          .aw-lb-next { right: 8px; }
          .aw-lb-nav { width: 44px; height: 44px; }
        }
      `}</style>

      <section ref={sectionRef} className="aw-section w-full py-28">
        <div className="aw-blob-1" />
        <div className="aw-blob-2" />
        <div className="aw-grid-bg" />

        <div className="aw-inner">
          <div className="aw-header">
            <div>
              <div className="aw-eyebrow">
                <div className="aw-eyebrow-line" />
                <span className="aw-eyebrow-text">Visual Gallery</span>
              </div>

              <h2 className="aw-heading">
                OUR <em>CASE</em> <mark>STUDIES</mark>
              </h2>

              <p className="aw-sub">
                A curated collection of completed spaces, installations, and retail environments —
                built with precision, designed to perform.
              </p>
            </div>

            <div className="aw-header-right">
              <p className="aw-side-copy">
                Premium retail fitouts, coldroom installs, shelving, and checkout solutions —
                crafted to elevate every square meter.
              </p>

              <a href="#contact" className="aw-cta">
                Book a Consultation
                <span className="aw-cta-icon">→</span>
              </a>
            </div>
          </div>

          <div className="aw-slider-wrap">
            {mounted && (
              <Swiper
                key="aw-swiper"
                modules={[Navigation, Pagination, Autoplay, Keyboard]}
                spaceBetween={18}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                keyboard={{ enabled: true }}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 1.15, spaceBetween: 18 },
                  768: { slidesPerView: 2, spaceBetween: 18 },
                  1024: { slidesPerView: 2.5, spaceBetween: 20 },
                  1280: { slidesPerView: 3, spaceBetween: 20 },
                }}
              >
                {works.map((w, idx) => (
                  <SwiperSlide key={w.src}>
                    <button
                      className="aw-slide-card"
                      onClick={() => openLightbox(idx)}
                      aria-label={`View ${w.alt}`}
                    >
                      <Image
                        src={w.src}
                        alt={w.alt}
                        fill
                        quality={92}
                        className="aw-img"
                        style={{ position: "absolute" }}
                      />
                      <div className="aw-location-tag">{w.location}</div>
                      <div className="aw-item-overlay" />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </section>

      {lightbox}
    </>
  );
}