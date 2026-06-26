import { Separator } from "#/components/ui/separator";
import type { HotelType } from "#/lib/types";
import { Fragment } from "react";
import NoReviews from "./NoReviews";
import ReviewCard from "./ReviewCard";

type ReviewsListProps = {
  reviews: HotelType["reviews"];
};

export default function ReviewsList({ reviews }: ReviewsListProps) {
  if (reviews.length === 0) return <NoReviews />;

  return (
    <>
      {reviews.map((review) => (
        <Fragment key={review.id}>
          <ReviewCard review={review} />
          <Separator />
        </Fragment>
      ))}
    </>
  );
}
