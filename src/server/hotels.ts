import { HOTELS_PER_PAGE } from "#/lib/constants";
import { filterSearchParamsSchema } from "#/lib/schemas/search";
import { supabase } from "#/lib/supabase";
import type { searchDestinationsType } from "#/lib/types";
import { getTypePlacesCount, sanitizeString } from "#/lib/utils";
import {
  filterByAmenities,
  filterByAvailableRooms,
  filterByFreebies,
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
      sortBy,
      hotel_page,
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

    const { data: hotelsData, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

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

    filteredData = filteredData.filter(
      (hotel) => hotel.hotel_type === hotelType,
    );

    if (sortBy && sortBy.includes("price")) {
      const [, order] = sortBy.split("-");
      filteredData = sortByPrice({
        data: filteredData,
        order: order as "asc" | "desc",
      });
    }

    const totalPages = Math.ceil(filteredData.length / HOTELS_PER_PAGE);

    const safePage = Math.max(1, Math.min(hotel_page, totalPages));

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
      typePlaceCounts: {
        hotel: hotelsCount,
        motel: motelsCount,
        resort: resortsCount,
      },
    };
  });

export const getHotel = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const { data: hotelData, error } = await supabase
      .from("hotels")
      .select(
        `*,  
        rooms!inner(*,bookings(*)),
        rooms_count:rooms(count),
        amenities:hotel_amenity_map!inner(
          amenities!inner(*)
        ),
        hotel_images(*),
        hotel_tags(*),
        bookings(*)
      `,
      )
      .eq("id", data.id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return hotelData;
  });

export const getFilterOptions = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data: optionsData, error } = await supabase
      .from("hotel_filter_options")
      .select(`*`)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return optionsData;
  },
);

export const getSearchDestinations = createServerFn({ method: "GET" })
  .inputValidator(z.object({ query: z.string() }))
  .handler(
    async ({
      data: { query: searchQuery },
    }): Promise<searchDestinationsType> => {
      const sanitizedQuery = sanitizeString(searchQuery);

      if (!searchQuery.length) return [];

      let query = supabase.from("hotels").select(`city,country,address,name`);

      const terms = sanitizedQuery.split(" ").filter(Boolean);

      for (const term of terms) {
        query = query.or(
          `city.ilike.%${term}%,country.ilike.%${term}%,address.ilike.%${term}%,name.ilike.%${term}%`,
        );
      }

      const { data: searchDestinations, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return searchDestinations;
    },
  );
