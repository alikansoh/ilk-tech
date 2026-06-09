"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const NAVY  = "#0B2540";
const RED   = "#C8102E";
const BLUE  = "#0072BB";
const MUTED = "#6B7280";
const BORDER = "rgba(11,37,64,0.1)";

/* ─── DATA ─── */
const FUSION_HYBRID = [
  "JEHR – 0050 – H1 – M1", "JEHR – 0067 – H1 – M1",
  "JEHR – 0100 – H1 – M1", "JEHR – 0113 – H1 – M1",
  "JEHR – 0140 – H2 – M1", "JEHR – 0170 – H2 – M1",
  "JEHR – 0115 – H1 – L1", "JEHR – 0135 – H1 – L1",
  "JEHR – 0180 – H2 – L1", "JEHR – 0210 – H2 – L1",
];

const FUSION_SCROLL_M = [
  "JEHS – 0200 – B2 – M – 1", "JEHS – 0250 – B2 – M – 1",
  "JEHS – 0300 – B2 – M – 1", "JEHS – 0350 – B2 – M – 1",
  "JEHS – 0400 – B3 – M – 1", "JEHS – 0500 – B3 – M – 3",
  "JEHS – 0600 – B3 – M – 3", "JEHS – 0680 – B3 – M – 3",
  "JEHS – 0800 – B4 – M – 3", "JEHS – 1000 – B4 – M – 3",
  "JEHSDT – 1201 – B5 – M – 3", "JEHS – 1300 – B4 – M – 3",
  "JEHS – 1500 – B6 – M – 3", "JEHSDT – 1600 – B6 – M3",
];

const FUSION_SCROLL_L = [
  "JEHS – 0300 – B2 – L – 3", "JEHS – 0400 – B3 – L – 3",
  "JEHS – 0500 – B3 – L – 3", "JEHS – 0600 – B3 – L – 3",
  "JEHS – 0750 – B4 – L – 3", "JEHS – 0951 – B4 – L – 3 – EVI",
  "JEHS – 1150 – B4 – L – 3 – EVI", "JEHS – 1400 – B4 – L3 – EVI",
];

const SCROLL_FEATURES = [
  "Copeland scroll compressor",
  "Crankcase heater",
  "Liquid receiver",
  "Drier sight glass",
  "Adjustable HP/LP switch",
  "Rota lock valves",
  "Electric isolator",
  "IP55 Panel",
  "Fan speed control",
  "Micro-channel condenser coil",
];

