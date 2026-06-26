import ReviewsListSkeleton from "#/components/skeleton/ReviewsListSkeleton";
import { Separator } from "#/components/ui/separator";
import type { HotelType } from "#/lib/types";
import { getRatingLabel } from "#/lib/utils";
import { Await } from "@tanstack/react-router";
import ManageReviews from "./ManageReviews";
import ReviewsList from "./ReviewsList";
import { ReviewsPagination } from "./ReviewsPagination";

type ReviewsProps = {
  avg_rating: HotelType["avg_rating"];
  hotelId: HotelType["id"];
  bookings: HotelType["bookings"];
  totalPages: number;
  myAddedReview: HotelType["reviews"][number] | null;
  countVerified: number;
  reviewsPromise: Promise<{
    reviews: HotelType["reviews"];
  }>;
};

export default function ReviewsSection({
  avg_rating,
  hotelId,
  myAddedReview,
  bookings,
  reviewsPromise,
  totalPages,
  countVerified,
}: ReviewsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">Reviews</p>
        <ManageReviews
          hotelId={hotelId}
          myAddedReview={myAddedReview}
          bookings={bookings}
        />
      </div>

      <div>
        <div className="flex items-center gap-4">
          <p className="text-[50px] font-bold">{avg_rating || 0}</p>
          <div>
            <span className="text-xl font-semibold">
              {getRatingLabel(avg_rating || 0)}
            </span>
            <p className="text-sm">{countVerified || 0} verified reviews</p>
          </div>
        </div>
      </div>
      <Separator />
      <Await promise={reviewsPromise} fallback={<ReviewsListSkeleton />}>
        {({ reviews }) => <ReviewsList reviews={reviews} />}
      </Await>
      <ReviewsPagination totalPages={totalPages} />
    </div>
  );
}
