import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "#/components/ui/carousel";
import type { Tables } from "#/lib/types/supabase";
import { Await } from "@tanstack/react-router";
import PopularDestinationsSkeleton from "../skeleton/PopularDestinationsSkeleton";
import PopularDestinationCard from "./PopularDestinationCard";

type popularDestinationType = Tables<"popular_destinations">;

export default function PopularDestinations({
  popularDestinationsPromise,
}: {
  popularDestinationsPromise: Promise<popularDestinationType[]>;
}) {
  return (
    <div className="relative space-y-6">
      <p className="font-trade-gothic text-2xl font-bold">
        Popular Destinations
      </p>

      <Carousel className="w-full">
        <CarouselContent>
          <Await
            promise={popularDestinationsPromise}
            fallback={<PopularDestinationsSkeleton />}
          >
            {(popularDestination) =>
              popularDestination.map((destination) => (
                <CarouselItem
                  key={destination.city}
                  className="basis-1/1 pl-5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <PopularDestinationCard destination={destination} />
                </CarouselItem>
              ))
            }
          </Await>
        </CarouselContent>

        <CarouselPrevious className="box-shadow-sm pointer-events-auto! left-0 size-10 -translate-x-1/2 rounded-full!" />
        <CarouselNext className="box-shadow-sm pointer-events-auto! right-0 size-10 translate-x-1/2 rounded-full!" />
      </Carousel>
    </div>
  );
}
