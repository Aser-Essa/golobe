import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "#/components/ui/carousel";
import type { HotelType } from "#/lib/types";
import { Await } from "@tanstack/react-router";
import HotelCard from "../hotels/card/HotelCard";
import { useFavouriteHotels } from "#/hooks/useFavouriteHotels";
import FeaturedHotelsSkeleton from "../skeleton/FeaturedHotelsSkeleton";

type FeaturedHotelsProps = {
  featuredHotelsPromise: Promise<HotelType[] | null>;
};

export default function FeaturedHotels({
  featuredHotelsPromise,
}: FeaturedHotelsProps) {
  const { favouriteIds } = useFavouriteHotels();

  return (
    <div className="relative space-y-6">
      <p className="font-trade-gothic text-2xl font-bold">Featured Hotels</p>

      <Carousel
        className="w-full"
        opts={{
          align: "start",
          containScroll: "trimSnaps",
        }}
      >
        <CarouselContent>
          <Await
            promise={featuredHotelsPromise}
            fallback={<FeaturedHotelsSkeleton />}
          >
            {(featuredHotels) =>
              featuredHotels?.map((hotel) => (
                <CarouselItem
                  key={hotel.id}
                  className="flex basis-full pl-4 md:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
                >
                  <HotelCard
                    hotel={hotel}
                    orientation="vertical"
                    isFavourite={favouriteIds.has(hotel.id)}
                  />
                </CarouselItem>
              ))
            }
          </Await>
        </CarouselContent>

        <CarouselPrevious className="box-shadow-sm pointer-events-auto! left-0 -translate-x-1/2 rounded-full! text-xl md:size-10" />
        <CarouselNext className="box-shadow-sm pointer-events-auto! right-0 translate-x-1/2 rounded-full! md:size-10" />
      </Carousel>
    </div>
  );
}
