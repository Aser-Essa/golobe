import type { HotelType } from "#/lib/types";
import { Separator } from "../../ui/separator";
import HotelCardDetails from "./HotelCardDetails";
import ViewPlaceButton from "../ViewPlaceButton";
import HotelCoverImage from "./HotelCoverImage";
import HotelPrice from "./HotelPrice";
import ToggleFavorite from "#/components/favourites/ToggleFavorite";
import { cn } from "#/lib/utils";

type HotelCardProps = {
  hotel: HotelType;
  orientation?: "vertical" | "horizontal";
  isFavourite?: boolean;
};

export default function HotelCard({
  hotel,
  orientation = "horizontal",
  isFavourite,
}: HotelCardProps) {
  return (
    <div
      className={cn(
        "box-shadow-sm flex h-full w-full flex-col overflow-hidden rounded-[12px] bg-white md:flex-row",
        orientation === "vertical" && "md:flex-col",
      )}
    >
      <HotelCoverImage hotel_images={hotel.hotel_images} />
      <div
        className={cn(
          "w-full flex-2 space-y-6 p-4 md:p-6",
          orientation === "vertical" && "flex flex-col justify-between p-4!",
        )}
      >
        <div
          className={cn(
            "flex justify-between gap-5",
            orientation === "vertical" && "gap-2!",
          )}
        >
          <HotelCardDetails hotel={hotel} orientation={orientation} />
          <HotelPrice rooms={hotel.rooms} orientation={orientation} />
        </div>
        <div className="mt-auto space-y-6">
          <Separator />
          <div
            className={cn(
              "flex h-12 w-full items-center gap-2 md:gap-4",
              orientation === "vertical" && "gap-2!",
            )}
          >
            <ToggleFavorite hotelId={hotel.id} initialFavourite={isFavourite} />
            <ViewPlaceButton hotelId={hotel.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
