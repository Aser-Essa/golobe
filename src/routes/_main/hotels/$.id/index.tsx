import Amenities from "#/components/hotels/detail/Amenities";
import AvailableRooms from "#/components/hotels/detail/AvailableRooms";
import HotelBreadCrumb from "#/components/hotels/detail/HotelBreadCrumb";
import HotelHeader from "#/components/hotels/detail/HotelHeader";
import HotelImages from "#/components/hotels/detail/HotelImages";
import HotelOverView from "#/components/hotels/detail/HotelOverView";
import MapAndLocation from "#/components/hotels/detail/MapAndLocation";
import Reviews from "#/components/hotels/detail/Reviews";
import { Separator } from "#/components/ui/separator";
import { getHotel } from "#/server/hotels";
import type { HotelType } from "#/lib/types";
import { createFileRoute, redirect } from "@tanstack/react-router";
import FilterAvaliableRoomsWidget from "#/components/hotels/Filters/FilterAvaliableRoomsWidget";
import { filterAvaliableRoomsWidgetSchema } from "#/lib/schemas";

export const Route = createFileRoute("/_main/hotels/$/id/")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const id = params._splat || "";
    const data = await getHotel({ data: { id } });
    if (data.length === 0) {
      throw redirect({ to: "/hotels" });
    }
    return data;
  },
});

function RouteComponent() {
  const hotel: HotelType = Route.useLoaderData()[0] || {};

  const searchParams = Route.useSearch();
  const parsedSearchParams =
    filterAvaliableRoomsWidgetSchema.parse(searchParams);

  const isRenderHotelOverView =
    !!hotel.description ||
    hotel.hotel_tags.length > 0 ||
    Number(hotel.review_count) > 0;

  return (
    <>
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
        <>
          <Separator className="my-16" />
          <FilterAvaliableRoomsWidget searchParams={parsedSearchParams} />
          <AvailableRooms rooms={hotel.rooms} />
        </>
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
    </>
  );
}
