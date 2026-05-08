import type { Metadata } from "next";
import Osaka3SCContent from "./content";

/* ─────────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Arneg Osaka 3 SC | Vertical Glass-Door Multideck | ILK Technology",
  description:
    "Osaka 3 SC — vertical glass-door multideck with advanced air system, LED door lighting, dual hinged glass doors and remote cooling. Pre-order (10 week lead time). Supplied and installed across the UK by ILK Technology.",
  alternates: { canonical: "https://ilktechnology.com/products/osaka-3-sc" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ilktechnology.com/products/osaka-3-sc",
    title: "Arneg Osaka 3 SC Vertical Glass-Door Multideck | ILK Technology UK",
    description:
      "Discover the Arneg Osaka 3 SC — advanced air system glass-door multideck with dual hinged glass doors, LED door lighting and remote cooling. Pre-order with 10-week lead time; UK supply and installation by ILK Technology.",
    images: [
      {
        url: "https://ilktechnology.com/pro5.png",
        width: 1200,
        height: 800,
        alt: "Arneg Osaka 3 SC Vertical Glass-Door Multideck — ILK Technology UK",
        type: "image/png",
      },
    ],
  },
  keywords: [
    "Osaka 3 SC",
    "Arneg Osaka 3 SC",
    "vertical glass-door multideck",
    "advanced air system refrigeration",
    "open chiller multideck UK",
    "LED door lighting",
    "dual hinged glass doors",
    "ILK Technology Osaka 3 SC",
    "pre-order refrigeration cabinet",
  ],
};

/* ─────────────────────────────────────────────
   JSON-LD — WebPage
───────────────────────────────────────────── */
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://ilktechnology.com/products/osaka-3-sc/#webpage",
  url: "https://ilktechnology.com/products/osaka-3-sc",
  name: "Arneg Osaka 3 SC Vertical Glass-Door Multideck | ILK Technology",
  description:
    "Product page for the Arneg Osaka 3 SC vertical glass-door multideck cabinet. Specifications, dimensions, RAL finishes and pre-order details are provided. Supplied and installed across the UK by ILK Technology.",
  inLanguage: "en-GB",
  isPartOf: {
    "@type": "WebSite",
    "@id": "https://ilktechnology.com/#website",
    url: "https://ilktechnology.com",
    name: "ILK Technology",
    publisher: { "@id": "https://ilktechnology.com/#organization" },
  },
  about: {
    "@type": "Product",
    name: "Arneg Osaka 3 SC",
    description:
      "A vertical glass-door multideck refrigeration cabinet by Arneg with an advanced air system, dual hinged glass doors, LED door lighting and remote cooling. Pre-order product with a 10-week lead time.",
  },
  breadcrumb: { "@id": "https://ilktechnology.com/products/osaka-3-sc/#breadcrumb" },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: "https://ilktechnology.com/pro5.png",
    width: 1200,
    height: 800,
  },
  publisher: { "@id": "https://ilktechnology.com/#organization" },
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
  "@id": "https://ilktechnology.com/products/osaka-3-sc/#breadcrumb",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://ilktechnology.com" },
    { "@type": "ListItem", position: 2, name: "Products", item: "https://ilktechnology.com/products" },
    { "@type": "ListItem", position: 3, name: "Osaka 3 SC", item: "https://ilktechnology.com/products/osaka-3-sc" },
  ],
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Osaka3SCPage() {
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
      <Osaka3SCContent />
    </>
  );
}