import type { Booking } from "#/lib/types";
import DatePanel from "./DatePanel";
import InfoRow from "./InfoRow";
import Header from "./Header";
import { cn } from "#/lib/utils";

export default function BookingTicket({
  booking,
  forPdf = false,
}: {
  booking: Booking;
  forPdf?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-[16px] border border-[#EAEAEA] text-left md:flex-row",
        forPdf && "max-w-[856px] flex-row!",
      )}
    >
      <DatePanel
        checkIn={booking.check_in}
        checkOut={booking.check_out}
        forPdf={forPdf}
      />
      <div className="relative min-h-77.25 w-full flex-3">
        <Header room={booking.room} forPdf={forPdf} />
        <InfoRow
          booking_ref={booking.booking_ref}
          country={booking.hotel.country}
          forPdf={forPdf}
        />
      </div>
    </div>
  );
}
