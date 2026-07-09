import type { Metadata } from "next";
import JEHallContent from "./content";

/* ─────────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title:
    "J&E Hall Fusion Condensing Units UK | Hybrid & Scroll Range — ILK Technology",
  description:
    "ILK Technology supplies the full J&E Hall Fusion condensing unit range — Fusion Hybrid and Fusion Scroll series, supporting A1 and A2L refrigerants (R448A/R449A). 32 model codes, Copeland scroll compressors, UK-wide supply.",
  alternates: {
    canonical: "https://ilktechnology.com/condensing-units",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ilktechnology.com/condensing-units",
    siteName: "ILK Technology",
    title:
      "J&E Hall Fusion Condensing Units UK | ILK Technology",
    description:
      "UK supplier of the J&E Hall Fusion condensing unit range — Hybrid and Scroll series, A1/A2L refrigerant compatible, Copeland scroll compressors, 32 model codes.",
    images: [
      {
        url: "https://ilktechnology.com/og-condensing-units.png",
        width: 1200,
        height: 630,
        alt: "J&E Hall Fusion Condensing Units — ILK Technology UK Supplier",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "J&E Hall Fusion Condensing Units UK | ILK Technology",
    description:
      "Fusion Hybrid and Fusion Scroll condensing units from J&E Hall. A1/A2L refrigerant compatible, Copeland scroll compressors, 32 model codes, supplied UK-wide.",
    images: ["https://ilktechnology.com/og-condensing-units.png"],
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
    // Brand + distributor intent
    "J&E Hall UK supplier",
    "J&E Hall condensing units UK",
    "J and E Hall Fusion range",
    "J&E Hall Fusion Hybrid",
    "J&E Hall Fusion Scroll",
    "buy J&E Hall condensing unit UK",
    "ILK Technology J&E Hall",

    // Category / product-type intent
    "commercial condensing unit UK",
    "refrigeration condensing unit supplier UK",
    "scroll condensing unit UK",
    "hybrid condensing unit UK",
    "Copeland scroll compressor condensing unit",
    "Tecumseh compressor condensing unit UK",
    "low temperature condensing unit UK",
    "EVI condensing unit UK",
    "micro-channel condenser coil unit",

    // Refrigerant / compliance intent
    "A2L refrigerant condensing unit UK",
    "R448A condensing unit",
    "R449A condensing unit",
    "F-Gas compliant condensing unit UK",
    "A1 A2L refrigerant compatible condensing unit",

    // Model / SKU intent (long-tail)
    "JEHR 0050 H1 M1",
    "JEHR 0113 H1 M1",
    "JEHS 0200 B2 M",
    "JEHS 0400 B3 M",
    "JEHS 1000 B4 M",
    "JEHSDT 1600 B6 M",
    "JEHS 0951 EVI",
    "JEHS 1400 EVI low temp",

    // Sector / use-case intent
    "condensing unit for cold room UK",
    "condensing unit for supermarket refrigeration",
    "condensing unit replacement UK",
    "refrigeration engineer condensing unit supplier",

    // Company / heritage
    "J&E Hall British refrigeration",
    "J&E Hall 1785 refrigeration history",
  ],
};

/* ─────────────────────────────────────────────
   JSON-LD — WebPage + BreadcrumbList
───────────────────────────────────────────── */
const condensingUnitsPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://ilktechnology.com/condensing-units/#webpage",
  url: "https://ilktechnology.com/condensing-units",
  name: "J&E Hall Fusion Condensing Units UK — ILK Technology",
  description:
    "ILK Technology is the UK supplier of the J&E Hall Fusion condensing unit range — Hybrid and Scroll series, supporting A1 and A2L refrigerants, with 32 model codes available.",
  isPartOf: {
    "@id": "https://ilktechnology.com/#website",
  },
  about: {
    "@id": "https://ilktechnology.com/#organization",
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
        name: "Our Brands",
        item: "https://ilktechnology.com/arneg",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "J&E Hall Condensing Units",
        item: "https://ilktechnology.com/condensing-units",
      },
    ],
  },
  inLanguage: "en-GB",
};

/* ─────────────────────────────────────────────
   JSON-LD — Brand
───────────────────────────────────────────── */
const jehBrandSchema = {
  "@context": "https://schema.org",
  "@type": "Brand",
  name: "J&E Hall",
  description:
    "J&E Hall has been at the heart of commercial refrigeration engineering since 1785, manufacturing precision condensing units including the Fusion Hybrid and Fusion Scroll ranges.",
};

/* ─────────────────────────────────────────────
   JSON-LD — ItemList of Product Series (rich results)
   NOTE: Uses @type "Thing" rather than "Product".
   Google's structured data validator requires every
   "Product" entity to include "offers", "review", or
   "aggregateRating". These are series-level descriptions
   (no live price or reviews), so declaring them as
   Product and faking those fields would violate Google's
   structured data guidelines. "Thing" still carries the
   entity/keyword context for SEO without triggering that
   validation error. "category" was dropped since it's a
   Product/Offer-specific field; the same information is
   already present in the description text.
───────────────────────────────────────────── */
const jehProductListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "J&E Hall Fusion Condensing Unit Range — ILK Technology",
  description:
    "Condensing units from the J&E Hall Fusion range, available through ILK Technology, UK supplier.",
  numberOfItems: 2,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Thing",
        name: "J&E Hall Fusion Hybrid Condensing Unit",
        description:
          "Small and medium capacity condensing units with Tecumseh compressor, supporting both A1 and A2L refrigerants (R448A/R449A) across 10 model codes with H1/H2 head sizes and medium/low temperature ranges.",
        url: "https://ilktechnology.com/condensing-units",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Thing",
        name: "J&E Hall Fusion Scroll Condensing Unit",
        description:
          "Medium to large capacity condensing units with Copeland scroll compressor, micro-channel condenser coils, IP55 panel, and EVI low-temperature options across 22 model codes and B2–B6 frame sizes.",
        url: "https://ilktechnology.com/condensing-units",
      },
    },
  ],
};

/* ─────────────────────────────────────────────
   JSON-LD — FAQ (targets long-tail question queries)
───────────────────────────────────────────── */
const jehFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does ILK Technology supply J&E Hall condensing units in the UK?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. ILK Technology supplies the full J&E Hall Fusion condensing unit range across the UK, including both the Fusion Hybrid and Fusion Scroll series.",
      },
    },
    {
      "@type": "Question",
      name: "What refrigerants do J&E Hall Fusion condensing units support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "J&E Hall Fusion condensing units support A1 refrigerants such as R448A and R449A, with the Fusion Hybrid series also compatible with A2L refrigerants for future-proofed compliance.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Fusion Hybrid and Fusion Scroll condensing units?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fusion Hybrid units use a Tecumseh compressor and are designed for small to medium capacity applications with A1/A2L refrigerant flexibility. Fusion Scroll units use a Copeland scroll compressor and cover medium to large capacity requirements, including EVI options for low-temperature applications.",
      },
    },
    {
      "@type": "Question",
      name: "How many J&E Hall Fusion model codes are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are 32 Fusion model codes available across the Hybrid and Scroll series, covering a wide range of capacities, head sizes, frame sizes, and temperature ranges.",
      },
    },
  ],
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function CondensingUnitsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(condensingUnitsPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jehBrandSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jehProductListSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jehFaqSchema) }}
      />
      <JEHallContent />
    </>
  );
}