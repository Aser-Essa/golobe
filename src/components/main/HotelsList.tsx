import HotelCard from "./HotelCard";

export default function HotelsList({ hotels }: { hotels: any[] }) {
  return (
    <>
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </>
  );
}
