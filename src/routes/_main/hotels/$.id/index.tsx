import Amenities from "#/components/main/Amenities";
import AvailableRooms from "#/components/main/AvailableRooms";
import HotelBreadCrumb from "#/components/main/HotelBreadCrumb";
import HotelHeader from "#/components/main/HotelHeader";
import HotelImages from "#/components/main/HotelImages";
import HotelOverView from "#/components/main/HotelOverView";
import MapAndLocation from "#/components/main/MapAndLocation";
import Reviews from "#/components/main/Reviews";
import { Separator } from "#/components/ui/separator";
import { getHotel } from "#/data/hotels";
import type { HotelType } from "#/lib/types";
import { createFileRoute, redirect } from "@tanstack/react-router";

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
  const hotel: HotelType = Route.useLoaderData()[0];

  console.log(hotel);

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

      {hotel.review_count > 0 && (
        <>
          <Separator className="my-16" />
          <Reviews avg_rating={hotel.avg_rating} reviews={hotel.reviews} />
        </>
      )}

      <div className="h-[50vh]"></div>
    </>
  );
}