export default function JEHallPage() {
  const threeRef = useRef<HTMLDivElement>(null);

  /* ─── THREE.JS 3D CONDENSING UNIT ─── */
  useEffect(() => {
    const container = threeRef.current;
    if (!container) return;

    let running = true;
    let animId: number;

    const init = async () => {
      const THREE = await import("three");

      const W = container.clientWidth;
      const H = container.clientHeight;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
      camera.position.set(0, 0.6, 4.8);

      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const key = new THREE.DirectionalLight(0xffffff, 1.1);
      key.position.set(4, 6, 5);
      key.castShadow = true;
      scene.add(key);
      const fill = new THREE.DirectionalLight(0x0072bb, 0.45);
      fill.position.set(-4, 2, 3);
      scene.add(fill);
      const rim = new THREE.DirectionalLight(0x0072bb, 0.3);
      rim.position.set(0, -3, -4);
      scene.add(rim);

      const bodyMat  = new THREE.MeshStandardMaterial({ color: 0x0d1f33, roughness: 0.35, metalness: 0.85 });
      const panelMat = new THREE.MeshStandardMaterial({ color: 0x091828, roughness: 0.4,  metalness: 0.7  });
      const blueMat  = new THREE.MeshStandardMaterial({ color: 0x0072bb, roughness: 0.3,  metalness: 0.6, emissive: 0x0072bb, emissiveIntensity: 0.15 });
      const darkMat  = new THREE.MeshStandardMaterial({ color: 0x060e18, roughness: 0.6,  metalness: 0.5  });
      const fanMat   = new THREE.MeshStandardMaterial({ color: 0x1a3a5c, roughness: 0.3,  metalness: 0.9, side: THREE.DoubleSide });
      const ledMat   = new THREE.MeshStandardMaterial({ color: 0x0072bb, emissive: 0x0072bb, emissiveIntensity: 1.2, roughness: 0.1, metalness: 0 });

      const root = new THREE.Group();
      scene.add(root);

      const casingGeo = new THREE.BoxGeometry(3.2, 1.6, 1.0);
      const casing = new THREE.Mesh(casingGeo, bodyMat);
      casing.castShadow = true;
      root.add(casing);

      const frontGeo = new THREE.BoxGeometry(3.0, 1.4, 0.05);
      const front = new THREE.Mesh(frontGeo, panelMat);
      front.position.set(0, 0, 0.53);
      root.add(front);

      const topStripGeo = new THREE.BoxGeometry(3.2, 0.06, 1.02);
      const topStrip = new THREE.Mesh(topStripGeo, blueMat);
      topStrip.position.set(0, 0.83, 0);
      root.add(topStrip);

      const leftBarGeo = new THREE.BoxGeometry(0.06, 1.6, 1.02);
      const leftBar = new THREE.Mesh(leftBarGeo, blueMat);
      leftBar.position.set(-1.63, 0, 0);
      root.add(leftBar);

      const makeFan = (x: number) => {
        const g = new THREE.Group();
        const ringGeo = new THREE.TorusGeometry(0.52, 0.04, 12, 48);
        const ring = new THREE.Mesh(ringGeo, blueMat);
        g.add(ring);
        const innerGeo = new THREE.TorusGeometry(0.26, 0.025, 12, 32);
        const inner = new THREE.Mesh(innerGeo, darkMat);
        g.add(inner);
        const bladeGroup = new THREE.Group();
        const bladeGeo = new THREE.BoxGeometry(0.08, 0.32, 0.04);
        for (let i = 0; i < 7; i++) {
          const blade = new THREE.Mesh(bladeGeo, fanMat);
          const angle = (i / 7) * Math.PI * 2;
          blade.position.set(Math.sin(angle) * 0.28, Math.cos(angle) * 0.28, 0);
          blade.rotation.z = angle + 0.45;
          bladeGroup.add(blade);
        }
        g.add(bladeGroup);
        const hubGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 20);
        const hub = new THREE.Mesh(hubGeo, darkMat);
        hub.rotation.x = Math.PI / 2;
        g.add(hub);
        g.position.set(x, 0, 0.56);
        root.add(g);
        return { g, blades: bladeGroup };
      };

      const fan1 = makeFan(-0.82);
      const fan2 = makeFan( 0.82);

      for (let i = -3; i <= 3; i++) {
        const grilleGeo = new THREE.BoxGeometry(3.0, 0.025, 0.03);
        const grille = new THREE.Mesh(grilleGeo, darkMat);
        grille.position.set(0, i * 0.18, 0.545);
        root.add(grille);
      }

      const cpGeo = new THREE.BoxGeometry(0.35, 1.0, 0.06);
      const cp = new THREE.Mesh(cpGeo, darkMat);
      cp.position.set(1.35, 0, 0.56);
      root.add(cp);

      const ledGeo = new THREE.SphereGeometry(0.04, 12, 12);
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(1.35, 0.42, 0.595);
      root.add(led);

      const dispGeo = new THREE.BoxGeometry(0.22, 0.12, 0.015);
      const dispMat = new THREE.MeshStandardMaterial({ color: 0x0a1520, roughness: 0.8, metalness: 0.2 });
      const disp = new THREE.Mesh(dispGeo, dispMat);
      disp.position.set(1.35, 0.18, 0.595);
      root.add(disp);

      const pipeGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.28, 12);
      const pipeMat = new THREE.MeshStandardMaterial({ color: 0x1a3344, roughness: 0.4, metalness: 0.9 });
      [-1.1, -0.85, 0.85, 1.1].forEach(px => {
        const pipe = new THREE.Mesh(pipeGeo, pipeMat);
        pipe.position.set(px, -1.02, 0);
        root.add(pipe);
      });

      const footGeo = new THREE.BoxGeometry(0.5, 0.1, 0.9);
      [-1.1, 1.1].forEach(px => {
        const foot = new THREE.Mesh(footGeo, darkMat);
        foot.position.set(px, -0.9, 0);
        root.add(foot);
      });

      const planeGeo = new THREE.PlaneGeometry(8, 8);
      const planeMat = new THREE.ShadowMaterial({ opacity: 0.18 });
      const plane = new THREE.Mesh(planeGeo, planeMat);
      plane.rotation.x = -Math.PI / 2;
      plane.position.y = -1.0;
      plane.receiveShadow = true;
      scene.add(plane);

      let mouseX = 0, mouseY = 0;
      const onMouse = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
        mouseY = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
      };
      container.addEventListener("mousemove", onMouse);

      let scrollProgress = 0;
      const onScroll = () => {
        const rect = container.getBoundingClientRect();
        const vh = window.innerHeight;
        scrollProgress = Math.max(0, Math.min(1, 1 - rect.top / vh));
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      let t = 0;
      const animate = () => {
        if (!running) return;
        animId = requestAnimationFrame(animate);
        t += 0.016;
        fan1.blades.rotation.z += 0.04;
        fan2.blades.rotation.z -= 0.035;
        ledMat.emissiveIntensity = 0.8 + Math.sin(t * 2.5) * 0.6;
        const entryY = -1.5 + scrollProgress * 1.5;
        root.position.y = entryY;
        root.scale.setScalar(0.55 + scrollProgress * 0.45);
        root.rotation.y = Math.sin(t * 0.22) * 0.18 + mouseX * 0.12;
        root.rotation.x = -0.08 + mouseY * 0.06;
        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        const nW = container.clientWidth;
        const nH = container.clientHeight;
        camera.aspect = nW / nH;
        camera.updateProjectionMatrix();
        renderer.setSize(nW, nH);
      };
      window.addEventListener("resize", onResize);

      return () => {
        running = false;
        cancelAnimationFrame(animId);
        container.removeEventListener("mousemove", onMouse);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    };

    let cleanup: (() => void) | undefined;
    init().then(fn => { cleanup = fn; });
    return () => { running = false; cleanup?.(); };
  }, []);

  /* GSAP scroll animations */
  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;
    const run = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(".jeh-hero-eyebrow", { opacity: 0, x: -20, duration: 0.7, ease: "power3.out", delay: 0.2 });
        gsap.from(".jeh-hero-title",   { opacity: 0, y: 40,  duration: 0.9, ease: "power3.out", delay: 0.35 });
        gsap.from(".jeh-hero-body",    { opacity: 0, y: 24,  duration: 0.8, ease: "power3.out", delay: 0.6 });
        gsap.from(".jeh-hero-actions", { opacity: 0, y: 16,  duration: 0.7, ease: "power3.out", delay: 0.8 });
        gsap.from(".jeh-ac-wrap",      { opacity: 0, x: 60,  duration: 1.0, ease: "power3.out", delay: 0.5 });

        gsap.to(".jeh-hero-img-wrap", {
          yPercent: 12, ease: "none",
          scrollTrigger: { trigger: ".jeh-hero", start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".jeh-hero-text-col", {
          opacity: 0, y: -30, ease: "none",
          scrollTrigger: { trigger: ".jeh-hero", start: "45% top", end: "bottom top", scrub: true },
        });

        gsap.from(".jeh-air-stream", {
          opacity: 0, stagger: 0.12, duration: 0.6, ease: "power2.out", delay: 1.2,
        });

        gsap.from(".jeh-intro-left",  { opacity: 0, x: -36, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: ".jeh-intro", start: "top 80%" } });
        gsap.from(".jeh-intro-right", { opacity: 0, x:  36, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: ".jeh-intro", start: "top 80%" } });

        gsap.from(".jeh-series-card", {
          opacity: 0, y: 44, stagger: 0.16, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".jeh-series-grid", start: "top 80%" },
        });

        gsap.from(".jeh-model-row", {
          opacity: 0, x: -14, stagger: 0.025, duration: 0.35, ease: "power2.out",
          scrollTrigger: { trigger: ".jeh-models-block", start: "top 80%" },
        });

        gsap.from(".jeh-feat-item", {
          opacity: 0, x: 20, stagger: 0.06, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: ".jeh-features-wrap", start: "top 80%" },
        });

        gsap.from(".jeh-cta-block", {
          opacity: 0, y: 36, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".jeh-cta-block", start: "top 82%" },
        });

        gsap.utils.toArray<HTMLElement>(".jeh-rule").forEach(el => {
          gsap.from(el, { scaleX: 0, transformOrigin: "left", duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
        });
      });
    };
    run();
    return () => ctx?.revert();
  }, []);

  return (
    <>
      <style>{`
        html, body { overflow-x: hidden; width: 100%; }
        *, *::before, *::after { box-sizing: border-box; }

        .jeh-page {
          background: #fff;
          color: ${NAVY};
          font-family: inherit;
          overflow-x: hidden;
        }

        /* ══ HERO ══ */
        .jeh-hero {
          position: relative;
          background: ${NAVY};
          overflow: hidden;
          min-height: 88vh;
          display: flex;
          align-items: stretch;
        }

        .jeh-hero::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: ${RED};
          z-index: 4;
        }

        .jeh-hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 100%;
        }

        .jeh-hero-text-col {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 64px 80px 72px;
        }

        .jeh-hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: ${BLUE};
          margin-bottom: 24px;
        }
        .jeh-hero-eyebrow::before {
          content: '';
          display: block;
          width: 28px; height: 1.5px;
          background: ${BLUE};
          flex-shrink: 0;
        }

        .jeh-hero-title {
          font-size: clamp(2.2rem, 4vw, 4.8rem);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.04em;
          color: #fff;
          margin-bottom: 24px;
        }
        .jeh-hero-title span {
          color: ${BLUE};
          display: block;
        }

        .jeh-hero-body {
          font-size: 14.5px;
          color: rgba(255,255,255,0.55);
          line-height: 1.8;
          max-width: 420px;
          margin-bottom: 40px;
        }

        .jeh-hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .jeh-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          color: #fff;
          background: ${BLUE};
          padding: 14px 26px;
          border-radius: 2px;
          transition: background 0.18s, transform 0.18s;
        }
        .jeh-btn-primary:hover { background: #005fa3; transform: translateX(2px); }

        .jeh-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          color: rgba(255,255,255,0.55);
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.18);
          padding: 14px 26px;
          border-radius: 2px;
          transition: border-color 0.18s, color 0.18s;
        }
        .jeh-btn-outline:hover { border-color: rgba(255,255,255,0.5); color: #fff; }

        /* ── Fan animation sits directly under hero text ── */
        .jeh-ac-wrap {
          margin-top: 32px;
        }

        .jeh-hero-img-col {
          position: relative;
          overflow: hidden;
          min-height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${NAVY};
        }
        .jeh-hero-img-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .jeh-hero-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: contain !important;
          object-position: center;
          padding: 24px;
        }
        .jeh-hero-img-col::before {
          content: '';
          position: absolute;
          top: 0; bottom: 0; left: 0;
          width: 120px;
          background: linear-gradient(90deg, ${NAVY} 0%, transparent 100%);
          z-index: 2;
        }
        .jeh-hero-img-col::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 80px;
          background: linear-gradient(0deg, ${NAVY} 0%, transparent 100%);
          z-index: 2;
        }

        @media (max-width: 1020px) {
          .jeh-hero-text-col { padding: 60px 36px 60px 44px; }
        }
        @media (max-width: 820px) {
          .jeh-hero-inner { grid-template-columns: 1fr; }
          .jeh-hero-img-col { min-height: 340px; order: -1; }
          .jeh-hero-img-col::before { display: none; }
          .jeh-hero-img-col::after { height: 60px; }
          .jeh-hero-text-col { padding: 48px 28px 52px 32px; }
          .jeh-ac-wrap {
            display: block;
            margin-top: 28px;
          }
          .jeh-ac-wrap svg {
            width: 100%;
            max-width: 340px;
            height: auto;
          }
        }
        @media (max-width: 520px) {
          .jeh-hero-img-col { min-height: 240px; }
          .jeh-hero-text-col { padding: 36px 20px 44px 24px; }
          .jeh-hero-title { font-size: clamp(1.9rem, 8vw, 2.8rem); }
          .jeh-ac-wrap svg { max-width: 280px; }
        }

        /* ══ AC UNIT SVG ANIMATION ══ */
        .jeh-stream-1 { animation: airFlow 2.8s ease-in-out infinite 0.0s; }
        .jeh-stream-2 { animation: airFlow 2.8s ease-in-out infinite 0.4s; }
        .jeh-stream-3 { animation: airFlow 2.8s ease-in-out infinite 0.8s; }
        .jeh-stream-4 { animation: airFlow 2.8s ease-in-out infinite 1.2s; }
        .jeh-stream-5 { animation: airFlow 2.8s ease-in-out infinite 1.6s; }

        @keyframes airFlow {
          0%   { opacity: 0;    transform: translateX(0px); }
          20%  { opacity: 0.7; }
          80%  { opacity: 0.35; }
          100% { opacity: 0;    transform: translateX(38px); }
        }

        .jeh-fan-blade  { animation: fanSpin 1.6s linear infinite; transform-origin: 50% 50%; transform-box: fill-box; }
        .jeh-fan-blade2 { animation: fanSpin 2.1s linear infinite; transform-origin: 50% 50%; transform-box: fill-box; }

        @keyframes fanSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .jeh-temp-blink { animation: tempPulse 3s ease-in-out infinite; }
        @keyframes tempPulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.5; }
        }

        /* ══ BODY ══ */
        .jeh-inner {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 40px 100px;
        }
        @media (max-width: 820px) { .jeh-inner { padding: 0 24px 80px; } }
        @media (max-width: 500px) { .jeh-inner { padding: 0 16px 60px; } }

        /* ══ SECTION HEADER ══ */
        .jeh-section-hd {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 56px 0 0;
          border-bottom: 1px solid ${BORDER};
          margin-bottom: 48px;
        }
        .jeh-section-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: ${MUTED};
        }
        .jeh-section-accent {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: ${BLUE};
        }

        /* ══ INTRO SPLIT ══ */
        .jeh-intro {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }
        .jeh-intro-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: ${BLUE};
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .jeh-intro-eyebrow::before {
          content: '';
          display: block;
          width: 22px; height: 1.5px;
          background: ${BLUE};
        }
        .jeh-intro-title {
          font-size: clamp(1.5rem, 2.5vw, 2.2rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.1;
          color: ${NAVY};
          margin-bottom: 18px;
        }
        .jeh-intro-body {
          font-size: 14px;
          color: #4B5563;
          line-height: 1.82;
        }
        .jeh-intro-body + .jeh-intro-body { margin-top: 14px; }

        .jeh-intro-img {
          border-radius: 3px;
          overflow: hidden;
          position: relative;
          aspect-ratio: 4 / 3;
          border: 1px solid ${BORDER};
        }
        .jeh-intro-img-label {
          position: absolute;
          bottom: 14px;
          left: 16px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          background: rgba(11,37,64,0.65);
          padding: 4px 10px;
          border-radius: 2px;
          backdrop-filter: blur(4px);
        }
        .jeh-rule {
          height: 1px;
          background: ${BLUE};
          margin: 24px 0 0;
          width: 40px;
        }

        @media (max-width: 820px) {
          .jeh-intro { grid-template-columns: 1fr; gap: 36px; }
        }

        /* ══ SERIES CARDS ══ */
        .jeh-series-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          border: 1px solid ${BORDER};
          border-radius: 3px;
          overflow: hidden;
          background: ${BORDER};
        }
        .jeh-series-card {
          background: #fff;
          padding: 44px 40px;
          position: relative;
        }
        .jeh-series-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
        }
        .jeh-series-card--hybrid::before { background: ${BLUE}; }
        .jeh-series-card--scroll::before { background: linear-gradient(90deg, ${BLUE} 0%, ${NAVY} 100%); }

        .jeh-card-eyebrow {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: ${BLUE};
          margin-bottom: 14px;
        }
        .jeh-card-name {
          font-size: 1.65rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: ${NAVY};
          margin-bottom: 6px;
          line-height: 1.05;
        }
        .jeh-card-sub {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${MUTED};
          margin-bottom: 22px;
        }
        .jeh-ref-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }
        .jeh-ref-pill {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          padding: 4px 11px;
          border-radius: 20px;
          border: 1px solid;
        }
        .jeh-pill-a1  { color: ${BLUE}; border-color: rgba(0,114,187,0.35); background: rgba(0,114,187,0.06); }
        .jeh-pill-a2l { color: #b08800; border-color: rgba(176,136,0,0.3); background: rgba(176,136,0,0.06); }

        .jeh-card-desc {
          font-size: 13.5px;
          color: #4B5563;
          line-height: 1.78;
          margin-bottom: 28px;
        }
        .jeh-card-stats {
          display: flex;
          gap: 28px;
          padding-top: 24px;
          border-top: 1px solid ${BORDER};
        }
        .jeh-card-stat-num {
          font-size: 1.2rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: ${BLUE};
          line-height: 1;
          margin-bottom: 4px;
        }
        .jeh-card-stat-lbl {
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${MUTED};
        }

        @media (max-width: 760px) {
          .jeh-series-grid { grid-template-columns: 1fr; }
          .jeh-series-card { padding: 32px 24px; }
        }

        /* ══ MODELS BLOCK ══ */
        .jeh-models-block {
          margin-top: 0;
        }
        .jeh-models-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          border: 1px solid ${BORDER};
          border-radius: 3px;
          overflow: hidden;
          background: ${BORDER};
        }
        .jeh-model-col {
          background: #fff;
          padding: 32px 28px;
        }
        .jeh-model-col-head {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: ${BLUE};
          padding-bottom: 14px;
          border-bottom: 1px solid ${BORDER};
          margin-bottom: 6px;
        }
        .jeh-model-row {
          font-size: 12px;
          font-family: 'Courier New', Courier, monospace;
          font-weight: 700;
          color: ${NAVY};
          padding: 7px 0;
          border-bottom: 1px solid rgba(11,37,64,0.07);
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.15s;
        }
        .jeh-model-row:last-child { border-bottom: none; }
        .jeh-model-row:hover { color: ${BLUE}; }
        .jeh-model-row::before {
          content: '';
          display: block;
          width: 3px; height: 3px;
          border-radius: 50%;
          background: ${BLUE};
          flex-shrink: 0;
          opacity: 0.5;
        }
        .jeh-model-row:hover::before { opacity: 1; }

        @media (max-width: 900px) {
          .jeh-models-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 580px) {
          .jeh-models-grid { grid-template-columns: 1fr; }
          .jeh-model-col { padding: 24px 18px; }
        }

        /* ══ FEATURES ══ */
        .jeh-features-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          border: 1px solid ${BORDER};
          border-radius: 3px;
          overflow: hidden;
          background: ${BORDER};
          margin-top: 0;
        }
        .jeh-features-left {
          background: ${NAVY};
          padding: 52px 44px;
          position: relative;
          overflow: hidden;
        }
        .jeh-features-left::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: ${BLUE};
        }
        .jeh-features-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: ${BLUE};
          margin-bottom: 8px;
        }
        .jeh-features-title {
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.1;
          color: #fff;
          margin-bottom: 28px;
        }
        .jeh-feat-list {
          list-style: none;
          padding: 0; margin: 0;
        }
        .jeh-feat-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: rgba(255,255,255,0.65);
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: color 0.15s;
        }
        .jeh-feat-item:last-child { border-bottom: none; }
        .jeh-feat-item:hover { color: #fff; }
        .jeh-feat-check {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: rgba(0,114,187,0.2);
          border: 1px solid rgba(0,114,187,0.5);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-size: 9px;
          color: ${BLUE};
        }
        .jeh-features-right {
          background: #fff;
          padding: 52px 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .jeh-feat-count-num {
          font-size: 7rem;
          font-weight: 900;
          letter-spacing: -0.07em;
          color: ${BLUE};
          line-height: 1;
          opacity: 0.12;
          position: absolute;
          top: 24px; right: 24px;
          pointer-events: none;
        }
        .jeh-feat-aside {
          position: relative;
        }
        .jeh-feat-aside-head {
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: ${NAVY};
          margin-bottom: 14px;
          line-height: 1.2;
        }
        .jeh-feat-aside-body {
          font-size: 13.5px;
          color: ${MUTED};
          line-height: 1.8;
          margin-bottom: 20px;
        }
        .jeh-feat-aside-rule {
          width: 28px; height: 1.5px;
          background: ${BLUE};
          margin-bottom: 14px;
        }
        @media (max-width: 820px) {
          .jeh-features-wrap { grid-template-columns: 1fr; }
          .jeh-features-left, .jeh-features-right { padding: 36px 24px; }
        }

        /* ══ CTA BLOCK ══ */
        .jeh-cta-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border: 1px solid ${BORDER};
          border-radius: 3px;
          overflow: hidden;
          min-height: 320px;
        }
        .jeh-cta-left {
          background: #fff;
          padding: 52px 44px;
          border-right: 1px solid ${BORDER};
        }
        .jeh-cta-left-rule { width: 28px; height: 1.5px; background: ${RED}; margin-bottom: 20px; }
        .jeh-cta-left-title {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          color: ${NAVY};
          margin-bottom: 16px;
          line-height: 1.2;
        }
        .jeh-cta-left-body {
          font-size: 13.5px;
          color: ${MUTED};
          line-height: 1.8;
        }
        .jeh-cta-left-body strong { color: ${NAVY}; font-weight: 600; }

        .jeh-cta-right {
          background: ${NAVY};
          padding: 52px 44px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .jeh-cta-right::before {
          content: '';
          position: absolute;
          width: 300px; height: 300px;
          border-radius: 50%;
          border: 1px solid rgba(0,114,187,0.15);
          top: -80px; right: -80px;
          pointer-events: none;
        }
        .jeh-cta-right-rule { width: 28px; height: 1.5px; background: ${BLUE}; margin-bottom: 20px; }
        .jeh-cta-right-title {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          color: #fff;
          margin-bottom: 16px;
          line-height: 1.2;
        }
        .jeh-cta-right-body {
          font-size: 13.5px;
          color: rgba(255,255,255,0.5);
          line-height: 1.8;
          margin-bottom: 28px;
        }
        .jeh-cta-stats {
          display: flex;
          gap: 28px;
          margin-top: 32px;
          padding-top: 28px;
          border-top: 1px solid rgba(255,255,255,0.08);
          flex-wrap: wrap;
        }
        .jeh-cta-stat-num {
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #fff;
          line-height: 1;
          margin-bottom: 4px;
        }
        .jeh-cta-stat-lbl {
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }

        @media (max-width: 820px) {
          .jeh-cta-block { grid-template-columns: 1fr; min-height: unset; }
          .jeh-cta-left { border-right: none; border-bottom: 1px solid ${BORDER}; padding: 36px 24px; }
          .jeh-cta-right { padding: 36px 24px; }
        }
        @media (max-width: 500px) {
          .jeh-cta-left, .jeh-cta-right { padding: 28px 18px; }
        }

        /* ══ 3D SECTION ══ */
        .jeh-3d-section {
          margin-top: 0;
          border: 1px solid rgba(11,37,64,0.1);
          border-radius: 3px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 420px;
          background: #0B2540;
        }
        .jeh-3d-left {
          padding: 52px 44px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .jeh-3d-left::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: #0072BB;
        }
        .jeh-3d-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #0072BB;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .jeh-3d-eyebrow::before {
          content: '';
          display: block;
          width: 22px; height: 1.5px;
          background: #0072BB;
        }
        .jeh-3d-title {
          font-size: clamp(1.5rem, 2.4vw, 2.2rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.08;
          color: #fff;
          margin-bottom: 18px;
        }
        .jeh-3d-body {
          font-size: 13.5px;
          color: rgba(255,255,255,0.5);
          line-height: 1.8;
          max-width: 380px;
        }
        .jeh-3d-specs {
          display: flex;
          gap: 28px;
          margin-top: 32px;
          flex-wrap: wrap;
        }
        .jeh-3d-spec-num {
          font-size: 1.2rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #0072BB;
          line-height: 1;
          margin-bottom: 4px;
        }
        .jeh-3d-spec-lbl {
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .jeh-3d-canvas-wrap {
          position: relative;
          min-height: 420px;
        }
        .jeh-3d-canvas {
          width: 100%;
          height: 100%;
          min-height: 420px;
          cursor: grab;
          display: block;
        }
        .jeh-3d-canvas:active { cursor: grabbing; }
        .jeh-3d-hint {
          position: absolute;
          bottom: 16px;
          right: 20px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          pointer-events: none;
        }
        @media (max-width: 820px) {
          .jeh-3d-section { grid-template-columns: 1fr; }
          .jeh-3d-left { padding: 36px 24px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); }
          .jeh-3d-canvas { min-height: 300px; }
          .jeh-3d-canvas-wrap { min-height: 300px; }
        }

        /* ══ BRAND LOGO BAR ══ */
        .jeh-logo-bar {
          margin-top: 0;
          border: 1px solid rgba(11,37,64,0.1);
          border-radius: 3px;
          padding: 48px 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
          background: #fafafa;
        }
        .jeh-logo-bar-left {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .jeh-logo-bar-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #6B7280;
        }
        .jeh-logo-bar-tagline {
          font-size: 13.5px;
          color: #0B2540;
          font-weight: 500;
          line-height: 1.6;
          max-width: 440px;
        }
        .jeh-logo-bar-tagline strong { font-weight: 700; }
        .jeh-logo-img-wrap {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        @media (max-width: 680px) {
          .jeh-logo-bar { padding: 36px 24px; flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="jeh-page">

        {/* ══════ HERO ══════ */}
        <section className="jeh-hero">
          <div className="jeh-hero-inner">

            {/* LEFT — copy + AC unit */}
            <div className="jeh-hero-text-col">
              <p className="jeh-hero-eyebrow">J &amp; E Hall — Now Supplied by ILK</p>

              <h1 className="jeh-hero-title">
                Fusion Series
                <span>Condensing Units</span>
              </h1>

              <p className="jeh-hero-body">
                ILK Technology now supplies the full J&nbsp;&amp;&nbsp;E Hall
                Fusion range. From compact hybrid units to high-capacity scroll
                systems — all supporting A1 and A2L refrigerants, available
                to order directly through us.
              </p>

              <div className="jeh-hero-actions">
                <Link className="jeh-btn-primary" href="/contact">
                  Request a Quote →
                </Link>
                <a className="jeh-btn-outline" href="#products">
                  View Products
                </a>
              </div>

              {/* ── AIR CONDITIONING SVG ANIMATION — directly under buttons ── */}
              <div className="jeh-ac-wrap">
                <svg
                  width="340"
                  height="160"
                  viewBox="0 0 340 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {/* ── UNIT BODY ── */}
                  <rect x="2" y="30" width="188" height="108" rx="6" fill="#0D1F33" stroke="rgba(0,114,187,0.5)" strokeWidth="1.5"/>
                  <rect x="10" y="38" width="172" height="92" rx="4" fill="#091828"/>
                  <rect x="2" y="30" width="188" height="6" rx="3" fill="rgba(0,114,187,0.25)"/>

                  {/* ── LEFT FAN HOUSING ── */}
                  <circle cx="54" cy="84" r="34" fill="#0B2030" stroke="rgba(0,114,187,0.3)" strokeWidth="1"/>
                  <circle cx="54" cy="84" r="28" fill="none" stroke="rgba(0,114,187,0.15)" strokeWidth="1"/>
                  <g className="jeh-fan-blade">
                    <ellipse cx="54" cy="62" rx="6" ry="14" fill="rgba(0,114,187,0.55)" transform="rotate(-15 54 84)"/>
                    <ellipse cx="54" cy="62" rx="6" ry="14" fill="rgba(0,114,187,0.55)" transform="rotate(45 54 84)"/>
                    <ellipse cx="54" cy="62" rx="6" ry="14" fill="rgba(0,114,187,0.55)" transform="rotate(105 54 84)"/>
                    <ellipse cx="54" cy="62" rx="6" ry="14" fill="rgba(0,114,187,0.55)" transform="rotate(165 54 84)"/>
                    <ellipse cx="54" cy="62" rx="6" ry="14" fill="rgba(0,114,187,0.55)" transform="rotate(225 54 84)"/>
                    <ellipse cx="54" cy="62" rx="6" ry="14" fill="rgba(0,114,187,0.55)" transform="rotate(285 54 84)"/>
                  </g>
                  <circle cx="54" cy="84" r="6" fill="#0B2540" stroke="rgba(0,114,187,0.5)" strokeWidth="1"/>

                  {/* ── RIGHT FAN HOUSING ── */}
                  <circle cx="138" cy="84" r="34" fill="#0B2030" stroke="rgba(0,114,187,0.3)" strokeWidth="1"/>
                  <circle cx="138" cy="84" r="28" fill="none" stroke="rgba(0,114,187,0.15)" strokeWidth="1"/>
                  <g className="jeh-fan-blade2">
                    <ellipse cx="138" cy="62" rx="6" ry="14" fill="rgba(0,114,187,0.5)" transform="rotate(0 138 84)"/>
                    <ellipse cx="138" cy="62" rx="6" ry="14" fill="rgba(0,114,187,0.5)" transform="rotate(60 138 84)"/>
                    <ellipse cx="138" cy="62" rx="6" ry="14" fill="rgba(0,114,187,0.5)" transform="rotate(120 138 84)"/>
                    <ellipse cx="138" cy="62" rx="6" ry="14" fill="rgba(0,114,187,0.5)" transform="rotate(180 138 84)"/>
                    <ellipse cx="138" cy="62" rx="6" ry="14" fill="rgba(0,114,187,0.5)" transform="rotate(240 138 84)"/>
                    <ellipse cx="138" cy="62" rx="6" ry="14" fill="rgba(0,114,187,0.5)" transform="rotate(300 138 84)"/>
                  </g>
                  <circle cx="138" cy="84" r="6" fill="#0B2540" stroke="rgba(0,114,187,0.5)" strokeWidth="1"/>

                  {/* ── CONTROL PANEL (right side of casing) ── */}
                  <circle cx="175" cy="46" r="3" fill="#0072BB" className="jeh-temp-blink"/>
                  <rect x="160" y="52" width="22" height="60" rx="2" fill="#0B2030" stroke="rgba(0,114,187,0.2)" strokeWidth="1"/>
                  <rect x="24" y="136" width="8" height="14" rx="2" fill="#0D1F33" stroke="rgba(0,114,187,0.3)" strokeWidth="1"/>
                  <rect x="40" y="136" width="8" height="14" rx="2" fill="#0D1F33" stroke="rgba(0,114,187,0.3)" strokeWidth="1"/>
                  <rect x="144" y="136" width="8" height="14" rx="2" fill="#0D1F33" stroke="rgba(0,114,187,0.3)" strokeWidth="1"/>
                  <rect x="160" y="136" width="8" height="14" rx="2" fill="#0D1F33" stroke="rgba(0,114,187,0.3)" strokeWidth="1"/>

                  {/* ── REFRIGERANT LABEL ── */}
                  <text x="163" y="68" fontSize="5" fill="rgba(0,114,187,0.7)" fontWeight="600" fontFamily="monospace" transform="rotate(90 163 68)">R448/9A</text>

                  {/* ── AIR FLOW STREAMS ── */}
                  <g>
                    <path className="jeh-stream-1 jeh-air-stream" d="M192 72 C210 72 218 74 236 72 C252 70 260 72 280 72" stroke="rgba(0,114,187,0.55)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <path className="jeh-stream-2 jeh-air-stream" d="M192 62 C212 60 220 58 240 57 C258 56 266 58 290 56" stroke="rgba(0,114,187,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <path className="jeh-stream-3 jeh-air-stream" d="M192 52 C214 48 224 44 246 42 C266 40 276 43 308 40" stroke="rgba(0,114,187,0.28)" strokeWidth="1" fill="none" strokeLinecap="round"/>
                    <path className="jeh-stream-4 jeh-air-stream" d="M192 82 C210 84 218 86 238 87 C256 88 264 86 286 88" stroke="rgba(0,114,187,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <path className="jeh-stream-5 jeh-air-stream" d="M192 95 C212 99 222 103 244 105 C264 107 274 104 310 107" stroke="rgba(0,114,187,0.25)" strokeWidth="1" fill="none" strokeLinecap="round"/>
                  </g>

                  {/* ── COLD TEMP LABEL ── */}
                  <text x="248" y="70" fontSize="10" fill="rgba(0,114,187,0.5)" fontWeight="700" fontFamily="monospace" className="jeh-temp-blink">–18°C</text>

                  {/* ── MOUNTING FEET ── */}
                  <rect x="14" y="148" width="20" height="8" rx="2" fill="#091828" stroke="rgba(0,114,187,0.2)" strokeWidth="1"/>
                  <rect x="158" y="148" width="20" height="8" rx="2" fill="#091828" stroke="rgba(0,114,187,0.2)" strokeWidth="1"/>

                  {/* ── Label under unit ── */}
                  <text x="96" y="158" fontSize="7" fill="rgba(0,114,187,0.35)" fontWeight="600" fontFamily="monospace" textAnchor="middle" letterSpacing="3">J &amp; E HALL · FUSION</text>
                </svg>
              </div>
            </div>

            {/* RIGHT — product image, full/contain */}
            <div className="jeh-hero-img-col">
              <div className="jeh-hero-img-wrap">
                <Image
                  src="/image1.png"
                  alt="J & E Hall Fusion condensing unit"
                  fill
                  priority
                  style={{ objectFit: "contain", objectPosition: "center", padding: "24px" }}
                />
              </div>
            </div>

          </div>
        </section>

        {/* ══════ BODY ══════ */}
        <div className="jeh-inner">

          {/* ── INTRO ── */}
          <div className="jeh-section-hd">
            <span className="jeh-section-label">J &amp; E Hall · ILK Technology</span>
            <span className="jeh-section-accent">UK Supplier</span>
          </div>

          <div className="jeh-intro">
            <div className="jeh-intro-left">
              <p className="jeh-intro-eyebrow">Why J &amp; E Hall</p>
              <h2 className="jeh-intro-title">
                Over 130 Years of British Refrigeration Engineering
              </h2>
              <p className="jeh-intro-body">
                J&nbsp;&amp;&nbsp;E Hall has been at the heart of commercial
                refrigeration since 1785. Their Fusion condensing units are
                the product of that heritage — precision-engineered,
                tested to the highest standards, and designed to perform
                in the most demanding environments.
              </p>
              <p className="jeh-intro-body">
                As a UK supplier of the Fusion range, ILK Technology gives you
                direct access to the right units, with technical
                support and competitive lead times.
              </p>
              <div className="jeh-rule" />
            </div>
            <div className="jeh-intro-right">
              <div className="jeh-intro-img">
                <Image
                  src="/image2.png"
                  alt="J & E Hall Fusion installation"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <span className="jeh-intro-img-label">Fusion Series — Field Installation</span>
              </div>
            </div>
          </div>

          {/* ── PRODUCTS ── */}
          <div id="products">
            <div className="jeh-section-hd" style={{ marginTop: 0 }}>
              <span className="jeh-section-label">Product Range</span>
              <span className="jeh-section-accent">Two Series</span>
            </div>

            <div className="jeh-series-grid">

              {/* HYBRID */}
              <div className="jeh-series-card jeh-series-card--hybrid">
                <p className="jeh-card-eyebrow">Future-Ready Platform</p>
                <h3 className="jeh-card-name">Fusion Hybrid</h3>
                <p className="jeh-card-sub">Small &amp; Medium · Replacement for Reciprocating Models</p>
                <div className="jeh-ref-pills">
                  <span className="jeh-ref-pill jeh-pill-a1">R448/9A · A1</span>
                  <span className="jeh-ref-pill jeh-pill-a2l">A2L Compatible</span>
                </div>
                <p className="jeh-card-desc">
                  A direct replacement for smaller and medium Fusion
                  reciprocating models. Supports both A1 and A2L
                  refrigerants, keeping your installations compliant
                  as regulations evolve — without requiring a full
                  system redesign.
                </p>
                <div className="jeh-card-stats">
                  <div>
                    <div className="jeh-card-stat-num">10</div>
                    <div className="jeh-card-stat-lbl">Model Codes</div>
                  </div>
                  <div>
                    <div className="jeh-card-stat-num">H1/H2</div>
                    <div className="jeh-card-stat-lbl">Head Sizes</div>
                  </div>
                  <div>
                    <div className="jeh-card-stat-num">M &amp; L</div>
                    <div className="jeh-card-stat-lbl">Temp Ranges</div>
                  </div>
                </div>
              </div>

              {/* SCROLL */}
              <div className="jeh-series-card jeh-series-card--scroll">
                <p className="jeh-card-eyebrow">High Capacity</p>
                <h3 className="jeh-card-name">Fusion Scroll</h3>
                <p className="jeh-card-sub">Medium to Large · Copeland Scroll Compressor</p>
                <div className="jeh-ref-pills">
                  <span className="jeh-ref-pill jeh-pill-a1">R448/9A · A1</span>
                </div>
                <p className="jeh-card-desc">
                  Copeland scroll technology across a wide capacity
                  range, from 200 to 1600 nominal capacity. Micro-channel
                  condenser coils, IP55 panel protection, fan speed
                  control, and EVI options for the most demanding
                  low-temperature applications.
                </p>
                <div className="jeh-card-stats">
                  <div>
                    <div className="jeh-card-stat-num">22</div>
                    <div className="jeh-card-stat-lbl">Model Codes</div>
                  </div>
                  <div>
                    <div className="jeh-card-stat-num">B2–B6</div>
                    <div className="jeh-card-stat-lbl">Frame Sizes</div>
                  </div>
                  <div>
                    <div className="jeh-card-stat-num">EVI</div>
                    <div className="jeh-card-stat-lbl">Low Temp Option</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── MODEL CODES ── */}
          <div className="jeh-models-block">
            <div className="jeh-section-hd" style={{ marginTop: 0 }}>
              <span className="jeh-section-label">Model Codes</span>
              <span className="jeh-section-accent">32 Variants</span>
            </div>

            <div className="jeh-models-grid">
              {/* col 1 — Hybrid */}
              <div className="jeh-model-col">
                <div className="jeh-model-col-head">Fusion Hybrid</div>
                {FUSION_HYBRID.map((m) => (
                  <div className="jeh-model-row" key={m}>{m}</div>
                ))}
              </div>

              {/* col 2 — Scroll M */}
              <div className="jeh-model-col">
                <div className="jeh-model-col-head">Fusion Scroll · Medium Temp</div>
                {FUSION_SCROLL_M.map((m) => (
                  <div className="jeh-model-row" key={m}>{m}</div>
                ))}
              </div>

              {/* col 3 — Scroll L */}
              <div className="jeh-model-col">
                <div className="jeh-model-col-head">Fusion Scroll · Low Temp (EVI)</div>
                {FUSION_SCROLL_L.map((m) => (
                  <div className="jeh-model-row" key={m}>{m}</div>
                ))}
              </div>
            </div>
          </div>

          {/* ── SCROLL FEATURES ── */}
          <div className="jeh-features-wrap" style={{ marginTop: 0 }}>
            <div className="jeh-section-hd" style={{ display: "none" }} />
          </div>

          <div style={{ marginTop: 0 }}>
            <div className="jeh-section-hd">
              <span className="jeh-section-label">Fusion Scroll — Standard Specification</span>
              <span className="jeh-section-accent">Every unit, as standard</span>
            </div>

            <div className="jeh-features-wrap">
              <div className="jeh-features-left">
                <p className="jeh-features-eyebrow">Scroll Series</p>
                <h3 className="jeh-features-title">Standard Features</h3>
                <ul className="jeh-feat-list">
                  {SCROLL_FEATURES.map((f) => (
                    <li className="jeh-feat-item" key={f}>
                      <span className="jeh-feat-check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="jeh-features-right" style={{ position: "relative" }}>
                <div className="jeh-feat-aside">
                  <div className="jeh-feat-aside-rule" />
                  <h3 className="jeh-feat-aside-head">
                    Fully specified.<br />Ready to install.
                  </h3>
                  <p className="jeh-feat-aside-body">
                    Every Fusion Scroll ships complete. No optional
                    extras to configure before the unit is ready to
                    commission — the specification is built in from
                    the factory.
                  </p>
                  <Link className="jeh-btn-primary" href="/contact" style={{ fontSize: "10px", padding: "13px 22px" }}>
                    Enquire Now →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="jeh-section-hd">
            <span className="jeh-section-label">ILK Technology · UK Supplier</span>
          </div>

          <div className="jeh-cta-block">
            <div className="jeh-cta-left">
              <div className="jeh-cta-left-rule" />
              <h3 className="jeh-cta-left-title">
                Direct Access to<br />the Full Fusion Range
              </h3>
              <p className="jeh-cta-left-body">
                ILK Technology <strong>supplies the full Fusion range</strong> —
                giving engineers and retailers direct access
                to the right units, the right support, and competitive lead times.
              </p>
              <p className="jeh-cta-left-body" style={{ marginTop: 12 }}>
                Whether you need a single replacement unit or a full system
                specification, our team handles sourcing and logistics so you
                can focus on <strong>the installation</strong>.
              </p>
            </div>
            <div className="jeh-cta-right">
              <div className="jeh-cta-right-rule" />
              <h3 className="jeh-cta-right-title">
                Ready to Specify<br />J &amp; E Hall?
              </h3>
              <p className="jeh-cta-right-body">
                Send us your requirements — model codes, site conditions,
                or a floor plan — and we&apos;ll come back with pricing and
                technical guidance.
              </p>
              <Link className="jeh-btn-primary" href="/contact">
                Make an Enquiry →
              </Link>
              <div className="jeh-cta-stats">
                <div>
                  <div className="jeh-cta-stat-num">25+</div>
                  <div className="jeh-cta-stat-lbl">Years Experience</div>
                </div>
                <div>
                  <div className="jeh-cta-stat-num">32</div>
                  <div className="jeh-cta-stat-lbl">Fusion Models</div>
                </div>
                <div>
                  <div className="jeh-cta-stat-num">F-Gas</div>
                  <div className="jeh-cta-stat-lbl">Certificate Required</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── BRAND LOGO BAR ── */}
          <div className="jeh-logo-bar">
            <div className="jeh-logo-bar-left">
              <span className="jeh-logo-bar-label">UK Supplier</span>
              <p className="jeh-logo-bar-tagline">
                <strong>ILK Technology</strong> — supplying the full J&nbsp;&amp;&nbsp;E Hall
                Fusion range, backed by over 130 years of British
                refrigeration engineering.
              </p>
            </div>
            <div className="jeh-logo-img-wrap">
              <Image
                src="/logo1.webp"
                alt="J & E Hall logo"
                width={180}
                height={72}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}