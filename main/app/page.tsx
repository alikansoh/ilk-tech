import Image from "next/image";
import HeroSection from "@/components/Hero";
import LogoTicker from "@/components/logos";
import WhoWeAre from "@/components/WhoWeAre";
import OurProducts from "@/components/ourProduct";
import HowItWorks from "@/components/HowItsWork";
import ArnegProducts from "@/components/ProductDesc";
import CaseStudies from "@/components/CaseStudies";
import Reviews from "@/components/Reviews";

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


     
    </div>
  );
}
