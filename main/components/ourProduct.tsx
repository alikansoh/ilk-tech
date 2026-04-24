"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const products = [
    {
        index: "01",
        name: "Osaka 2",
        href: "/products/osaka-2",
        image: "/product1.png",
        tag: "Remote Multideck Cabinet",
        desc: "Compact remote vertical multideck refrigeration cabinet designed for small to medium retail spaces, offering efficient performance and flexible installation with a central refrigeration system.",
        specs: ["Remote system", "Energy efficient", "Multi-deck display", "Supermarket-ready"],
      },
    {
      index: "02",
      name: "Osaka 3",
      href: "/products/osaka-3",
      image: "/product2.png",
      tag: "Remote Multideck Cabinet",
      desc: "Extended-range remote vertical multideck refrigeration cabinet designed for supermarkets and large retail environments requiring high capacity and continuous display runs.",
      specs: ["Remote system", "Supermarket grade", "High capacity", "Multiplex capable"],
    },
    {
      index: "03",
      name: "Panama 3",
      href: "/products/panama-3",
      image: "/product3.png",
      tag: "Open Multideck Cabinet",
      desc: "Open vertical multideck display cabinet designed for maximum product visibility and grab-and-go retail applications in supermarkets.",
      specs: ["Open front display", "High visibility", "Remote system", "Multiplex capable"],
    },
  ];

