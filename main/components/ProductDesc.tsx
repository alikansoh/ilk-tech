"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const RAL9010 = "#F5F4F2";

const products = [
  { src: "/pic3.png", label: "Remote Multidecks" },
  { src: "/pic2.png", label: "Coldroom" },
  { src: "/pic6.png", label: "Plug in Freezer" },
  { src: "/pic4.png", label: "Shelving" },
  { src: "/pic1.png", label: "Checkouts" },
  { src: "/pic5.png", label: "Wine Cooler" },
];

const stageList = [
  "Collaboration",
  "Consultation",
  "Ideas, Design & Imagination",
  "Factory Production",
  "Final Delivery",
];

export default function ArnegProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".ap-red-line",
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: ".ap-header", start: "top 85%" },
          }
        );

        gsap.fromTo(
          ".ap-header-title > span",
          { y: "110%", opacity: 0, rotateX: -40 },
          {
            y: "0%",
            opacity: 1,
            rotateX: 0,
            stagger: 0.1,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: { trigger: ".ap-header", start: "top 82%" },
          }
        );

        gsap.fromTo(
          ".ap-logo",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: { trigger: ".ap-left", start: "top 82%" },
          }
        );
        gsap.fromTo(
          ".ap-tagline",
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            delay: 0.15,
            scrollTrigger: { trigger: ".ap-left", start: "top 82%" },
          }
        );
        gsap.fromTo(
          ".ap-list-item",
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.65,
            ease: "power3.out",
            delay: 0.25,
            scrollTrigger: { trigger: ".ap-left", start: "top 80%" },
          }
        );
        gsap.fromTo(
          ".ap-ilk-logo",
          { scale: 0.88, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "back.out(1.4)",
            delay: 0.4,
            scrollTrigger: { trigger: ".ap-left", start: "top 80%" },
          }
        );
        gsap.fromTo(
          ".ap-email",
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.55,
            scrollTrigger: { trigger: ".ap-left", start: "top 80%" },
          }
        );

        // CTA animation
        gsap.fromTo(
          ".ap-cta",
          { y: 18, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.7,
            scrollTrigger: { trigger: ".ap-left", start: "top 80%" },
          }
        );

        gsap.fromTo(
          ".ap-img-item",
          { y: 50, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: { amount: 0.7, from: "start" },
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: { trigger: ".ap-grid", start: "top 80%" },
          }
        );

        gsap.fromTo(
          ".ap-img-label",
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.4,
            scrollTrigger: { trigger: ".ap-grid", start: "top 78%" },
          }
        );
      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <>
      <style>{`
        .ap-section {
          background: ${RAL9010};
        }

        /* Tile card — red border, no radius for sharp industrial look */
        .ap-tile {
          background: #fff;
          border: 2px solid #C8102E;
          border-radius: 0px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.35s cubic-bezier(.2,.9,.2,1), transform 0.35s cubic-bezier(.2,.9,.2,1);
          cursor: pointer;
          position: relative;
          min-height: 100%;
        }
        .ap-tile:hover,
        .ap-tile:focus-within {
          box-shadow: 0 18px 46px rgba(200,16,46,0.18);
          transform: translateY(-6px) scale(1.005);
        }
        .ap-tile:focus {
          outline: 3px solid rgba(200,16,46,0.4);
          outline-offset: 2px;
        }

        /* Stage number badge */
        .ap-stage-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #C8102E;
          color: #fff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          padding: 6px 10px;
          border-radius: 0px;
          z-index: 6;
          line-height: 1;
          box-shadow: 0 4px 10px rgba(0,0,0,0.12);
        }

        /* Image wrapper — tall aspect ratio for bigger visual presence */
        .ap-tile-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/5;
          background: ${RAL9010};
          overflow: hidden;
        }

        .ap-tile-img-wrap img {
          object-fit: cover;
          object-position: center;
          transition: transform 0.9s cubic-bezier(.2,.9,.2,1);
          width: 100%;
          height: 100%;
          display: block;
        }

        .ap-tile:hover .ap-tile-img-wrap img,
        .ap-tile:focus-within .ap-tile-img-wrap img {
          transform: scale(1.08);
        }

        /* Name label below image — solid, not overlay */
        .ap-tile-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px 13px;
          background: #fff;
          border-top: 2px solid #C8102E;
          z-index: 5;
          flex-shrink: 0;
        }

        .ap-tile-footer-line {
          width: 16px;
          height: 3px;
          background: #C8102E;
          flex-shrink: 0;
          border-radius: 0px;
        }

        .ap-tile-footer-label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: #001845;
          line-height: 1.2;
        }

        /* Numbered stage list */
        .ap-stage-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #C8102E;
          color: #fff;
          font-size: 11px;
          font-weight: 800;
          flex-shrink: 0;
          line-height: 1;
        }

        /* Grid */
        .ap-grid {
          gap: 16px;
        }

        .ap-img-item:focus-within .ap-tile-footer-label {
          text-decoration: underline;
        }

        /* CTA button */
        .ap-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 18px;
          background: linear-gradient(180deg, #C8102E, #A10A22);
          color: #fff;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 13px;
          border: 0;
          border-radius: 6px;
          box-shadow: 0 8px 24px rgba(200,16,46,0.18);
          text-decoration: none;
          transition: transform 0.18s cubic-bezier(.2,.9,.2,1), box-shadow 0.18s, background 0.18s;
          cursor: pointer;
          width: 100%;
          max-width: 240px;
        }

        .ap-cta:hover,
        .ap-cta:focus {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 18px 46px rgba(200,16,46,0.22);
          outline: none;
        }

        .ap-cta:focus-visible {
          outline: 3px solid rgba(200,16,46,0.28);
          outline-offset: 3px;
        }

        /* Secondary small note under CTA */
        .ap-cta-note {
          font-size: 12px;
          color: #001845;
          opacity: 0.55;
          margin-top: 8px;
        }

        /* Make CTA stack nicely in small screens */
        .ap-left-cta-wrap {
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: flex-start;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="ap-section relative w-full overflow-hidden"
      >
        {/* HEADER */}
        <div className="ap-header max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-24 sm:pt-32 pb-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="ap-red-line h-[2px] w-14 bg-red-600 origin-left" />
            <span className="text-[11px] font-black tracking-[0.28em] uppercase text-red-600">
              Our Products
            </span>
          </div>
          <div style={{ perspective: "1200px" }}>
            <h2 className="ap-header-title flex flex-wrap gap-x-[0.18em] text-[clamp(48px,8vw,100px)] font-black leading-[0.9] tracking-[-0.04em] text-[#001845] uppercase">
              {["We", "Create", "Your", "Space."].map((w, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-top"
                >
                  <span className="inline-block">{w}</span>
                </span>
              ))}
            </h2>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-0 pb-28 sm:pb-36">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
            {/* LEFT PANEL — unchanged */}
            <div className="ap-left w-full lg:w-[280px] flex-shrink-0 lg:pr-12 flex flex-col justify-between gap-10">
              <div>
                <div className="ap-logo opacity-0">
                  <div className="inline-flex items-center bg-red-600 px-5 py-3 mb-6">
                    <Image
                      src="/logo1.png"
                      alt="Arneg"
                      width={140}
                      height={42}
                      className="object-contain"
                    />
                  </div>
                </div>

                <p className="ap-tagline opacity-0 text-[clamp(15px,1.6vw,19px)] font-black leading-[1.35] tracking-[-0.02em] text-[#001845] uppercase mb-8">
                  We create your space with a bespoke retail design project.
                </p>

                {/* Stage list with numbered badges */}
                <ul className="flex flex-col gap-3 mb-10">
                  {stageList.map((item, idx) => (
                    <li
                      key={item}
                      className="ap-list-item opacity-0 flex items-center gap-3"
                    >
                      <span className="ap-stage-num">{idx + 1}</span>
                      <span className="text-[13px] font-semibold text-[#001845]/65 tracking-wide leading-tight">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-5">
                <div className="ap-ilk-logo opacity-0 border border-[#001845]/[0.08] p-4 w-fit bg-white">
                  <Image
                    src="/logo.png"
                    alt="ILK Technology"
                    width={120}
                    height={56}
                    className="object-contain"
                  />
                </div>

                <a
                  href="mailto:sales@ilktechnology.com"
                  className="ap-email opacity-0 text-[13px] font-bold text-[#001845]/35 tracking-wide hover:text-red-600 transition-colors duration-300"
                >
                  sales@ilktechnology.com
                </a>

                {/* CTA: Request a Quote */}
                <div className="ap-left-cta-wrap">
                  <a
                    href="mailto:sales@ilktechnology.com?subject=Request%20a%20Quote"
                    className="ap-cta"
                    aria-label="Request a quote via email"
                  >
                    Book A Consultation{" "}
                  </a>
                  <div className="ap-cta-note">
                    Or call us to discuss your project — we’ll respond within
                    one business day.
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT TILE GRID */}
            <div className="ap-grid flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4 lg:pl-10 lg:border-l border-[#001845]/[0.07]">
              {products.map((p, idx) => (
                <div
                  key={p.label}
                  className="ap-img-item ap-tile opacity-0"
                  tabIndex={0}
                  role="group"
                  aria-label={p.label}
                >
                  {/* Image area */}
                  <div className="ap-tile-img-wrap">
                    <span className="ap-stage-badge">0{idx + 1}</span>
                    <Image
                      src={p.src}
                      alt={p.label}
                      fill
                      quality={90}
                      sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>

                  {/* Name label — solid strip below image */}
                  <div className="ap-img-label ap-tile-footer">
                    <div className="ap-tile-footer-line" />
                    <span className="ap-tile-footer-label">{p.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* bottom border */}
        <div className="h-[3px] w-full bg-[#001845]" />
      </section>
    </>
  );
}
