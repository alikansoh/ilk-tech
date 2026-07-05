"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const customers = [
  { src: "/nisa-local.png", alt: "Nisa Local", label: "Nisa Local" },
  { src: "/morrisons-daily.png", alt: "Morrisons Daily", label: "Morrisons Daily" },
  { src: "/londis.png", alt: "Londis", label: "Londis" },
  { src: "/Premier.png", alt: "Premier", label: "Premier" },
  { src: "/co-op.png", alt: "Co-op", label: "Co-op" },
  { src: "/costcutter.png", alt: "Costcutter", label: "Costcutter" },
  {src:"/asda.webp", alt:"Asda Express", label:"Asda Express"},
  { src: "/bp.png", alt: "BP petrol station.", label: "BP petrol station." },
  {src:"spar.jpeg", alt:"Spar", label:"Spar"},
];

export default function OurCustomers() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;

    // Wait a tick so widths are accurate after images/layout settle
    const start = () => {
      // Kill any existing tween (Fast Refresh safety)
      tweenRef.current?.kill();

      const totalWidth = track.scrollWidth / 2; // track contains 2 copies

      gsap.set(track, { x: 0 });

      tweenRef.current = gsap.to(track, {
        x: -totalWidth,
        duration: totalWidth / 60, // speed: px per second (lower divisor = faster)
        ease: "none",
        repeat: -1,
      });
    };

    // Ensure layout is measured after paint
    const raf = requestAnimationFrame(start);

    return () => {
      cancelAnimationFrame(raf);
      tweenRef.current?.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    tweenRef.current?.pause();
  };
  const handleMouseLeave = () => {
    tweenRef.current?.resume();
  };

  return (
    <section
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

      <div className="relative text-center mb-12 sm:mb-16 px-5">
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
       
      </div>

      {/* Marquee wrapper with edge fade */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div ref={trackRef} className="flex items-center gap-6 sm:gap-8 w-max">
          {/* Render the list twice for seamless infinite loop */}
          {[...customers, ...customers].map((customer, i) => (
            <div
              key={`${customer.label}-${i}`}
              className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl border py-8 px-8 shrink-0 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl"
              style={{
                backgroundColor: "#f8fafc",
                borderColor: "#e2e8f0",
                width: "180px",
              }}
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