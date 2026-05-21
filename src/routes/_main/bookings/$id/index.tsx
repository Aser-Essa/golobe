import RoomSummaryCard from "#/components/booking/RoomSummaryCard";
import HotelBreadCrumb from "#/components/hotels/detail/HotelBreadCrumb";
import { getRoom } from "#/server/rooms";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/bookings/$id/")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const id = params.id;
    const data = await getRoom({ data: { id } });
    return data;
  },
});

function RouteComponent() {
  const [room] = Route.useLoaderData();
  const hotel = room.hotel;

  return (
    <>
      <HotelBreadCrumb
        name={hotel.name}
        city={hotel.city}
        country={hotel.country}
      />
      <div className="mt-8 flex gap-10">
        <div className="flex-3">
          <RoomSummaryCard room={room} hotel={hotel} />
        </div>

        <div className="box-shadow-sm h-[200px] flex-2 rounded-[12px] bg-white"></div>
      </div>
    </>
  );
}
