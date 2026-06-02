import { supabase } from "#/lib/supabase";
import { auth } from "@clerk/tanstack-react-start/server";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export const getUserFavourites = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      favType: z.enum(["hotel", "flight"]).default("hotel"),
    }),
  )
  .handler(async ({ data }) => {
    const { userId } = await auth();

    if (!userId) {
      throw redirect({ to: "/sign-in" });
    }

    if (data.favType === "hotel") {
      const { data: favourites, error } = await supabase
        .from("favourites")
        .select(
          `
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
        `,
        )
        .eq("user_id", userId)
        .eq("item_type", "hotel");

      if (error) throw new Error(error.message);

      return favourites;
    }

    const { data: favourites, error } = await supabase
      .from("favourites")
      .select("*")
      .eq("user_id", userId)
      .eq("item_type", "flight");

    if (error) throw new Error(error.message);

    return favourites;
  });

export const addToUserFavourites = createServerFn({ method: "POST" })
  .inputValidator(
    z
      .object({
        hotelId: z.string().optional(),
        flightId: z.string().optional(),
        userId: z.string(),
      })
      .refine((data) => data.hotelId || data.flightId, {
        message: "Either hotelId or flightId is required",
      }),
  )
  .handler(async ({ data }) => {
    const { error } = await supabase.from("favourites").insert({
      user_id: data.userId,
      hotel_id: data.hotelId,
      flight_id: data.flightId,
    });

    console.log(error);

    if (error) {
      throw new Error(error.message);
    }
  });

export const deleteFromUserFavourites = createServerFn({ method: "POST" })
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
  .handler(async ({ data }) => {
    const { userId } = await auth();
    if (!userId) throw redirect({ to: "/sign-in" });

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
    } else {
      await addToUserFavourites({
        data: {
          hotelId: data.hotelId,
          flightId: data.flightId,
          userId: userId,
        },
      });
      return { isFavourite: true };
    }
  });

export const isUserFavourites = createServerFn({ method: "GET" })
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
  .handler(async ({ data }) => {
    const { userId } = await auth();
    if (!userId) throw redirect({ to: "/sign-in" });
    const column = data.hotelId ? "hotel_id" : "flight_id";
    const value = data.hotelId ?? data.flightId;

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
