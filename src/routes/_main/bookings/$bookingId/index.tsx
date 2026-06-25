import BookingTicket from "#/components/booking/BookingTicket";
import BookingHeader from "#/components/booking/BookingHeader";
import HotelLogo from "#/components/booking/HotelLogo";
import Container from "#/components/layout/Container";
import type { Booking } from "#/lib/types";
import { getBooking } from "#/server/bookings";
import { createFileRoute } from "@tanstack/react-router";
import TermsAndConditions from "#/components/booking/TermsAndConditions";

export const Route = createFileRoute("/_main/bookings/$bookingId/")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return await getBooking({ data: { bookingId: params.bookingId } });
  },
});

function RouteComponent() {
  const booking: Booking = Route.useLoaderData();

  return (
    <Container>
      <BookingHeader booking={booking} />
      <div className="flex min-h-77.25 flex-col items-center lg:flex-row">
        <BookingTicket booking={booking} forPdf={false} />
        <HotelLogo
          hotelName={booking.hotel.name}
          logo_url={booking.hotel.logo_url}
        />
      </div>
      <TermsAndConditions />
    </Container>
  );
}
