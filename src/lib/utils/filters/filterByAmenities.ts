import type { HotelType } from "#/lib/types";

export function filterByAmenities({
  amenities,
  data,
}: {
  amenities: string[];
  data: HotelType[];
}) {
  if (!amenities.length) return data;
  return data.filter((hotel) =>
    amenities.every((selectedAmenity) =>
      hotel.amenities.some(
        (hotelAmenity) => hotelAmenity.amenities.name === selectedAmenity,
      ),
    ),
  );
}
