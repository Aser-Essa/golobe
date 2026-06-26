import { Fragment } from "react";
import { Separator } from "#/components/ui/separator";
import ReviewCardSkeleton from "./ReviewCardSkeleton";
import { REVIEWS_PER_PAGE } from "#/lib/constants";

type ReviewsListSkeletonProps = {
  count?: number;
};

export default function ReviewsListSkeleton({
  count = REVIEWS_PER_PAGE,
}: ReviewsListSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Fragment key={index}>
          <ReviewCardSkeleton />
          {index !== count - 1 && <Separator />}
        </Fragment>
      ))}
    </>
  );
}
