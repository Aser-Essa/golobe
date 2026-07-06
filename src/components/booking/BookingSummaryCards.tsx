import type { Booking } from "#/lib/types";
import BookingSummaryCard from "./BookingSummaryCard";

interface BookingSummaryCardsProps {
  bookings: Booking[];
}

export default function BookingSummaryCards({
  bookings,
}: BookingSummaryCardsProps) {
  return (
    <ul>
      {bookings.map((booking, idx) => (
        <BookingSummaryCard key={idx} booking={booking} />
      ))}
    </ul>
  );
}
