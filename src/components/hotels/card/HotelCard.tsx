import type { HotelType } from "#/lib/types";
import { Separator } from "../../ui/separator";
import HotelCardDetails from "./HotelCardDetails";
import ViewPlaceButton from "../ViewPlaceButton";
import HotelCoverImage from "./HotelCoverImage";
import HotelPrice from "./HotelPrice";
import ToggleFavorite from "#/components/favourites/ToggleFavorite";

type HotelCardProps = {
  hotel: HotelType;
};

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <div className="box-shadow-sm flex w-full flex-col overflow-hidden rounded-[12px] bg-white md:flex-row">
      <HotelCoverImage hotel_images={hotel.hotel_images} />
      <div className="w-full flex-2 space-y-6 p-4 md:p-6">
        <div className="flex justify-between gap-5">
          <HotelCardDetails hotel={hotel} />
          <div className="hidden md:block">
            <HotelPrice rooms={hotel.rooms} />
          </div>
        </div>
        <Separator />
        <div className="flex h-12 w-full items-center gap-4">
          <ToggleFavorite hotelId={hotel.id} />
          <ViewPlaceButton hotelId={hotel.id} />
        </div>
      </div>
    </div>
  );
}
