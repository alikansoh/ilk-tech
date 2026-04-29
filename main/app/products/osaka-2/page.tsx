import type { Metadata } from "next";
import Osaka2Content from "./content";

/* ─────────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Arneg Osaka 2 | Remote Multideck Refrigeration Cabinet | ILK Technology",
  description:
    "Explore the Arneg Osaka 2 remote multideck refrigeration cabinet in Elegant White. Dual-glass doors, LED canopy, multiplexed compatibility, +1 to +4°C. Widths from 1250mm to 3750mm. Supplied and installed across the UK by ILK Technology.",
  alternates: {
    canonical: "https://ilktechnology.com/products/osaka-2",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ilktechnology.com/products/osaka-2",
    title: "Arneg Osaka 2 Remote Multideck Cabinet | ILK Technology UK",
    description:
      "Discover the Arneg Osaka 2 in Elegant White — remote multideck refrigeration with dual-glass doors, LED canopy, multiplexed system compatibility and precision temperature control. UK supply and installation by ILK Technology.",
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
    "Arneg Osaka 2 specifications",
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
    "multideck cabinet technical specifications",
    "remote refrigeration display cabinet",
  ],
};

/* ─────────────────────────────────────────────
   JSON-LD — WebPage (BrochurePage / ItemPage)
───────────────────────────────────────────── */
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://ilktechnology.com/products/osaka-2/#webpage",
  url: "https://ilktechnology.com/products/osaka-2",
  name: "Arneg Osaka 2 Remote Multideck Refrigeration Cabinet | ILK Technology",
  description:
    "Brochure page for the Arneg Osaka 2 remote multideck refrigeration cabinet in Elegant White. Covering specifications, dimensions, features and UK supply by ILK Technology.",
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
    name: "Arneg Osaka 2",
    description:
      "A remote multideck refrigeration cabinet manufactured by Arneg, available in Elegant White with dual-glass doors, LED canopy, and multiplexed system compatibility.",
  },
  breadcrumb: {
    "@id": "https://ilktechnology.com/products/osaka-2/#breadcrumb",
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: "https://ilktechnology.com/pro2.png",
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
  "@id": "https://ilktechnology.com/products/osaka-2/#breadcrumb",
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
      <Osaka2Content />
    </>
  );
}