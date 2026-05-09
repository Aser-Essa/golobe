import type { HotelType } from "#/lib/types";

export function filterByRoomsGuests({
  data,
  rooms,
  guests,
}: {
  data: HotelType[];
  rooms: number;
  guests: number;
}) {
  return data.filter((hotel) => {
    if (hotel.rooms.length < rooms) return false;

    const sortedByCapacity = [...hotel.rooms].sort(
      (a, b) => b.max_guests - a.max_guests,
    );

    let remainingGuests = guests;
    let roomsUsed = 0;

    for (const room of sortedByCapacity) {
      if (remainingGuests <= 0) break;
      if (roomsUsed >= rooms) break;
      remainingGuests -= room.max_guests;
      roomsUsed++;
    }

    return remainingGuests <= 0;
  });
}
