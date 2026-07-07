import { CarouselItem } from "../ui/carousel";
import PopularDestinationCardSkeleton from "./PopularDestinationCardSkeleton";

export default function PopularDestinationsSkeleton() {
  return Array.from({ length: 5 }).map((_, index) => (
    <CarouselItem
      key={index}
      className="basis-1/1 pl-5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
    >
      <PopularDestinationCardSkeleton />
    </CarouselItem>
  ));
}
