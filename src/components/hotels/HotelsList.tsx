import { useFavouriteHotels } from "#/hooks/useFavouriteHotels";
import type { HotelType } from "#/lib/types";
import HotelCard from "./card/HotelCard";

export default function HotelsList({ hotels }: { hotels: HotelType[] }) {
  const { favouriteIds } = useFavouriteHotels();

  return (
    <div className="space-y-8">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
          isFavourite={favouriteIds.has(hotel.id)}
        />
      ))}
    </div>
  );
}
