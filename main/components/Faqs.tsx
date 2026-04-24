"use client"
import React, { useEffect, useRef, useState } from "react";

type FAQ = {
  question: string;
  answer: string;
  id?: string;
};

export default function FAQSection({
  faqs,
  className = "",
  pageUrl = typeof window !== "undefined" ? window.location.href : "",
}: {
  faqs?: FAQ[];
  className?: string;
  pageUrl?: string;
}) {
  const defaultFaqs: FAQ[] = [
    {
      question: "What products do you supply and install?",
      answer:
        "We supply refrigeration cabinets, remote & plug-in systems, cold rooms, checkouts, shelving and bespoke installations. Some products are in stock and bespoke options are available on request.",
    },
    {
      question: "Do you provide site surveys and bespoke design?",
      answer:
        "Yes — we offer on-site surveys, design and supply bespoke refrigeration solutions tailored to your space and workflow. Contact us to arrange a survey.",
    },
    {
      question: "What warranties do you provide?",
      answer:
        "Most products include the manufacturer's warranty. We provide installation warranties where applicable and spare parts sourcing.",
    },
    {
      question: "Can you handle large commercial cold rooms and turnkey projects?",
      answer:
        "Absolutely — we manage projects of all scales from single cabinets to fully integrated cold rooms and turnkey retail fit-outs, including installation and commissioning.",
    },
    {
      question: "How quickly can I receive stock or installations?",
      answer:
        "Lead times vary by product and size of the project. In-stock items can ship quickly; bespoke systems and large installations will have a quoted timeline after survey.",
    },
    {
      question: "Are you an authorised Arneg dealer?",
      answer: "Yes — we are an authorised Arneg dealer.",
    },
  ];

  const items = faqs && faqs.length ? faqs : defaultFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // btnRefs holds references to the generated buttons (keyboard navigation)
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Build JSON-LD for SEO (FAQPage)
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
    ...(pageUrl ? { url: pageUrl } : {}),
  };

  useEffect(() => {
    // keep refs array length in sync with items
    btnRefs.current = btnRefs.current.slice(0, items.length);
  }, [items.length]);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const max = items.length - 1;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = i === max ? 0 : i + 1;
      btnRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = i === 0 ? max : i - 1;
      btnRefs.current[prev]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      btnRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      btnRefs.current[max]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(i);
    }
  }

  return (
    <section aria-labelledby="faq-heading" className={`w-full bg-white py-8 sm:py-12 ${className}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-14">
        {/* Red border wrapper around the FAQ */}
        <div className="max-w-4xl mx-auto rounded-lg border-2 border-red-600 p-1">
          {/* inner content keeps white background and spacing */}
          <div className="bg-white rounded-md p-6">
            <div className="mb-6">
              <h2 id="faq-heading" className="text-xl sm:text-2xl font-black tracking-tight text-[#001845] uppercase">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-sm text-[#001845]/60">Helpful answers about our products, installation and services.</p>
            </div>

            <dl className="space-y-3" role="list">
              {items.map((f, i) => {
                const isOpen = openIndex === i;
                const dtId = `faq-${i}`;
                const panelId = `faq-panel-${i}`;

                return (
                  <div key={dtId} className="rounded-lg border border-[#001845]/8 bg-[#f8fafc]">
                    <dt>
                      <button
                        ref={(el) => {
                          btnRefs.current[i] = el;
                        }} // callback ref (no return) — TS-safe
                        id={dtId}
                        aria-controls={panelId}
                        aria-expanded={isOpen}
                        onClick={() => toggle(i)}
                        onKeyDown={(e) => onKeyDown(e, i)}
                        className={`w-full flex items-center justify-between gap-4 px-4 py-4 text-left transition-colors duration-200 ${
                          isOpen ? "bg-white" : "bg-transparent"
                        }`}
                      >
                        <span className="flex-1">
                          <span className="text-sm sm:text-base font-semibold text-[#001845]">{f.question}</span>
                        </span>

                        <svg
                          className={`w-5 h-5 text-[#001845] transform transition-transform duration-200 ${
                            isOpen ? "rotate-90" : "rotate-0"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </dt>

                    <dd
                      id={panelId}
                      role="region"
                      aria-labelledby={dtId}
                      className={`px-4 overflow-hidden transition-[max-height,opacity,padding] duration-300 ${
                        isOpen ? "py-4 opacity-100" : "py-0 opacity-0"
                      }`}
                      style={{ maxHeight: isOpen ? 400 : 0 }}
                    >
                      <p className="text-sm text-[#001845]/70 leading-relaxed">{f.answer}</p>
                    </dd>
                  </div>
                );
              })}
            </dl>

            <div className="mt-6">
              <a href="/contact" className="inline-flex items-center gap-3 px-5 py-3 bg-[#001845] text-white font-black uppercase text-[11px] tracking-[0.18em] hover:bg-white hover:text-[#001845] border border-[#001845] transition-all duration-300">
                Still have questions? Contact us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}