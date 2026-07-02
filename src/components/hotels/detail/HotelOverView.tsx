import { getRatingLabel } from "#/lib/utils";
import type { HotelType } from "#/lib/types";
import { Sparkles } from "lucide-react";

type HotelOverViewProps = {
  description: HotelType["description"];
  avg_rating: HotelType["avg_rating"];
  review_count: HotelType["review_count"];
  hotel_tags: HotelType["hotel_tags"];
};

export default function HotelOverView({
  description,
  avg_rating,
  review_count,
  hotel_tags,
}: HotelOverViewProps) {
  return (
    <div className="space-y-4">
      <p className="text-xl font-bold font-trade-gothic">Overview</p>
      <div className="space-y-8">
        {!!description && (
          <p className="text-base font-medium">{description}</p>
        )}

        <div className="grid grid-cols-2 flex-wrap items-center gap-4 sm:flex">
          {review_count > 0 && (
            <div className="bg-primary flex aspect-square h-37.5 w-full flex-col justify-between rounded-[12px] p-4 sm:w-40">
              <p className="text-[32px] font-bold">{avg_rating ?? 0}</p>
              <div>
                <span className="text-base font-bold">
                  {getRatingLabel(avg_rating ?? 0)}
                </span>
                <p className="text-sm font-medium">
                  {review_count || 0} reviews
                </p>
              </div>
            </div>
          )}

          {hotel_tags.length > 0 &&
            hotel_tags.map(
              ({ tag }) =>
                tag && (
                  <div
                    key={tag}
                    className="border-primary hover:bg-primary/20 flex aspect-square h-37.5 w-full flex-col justify-between rounded-[12px] border p-4 transition-all sm:w-40"
                  >
                    <Sparkles fill="true" />
                    <p className="text-base font-medium">{tag}</p>
                  </div>
                ),
            )}
        </div>
      </div>
    </div>
  );
}
