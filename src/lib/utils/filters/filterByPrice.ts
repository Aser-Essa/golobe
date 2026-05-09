import type { HotelType } from "#/lib/types";

export function filterByPrice({
  minPrice,
  maxPrice,
  data,
}: {
  minPrice?: number;
  maxPrice?: number;
  data: HotelType[];
}) {
  return data.filter((hotel) =>
    hotel.rooms.some(
      (room) =>
        (minPrice == null || room.price_per_night >= minPrice) &&
        (maxPrice == null || room.price_per_night <= maxPrice),
    ),
  );
}
