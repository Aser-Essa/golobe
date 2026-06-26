import { supabase } from "#/lib/supabase";
import { authFnMiddleware } from "#/middlewares/auth";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

const HOTEL_FAVOURITES_SELECT = `
  *,
  hotel:hotels!inner(
    *,
    rooms!inner(
      *,
      bookings(*)
    ),
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
  )
` as const;

const getHotelFavourites = async (userId: string) => {
  const { data: favourites, error } = await supabase
    .from("favourites")
    .select(HOTEL_FAVOURITES_SELECT)
    .eq("user_id", userId)
    .eq("item_type", "hotel");

  if (error) throw new Error(error.message);

  return favourites;
};

const getFlightFavourites = async (userId: string) => {
  const { data: favourites, error } = await supabase
    .from("favourites")
    .select("*")
    .eq("user_id", userId)
    .eq("item_type", "flight");

  if (error) throw new Error(error.message);

  return favourites;
};

export const getUserFavourites = createServerFn({ method: "GET" })
  .middleware([authFnMiddleware])
  .inputValidator(
    z.object({
      favType: z.enum(["hotel", "flight"]).default("hotel"),
    }),
  )
  .handler(async ({ data, context: { userId } }) => {
    return data.favType === "hotel"
      ? getHotelFavourites(userId)
      : getFlightFavourites(userId);
  });

export const addToUserFavourites = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .inputValidator(
    z
      .object({
        hotelId: z.string().optional(),
        flightId: z.string().optional(),
      })
      .refine((data) => data.hotelId || data.flightId, {
        message: "Either hotelId or flightId is required",
      }),
  )
  .handler(async ({ data, context: { userId } }) => {
    const { error } = await supabase.from("favourites").insert({
      user_id: userId,
      hotel_id: data.hotelId,
      flight_id: data.flightId,
    });

    if (error) {
      throw new Error(error.message);
    }
  });

export const deleteFromUserFavourites = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .inputValidator(
    z.object({
      id: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("favourites")
      .delete()
      .eq("id", data.id);

    if (error) {
      throw new Error(error.message);
    }
  });

export const toggleUserFavourites = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .inputValidator(
    z
      .object({
        hotelId: z.string().optional(),
        flightId: z.string().optional(),
      })
      .refine((data) => data.hotelId || data.flightId, {
        message: "Either hotelId or flightId is required",
      }),
  )
  .handler(async ({ data, context: { userId } }) => {
    const column = data.hotelId ? "hotel_id" : "flight_id";
    const value = data.hotelId ?? data.flightId;

    const { data: existing } = await supabase
      .from("favourites")
      .select("id")
      .eq("user_id", userId)
      .eq(column, value!)
      .maybeSingle();

    if (existing) {
      await deleteFromUserFavourites({ data: { id: existing.id } });
      return { isFavourite: false };
    } else {
      await addToUserFavourites({
        data: {
          hotelId: data.hotelId,
          flightId: data.flightId,
        },
      });
      return { isFavourite: true };
    }
  });

export const isUserFavourites = createServerFn({ method: "GET" })
  .middleware([authFnMiddleware])
  .inputValidator(
    z
      .object({
        hotelId: z.string().optional(),
        flightId: z.string().optional(),
      })
      .refine((data) => data.hotelId || data.flightId, {
        message: "Either hotelId or flightId is required",
      }),
  )
  .handler(async ({ data, context: { userId } }) => {
    const column = data.hotelId ? "hotel_id" : "flight_id";
    const value = data.hotelId ?? data.flightId;

    if (!userId) {
      throw new Error("User ID is required");
    }

    const { data: existing, error } = await supabase
      .from("favourites")
      .select("id")
      .eq("user_id", userId)
      .eq(column, value)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return { isFavourite: !!existing?.id };
  });
