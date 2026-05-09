import type { HotelType } from "#/lib/types";

export function filterByFreebies({
  freebies,
  data,
}: {
  freebies: string[];
  data: HotelType[];
}) {
  if (!freebies.length) return data;
  return data.filter((hotel) =>
    freebies.every((selectedFreebies) =>
      hotel.amenities.some(
        (hotelAmenity) =>
          hotelAmenity.amenities.category === "freebies" &&
          hotelAmenity.amenities.name === selectedFreebies,
      ),
    ),
  );
}
