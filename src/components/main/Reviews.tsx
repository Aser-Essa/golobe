import { getRatingLabel } from "#/lib/constants";
import { Separator } from "../ui/separator";
import type { HotelType } from "#/lib/types";
import ReviewCard from "./ReviewCard";
import { Fragment } from "react/jsx-runtime";

type ReviewsProps = {
  avg_rating: HotelType["avg_rating"];
  reviews: HotelType["reviews"];
};

export default function Reviews({ avg_rating, reviews }: ReviewsProps) {
  const verifiedReviews = reviews.filter((review) => review.is_verified);

  return (
    <>
      <div className="space-y-6">
        <p className="text-xl font-bold">Reviews</p>
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
        {verifiedReviews.map((review) => (
          <Fragment key={review.id}>
            <ReviewCard review={review} />
            <Separator />
          </Fragment>
        ))}
      </div>
    </>
  );
}
