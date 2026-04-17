"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAVY = "#0B2540";
const RED = "#C8102E";
const BORDER = "rgba(11,37,64,0.1)";
const MUTED = "#6B7280";

// TODO: Replace these with your real details
const CONTACT_INFO = {
  address: ["[Unit / Building Name]", "[Street], [Town]", "[County], [Postcode]", "England, United Kingdom"],
  phone: "+44 (0) 000 000 0000",
  phoneHref: "tel:+44000000000",
  email: "info@ilktechnology.co.uk",
  sales: "sales@ilktechnology.co.uk",
  support: "support@ilktechnology.co.uk",
  partnerships: "partnerships@ilktechnology.co.uk",
  // TODO: Paste your Google Maps embed src URL here
  mapSrc: "",
};

const HOURS = [
  { day: "Monday – Friday", hours: "8:30am – 5:30pm", closed: false },
  { day: "Saturday", hours: "Closed", closed: true },
  { day: "Sunday", hours: "Closed", closed: true },
];

const ENQUIRY_TYPES = [
  "Product / Equipment Enquiry",
  "Request a Quote",
  "Technical Support",
  "Distribution & Partnership",
  "General Enquiry",
];

const BRANDS = ["Arneg", "Oscartielle", "Intrac", "Incold", "All / Multiple Brands"];

