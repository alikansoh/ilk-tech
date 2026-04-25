import type { Metadata } from "next";
import Osaka2Content from "./content";

/* ─────────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Arneg Osaka 2 | Remote Multideck Refrigeration Cabinet UK",
  description:
    "The Arneg Osaka 2 remote multideck cabinet in Elegant White — dual-glass doors, multiplexed compatible, LED canopy, +1 to +4°C. Available in 1250mm to 3750mm widths. UK supply and installation by ILK Technology.",
  alternates: {
    canonical: "https://ilktechnology.com/products/osaka-2",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ilktechnology.com/products/osaka-2",
    title: "Arneg Osaka 2 Remote Multideck Cabinet | ILK Technology UK",
    description:
      "Arneg Osaka 2 in Elegant White. Remote multideck refrigeration cabinet with dual-glass doors, LED canopy, multiplexed compatibility and precision temperature control. UK supply by ILK Technology.",
    images: [
      {
        url: "https://ilktechnology.com/og-default.png",
        width: 1200,
        height: 630,
        alt: "Arneg Osaka 2 Remote Multideck Refrigeration Cabinet — ILK Technology UK",
        type: "image/png",
      },
    ],
  },
  keywords: [
    "Arneg Osaka 2",
    "Arneg Osaka 2 UK",
    "remote multideck cabinet UK",
    "Arneg multideck refrigeration",
    "multiplexed refrigeration cabinet UK",
    "dual glass door refrigeration cabinet",
    "chilled display cabinet UK",
    "supermarket refrigeration cabinet UK",
    "Arneg Osaka 2 Elegant White",
    "commercial refrigeration multideck UK",
    "ILK Technology Arneg",
    "Arneg refrigeration UK distributor",
  ],
};

/* ─────────────────────────────────────────────
   JSON-LD — Product schema
───────────────────────────────────────────── */
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://ilktechnology.com/products/osaka-2/#product",
  name: "Arneg Osaka 2 Remote Multideck Cabinet — Elegant White",
  description:
    "The Arneg Osaka 2 in Elegant White brings refined clarity to the chilled aisle — multiplexed system compatibility, dual-glass doors, and precision temperature control in one clean, authoritative package.",
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
    "https://ilktechnology.com/pro2.png",
    "https://ilktechnology.com/og-default.png",
  ],
  color: "Elegant White",
  category: "Commercial Refrigeration > Remote Multideck Cabinets",
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
      value: "Hinged Dual-Glass",
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
      name: "Multiplexed",
      value: "Compatible",
    },
    {
      "@type": "PropertyValue",
      name: "End Walls",
      value: "Solid or Mirrored",
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
    url: "https://ilktechnology.com/products/osaka-2",
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
      name: "Arneg Osaka 2",
      item: "https://ilktechnology.com/products/osaka-2",
    },
  ],
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Osaka2Page() {
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
      <Osaka2Content />
    </>
  );
}