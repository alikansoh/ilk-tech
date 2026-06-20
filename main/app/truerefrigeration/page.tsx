"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type CSSProperties,
  type FormEvent,
} from "react";

/* ─── BRAND TOKENS ─── */
const NAVY = "#0B2540";
const RED = "#C8102E";
const SILVER = "#8A9BB0";
const MUTED = "#6B7280";
const BORDER = "rgba(11,37,64,0.10)";

/* ─── STAINLESS STEEL HEX ─── */
const STAINLESS_HEX = "#B8BEC7";

/* ─── TYPES ─── */
interface Product {
  code: string;
  name: string;
  img: string;
  category: string;
  desc: string;
}

type EnquiryTarget = Pick<Product, "code" | "name">;

interface RalColour {
  name: string;
  hex: string;
  border: string;
}

interface InquiryFormState {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  product: string;
}

interface InquiryModalProps {
  product: EnquiryTarget | null;
  onClose: () => void;
}

interface CabinetMaterials {
  cabinet?: { color: { set: (value: string) => void } };
  frame?: { color: { set: (value: string) => void } };
}

/* ─── PRODUCT DATA ─── */
const PRODUCTS: Product[] = [
  {
    code: "TUC-48-HC",
    name: "Undercounter Refrigerator",
    img: "/prod-tuc48.png",
    category: "Undercounter",
    desc: "48″ two-door undercounter refrigerator with hydrocarbon refrigerant. Designed for heavy commercial use with stainless steel exterior.",
  },
  {
    code: "TUC-27F-HC",
    name: "Undercounter Freezer",
    img: "/prod-tuc27.png",
    category: "Undercounter",
    desc: "27″ single-door undercounter freezer. Compact footprint, full commercial specification with digital temperature display.",
  },
  {
    code: "TPP-AT2-93-HC",
    name: "Pizza Prep Table",
    img: "/TPP-AT2-93-HC.png",
    category: "Prep Tables",
    desc: "93″ three-door pizza prep table. Dual mega-top pans with hinged lids, engineered for high-volume pizza operations.",
  },
  {
    code: "TSSU-60-24M-B-ST-FGLID-HC",
    name: "Sandwich/Salad Mega Top",
    img: "/TSSU-60-24M-B-ST-FGLID-HC.png",
    category: "Prep Tables",
    desc: "60″ two-door mega top with full glass lid. Open food presentation with refrigerated storage below, ideal for salad bars.",
  },
  {
    code: "TSSU-72-30M-B-ST-HC",
    name: "Sandwich/Salad Unit",
    img: "/TSSU-72-30M-B-ST-HC.png",
    category: "Prep Tables",
    desc: "72″ three-door sandwich and salad unit. High-capacity prep table with 30 pan positions for demanding service environments.",
  },
  {
    code: "TGN-2F-2S",
    name: "Upright Freezer",
    img: "/TGN-2F-2S.png",
    category: "Upright",
    desc: "49″ two-section upright freezer. Low-profile top mount compressor, stainless front and sides, adjustable shelving.",
  },
  {
    code: "GDM-35-HC~FGD01",
    name: "Glass Door Merchandiser",
    img: "/GDM-35-HC~FGD01.png",
    category: "Upright",
    desc: "35 cu. ft. glass door merchandiser with LED lighting. Designed for high-visibility retail display with energy-efficient hydrocarbon refrigerant.",
  },
  {
    code: "T-23-HC",
    name: "Upright Refrigerator",
    img: "/T-23-HC.png",
    category: "Upright",
    desc: "23 cu. ft. single-door Upright refrigerator. The industry standard for commercial kitchen refrigeration — durable, reliable, and precise.",
  },
];

const SECTORS: string[] = [
  "Hospitality",
  "Restaurant",
  "Café",
  "Bars",
  "Fast Foods",
  "Catering",
];

const RAL_COLOURS: RalColour[] = [
  { name: "Stainless Steel", hex: STAINLESS_HEX, border: "#8A9BB0" },
  { name: "Green",           hex: "#4E7B4B",      border: "#3A5E38" },
  { name: "Blue",            hex: "#1F4E8C",      border: "#163870" },
  { name: "Pink",            hex: "#E8829A",      border: "#D0607C" },
  { name: "Red",             hex: "#C8102E",      border: "#A00E26" },
  { name: "Orange",          hex: "#E8650A",      border: "#C05206" },
  { name: "Silver",          hex: "#D8DCE0",      border: "#B0B7C0" },
  { name: "Black",           hex: "#1A1A1A",      border: "#0A0A0A" },
];

/* ─── COLOUR HELPERS ─── */
function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
        break;
      case gn:
        h = ((bn - rn) / d + 2) / 6;
        break;
      case bn:
        h = ((rn - gn) / d + 4) / 6;
        break;
    }
  }
  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const hue2rgb = (p: number, q: number, t: number): number => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ];
}

