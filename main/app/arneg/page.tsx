import type { Metadata } from "next";
import BrandsContent from "./content";

/* ─────────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Our Brands | Arneg, Oscartielle, Intrac & Incold UK Distributor",
  description:
    "ILK Technology is the authorised UK distribution partner for Arneg, Oscartielle, Intrac and Incold. Browse our full brand portfolio of commercial refrigeration cabinets, cold rooms, retail shelving and checkouts.",
  alternates: {
    canonical: "https://ilktechnology.com/brands",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ilktechnology.com/brands",
    title: "Our Brands | Arneg, Oscartielle, Intrac & Incold — ILK Technology UK",
    description:
      "Authorised UK distributor for Arneg, Oscartielle, Intrac and Incold. Commercial refrigeration cabinets, cold rooms, plug-in units, retail shelving and checkouts — delivered UK-wide.",
    images: [
      {
        url: "https://ilktechnology.com/og-default.png",
        width: 1200,
        height: 630,
        alt: "ILK Technology — Authorised UK Distributor for Arneg, Oscartielle, Intrac and Incold",
        type: "image/png",
      },
    ],
  },
  keywords: [
    "Arneg UK distributor",
    "Arneg UK distribution partner",
    "Oscartielle UK distributor",
    "Intrac UK distributor",
    "Incold UK distributor",
    "commercial refrigeration brands UK",
    "Arneg cabinets UK",
    "Arneg Osaka 2 UK",
    "Arneg Osaka 3 UK",
    "Arneg Panama 3 UK",
    "plug-in refrigeration UK",
    "cold room manufacturer UK",
    "retail shelving supplier UK",
    "ILK Technology brands",
  ],
};

/* ─────────────────────────────────────────────
   JSON-LD — WebPage + BreadcrumbList
───────────────────────────────────────────── */
const brandsPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://ilktechnology.com/brands/#webpage",
  url: "https://ilktechnology.com/brands",
  name: "Our Brands — Arneg, Oscartielle, Intrac & Incold UK Distributor",
  description:
    "ILK Technology is the authorised UK distribution partner for Arneg, Oscartielle, Intrac and Incold — supplying commercial refrigeration, cold rooms, retail shelving and checkouts across the UK.",
  isPartOf: { "@id": "https://ilktechnology.com/#website" },
  about: { "@id": "https://ilktechnology.com/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ilktechnology.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Our Brands",
        item: "https://ilktechnology.com/brands",
      },
    ],
  },
  inLanguage: "en-GB",
};

/* ─────────────────────────────────────────────
   JSON-LD — ItemList of brand partners
   Helps Google understand the brands you represent
───────────────────────────────────────────── */
const brandListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "ILK Technology Brand Partners",
  description: "Authorised UK distribution partners represented by ILK Technology",
  numberOfItems: 4,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Brand",
        name: "Arneg",
        description:
          "A dynamic international collective and cutting-edge industrial organisation. Visionaries with an artisan spirit, blending craftsmanship and relentless innovation to exceed every expectation.",
        url: "https://www.arneg.com/",
        logo: "https://ilktechnology.com/logo1.png",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Brand",
        name: "Oscartielle",
        description:
          "Premier European manufacturer of custom integral refrigerated cabinets, offering innovative plug-in systems and solutions for retail and food industries.",
        url: "https://www.oscartielle.it/",
        logo: "https://ilktechnology.com/logo3.png",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Brand",
        name: "Intrac",
        description:
          "Designers crafting compelling retail spaces. Specialising in shelving, checkouts, and accessories to turn ideas into successful environments.",
        url: "https://www.intrac.it/",
        logo: "https://ilktechnology.com/logo2.png",
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Brand",
        name: "Incold",
        description:
          "Leading manufacturer of modular cold rooms, insulated panels, rapid doors, and specialised insulation solutions for every refrigeration need.",
        url: "https://www.incold.it/",
        logo: "https://ilktechnology.com/logo4.png",
      },
    },
  ],
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function BrandsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandsPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandListSchema) }}
      />
      <BrandsContent />
    </>
  );
}