import Image from "next/image";
import HeroSection from "@/components/Hero";
import LogoTicker from "@/components/logos";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
        <LogoTicker />

     
    </div>
  );
}
