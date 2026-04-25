"use client";

import { useEffect } from "react";

export function HeroAnimations() {
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const run = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      // Cancel the CSS fallback wipe now that JS is ready
      const wipe = document.getElementById("hero-wipe");
      if (wipe) wipe.style.animation = "none";

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Wipe — opacity fade, NOT scaleX. Completes in 0.25s max.
        tl.fromTo("#hero-wipe",
          { opacity: 1 },
          { opacity: 0, duration: 0.25, ease: "power2.out",
            onComplete: () => {
              const w = document.getElementById("hero-wipe");
              if (w) w.style.display = "none"; // Remove from paint tree
            }
          }
        );

        // BG parallax base scale — start from current state
        tl.fromTo("#hero-bg",
          { scale: 1.12 },
          { scale: 1.03, duration: 1.6, ease: "power2.out" },
          "-=0.2"
        );

        // Accent line
        tl.fromTo("#hero-line",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: "expo.out" },
          "-=1.3"
        );

        // Heading words
        const words = document.querySelectorAll("#hero-head .word");
        if (words.length) {
          tl.fromTo(words,
            { y: "110%", opacity: 0, rotateX: -40 },
            { y: "0%", opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.05, ease: "power4.out" },
            "-=1.1"
          );
        }

        // Description
        tl.fromTo("#hero-desc",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.35"
        );

        // CTA buttons
        const ctas = document.querySelectorAll("#hero-cta .cta");
        if (ctas.length) {
          tl.fromTo(ctas,
            { y: 18, opacity: 0, scale: 0.97 },
            { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: "back.out(1.4)" },
            "-=0.3"
          );
        }

        // Stats — animate in + count-up
        const statEls = document.querySelectorAll("#hero-stats .stat");
        if (statEls.length) {
          tl.fromTo(statEls,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.45,
              stagger: 0.07,
              ease: "power3.out",
              onStart() {
                // Count-up each stat number
                statEls.forEach((el) => {
                  const target = Number(el.getAttribute("data-stat-target"));
                  const suf    = el.getAttribute("data-stat-suf") ?? "";
                  const numEl  = el.querySelector(".stat-number");
                  if (!numEl || !target) return;

                  const obj = { val: 0 };
                  gsap.to(obj, {
                    val: target,
                    duration: 1.4,
                    ease: "power3.out",
                    onUpdate() {
                      numEl.textContent = `${Math.floor(obj.val)}${suf}`;
                    },
                    onComplete() {
                      numEl.textContent = `${target}${suf}`;
                    },
                  });
                });
              },
            },
            "-=0.2"
          );
        }

        // Scroll-driven parallax on the background
        gsap.to("#hero-bg", {
          yPercent: 16,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    };

    run();
    return () => ctx?.revert();
  }, []);

  return null; // Renders nothing — pure side-effect island
}