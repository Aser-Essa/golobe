import type { HotelType } from "../types";

export function sortByPrice({
  data,
  order,
}: {
  data: HotelType[];
  order: "asc" | "desc";
}) {
  return [...data].sort((a, b) => {
    const minA = Math.min(...a.rooms.map((room) => room.price_per_night));
    const minB = Math.min(...b.rooms.map((room) => room.price_per_night));
    return order === "asc" ? minA - minB : minB - minA;
  });
}
