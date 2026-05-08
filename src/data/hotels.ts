import { filterSearchParamsSchema } from "#/lib/schemas";
import { supabase } from "#/lib/supabase";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export const getHotels = createServerFn({ method: "GET" })
  .inputValidator(filterSearchParamsSchema)
  .handler(async ({ data }) => {
    const { data: hotelData } = await supabase.from("hotels").select(
      `*,  
        rooms!inner(*),
        rooms_count:rooms(count),
        amenities:hotel_amenity_map!inner(
          amenities!inner(*)
        ),
        hotel_images:hotel_images(*)
        `,
    );

    return hotelData;
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
