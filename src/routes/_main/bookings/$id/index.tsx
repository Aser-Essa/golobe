import CheckoutSummarySidebar from "#/components/booking/CheckoutSummarySidebar";
import PaymentType from "#/components/booking/PaymentType";
import RoomSummaryCard from "#/components/booking/RoomSummaryCard";
import HotelBreadCrumb from "#/components/hotels/detail/HotelBreadCrumb";
import Container from "#/components/layout/Container";
import PaymentMethods from "#/components/payment/PaymentMethods";
import { getRoom } from "#/server/rooms";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckoutConfirmProvider } from "#/components/payment/context/CheckoutConfirmContext";

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
  const [selectedMethod, setSelectedMethod] = useState("");

  return (
    <CheckoutConfirmProvider>
      <Container>
        <HotelBreadCrumb
          name={hotel.name}
          city={hotel.city}
          country={hotel.country}
        />
        <div className="relative mt-8 flex flex-col items-start gap-10 lg:flex-row">
          <div className="space-y-10 lg:flex-3">
            <RoomSummaryCard room={room} hotel={hotel} />
            <PaymentType
              price_per_night={room.price_per_night}
              tax_rate={hotel.tax_rate}
            />
            <PaymentMethods
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
            />
          </div>
          <CheckoutSummarySidebar
            hotel={hotel}
            room={room}
            selectedMethod={selectedMethod}
          />
        </div>
        <div className="h-screen"></div>
      </Container>
    </CheckoutConfirmProvider>
  );
}
