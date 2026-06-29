import FeaturedHotels from "#/components/home/FeaturedHotels";
import PopularDestinations from "#/components/home/PopularDestinations";
import WhyUs from "#/components/home/WhyUs";
import HotelSearchWidget from "#/components/hotels/HotelSearchWidget";
import Container from "#/components/layout/Container";
import Herosection from "#/components/layout/Herosection";
import type { FilterSearchParams } from "#/lib/types";
import { mapSearchParamsToHotelWidget } from "#/lib/utils";
import { getFeaturedHotels, getPopularDestinations } from "#/server/hotels";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/")({
  component: Home,
  loader: async () => {
    const popularDestinationsPromise = getPopularDestinations({
      data: { limit: 6 },
    });

    const featuredHotelsPromise = getFeaturedHotels({
      data: { limit: 8 },
    });

    return { popularDestinationsPromise, featuredHotelsPromise };
  },
});

function Home() {
  const searchParams: FilterSearchParams = Route.useSearch();
  const normalizedSearchParams = mapSearchParamsToHotelWidget(searchParams);

  const { popularDestinationsPromise, featuredHotelsPromise } =
    Route.useLoaderData();

  return (
    <div className="mt-22">
      <Herosection />
      <Container className="mt-0 md:space-y-14 space-y-10">
        <HotelSearchWidget searchParams={normalizedSearchParams} />
        <PopularDestinations
          popularDestinationsPromise={popularDestinationsPromise}
        />
        <FeaturedHotels featuredHotelsPromise={featuredHotelsPromise} />
        <WhyUs />
      </Container>
    </div>
  );
}
