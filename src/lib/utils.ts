import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { HotelType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function filterByAvailable({
  data,
  checkIn,
  checkOut,
  rooms,
  guests,
}: {
  data: HotelType[];
  checkIn: string;
  checkOut: string;
  rooms: number | undefined;
  guests: number | undefined;
}) {
  const reqIn = new Date(checkIn).getTime();
  const reqOut = new Date(checkOut).getTime();

  const hotelsWithAvailableRooms = data
    .map((hotel) => ({
      ...hotel,
      rooms: hotel.rooms.filter(
        (room) =>
          !room.bookings.some(
            (booking) =>
              booking.status !== "cancelled" &&
              new Date(booking.check_in).getTime() < reqOut &&
              new Date(booking.check_out).getTime() > reqIn,
          ),
      ),
    }))
    .filter((hotel) => hotel.rooms.length > 0);

  if (rooms && guests) {
    return filterByRoomsGuests({
      data: hotelsWithAvailableRooms,
      rooms,
      guests,
    });
  }

  return hotelsWithAvailableRooms;
}

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

export function sortByPrice({
  data,
  order,
}: {
  data: HotelType[];
  order: string;
}) {
  return data.sort((a, b) => {
    const minA = Math.min(...a.rooms.map((room) => room.price_per_night));
    const minB = Math.min(...b.rooms.map((room) => room.price_per_night));
    return order === "asc" ? minA - minB : minB - minA;
  });
}
