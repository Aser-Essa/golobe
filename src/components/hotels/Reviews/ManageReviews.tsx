import type { HotelType } from "#/lib/types";
import AddReview from "./AddReview";
import EditReview from "./EditReview";

type ManageReviewsProps = {
  hotelId: HotelType["id"];
  bookingId: HotelType["bookings"][number]["id"];
  myAddedReview: HotelType["reviews"][number] | null;
};

export default function ManageReviews({
  hotelId,
  bookingId,
  myAddedReview,
}: ManageReviewsProps) {
  const isReviewAdded = !!myAddedReview;

  return (
    <>
      {isReviewAdded ? (
        <EditReview
          hotelId={hotelId}
          bookingId={bookingId}
          reviewAdded={myAddedReview}
        />
      ) : (
        <AddReview hotelId={hotelId} bookingId={bookingId} />
      )}
    </>
  );
}
