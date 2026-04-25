import type { Metadata } from "next";
import ContactContent from "./content";

/* ─────────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Contact Us | Get a Quote or Make an Enquiry",
  description:
    "Get in touch with ILK Technology — the UK's authorised Arneg distribution partner. Request a quote, ask about products, or get technical support. Based in Wembley, serving businesses UK-wide.",
  alternates: {
    canonical: "https://ilktechnology.com/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ilktechnology.com/contact",
    title: "Contact ILK Technology | Get a Quote or Make an Enquiry",
    description:
      "Reach our sales and technical team for product enquiries, quotes, and support. Authorised UK distributor for Arneg, Oscartielle, Intrac and Incold. Wembley, London.",
    images: [
      {
        url: "https://ilktechnology.com/og-default.png",
        width: 1200,
        height: 630,
        alt: "Contact ILK Technology — Commercial Refrigeration Specialists, Wembley UK",
        type: "image/png",
      },
    ],
  },
  keywords: [
    "contact ILK Technology",
    "commercial refrigeration quote UK",
    "Arneg refrigeration enquiry",
    "refrigeration supplier Wembley",
    "ILK Technology phone number",
    "ILK Technology email",
    "commercial refrigeration technical support UK",
    "Arneg cabinet quote",
    "cold room quote UK",
  ],
};

/* ─────────────────────────────────────────────
   JSON-LD — ContactPage + BreadcrumbList
───────────────────────────────────────────── */
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://ilktechnology.com/contact/#webpage",
  url: "https://ilktechnology.com/contact",
  name: "Contact ILK Technology — Commercial Refrigeration Enquiries",
  description:
    "Contact ILK Technology for product enquiries, quotes, technical support, and newsletter sign-up. Based in Wembley, London, serving businesses across the UK.",
  isPartOf: { "@id": "https://ilktechnology.com/#website" },
  about: { "@id": "https://ilktechnology.com/#organization" },
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
        name: "Contact Us",
        item: "https://ilktechnology.com/contact",
      },
    ],
  },
  inLanguage: "en-GB",
};

/* ─────────────────────────────────────────────
   JSON-LD — LocalBusiness with contact details
   (supplements the Organisation schema in root layout)
───────────────────────────────────────────── */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://ilktechnology.com/#organization",
  name: "ILK Technology",
  url: "https://ilktechnology.com",
  telephone: "+44-203-051-0367",
  email: "info@ilktechnology.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Poplar View, East Lane Business Park",
    addressLocality: "Wembley",
    addressRegion: "England",
    postalCode: "HA9 7RD",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.5654417,
    longitude: -0.3055085,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "17:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+44-203-051-0367",
      contactType: "sales",
      email: "sales@ilktechnology.com",
      areaServed: "GB",
      availableLanguage: "English",
    },
    {
      "@type": "ContactPoint",
      contactType: "technical support",
      email: "technical@ilktechnology.com",
      areaServed: "GB",
      availableLanguage: "English",
    },
  ],
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ContactContent />
    </>
  );
}