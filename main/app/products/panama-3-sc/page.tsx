import type { Metadata } from "next";
import Panama3SCContent from "./content";

/* ─────────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Arneg Panama 3 SC | Vertical Open Multideck | ILK Technology",
  description:
    "Panama 3 SC — vertical open multideck with low-energy fans, LED canopy and manual night blind. Pre-order (10 week lead time). Supplied and installed across the UK by ILK Technology.",
  alternates: { canonical: "https://ilktechnology.com/products/panama-3-sc" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ilktechnology.com/products/panama-3-sc",
    title: "Arneg Panama 3 SC Vertical Open Multideck | ILK Technology UK",
    description:
      "Discover the Arneg Panama 3 SC — low-energy fan vertical open multideck with manual blind, LED canopy and remote cooling. Pre-order with 10-week lead time; UK supply and installation by ILK Technology.",
    images: [
      {
        url: "https://ilktechnology.com/pro4.png",
        width: 1200,
        height: 800,
        alt: "Arneg Panama 3 SC Vertical Open Multideck — ILK Technology UK",
        type: "image/png",
      },
    ],
  },
  keywords: [
    "Panama 3 SC",
    "Arneg Panama 3 SC",
    "vertical open multideck",
    "low-energy fans refrigeration",
    "open chiller multideck UK",
    "manual blind refrigeration cabinet",
    "ILK Technology Panama 3 SC",
    "pre-order refrigeration cabinet",
  ],
};

/* ─────────────────────────────────────────────
   JSON-LD — WebPage (about set to generic Thing — not Product)
───────────────────────────────────────────── */
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://ilktechnology.com/products/panama-3-sc/#webpage",
  url: "https://ilktechnology.com/products/panama-3-sc",
  name: "Arneg Panama 3 SC Vertical Open Multideck | ILK Technology",
  description:
    "Brochure page for the Arneg Panama 3 SC vertical open multideck cabinet. Specifications, dimensions, RAL finishes and pre-order details are provided. Supplied and installed across the UK by ILK Technology.",
  inLanguage: "en-GB",
  isPartOf: {
    "@type": "WebSite",
    "@id": "https://ilktechnology.com/#website",
    url: "https://ilktechnology.com",
    name: "ILK Technology",
    publisher: { "@id": "https://ilktechnology.com/#organization" },
  },
  // NOTE: changed from Product -> Thing to avoid being classified as a product page
  about: {
    "@type": "Thing",
    name: "Panama 3 SC brochure",
    description:
      "Brochure and specification overview for the Arneg Panama 3 SC vertical open multideck cabinet. Not a storefront product listing or offer."
  },
  breadcrumb: { "@id": "https://ilktechnology.com/products/panama-3-sc/#breadcrumb" },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: "https://ilktechnology.com/pro4.png",
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
  "@id": "https://ilktechnology.com/products/panama-3-sc/#breadcrumb",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://ilktechnology.com" },
    { "@type": "ListItem", position: 2, name: "Products", item: "https://ilktechnology.com/products" },
    { "@type": "ListItem", position: 3, name: "Panama 3 SC", item: "https://ilktechnology.com/products/panama-3-sc" },
  ],
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Panama3SCPage() {
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
      <Panama3SCContent />
    </>
  );
}