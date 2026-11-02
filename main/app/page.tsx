import Image from "next/image";
import HeroSection from "@/components/Hero";
import LogoTicker from "@/components/logos";
import WhoWeAre from "@/components/WhoWeAre";
import OurProducts from "@/components/ourProduct";
import HowItWorks from "@/components/HowItsWork";
import ArnegProducts from "@/components/ProductDesc";
import CaseStudies from "@/components/CaseStudies";
import Reviews from "@/components/Reviews";
import OurCustomers from "@/components/ourCustomers";
import Faqs from "@/components/Faqs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Fridges & Refrigeration UK | Arneg & True Partner",
  description:
    "Buy commercial fridges & freezers in the UK from ILK Technology — authorised Arneg & True Refrigeration partner. Display fridges, multideck chillers, bar fridges, undercounter fridges, cold rooms. UK-wide delivery & installation.",
  alternates: {
    canonical: "https://ilktechnology.com",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ilktechnology.com",
    title: "Commercial Fridges & Refrigeration UK | ILK Technology",
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
    "Osaka 2",
    "Osaka 3",
    "Osaka 3 SC",
    "Osaka 3P",
    "Panama 2",
    "Panama 3",
    "Panama 3 SC",
    "Panama 3P",
    "Arneg Osaka 2",
    "Arneg Osaka 3",
    "Arneg Osaka 3 SC",
    "Arneg Osaka 3P",
    "Arneg Panama 2",
    "Arneg Panama 3",
    "Arneg Panama 3 SC",
    "Arneg Panama 3P",
    "commercial fridge UK",
    "commercial fridges",
    "commercial fridge supplier UK",
    "commercial freezer UK",
    "display fridge UK",
    "multideck fridge",
    "supermarket fridge",
    "shop display fridge",
    "glass door display fridge",
    "bar fridge UK",
    "back bar bottle cooler",
    "undercounter fridge commercial",
    "upright commercial fridge",
    "catering fridge UK",
    "restaurant fridge",
    "convenience store fridge",
    "drinks fridge commercial",
    "commercial fridge London",
    "commercial fridge installation",
    "buy commercial fridge",
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
        <OurCustomers />

        <Faqs />
        


     
    </div>
  );
}
