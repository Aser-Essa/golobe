import ToggleFavorite from "#/components/favourites/ToggleFavorite";
import type { HotelType } from "#/lib/types";
import { cn, getMinRoomPrice } from "#/lib/utils";
import { MapPin, Star } from "lucide-react";
import ShareButton from "../../common/ShareButton";
import { buttonVariants } from "../../ui/button";
import RatingSummary from "./RatingSummary";

type HotelHeaderProps = {
  hotel: HotelType;
};

export default function HotelHeader({ hotel }: HotelHeaderProps) {
  const minPrice = getMinRoomPrice(hotel.rooms);

  return (
    <div className="my-8 flex flex-col items-start justify-between gap-4 sm:flex-row">
      <div className="w-full space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <h3 className="text-2xl font-bold">{hotel.name}</h3>
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {Array.from({ length: hotel.star_rating || 0 }).map((_, key) => (
                <Star key={key} className="fill-salmon text-salmon size-4" />
              ))}
            </div>
            <p className="text-foreground text-xs font-medium">
              {hotel.star_rating} Star Hotel
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-0.5">
            <MapPin className="text-foreground size-5" />
            <p className="text-foreground/75 text-xs font-medium">
              {hotel.address}
            </p>
          </div>
          <RatingSummary
            avg_rating={hotel.avg_rating}
            review_count={hotel.review_count}
          />
        </div>
      </div>

      <div className="flex w-full flex-row flex-wrap items-center justify-between gap-5 text-right sm:flex-col sm:items-end sm:space-y-4">
        <p className="text-salmon text-[32px] font-bold">
          ${minPrice}
          <span className="text-sm">/night</span>
        </p>
        <div className="flex flex-row-reverse items-center gap-2 sm:gap-4">
          <a
            href="#rooms"
            className={cn(
              buttonVariants(),
              "h-12 w-auto px-4 py-2 font-semibold sm:w-37.5",
            )}
          >
            Book now
          </a>
          <ShareButton />
          <ToggleFavorite hotelId={hotel.id} />
        </div>
      </div>
    </div>
  );
}
