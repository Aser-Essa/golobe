import { filterSearchParamsSchema } from "#/lib/schemas/search";
import type { searchDestinationsType } from "#/lib/types";
import { sanitizeString, sortByPrice } from "#/lib/utils";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import {
  applyHotelsFilters,
  buildHotelsQuery,
  getTypePlaceCounts,
  HOTEL_DETAILS_SELECT,
  paginateHotels,
} from "./hotels.helpers";
import { createServerSupabaseClient } from "#/lib/supabase";

export const getHotels = createServerFn({ method: "GET" })
  .inputValidator(filterSearchParamsSchema)
  .handler(async ({ data }) => {
    const { hotelType, sortBy, hotel_page } = data;

    const query = buildHotelsQuery(data);

    const { data: hotelsData, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    let filteredData = applyHotelsFilters(hotelsData, data);

    const typePlaceCounts = getTypePlaceCounts({
      filteredData,
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

    const {
      data: paginatedData,
      from,
      to,
      totalPages,
    } = paginateHotels({
      filteredData,
      hotel_page,
    });

    return {
      hotels: paginatedData,
      totalLength: filteredData.length,
      totalPages,
      from: from + 1,
      to,
      typePlaceCounts,
    };
  });

export const getHotel = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const supabase = createServerSupabaseClient();

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
    const supabase = createServerSupabaseClient();

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
      const supabase = createServerSupabaseClient();

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

export const getPopularDestinations = createServerFn({
  method: "GET",
})
  .inputValidator(
    z.object({
      limit: z.number().default(6),
    }),
  )
  .handler(async ({ data }) => {
    const supabase = createServerSupabaseClient();

    const { data: destinations, error } = await supabase
      .from("popular_destinations")
      .select("*")
      .limit(data.limit);

    if (error) {
      throw new Error(error.message);
    }

    return destinations;
  });

export const getFeaturedHotels = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      limit: z.number().default(8),
    }),
  )
  .handler(async ({ data: { limit } }) => {
    const supabase = createServerSupabaseClient();

    const { data: hotels } = await supabase
      .from("hotels")
      .select(HOTEL_DETAILS_SELECT)
      .eq("is_active", true)
      .order("avg_rating", { ascending: false })
      .order("review_count ", { ascending: false })
      .limit(limit);

    return hotels;
  });
