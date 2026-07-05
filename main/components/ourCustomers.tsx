"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const customers = [
  { src: "/nisa-local.png", alt: "Nisa Local", label: "Nisa Local" },
  { src: "/morrisons-daily.png", alt: "Morrisons Daily", label: "Morrisons Daily" },
  { src: "/londis.png", alt: "Londis", label: "Londis" },
  { src: "/premier.png", alt: "Premier", label: "Premier" },
  { src: "/co-op.png", alt: "Co-op", label: "Co-op" },
  { src: "/costcutter.png", alt: "Costcutter", label: "Costcutter" },
  { src: "/bp.png", alt: "BP petrol station.", label: "BP petrol station." },
];

export default function OurCustomers() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading fade/slide in
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Cards staggered fade/scale in
      const cards = gridRef.current?.querySelectorAll(".customer-card");
      if (cards && cards.length) {
        gsap.from(cards, {
          opacity: 0,
          y: 30,
          scale: 0.95,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24 overflow-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-[0.06]"
        style={{ backgroundColor: "#ef4444" }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px"
        style={{ backgroundColor: "#f1f5f9" }}
      />

      <div ref={headingRef} className="relative text-center mb-12 sm:mb-16 px-5">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="block w-8 h-[2px]" style={{ backgroundColor: "#ef4444" }} />
          <p
            className="text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase"
            style={{ color: "#ef4444" }}
          >
            Our Customers
          </p>
          <span className="block w-8 h-[2px]" style={{ backgroundColor: "#ef4444" }} />
        </div>
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3"
          style={{ color: "#0f172a" }}
        >
          Supplying Symbol Groups Nationwide
        </h2>
        <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: "#64748b" }}>
          Trusted by leading convenience and symbol groups across the UK
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10">
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6">
          {customers.map((customer) => (
            <div
              key={customer.label}
              className="customer-card group relative flex flex-col items-center justify-center gap-4 rounded-2xl border py-8 px-5 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl"
              style={{ backgroundColor: "#f8fafc", borderColor: "#e2e8f0" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#ef4444";
                e.currentTarget.style.backgroundColor = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.backgroundColor = "#f8fafc";
              }}
            >
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: "#ef4444" }}
              />

              <div className="relative w-full h-14 sm:h-16">
                <Image
                  src={customer.src}
                  alt={customer.alt}
                  fill
                  className="object-contain"
                />
              </div>

              <p
                className="text-[11px] sm:text-[12px] font-semibold tracking-wide text-center transition-colors duration-300"
                style={{ color: "#334155" }}
              >
                {customer.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}