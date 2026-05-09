import { getRatingLabel } from "#/lib/utils";
import type { HotelType } from "#/lib/types";
import { MapPin, Star } from "lucide-react";
import { Button } from "../../ui/button";
import AddToFavorite from "../../common/AddToFavorite";
import ShareButton from "../../common/ShareButton";

type HotelHeaderProps = {
  hotel: HotelType;
};

export default function HotelHeader({ hotel }: HotelHeaderProps) {
  const prices = hotel.rooms.map((room) => room.price_per_night);
  const minPrice = Math.min(...prices);

  return (
    <div className="my-8 flex items-start justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
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

      <div className="space-y-4 text-right">
        <p className="text-salmon text-[32px] font-bold">
          ${minPrice}
          <span className="text-sm">/night</span>
        </p>
        <div className="flex flex-row-reverse items-center gap-4">
          <Button className="h-12 w-37.5 px-4 py-2 font-semibold">
            Book now
          </Button>
          <ShareButton />
          <AddToFavorite />
        </div>
      </div>
    </div>
  );
}
