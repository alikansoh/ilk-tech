"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";

/* ─────────────────────────────────────────────
   EMAILJS CONFIG  (same as contact page)
───────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = "service_typ98iv";
const EMAILJS_TEMPLATE_ID = "template_fa24dhe";
const EMAILJS_PUBLIC_KEY  = "YF7C7rYxFblL_ulv4";

const LONDON_PRICE  = 150;
const OUTSIDE_PRICE = 350;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const steps = [
  {
    index: "01",
    label: "Consult",
    headline: "Tell Us Your Vision",
    desc: "We begin with a focused consultation to understand your store layout, footfall patterns, product range, and energy requirements. No generic advice — just precise guidance.",
  },
  {
    index: "02",
    label: "Specify",
    headline: "Engineer the Right Fit",
    desc: "Our technical team draws up a precise equipment specification — cabinet models, refrigeration type, capacity, and energy class — tailored to your environment and budget.",
  },
  {
    index: "03",
    label: "Supply",
    headline: "Delivered to Your Door",
    desc: "As an authorised Arneg distribution partner, we source and deliver your units directly from our warehouse on schedule, fully tracked, with zero compromise on quality.",
  },
  {
    index: "04",
    label: "Install",
    headline: "Ready to Run",
    desc: "Prepared for installation for your engineer or through our installation services. Designed to look professional, with accessories included, and built to last.",
  },
];

const stats = [
  { value: "48hrs",   label: "Quotation turnaround" },
  { value: "100%",    label: "Authorised Arneg range" },
  { value: "UK-wide", label: "Supply coverage" },
];

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
type Step = 1 | 2 | 3;

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: "london" | "outside" | "";
  siteType: string;
  message: string;
}

const EMPTY_FORM: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  location: "",
  siteType: "",
  message: "",
};

/* ─────────────────────────────────────────────
   ENQUIRY MODAL
───────────────────────────────────────────── */
function EnquiryModal({ onClose }: { onClose: () => void }) {
  const [step, setStep]           = useState<Step>(1);
  const [form, setForm]           = useState<FormData>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const [errorMsg, setErrorMsg]   = useState("");
  const [closing, setClosing]     = useState(false);
  const overlayRef                = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 340);
  }, [onClose]);

  /* close on overlay click */
  const handleOverlay = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) close();
  };

  /* close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const set = (field: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const price =
    form.location === "london"  ? LONDON_PRICE  :
    form.location === "outside" ? OUTSIDE_PRICE :
    null;

  const canStep1 = form.name.trim() !== "" && form.email.includes("@") && form.phone.trim() !== "";
  const canStep2 = form.location !== "" && form.siteType.trim() !== "";

  /* ── split name into first / last for the shared EmailJS template ── */
  const splitName = (full: string) => {
    const parts = full.trim().split(/\s+/);
    const first = parts[0] ?? "";
    const last  = parts.slice(1).join(" ") || "-";
    return { first, last };
  };

  const handleSubmit = async () => {
    setSending(true);
    setErrorMsg("");

    const { first, last } = splitName(form.name);

    const templateParams = {
      /* shared fields that match the contact-page template */
      from_first_name : first,
      from_last_name  : last,
      from_name       : form.name,
      from_email      : form.email,
      reply_to        : form.email,
      phone           : form.phone,
      company         : form.company || "Not provided",
      enquiry_type    : "Site Survey Enquiry",
      brand           : "Arneg",
      message         : form.message || "No additional notes provided.",
      /* survey-specific extras */
      location        : form.location === "london" ? "London" : "Outside London",
      siteType        : form.siteType,
      survey_fee      : price ?? 0,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setErrorMsg("Something went wrong. Please try again or call us on 0203 051 0367.");
    } finally {
      setSending(false);
    }
  };

  const STEPS = ["Contact", "Site Details", "Confirm"];

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlay}
      className={`fixed inset-0 z-[9999] flex items-end sm:items-center justify-center
        bg-[#001845]/70 backdrop-blur-sm px-0 sm:px-6
        transition-opacity duration-300 ${closing ? "opacity-0" : "opacity-100"}`}
    >
      <div
        className={`relative w-full max-w-[620px] bg-white flex flex-col
          max-h-[96dvh] sm:max-h-[90vh] overflow-hidden
          transform transition-all duration-300
          ${closing ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"}
          rounded-t-2xl sm:rounded-none`}
      >
        {/* red top stripe */}
        <div className="h-[3px] w-full bg-red-600 flex-shrink-0" />

        {/* header */}
        <div className="flex items-start justify-between px-8 pt-8 pb-6 flex-shrink-0">
          <div>
            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-red-600 mb-2">
              Site Survey
            </p>
            <h2 className="text-[clamp(22px,4vw,30px)] font-black tracking-[-0.03em]
              text-[#001845] uppercase leading-tight">
              Book Your Survey
            </h2>
          </div>
          <button
            onClick={close}
            aria-label="Close modal"
            className="w-9 h-9 flex items-center justify-center rounded-full
              hover:bg-[#001845]/[0.06] transition-colors text-[#001845]/40
              hover:text-[#001845] mt-1 flex-shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2 2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* step tracker */}
        {!submitted && (
          <div className="flex items-center px-8 mb-6 flex-shrink-0 gap-0">
            {STEPS.map((label, i) => {
              const idx   = (i + 1) as Step;
              const done   = step > idx;
              const active = step === idx;
              return (
                <div key={label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center
                      text-[11px] font-black transition-all duration-300
                      ${done    ? "bg-red-600 text-white"
                      : active  ? "bg-[#001845] text-white"
                                : "bg-[#001845]/[0.08] text-[#001845]/40"}`}>
                      {done
                        ? <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                            <path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="2"
                              strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        : idx}
                    </div>
                    <span className={`text-[9px] font-bold tracking-[0.15em] uppercase mt-1.5
                      ${active ? "text-[#001845]" : "text-[#001845]/30"}`}>
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`h-[1.5px] flex-1 mx-2 mb-4 transition-all duration-500
                      ${done ? "bg-red-600" : "bg-[#001845]/[0.1]"}`} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* scrollable body */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">

          {submitted ? (
            /* SUCCESS */
            <div className="flex flex-col items-center justify-center py-12 text-center gap-6">
              <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M4 14L11 21L24 7" stroke="#dc2626" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="text-[22px] font-black tracking-[-0.03em] text-[#001845] uppercase mb-2">
                  Enquiry Received
                </h3>
                <p className="text-[14px] leading-[1.75] text-[#001845]/55 font-medium max-w-[340px]">
                  Thanks,{" "}
                  <strong className="text-[#001845]/80">{form.name.split(" ")[0]}</strong>.
                  We&apos;ll review your details and come back to you within{" "}
                  <strong className="text-[#001845]/80">48 hours</strong> with a full quotation.
                </p>
              </div>
              {price && (
                <div className="bg-[#001845]/[0.04] border border-[#001845]/[0.08] px-6 py-4 w-full">
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#001845]/40 mb-1">
                    Survey fee confirmed
                  </p>
                  <p className="text-[26px] font-black text-[#001845]">
                    £{price}
                    <span className="text-[13px] font-medium text-[#001845]/40 ml-2">
                      {form.location === "london" ? "London" : "Outside London"}
                    </span>
                  </p>
                </div>
              )}
              <button
                onClick={close}
                className="mt-2 bg-[#001845] hover:bg-[#001845]/80 text-white
                  font-black text-[12px] tracking-[0.15em] uppercase
                  px-8 py-3 transition-colors"
              >
                Close
              </button>
            </div>

          ) : step === 1 ? (
            /* STEP 1 — Contact */
            <div className="flex flex-col gap-5">
              <Row>
                <Field label="Full Name *" id="name">
                  <Input
                    id="name"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={(v) => set("name", v)}
                  />
                </Field>
                <Field label="Company" id="company">
                  <Input
                    id="company"
                    placeholder="ILK Retail Ltd"
                    value={form.company}
                    onChange={(v) => set("company", v)}
                  />
                </Field>
              </Row>
              <Field label="Email Address *" id="email">
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@company.com"
                  value={form.email}
                  onChange={(v) => set("email", v)}
                />
              </Field>
              <Field label="Phone Number *" id="phone">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+44 7700 900000"
                  value={form.phone}
                  onChange={(v) => set("phone", v)}
                />
              </Field>
              <NavRow>
                <span />
                <NextBtn disabled={!canStep1} onClick={() => setStep(2)}>
                  Site Details →
                </NextBtn>
              </NavRow>
            </div>

          ) : step === 2 ? (
            /* STEP 2 — Site Details */
            <div className="flex flex-col gap-5">
              <Field label="Site Location *" id="location">
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { val: "london",  label: "London",         price: LONDON_PRICE  },
                    { val: "outside", label: "Outside London",  price: OUTSIDE_PRICE },
                  ] as const).map(opt => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => set("location", opt.val)}
                      className={`flex flex-col items-start px-5 py-4 border-2 transition-all duration-200 text-left
                        ${form.location === opt.val
                          ? "border-red-600 bg-red-600/[0.04]"
                          : "border-[#001845]/[0.12] hover:border-[#001845]/30"}`}
                    >
                      <span className={`text-[11px] font-black tracking-[0.18em] uppercase mb-1
                        ${form.location === opt.val ? "text-red-600" : "text-[#001845]/50"}`}>
                        {opt.label}
                      </span>
                      <span className={`text-[22px] font-black tracking-[-0.03em] leading-none
                        ${form.location === opt.val ? "text-[#001845]" : "text-[#001845]/30"}`}>
                        £{opt.price}
                      </span>
                      <span className={`text-[10px] font-semibold tracking-[0.1em] uppercase mt-1
                        ${form.location === opt.val ? "text-[#001845]/50" : "text-[#001845]/25"}`}>
                        survey fee
                      </span>
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Type of Site *" id="siteType">
                <ModalSelect
                  id="siteType"
                  value={form.siteType}
                  onChange={(v) => set("siteType", v)}
                >
                  <option value="" disabled>Select site type…</option>
                  {["Convenience Store","Supermarket","Petrol Forecourt",
                    "Food Service / Café","Wholesale","Other"].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </ModalSelect>
              </Field>

              <Field label="Additional Notes" id="message">
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Describe your current setup, number of cabinets needed, refrigeration type…"
                  value={form.message}
                  onChange={e => set("message", e.target.value)}
                  className="w-full px-4 py-3 border border-[#001845]/[0.14] bg-[#001845]/[0.02]
                    text-[14px] text-[#001845] placeholder:text-[#001845]/25
                    focus:outline-none focus:border-red-600/50 focus:bg-red-600/[0.015]
                    transition-colors resize-none font-medium"
                />
              </Field>

              <NavRow>
                <BackBtn onClick={() => setStep(1)}>← Contact</BackBtn>
                <NextBtn disabled={!canStep2} onClick={() => setStep(3)}>
                  Review →
                </NextBtn>
              </NavRow>
            </div>

          ) : (
            /* STEP 3 — Confirm */
            <div className="flex flex-col gap-6">
              <div className="border border-[#001845]/[0.08] divide-y divide-[#001845]/[0.06]">
                <SummarySection label="Contact">
                  <SummaryRow k="Name"    v={form.name} />
                  {form.company && <SummaryRow k="Company" v={form.company} />}
                  <SummaryRow k="Email"   v={form.email} />
                  <SummaryRow k="Phone"   v={form.phone} />
                </SummarySection>
                <SummarySection label="Site">
                  <SummaryRow k="Location" v={form.location === "london" ? "London" : "Outside London"} />
                  <SummaryRow k="Site type" v={form.siteType} />
                  {form.message && <SummaryRow k="Notes" v={form.message} />}
                </SummarySection>
              </div>

              {/* price box */}
              <div className="bg-[#001845] px-6 py-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black tracking-[0.28em] uppercase text-white/30 mb-1">
                    Survey Fee
                  </p>
                  <p className="text-[32px] font-black text-white leading-none">
                    £{price}
                  </p>
                </div>
                <div className="h-[3px] w-12 bg-red-600" />
              </div>

              {errorMsg && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200
                  px-4 py-3 text-[13px] text-red-700 font-medium">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="flex-shrink-0">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {errorMsg}
                </div>
              )}

              <p className="text-[12px] leading-[1.7] text-[#001845]/45 font-medium">
                By submitting you agree to our terms of service. Payment is collected on-site
                following the survey. We&apos;ll confirm your booking within 48 hours.
              </p>

              <NavRow>
                <BackBtn onClick={() => setStep(2)}>← Edit</BackBtn>
                <button
                  type="button"
                  disabled={sending}
                  onClick={handleSubmit}
                  className={`text-white font-black text-[12px] tracking-[0.15em] uppercase
                    px-8 py-3.5 transition-colors flex items-center gap-3
                    ${sending
                      ? "bg-[#001845]/50 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"}`}
                >
                  {sending ? "Sending…" : (
                    <>
                      Submit Enquiry
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.75"
                          strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </NavRow>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SMALL UI HELPERS
───────────────────────────────────────────── */
function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id}
        className="text-[10px] font-black tracking-[0.22em] uppercase text-[#001845]/60">
        {label}
      </label>
      {children}
    </div>
  );
}

/* ── Fixed Input: onChange receives a plain string ── */
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (value: string) => void;
}
function Input({ onChange, ...props }: InputProps) {
  return (
    <input
      {...props}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      className="w-full px-4 py-3 border border-[#001845]/[0.14] bg-[#001845]/[0.02]
        text-[14px] text-[#001845] placeholder:text-[#001845]/25 font-medium
        focus:outline-none focus:border-red-600/50 focus:bg-red-600/[0.015]
        transition-colors"
    />
  );
}

/* ── Select inside modal (renamed to avoid collision) ── */
interface ModalSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  onChange: (value: string) => void;
  children: React.ReactNode;
}
function ModalSelect({ onChange, children, ...props }: ModalSelectProps) {
  return (
    <div className="relative">
      <select
        {...props}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-[#001845]/[0.14] bg-[#001845]/[0.02]
          text-[14px] text-[#001845] font-medium appearance-none
          focus:outline-none focus:border-red-600/50 focus:bg-red-600/[0.015]
          transition-colors"
      >
        {children}
      </select>
      <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#001845]/30"
        width="12" height="7" viewBox="0 0 12 7" fill="none">
        <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

function NavRow({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-between pt-2">{children}</div>;
}

function NextBtn({ onClick, disabled, children }: {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`font-black text-[12px] tracking-[0.15em] uppercase px-7 py-3
        transition-all duration-200
        ${disabled
          ? "bg-[#001845]/[0.08] text-[#001845]/25 cursor-not-allowed"
          : "bg-[#001845] hover:bg-[#001845]/80 text-white"}`}
    >
      {children}
    </button>
  );
}

function BackBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-[12px] font-black tracking-[0.15em] uppercase
        text-[#001845]/40 hover:text-[#001845] transition-colors"
    >
      {children}
    </button>
  );
}

function SummarySection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="px-5 py-4">
      <p className="text-[9px] font-black tracking-[0.28em] uppercase text-red-600 mb-3">
        {label}
      </p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function SummaryRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-[11px] font-bold tracking-[0.12em] uppercase
        text-[#001845]/35 w-24 flex-shrink-0 pt-px">
        {k}
      </span>
      <span className="text-[13px] font-medium text-[#001845] leading-snug">{v}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export default function HowItWorks() {
  const sectionRef            = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    (async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(".hiw-line",
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 1.2, ease: "expo.out",
            scrollTrigger: { trigger: ".hiw-eyebrow-wrap", start: "top 85%" } });

        gsap.fromTo(".hiw-eyebrow-text",
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", delay: 0.4,
            scrollTrigger: { trigger: ".hiw-eyebrow-wrap", start: "top 85%" } });

        gsap.fromTo(".hiw-word",
          { y: "110%", opacity: 0, rotateX: -40 },
          { y: "0%", opacity: 1, rotateX: 0, stagger: 0.1, duration: 1.1, ease: "power4.out",
            scrollTrigger: { trigger: ".hiw-title-wrap", start: "top 82%" } });

        gsap.fromTo(".hiw-sub",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: ".hiw-title-wrap", start: "top 78%" } });

        gsap.fromTo(".step-card",
          { y: 60, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 1.0, ease: "power4.out",
            scrollTrigger: { trigger: ".steps-grid", start: "top 80%" } });

        gsap.fromTo(".step-index", { y: 20 },
          { y: 0, stagger: 0.15, duration: 0.8, ease: "back.out(1.5)",
            scrollTrigger: { trigger: ".steps-grid", start: "top 80%" } });

        gsap.fromTo(".step-divider",
          { scaleY: 0, transformOrigin: "top" },
          { scaleY: 1, duration: 1.0, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: ".steps-grid", start: "top 78%" } });

        gsap.fromTo(".hiw-red-bar",
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 1.4, ease: "expo.out",
            scrollTrigger: { trigger: ".steps-grid", start: "bottom 85%" } });

        gsap.fromTo(".banner-copy > *",
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: ".banner-wrap", start: "top 82%" } });

        gsap.fromTo(".banner-truck",
          { x: 80, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: ".banner-wrap", start: "top 82%" } });

        gsap.fromTo(".stat-item",
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.85, ease: "back.out(1.3)",
            scrollTrigger: { trigger: ".stats-grid", start: "top 86%" } });

        gsap.fromTo(".stat-line",
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, stagger: 0.12, duration: 1.0, ease: "expo.out",
            scrollTrigger: { trigger: ".stats-grid", start: "top 86%" } });

        gsap.fromTo(".cta-block",
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: ".cta-block", start: "top 88%" } });
      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="relative w-full bg-white overflow-hidden">

        {/* HEADER */}
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-7 pb-20 sm:pb-24">
          <div className="hiw-eyebrow-wrap flex items-center gap-4 mb-10">
            <div className="hiw-line h-[2px] w-14 bg-red-600 origin-left" />
            <span className="hiw-eyebrow-text opacity-0 text-[11px] font-black tracking-[0.28em] uppercase text-red-600">
              The Process
            </span>
          </div>

          <div className="hiw-title-wrap flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div style={{ perspective: "1200px" }}>
              <h2 className="text-[clamp(52px,9vw,110px)] font-black leading-[0.88] tracking-[-0.04em] text-[#001845] uppercase">
                {["How", "It", "Works"].map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden mr-[0.15em] align-top">
                    <span className="hiw-word inline-block opacity-0 will-change-transform">
                      {i === 2
                        ? <span className="text-transparent" style={{ WebkitTextStroke: "2.5px #001845" }}>{w}</span>
                        : w}
                    </span>
                  </span>
                ))}
              </h2>
            </div>
            <p className="hiw-sub opacity-0 text-[16px] sm:text-[17px] leading-[1.85] text-[#001845]/60 font-normal max-w-[400px] lg:pb-2 lg:text-right">
              Four steps. No surprises. From your first call to
              your cabinets running cold — we manage every part of the journey.
            </p>
          </div>
        </div>

        {/* STEPS */}
        <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pb-0 overflow-hidden">
          <div className="steps-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-[#001845]/[0.07]">
            {steps.map((step, i) => (
              <div key={step.index} className="relative flex">
                {i > 0 && (
                  <div className="step-divider hidden md:block absolute left-0 top-0 bottom-0 w-px bg-[#001845]/[0.07]" />
                )}
                <div className="step-card opacity-0 flex flex-col gap-7 px-8 sm:px-10 py-12 w-full
                  border-b md:border-b-0 border-[#001845]/[0.07] last:border-b-0
                  hover:bg-[#001845]/[0.015] transition-colors duration-500 group">
                  <span className="step-index text-[clamp(42px,6vw,64px)] font-black leading-none
                    tracking-[-0.04em] text-[#001845]/[0.07] tabular-nums select-none">
                    {step.index}
                  </span>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.3em] uppercase text-red-600 mb-4">
                      {step.label}
                    </p>
                    <h3 className="text-[clamp(20px,2.4vw,28px)] font-black tracking-[-0.03em]
                      text-[#001845] uppercase leading-tight mb-4">
                      {step.headline}
                    </h3>
                    <p className="text-[15px] leading-[1.85] text-[#001845]/65 font-medium">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-auto h-[2px] w-0 group-hover:w-12 bg-red-600
                    transition-all duration-500 ease-out" />
                </div>
              </div>
            ))}
          </div>
          <div className="hiw-red-bar h-[3px] w-full bg-red-600 origin-left" />
        </div>

        {/* TRUCK BANNER */}
        <div className="banner-wrap max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
          <div className="relative overflow-hidden bg-[#001845] flex flex-col lg:flex-row min-h-[340px]">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-red-600" />
            <div className="banner-copy flex-1 px-10 sm:px-14 py-14 lg:py-16 flex flex-col justify-center z-10">
              <p className="text-[10px] font-black tracking-[0.3em] uppercase text-white/25 mb-5">
                UK‑Wide Delivery
              </p>
              <h3 className="text-[clamp(28px,4vw,46px)] font-black tracking-[-0.03em]
                text-white uppercase leading-[1.05] mb-6">
                Your units arrive<br />
                <span className="text-red-500">on time, every time.</span>
              </h3>
              <p className="text-[15px] leading-[1.85] text-white/60 font-medium max-w-[300px] mb-10">
                Direct from our ILK warehouse. Fully tracked,
                blanket-wrapped, and delivered to your site.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Direct from ILK warehouse",
                  "Fully tracked delivery",
                  "Carefully handled delivery to your location",
                ].map(tag => (
                  <div key={tag} className="flex items-center gap-4">
                    <div className="w-5 h-[2px] bg-red-600 flex-shrink-0" />
                    <span className="text-[12px] font-semibold tracking-[0.12em] uppercase text-white/65">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="banner-truck relative w-full lg:w-[52%] h-64 sm:h-80 lg:h-auto flex-shrink-0">
              <div className="absolute inset-y-0 left-0 w-40 z-10 bg-gradient-to-r from-[#001845] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-14 z-10 bg-gradient-to-t from-[#001845] to-transparent" />
              <Image
                src="/truck.png"
                alt="ILK Technology delivery truck — nationwide refrigeration supply"
                fill
                quality={95}
                className="object-contain object-bottom lg:object-right-bottom"
                style={{ mixBlendMode: "screen" }}
                priority
              />
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="stats-grid max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 border border-[#001845]/[0.07]">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`stat-item opacity-0 flex flex-col px-10 py-12 group
                  ${i < stats.length - 1
                    ? "border-b sm:border-b-0 sm:border-r border-[#001845]/[0.07]"
                    : ""}`}
              >
                <span className="text-[clamp(40px,6vw,64px)] font-black tracking-[-0.04em]
                  text-[#001845] leading-none mb-4">
                  {stat.value}
                </span>
                <div className="stat-line h-[2px] w-8 bg-red-600 mb-4 origin-left" />
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#001845]/55">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-block opacity-0 max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pb-24 sm:pb-32">
          <div className="border border-[#001845]/[0.08] grid grid-cols-1 lg:grid-cols-[1fr_auto] items-stretch">

            {/* left — copy */}
            <div className="px-10 py-10 flex flex-col justify-center gap-5
              border-b lg:border-b-0 lg:border-r border-[#001845]/[0.08]">
              <p className="text-[10px] font-black tracking-[0.28em] uppercase text-red-600">
                Book a Site Survey
              </p>
              <h3 className="text-[clamp(22px,3vw,32px)] font-black tracking-[-0.03em]
                text-[#001845] uppercase leading-tight">
                Ready to get started?<br />
                <span className="text-[#001845]/35">Let&apos;s see your site.</span>
              </h3>
              <div className="flex flex-col sm:flex-row gap-6">
                <PriceTag zone="London"         price={LONDON_PRICE}  />
                <PriceTag zone="Outside London" price={OUTSIDE_PRICE} />
              </div>
            </div>

            {/* right — button */}
            <div className="flex flex-col items-center justify-center px-10 py-10 gap-5">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                aria-label="Open site survey enquiry form"
                className="group relative bg-red-600 hover:bg-red-700 text-white
                  font-black text-[12px] tracking-[0.18em] uppercase
                  px-10 py-5 transition-colors duration-200
                  flex items-center gap-4 whitespace-nowrap"
              >
                Enquire Now
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.75"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <p className="text-[11px] text-[#001845]/35 font-medium text-center max-w-[180px] leading-relaxed">
                Takes 2 minutes.<br />Response within 48 hrs.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* MODAL */}
      {modalOpen && <EnquiryModal onClose={() => setModalOpen(false)} />}
    </>
  );
}

function PriceTag({ zone, price }: { zone: string; price: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-1 h-8 bg-red-600 flex-shrink-0" />
      <div>
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#001845]/35 mb-0.5">
          {zone}
        </p>
        <p className="text-[20px] font-black text-[#001845] leading-none">£{price}</p>
      </div>
    </div>
  );
}