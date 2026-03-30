import Hero from "@/components/sections/Hero";
import MarqueeTicker from "@/components/layout/MarqueeTicker";
import Highlights from "@/components/sections/Highlights";
import MenuSection from "@/components/sections/MenuSection";
import ComboBuilder from "@/components/sections/ComboBuilder";
import HappyHour from "@/components/sections/HappyHour";
import Promos from "@/components/sections/Promos";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import Experience from "@/components/sections/Experience";
import GallerySection from "@/components/sections/GallerySection";
import InstagramSection from "@/components/sections/InstagramSection";
import Location from "@/components/sections/Location";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeTicker />
      <Highlights />
      <MenuSection />
      <ComboBuilder />
      <HappyHour />
      <Promos />
      <TestimonialsSection />
      <Experience />
      <GallerySection />
      <Location />
      <InstagramSection />
    </>
  );
}
