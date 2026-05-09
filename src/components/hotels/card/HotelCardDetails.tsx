import type { HotelType } from "#/lib/types";
import { getRatingLabel } from "#/lib/utils";
import { Coffee, MapPin, Star } from "lucide-react";

export default function HotelCardDetails({ hotel }: { hotel: HotelType }) {
  return (
    <>
      <div className="space-y-4">
        <p className="text-xl font-bold">{hotel.name}</p>
        <div className="space-y-3">
          <div className="flex items-center gap-0.5">
            <MapPin className="text-foreground size-5" />
            <p className="text-foreground/75 text-xs font-medium">
              {hotel.address}
            </p>
          </div>
          <div className="flex w-fit items-center justify-between gap-8">
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {Array.from({ length: hotel.star_rating || 0 }).map(
                  (_, key) => (
                    <Star
                      key={key}
                      className="fill-salmon text-salmon size-4"
                    />
                  ),
                )}
              </div>
              <p className="text-foreground text-xs font-medium">
                {hotel.star_rating} Star Hotel
              </p>
            </div>

            <div className="flex items-center gap-1">
              <Coffee className="text-foreground size-4" />
              <p className="text-xs font-medium">
                <span className="font-bold">{hotel.amenity_count}</span>{" "}
                Aminities
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium">
            <div className="border-primary flex h-8 w-10 items-center justify-center rounded-[4px] border">
              {hotel.avg_rating}
            </div>
            <div className="flex items-center gap-1">
              <p className="font-bold">
                {getRatingLabel(hotel.avg_rating || 0)}
              </p>
              <p>{hotel.review_count} reviews</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
