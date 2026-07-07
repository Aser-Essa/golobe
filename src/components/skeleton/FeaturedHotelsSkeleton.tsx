import { CarouselItem } from "../ui/carousel";
import HotelCardSkeleton from "./HotelCardSkeleton";

export default function FeaturedHotelsSkeleton() {
  return Array.from({ length: 4 }).map((_, index) => (
    <CarouselItem
      key={index}
      className="flex basis-full pl-4 md:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
    >
      <HotelCardSkeleton />
    </CarouselItem>
  ));
}
