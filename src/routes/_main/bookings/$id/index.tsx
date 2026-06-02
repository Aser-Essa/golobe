import CheckoutSummarySidebar from "#/components/booking/CheckoutSummarySidebar";
import PaymentType from "#/components/booking/PaymentType";
import RoomSummaryCard from "#/components/booking/RoomSummaryCard";
import HotelBreadCrumb from "#/components/hotels/detail/HotelBreadCrumb";
import Container from "#/components/layout/Container";
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
    <Container>
      <HotelBreadCrumb
        name={hotel.name}
        city={hotel.city}
        country={hotel.country}
      />
      <div className="mt-8 flex items-start gap-10">
        <div className="flex-3 space-y-10">
          <RoomSummaryCard room={room} hotel={hotel} />
          <PaymentType
            price_per_night={room.price_per_night}
            tax_rate={hotel.tax_rate}
          />
        </div>
        <CheckoutSummarySidebar hotel={hotel} room={room} />
      </div>
      <div className="h-screen"></div>
    </Container>
  );
}
