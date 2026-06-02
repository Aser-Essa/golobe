import type { HotelType } from "#/lib/types";
import { getRatingLabel } from "#/lib/utils";

type RatingSummaryProps = {
  avg_rating: HotelType["avg_rating"];
  review_count: HotelType["review_count"];
};

export default function RatingSummary({
  avg_rating,
  review_count,
}: RatingSummaryProps) {
  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      <div className="border-primary flex h-8 w-10 items-center justify-center rounded-[4px] border">
        {avg_rating}
      </div>
      <div className="flex items-center gap-1">
        <p className="font-bold">{getRatingLabel(avg_rating || 0)}</p>
        <p>{review_count} reviews</p>
      </div>
    </div>
  );
}
