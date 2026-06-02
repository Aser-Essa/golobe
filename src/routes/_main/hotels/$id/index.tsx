import Container from "#/components/layout/Container";
import Amenities from "#/components/hotels/detail/Amenities";
import AvailableRooms from "#/components/hotels/detail/AvailableRooms";
import HotelBreadCrumb from "#/components/hotels/detail/HotelBreadCrumb";
import HotelHeader from "#/components/hotels/detail/HotelHeader";
import HotelImages from "#/components/hotels/detail/HotelImages";
import HotelOverView from "#/components/hotels/detail/HotelOverView";
import MapAndLocation from "#/components/hotels/detail/MapAndLocation";
import Reviews from "#/components/hotels/detail/Reviews";
import FilterAvailableRoomsWidget from "#/components/hotels/Filters/FilterAvailableRoomsWidget";
import { Separator } from "#/components/ui/separator";
import type { FilterSearchParams, HotelType } from "#/lib/types";
import { mapSearchParamsToHotelWidget } from "#/lib/utils";
import { getHotel } from "#/server/hotels";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/hotels/$id/")({
  component: RouteComponent,
  loaderDeps: ({ search }) => search as FilterSearchParams,
  loader: async ({ params, deps: searchParams }) => {
    const id = params.id;
    const data = await getHotel({ data: { id } });
    if (data.length === 0) {
      throw redirect({ to: "/hotels", search: searchParams });
    }
    return data;
  },
});

function RouteComponent() {
  const hotel: HotelType = Route.useLoaderData()[0] || {};

  const searchParams: FilterSearchParams = Route.useSearch();

  const normalizedSearchParams = mapSearchParamsToHotelWidget(searchParams);

  const isRenderHotelOverView =
    !!hotel.description ||
    hotel.hotel_tags.length > 0 ||
    Number(hotel.review_count) > 0;

  return (
    <Container>
      <HotelBreadCrumb
        name={hotel.name}
        city={hotel.city}
        country={hotel.country}
      />

      <HotelHeader hotel={hotel} />

      <HotelImages hotel_images={hotel.hotel_images} />

      {isRenderHotelOverView && (
        <>
          <Separator className="my-16" />
          <HotelOverView
            description={hotel.description}
            avg_rating={hotel.avg_rating}
            review_count={hotel.review_count}
            hotel_tags={hotel.hotel_tags}
          />
        </>
      )}

      {hotel.rooms.length > 0 && (
        <div id="rooms">
          <Separator className="my-16" />
          <FilterAvailableRoomsWidget
            searchParams={normalizedSearchParams}
            className="bg-transparent shadow-none!"
          />
          <AvailableRooms rooms={hotel.rooms} />
        </div>
      )}

      {hotel.latitude !== null && hotel.longitude !== null && (
        <>
          <Separator className="my-16" />
          <MapAndLocation
            latitude={hotel.latitude}
            longitude={hotel.longitude}
            address={hotel.address}
          />
        </>
      )}

      {hotel.amenities.length > 0 && (
        <>
          <Separator className="my-16" />
          <Amenities amenities={hotel.amenities} />
        </>
      )}

      <Separator className="my-16" />
      <Reviews avg_rating={hotel.avg_rating} reviews={hotel.reviews} />

      <div className="h-[50vh]"></div>
    </Container>
  );
}
