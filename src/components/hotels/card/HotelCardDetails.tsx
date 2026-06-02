import type { HotelType } from "#/lib/types";
import { getRatingLabel } from "#/lib/utils";
import { Coffee, MapPin, Star } from "lucide-react";
import RatingSummary from "../detail/RatingSummary";

export default function HotelCardDetails({ hotel }: { hotel: HotelType }) {
  return (
    <div className="space-y-4">
      <p className="text-lg font-bold md:text-xl">{hotel.name}</p>
      <div className="space-y-3">
        <div className="flex items-center gap-0.5">
          <MapPin className="text-foreground size-5" />
          <p className="text-foreground/75 text-xs font-medium">
            {hotel.address}
          </p>
        </div>
        <div className="flex w-fit flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {Array.from({ length: hotel.star_rating || 0 }).map((_, idx) => (
                <Star key={idx} className="fill-salmon text-salmon size-4" />
              ))}
            </div>
            <p className="text-foreground text-xs font-medium">
              {hotel.star_rating} Star Hotel
            </p>
          </div>

          <div className="flex items-center gap-1">
            <Coffee className="text-foreground size-4" />
            <p className="text-xs font-medium">
              <span className="font-bold">{hotel.amenity_count}</span> Amenities
            </p>
          </div>
        </div>
        <RatingSummary
          avg_rating={hotel.avg_rating}
          review_count={hotel.review_count}
        />
      </div>
    </div>
  );
}
