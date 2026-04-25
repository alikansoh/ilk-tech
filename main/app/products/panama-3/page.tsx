import type { Metadata } from "next";
import Panama3Content from "./content";

/* ─────────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Arneg Panama 3 | Open Chiller Multideck Cabinet UK",
  description:
    "The Arneg Panama 3 open chiller multideck in Anthracite Grey — manual blind system, low-energy EC fans, LED canopy, +1 to +4°C. Available in 1250mm to 3750mm widths. UK supply and installation by ILK Technology.",
  alternates: {
    canonical: "https://ilktechnology.com/products/panama-3",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ilktechnology.com/products/panama-3",
    title: "Arneg Panama 3 Open Chiller Multideck Cabinet | ILK Technology UK",
    description:
      "Arneg Panama 3 in Anthracite Grey. Open chiller multideck with manual night blind, low-energy EC fans, LED canopy and remote cooling. UK supply and installation by ILK Technology.",
    images: [
      {
        url: "https://ilktechnology.com/og-default.png",
        width: 1200,
        height: 630,
        alt: "Arneg Panama 3 Open Chiller Multideck Cabinet in Anthracite Grey — ILK Technology UK",
        type: "image/png",
      },
    ],
  },
  keywords: [
    "Arneg Panama 3",
    "Arneg Panama 3 UK",
    "Arneg Panama 3 Anthracite Grey",
    "open chiller multideck UK",
    "open front refrigeration cabinet UK",
    "Arneg open multideck UK",
    "manual blind refrigeration cabinet",
    "EC fan chilled cabinet UK",
    "night blind supermarket cabinet UK",
    "supermarket open chiller UK",
    "commercial refrigeration open front UK",
    "ILK Technology Arneg Panama",
    "Arneg refrigeration UK distributor",
  ],
};

/* ─────────────────────────────────────────────
   JSON-LD — Product schema
───────────────────────────────────────────── */
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://ilktechnology.com/products/panama-3/#product",
  name: "Arneg Panama 3 Open Chiller Multideck Cabinet — Anthracite Grey",
  description:
    "The Panama 3 pairs a classic Arneg blind system with dual-glass doors and precision low-energy fans — a masterclass in disciplined refrigeration for the modern chilled aisle.",
  brand: {
    "@type": "Brand",
    name: "Arneg",
    url: "https://www.arneg.com/",
  },
  manufacturer: {
    "@type": "Organization",
    name: "Arneg",
    url: "https://www.arneg.com/",
  },
  image: [
    "https://ilktechnology.com/pro1.png",
    "https://ilktechnology.com/og-default.png",
  ],
  color: "Anthracite Grey",
  category: "Commercial Refrigeration > Open Chiller Multideck Cabinets",
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Temperature Range",
      value: "+1 to +4 °C",
    },
    {
      "@type": "PropertyValue",
      name: "Cooling Type",
      value: "Remote",
    },
    {
      "@type": "PropertyValue",
      name: "Lighting",
      value: "LED Canopy",
    },
    {
      "@type": "PropertyValue",
      name: "Doors",
      value: "Open Chiller",
    },
    {
      "@type": "PropertyValue",
      name: "Controller",
      value: "Electronic",
    },
    {
      "@type": "PropertyValue",
      name: "Pipework",
      value: "Top Entry",
    },
    {
      "@type": "PropertyValue",
      name: "Shelving",
      value: "Base + 5 × 450mm + EPOS",
    },
    {
      "@type": "PropertyValue",
      name: "Fan Type",
      value: "Low-Energy EC Fan",
    },
    {
      "@type": "PropertyValue",
      name: "End Walls",
      value: "Solid or Mirrored",
    },
    {
      "@type": "PropertyValue",
      name: "Manual Blind",
      value: "Included",
    },
    {
      "@type": "PropertyValue",
      name: "Solenoid Valve",
      value: "Not Included",
    },
    {
      "@type": "PropertyValue",
      name: "Height",
      value: "203 cm",
    },
    {
      "@type": "PropertyValue",
      name: "Depth",
      value: "75 cm",
    },
    {
      "@type": "PropertyValue",
      name: "Available Widths",
      value: "1250mm, 1875mm, 2500mm, 3750mm",
    },
  ],
  offers: {
    "@type": "Offer",
    url: "https://ilktechnology.com/products/panama-3",
    priceCurrency: "GBP",
    availability: "https://schema.org/InStock",
    seller: {
      "@id": "https://ilktechnology.com/#organization",
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
  },
};

/* ─────────────────────────────────────────────
   JSON-LD — BreadcrumbList
───────────────────────────────────────────── */
const breadcrumbSchema = {
  "@context": "https://schema.org",
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
      name: "Arneg Panama 3",
      item: "https://ilktechnology.com/products/panama-3",
    },
  ],
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Panama3Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Panama3Content />
    </>
  );
}