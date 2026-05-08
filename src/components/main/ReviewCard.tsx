import type { HotelType } from "#/lib/types";

type ReviewCardProps = {
  review: HotelType["reviews"][number];
};

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <>
      <div className="flex items-start gap-4">
        <div className="bg-primary flex aspect-square size-11.25 items-center justify-center overflow-hidden rounded-full">
          <p className="font-bold">
            {review.user.full_name.slice(0, 2).toUpperCase()}
          </p>
        </div>

        <div className="flex-1 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <p className="font-semibold">
              {review.rating.toFixed(1)} {"Amazing"}
            </p>
            <span>|</span>
            <p>{review.user.full_name}</p>
          </div>
          <p>{review.body}</p>
        </div>
      </div>
    </>
  );
}
