import type { Metadata } from "next";
import Osaka3Content from "./content";

/* ─────────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Arneg Osaka 3 | Remote Multideck Refrigeration Cabinet | ILK Technology",
  description:
    "Explore the Arneg Osaka 3 remote multideck refrigeration cabinet in Anthracite Grey. Dual-glass doors, LED canopy, multiplexed compatibility, mirrored end walls, +1 to +4°C. Widths from 1250mm to 3750mm. Supplied and installed across the UK by ILK Technology.",
  alternates: {
    canonical: "https://ilktechnology.com/products/osaka-3",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ilktechnology.com/products/osaka-3",
    title: "Arneg Osaka 3 Remote Multideck Cabinet | ILK Technology UK",
    description:
      "Discover the Arneg Osaka 3 in Anthracite Grey — remote multideck refrigeration with dual-glass doors, LED canopy, multiplexed system compatibility and mirrored end walls. UK supply and installation by ILK Technology.",
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
    "Arneg Osaka 3 specifications",
    "remote multideck cabinet UK",
    "Arneg multideck refrigeration",
    "multiplexed refrigeration cabinet UK",
    "dual glass door chilled cabinet UK",
    "supermarket refrigeration cabinet UK",
    "commercial refrigeration multideck UK",
    "ILK Technology Arneg",
    "Arneg refrigeration UK distributor",
    "Arneg Osaka 3 vs Osaka 2",
    "multideck cabinet technical specifications",
    "remote refrigeration display cabinet",
  ],
};

/* ─────────────────────────────────────────────
   JSON-LD — WebPage
───────────────────────────────────────────── */
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://ilktechnology.com/products/osaka-3/#webpage",
  url: "https://ilktechnology.com/products/osaka-3",
  name: "Arneg Osaka 3 Remote Multideck Refrigeration Cabinet | ILK Technology",
  description:
    "Brochure page for the Arneg Osaka 3 remote multideck refrigeration cabinet in Anthracite Grey. Covering specifications, dimensions, features and UK supply by ILK Technology.",
  inLanguage: "en-GB",
  isPartOf: {
    "@type": "WebSite",
    "@id": "https://ilktechnology.com/#website",
    url: "https://ilktechnology.com",
    name: "ILK Technology",
    publisher: {
      "@id": "https://ilktechnology.com/#organization",
    },
  },
  about: {
    "@type": "Thing",
    name: "Arneg Osaka 3",
    description:
      "A remote multideck refrigeration cabinet manufactured by Arneg, available in Anthracite Grey with dual-glass doors, LED canopy, mirrored end walls, and multiplexed system compatibility.",
  },
  breadcrumb: {
    "@id": "https://ilktechnology.com/products/osaka-3/#breadcrumb",
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: "https://ilktechnology.com/pro3.png",
    width: 1200,
    height: 800,
  },
  publisher: {
    "@id": "https://ilktechnology.com/#organization",
  },
};

/* ─────────────────────────────────────────────
   JSON-LD — Organization
───────────────────────────────────────────── */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://ilktechnology.com/#organization",
  name: "ILK Technology",
  url: "https://ilktechnology.com",
  logo: {
    "@type": "ImageObject",
    url: "https://ilktechnology.com/logo.png",
  },
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  description:
    "ILK Technology is a UK supplier and installer of commercial refrigeration equipment, including Arneg multideck cabinets.",
};

/* ─────────────────────────────────────────────
   JSON-LD — BreadcrumbList
───────────────────────────────────────────── */
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://ilktechnology.com/products/osaka-3/#breadcrumb",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Osaka3Content />
    </>
  );
}