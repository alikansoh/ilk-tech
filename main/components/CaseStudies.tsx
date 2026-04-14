"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const caseStudies = [
  {
    index: "01",
    badge: "Supermarket",
    client: "Midlands Co-op Group",
    title: "Full Store Refit — Osaka 2",
    image: "/case1.jpg",
    href: "/case-studies/midlands-coop",
    stats: [
      { value: "31%", label: "Energy saving" },
      { value: "18mo", label: "ROI period" },
      { value: "6", label: "Cabinets fitted" },
    ],
    desc: "Replaced ageing self-contained units with a full remote Osaka 2 run, cutting energy bills significantly across three stores.",
  },
  {
    index: "02",
    badge: "Convenience",
    client: "Fresh Stop Retail",
    title: "Panama 3 Open Display",
    image: "/case2.jpg",
    href: "/case-studies/fresh-stop",
    stats: [
      { value: "+22%", label: "Grab-and-go sales" },
      { value: "4wk", label: "Install time" },
      { value: "3", label: "Stores" },
    ],
    desc: "Open-front Panama 3 cabinets boosted impulse purchases dramatically — maximum product visibility at prime eye level.",
  },
  {
    index: "03",
    badge: "Large Format",
    client: "Northgate Foodstore",
    title: "Osaka 3 Multiplex Run",
    image: "/case3.jpg",
    href: "/case-studies/northgate",
    stats: [
      { value: "40m", label: "Display run" },
      { value: "A+", label: "Energy rating" },
      { value: "12", label: "Units installed" },
    ],
    desc: "A 40-metre continuous Osaka 3 multiplex installation delivering consistent temperatures and a premium shopfloor aesthetic.",
  },
];

