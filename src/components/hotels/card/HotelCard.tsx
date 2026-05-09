import type { HotelType } from "#/lib/types";
import { Separator } from "../../ui/separator";
import AddToFavorite from "../../common/AddToFavorite";
import HotelCardDetails from "./HotelCardDetails";
import ViewPlaceButton from "../ViewPlaceButton";
import HotelCoverImage from "./HotelCoverImage";
import HotelPrice from "./HotelPrice";

type HotelCardProps = {
  hotel: HotelType;
};

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <>
      <div className="box-shadow-sm flex w-full overflow-hidden rounded-[12px] bg-white">
        <HotelCoverImage hotel_images={hotel.hotel_images} />
        <div className="w-full space-y-6 p-6">
          <div className="flex justify-between">
            <HotelCardDetails hotel={hotel} />
            <HotelPrice rooms={hotel.rooms} />
          </div>
          <Separator />
          <div className="flex h-12 w-full items-center gap-4">
            <AddToFavorite />
            <ViewPlaceButton hotelId={hotel.id} />
          </div>
        </div>
      </div>
    </>
  );
}
