import type { HotelType } from "#/lib/types";
import ManageReviews from "./ManageReviews";
import ReviewsList from "./ReviewsList";

type ReviewsProps = {
  avg_rating: HotelType["avg_rating"];
  reviews: HotelType["reviews"];
  hotelId: HotelType["id"];
  bookings: HotelType["bookings"];
};

export default function ReviewsSection({
  avg_rating,
  reviews,
  hotelId,
  bookings,
}: ReviewsProps) {
  const bookingId = bookings[0]?.id || null;
  const isBooked = bookings.length > 0 && bookingId !== null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">Reviews</p>

        {isBooked && (
          <ManageReviews
            reviews={reviews}
            hotelId={hotelId}
            bookingId={bookingId}
          />
        )}
      </div>
      <ReviewsList reviews={reviews} avg_rating={avg_rating} />
    </div>
  );
}
