import type { Metadata } from "next";
import TBR32Content from "./content";

/* ─────────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title:
    "TBR32-RISZ1 Bar Refrigerator UK | Black 1-Door Glass Bar Fridge — ILK Technology",
  description:
    "ILK Technology supplies the TBR32-RISZ1-L-B-G-2 bar refrigerator — black exterior, 1 glass swing door, 290L capacity, R290 refrigerant, 7-year warranty. UK-wide supply.",
  alternates: {
    canonical: "https://ilktechnology.com/products/bar-refrigeration-1",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ilktechnology.com/products/bar-refrigeration-1",
    siteName: "ILK Technology",
    title: "TBR32-RISZ1 Bar Refrigerator UK | ILK Technology",
    description:
      "Black exterior, 1 glass swing door bar refrigerator. 290L capacity, R290 refrigerant, 3 shelves, 7-year warranty. Supplied UK-wide by ILK Technology.",
    images: [
      {
        url: "https://ilktechnology.com/og-bar-refrigeration-1.png",
        width: 1200,
        height: 630,
        alt: "TBR32-RISZ1 Bar Refrigerator — ILK Technology UK Supplier",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TBR32-RISZ1 Bar Refrigerator UK | ILK Technology",
    description:
      "Black exterior, 1 glass door bar refrigerator. 290L, R290 refrigerant, 7-year warranty. Supplied UK-wide.",
    images: ["https://ilktechnology.com/og-bar-refrigeration-1.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [
    // Brand + product intent
    "TBR32-RISZ1 bar refrigerator",
    "TBR32-RISZ1-L-B-G-2",
    "buy TBR32 bar refrigerator UK",
    "ILK Technology bar refrigerator",

    // Category / product-type intent
    "bar refrigerator UK",
    "back bar cooler UK",
    "single door glass bar fridge",
    "commercial bar fridge UK",
    "under counter bar refrigerator",
    "1 door glass bar fridge",
    "black bar refrigerator UK",
    "back bar bottle cooler UK",

    // Refrigerant / compliance intent
    "R290 refrigerator UK",
    "propane refrigerant bar fridge",
    "natural refrigerant commercial fridge",
    "low GWP bar refrigerator",
    "auto defrost bar refrigerator",

    // Capacity / spec intent (long-tail)
    "290 litre bar cooler",
    "3 shelf bar fridge",
    "290L bar refrigerator UK",
    "compact bar refrigerator UK",
    "commercial fridge 0.5 to 3.3 degrees",

    // Sector / use-case intent
    "pub bar refrigerator",
    "nightclub bottle cooler",
    "restaurant back bar fridge",
    "hospitality refrigeration equipment UK",
    "small bar fridge commercial",

    // Warranty / company
    "7 year warranty bar refrigerator",
    "bar fridge with warranty UK",
  ],
};

/* ─────────────────────────────────────────────
   JSON-LD — WebPage + BreadcrumbList
───────────────────────────────────────────── */
const barRefrigeration1PageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://ilktechnology.com/products/bar-refrigeration-1/#webpage",
  url: "https://ilktechnology.com/products/bar-refrigeration-1",
  name: "TBR32-RISZ1-L-B-G-2 Bar Refrigerator UK — ILK Technology",
  description:
    "ILK Technology supplies the TBR32-RISZ1-L-B-G-2 bar refrigerator — black exterior, 1 glass swing door, 290L capacity, R290 refrigerant, 7-year warranty.",
  isPartOf: {
    "@id": "https://ilktechnology.com/#website",
  },
  about: {
    "@id": "https://ilktechnology.com/products/bar-refrigeration-1/#product",
  },
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
        name: "Products",
        item: "https://ilktechnology.com/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Bar Refrigeration",
        item: "https://ilktechnology.com/products/bar-refrigeration-1",
      },
    ],
  },
  inLanguage: "en-GB",
};

/* ─────────────────────────────────────────────
   JSON-LD — Product (spec data pulled from content.tsx)
───────────────────────────────────────────── */
const tbr32ProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://ilktechnology.com/products/bar-refrigeration-1/#product",
  name: "TBR32-RISZ1-L-B-G-2 Bar Refrigerator",
  image: "https://ilktechnology.com/media.png",
  description:
    "Black exterior bar refrigerator with 1 glass swing door, 290 litre gross volume, R290 refrigerant, automatic defrost, and 3 adjustable shelves. 7-year warranty covering parts, compressor and labour.",
  sku: "TBR32-RISZ1-L-B-G-2",
  brand: { "@type": "Brand", name: "ILK Technology" },
  category: "Bar Refrigerators",
  width: { "@type": "QuantitativeValue", value: 813, unitCode: "MMT" },
  depth: { "@type": "QuantitativeValue", value: 631, unitCode: "MMT" },
  height: { "@type": "QuantitativeValue", value: 881, unitCode: "MMT" },
  weight: { "@type": "QuantitativeValue", value: 121, unitCode: "KGM" },
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Temperature Range",
      value: "0.5°C to 3.3°C",
    },
    { "@type": "PropertyValue", name: "Refrigerant", value: "R290" },
    { "@type": "PropertyValue", name: "Gross Volume", value: "290 Litres" },
    { "@type": "PropertyValue", name: "Shelves Supplied", value: "3" },
    { "@type": "PropertyValue", name: "Shelf Size", value: "450 x 458 mm" },
    { "@type": "PropertyValue", name: "Defrost Type", value: "Automatic" },
    {
      "@type": "PropertyValue",
      name: "Warranty",
      value: "7 Years — Parts, Compressor & Labour",
    },
  ],
};

/* ─────────────────────────────────────────────
   JSON-LD — FAQ (targets long-tail question queries)
───────────────────────────────────────────── */
const tbr32FaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the temperature range of the TBR32-RISZ1 bar refrigerator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The TBR32-RISZ1-L-B-G-2 operates between 0.5°C and 3.3°C, suitable for chilling bottles and drinks behind the bar.",
      },
    },
    {
      "@type": "Question",
      name: "What refrigerant does the TBR32-RISZ1 use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It uses R290, a natural, low-GWP refrigerant, with automatic defrost fitted as standard.",
      },
    },
    {
      "@type": "Question",
      name: "How much storage does the TBR32-RISZ1 bar refrigerator offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It has a 290 litre gross volume with 3 adjustable shelves measuring 450 x 458mm each, within a 730mm net internal height.",
      },
    },
    {
      "@type": "Question",
      name: "What warranty comes with the TBR32-RISZ1?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The TBR32-RISZ1 comes with a 7-year warranty covering parts, compressor, and labour.",
      },
    },
    {
      "@type": "Question",
      name: "Does the TBR32-RISZ1 come with castors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Levelling screws are included as standard. Castors are available as an optional extra, sold separately.",
      },
    },
  ],
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function BarRefrigeration1Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(barRefrigeration1PageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(tbr32ProductSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tbr32FaqSchema) }}
      />
      <TBR32Content />
    </>
  );
}