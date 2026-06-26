import type { HotelType } from "#/lib/types";
import { useUser } from "@clerk/tanstack-react-start";
import AddReview from "./AddReview";
import EditReview from "./EditReview";
import { Skeleton } from "#/components/ui/skeleton";

type ManageReviewsProps = {
  hotelId: HotelType["id"];
  bookings: HotelType["bookings"];
  myAddedReview: HotelType["reviews"][number] | null;
};

export default function ManageReviews({
  hotelId,
  myAddedReview,
  bookings,
}: ManageReviewsProps) {
  const { isLoaded, user } = useUser();
  const userId = user?.id || null;
  const bookingId =
    bookings.find((booking) => booking.user_id === userId)?.id ?? null;
  const isBooked = bookings.length > 0 && bookingId;

  const isReviewAdded = !!myAddedReview;

  if (!isLoaded) return <Skeleton className="h-12 w-30 md:w-38" />;

  return (
    <div>
      {isBooked && (
        <div>
          {isReviewAdded ? (
            <EditReview
              hotelId={hotelId}
              bookingId={bookingId}
              reviewAdded={myAddedReview}
            />
          ) : (
            <AddReview hotelId={hotelId} bookingId={bookingId} />
          )}
        </div>
      )}
    </div>
  );
}