function recolourCanvas(
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  targetHex: string
): void {
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const [tr, tg, tb] = hexToRgb(targetHex);
  const [th, ts, tl] = rgbToHsl(tr, tg, tb);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const [h, s, l] = rgbToHsl(r, g, b);

    const inOrangeHue = (h >= 0.0 && h <= 0.20) || h >= 0.92;
    const isCabinetPixel = inOrangeHue && s > 0.20 && l > 0.06 && l < 0.96;

    if (isCabinetPixel) {
      const newS = ts < 0.08 ? ts : Math.min(ts * 1.1, 1);
      const lightnessFactor = tl > 0 ? tl / 0.45 : 0;
      const newL = Math.max(0.04, Math.min(0.96, l * (lightnessFactor + 0.15)));
      const [nr, ng, nb] = hslToRgb(th, newS, newL);
      data[i] = nr;
      data[i + 1] = ng;
      data[i + 2] = nb;
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

/* ─── INQUIRY FORM MODAL ─── */
function InquiryModal({ product, onClose }: InquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<InquiryFormState>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    product: product?.code ?? "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!product) return null;

  return (
    <div className="tr-modal-overlay" onClick={onClose}>
      <div className="tr-modal" onClick={(e) => e.stopPropagation()}>
        <button className="tr-modal-close" onClick={onClose}>✕</button>
        {submitted ? (
          <div className="tr-modal-success">
            <div className="tr-modal-success-icon">✓</div>
            <h3>Enquiry Received</h3>
            <p>
              We&apos;ll be in touch within one business day with pricing and
              availability for <strong>{product.code}</strong>.
            </p>
            <button className="tr-btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="tr-modal-hd">
              <span className="tr-modal-eyebrow">Product Enquiry</span>
              <h3 className="tr-modal-title">{product.name}</h3>
              <code className="tr-modal-code">{product.code}</code>
            </div>
            <form onSubmit={handleSubmit} className="tr-modal-form">
              <div className="tr-form-row">
                <div className="tr-form-group">
                  <label>Full Name *</label>
                  <input
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div className="tr-form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="tr-form-row">
                <div className="tr-form-group">
                  <label>Company</label>
                  <input
                    placeholder="Your company"
                    value={form.company}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, company: e.target.value }))
                    }
                  />
                </div>
                <div className="tr-form-group">
                  <label>Phone</label>
                  <input
                    placeholder="+44..."
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="tr-form-group">
                <label>Product Code</label>
                <input
                  value={form.product}
                  readOnly
                  className="tr-input-readonly"
                />
              </div>
              <div className="tr-form-group">
                <label>Message / Requirements</label>
                <textarea
                  rows={4}
                  placeholder="Quantity, site conditions, bespoke finish, delivery requirements..."
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                />
              </div>
              <button type="submit" className="tr-btn-primary tr-btn-full">
                Send Enquiry →
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── THREE.JS SCENE BUILDER — STAINLESS STEEL FRIDGE ─── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildCabinetScene(THREE: any, renderer: any, initialHex: string) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0.5, 0.3, 6.0);

  /* ── ENV MAP ── */
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  const envGeo = new THREE.SphereGeometry(10, 32, 16);
  const envMatTop = new THREE.MeshBasicMaterial({ color: 0xd8e4f0, side: THREE.BackSide });
  envScene.add(new THREE.Mesh(envGeo, envMatTop));
  const envLight1 = new THREE.PointLight(0xffffff, 2.0, 30);
  envLight1.position.set(5, 8, 5);
  envScene.add(envLight1);
  const envLight2 = new THREE.PointLight(0xdce8ff, 1.5, 30);
  envLight2.position.set(-6, 4, 4);
  envScene.add(envLight2);
  const envLight3 = new THREE.PointLight(0xffe8d8, 1.0, 30);
  envLight3.position.set(0, -6, 4);
  envScene.add(envLight3);
  const envTexture = pmrem.fromScene(envScene, 0.04).texture;
  scene.environment = envTexture;

  /* ── SCENE LIGHTS ── */
  scene.add(new THREE.AmbientLight(0xffffff, 0.28));

  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(5, 9, 7);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xdce8f8, 0.7);
  fill.position.set(-6, 2, 4);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xffffff, 0.6);
  rim.position.set(0, -4, -5);
  scene.add(rim);

  const topLight = new THREE.DirectionalLight(0xffffff, 0.45);
  topLight.position.set(0, 12, 2);
  scene.add(topLight);

  const sideL = new THREE.DirectionalLight(0xc8ddf0, 0.4);
  sideL.position.set(-9, 0, 3);
  scene.add(sideL);

  const sideR = new THREE.DirectionalLight(0xfff0e8, 0.3);
  sideR.position.set(9, 0, 3);
  scene.add(sideR);

  /* ── MATERIALS ── */
  // Cabinet body — brushed stainless: mid roughness so it looks flat/industrial,
  // NOT a mirror. No shimmer, no colour shift under movement.
  const cabinetMat = new THREE.MeshStandardMaterial({
    color: initialHex,
    roughness: 0.30,
    metalness: 0.88,
    envMap: envTexture,
    envMapIntensity: 0.7,
  });

  // Door frames — same recipe, imperceptibly slightly different roughness
  const frameMat = new THREE.MeshStandardMaterial({
    color: initialHex,
    roughness: 0.32,
    metalness: 0.86,
    envMap: envTexture,
    envMapIntensity: 0.65,
  });

  // Darker recessed panel areas — always stay dark SS regardless of color change
  const ssDark = new THREE.MeshStandardMaterial({
    color: 0x7a8490,
    roughness: 0.22,
    metalness: 0.90,
    envMap: envTexture,
    envMapIntensity: 1.2,
  });

  const ssDeep = new THREE.MeshStandardMaterial({
    color: 0x60686e,
    roughness: 0.28,
    metalness: 0.88,
    envMap: envTexture,
    envMapIntensity: 0.9,
  });

  // Chrome handle bar — polished but not a disco ball; consistent with flat SS body
  const handleBarMat = new THREE.MeshStandardMaterial({
    color: 0xd4d8e0,
    roughness: 0.12,
    metalness: 0.96,
    envMap: envTexture,
    envMapIntensity: 1.2,
  });

  const handleBracketMat = new THREE.MeshStandardMaterial({
    color: 0xa8b0bc,
    roughness: 0.18,
    metalness: 0.90,
    envMap: envTexture,
    envMapIntensity: 1.0,
  });

  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x141e28,
    roughness: 0.7,
    metalness: 0.3,
  });

  const glassMat = new THREE.MeshStandardMaterial({
    color: 0xb8d8f0,
    roughness: 0.02,
    metalness: 0.0,
    transparent: true,
    opacity: 0.14,
    side: THREE.DoubleSide,
    envMap: envTexture,
    envMapIntensity: 0.8,
  });

  const ledMat = new THREE.MeshStandardMaterial({
    color: 0x60b8f8,
    emissive: 0x60b8f8,
    emissiveIntensity: 1.0,
    roughness: 0.1,
    metalness: 0,
  });

  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x0a2040,
    roughness: 0.8,
    metalness: 0.2,
    emissive: 0x0a4080,
    emissiveIntensity: 0.25,
  });

  const root = new THREE.Group();
  scene.add(root);

  /* ── CABINET BODY ── */
  const cabinet = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 3.6, 1.1),
    cabinetMat
  );
  cabinet.castShadow = true;
  root.add(cabinet);

  // Top cap
  const topCap = new THREE.Mesh(new THREE.BoxGeometry(2.24, 0.06, 1.14), ssDark);
  topCap.position.y = 1.83;
  root.add(topCap);

  // Bottom vent panel
  const ventPan = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.30, 1.1), darkMat);
  ventPan.position.y = -1.95;
  root.add(ventPan);

  // Vent slats
  for (let i = 0; i < 7; i++) {
    const slat = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.016, 0.9), ssDeep);
    slat.position.set(0, -1.95 + i * 0.038 + 0.02, 0);
    root.add(slat);
  }

  // Bottom kick plate
  const kickPlate = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.08, 1.1), ssDark);
  kickPlate.position.y = -1.76;
  root.add(kickPlate);

  /* ── DOORS ── */
  // Cabinet is 2.2 wide — left door center at x=-0.54, right at x=+0.54
  const lDoor = new THREE.Group();
  lDoor.add(new THREE.Mesh(new THREE.BoxGeometry(1.04, 3.18, 0.07), frameMat));
  const lRecess = new THREE.Mesh(new THREE.BoxGeometry(0.86, 2.86, 0.022), ssDark);
  lRecess.position.z = 0.024;
  lDoor.add(lRecess);
  for (let i = 0; i < 4; i++) {
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.008, 0.012), ssDeep);
    stripe.position.set(0, -1.2 + i * 0.8, 0.032);
    lDoor.add(stripe);
  }
  lDoor.position.set(-0.54, 0.12, 0.59);
  root.add(lDoor);

  const rDoor = new THREE.Group();
  rDoor.add(new THREE.Mesh(new THREE.BoxGeometry(1.04, 3.18, 0.07), frameMat));
  const rRecess = new THREE.Mesh(new THREE.BoxGeometry(0.86, 2.86, 0.022), ssDark);
  rRecess.position.z = 0.024;
  rDoor.add(rRecess);
  for (let i = 0; i < 4; i++) {
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.008, 0.012), ssDeep);
    stripe.position.set(0, -1.2 + i * 0.8, 0.032);
    rDoor.add(stripe);
  }
  rDoor.position.set(0.54, 0.12, 0.59);
  root.add(rDoor);

  // Center divider
  const divider = new THREE.Mesh(new THREE.BoxGeometry(0.05, 3.18, 0.09), ssDark);
  divider.position.set(0, 0.12, 0.585);
  root.add(divider);

  /* ── HANDLES ──
   *
   * Each door is 1.04 wide:
   *   Left door  spans x: −1.06 → −0.02  (center −0.54)
   *   Right door spans x: +0.02 → +1.06  (center +0.54)
   *
   * On a real True reach-in, BOTH handles sit near the CENTER seam so you
   * can pull both doors open toward you. They are side-by-side, with a small
   * gap between them at x ≈ ±0.08 from the seam.
   *
   * Left  door handle: x = −0.10  (near its right / seam edge)
   * Right door handle: x = +0.10  (near its left  / seam edge)
   *
   * z = front face of door (0.59) + half door depth (0.035) + bracket gap (0.038) ≈ 0.663
   */
  const makeHandle = (xPos: number): void => {
    const g = new THREE.Group();

    /* Vertical round bar */
    const bar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.028, 0.028, 0.76, 20),
      handleBarMat
    );
    bar.castShadow = true;
    g.add(bar);

    /* End caps */
    const capTop = new THREE.Mesh(new THREE.SphereGeometry(0.028, 14, 14), handleBarMat);
    capTop.position.y = 0.38;
    g.add(capTop);

    const capBot = new THREE.Mesh(new THREE.SphereGeometry(0.028, 14, 14), handleBarMat);
    capBot.position.y = -0.38;
    g.add(capBot);

    /* Top bracket arm — horizontal cylinder pointing toward the door (−z) */
    const topArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.013, 0.013, 0.14, 12),
      handleBracketMat
    );
    topArm.rotation.z = Math.PI / 2;
    topArm.position.set(0.05, 0.33, 0);
    g.add(topArm);

    const topDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.024, 0.024, 0.016, 14),
      handleBracketMat
    );
    topDisc.rotation.z = Math.PI / 2;
    topDisc.position.set(0.122, 0.33, 0);
    g.add(topDisc);

    /* Bottom bracket arm */
    const botArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.013, 0.013, 0.14, 12),
      handleBracketMat
    );
    botArm.rotation.z = Math.PI / 2;
    botArm.position.set(0.05, -0.33, 0);
    g.add(botArm);

    const botDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.024, 0.024, 0.016, 14),
      handleBracketMat
    );
    botDisc.rotation.z = Math.PI / 2;
    botDisc.position.set(0.122, -0.33, 0);
    g.add(botDisc);

    // z: front of door face = 0.59 + door_depth/2(0.035) + small gap(0.038)
    g.position.set(xPos, 0.12, 0.663);
    root.add(g);
  };

  /*
   * Place the two handles close together at the center seam:
   *   Left  door: handle near its RIGHT (seam) edge → x = −0.10
   *   Right door: handle near its LEFT  (seam) edge → x = +0.10
   */
  makeHandle(-0.10);
  makeHandle(+0.10);

  /* ── DIGITAL DISPLAY ── */
  const dispBase = new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.13, 0.045), darkMat);
  dispBase.position.set(0.75, 1.70, 0.585);
  root.add(dispBase);

  const screen = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.075, 0.02), screenMat);
  screen.position.set(0.75, 1.70, 0.612);
  root.add(screen);

  const ledStrip = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.026, 0.01), ledMat);
  ledStrip.position.set(0.75, 1.70, 0.625);
  root.add(ledStrip);

  /* ── LOGO PANEL ── */
  const logoPan = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.10, 0.013), ssDark);
  logoPan.position.set(-0.54, -1.52, 0.59);
  root.add(logoPan);

  /* ── DOOR LOCKS ── */
  [{ x: -0.54 + 0.32 }, { x: 0.54 - 0.32 }].forEach(({ x }) => {
    const lockGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.065, 14);
    const lock = new THREE.Mesh(lockGeo, handleBarMat);
    lock.rotation.x = Math.PI / 2;
    lock.position.set(x, 1.42, 0.63);
    root.add(lock);
    const lockRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.030, 0.008, 8, 16),
      handleBracketMat
    );
    lockRing.rotation.x = Math.PI / 2;
    lockRing.position.set(x, 1.42, 0.625);
    root.add(lockRing);
  });

  /* ── CASTORS ── */
  const castorPositions: [number, number, number][] = [
    [-0.85, -1, 0.35],
    [0.85, -1, 0.35],
    [-0.85, -1, -0.35],
    [0.85, -1, -0.35],
  ];
  castorPositions.forEach(([cx, cy, cz]) => {
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.048, 0.24, 10), ssDark);
    stem.position.set(cx, cy - 0.82, cz);
    root.add(stem);
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.068, 0.065, 16), darkMat);
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(cx, cy - 1.02, cz);
    root.add(wheel);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.07, 12), ssDark);
    hub.rotation.x = Math.PI / 2;
    hub.position.set(cx, cy - 1.02, cz);
    root.add(hub);
  });

  /* ── GLASS STRIP DETAIL ── */
  const glassL = new THREE.Mesh(new THREE.PlaneGeometry(0.07, 1.9), glassMat);
  glassL.position.set(-0.80, 0.12, 0.596);
  root.add(glassL);
  const glassR = new THREE.Mesh(new THREE.PlaneGeometry(0.07, 1.9), glassMat);
  glassR.position.set(0.34, 0.12, 0.596);
  root.add(glassR);

  /* ── GROUND SHADOW ── */
  const groundPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.ShadowMaterial({ opacity: 0.16 })
  );
  groundPlane.rotation.x = -Math.PI / 2;
  groundPlane.position.y = -2.05;
  groundPlane.receiveShadow = true;
  scene.add(groundPlane);

  return { scene, camera, cabinetMat, frameMat, ledMat, screenMat, root };
}

