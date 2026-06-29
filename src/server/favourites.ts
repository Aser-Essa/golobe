import { favouriteSchema } from "#/lib/schemas/favourite";
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

async function addFavourite({
  hotelId,
  flightId,
  userId,
}: {
  hotelId?: string;
  flightId?: string;
  userId: string;
}) {
  if (!hotelId && !flightId) {
    throw new Error("Hotel ID or Flight ID is required");
  }

  const { error } = await supabase.from("favourites").insert({
    user_id: userId,
    hotel_id: hotelId,
    flight_id: flightId,
  });

  if (error) {
    throw new Error(error.message);
  }
}

async function deleteFavourite(id: string) {
  const { error } = await supabase.from("favourites").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

export const toggleUserFavourites = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .inputValidator(favouriteSchema)
  .handler(async ({ data, context: { userId } }) => {
    const column = data.hotelId ? "hotel_id" : "flight_id";
    const value = data.hotelId ?? data.flightId;

    const { data: existing, error } = await supabase
      .from("favourites")
      .select("id")
      .eq("user_id", userId)
      .eq(column, value!)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (existing) {
      await deleteFavourite(existing.id);
      return { isFavourite: false };
    } else {
      await addFavourite({
        hotelId: data.hotelId,
        flightId: data.flightId,
        userId: userId,
      });
      return { isFavourite: true };
    }
  });
