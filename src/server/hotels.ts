import { HOTELS_PER_PAGE } from "#/lib/constants";
import { filterSearchParamsSchema } from "#/lib/schemas/search";
import { supabase } from "#/lib/supabase";
import {
  filterByAmenities,
  filterByAvailableRooms,
  filterByFreebies,
  filterByPrice,
  filterByRoomsGuests,
} from "#/lib/utils/filters";
import { sortByPrice } from "#/lib/utils/sortHotels";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export const getHotels = createServerFn({ method: "GET" })
  .inputValidator(filterSearchParamsSchema)
  .handler(async ({ data }) => {
    const {
      destination,
      rating,
      hotelType,
      minPrice,
      maxPrice,
      amenities,
      freebies,
      checkIn,
      checkOut,
      rooms,
      guests,
      sortBy = "avg_rating-desc",
      page = 1,
    } = data;

    let query = supabase
      .from("hotels")
      .select(
        `*,  
        rooms!inner(*,bookings(*)),
        amenities:hotel_amenity_map!inner(
          amenities!inner(*)
        ),
        hotel_images:hotel_images(*)
        `,
      )
      .eq("is_active", true);

    if (destination?.trim()) {
      const d = destination.trim();
      query = query.or(
        `city.ilike.%${d}%,country.ilike.%${d}%,address.ilike.%${d}%,name.ilike.%${d}%`,
      );
    }

    if (rating) {
      query = query.gte("star_rating", rating);
    }

    if (hotelType) {
      query = query.eq("hotel_type", hotelType);
    }

    if (sortBy && !sortBy.includes("price")) {
      const [column, order] = sortBy.split("-");
      if (column && order) {
        query = query.order(column, { ascending: order === "asc" });
      }
    }

    const { data: hotelsData, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    let filteredData = hotelsData;

    if (minPrice || maxPrice) {
      filteredData = filterByPrice({
        minPrice,
        maxPrice,
        data: filteredData,
      });
    }

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

    if (sortBy && sortBy.includes("price")) {
      const [_, order] = sortBy.split("-");
      filteredData = sortByPrice({
        data: filteredData,
        order: order as "asc" | "desc",
      });
    }

    const totalPages = Math.ceil(filteredData.length / HOTELS_PER_PAGE);

    const safePage = Math.max(1, Math.min(page, totalPages));

    const from = (safePage - 1) * HOTELS_PER_PAGE;
    const to = safePage * HOTELS_PER_PAGE;

    const safeTo = Math.min(to, filteredData.length);

    const paginatedData = filteredData.slice(from, safeTo);

    return {
      hotels: paginatedData,
      totalLength: filteredData.length,
      totalPages,
      from: from + 1,
      to: safeTo,
    };
  });

export const getHotel = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const { data: hotelData, error } = await supabase
      .from("hotels")
      .select(
        `*,  
        rooms!inner(*),
        rooms_count:rooms(count),
        amenities:hotel_amenity_map!inner(
          amenities!inner(*)
        ),
        hotel_images(*),
        hotel_tags(*),
       reviews(
          *,
          user:user_profiles(
    id,
    full_name,
    avatar_url
  )
        )
      `,
      )
      .eq("id", data.id);

    if (error) {
      throw new Error(error.message);
    }

    return hotelData;
  });
