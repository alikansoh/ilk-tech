import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

/* ─────────────────────────────────────────────
   FONTS
───────────────────────────────────────────── */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

/* ─────────────────────────────────────────────
   SITE-WIDE CONSTANTS
───────────────────────────────────────────── */
const SITE_URL  = "https://ilktechnology.com";
const SITE_NAME = "ILK Technology";
const OG_IMAGE  = `${SITE_URL}/og-default.png`; // 1200×630 recommended

/* ─────────────────────────────────────────────
   VIEWPORT  (separate export — Next.js 14+)
───────────────────────────────────────────── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#001845",
};

/* ─────────────────────────────────────────────
   ROOT METADATA
   — pages override individual fields via
     their own `export const metadata`
───────────────────────────────────────────── */
export const metadata: Metadata = {
  /* ── Core ── */
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ILK Technology | Commercial Refrigeration & Arneg UK Distribution Partner",
    template: "%s | ILK Technology",
  },
  description:
    "ILK Technology is the UK's authorised Arneg distribution partner supplying commercial refrigeration cabinets, cold rooms, plug-in systems, checkouts and shelving. 20+ years experience. UK-wide delivery.",
  keywords: [
    "commercial refrigeration UK",
    "Arneg distribution partner UK",
    "Arneg dealer UK",
    "commercial refrigeration cabinets",
    "remote multideck cabinets",
    "Osaka 2 refrigeration",
    "Osaka 3 refrigeration",
    "Panama 3 display cabinet",
    "cold rooms UK",
    "plug-in refrigeration",
    "supermarket refrigeration",
    "retail refrigeration supplier",
    "Oscartielle UK",
    "Intrac UK",
    "Incold UK",
    "ILK Technology",
    "refrigeration Wembley",
    "commercial checkouts shelving",
  ],

  /* ── Canonical & alternates ── */
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-GB": SITE_URL,
    },
  },

  /* ── Authors & publisher ── */
  authors: [{ name: "ILK Technology", url: SITE_URL }],
  creator: "ILK Technology",
  publisher: "ILK Technology",

  /* ── Open Graph ── */
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "ILK Technology | Commercial Refrigeration & Arneg UK Distribution Partner",
    description:
      "Authorised UK distribution partner for Arneg, Oscartielle, Intrac and Incold. Commercial refrigeration cabinets, cold rooms, plug-in systems, checkouts and shelving. 20+ years experience.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "ILK Technology — Commercial Refrigeration Supplier and Arneg UK Distribution Partner",
        type: "image/png",
      },
    ],
  },

  /* ── Twitter / X card ── */
  

  /* ── Robots ── */
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ── Verification (add your codes once you have them) ── */
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_CODE",
    // bing: "REPLACE_WITH_BING_WEBMASTER_CODE",
  },

  /* ── App / PWA basics ── */
  applicationName: SITE_NAME,
  category: "Commercial Refrigeration",

  /* ── Icons ── */
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png",  sizes: "16x16",  type: "image/png" },
      { url: "/icon-32.png",  sizes: "32x32",  type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  /* ── Manifest ── */
  manifest: "/site.webmanifest",
};

/* ─────────────────────────────────────────────
   STRUCTURED DATA  (JSON-LD)
   Organisation + LocalBusiness schema
───────────────────────────────────────────── */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: "ILK Technology",
  legalName: "ILK Technology Ltd",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
    width: 200,
    height: 60,
  },
  image: OG_IMAGE,
  description:
    "ILK Technology is the UK's authorised distribution partner for Arneg, Oscartielle, Intrac and Incold, supplying commercial refrigeration cabinets, cold rooms, plug-in systems, checkouts and shelving to retailers and food service businesses across the UK.",
  foundingDate: "2005",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 10,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "2 Poplar View, East Lane Business Park",
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
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+44-203-051-0367",
      contactType: "sales",
      areaServed: "GB",
      availableLanguage: "English",
      hoursAvailable: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
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
    },
    {
      "@type": "ContactPoint",
      email: "sales@ilktechnology.com",
      contactType: "sales",
      areaServed: "GB",
    },
    {
      "@type": "ContactPoint",
      email: "technical@ilktechnology.com",
      contactType: "technical support",
      areaServed: "GB",
    },
  ],
  telephone: "+44-203-051-0367",
  email: "info@ilktechnology.com",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
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
  sameAs: [
    // Add your social profiles here:
     "https://www.linkedin.com/company/ilk-technology27/",
    // "https://www.facebook.com/ilktechnology",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Commercial Refrigeration Products",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Remote Multideck Cabinets",
        description: "Arneg Osaka 2, Osaka 3 remote vertical multideck refrigeration cabinets",
      },
      {
        "@type": "OfferCatalog",
        name: "Open Multideck Cabinets",
        description: "Arneg Panama 3 open vertical multideck display cabinets",
      },
      {
        "@type": "OfferCatalog",
        name: "Cold Rooms",
        description: "Commercial cold rooms and isothermal solutions",
      },
      {
        "@type": "OfferCatalog",
        name: "Plug-in Refrigeration",
        description: "Self-contained plug-in refrigeration and freezer units",
      },
      {
        "@type": "OfferCatalog",
        name: "Checkouts & Shelving",
        description: "Retail checkout counters and shelving systems",
      },
    ],
  },
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  knowsAbout: [
    "Commercial Refrigeration",
    "Retail Display Cabinets",
    "Cold Rooms",
    "Supermarket Refrigeration",
    "Arneg Products",
    "Retail Fit-out",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "ILK Technology",
  description: "UK Commercial Refrigeration Supplier and Authorised Arneg Distribution Partner",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en-GB",
};

/* ─────────────────────────────────────────────
   ROOT LAYOUT
───────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
    >
      <head>
        {/* ── Preconnect to external origins ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ── Geo / region meta ── */}
        <meta name="geo.region"      content="GB" />
        <meta name="geo.placename"   content="Wembley, London" />
        <meta name="geo.position" content="51.5654417;-0.3055085" />
<meta name="ICBM" content="51.5654417, -0.3055085" />

        {/* ── DC meta (Dublin Core — extra signals) ── */}
        <meta name="DC.title"        content="ILK Technology — Commercial Refrigeration & Arneg UK Distribution Partner" />
        <meta name="DC.description"  content="Authorised UK distribution partner for Arneg, Oscartielle, Intrac and Incold. 20+ years experience in commercial refrigeration." />
        <meta name="DC.subject"      content="Commercial Refrigeration, Arneg, Retail Equipment, Cold Rooms" />
        <meta name="DC.language"     content="en-GB" />
        <meta name="DC.coverage"     content="United Kingdom" />
        <meta name="DC.publisher"    content="ILK Technology Ltd" />

        {/* ── JSON-LD structured data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>

      <body className="min-h-full flex flex-col">
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}