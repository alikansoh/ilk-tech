"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const logos = [
  { src: "/logo1.png", alt: "Commercial Refrigeration", label: "Commercial Refrigeration" },
  { src: "/logo2.png", alt: "Shelving and Check-outs", label: "Shelving & Check-outs" },
  { src: "/logo3.png", alt: "Commercial Refrigeration", label: "Commercial Refrigeration" },
  { src: "/logo4.png", alt: "Cold Rooms & High-Speed Doors", label: "Cold Rooms, Isothermal & High-Speed Doors" },
];

export default function LogoTicker() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");

      if (!trackRef.current) return;

      const track = trackRef.current;
      const totalWidth = track.scrollWidth / 2;

      gsap.to(track, {
        x: -totalWidth,
        duration: 25,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x: string) => `${parseFloat(x) % totalWidth}px`,
        },
      });
    };

    init();
  }, []);

  const renderSet = (keyPrefix: string) =>
    logos.map((logo, i) => (
      <div
        key={`${keyPrefix}-${i}`}
        className="flex-shrink-0 flex flex-col items-center gap-4 px-8 sm:px-12 lg:px-16"
        style={{ minWidth: "220px" }}
      >
        <div className="relative w-28 h-28 sm:w-32 sm:h-32">
          <Image
            src={logo.src}
            alt={logo.alt}
            fill
            className="object-contain"
          />
        </div>
        <p
          className="text-[11px] sm:text-[13px] font-semibold tracking-wide text-center max-w-[200px] leading-snug"
          style={{ color: "#334155" }}
        >
          {logo.label}
        </p>
      </div>
    ));

  return (
    <section
      className="relative w-full overflow-hidden py-14 sm:py-20"
      style={{ backgroundColor: "#f8fafc" }}
    >
      {/* heading */}
      <div className="text-center mb-10 sm:mb-14 px-5">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="block w-8 h-[2px]" style={{ backgroundColor: "#ef4444" }} />
          <p
            className="text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase"
            style={{ color: "#ef4444" }}
          >
            Our Partners
          </p>
          <span className="block w-8 h-[2px]" style={{ backgroundColor: "#ef4444" }} />
        </div>
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight"
          style={{ color: "#0f172a" }}
        >
          Trusted by Industry Leaders
        </h2>
      </div>

      {/* fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #f8fafc, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #f8fafc, transparent)" }}
      />

      {/* ticker track */}
      <div className="relative">
        <div
          ref={trackRef}
          className="flex items-start gap-0"
          style={{ willChange: "transform" }}
        >
          {renderSet("a")}
          {renderSet("b")}
          {renderSet("c")}
          {renderSet("d")}
        </div>
      </div>
    </section>
  );
}