const BOTTOM_CARDS = [
  {
    label: "Sales Enquiries",
    email: CONTACT_INFO.sales,
    desc: "For product quotes, orders, and commercial partnerships with our brand portfolio.",
    icon: (
      <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke={RED} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    label: "Technical Support",
    email: CONTACT_INFO.support,
    desc: "Installation, parts, and after-sales technical assistance for all our distributed brands.",
    icon: (
      <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke={RED} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    label: "Partnerships",
    email: CONTACT_INFO.partnerships,
    desc: "Interested in becoming a reseller or regional partner? Let's talk about what's possible.",
    icon: (
      <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke={RED} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

export default function ContactPage({ heroHeight = "52vh" }: { heroHeight?: string }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    enquiryType: "",
    brand: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with your real form submission logic
    // e.g. await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) })
    // or integrate Formspree: action="https://formspree.io/f/YOUR_ID"
    setSubmitted(true);
  };

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;
    const animate = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Hero entrance
        const heroTl = gsap.timeline({ delay: 0.2 });
        heroTl
          .from(".hero-eyebrow", { opacity: 0, x: -24, duration: 0.7, ease: "power3.out" })
          .from(".hero-title", { opacity: 0, y: 36, duration: 0.95, ease: "power3.out" }, "-=0.4")
          .from(".hero-desc", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.55");

        // Info blocks stagger
        gsap.from(".info-block", {
          opacity: 0,
          y: 24,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-info", start: "top 82%" },
        });

        // Map
        gsap.from(".map-wrap", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".map-wrap", start: "top 85%" },
        });

        // Form
        gsap.from(".contact-form-wrap", {
          opacity: 0,
          x: 30,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 82%" },
        });

        // Bottom cards
        gsap.from(".callout-item", {
          opacity: 0,
          y: 28,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".bottom-callout", start: "top 82%" },
        });
      });
    };
    animate();
    return () => ctx?.revert();
  }, []);

  return (
    <>
      <style>{`
        html, body {
          overflow-x: hidden;
          width: 100%;
          max-width: 100%;
        }

        .contact-root {
          background: #fff;
          color: ${NAVY};
          min-height: 100vh;
          overflow-x: hidden;
          width: 100%;
          box-sizing: border-box;
        }

        *, *::before, *::after { box-sizing: border-box; }

        /* ─── HERO ─── */
        .hero {
          position: relative;
          width: 100%;
          height: var(--hero-height, 52vh);
          min-height: 320px;
          max-height: 600px;
          background: ${NAVY};
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #0B2540 0%, #162d4a 50%, #0d1f34 100%);
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(200,16,46,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,16,46,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .hero::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: ${RED};
          z-index: 3;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 64px 64px;
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

        .hero-title {
          font-size: clamp(2rem, 4.5vw, 4.5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: #fff;
          max-width: 600px;
        }

        .hero-desc {
          font-size: 15px;
          color: rgba(255,255,255,0.55);
          line-height: 1.75;
          max-width: 460px;
          margin-top: 18px;
        }

        @media (max-width: 820px) {
          .hero-content { padding: 0 28px 48px; }
        }
        @media (max-width: 600px) {
          .hero { height: 48vh; min-height: 260px; }
          .hero-content { padding: 0 20px 36px; }
          .hero-desc { font-size: 14px; margin-top: 12px; }
        }

        /* ─── BODY ─── */
        .body-inner {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 64px 100px;
          width: 100%;
          overflow-x: hidden;
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

        /* ─── TWO-COL GRID ─── */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 64px;
          margin-top: 56px;
          align-items: start;
        }

        /* ─── LEFT: INFO ─── */
        .contact-info { display: flex; flex-direction: column; }

        .info-rule {
          width: 28px; height: 1.5px;
          background: ${RED};
          margin-bottom: 20px;
        }
        .info-title {
          font-size: 1.65rem;
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.1;
          color: ${NAVY};
          margin-bottom: 16px;
        }
        .info-sub {
          font-size: 14px;
          line-height: 1.8;
          color: ${MUTED};
          margin-bottom: 40px;
        }

        .info-blocks { display: flex; flex-direction: column; }

        .info-block {
          padding: 24px 0;
          border-bottom: 1px solid ${BORDER};
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }
        .info-block:first-of-type { border-top: 1px solid ${BORDER}; }

        .info-icon {
          width: 36px; height: 36px;
          border-radius: 3px;
          background: rgba(200,16,46,0.07);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .info-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: ${MUTED};
          margin-bottom: 6px;
        }
        .info-value {
          font-size: 14px;
          font-weight: 600;
          color: ${NAVY};
          line-height: 1.6;
        }
        .info-value a {
          color: ${NAVY};
          text-decoration: none;
          transition: color 0.18s;
        }
        .info-value a:hover { color: ${RED}; }

        .hours-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          padding: 3px 0;
          color: ${NAVY};
          font-weight: 500;
        }
        .hours-row .hours-time { color: ${MUTED}; font-weight: 400; }
        .hours-row.closed .hours-time { color: #9CA3AF; }

        /* ─── MAP ─── */
        .map-wrap {
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid ${BORDER};
          height: 260px;
          margin-top: 32px;
          background: #e9edf1;
          position: relative;
        }
        .map-wrap iframe {
          width: 100%; height: 100%;
          border: 0; display: block;
        }
        .map-placeholder {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 10px;
          color: ${MUTED};
          font-size: 13px;
          text-align: center;
          padding: 20px;
          font-weight: 500;
        }

        /* ─── RIGHT: FORM ─── */
        .contact-form-wrap {
          background: ${NAVY};
          border-radius: 6px;
          padding: 52px 48px;
          position: relative;
          overflow: hidden;
        }
        .contact-form-wrap::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: ${RED};
        }
        .contact-form-wrap::after {
          content: '';
          position: absolute;
          width: 380px; height: 380px;
          border-radius: 50%;
          border: 1px solid rgba(200,16,46,0.12);
          top: -100px; right: -80px;
          pointer-events: none;
        }

        .form-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: ${RED};
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 16px;
          position: relative; z-index: 1;
        }
        .form-eyebrow::before {
          content: '';
          display: block;
          width: 20px; height: 1.5px;
          background: ${RED};
          flex-shrink: 0;
        }
        .form-title {
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #fff;
          margin-bottom: 28px;
          position: relative; z-index: 1;
          line-height: 1.15;
        }

        .form { display: flex; flex-direction: column; gap: 16px; position: relative; z-index: 1; }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        .field { display: flex; flex-direction: column; gap: 6px; }

        .field label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }

        .field input,
        .field select,
        .field textarea {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 3px;
          color: #fff;
          font-size: 13.5px;
          padding: 11px 14px;
          font-family: inherit;
          transition: border-color 0.18s, background 0.18s;
          outline: none;
          width: 100%;
        }
        .field input::placeholder,
        .field textarea::placeholder { color: rgba(255,255,255,0.28); }
        .field input:focus,
        .field select:focus,
        .field textarea:focus {
          border-color: rgba(200,16,46,0.6);
          background: rgba(255,255,255,0.09);
        }
        .field select { appearance: none; cursor: pointer; }
        .field select option { background: ${NAVY}; color: #fff; }
        .field textarea { resize: vertical; min-height: 100px; }

        .submit-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #fff;
          background: ${RED};
          border: none;
          padding: 15px 28px;
          border-radius: 3px;
          cursor: pointer;
          transition: background 0.18s, transform 0.18s;
          font-family: inherit;
          align-self: flex-start;
        }
        .submit-btn:hover { background: #a50d24; transform: translateX(3px); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .submit-btn .arrow { display: inline-block; transition: transform 0.18s; }
        .submit-btn:hover:not(:disabled) .arrow { transform: translateX(4px); }

        .form-note {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          line-height: 1.6;
        }

        .success-msg {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(16,185,129,0.12);
          border: 1px solid rgba(16,185,129,0.3);
          border-radius: 3px;
          padding: 14px 18px;
          font-size: 13px;
          color: #6EE7B7;
        }

        /* ─── BOTTOM 3-COL ─── */
        .bottom-callout {
          margin-top: 72px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: ${BORDER};
          border: 1px solid ${BORDER};
          border-radius: 6px;
          overflow: hidden;
        }

        .callout-item {
          background: #fff;
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .callout-icon {
          width: 40px; height: 40px;
          border-radius: 3px;
          background: rgba(200,16,46,0.07);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .callout-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${MUTED};
        }
        .callout-value {
          font-size: 14px;
          font-weight: 700;
          color: ${NAVY};
          line-height: 1.45;
          word-break: break-all;
        }
        .callout-desc { font-size: 12.5px; color: ${MUTED}; line-height: 1.6; }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 960px) {
          .body-inner { padding: 0 32px 80px; }
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
          .bottom-callout { grid-template-columns: 1fr; }
        }
        @media (max-width: 620px) {
          .body-inner { padding: 0 20px 60px; }
          .contact-form-wrap { padding: 36px 24px; }
          .form-row { grid-template-columns: 1fr; }
          .bottom-callout { margin-top: 48px; }
        }
        @media (max-width: 460px) {
          .body-inner { padding: 0 16px 52px; }
          .submit-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="contact-root">

        {/* ── HERO ── */}
        <section ref={heroRef} className="hero" style={{ height: heroHeight }}>
          <div className="hero-bg" />
          <div className="hero-grid" />
          <div className="hero-content">
            <p className="hero-eyebrow">Get In Touch</p>
            <h1 className="hero-title">Contact<br />ILK Technology</h1>
            <p className="hero-desc">
              We&apos;re here to help. Whether you have a product enquiry, need a quote,
              or want to explore a partnership — our team is ready to assist.
            </p>
          </div>
        </section>

        {/* ── BODY ── */}
        <div className="body-inner">

          <div className="section-header">
            <span className="section-header-label">Contact &amp; Location</span>
          </div>

          <div className="contact-grid">

            {/* LEFT: Contact Info */}
            <div className="contact-info">
              <div className="info-rule" />
              <h2 className="info-title">Speak to Our Team</h2>
              <p className="info-sub">
                ILK Technology is the trusted UK distribution partner for Arneg, Oscartielle,
                Intrac, and Incold. Reach out to discuss your project requirements or place an order.
              </p>

              <div className="info-blocks">

                {/* Address */}
                <div className="info-block">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke={RED} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="info-label">Address</p>
                    {/* TODO: Replace with real address */}
                    <p className="info-value">
                      {CONTACT_INFO.address.map((line, i) => (
                        <span key={i}>{line}{i < CONTACT_INFO.address.length - 1 && <br />}</span>
                      ))}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="info-block">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke={RED} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.03 1.17 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="info-label">Phone</p>
                    {/* TODO: Replace with real phone */}
                    <p className="info-value">
                      <a href={CONTACT_INFO.phoneHref}>{CONTACT_INFO.phone}</a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="info-block">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke={RED} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p className="info-label">Email</p>
                    {/* TODO: Replace with real email */}
                    <p className="info-value">
                      <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="info-block">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke={RED} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12,6 12,12 16,14" />
                    </svg>
                  </div>
                  <div style={{ width: "100%" }}>
                    <p className="info-label">Office Hours</p>
                    {HOURS.map(({ day, hours, closed }) => (
                      <div key={day} className={`hours-row${closed ? " closed" : ""}`}>
                        <span>{day}</span>
                        <span className="hours-time">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* MAP */}
              <div className="map-wrap">
                {CONTACT_INFO.mapSrc ? (
                  // TODO: Paste your Google Maps embed iframe src into CONTACT_INFO.mapSrc above
                  <iframe
                    src={CONTACT_INFO.mapSrc}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ILK Technology location"
                  />
                ) : (
                  <div className="map-placeholder">
                    <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke={RED} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span style={{ color: NAVY, fontWeight: 600, display: "block", marginBottom: 4 }}>
                      Map placeholder
                    </span>
                    <span>Paste your Google Maps embed URL into <code>CONTACT_INFO.mapSrc</code></span>
                  </div>
                )}
              </div>

            </div>

            {/* RIGHT: Form */}
            <div ref={formRef} className="contact-form-wrap">
              <p className="form-eyebrow">Make an Enquiry</p>
              <h2 className="form-title">Tell Us About<br />Your Project</h2>

              {submitted ? (
                <div className="success-msg">
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#6EE7B7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Thank you — your enquiry has been sent. We&apos;ll be in touch shortly.
                </div>
              ) : (
                <form className="form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="firstName">First Name</label>
                      <input id="firstName" name="firstName" type="text" placeholder="John" required value={form.firstName} onChange={handleChange} />
                    </div>
                    <div className="field">
                      <label htmlFor="lastName">Last Name</label>
                      <input id="lastName" name="lastName" type="text" placeholder="Smith" required value={form.lastName} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="company">Company Name</label>
                    <input id="company" name="company" type="text" placeholder="Your Company Ltd" value={form.company} onChange={handleChange} />
                  </div>

                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="email">Email Address</label>
                      <input id="email" name="email" type="email" placeholder="you@company.com" required value={form.email} onChange={handleChange} />
                    </div>
                    <div className="field">
                      <label htmlFor="phone">Phone Number</label>
                      <input id="phone" name="phone" type="tel" placeholder="+44 000 000 0000" value={form.phone} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="enquiryType">Enquiry Type</label>
                    <select id="enquiryType" name="enquiryType" required value={form.enquiryType} onChange={handleChange}>
                      <option value="" disabled>Select a category…</option>
                      {ENQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="brand">Brand Interest</label>
                    <select id="brand" name="brand" value={form.brand} onChange={handleChange}>
                      <option value="" disabled>Select a brand (optional)…</option>
                      {BRANDS.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your requirements, project scope, or any questions you have…"
                      required
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="submit-btn">
                    Send Enquiry <span className="arrow">→</span>
                  </button>

                  <p className="form-note">
                    We aim to respond within 1 business day. Your information is handled in accordance with our privacy policy.
                  </p>
                </form>
              )}
            </div>

          </div>

          {/* ── BOTTOM 3-COL ── */}
          <div className="bottom-callout">
            {BOTTOM_CARDS.map(({ label, email, desc, icon }) => (
              <div className="callout-item" key={label}>
                <div className="callout-icon">{icon}</div>
                <p className="callout-label">{label}</p>
                <p className="callout-value">
                  <Link href={`mailto:${email}`} style={{ color: NAVY, textDecoration: "none" }}>
                    {email}
                  </Link>
                </p>
                <p className="callout-desc">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}