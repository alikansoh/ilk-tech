import type { Metadata } from "next";
import Panama3Content from "./content";

/* ─────────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Arneg Panama 3 | Open Chiller Multideck Cabinet | ILK Technology",
  description:
    "Explore the Arneg Panama 3 open chiller multideck cabinet in Anthracite Grey. Manual blind system, low-energy EC fans, LED canopy, +1 to +4°C. Widths from 1250mm to 3750mm. Supplied and installed across the UK by ILK Technology.",
  alternates: {
    canonical: "https://ilktechnology.com/products/panama-3",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ilktechnology.com/products/panama-3",
    title: "Arneg Panama 3 Open Chiller Multideck Cabinet | ILK Technology UK",
    description:
      "Discover the Arneg Panama 3 in Anthracite Grey — open chiller multideck with manual night blind, low-energy EC fans, LED canopy and remote cooling. UK supply and installation by ILK Technology.",
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
    "Arneg Panama 3 specifications",
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
    "open multideck cabinet technical specifications",
  ],
};

/* ─────────────────────────────────────────────
   JSON-LD — WebPage
───────────────────────────────────────────── */
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://ilktechnology.com/products/panama-3/#webpage",
  url: "https://ilktechnology.com/products/panama-3",
  name: "Arneg Panama 3 Open Chiller Multideck Cabinet | ILK Technology",
  description:
    "Brochure page for the Arneg Panama 3 open chiller multideck cabinet in Anthracite Grey. Covering specifications, dimensions, features and UK supply by ILK Technology.",
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
    name: "Arneg Panama 3",
    description:
      "An open chiller multideck refrigeration cabinet manufactured by Arneg, available in Anthracite Grey with a manual blind system, low-energy EC fans, LED canopy, and remote cooling.",
  },
  breadcrumb: {
    "@id": "https://ilktechnology.com/products/panama-3/#breadcrumb",
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: "https://ilktechnology.com/pro1.png",
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
  "@id": "https://ilktechnology.com/products/panama-3/#breadcrumb",
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
      <Panama3Content />
    </>
  );
}