import DiscoverPlaces from "@/components/DiscoverPlaces";
import Filter from "@/components/Filter";
import HeroSection from "@/components/HeroSection";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Filter />
      <DiscoverPlaces />
      <WhyUs />
    </>
  );
}
