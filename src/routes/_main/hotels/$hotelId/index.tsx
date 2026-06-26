import Amenities from "#/components/hotels/detail/Amenities";
import AvailableRooms from "#/components/hotels/detail/AvailableRooms";
import HotelBreadCrumb from "#/components/hotels/detail/HotelBreadCrumb";
import HotelHeader from "#/components/hotels/detail/HotelHeader";
import HotelImages from "#/components/hotels/detail/HotelImages";
import HotelOverView from "#/components/hotels/detail/HotelOverView";
import MapAndLocation from "#/components/hotels/detail/MapAndLocation";
import FilterAvailableRoomsWidget from "#/components/hotels/Filters/FilterAvailableRoomsWidget";
import ReviewsSection from "#/components/hotels/Reviews/ReviewsSection";
import Container from "#/components/layout/Container";
import { Separator } from "#/components/ui/separator";
import type { FilterSearchParams } from "#/lib/types";
import { mapSearchParamsToHotelWidget } from "#/lib/utils";
import { getHotel } from "#/server/hotels";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/hotels/$hotelId/")({
  component: RouteComponent,
  loaderDeps: ({ search }) => search as FilterSearchParams,
  loader: async ({ params, deps: searchParams }) => {
    const hotelId = params.hotelId;
    const hotels = await getHotel({ data: { id: hotelId } });
    if (hotels.length === 0) {
      throw redirect({ to: "/hotels", search: searchParams });
    }
    const hotel = hotels[0];

    return {
      hotel,
    };
  },
});

function RouteComponent() {
  const { hotel } = Route.useLoaderData();

  const searchParams: FilterSearchParams = Route.useSearch();

  const normalizedSearchParams = mapSearchParamsToHotelWidget(searchParams);

  const hasOverviewContent = !!hotel.description || hotel.hotel_tags.length > 0;

  return (
    <Container>
      <HotelBreadCrumb
        name={hotel.name}
        city={hotel.city}
        country={hotel.country}
      />

      <HotelHeader hotel={hotel} />

      <HotelImages hotel_images={hotel.hotel_images} />

      {hasOverviewContent && (
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

      <div id="rooms">
        <Separator className="my-16" />
        <FilterAvailableRoomsWidget
          searchParams={normalizedSearchParams}
          className="bg-transparent shadow-none!"
        />
        <AvailableRooms rooms={hotel.rooms} />
      </div>

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
      <ReviewsSection
        avg_rating={hotel.avg_rating}
        reviews={hotel.reviews}
        hotelId={hotel.id}
        bookings={hotel.bookings}
      />
    </Container>
  );
}
