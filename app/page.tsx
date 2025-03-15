import DiscoverPlaces from "@/components/DiscoverPlaces";
import Filter from "@/components/Filter";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="mx-26">
        <Filter />
      </div>
      <DiscoverPlaces />
    </>
  );
}
