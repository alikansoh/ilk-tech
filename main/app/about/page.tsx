import type { Metadata } from "next";
import AboutContent from "./content";

/* ─────────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "About Us | Commercial Refrigeration Experts Since 2005",
  description:
    "Meet the ILK Technology team — 20+ years of commercial refrigeration expertise. Authorised UK distribution partner for Arneg, Oscartielle, Intrac and Incold. Based in Wembley, serving the whole of the UK.",
  alternates: {
    canonical: "https://ilktechnology.com/about",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ilktechnology.com/about",
    title: "About ILK Technology | Commercial Refrigeration Experts Since 2005",
    description:
      "20+ years of refrigeration expertise. Authorised UK distributor for Arneg, Oscartielle, Intrac and Incold. A team built on quality, customer care and sustainability.",
    images: [
      {
        url: "https://ilktechnology.com/og-default.png",
        width: 1200,
        height: 630,
        alt: "ILK Technology team — Commercial Refrigeration Specialists, Wembley UK",
        type: "image/png",
      },
    ],
  },
  keywords: [
    "ILK Technology about",
    "commercial refrigeration specialists UK",
    "Arneg UK distribution partner",
    "refrigeration engineers Wembley",
    "20 years refrigeration experience",
    "Oscartielle UK distributor",
    "Intrac UK",
    "Incold UK",
    "retail refrigeration experts",
  ],
};

/* ─────────────────────────────────────────────
   JSON-LD — About page breadcrumb + WebPage
───────────────────────────────────────────── */
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://ilktechnology.com/about/#webpage",
  url: "https://ilktechnology.com/about",
  name: "About ILK Technology — Commercial Refrigeration Experts",
  description:
    "Learn about ILK Technology, the UK's authorised Arneg distribution partner with 20+ years of commercial refrigeration expertise based in Wembley.",
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
        name: "About Us",
        item: "https://ilktechnology.com/about",
      },
    ],
  },
  inLanguage: "en-GB",
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <AboutContent />
    </>
  );
}