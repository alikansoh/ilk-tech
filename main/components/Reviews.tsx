"use client";

import { useEffect, useRef } from "react";

const testimonials = [
  {
    company: "Fresh Foods Market",
    quote:
      "ILK Technology has transformed our business with its exceptional refrigeration solutions. Their expertise and professionalism are unmatched.",
    author: "John Smith",
    initials: "JS",
  },
  {
    company: "Premier Supermarket",
    quote:
      "Outstanding service and support. Their team's quick response time and technical knowledge have saved us countless times.",
    author: "Sarah Johnson",
    initials: "SJ",
  },
  {
    company: "BP Petrol Station",
    quote:
      "The most reliable partner for all our commercial refrigeration needs. The Osaka 2 units sprayed in black really enhance the shop's features and presentation.",
    author: "Michael Chen",
    initials: "MC",
  },
  {
    company: "Nisa",
    quote:
      "Exceptional service. Easy to contact, friendly, and always ready to help. Highly recommend.",
    author: "Nisa Representative",
    initials: "NR",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // ── Kicker line draw ──────────────────────────────────────────
        gsap.fromTo(
          ".ts-kicker-line",
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: ".ts-kicker", start: "top 90%" },
          }
        );

        // ── Kicker text ───────────────────────────────────────────────
        gsap.fromTo(
          ".ts-kicker-text",
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: { trigger: ".ts-kicker", start: "top 90%" },
          }
        );

        // ── Title — split word reveal ─────────────────────────────────
        const titleEl = document.querySelector(".ts-title");
        if (titleEl) {
          const words = (titleEl.textContent ?? "").split(" ");
          titleEl.innerHTML = words
            .map(
              (w) =>
                `<span class="ts-word-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="ts-word" style="display:inline-block;">${w}&nbsp;</span></span>`
            )
            .join("");

          gsap.fromTo(
            ".ts-word",
            { y: "110%", rotate: 3 },
            {
              y: "0%",
              rotate: 0,
              stagger: 0.07,
              duration: 0.65,
              ease: "power3.out",
              scrollTrigger: { trigger: ".ts-title", start: "top 90%" },
            }
          );
        }

        // ── Subtitle fade ─────────────────────────────────────────────
        gsap.fromTo(
          ".ts-subtitle",
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.35,
            ease: "power2.out",
            scrollTrigger: { trigger: ".ts-subtitle", start: "top 92%" },
          }
        );

        // ── Cards — staggered 3-D flip-up ────────────────────────────
        gsap.set(".ts-card", { opacity: 0, y: 40, rotateX: 12, transformPerspective: 900 });

        ScrollTrigger.create({
          trigger: ".ts-grid",
          start: "top 85%",
          onEnter: () => {
            gsap.to(".ts-card", {
              opacity: 1,
              y: 0,
              rotateX: 0,
              stagger: 0.12,
              duration: 0.75,
              ease: "power3.out",
            });

            // ── Quote marks animate in after cards ───────────────────
            gsap.fromTo(
              ".ts-quote-mark",
              { opacity: 0, scale: 0.4, y: 6 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                stagger: 0.12,
                duration: 0.5,
                delay: 0.3,
                ease: "back.out(1.6)",
              }
            );

            // ── Stars cascade ─────────────────────────────────────────
            gsap.fromTo(
              ".ts-stars",
              { opacity: 0, x: -8 },
              {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.4,
                delay: 0.5,
                ease: "power2.out",
              }
            );
          },
        });

        // ── Magnetic hover effect ─────────────────────────────────────
        const cards = document.querySelectorAll<HTMLElement>(".ts-card");

        cards.forEach((card) => {
          const handleMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);

            gsap.to(card, {
              rotateY: dx * 5,
              rotateX: -dy * 5,
              transformPerspective: 800,
              duration: 0.35,
              ease: "power2.out",
            });

            // Subtle inner glow following cursor
            const glowX = ((e.clientX - rect.left) / rect.width) * 100;
            const glowY = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty("--glow-x", `${glowX}%`);
            card.style.setProperty("--glow-y", `${glowY}%`);
          };

          const handleLeave = () => {
            gsap.to(card, {
              rotateY: 0,
              rotateX: 0,
              duration: 0.55,
              ease: "elastic.out(1, 0.6)",
            });
            card.style.setProperty("--glow-x", "50%");
            card.style.setProperty("--glow-y", "50%");
          };

          card.addEventListener("mousemove", handleMove);
          card.addEventListener("mouseleave", handleLeave);
        });

        // ── Ambient background orbs parallax ──���──────────────────────
        gsap.to(".ts-orb-1", {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        gsap.to(".ts-orb-2", {
          y: 50,
          x: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <>
      <style>{`
        .ts-section {
          color: #111827;
          position: relative;
          overflow: hidden;
          background: #fafafa;
        }

        /* ── ambient orbs ── */
        .ts-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          will-change: transform;
          filter: blur(72px);
        }

        .ts-orb-1 {
          width: 480px;
          height: 480px;
          top: -120px;
          right: -80px;
          background: radial-gradient(circle, rgba(1,26,70,0.07) 0%, transparent 70%);
        }

        .ts-orb-2 {
          width: 360px;
          height: 360px;
          bottom: -60px;
          left: -100px;
          background: radial-gradient(circle, rgba(1,26,70,0.05) 0%, transparent 70%);
        }

        .ts-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 96px 24px;
          position: relative;
          z-index: 1;
        }

        .ts-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          margin-bottom: 52px;
          flex-wrap: wrap;
        }

        .ts-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #011A46;
          margin-bottom: 16px;
        }

        .ts-kicker-line {
          width: 32px;
          height: 2px;
          background: #011A46;
          border-radius: 999px;
          display: inline-block;
          flex-shrink: 0;
        }

        .ts-kicker-text {
          display: inline-block;
        }

        .ts-title {
          margin: 0;
          font-size: clamp(38px, 5vw, 62px);
          line-height: 1;
          letter-spacing: -0.04em;
          font-weight: 700;
          color: #111827;
        }

        .ts-subtitle {
          margin: 14px 0 0;
          max-width: 480px;
          font-size: 15px;
          line-height: 1.75;
          color: #6b7280;
          opacity: 0;
        }

        /* ── grid ── */
        .ts-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 20px;
        }

        /* ── cards ── */
        .ts-card {
          grid-column: span 6;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          padding: 28px;
          box-shadow:
            0 1px 3px rgba(17,24,39,0.04),
            0 8px 24px rgba(17,24,39,0.05);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          will-change: transform;
          transform-style: preserve-3d;
          position: relative;
          overflow: hidden;
          cursor: default;
          --glow-x: 50%;
          --glow-y: 50%;
        }

        /* ── cursor-following radial shimmer ── */
        .ts-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: radial-gradient(
            200px circle at var(--glow-x) var(--glow-y),
            rgba(1,26,70,0.04),
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .ts-card:hover::before {
          opacity: 1;
        }

        .ts-card:hover {
          border-color: #d1d5db;
          box-shadow:
            0 4px 6px rgba(17,24,39,0.04),
            0 16px 40px rgba(17,24,39,0.09);
        }

        /* ── quote mark ── */
        .ts-quote-mark {
          display: block;
          font-size: 56px;
          line-height: 0.85;
          color: #011A46;
          font-family: Georgia, "Times New Roman", serif;
          margin-bottom: 10px;
          opacity: 0;
          transform-origin: left center;
          user-select: none;
        }

        .ts-company {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #011A46;
          margin-bottom: 18px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .ts-company::after {
          content: "";
          width: 20px;
          height: 1px;
          background: currentColor;
          opacity: 0.4;
        }

        .ts-quote {
          margin: 0;
          font-size: 15px;
          line-height: 1.85;
          color: #374151;
        }

        /* ── footer ── */
        .ts-footer {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .ts-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #EEF2FF;
          border: 1.5px solid #C7D2FE;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: #3730A3;
          flex-shrink: 0;
          letter-spacing: 0.02em;
        }

        .ts-author-info {
          flex: 1;
          min-width: 0;
        }

        .ts-author {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ts-meta {
          font-size: 12px;
          color: #9ca3af;
          margin-top: 2px;
        }

        .ts-stars {
          color: #011A46;
          font-size: 12px;
          letter-spacing: 2px;
          white-space: nowrap;
          opacity: 0;
        }

        /* ── responsive ── */
        @media (max-width: 900px) {
          .ts-card {
            grid-column: span 12;
          }

          .ts-top {
            align-items: flex-start;
          }
        }

        @media (max-width: 640px) {
          .ts-inner {
            padding: 72px 18px;
          }

          .ts-card {
            padding: 20px;
          }

          .ts-footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ts-card {
            transform: none !important;
          }
        }
      `}</style>

      <section ref={sectionRef} className="ts-section">
        {/* ambient bg orbs */}
        <div className="ts-orb ts-orb-1" aria-hidden />
        <div className="ts-orb ts-orb-2" aria-hidden />

        <div className="ts-inner">
          <div className="ts-top">
            <div>
              <div className="ts-kicker" aria-hidden="true">
                <span className="ts-kicker-line" />
                <span className="ts-kicker-text">Client Testimonials</span>
              </div>
              <h2 className="ts-title">What our clients say</h2>
            </div>

            <p className="ts-subtitle">
              A few words from the businesses we&apos;ve worked with across retail,
              refrigeration, and food service.
            </p>
          </div>

          <div className="ts-grid">
            {testimonials.map((item) => (
              <article key={item.company} className="ts-card">
                <div className="ts-company">{item.company}</div>
                <span className="ts-quote-mark" aria-hidden="true">&ldquo;</span>
                <p className="ts-quote">{item.quote}</p>

                <div className="ts-footer">
                  <div className="ts-avatar" aria-hidden="true">
                    {item.initials}
                  </div>

                  <div className="ts-author-info">
                    <div className="ts-author">{item.author}</div>
                    <div className="ts-meta">Verified client</div>
                  </div>

                  <div className="ts-stars" aria-label="5 stars">
                    ★★★★★
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}