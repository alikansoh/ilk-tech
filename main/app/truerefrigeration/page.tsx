import type { Metadata } from "next";
import TrueRefrigerationContent from "./content";

/* ─────────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title:
    "True Refrigeration UK | Authorised Distributor — Commercial Fridges, Freezers & Prep Tables",
  description:
    "ILK Technology is the authorised UK distributor for True Refrigeration. Shop undercounter fridges & freezers, pizza prep tables, sandwich/salad units, upright refrigerators, freezers and glass door merchandisers — all backed by a 7-year parts, compressor & labour warranty.",
  alternates: {
    canonical: "https://ilktechnology.com/truerefrigeration",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ilktechnology.com/truerefrigeration",
    siteName: "ILK Technology",
    title:
      "True Refrigeration UK | Authorised Distributor — ILK Technology",
    description:
      "Authorised UK distributor for True Refrigeration. Commercial undercounter fridges, freezers, pizza prep tables, sandwich/salad units, upright refrigeration and glass door merchandisers — 7-year warranty, UK-wide delivery.",
    images: [
      {
        url: "https://ilktechnology.com/og-true-refrigeration.png",
        width: 1200,
        height: 630,
        alt: "True Refrigeration — Authorised UK Distributor, ILK Technology",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "True Refrigeration UK | Authorised Distributor — ILK Technology",
    description:
      "Commercial refrigeration from True — undercounter units, prep tables, upright fridges & freezers, glass door merchandisers. 7-year warranty across the UK, Europe & Ireland.",
    images: ["https://ilktechnology.com/og-true-refrigeration.png"],
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
    // Brand + distributor intent (highest commercial value)
    "True Refrigeration UK distributor",
    "True Refrigeration authorised dealer UK",
    "True commercial refrigeration UK",
    "True fridges UK supplier",
    "buy True Refrigeration UK",

    // Category / product-type intent
    "commercial undercounter fridge UK",
    "commercial undercounter freezer UK",
    "pizza prep table UK",
    "sandwich prep table UK",
    "salad prep table UK",
    "mega top prep counter UK",
    "commercial upright freezer UK",
    "commercial upright refrigerator UK",
    "glass door merchandiser fridge UK",
    "hydrocarbon refrigerant commercial fridge",

    // Model / SKU intent (long-tail, high conversion)
    "True TUC-48-HC UK",
    "True TUC-27F-HC UK",
    "True TPP-AT2-93-HC pizza prep table",
    "True TSSU-60-24M-B-ST-FGLID-HC",
    "True TSSU-72-30M-B-ST-HC",
    "True TGN-2F-2S upright freezer",
    "True GDM-35-HC glass door merchandiser",
    "True T-23-HC upright refrigerator",

    // Sector / use-case intent
    "commercial refrigeration for restaurants UK",
    "commercial refrigeration for catering UK",
    "commercial fridge for cafes UK",
    "commercial refrigeration for bars UK",
    "fast food refrigeration equipment UK",

    // Warranty / trust intent
    "7 year warranty commercial refrigeration UK",
    "commercial fridge warranty UK Europe Ireland",

    // Custom / bespoke intent
    "custom colour commercial refrigerator",
    "bespoke branded fridge cabinet UK",

    // Distributor / company
    "ILK Technology True Refrigeration",
  ],
};

/* ─────────────────────────────────────────────
   JSON-LD — WebPage + BreadcrumbList
───────────────────────────────────────────── */
const truePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://ilktechnology.com/truerefrigeration/#webpage",
  url: "https://ilktechnology.com/truerefrigeration",
  name: "True Refrigeration UK — Authorised Distributor | ILK Technology",
  description:
    "ILK Technology is the authorised UK distributor for True Refrigeration — supplying undercounter fridges & freezers, pizza prep tables, sandwich/salad units, upright refrigeration and glass door merchandisers, backed by a 7-year warranty.",
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
        name: "True Refrigeration",
        item: "https://ilktechnology.com/truerefrigeration",
      },
    ],
  },
  inLanguage: "en-GB",
};

/* ─────────────────────────────────────────────
   JSON-LD — Organization / Brand relationship
───────────────────────────────────────────── */
const trueBrandSchema = {
  "@context": "https://schema.org",
  "@type": "Brand",
  name: "True Refrigeration",
  url: "https://truerefrigeration.co.uk",
  logo: "https://ilktechnology.com/True_Refrigeration_Logo_Silver_RGB.png",
  description:
    "True Refrigeration is a global leader in commercial refrigeration and catering equipment, manufacturing durable, energy-efficient units for the hospitality and foodservice industry for over 80 years.",
};

