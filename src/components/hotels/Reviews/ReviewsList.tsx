import { Separator } from "#/components/ui/separator";
import type { HotelType } from "#/lib/types";
import { getRatingLabel } from "#/lib/utils";
import { Fragment } from "react";
import NoReviews from "./NoReviews";
import ReviewCard from "./ReviewCard";

type ReviewsListProps = {
  avg_rating: HotelType["avg_rating"];
  reviews: HotelType["reviews"];
};

export default function ReviewsList({ reviews, avg_rating }: ReviewsListProps) {
  if (reviews.length === 0) return <NoReviews />;

  const verifiedReviews = reviews.filter((review) => review.is_verified);

  return (
    <>
      <div>
        <div className="flex items-center gap-4">
          <p className="text-[50px] font-bold">{avg_rating || 0}</p>
          <div>
            <span className="text-xl font-semibold">
              {getRatingLabel(avg_rating || 0)}
            </span>
            <p className="text-sm">
              {verifiedReviews.length || 0} verified reviews
            </p>
          </div>
        </div>
      </div>
      <Separator />
      {reviews.map((review) => (
        <Fragment key={review.id}>
          <ReviewCard review={review} />
          <Separator />
        </Fragment>
      ))}
    </>
  );
}
