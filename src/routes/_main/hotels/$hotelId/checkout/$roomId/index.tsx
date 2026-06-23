import CheckoutLoginSection from "#/components/auth/CheckoutLoginSection";
import CheckoutSummarySidebar from "#/components/booking/CheckoutSummarySidebar";
import PaymentMode from "#/components/booking/PaymentMode";
import RoomSummaryCard from "#/components/booking/RoomSummaryCard";
import HotelBreadCrumb from "#/components/hotels/detail/HotelBreadCrumb";
import Container from "#/components/layout/Container";
import { CheckoutConfirmProvider } from "#/components/payment/context/CheckoutConfirmContext";
import PaymentMethods from "#/components/payment/PaymentMethods";
import type {
  FilterSearchParams,
  paymentMode as paymentModeType,
} from "#/lib/types";
import { calculateBookingPrice } from "#/lib/utils";
import { getRoom } from "#/server/rooms";
import { Show } from "@clerk/tanstack-react-start";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute(
  "/_main/hotels/$hotelId/checkout/$roomId/",
)({
  component: RouteComponent,
  loader: async ({ params }) => {
    const id = params.roomId;
    const data = await getRoom({ data: { id } });
    return data;
  },
});

function RouteComponent() {
  const room = Route.useLoaderData();
  const hotel = room.hotel;
  const [selectedMethod, setSelectedMethod] = useState("");

  const searchParams: FilterSearchParams & { paymentMode?: paymentModeType } =
    useSearch({
      from: "/_main/hotels/$hotelId/checkout/$roomId/",
    });

  const paymentModeValue = searchParams.paymentMode || "full";

  const bookingPrice = calculateBookingPrice({
    checkIn: searchParams.checkIn,
    checkOut: searchParams.checkOut,
    pricePerNight: room.price_per_night,
    taxRate: hotel.tax_rate,
    paymentMode: paymentModeValue,
  });

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
            <PaymentMode bookingPrice={bookingPrice} />
            <Show when={"signed-in"}>
              <PaymentMethods
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
              />
            </Show>
            <Show when={"signed-out"}>
              <CheckoutLoginSection />
            </Show>
          </div>
          <CheckoutSummarySidebar
            hotel={hotel}
            room={room}
            selectedMethod={selectedMethod}
            paymentMode={paymentModeValue}
            bookingPrice={bookingPrice}
          />
        </div>
        <div className="h-screen"></div>
      </Container>
    </CheckoutConfirmProvider>
  );
}