export default function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    (async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {

        /* ── header line + words ── */
        const hwords = Array.from(headerRef.current?.querySelectorAll(".cs-hword") ?? []);
        const hdesc  = headerRef.current?.querySelector(".cs-hdesc");

        const headerTl = gsap.timeline({
          scrollTrigger: { trigger: headerRef.current, start: "top 82%", toggleActions: "play none none none" },
          defaults: { ease: "power3.out" },
        });

        headerTl
          .fromTo(lineRef.current, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.7, ease: "expo.out" })
          .fromTo(hwords,  { y: 60, opacity: 0, rotateX: -30 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.08 }, "-=0.4")
          .fromTo(hdesc,   { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5");

        /* ── cards stagger ── */
        const cards = Array.from(cardsRef.current?.querySelectorAll(".cs-card") ?? []);
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 1.0, stagger: 0.18, ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 80%", toggleActions: "play none none none" },
          }
        );

        /* ── badge num-lines draw in ── */
        const numLines = Array.from(cardsRef.current?.querySelectorAll(".cs-num-line") ?? []);
        gsap.fromTo(
          numLines,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1, duration: 0.9, stagger: 0.2, ease: "expo.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 78%", toggleActions: "play none none none" },
          }
        );

        /* ── stat counters animate up ── */
        cards.forEach((card) => {
          const statEls = Array.from(card.querySelectorAll(".cs-stat-val"));
          gsap.fromTo(
            statEls,
            { opacity: 0, y: 16 },
            {
              opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none none" },
            }
          );
        });

        /* ── parallax image drift ── */
        cardsRef.current?.querySelectorAll(".cs-card-img").forEach((img) => {
          gsap.to(img, {
            yPercent: -8, ease: "none",
            scrollTrigger: {
              trigger: img.closest(".cs-card"),
              start: "top bottom", end: "bottom top", scrub: 1.4,
            },
          });
        });

        /* ── horizontal reveal lines on stat dividers ── */
        const dividers = Array.from(cardsRef.current?.querySelectorAll(".cs-divider") ?? []);
        gsap.fromTo(
          dividers,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1, duration: 0.8, stagger: 0.15, ease: "expo.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 75%", toggleActions: "play none none none" },
          }
        );

      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, []);

  /* magnetic 3-D tilt */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 10;
    card.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(4px)`;
    setActiveIdx(i);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
    setActiveIdx(null);
  };

  const headWords = ["Case", "Studies"];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#001845] py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-14">

        {/* ── HEADER ── */}
        <div ref={headerRef} className="mb-16 sm:mb-20 lg:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div ref={lineRef} className="h-[2px] w-8 bg-red-600 origin-left scale-x-0" />
            <span className="text-[11px] font-black tracking-[0.28em] uppercase text-red-600">
              Real-World Installations
            </span>
          </div>

          <div className="overflow-hidden mb-5" style={{ perspective: "800px" }}>
            <h2 className="text-[clamp(2.4rem,6vw,4.2rem)] font-black leading-[1.05] tracking-[-0.03em] text-white uppercase flex flex-wrap gap-x-[0.22em]">
              {headWords.map((w, i) => (
                <span key={i} className="cs-hword inline-block opacity-0 will-change-transform">
                  {w}
                </span>
              ))}
            </h2>
          </div>

          <p className="cs-hdesc opacity-0 text-[15px] sm:text-[16px] leading-[1.85] text-white/40 font-light max-w-xl">
            Trusted by retailers across the UK — see how our{" "}
            <span className="text-red-400 font-semibold">Arneg solutions</span>{" "}
            have transformed real store environments.
          </p>
        </div>

        {/* ── CARDS ── */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {caseStudies.map((c, i) => (
            <div
              key={c.href}
              className="cs-card opacity-0 group relative flex flex-col cursor-pointer will-change-transform"
              style={{ transition: "transform 0.25s cubic-bezier(0.23,1,0.32,1)" }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={handleMouseLeave}
            >
              {/* ── IMAGE ── */}
              <div className="relative overflow-hidden aspect-[16/10] shadow-[0_16px_48px_rgba(0,0,0,0.40)]">

                {/* index + line top-left */}
                <div className="absolute top-0 left-0 z-20 flex items-start gap-2 p-5">
                  <div className="cs-num-line w-[2px] h-8 bg-red-600 scale-y-0" />
                  <span className="text-[11px] font-black tracking-[0.22em] text-white/70 uppercase mt-0.5 tabular-nums">
                    {c.index}
                  </span>
                </div>

                {/* badge top-right */}
                <div className="absolute top-5 right-5 z-20">
                  <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase text-white bg-red-600">
                    {c.badge}
                  </span>
                </div>

                {/* parallax image */}
                <div className="cs-card-img absolute inset-[-8%] will-change-transform">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    quality={90}
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001845]/90 via-[#001845]/25 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

                {/* bottom inside image */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
                  <p className="text-[10px] font-black tracking-[0.2em] uppercase text-white/50 mb-1.5">
                    {c.client}
                  </p>
                  <h3 className="text-[1.25rem] sm:text-[1.4rem] font-black tracking-[-0.02em] text-white uppercase leading-tight">
                    {c.title}
                  </h3>
                </div>
              </div>

              {/* ── FOOTER ── */}
              <div
                className="flex flex-col flex-1 px-5 py-5"
                style={{
                  background: activeIdx === i ? "rgba(220,38,38,0.10)" : "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderTop: "none",
                  transition: "background 0.4s cubic-bezier(0.23,1,0.32,1)",
                }}
              >
                {/* stats row */}
                <div className="flex gap-5 mb-4">
                  {c.stats.map((s, si) => (
                    <div key={si} className="flex flex-col">
                      <span className="cs-stat-val opacity-0 text-[1.35rem] font-black text-red-500 leading-none tracking-[-0.02em]">
                        {s.value}
                      </span>
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 mt-1">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* divider */}
                <div
                  className="cs-divider h-[1px] w-full mb-4 scale-x-0 origin-left"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                />

                <p className="text-[13px] leading-[1.75] mb-5 text-white/40">
                  {c.desc}
                </p>

                <Link
                  href={c.href}
                  className="group/btn relative inline-flex items-center justify-between w-full overflow-hidden
                    border-[1.5px] px-5 py-3.5 text-[11px] font-black tracking-[0.22em] uppercase mt-auto
                    transition-all duration-300"
                  style={
                    activeIdx === i
                      ? { borderColor: "#dc2626", background: "#dc2626", color: "#ffffff" }
                      : { borderColor: "rgba(255,255,255,0.15)", background: "transparent", color: "rgba(255,255,255,0.7)" }
                  }
                >
                  <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700" />
                  <span className="relative">Read Case Study</span>
                  <svg
                    className="relative w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA BAR ── */}
        <div
          className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 px-7 py-6"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-4">
            <div className="w-[3px] h-10 bg-red-600 flex-shrink-0" />
            <div>
              <p className="text-white font-black text-sm tracking-wide">Want to see more installations?</p>
              <p className="text-white/40 text-[12px] font-medium mt-0.5">
                Browse our full portfolio of UK retail projects.
              </p>
            </div>
          </div>
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-3 border-[1.5px] border-white/20
              hover:border-red-600 bg-transparent hover:bg-red-600
              px-7 py-3.5 text-[11px] font-black tracking-[0.22em] uppercase
              text-white transition-all duration-300 flex-shrink-0"
          >
            View All Case Studies
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}