/* ─────────────────────────────────────────────
   JSON-LD — ItemList of Products (rich results)
───────────────────────────────────────────── */
const trueProductListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "True Refrigeration Product Range — ILK Technology",
  description:
    "Commercial refrigeration units from True Refrigeration, available through ILK Technology, the authorised UK distributor.",
  numberOfItems: 8,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "True TUC-48-HC Undercounter Refrigerator",
        sku: "TUC-48-HC",
        brand: { "@type": "Brand", name: "True Refrigeration" },
        description:
          "48-inch two-door undercounter refrigerator with hydrocarbon refrigerant, stainless steel exterior, built for heavy commercial use.",
        category: "Undercounter Refrigeration",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "True TUC-27F-HC Undercounter Freezer",
        sku: "TUC-27F-HC",
        brand: { "@type": "Brand", name: "True Refrigeration" },
        description:
          "27-inch single-door undercounter freezer with digital temperature display and full commercial specification.",
        category: "Undercounter Refrigeration",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Product",
        name: "True TPP-AT2-93-HC Pizza Prep Table",
        sku: "TPP-AT2-93-HC",
        brand: { "@type": "Brand", name: "True Refrigeration" },
        description:
          "93-inch three-door pizza prep table with dual mega-top pans and hinged lids for high-volume pizza operations.",
        category: "Prep Tables",
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Product",
        name: "True TSSU-60-24M-B-ST-FGLID-HC Sandwich/Salad Mega Top",
        sku: "TSSU-60-24M-B-ST-FGLID-HC",
        brand: { "@type": "Brand", name: "True Refrigeration" },
        description:
          "60-inch two-door mega top with full glass lid, ideal for salad bars and open food presentation.",
        category: "Prep Tables",
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Product",
        name: "True TSSU-72-30M-B-ST-HC Sandwich/Salad Unit",
        sku: "TSSU-72-30M-B-ST-HC",
        brand: { "@type": "Brand", name: "True Refrigeration" },
        description:
          "72-inch three-door sandwich and salad prep unit with 30 pan positions for demanding service environments.",
        category: "Prep Tables",
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "Product",
        name: "True TGN-2F-2S Upright Freezer",
        sku: "TGN-2F-2S",
        brand: { "@type": "Brand", name: "True Refrigeration" },
        description:
          "49-inch two-section upright freezer with low-profile top mount compressor and adjustable shelving.",
        category: "Upright Refrigeration",
      },
    },
    {
      "@type": "ListItem",
      position: 7,
      item: {
        "@type": "Product",
        name: "True GDM-35-HC Glass Door Merchandiser",
        sku: "GDM-35-HC~FGD01",
        brand: { "@type": "Brand", name: "True Refrigeration" },
        description:
          "35 cu. ft. glass door merchandiser with LED lighting for high-visibility retail display.",
        category: "Upright Refrigeration",
      },
    },
    {
      "@type": "ListItem",
      position: 8,
      item: {
        "@type": "Product",
        name: "True T-23-HC Upright Refrigerator",
        sku: "T-23-HC",
        brand: { "@type": "Brand", name: "True Refrigeration" },
        description:
          "23 cu. ft. single-door upright refrigerator, the industry-standard unit for commercial kitchen refrigeration.",
        category: "Upright Refrigeration",
      },
    },
  ],
};

/* ─────────────────────────────────────────────
   JSON-LD — FAQ (targets long-tail question queries)
───────────────────────────────────────────── */
const trueFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is ILK Technology an authorised True Refrigeration distributor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. ILK Technology is an authorised UK distributor of True Refrigeration, supplying the full range of commercial refrigeration and catering equipment.",
      },
    },
    {
      "@type": "Question",
      name: "What warranty comes with True Refrigeration units bought through ILK Technology?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "True Refrigeration units purchased through ILK Technology include an extended 7-year warranty covering parts, compressor, and labour across the UK, Europe, and Ireland.",
      },
    },
    {
      "@type": "Question",
      name: "Can True Refrigeration cabinets be customised with different colours?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. True Refrigeration units can be finished in stainless steel or a range of colour options including green, blue, pink, red, orange, silver and black, with custom RAL colours available on request.",
      },
    },
    {
      "@type": "Question",
      name: "What refrigerant does True Refrigeration use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "True Refrigeration's commercial units use hydrocarbon (HC) refrigerant, chosen for its energy efficiency and lower environmental impact.",
      },
    },
  ],
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function TrueRefrigerationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(truePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(trueBrandSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(trueProductListSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(trueFaqSchema) }}
      />
      <TrueRefrigerationContent />
    </>
  );
}