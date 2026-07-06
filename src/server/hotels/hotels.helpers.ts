import { HOTELS_PER_PAGE } from "#/lib/constants";
import { createServerSupabaseClient } from "#/lib/supabase";

import type { FilterSearchParams, HotelType } from "#/lib/types";
import { getTypePlacesCount, sanitizeString } from "#/lib/utils";
import {
  filterByAmenities,
  filterByAvailableRooms,
  filterByFreebies,
  filterByRoomsGuests,
} from "#/lib/utils/filters";

export const HOTEL_DETAILS_SELECT = `
  *,
  rooms!inner(*, bookings(*)),
  amenities:hotel_amenity_map!inner(
    amenities!inner(*)
  ),
  hotel_images:hotel_images(*)
`;

export const buildHotelsQuery = ({
  destination,
  rating,
  minPrice,
  maxPrice,
  sortBy,
}: FilterSearchParams) => {
  const supabase = createServerSupabaseClient();

  let query = supabase
    .from("hotels")
    .select(HOTEL_DETAILS_SELECT)
    .eq("is_active", true);

  const d = sanitizeString(destination);
  if (d.length) {
    const terms = d.split(" ").filter(Boolean);

    for (const term of terms) {
      query = query.or(
        `city.ilike.%${term}%,country.ilike.%${term}%,address.ilike.%${term}%,name.ilike.%${term}%`,
      );
    }
  }

  if (rating) {
    query = query.gte("star_rating", rating);
  }

  if (minPrice || maxPrice) {
    query = query.gte("rooms.price_per_night", minPrice);
    query = query.lte("rooms.price_per_night", maxPrice);
  }

  if (sortBy && !sortBy.includes("price")) {
    const [column, order] = sortBy.split("-");
    if (column && order) {
      query = query.order(column, { ascending: order === "asc" });
    }
  }

  return query;
};

export const applyHotelsFilters = (
  hotelsData: HotelType[],
  { amenities, freebies, checkIn, checkOut, rooms, guests }: FilterSearchParams,
) => {
  let filteredData = hotelsData;

  if (amenities?.length) {
    filteredData = filterByAmenities({
      data: filteredData,
      amenities,
    });
  }

  if (freebies?.length) {
    filteredData = filterByFreebies({
      data: filteredData,
      freebies,
    });
  }

  if (checkIn && checkOut) {
    filteredData = filterByAvailableRooms({
      data: filteredData,
      checkIn,
      checkOut,
    });
  }

  if (rooms && guests) {
    filteredData = filterByRoomsGuests({
      data: filteredData,
      rooms,
      guests,
    });
  }

  return filteredData;
};

export const getTypePlaceCounts = ({
  filteredData,
}: {
  filteredData: HotelType[];
}) => {
  const hotelsCount = getTypePlacesCount({
    hotels: filteredData,
    type: "hotel",
  });

  const motelsCount = getTypePlacesCount({
    hotels: filteredData,
    type: "motel",
  });

  const resortsCount = getTypePlacesCount({
    hotels: filteredData,
    type: "resort",
  });

  return {
    hotel: hotelsCount,
    motel: motelsCount,
    resort: resortsCount,
  };
};

export const paginateHotels = ({
  filteredData,
  hotel_page,
}: {
  filteredData: HotelType[];
  hotel_page: number;
}) => {
  const totalPages = Math.ceil(filteredData.length / HOTELS_PER_PAGE);

  const safePage = Math.max(1, Math.min(hotel_page, totalPages));

  const from = (safePage - 1) * HOTELS_PER_PAGE;
  const to = safePage * HOTELS_PER_PAGE;

  const safeTo = Math.min(to, filteredData.length);

  const paginatedData = filteredData.slice(from, safeTo);

  return { data: paginatedData, from, to: safeTo, totalPages };
};
