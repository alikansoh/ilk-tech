import Image from "next/image";
import HeroSection from "@/components/Hero";
import LogoTicker from "@/components/logos";
import WhoWeAre from "@/components/WhoWeAre";
import OurProducts from "@/components/ourProduct";
import HowItWorks from "@/components/HowItsWork";
import ArnegProducts from "@/components/ProductDesc";
import CaseStudies from "@/components/CaseStudies";
import Reviews from "@/components/Reviews";
import Faqs from "@/components/Faqs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Refrigeration UK | Arneg Distribution Partner",
  description:
    "ILK Technology — the UK's authorised Arneg distribution partner. Shop commercial refrigeration cabinets, cold rooms, plug-in systems, checkouts and shelving. 20+ years experience. UK-wide delivery.",
  alternates: {
    canonical: "https://ilktechnology.com",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ilktechnology.com",
    title: "Commercial Refrigeration UK | Arneg Distribution Partner — ILK Technology",
    description:
      "Authorised UK distributor for Arneg, Oscartielle, Intrac and Incold. Commercial refrigeration cabinets, cold rooms, plug-in systems, checkouts and shelving. 20+ years experience.",
    images: [
      {
        url: "https://ilktechnology.com/og-default.png",
        width: 1200,
        height: 630,
        alt: "ILK Technology — Commercial Refrigeration & Arneg UK Distribution Partner",
        type: "image/png",
      },
    ],
  },
  keywords: [
    "commercial refrigeration UK",
    "Arneg UK distributor",
    "Arneg dealer UK",
    "remote multideck cabinets",
    "Osaka 2 Osaka 3 refrigeration",
    "Panama 3 display cabinet",
    "cold rooms UK",
    "plug-in refrigeration units",
    "supermarket refrigeration supplier",
    "retail refrigeration UK",
    "commercial checkouts shelving",
    "ILK Technology Wembley",
  ],
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
        <LogoTicker />
        <WhoWeAre />
        <OurProducts />
        <ArnegProducts />
        <HowItWorks />
        <CaseStudies />
        <Reviews />
        <Faqs />
        


     
    </div>
  );
}
