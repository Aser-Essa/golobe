import type { HotelType } from "#/lib/types";
import HotelCard from "./card/HotelCard";

export default function HotelsList({ hotels }: { hotels: HotelType[] }) {
  return (
    <>
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </>
  );
}
