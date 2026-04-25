"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const NAVY = "#0B2540";
const RED = "#C8102E";
const BORDER = "rgba(11,37,64,0.1)";
const MUTED = "#6B7280";

// ─── EMAILJS CONFIG ────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = "service_typ98iv";
const EMAILJS_TEMPLATE_ID = "template_fa24dhe";
const EMAILJS_NEWSLETTER_TEMPLATE_ID = "template_rvpmczd"; // ← replace when ready
const EMAILJS_PUBLIC_KEY = "YF7C7rYxFblL_ulv4";
// ──────────────────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "447721776002";
const WHATSAPP_DEFAULT_MSG = "Hi, I would like to enquire about ILK Technology services.";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MSG)}`;

const CONTACT_INFO = {
  address: ["Poplar View", "East Lane Business Park", "Wembley", "HA9 7RD", "England, United Kingdom"],
  phone: "0203 051 0367",
  phoneHref: "tel:+442030510367",
  email: "info@ilktechnology.com",
  sales: "sales@ilktechnology.com",
  support: "technical@ilktechnology.com",
  newsletter: "newsletter@ilktechnology.com",
  mapSrc: "https://www.google.com/maps?q=Poplar+View+East+Lane+Business+Park+Wembley+HA9+7RD&output=embed",
};

const HOURS = [
  { day: "Monday – Friday", hours: "8:30am – 5:30pm", closed: false },
  { day: "Saturday", hours: "9:00am – 2:00pm", closed: false },
  { day: "Sunday", hours: "Closed", closed: true },
];

const ENQUIRY_TYPES = [
  "Product / Equipment Enquiry",
  "Request a Quote",
  "Technical Support",
  "Newsletter Signup",
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
    label: "Newsletter",
    email: CONTACT_INFO.newsletter,
    desc: "Sign up to receive product news, offers and company updates.",
    icon: (
      <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke={RED} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v12H4z" />
        <path d="M22 6l-10 7L2 6" />
      </svg>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEWSLETTER MODAL
// ─────────────────────────────────────────────────────────────────────────────
function NewsletterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", company: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setErrorMsg("");

    const templateParams = {
      from_first_name: form.firstName,
      from_last_name: form.lastName,
      from_name: `${form.firstName} ${form.lastName}`,
      from_email: form.email,
      company: form.company || "Not provided",
      reply_to: form.email,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_NEWSLETTER_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS newsletter error:", err);
      setErrorMsg("Something went wrong. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSubmitted(false);
        setErrorMsg("");
        setForm({ firstName: "", lastName: "", email: "", company: "" });
      }, 300);
    }
  }, [open]);

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <style>{`
        /* Prevent mobile browsers from auto-scaling small form text */
        html { -webkit-text-size-adjust: 100%; }

        /* Prevent iOS Safari / mobile zoom by ensuring form controls are 16px on small screens */
        @media (max-width: 640px) {
          .nl-field input,
          .field input,
          .field select,
          .field textarea {
            font-size: 16px !important;
            line-height: 1.3;
          }

          /* Slightly increase button text on small screens to avoid zoom triggers */
          .nl-submit,
          .submit-btn {
            font-size: 13px;
          }
        }

        .nl-overlay {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(11,37,64,0.72); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px; animation: nlFadeIn 0.22s ease;
        }
        @keyframes nlFadeIn { from { opacity: 0; } to { opacity: 1; } }

        .nl-modal {
          background: ${NAVY}; border-radius: 6px; width: 100%; max-width: 480px;
          position: relative; overflow: hidden;
          animation: nlSlideUp 0.28s cubic-bezier(0.22,1,0.36,1);
          box-shadow: 0 32px 80px rgba(0,0,0,0.45);
        }
        @keyframes nlSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

        .nl-modal::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 4px; background: ${RED};
        }
        .nl-modal::after {
          content: ''; position: absolute; width: 320px; height: 320px;
          border-radius: 50%; border: 1px solid rgba(200,16,46,0.1);
          top: -100px; right: -80px; pointer-events: none;
        }

        .nl-inner { padding: 48px 44px 44px; position: relative; z-index: 1; }

        .nl-close {
          position: absolute; top: 16px; right: 16px; z-index: 10;
          background: rgba(255,255,255,0.07); border: none; border-radius: 3px;
          width: 32px; height: 32px; cursor: pointer; display: flex;
          align-items: center; justify-content: center;
          color: rgba(255,255,255,0.5); transition: background 0.15s, color 0.15s;
        }
        .nl-close:hover { background: rgba(255,255,255,0.12); color: #fff; }

        .nl-eyebrow {
          font-size: 10px; font-weight: 600; letter-spacing: 0.28em;
          text-transform: uppercase; color: ${RED};
          display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
        }
        .nl-eyebrow::before {
          content: ''; display: block; width: 20px; height: 1.5px;
          background: ${RED}; flex-shrink: 0;
        }

        .nl-title {
          font-size: 1.45rem; font-weight: 800; letter-spacing: -0.03em;
          color: #fff; margin-bottom: 8px; line-height: 1.15;
        }
        .nl-subtitle {
          font-size: 13px; color: rgba(255,255,255,0.45);
          line-height: 1.7; margin-bottom: 28px;
        }

        .nl-form { display: flex; flex-direction: column; gap: 14px; }
        .nl-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

        .nl-field { display: flex; flex-direction: column; gap: 5px; }
        .nl-field label {
          font-size: 10px; font-weight: 600; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(255,255,255,0.4);
        }
        .nl-field input {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 3px; color: #fff; font-size: 13.5px;
          padding: 10px 14px; font-family: inherit; outline: none; width: 100%;
          transition: border-color 0.18s, background 0.18s;
        }
        .nl-field input::placeholder { color: rgba(255,255,255,0.25); }
        .nl-field input:focus {
          border-color: rgba(200,16,46,0.6); background: rgba(255,255,255,0.09);
        }

        .nl-submit {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: #fff; background: ${RED};
          border: none; padding: 14px 24px; border-radius: 3px;
          cursor: pointer; transition: background 0.18s, transform 0.18s;
          font-family: inherit; align-self: flex-start; margin-top: 4px;
        }
        .nl-submit:hover { background: #a50d24; transform: translateX(3px); }
        .nl-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .nl-arrow { transition: transform 0.18s; display: inline-block; }
        .nl-submit:hover:not(:disabled) .nl-arrow { transform: translateX(4px); }

        .nl-note {
          font-size: 11px; color: rgba(255,255,255,0.28); line-height: 1.6; margin-top: 2px;
        }

        .nl-success {
          display: flex; align-items: flex-start; gap: 12px;
          background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.28);
          border-radius: 3px; padding: 16px 18px; font-size: 13px; color: #6EE7B7;
          line-height: 1.6; margin-top: 4px;
        }

        .nl-error {
          display: flex; align-items: center; gap: 10px;
          background: rgba(200,16,46,0.1); border: 1px solid rgba(200,16,46,0.3);
          border-radius: 3px; padding: 11px 14px; font-size: 13px; color: #fca5a5;
        }

        @media (max-width: 540px) {
          .nl-inner { padding: 40px 24px 36px; }
          .nl-row { grid-template-columns: 1fr; }
          .nl-submit { width: 100%; justify-content: center; }
        }
      `}</style>

      <div
        ref={overlayRef}
        className="nl-overlay"
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-label="Newsletter signup"
      >
        <div className="nl-modal">
          <button className="nl-close" onClick={onClose} aria-label="Close modal">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="nl-inner">
            <p className="nl-eyebrow">Stay Informed</p>
            <h2 className="nl-title">Subscribe to Our<br />Newsletter</h2>
            <p className="nl-subtitle">
              Get the latest product updates, industry news, and exclusive offers from ILK Technology and our brand partners.
            </p>

            {submitted ? (
              <div className="nl-success">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#6EE7B7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>
                  <strong>You&apos;re subscribed!</strong> Thanks for signing up.
                  We&apos;ll be in touch with the latest news and updates.
                </span>
              </div>
            ) : (
              <form className="nl-form" onSubmit={handleSubmit} >
                <div className="nl-row">
                  <div className="nl-field">
                    <label htmlFor="nl-firstName">First Name</label>
                    <input
                      id="nl-firstName" name="firstName" type="text"
                      placeholder="John" required
                      value={form.firstName} onChange={handleChange}
                    />
                  </div>
                  <div className="nl-field">
                    <label htmlFor="nl-lastName">Last Name</label>
                    <input
                      id="nl-lastName" name="lastName" type="text"
                      placeholder="Smith" required
                      value={form.lastName} onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="nl-field">
                  <label htmlFor="nl-email">Email Address</label>
                  <input
                    id="nl-email" name="email" type="email"
                    placeholder="you@company.com" required
                    value={form.email} onChange={handleChange}
                  />
                </div>

                <div className="nl-field">
                  <label htmlFor="nl-company">
                    Company{" "}
                    <span style={{ opacity: 0.5, fontWeight: 400, textTransform: "none", letterSpacing: 0, fontSize: 10 }}>
                      (optional)
                    </span>
                  </label>
                  <input
                    id="nl-company" name="company" type="text"
                    placeholder="Your Company Ltd"
                    value={form.company} onChange={handleChange}
                  />
                </div>

                {errorMsg && (
                  <div className="nl-error">
                    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {errorMsg}
                  </div>
                )}

                <button type="submit" className="nl-submit" disabled={sending}>
                  {sending ? "Subscribing…" : (
                    <><span>Subscribe Now</span> <span className="nl-arrow">→</span></>
                  )}
                </button>

                <p className="nl-note">
                  You can unsubscribe at any time. We respect your privacy and will never share your details.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function ContactPage({ heroHeight = "52vh" }: { heroHeight?: string }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [newsletterOpen, setNewsletterOpen] = useState(false);

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
    setSending(true);
    setErrorMsg("");

    const templateParams = {
      from_first_name: form.firstName,
      from_last_name: form.lastName,
      from_name: `${form.firstName} ${form.lastName}`,
      company: form.company,
      from_email: form.email,
      phone: form.phone,
      enquiry_type: form.enquiryType,
      brand: form.brand || "Not specified",
      message: form.message,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setErrorMsg("Something went wrong. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;
    const animate = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const heroTl = gsap.timeline({ delay: 0.2 });
        heroTl
          .from(".hero-eyebrow", { opacity: 0, x: -24, duration: 0.7, ease: "power3.out" })
          .from(".hero-title", { opacity: 0, y: 36, duration: 0.95, ease: "power3.out" }, "-=0.4")
          .from(".hero-desc", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.55");

        gsap.from(".info-block", {
          opacity: 0, y: 24, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-info", start: "top 82%" },
        });
        gsap.from(".map-wrap", {
          opacity: 0, y: 20, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".map-wrap", start: "top 85%" },
        });
        gsap.from(".contact-form-wrap", {
          opacity: 0, x: 30, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 82%" },
        });
        gsap.from(".callout-item", {
          opacity: 0, y: 28, stagger: 0.1, duration: 0.8, ease: "power3.out",
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
        html, body { overflow-x: hidden; width: 100%; max-width: 100%; }

        .contact-root { background: #fff; color: ${NAVY}; min-height: 100vh; overflow-x: hidden; width: 100%; box-sizing: border-box; }
        *, *::before, *::after { box-sizing: border-box; }

        .hero { position: relative; width: 100%; height: var(--hero-height, 52vh); min-height: 320px; max-height: 600px; background: ${NAVY}; display: flex; align-items: flex-end; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #0B2540 0%, #162d4a 50%, #0d1f34 100%); }
        .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(200,16,46,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,16,46,0.04) 1px, transparent 1px); background-size: 60px 60px; }
        .hero::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: ${RED}; z-index: 3; }
        .hero-content { position: relative; z-index: 2; width: 100%; max-width: 1160px; margin: 0 auto; padding: 0 64px 64px; }
        .hero-eyebrow { display: flex; align-items: center; gap: 12px; font-size: 10px; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase; color: ${RED}; margin-bottom: 20px; }
        .hero-eyebrow::before { content: ''; display: block; width: 28px; height: 1.5px; background: ${RED}; flex-shrink: 0; }
        .hero-title { font-size: clamp(2rem, 4.5vw, 4.5rem); font-weight: 800; line-height: 1.05; letter-spacing: -0.04em; color: #fff; max-width: 600px; }
        .hero-desc { font-size: 15px; color: rgba(255,255,255,0.55); line-height: 1.75; max-width: 460px; margin-top: 18px; }

        @media (max-width: 820px) { .hero-content { padding: 0 28px 48px; } }
        @media (max-width: 600px) { .hero { height: 48vh; min-height: 260px; } .hero-content { padding: 0 20px 36px; } .hero-desc { font-size: 14px; margin-top: 12px; } }

        .body-inner { max-width: 1160px; margin: 0 auto; padding: 0 64px 100px; width: 100%; overflow-x: hidden; }
        .section-header { display: flex; align-items: center; justify-content: space-between; padding: 52px 0 0; border-bottom: 1px solid ${BORDER}; }
        .section-header-label { font-size: 10px; font-weight: 600; letter-spacing: 0.26em; text-transform: uppercase; color: ${MUTED}; }

        .contact-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 64px; margin-top: 56px; align-items: start; }
        .contact-info { display: flex; flex-direction: column; }
        .info-rule { width: 28px; height: 1.5px; background: ${RED}; margin-bottom: 20px; }
        .info-title { font-size: 1.65rem; font-weight: 800; letter-spacing: -0.035em; line-height: 1.1; color: ${NAVY}; margin-bottom: 16px; }
        .info-sub { font-size: 14px; line-height: 1.8; color: ${MUTED}; margin-bottom: 40px; }
        .info-blocks { display: flex; flex-direction: column; }
        .info-block { padding: 24px 0; border-bottom: 1px solid ${BORDER}; display: flex; gap: 20px; align-items: flex-start; }
        .info-block:first-of-type { border-top: 1px solid ${BORDER}; }
        .info-icon { width: 36px; height: 36px; border-radius: 3px; background: rgba(200,16,46,0.07); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .info-label { font-size: 9px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: ${MUTED}; margin-bottom: 6px; }
        .info-value { font-size: 14px; font-weight: 600; color: ${NAVY}; line-height: 1.6; }
        .info-value a { color: ${NAVY}; text-decoration: none; transition: color 0.18s; }
        .info-value a:hover { color: ${RED}; }
        .hours-row { display: flex; justify-content: space-between; font-size: 13px; padding: 3px 0; color: ${NAVY}; font-weight: 500; }
        .hours-row .hours-time { color: ${MUTED}; font-weight: 400; }
        .hours-row.closed .hours-time { color: #9CA3AF; }

        .map-wrap { border-radius: 6px; overflow: hidden; border: 1px solid ${BORDER}; height: 260px; margin-top: 32px; background: #e9edf1; position: relative; }
        .map-wrap iframe { width: 100%; height: 100%; border: 0; display: block; }
        .map-placeholder { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; color: ${MUTED}; font-size: 13px; text-align: center; padding: 20px; font-weight: 500; }

        .contact-form-wrap { background: ${NAVY}; border-radius: 6px; padding: 52px 48px; position: relative; overflow: hidden; }
        .contact-form-wrap::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: ${RED}; }
        .contact-form-wrap::after { content: ''; position: absolute; width: 380px; height: 380px; border-radius: 50%; border: 1px solid rgba(200,16,46,0.12); top: -100px; right: -80px; pointer-events: none; }
        .form-eyebrow { font-size: 10px; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase; color: ${RED}; display: flex; align-items: center; gap: 10px; margin-bottom: 16px; position: relative; z-index: 1; }
        .form-eyebrow::before { content: ''; display: block; width: 20px; height: 1.5px; background: ${RED}; flex-shrink: 0; }
        .form-title { font-size: 1.4rem; font-weight: 800; letter-spacing: -0.03em; color: #fff; margin-bottom: 28px; position: relative; z-index: 1; line-height: 1.15; }

        .form { display: flex; flex-direction: column; gap: 16px; position: relative; z-index: 1; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .field { display: flex; flex-direction: column; gap: 6px; }
        .field label { font-size: 10px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.45); }
        .field input, .field select, .field textarea { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 3px; color: #fff; font-size: 13.5px; padding: 11px 14px; font-family: inherit; transition: border-color 0.18s, background 0.18s; outline: none; width: 100%; }
        .field input::placeholder, .field textarea::placeholder { color: rgba(255,255,255,0.28); }
        .field input:focus, .field select:focus, .field textarea:focus { border-color: rgba(200,16,46,0.6); background: rgba(255,255,255,0.09); }
        .field select { appearance: none; cursor: pointer; }
        .field select option { background: ${NAVY}; color: #fff; }
        .field textarea { resize: vertical; min-height: 100px; }

        .submit-btn { display: inline-flex; align-items: center; gap: 10px; font-size: 10px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: #fff; background: ${RED}; border: none; padding: 15px 28px; border-radius: 3px; cursor: pointer; transition: background 0.18s, transform 0.18s; font-family: inherit; align-self: flex-start; }
        .submit-btn:hover { background: #a50d24; transform: translateX(3px); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .submit-btn .arrow { display: inline-block; transition: transform 0.18s; }
        .submit-btn:hover:not(:disabled) .arrow { transform: translateX(4px); }
        .form-note { font-size: 11px; color: rgba(255,255,255,0.3); line-height: 1.6; }

        .success-msg { display: flex; align-items: center; gap: 12px; background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.3); border-radius: 3px; padding: 14px 18px; font-size: 13px; color: #6EE7B7; }
        .error-msg { display: flex; align-items: center; gap: 12px; background: rgba(200,16,46,0.1); border: 1px solid rgba(200,16,46,0.3); border-radius: 3px; padding: 12px 16px; font-size: 13px; color: #fca5a5; }

        .bottom-callout { margin-top: 72px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: ${BORDER}; border: 1px solid ${BORDER}; border-radius: 6px; overflow: hidden; }
        .callout-item { background: #fff; padding: 36px 32px; display: flex; flex-direction: column; gap: 12px; }
        .callout-icon { width: 40px; height: 40px; border-radius: 3px; background: rgba(200,16,46,0.07); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .callout-label { font-size: 10px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: ${MUTED}; }
        .callout-value { font-size: 14px; font-weight: 700; color: ${NAVY}; line-height: 1.45; word-break: break-all; }
        .callout-desc { font-size: 12.5px; color: ${MUTED}; line-height: 1.6; }

        .whatsapp-inline { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: ${NAVY}; border: 1px solid rgba(11,37,64,0.06); padding: 6px 8px; border-radius: 4px; text-decoration: none; font-weight: 700; margin-left: 10px; }

        .whatsapp-float { position: fixed; bottom: 24px; right: 24px; z-index: 1300; display: inline-flex; align-items: center; gap: 10px; background: #25D366; color: #fff; padding: 12px 20px; border-radius: 999px; box-shadow: 0 8px 20px rgba(37,211,102,0.35); text-decoration: none; font-weight: 700; font-size: 14px; transition: box-shadow 0.2s, transform 0.2s; white-space: nowrap; }
        .whatsapp-float:hover { box-shadow: 0 12px 28px rgba(37,211,102,0.45); transform: translateY(-2px); }
        .whatsapp-float-label { display: inline; }

        @media (max-width: 960px) { .body-inner { padding: 0 32px 80px; } .contact-grid { grid-template-columns: 1fr; gap: 40px; } .bottom-callout { grid-template-columns: 1fr; } }
        @media (max-width: 620px) { .body-inner { padding: 0 20px 60px; } .contact-form-wrap { padding: 36px 24px; } .form-row { grid-template-columns: 1fr; } .bottom-callout { margin-top: 48px; } }
        @media (max-width: 540px) { .whatsapp-float { bottom: 16px; right: 16px; padding: 12px; gap: 0; } .whatsapp-float-label { display: none; } }
        @media (max-width: 460px) { .body-inner { padding: 0 16px 52px; } .submit-btn { width: 100%; justify-content: center; } }
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
              or want to sign up for our newsletter — our team is ready to assist.
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
                    <p className="info-value" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <a href={CONTACT_INFO.phoneHref}>{CONTACT_INFO.phone}</a>
                      <a
                        className="whatsapp-inline"
                        href={WHATSAPP_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Chat with us on WhatsApp"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 .12 5.27.12 11.8a11.6 11.6 0 001.58 5.68L0 24l6.6-1.95A11.93 11.93 0 0012 24c6.63 0 11.88-5.27 11.88-11.8 0-3.16-1.21-6.1-3.36-8.72z" fill="#25D366"/>
                          <path d="M17.1 14.7c-.28-.2-1.62-.9-1.85-1-.28-.12-.47-.18-.68.24-.2.41-.78 1.05-1 1.27-.24.22-.44.24-.73.07-.3-.18-1.15-.42-2.19-1.37-.81-.76-1.34-1.7-1.5-2-.16-.3.02-.46.14-.58.14-.12.3-.3.45-.45.15-.15.2-.25.3-.42.1-.17.05-.31-.02-.43-.07-.12-.68-1.66-.94-2.28-.25-.6-.5-.52-.69-.53-.18-.01-.38-.01-.58-.01s-.43.06-.65.3c-.22.24-.86.83-.86 2.03 0 1.2.88 2.36 1 2.53.12.17 1.86 2.86 4.5 3.9 2.6 1.04 3.9.9 4.26.84.36-.07 1.16-.47 1.33-.92.18-.45.18-.83.12-.92-.06-.1-.26-.15-.54-.27z" fill="#fff"/>
                        </svg>
                        WhatsApp
                      </a>
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

              {/* Map */}
              <div className="map-wrap">
                {CONTACT_INFO.mapSrc ? (
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
                    <span style={{ color: NAVY, fontWeight: 600, display: "block", marginBottom: 4 }}>Map placeholder</span>
                    <span>Paste your Google Maps embed URL into <code>CONTACT_INFO.mapSrc</code></span>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Contact Form */}
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
                <form className="form" onSubmit={handleSubmit} id="contact">
                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        id="firstName" name="firstName" type="text"
                        placeholder="John" required
                        value={form.firstName} onChange={handleChange}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        id="lastName" name="lastName" type="text"
                        placeholder="Smith" required
                        value={form.lastName} onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="company">Company Name</label>
                    <input
                      id="company" name="company" type="text"
                      placeholder="Your Company Ltd"
                      value={form.company} onChange={handleChange}
                    />
                  </div>

                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="email">Email Address</label>
                      <input
                        id="email" name="email" type="email"
                        placeholder="you@company.com" required
                        value={form.email} onChange={handleChange}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        id="phone" name="phone" type="tel"
                        placeholder="+44 000 000 0000"
                        value={form.phone} onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="enquiryType">Enquiry Type</label>
                    <select
                      id="enquiryType" name="enquiryType" required
                      value={form.enquiryType} onChange={handleChange}
                    >
                      <option value="" disabled>Select a category…</option>
                      {ENQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="brand">Brand Interest</label>
                    <select
                      id="brand" name="brand"
                      value={form.brand} onChange={handleChange}
                    >
                      <option value="" disabled>Select a brand (optional)…</option>
                      {BRANDS.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message" name="message"
                      placeholder="Tell us about your requirements, project scope, or any questions you have…"
                      required
                      value={form.message} onChange={handleChange}
                    />
                  </div>

                  {errorMsg && (
                    <div className="error-msg">
                      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      {errorMsg}
                    </div>
                  )}

                  <button type="submit" className="submit-btn" disabled={sending}>
                    {sending ? "Sending…" : <><span>Send Enquiry</span> <span className="arrow">→</span></>}
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
            {BOTTOM_CARDS.map(({ label, email, desc, icon }) => {
              if (label === "Newsletter") {
                return (
                  <div className="callout-item" key={label}>
                    <div className="callout-icon">{icon}</div>
                    <p className="callout-label">{label}</p>
                    <p className="callout-desc">{desc}</p>
                    <div style={{ marginTop: 8 }}>
                      <button
                        onClick={() => setNewsletterOpen(true)}
                        style={{
                          background: RED, color: "#fff", border: "none",
                          padding: "10px 14px", borderRadius: 3,
                          cursor: "pointer", fontWeight: 700,
                        }}
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                );
              }
              return (
                <div className="callout-item" key={label}>
                  <div className="callout-icon">{icon}</div>
                  <p className="callout-label">{label}</p>
                  <p className="callout-value">
                    <Link href={`mailto:${email}`} style={{ color: NAVY, textDecoration: "none" }}>{email}</Link>
                  </p>
                  <p className="callout-desc">{desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* ── NEWSLETTER MODAL ── */}
      <NewsletterModal open={newsletterOpen} onClose={() => setNewsletterOpen(false)} />

      {/* ── WHATSAPP FLOAT ── */}
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat with ILK Technology on WhatsApp"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 .12 5.27.12 11.8a11.6 11.6 0 001.58 5.68L0 24l6.6-1.95A11.93 11.93 0 0012 24c6.63 0 11.88-5.27 11.88-11.8 0-3.16-1.21-6.1-3.36-8.72z" fill="#fff"/>
          <path d="M17.1 14.7c-.28-.2-1.62-.9-1.85-1-.28-.12-.47-.18-.68.24-.2.41-.78 1.05-1 1.27-.24.22-.44.24-.73.07-.3-.18-1.15-.42-2.19-1.37-.81-.76-1.34-1.7-1.5-2-.16-.3.02-.46.14-.58.14-.12.3-.3.45-.45.15-.15.2-.25.3-.42.1-.17.05-.31-.02-.43-.07-.12-.68-1.66-.94-2.28-.25-.6-.5-.52-.69-.53-.18-.01-.38-.01-.58-.01s-.43.06-.65.3c-.22.24-.86.83-.86 2.03 0 1.2.88 2.36 1 2.53.12.17 1.86 2.86 4.5 3.9 2.6 1.04 3.9.9 4.26.84.36-.07 1.16-.47 1.33-.92.18-.45.18-.83.12-.92-.06-.1-.26-.15-.54-.27z" fill="#fff"/>
        </svg>
        <span className="whatsapp-float-label">Chat on WhatsApp</span>
      </a>
    </>
  );
}