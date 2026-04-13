import Image from "next/image";
import HeroSection from "@/components/Hero";
import LogoTicker from "@/components/logos";
import WhoWeAre from "@/components/WhoWeAre";
import OurProducts from "@/components/ourProduct";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
        <LogoTicker />
        <WhoWeAre />
        <OurProducts />

     
    </div>
  );
}
