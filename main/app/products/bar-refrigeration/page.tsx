import type { Metadata } from "next";
import TBR48Content from "./content";

/* ─────────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title:
    "TBR48-RISZ1 Bar Refrigerator UK | Black 2-Door Glass Bar Fridge — ILK Technology",
  description:
    "ILK Technology supplies the TBR48-RISZ1-L-B-GG-2 bar refrigerator — black exterior, 2 glass swing doors, 440L capacity, R290 refrigerant, 7-year warranty. UK-wide supply.",
  alternates: {
    canonical: "https://ilktechnology.com/products/bar-refrigeration",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ilktechnology.com/products/bar-refrigeration",
    siteName: "ILK Technology",
    title: "TBR48-RISZ1 Bar Refrigerator UK | ILK Technology",
    description:
      "Black exterior, 2 glass swing door bar refrigerator. 440L capacity, R290 refrigerant, 6 shelves, 7-year warranty. Supplied UK-wide by ILK Technology.",
    images: [
      {
        url: "https://ilktechnology.com/og-bar-refrigeration.png",
        width: 1200,
        height: 630,
        alt: "TBR48-RISZ1 Bar Refrigerator — ILK Technology UK Supplier",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TBR48-RISZ1 Bar Refrigerator UK | ILK Technology",
    description:
      "Black exterior, 2 glass door bar refrigerator. 440L, R290 refrigerant, 7-year warranty. Supplied UK-wide.",
    images: ["https://ilktechnology.com/og-bar-refrigeration.png"],
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
    "TBR48-RISZ1 bar refrigerator",
    "TBR48-RISZ1-L-B-GG-2",
    "buy TBR48 bar refrigerator UK",
    "ILK Technology bar refrigerator",

    // Category / product-type intent
    "bar refrigerator UK",
    "back bar cooler UK",
    "glass door bar fridge",
    "commercial bar fridge UK",
    "under counter bar refrigerator",
    "2 door glass bar fridge",
    "black bar refrigerator UK",
    "back bar bottle cooler UK",

    // Refrigerant / compliance intent
    "R290 refrigerator UK",
    "propane refrigerant bar fridge",
    "natural refrigerant commercial fridge",
    "low GWP bar refrigerator",
    "auto defrost bar refrigerator",

    // Capacity / spec intent (long-tail)
    "440 litre bar cooler",
    "6 shelf bar fridge",
    "440L bar refrigerator UK",
    "commercial fridge 0.5 to 3.3 degrees",

    // Sector / use-case intent
    "pub bar refrigerator",
    "nightclub bottle cooler",
    "restaurant back bar fridge",
    "hospitality refrigeration equipment UK",
    "commercial kitchen bar fridge",

    // Warranty / company
    "7 year warranty bar refrigerator",
    "bar fridge with warranty UK",
  ],
};

/* ─────────────────────────────────────────────
   JSON-LD — WebPage + BreadcrumbList
───────────────────────────────────────────── */
const barRefrigerationPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://ilktechnology.com/products/bar-refrigeration/#webpage",
  url: "https://ilktechnology.com/products/bar-refrigeration",
  name: "TBR48-RISZ1-L-B-GG-2 Bar Refrigerator UK — ILK Technology",
  description:
    "ILK Technology supplies the TBR48-RISZ1-L-B-GG-2 bar refrigerator — black exterior, 2 glass swing doors, 440L capacity, R290 refrigerant, 7-year warranty.",
  isPartOf: {
    "@id": "https://ilktechnology.com/#website",
  },
  about: {
    "@id": "https://ilktechnology.com/products/bar-refrigeration/#product",
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
        item: "https://ilktechnology.com/products/bar-refrigeration",
      },
    ],
  },
  inLanguage: "en-GB",
};

/* ─────────────────────────────────────────────
   JSON-LD — Product (spec data pulled from content.tsx)
───────────────────────────────────────────── */
const tbr48ProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://ilktechnology.com/products/bar-refrigeration/#product",
  name: "TBR48-RISZ1-L-B-GG-2 Bar Refrigerator",
  image: "https://ilktechnology.com/media1.png",
  description:
    "Black exterior bar refrigerator with 2 glass swing doors, 440 litre gross volume, R290 refrigerant, automatic defrost, and 6 adjustable shelves. 7-year warranty covering parts, compressor and labour.",
  sku: "TBR48-RISZ1-L-B-GG-2",
  brand: { "@type": "Brand", name: "ILK Technology" },
  category: "Bar Refrigerators",
  width: { "@type": "QuantitativeValue", value: 1219, unitCode: "MMT" },
  depth: { "@type": "QuantitativeValue", value: 631, unitCode: "MMT" },
  height: { "@type": "QuantitativeValue", value: 881, unitCode: "MMT" },
  weight: { "@type": "QuantitativeValue", value: 141, unitCode: "KGM" },
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Temperature Range",
      value: "0.5°C to 3.3°C",
    },
    { "@type": "PropertyValue", name: "Refrigerant", value: "R290" },
    { "@type": "PropertyValue", name: "Gross Volume", value: "440 Litres" },
    { "@type": "PropertyValue", name: "Shelves Supplied", value: "6" },
    { "@type": "PropertyValue", name: "Shelf Size", value: "394 x 458 mm" },
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
const tbr48FaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the temperature range of the TBR48-RISZ1 bar refrigerator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The TBR48-RISZ1-L-B-GG-2 operates between 0.5°C and 3.3°C, suitable for chilling bottles and drinks behind the bar.",
      },
    },
    {
      "@type": "Question",
      name: "What refrigerant does the TBR48-RISZ1 use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It uses R290, a natural, low-GWP refrigerant, with automatic defrost fitted as standard.",
      },
    },
    {
      "@type": "Question",
      name: "How much storage does the TBR48-RISZ1 bar refrigerator offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It has a 440 litre gross volume with 6 adjustable shelves measuring 394 x 458mm each, within a 730mm net internal height.",
      },
    },
    {
      "@type": "Question",
      name: "What warranty comes with the TBR48-RISZ1?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The TBR48-RISZ1 comes with a 7-year warranty covering parts, compressor, and labour.",
      },
    },
    {
      "@type": "Question",
      name: "Does the TBR48-RISZ1 come with castors?",
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
export default function BarRefrigerationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(barRefrigerationPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(tbr48ProductSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tbr48FaqSchema) }}
      />
      <TBR48Content />
    </>
  );
}