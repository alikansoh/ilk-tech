import type { Metadata } from "next";
import Osaka3Content from "./content";

/* ─────────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Arneg Osaka 3 | Remote Multideck Refrigeration Cabinet UK",
  description:
    "The Arneg Osaka 3 remote multideck cabinet in Anthracite Grey — dual-glass doors, multiplexed compatible, LED canopy, +1 to +4°C. Available in 1250mm to 3750mm widths. UK supply and installation by ILK Technology.",
  alternates: {
    canonical: "https://ilktechnology.com/products/osaka-3",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ilktechnology.com/products/osaka-3",
    title: "Arneg Osaka 3 Remote Multideck Cabinet | ILK Technology UK",
    description:
      "Arneg Osaka 3 in Anthracite Grey. Remote multideck refrigeration cabinet with dual-glass doors, LED canopy, multiplexed compatibility and mirrored end walls. UK supply by ILK Technology.",
    images: [
      {
        url: "https://ilktechnology.com/og-default.png",
        width: 1200,
        height: 630,
        alt: "Arneg Osaka 3 Remote Multideck Refrigeration Cabinet in Anthracite Grey — ILK Technology UK",
        type: "image/png",
      },
    ],
  },
  keywords: [
    "Arneg Osaka 3",
    "Arneg Osaka 3 UK",
    "Arneg Osaka 3 Anthracite Grey",
    "remote multideck cabinet UK",
    "Arneg multideck refrigeration",
    "multiplexed refrigeration cabinet UK",
    "dual glass door chilled cabinet UK",
    "supermarket refrigeration cabinet UK",
    "commercial refrigeration multideck UK",
    "ILK Technology Arneg",
    "Arneg refrigeration UK distributor",
    "Arneg Osaka 3 vs Osaka 2",
  ],
};

/* ─────────────────────────────────────────────
   JSON-LD — Product schema
───────────────────────────────────────────── */
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://ilktechnology.com/products/osaka-3/#product",
  name: "Arneg Osaka 3 Remote Multideck Cabinet — Anthracite Grey",
  description:
    "The Arneg Osaka 3 in Anthracite Grey brings industrial confidence to the chilled aisle — multiplexed system compatibility, mirrored end walls, and precision temperature control in one authoritative package.",
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
    "https://ilktechnology.com/pro3.png",
    "https://ilktechnology.com/og-default.png",
  ],
  color: "Anthracite Grey",
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
    url: "https://ilktechnology.com/products/osaka-3",
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
      name: "Arneg Osaka 3",
      item: "https://ilktechnology.com/products/osaka-3",
    },
  ],
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Osaka3Page() {
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
      <Osaka3Content />
    </>
  );
}