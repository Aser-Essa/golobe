import type { HotelType } from "#/lib/types";
import { useUser } from "@clerk/tanstack-react-start";
import AddReview from "./AddReview";
import EditReview from "./EditReview";
import { Skeleton } from "#/components/ui/skeleton";

type ManageReviewsProps = {
  reviews: HotelType["reviews"];
  hotelId: HotelType["id"];
  bookingId: HotelType["bookings"][number]["id"];
};

export default function ManageReviews({
  reviews,
  hotelId,
  bookingId,
}: ManageReviewsProps) {
  const { user, isLoaded } = useUser();
  const userId = user?.id;

  const reviewAdded = reviews.find(
    (review: HotelType["reviews"][number]) => review.user_id === userId,
  );
  const isReviewAdded = !!reviewAdded?.id;

  if (!isLoaded) return <Skeleton className="h-10 w-37.5 md:h-12" />;

  return (
    <>
      {isReviewAdded ? (
        <EditReview
          hotelId={hotelId}
          bookingId={bookingId}
          reviewAdded={reviewAdded}
        />
      ) : (
        <AddReview hotelId={hotelId} bookingId={bookingId} />
      )}
    </>
  );
}
