import type { HotelType } from "#/lib/types";

export function getAvailableRooms({
  rooms,
  checkIn,
  checkOut,
}: {
  rooms: HotelType["rooms"];
  checkIn: string;
  checkOut: string;
}) {
  const reqIn = new Date(checkIn).getTime();
  const reqOut = new Date(checkOut).getTime();

  if (isNaN(reqIn) || isNaN(reqOut)) {
    throw new Error("Invalid check-in or check-out date");
  }

  const availableRooms = rooms.filter(
    (room) =>
      !room.bookings.some(
        (booking) =>
          booking.status !== "cancelled" &&
          new Date(booking.check_in).getTime() < reqOut &&
          new Date(booking.check_out).getTime() > reqIn,
      ),
  );

  return availableRooms;
}

export function filterByAvailableRooms({
  data,
  checkIn,
  checkOut,
}: {
  data: HotelType[];
  checkIn: string;
  checkOut: string;
}) {
  const hotelsWithAvailableRooms = data
    .map((hotel) => ({
      ...hotel,
      rooms: getAvailableRooms({
        rooms: hotel.rooms,
        checkIn,
        checkOut,
      }),
    }))
    .filter((hotel) => hotel.rooms.length > 0);

  return hotelsWithAvailableRooms;
}