/* ─── PAGE COMPONENT ─── */
export default function TrueRefrigerationPage() {
  const heroThreeRef = useRef<HTMLDivElement>(null);
  const heroMatsRef = useRef<CabinetMaterials>({});
  const colourCanvasRef = useRef<HTMLCanvasElement>(null);
  const sourceImageRef = useRef<HTMLImageElement | null>(null);

  const [carouselIdx, setCarouselIdx] = useState<number>(0);
  const [activeColor, setActiveColor] = useState<RalColour>(RAL_COLOURS[0]);
  const [enquiryProduct, setEnquiryProduct] = useState<EnquiryTarget | null>(null);

  /* ─── AUTO-CAROUSEL ─── */
  useEffect(() => {
    const t = setInterval(() => {
      setCarouselIdx((i) => (i + 1) % SECTORS.length);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  /* ─── THREE.JS — HERO 3D ─── */
  useEffect(() => {
    const container = heroThreeRef.current;
    if (!container) return;

    let running = true;
    let animId = 0;
    let cleanup: (() => void) | undefined;

    const init = async (): Promise<() => void> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const THREE: any = await import("three");

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

      // ✅ FIX: pass renderer as 2nd arg, initialHex as 3rd arg
      const { scene, camera, cabinetMat, frameMat, root } =
        buildCabinetScene(THREE, renderer, STAINLESS_HEX);

      heroMatsRef.current = { cabinet: cabinetMat, frame: frameMat };

      let mouseX = 0;
      let mouseY = 0;
      const onMouse = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };
      container.addEventListener("mousemove", onMouse);

      let scrollProgress = 0;
      const onScroll = () => {
        const rect = container.getBoundingClientRect();
        scrollProgress = Math.max(
          0,
          Math.min(1, 1 - rect.top / window.innerHeight)
        );
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      const animate = () => {
        if (!running) return;
        animId = requestAnimationFrame(animate);

        // No pulsing, no wobble — static stainless steel appearance
        // Only scroll-driven entry and mouse-look remain
        const entryY = -2.0 + scrollProgress * 2.0;
        root.position.y = entryY;
        root.scale.setScalar(0.5 + scrollProgress * 0.5);

        // Gentle mouse-look only — no sine wave oscillation
        root.rotation.y = mouseX * 0.12;
        root.rotation.x = -0.04 + mouseY * 0.04;

        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);

        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", onResize);

      return () => {
        running = false;
        cancelAnimationFrame(animId);
        container.removeEventListener("mousemove", onMouse);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    };

    init().then((fn) => {
      if (running) {
        cleanup = fn;
      } else {
        fn();
      }
    });

    return () => {
      running = false;
      cleanup?.();
    };
  }, []);

  /* ─── Sync hero 3D cabinet colour ─── */
  useEffect(() => {
    heroMatsRef.current.cabinet?.color.set(activeColor.hex);
    heroMatsRef.current.frame?.color.set(activeColor.hex);
  }, [activeColor]);

  /* ─── Canvas pixel recolouring ─── */
  const applyRecolour = useCallback(
    (img: HTMLImageElement) => {
      const canvas = colourCanvasRef.current;
      if (!canvas) return;
      recolourCanvas(img, canvas, activeColor.hex);
    },
    [activeColor]
  );

  useEffect(() => {
    const canvas = colourCanvasRef.current;
    if (!canvas) return;

    if (sourceImageRef.current) {
      applyRecolour(sourceImageRef.current);
      return;
    }

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = "/true-custom.png";
    img.onload = () => {
      sourceImageRef.current = img;
      applyRecolour(img);
    };
  }, [applyRecolour]);

  /* ─── GSAP SCROLL ANIMATIONS ─── */
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: { revert: () => void } | undefined;
    const run = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gsapModule: any = await import("gsap");
      const gsap = gsapModule.default;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { ScrollTrigger } = (await import("gsap/ScrollTrigger")) as any;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(".tr-hero-eyebrow", {
          opacity: 0, x: -20, duration: 0.7, ease: "power3.out", delay: 0.2,
        });
        gsap.from(".tr-hero-title", {
          opacity: 0, y: 40, duration: 0.9, ease: "power3.out", delay: 0.35,
        });
        gsap.from(".tr-hero-body", {
          opacity: 0, y: 24, duration: 0.8, ease: "power3.out", delay: 0.6,
        });
        gsap.from(".tr-hero-actions", {
          opacity: 0, y: 16, duration: 0.7, ease: "power3.out", delay: 0.8,
        });
        gsap.to(".tr-hero-img-wrap", {
          yPercent: 12, ease: "none",
          scrollTrigger: { trigger: ".tr-hero", start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".tr-hero-text-col", {
          opacity: 0, y: -30, ease: "none",
          scrollTrigger: { trigger: ".tr-hero", start: "45% top", end: "bottom top", scrub: true },
        });
        gsap.from(".tr-intro-left", {
          opacity: 0, x: -36, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: ".tr-intro", start: "top 80%" },
        });
        gsap.from(".tr-intro-right", {
          opacity: 0, x: 36, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: ".tr-intro", start: "top 80%" },
        });
        gsap.from(".tr-prod-card", {
          opacity: 0, y: 44, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".tr-products-grid", start: "top 82%" },
        });
        gsap.from(".tr-warranty-block", {
          opacity: 0, y: 36, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".tr-warranty-block", start: "top 82%" },
        });
        gsap.from(".tr-custom-block", {
          opacity: 0, y: 36, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".tr-custom-block", start: "top 82%" },
        });
        gsap.from(".tr-cta-block", {
          opacity: 0, y: 36, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".tr-cta-block", start: "top 82%" },
        });
        gsap.utils.toArray(".tr-rule").forEach((el: unknown) => {
          gsap.from(el as Element, {
            scaleX: 0, transformOrigin: "left", duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: el as Element, start: "top 88%" },
          });
        });
      });
    };
    run();
    return () => ctx?.revert();
  }, []);

  void (undefined as unknown as CSSProperties);

  return (
    <>
      <style>{`
        html, body { overflow-x: hidden; width: 100%; }
        *, *::before, *::after { box-sizing: border-box; }

        .tr-page {
          background: #fff;
          color: ${NAVY};
          font-family: inherit;
          overflow-x: hidden;
        }

        /* ══ MODAL ══ */
        .tr-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(11,37,64,0.72);
          z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          backdrop-filter: blur(4px);
        }
        .tr-modal {
          background: #fff; border-radius: 3px;
          max-width: 620px; width: 100%;
          max-height: 90vh; overflow-y: auto;
          position: relative;
          border-top: 3px solid ${RED};
        }
        .tr-modal-close {
          position: absolute; top: 16px; right: 18px;
          background: none; border: none;
          font-size: 16px; color: ${MUTED};
          cursor: pointer; padding: 4px 8px; line-height: 1;
        }
        .tr-modal-close:hover { color: ${NAVY}; }
        .tr-modal-hd { padding: 36px 36px 24px; border-bottom: 1px solid ${BORDER}; }
        .tr-modal-eyebrow {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: ${RED}; display: block; margin-bottom: 8px;
        }
        .tr-modal-title {
          font-size: 1.4rem; font-weight: 800;
          letter-spacing: -0.03em; color: ${NAVY}; margin: 0 0 6px;
        }
        .tr-modal-code {
          font-size: 11px; font-weight: 700;
          font-family: 'Courier New', monospace;
          color: ${MUTED}; letter-spacing: 0.08em;
          background: rgba(11,37,64,0.06);
          padding: 3px 9px; border-radius: 2px;
        }
        .tr-modal-form { padding: 28px 36px 36px; }
        .tr-form-row {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 16px; margin-bottom: 16px;
        }
        .tr-form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
        .tr-form-group:last-child { margin-bottom: 0; }
        .tr-form-group label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: ${NAVY};
        }
        .tr-form-group input,
        .tr-form-group textarea {
          border: 1px solid rgba(11,37,64,0.18); border-radius: 2px;
          padding: 10px 14px; font-size: 14px; color: ${NAVY};
          background: #fafafa; outline: none;
          transition: border-color 0.15s;
          font-family: inherit; resize: vertical;
        }
        .tr-form-group input:focus,
        .tr-form-group textarea:focus { border-color: ${RED}; background: #fff; }
        .tr-input-readonly { opacity: 0.6; cursor: default !important; }
        .tr-btn-full { width: 100%; justify-content: center; margin-top: 8px; }
        .tr-modal-success { padding: 64px 36px; text-align: center; }
        .tr-modal-success-icon {
          width: 56px; height: 56px; border-radius: 50%;
          background: rgba(200,16,46,0.08);
          border: 1px solid rgba(200,16,46,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; color: ${RED};
          margin: 0 auto 20px;
        }
        .tr-modal-success h3 { font-size: 1.3rem; font-weight: 800; color: ${NAVY}; margin-bottom: 12px; }
        .tr-modal-success p { font-size: 14px; color: ${MUTED}; line-height: 1.7; margin-bottom: 28px; }
        @media (max-width: 580px) {
          .tr-form-row { grid-template-columns: 1fr; }
          .tr-modal-hd, .tr-modal-form { padding-left: 22px; padding-right: 22px; }
        }

        /* ══ HERO ══ */
        .tr-hero {
          position: relative; background: ${NAVY};
          overflow: hidden; min-height: 88vh;
          display: flex; align-items: stretch;
        }
        .tr-hero::before {
          content: ''; position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px; background: ${RED}; z-index: 4;
        }
        .tr-hero-inner { display: grid; grid-template-columns: 1fr 1fr; width: 100%; }
        .tr-hero-text-col {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; justify-content: center;
          padding: 80px 64px 80px 72px;
        }
        .tr-hero-eyebrow {
          display: flex; align-items: center; gap: 12px;
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: ${RED}; margin-bottom: 24px;
        }
        .tr-hero-eyebrow::before {
          content: ''; display: block; width: 28px; height: 1.5px;
          background: ${RED}; flex-shrink: 0;
        }
        .tr-hero-title {
          font-size: clamp(2.2rem, 4vw, 4.8rem);
          font-weight: 800; line-height: 1.0;
          letter-spacing: -0.04em; color: #fff; margin-bottom: 24px;
        }
        .tr-hero-title span { color: ${RED}; display: block; }
        .tr-hero-body {
          font-size: 14.5px; color: rgba(255,255,255,0.55);
          line-height: 1.8; max-width: 420px; margin-bottom: 40px;
        }
        .tr-hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
        .tr-btn-primary {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          text-decoration: none; color: #fff; background: ${RED};
          padding: 14px 26px; border-radius: 2px; border: none; cursor: pointer;
          transition: background 0.18s, transform 0.18s;
        }
        .tr-btn-primary:hover { background: #a50e25; transform: translateX(2px); }
        .tr-btn-outline {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          text-decoration: none; color: rgba(255,255,255,0.55);
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.18);
          padding: 14px 26px; border-radius: 2px;
          transition: border-color 0.18s, color 0.18s;
        }
        .tr-btn-outline:hover { border-color: rgba(255,255,255,0.5); color: #fff; }
        .tr-hero-img-col {
          position: relative; overflow: hidden; min-height: 520px;
          display: flex; align-items: center; justify-content: center;
          background: ${NAVY};
        }
        .tr-hero-img-wrap {
          position: absolute; inset: 0; width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
        }
        .tr-hero-img-wrap img {
          width: 100%; height: 100%;
          object-fit: contain !important;
          object-position: center; padding: 32px;
        }
        .tr-hero-img-col::before {
          content: ''; position: absolute; top: 0; bottom: 0; left: 0;
          width: 120px;
          background: linear-gradient(90deg, ${NAVY} 0%, transparent 100%);
          z-index: 2;
        }
        .tr-hero-img-col::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 80px;
          background: linear-gradient(0deg, ${NAVY} 0%, transparent 100%);
          z-index: 2;
        }
        .tr-hero-sector { display: flex; align-items: center; gap: 14px; margin-top: 32px; }
        .tr-sector-label {
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: rgba(255,255,255,0.28); flex-shrink: 0;
        }
        .tr-sector-ticker-wrap { overflow: hidden; height: 24px; flex: 1; }
        .tr-sector-ticker {
          display: flex; flex-direction: column;
          transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .tr-sector-item {
          height: 24px; display: flex; align-items: center;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.04em; color: #fff; white-space: nowrap;
        }
        @media (max-width: 1020px) { .tr-hero-text-col { padding: 60px 36px 60px 44px; } }
        @media (max-width: 820px) {
          .tr-hero-inner { grid-template-columns: 1fr; }
          .tr-hero-img-col { min-height: 340px; order: -1; }
          .tr-hero-img-col::before { display: none; }
          .tr-hero-text-col { padding: 48px 28px 52px 32px; }
        }
        @media (max-width: 520px) {
          .tr-hero-img-col { min-height: 240px; }
          .tr-hero-text-col { padding: 36px 20px 44px 24px; }
          .tr-hero-title { font-size: clamp(1.9rem, 8vw, 2.8rem); }
        }

        /* ══ BODY ══ */
        .tr-inner { max-width: 1160px; margin: 0 auto; padding: 0 40px 100px; }
        @media (max-width: 820px) { .tr-inner { padding: 0 24px 80px; } }
        @media (max-width: 500px) { .tr-inner { padding: 0 16px 60px; } }

        /* ══ SECTION HEADER ══ */
        .tr-section-hd {
          display: flex; align-items: center; justify-content: space-between;
          padding: 56px 0 0;
          border-bottom: 1px solid ${BORDER};
          margin-bottom: 48px;
        }
        .tr-section-label {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.26em; text-transform: uppercase; color: ${MUTED};
        }
        .tr-section-accent {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.16em; color: ${RED};
        }

        /* ══ INTRO SPLIT ══ */
        .tr-intro { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .tr-intro-eyebrow {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: ${RED}; display: flex; align-items: center; gap: 10px;
          margin-bottom: 16px;
        }
        .tr-intro-eyebrow::before {
          content: ''; display: block; width: 22px; height: 1.5px; background: ${RED};
        }
        .tr-intro-title {
          font-size: clamp(1.5rem, 2.5vw, 2.2rem);
          font-weight: 800; letter-spacing: -0.035em;
          line-height: 1.1; color: ${NAVY}; margin-bottom: 18px;
        }
        .tr-intro-body { font-size: 14px; color: #4B5563; line-height: 1.82; }
        .tr-intro-body + .tr-intro-body { margin-top: 14px; }
        .tr-rule { height: 1px; background: ${RED}; margin: 24px 0 0; width: 40px; }
        @media (max-width: 820px) { .tr-intro { grid-template-columns: 1fr; gap: 36px; } }

        /* ══ PRODUCTS GRID ══ */
        .tr-products-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 2px; border: 1px solid ${BORDER};
          border-radius: 3px; overflow: hidden; background: ${BORDER};
        }
        .tr-prod-card {
          background: #fff; padding: 0;
          display: flex; flex-direction: column;
          position: relative; cursor: pointer;
          transition: box-shadow 0.2s;
        }
        .tr-prod-card:hover { z-index: 1; box-shadow: 0 4px 28px rgba(11,37,64,0.12); }
        .tr-prod-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2px; background: ${RED};
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.25s ease;
        }
        .tr-prod-card:hover::before { transform: scaleX(1); }
        .tr-prod-img {
          position: relative; aspect-ratio: 4/3;
          background: #000; overflow: hidden;
        }
        .tr-prod-img img { transition: transform 0.4s ease; }
        .tr-prod-card:hover .tr-prod-img img { transform: scale(1.04); }
        .tr-prod-body { padding: 22px 22px 18px; flex: 1; display: flex; flex-direction: column; }
        .tr-prod-category {
          font-size: 8px; font-weight: 700;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: ${RED}; margin-bottom: 8px;
        }
        .tr-prod-name {
          font-size: 13px; font-weight: 800;
          letter-spacing: -0.02em; color: ${NAVY};
          line-height: 1.2; margin-bottom: 8px;
        }
        .tr-prod-desc {
          font-size: 11.5px; color: ${MUTED};
          line-height: 1.7; flex: 1; margin-bottom: 16px;
        }
        .tr-prod-code {
          font-family: 'Courier New', monospace;
          font-size: 10px; font-weight: 700;
          color: ${NAVY};
          letter-spacing: 0.06em; margin-bottom: 12px;
          background: rgba(11,37,64,0.07);
          display: inline-block;
          padding: 3px 8px;
          border-radius: 2px;
          border-left: 2px solid ${RED};
        }
        .tr-prod-enquire {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: ${RED}; text-decoration: none;
          border: none; background: none; cursor: pointer;
          padding: 0; transition: gap 0.15s;
        }
        .tr-prod-enquire:hover { gap: 10px; }
        .tr-prod-grid-footer {
          display: flex; align-items: center; justify-content: flex-end;
          margin-top: 18px;
        }
        .tr-prod-discover-all {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: ${MUTED}; text-decoration: none;
          border: 1.5px solid ${BORDER};
          padding: 10px 20px; border-radius: 2px;
          transition: color 0.15s, border-color 0.15s;
        }
        .tr-prod-discover-all:hover { color: ${NAVY}; border-color: rgba(11,37,64,0.3); }
        .tr-prod-discover-all svg { flex-shrink: 0; }
        @media (max-width: 1060px) { .tr-products-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 720px)  { .tr-products-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 440px)  { .tr-products-grid { grid-template-columns: 1fr; } }

        /* ══ 3D SECTION ══ */
        .tr-3d-section {
          border: 1px solid ${BORDER}; border-radius: 3px; overflow: hidden;
          display: grid; grid-template-columns: 1fr 1fr;
          min-height: 480px; background: ${NAVY};
        }
        .tr-3d-left {
          padding: 52px 44px;
          display: flex; flex-direction: column; justify-content: center;
          position: relative;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .tr-3d-left::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 4px; background: ${RED};
        }
        .tr-3d-eyebrow {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: ${RED}; display: flex; align-items: center; gap: 10px;
          margin-bottom: 16px;
        }
        .tr-3d-eyebrow::before {
          content: ''; display: block; width: 22px; height: 1.5px; background: ${RED};
        }
        .tr-3d-title {
          font-size: clamp(1.5rem, 2.4vw, 2.2rem);
          font-weight: 800; letter-spacing: -0.04em;
          line-height: 1.08; color: #fff; margin-bottom: 18px;
        }
        .tr-3d-body {
          font-size: 13.5px; color: rgba(255,255,255,0.5);
          line-height: 1.8; max-width: 380px;
        }
        .tr-3d-specs { display: flex; gap: 28px; margin-top: 32px; flex-wrap: wrap; }
        .tr-3d-spec-num {
          font-size: 1.2rem; font-weight: 800;
          letter-spacing: -0.04em; color: #fff; line-height: 1; margin-bottom: 4px;
        }
        .tr-3d-spec-lbl {
          font-size: 8px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .tr-3d-canvas-wrap { position: relative; min-height: 480px; }
        .tr-3d-canvas { width: 100%; height: 100%; min-height: 480px; cursor: grab; display: block; }
        .tr-3d-canvas:active { cursor: grabbing; }
        .tr-3d-hint {
          position: absolute; bottom: 16px; right: 20px;
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.2); pointer-events: none;
        }
        @media (max-width: 820px) {
          .tr-3d-section { grid-template-columns: 1fr; }
          .tr-3d-left { padding: 36px 24px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); }
          .tr-3d-canvas { min-height: 320px; }
          .tr-3d-canvas-wrap { min-height: 320px; }
        }

        /* ══ WARRANTY ══ */
        .tr-warranty-block {
          display: grid; grid-template-columns: 1fr 1fr;
          border: 1px solid ${BORDER}; border-radius: 3px; overflow: hidden;
        }
        .tr-warranty-left { background: ${NAVY}; padding: 52px 44px; position: relative; overflow: hidden; }
        .tr-warranty-left::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 4px; background: ${RED};
        }
        .tr-warranty-eyebrow {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: ${RED}; margin-bottom: 8px;
        }
        .tr-warranty-title {
          font-size: 1.6rem; font-weight: 800;
          letter-spacing: -0.035em; line-height: 1.1;
          color: #fff; margin-bottom: 20px;
        }
        .tr-warranty-body { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.8; }
        .tr-warranty-badge {
          display: flex; align-items: center; gap: 14px;
          margin-top: 32px; padding-top: 28px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .tr-warranty-num {
          font-size: 3.5rem; font-weight: 900;
          letter-spacing: -0.06em; color: #fff; line-height: 1;
        }
        .tr-warranty-num span { color: ${RED}; }
        .tr-warranty-badge-text { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.45); line-height: 1.5; }
        .tr-warranty-badge-text strong { color: #fff; display: block; }
        .tr-warranty-right {
          background: #fafafa; padding: 52px 44px;
          display: flex; align-items: center; justify-content: center;
        }
        .tr-warranty-img-wrap { position: relative; width: 100%; max-width: 260px; aspect-ratio: 4/3; }
        @media (max-width: 820px) {
          .tr-warranty-block { grid-template-columns: 1fr; }
          .tr-warranty-left, .tr-warranty-right { padding: 36px 24px; }
        }

        /* ══ CUSTOM DESIGN ══ */
        .tr-custom-block { border: 1px solid ${BORDER}; border-radius: 3px; overflow: hidden; }
        .tr-custom-top { background: ${NAVY}; padding: 52px 52px 44px; position: relative; }
        .tr-custom-top::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 4px; background: ${RED};
        }
        .tr-custom-eyebrow {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: ${RED}; margin-bottom: 8px;
        }
        .tr-custom-title {
          font-size: 1.6rem; font-weight: 800;
          letter-spacing: -0.035em; color: #fff;
          margin-bottom: 16px; line-height: 1.1;
        }
        .tr-custom-body {
          font-size: 14px; color: rgba(255,255,255,0.55);
          line-height: 1.8; max-width: 600px; margin-bottom: 0;
        }
        .tr-colour-grid { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 32px; }
        .tr-colour-swatch {
          width: 48px; height: 48px; border-radius: 4px; cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s;
          position: relative; flex-shrink: 0;
        }
        .tr-colour-swatch:hover,
        .tr-colour-swatch--active { transform: scale(1.14); box-shadow: 0 4px 16px rgba(0,0,0,0.35); }
        .tr-colour-swatch--active::after {
          content: '✓'; position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; color: #fff; text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }
        .tr-colour-label {
          font-size: 9px; font-weight: 600;
          text-align: center; margin-top: 6px;
          color: rgba(255,255,255,0.45); letter-spacing: 0.1em;
          width: 48px; line-height: 1.2;
        }
        .tr-custom-bottom {
          background: #fff; padding: 44px 52px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start;
        }
        .tr-custom-img {
          position: relative; aspect-ratio: 4/3;
          border-radius: 3px; overflow: hidden;
          border: 1px solid ${BORDER}; background: #111;
        }
        .tr-custom-img-overlay {
          position: absolute; bottom: 14px; left: 16px; z-index: 2; pointer-events: none;
        }
        .tr-custom-colour-pill {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: #fff; padding: 5px 14px; border-radius: 20px;
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.3);
          transition: background 0.3s; display: inline-block;
        }
        .tr-custom-copy { padding-top: 8px; }
        .tr-custom-copy h4 {
          font-size: 1.15rem; font-weight: 800;
          letter-spacing: -0.03em; color: ${NAVY}; margin-bottom: 12px;
        }
        .tr-custom-copy p { font-size: 14px; color: ${MUTED}; line-height: 1.8; margin-bottom: 20px; }
        .tr-custom-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: ${RED}; text-decoration: none; transition: gap 0.15s;
        }
        .tr-custom-link:hover { gap: 12px; }
        @media (max-width: 820px) {
          .tr-custom-top, .tr-custom-bottom { padding: 36px 24px; }
          .tr-custom-bottom { grid-template-columns: 1fr; gap: 28px; }
        }

        /* ══ SECTOR STRIP ══ */
        .tr-sector-strip {
          border: 1px solid ${BORDER}; border-radius: 3px; overflow: hidden;
          display: grid; grid-template-columns: auto 1fr;
        }
        .tr-sector-left {
          background: ${NAVY}; padding: 36px 44px;
          display: flex; align-items: center;
          border-right: 1px solid rgba(255,255,255,0.07); position: relative;
        }
        .tr-sector-left::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 4px; background: ${RED};
        }
        .tr-sector-headline {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: rgba(255,255,255,0.4); white-space: nowrap;
        }
        .tr-sector-right {
          background: #fafafa; padding: 0 44px;
          display: flex; align-items: center; overflow: hidden;
        }
        .tr-sector-pills {
          display: flex; gap: 10px; flex-wrap: nowrap;
          overflow-x: auto; padding: 28px 0; scrollbar-width: none;
        }
        .tr-sector-pills::-webkit-scrollbar { display: none; }
        .tr-sector-pill {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 10px 20px; border-radius: 20px;
          white-space: nowrap; cursor: default;
          transition: all 0.3s; border: 1.5px solid;
        }
        .tr-sector-pill--active { background: ${NAVY}; color: #fff; border-color: ${NAVY}; }
        .tr-sector-pill--inactive { background: transparent; color: ${MUTED}; border-color: ${BORDER}; }
        @media (max-width: 820px) {
          .tr-sector-strip { grid-template-columns: 1fr; }
          .tr-sector-left { padding: 22px 24px; }
          .tr-sector-right { padding: 0 24px; }
        }

        /* ══ CTA BLOCK ══ */
        .tr-cta-block {
          display: grid; grid-template-columns: 1fr 1fr;
          border: 1px solid ${BORDER}; border-radius: 3px; overflow: hidden; min-height: 320px;
        }
        .tr-cta-left {
          background: #fff; padding: 52px 44px; border-right: 1px solid ${BORDER};
        }
        .tr-cta-left-rule { width: 28px; height: 1.5px; background: ${RED}; margin-bottom: 20px; }
        .tr-cta-left-title {
          font-size: 1.25rem; font-weight: 700;
          letter-spacing: -0.025em; color: ${NAVY}; margin-bottom: 16px; line-height: 1.2;
        }
        .tr-cta-left-body { font-size: 13.5px; color: ${MUTED}; line-height: 1.8; }
        .tr-cta-left-body strong { color: ${NAVY}; font-weight: 600; }
        .tr-cta-right {
          background: ${NAVY}; padding: 52px 44px;
          display: flex; flex-direction: column; justify-content: center;
          position: relative; overflow: hidden;
        }
        .tr-cta-right::before {
          content: ''; position: absolute;
          width: 300px; height: 300px; border-radius: 50%;
          border: 1px solid rgba(200,16,46,0.15);
          top: -80px; right: -80px; pointer-events: none;
        }
        .tr-cta-right::after {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 4px; background: ${RED};
        }
        .tr-cta-right-rule { width: 28px; height: 1.5px; background: ${RED}; margin-bottom: 20px; }
        .tr-cta-right-title {
          font-size: 1.25rem; font-weight: 700;
          letter-spacing: -0.025em; color: #fff; margin-bottom: 16px; line-height: 1.2;
        }
        .tr-cta-right-body {
          font-size: 13.5px; color: rgba(255,255,255,0.5);
          line-height: 1.8; margin-bottom: 28px;
        }
        .tr-cta-stats {
          display: flex; gap: 28px; margin-top: 32px; padding-top: 28px;
          border-top: 1px solid rgba(255,255,255,0.08); flex-wrap: wrap;
        }
        .tr-cta-stat-num {
          font-size: 1.15rem; font-weight: 800;
          letter-spacing: -0.04em; color: #fff; line-height: 1; margin-bottom: 4px;
        }
        .tr-cta-stat-lbl {
          font-size: 8px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        @media (max-width: 820px) {
          .tr-cta-block { grid-template-columns: 1fr; min-height: unset; }
          .tr-cta-left { border-right: none; border-bottom: 1px solid ${BORDER}; padding: 36px 24px; }
          .tr-cta-right { padding: 36px 24px; }
        }

        /* ══ BRAND LOGO BAR ══ */
        .tr-logo-bar {
          border: 1px solid ${BORDER}; border-radius: 3px;
          padding: 48px 52px;
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 40px; flex-wrap: wrap; background: #fafafa;
        }
        .tr-logo-bar-left { display: flex; flex-direction: column; gap: 10px; }
        .tr-logo-bar-label {
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.26em; text-transform: uppercase; color: ${MUTED};
        }
        .tr-logo-bar-tagline {
          font-size: 13.5px; color: ${NAVY};
          font-weight: 500; line-height: 1.6; max-width: 480px;
        }
        .tr-logo-bar-tagline strong { font-weight: 700; }
        .tr-logo-img-wrap { display: flex; align-items: center; flex-shrink: 0; }
        @media (max-width: 680px) {
          .tr-logo-bar { padding: 36px 24px; flex-direction: column; align-items: flex-start; }
        }

        .tr-spacer { margin-top: 0; }
      `}</style>

      {/* ── INQUIRY MODAL ── */}
      {enquiryProduct && (
        <InquiryModal
          product={enquiryProduct}
          onClose={() => setEnquiryProduct(null)}
        />
      )}

      <div className="tr-page">

        {/* ══════ HERO ══════ */}
        <section className="tr-hero">
          <div className="tr-hero-inner">
            <div className="tr-hero-text-col">
              <p className="tr-hero-eyebrow">
                True Refrigeration Distribution Partner
              </p>
              <h1 className="tr-hero-title">
                True Refrigeration
                <span>Commercial Equipment</span>
              </h1>
              <p className="tr-hero-body">
                We are proud to be an authorised distributor of True
                Refrigeration, a global leader in commercial refrigeration and
                catering equipment. We supply a wide range of premium
                refrigeration solutions renowned for their quality, performance,
                and energy efficiency, helping businesses across the hospitality
                and catering industry operate at their best.
              </p>
              <div className="tr-hero-actions">
                <Link className="tr-btn-primary" href="/contact">
                  Request a Quote →
                </Link>
                <a className="tr-btn-outline" href="#products">
                  View Products
                </a>
              </div>
              <div className="tr-hero-sector">
                <span className="tr-sector-label">Working with</span>
                <div className="tr-sector-ticker-wrap">
                  <div
                    className="tr-sector-ticker"
                    style={{ transform: `translateY(-${carouselIdx * 24}px)` }}
                  >
                    {[...SECTORS, SECTORS[0]].map((s, i) => (
                      <div key={i} className="tr-sector-item">{s}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="tr-hero-img-col">
              <div className="tr-hero-img-wrap">
                <Image
                  src="/True_Refrigeration_Logo_Silver_RGB.png"
                  alt="True Refrigeration commercial unit"
                  fill
                  priority
                  style={{ objectFit: "contain", objectPosition: "center", padding: "32px" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ══════ BODY ══════ */}
        <div className="tr-inner">

          {/* ── INTRO ── */}
          <div className="tr-section-hd">
            <span className="tr-section-label">True Refrigeration · Authorised Distributor</span>
            <span className="tr-section-accent">Global Leader</span>
          </div>

          <div className="tr-intro">
            <div className="tr-intro-left">
              <p className="tr-intro-eyebrow">their Story</p>
              <h2 className="tr-intro-title">
                80 Years of American Refrigeration Excellence
              </h2>
              <p className="tr-intro-body">
                Founded by the Trulaske family, True has grown from a pioneering
                refrigeration company into a global leader known for innovation,
                quality, and reliability.
              </p>
              <p className="tr-intro-body">
                For over 80 years, True has continuously pushed the boundaries
                of performance by developing energy-efficient technologies,
                refining designs, and delivering refrigeration solutions that
                consistently surpass the expectations of professionals worldwide.
                Their legacy is rooted in craftsmanship, innovation, and
                dedication, shaping the industry and setting the standard for
                professional refrigeration.
              </p>
              <div className="tr-rule" />
            </div>
          </div>

          {/* ── WORKING WITH SECTORS ── */}
          <div className="tr-section-hd">
            <span className="tr-section-label">Industries</span>
            <span className="tr-section-accent">Every Sector</span>
          </div>

          <div className="tr-sector-strip">
            <div className="tr-sector-left">
              <span className="tr-sector-headline">Working with</span>
            </div>
            <div className="tr-sector-right">
              <div className="tr-sector-pills">
                {SECTORS.map((s, i) => (
                  <div
                    key={s}
                    className={`tr-sector-pill ${
                      i === carouselIdx % SECTORS.length
                        ? "tr-sector-pill--active"
                        : "tr-sector-pill--inactive"
                    }`}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── PRODUCTS ── */}
          <div id="products">
            <div className="tr-section-hd" style={{ marginTop: 0 }}>
              <span className="tr-section-label">Product Range</span>
              <span className="tr-section-accent">8 Models</span>
            </div>

            <div className="tr-products-grid">
              {PRODUCTS.map((p) => (
                <div className="tr-prod-card" key={p.code}>
                  <div className="tr-prod-img">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      style={{ objectFit: "contain", objectPosition: "center", background: "#000" }}
                    />
                  </div>
                  <div className="tr-prod-body">
                    <p className="tr-prod-category">{p.category}</p>
                    <h3 className="tr-prod-name">{p.name}</h3>
                    <p className="tr-prod-desc">{p.desc}</p>
                    <p className="tr-prod-code">{p.code}</p>
                    <button
                      className="tr-prod-enquire"
                      onClick={() => setEnquiryProduct(p)}
                    >
                      Enquire →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="tr-prod-grid-footer">
              <a
                href="https://truerefrigeration.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="tr-prod-discover-all"
              >
                <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                  <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Discover the Full Range on TrueRef
              </a>
            </div>
          </div>

          {/* ── 3D INTERACTIVE ── */}
          <div className="tr-section-hd tr-spacer">
            <span className="tr-section-label">Engineering</span>
            <span className="tr-section-accent">Industrial Grade</span>
          </div>

          <div className="tr-3d-section">
            <div className="tr-3d-left">
              <p className="tr-3d-eyebrow">True Engineering</p>
              <h3 className="tr-3d-title">
                Built to Last.
                <br />
                Built to Perform.
              </h3>
              <p className="tr-3d-body">
                Every True unit is engineered for continuous commercial
                operation. Stainless steel construction throughout,
                precision-calibrated refrigeration systems, and digital
                temperature management — all designed to maintain critical food
                safety standards in the most demanding kitchen environments.
              </p>
              <div className="tr-3d-specs">
                <div>
                  <div className="tr-3d-spec-num">80+</div>
                  <div className="tr-3d-spec-lbl">Years Innovation</div>
                </div>
                <div>
                  <div className="tr-3d-spec-num">7yr</div>
                  <div className="tr-3d-spec-lbl">Warranty</div>
                </div>
                <div>
                  <div className="tr-3d-spec-num">HC</div>
                  <div className="tr-3d-spec-lbl">Refrigerant</div>
                </div>
              </div>
            </div>
            <div className="tr-3d-canvas-wrap">
              <div
                ref={heroThreeRef}
                className="tr-3d-canvas"
                style={{ minHeight: 480 }}
              />
              <span className="tr-3d-hint">DRAG TO ROTATE</span>
            </div>
          </div>

          {/* ── WARRANTY ── */}
          <div className="tr-section-hd tr-spacer">
            <span className="tr-section-label">Peace of Mind</span>
            <span className="tr-section-accent">7 Years</span>
          </div>

          <div className="tr-warranty-block">
            <div className="tr-warranty-left">
              <p className="tr-warranty-eyebrow">Coverage</p>
              <h3 className="tr-warranty-title">
                Extended 7-Year
                <br />
                Warranty Included
              </h3>
              <p className="tr-warranty-body">
                Enjoy peace of mind with our extended 7-year warranty—covering
                parts, labour, and compressors across Europe, the UK, and
                Ireland. At True Refrigeration, they craft durable, efficient,
                and reliable equipment that lasts, so you can focus on serving
                your customers. Choose True for a lasting investment in quality
                and performance.
              </p>
              <div className="tr-warranty-badge">
                <div className="tr-warranty-num">
                  7<span>yr</span>
                </div>
                <div className="tr-warranty-badge-text">
                  <strong>Parts, Compressor &amp; Labour</strong>
                  UK, Europe &amp; Ireland · Full Coverage
                </div>
              </div>
            </div>
            <div className="tr-warranty-right">
              <div className="tr-warranty-img-wrap">
                <Image
                  src="/warranty-7yr.png"
                  alt="7 Year Warranty — Parts, Compressor & Labour"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>

          {/* ── CUSTOM DESIGN ── */}
          <div className="tr-section-hd tr-spacer">
            <span className="tr-section-label">Bespoke Finishes</span>
            <span className="tr-section-accent">Custom Design</span>
          </div>

          <div className="tr-custom-block">
            <div className="tr-custom-top">
              <p className="tr-custom-eyebrow">Custom Design</p>
              <h3 className="tr-custom-title">
                When colours appear authentic.
              </h3>
              <p className="tr-custom-body">
                Make your refrigeration units stand out. Customise your True
                products and craft cabinets to match your brand using our range
                of customisation options. From hardware upgrades to innovative
                lighting, they provide comprehensive solutions to ensure your
                refrigeration units meet your brand and operational needs.
              </p>

              <div className="tr-colour-grid">
                {RAL_COLOURS.map((c) => (
                  <div
                    key={c.name}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                  >
                    <div
                      className={`tr-colour-swatch ${activeColor.name === c.name ? "tr-colour-swatch--active" : ""}`}
                      style={{ background: c.hex, border: `2px solid ${c.border}` }}
                      onClick={() => setActiveColor(c)}
                      title={c.name}
                    />
                    <span className="tr-colour-label">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="tr-custom-bottom">
              <div className="tr-custom-img">
                <canvas
                  ref={colourCanvasRef}
                  style={{ width: "100%", height: "100%", display: "block", borderRadius: 3 }}
                />
                <div className="tr-custom-img-overlay">
                  <span
                    className="tr-custom-colour-pill"
                    style={{ background: `${activeColor.hex}cc` }}
                  >
                    {activeColor.name}
                  </span>
                </div>
              </div>

              <div className="tr-custom-copy">
                <div className="tr-rule" style={{ marginBottom: 20 }} />
                <h4>Your Brand. Your Unit.</h4>
                <p>
                  Select from stainless steel, green, blue, pink, red, orange,
                  silver, or black finishes. Custom RAL colours available on
                  request. Speak to our team about your brand requirements.
                </p>
                <a
                  href="https://www.truerefrigeration.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tr-custom-link"
                >
                  Discover the Full Range on TrueRef →
                </a>
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="tr-section-hd tr-spacer">
            <span className="tr-section-label">Authorised Distributor · UK</span>
          </div>

          <div className="tr-cta-block">
            <div className="tr-cta-left">
              <div className="tr-cta-left-rule" />
              <h3 className="tr-cta-left-title">
                Premium Equipment.
                <br />
                Direct Access.
              </h3>
              <p className="tr-cta-left-body">
                As an{" "}
                <strong>authorised distributor of True Refrigeration</strong>,
                we give engineers and businesses direct access to the full range
                — the right units, competitive lead times, and professional
                technical support.
              </p>
              <p className="tr-cta-left-body" style={{ marginTop: 12 }}>
                Whether you need a single replacement unit or a full kitchen
                specification, our team handles sourcing and logistics so you
                can focus on <strong>the installation</strong>.
              </p>
            </div>
            <div className="tr-cta-right">
              <div className="tr-cta-right-rule" />
              <h3 className="tr-cta-right-title">
                Speak to the Team
                <br />
                at ILK Technology
              </h3>
              <p className="tr-cta-right-body">
                Send your requirements to{" "}
                <strong style={{ color: "rgba(255,255,255,0.75)" }}>ILK Technology</strong>{" "}
                — model codes, site conditions, or custom finish preferences —
                and we&apos;ll come back with pricing, availability, and
                technical guidance within one business day.
              </p>
              <button
                className="tr-btn-primary"
                onClick={() =>
                  setEnquiryProduct({
                    code: "General Enquiry",
                    name: "Product Enquiry",
                  })
                }
              >
                Make an Enquiry →
              </button>
              <div className="tr-cta-stats">
                <div>
                  <div className="tr-cta-stat-num">80+</div>
                  <div className="tr-cta-stat-lbl">Years Heritage</div>
                </div>
                <div>
                  <div className="tr-cta-stat-num">7yr</div>
                  <div className="tr-cta-stat-lbl">Full Warranty</div>
                </div>
                <div>
                  <div className="tr-cta-stat-num">UK</div>
                  <div className="tr-cta-stat-lbl">Authorised</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── BRAND LOGO BAR ── */}
          <div className="tr-logo-bar" style={{ marginTop: 2 }}>
            <div className="tr-logo-bar-left">
              <span className="tr-logo-bar-label">Authorised UK Distributor</span>
              <p className="tr-logo-bar-tagline">
                <strong>Authorised distributor of True Refrigeration</strong>{" "}
                — supplying the full range of commercial refrigeration and
                catering equipment, backed by over 80 years of American
                engineering excellence.
              </p>
            </div>
            <div className="tr-logo-img-wrap">
              <Image
                src="/True_Refrigeration_Logo_Silver_RGB.png"
                alt="True Refrigeration logo"
                width={200}
                height={76}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}