export default function OurProducts() {
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

        /* ── header ── */
        const hwords = headerRef.current
          ? Array.from(headerRef.current.querySelectorAll(".hword"))
          : [];
        const hdesc = headerRef.current
          ? headerRef.current.querySelector(".hdesc")
          : null;

        const headerTl = gsap.timeline({
          scrollTrigger: { trigger: headerRef.current, start: "top 82%", toggleActions: "play none none none" },
          defaults: { ease: "power3.out" },
        });

        headerTl.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.7, ease: "expo.out" }
        );

        if (hwords.length) {
          headerTl.fromTo(
            hwords,
            { y: 60, opacity: 0, rotateX: -30 },
            { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.08 },
            "-=0.4"
          );
        }

        if (hdesc) {
          headerTl.fromTo(
            hdesc,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            "-=0.5"
          );
        }

        /* ── cards stagger ── */
        const cards = cardsRef.current
          ? Array.from(cardsRef.current.querySelectorAll(".prod-card"))
          : [];

        if (cards.length) {
          gsap.fromTo(
            cards,
            { y: 80, opacity: 0, scale: 0.96 },
            {
              y: 0, opacity: 1, scale: 1,
              duration: 1.0,
              stagger: 0.18,
              ease: "power3.out",
              scrollTrigger: { trigger: cardsRef.current, start: "top 80%", toggleActions: "play none none none" },
            }
          );
        }

        /* ── number lines draw in ── */
        const numLines = cardsRef.current
          ? Array.from(cardsRef.current.querySelectorAll(".num-line"))
          : [];

        if (numLines.length) {
          gsap.fromTo(
            numLines,
            { scaleY: 0, transformOrigin: "top" },
            {
              scaleY: 1,
              duration: 0.9,
              stagger: 0.2,
              ease: "expo.out",
              scrollTrigger: { trigger: cardsRef.current, start: "top 78%", toggleActions: "play none none none" },
            }
          );
        }

        /* ── parallax image drift ── */
        cardsRef.current?.querySelectorAll(".card-img").forEach((img) => {
          gsap.to(img, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".prod-card"),
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          });
        });

      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, []);

  /* magnetic hover */
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

  const headWords = ["Our", "Product", "Range","in","stock"];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f8fafc] py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-14">

        {/* ── HEADER ── */}
        <div ref={headerRef} className="mb-16 sm:mb-20 lg:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div ref={lineRef} className="h-[2px] w-8 bg-red-600 origin-left scale-x-0" />
            <span className="text-[11px] font-black tracking-[0.28em] uppercase text-red-600">
              Arneg Distribution Partner
            </span>
          </div>

          <div className="overflow-hidden mb-5" style={{ perspective: "800px" }}>
            <h2 className="text-[clamp(2.4rem,6vw,4.2rem)] font-black leading-[1.05] tracking-[-0.03em] text-[#001845] uppercase flex flex-wrap gap-x-[0.22em]">
              {headWords.map((w, i) => (
                <span key={i} className="hword inline-block opacity-0 will-change-transform">
                  {w}
                </span>
              ))}
            </h2>
          </div>

          <p className="hdesc opacity-0 text-[15px] sm:text-[16px] leading-[1.85] text-[#001845]/50 font-light max-w-xl">
            Engineered for UK retail. Every unit in our range is an{" "}
            <span className="text-red-500 font-semibold">authorised Arneg </span>{" "}
            product — built for performance, efficiency, and longevity.
          </p>
        </div>

        {/* ── CARDS ── */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {products.map((p, i) => (
            <div
              key={p.href}
              className="prod-card opacity-0 group relative flex flex-col cursor-pointer will-change-transform h-full"
              style={{ transition: "transform 0.25s cubic-bezier(0.23,1,0.32,1)" }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={handleMouseLeave}
            >
              {/* image container — aspect ratio reduced from [3/4] to [4/5] */}
              <div className="relative overflow-hidden aspect-[4/5] shadow-[0_16px_48px_rgba(0,24,69,0.10)] flex-none">

                {/* index number top-left */}
                <div className="absolute top-0 left-0 z-20 flex items-start gap-2 p-5">
                  <div className="num-line w-[2px] h-10 bg-red-600 scale-y-0" />
                  <span className="text-[11px] font-black tracking-[0.22em] text-white/80 uppercase mt-0.5 tabular-nums">
                    {p.index}
                  </span>
                </div>

                {/* tag top-right */}
                <div className="absolute top-5 right-5 z-20">
                  <span
                    className="inline-flex items-center px-3 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase text-white"
                    style={{ background: "rgba(0,24,69,0.70)", backdropFilter: "blur(8px)" }}
                  >
                    {p.tag}
                  </span>
                </div>

                {/* image with parallax wrapper */}
                <div className="card-img absolute inset-[-8%] will-change-transform">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    quality={90}
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001845]/75 via-[#001845]/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

                {/* bottom content inside image */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                  <h3 className="text-[1.6rem] sm:text-[1.8rem] font-black tracking-[-0.02em] text-white uppercase leading-none mb-1">
                    {p.name}
                  </h3>
                  <div className="flex gap-1.5 mt-3 flex-wrap">
                    {p.specs.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/50 border border-white/15 px-2.5 py-1 transition-all duration-300 group-hover:border-white/30 group-hover:text-white/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* card footer */}
              <div
                className="flex flex-col flex-1 px-5 py-5 justify-between"
                style={{
                  background: activeIdx === i ? "#001845" : "#ffffff",
                  border: "1px solid rgba(0,24,69,0.08)",
                  borderTop: "none",
                  transition: "background 0.4s cubic-bezier(0.23,1,0.32,1)",
                }}
              >
                <p
                  className="text-[13.5px] leading-[1.75] mb-5 transition-colors duration-300"
                  style={{ color: activeIdx === i ? "rgba(255,255,255,0.6)" : "rgba(0,24,69,0.50)" }}
                >
                  {p.desc}
                </p>

                <Link
                  href={p.href}
                  className="group/btn relative inline-flex items-center justify-between w-full overflow-hidden
                    border-[1.5px] px-5 py-3.5 text-[11px] font-black tracking-[0.22em] uppercase
                    transition-all duration-300"
                  style={
                    activeIdx === i
                      ? { borderColor: "#dc2626", background: "#dc2626", color: "#ffffff" }
                      : { borderColor: "rgba(0,24,69,0.20)", background: "transparent", color: "#001845" }
                  }
                >
                  <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700" />
                  <span className="relative">Discover {p.name}</span>
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

        {/* ── BOTTOM CTA BAR ── */}
        <div
          className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 px-7 py-6"
          style={{ background: "#001845" }}
        >
          <div className="flex items-center gap-4">
            <div className="w-[3px] h-10 bg-red-600 flex-shrink-0" />
            <div>
              <p className="text-white font-black text-sm tracking-wide">Need a bespoke solution?</p>
              <p className="text-white/45 text-[12px] font-medium mt-0.5">
                We supply custom-configured units tailored to your store.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 border-[1.5px] border-white/20
              hover:border-white bg-transparent hover:bg-white
              px-7 py-3.5 text-[11px] font-black tracking-[0.22em] uppercase
              text-white hover:text-[#001845] transition-all duration-300 flex-shrink-0"
          >
            Talk to Our Team
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}