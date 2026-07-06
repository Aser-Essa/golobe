import { bookingToInsertSchema } from "#/lib/schemas";
import { createServerSupabaseClient } from "#/lib/supabase";
import type { BookingToInsert } from "#/lib/types";
import { authFnMiddleware } from "#/middlewares/auth";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

const BOOKING_SELECT_WITH_ROOM = `
        *,
        hotel:hotels(name,address,logo_url,country,hotel_images:hotel_images(url,is_cover)),
        room:rooms(*)
      `;

export async function insertBookingIntoDB({
  bookingData,
}: {
  bookingData: BookingToInsert;
}) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("bookings")
    .insert([bookingData])
    .select();

  console.log(error);

  if (error) throw new Error(error.message);

  return data;
}

export const createBooking = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .inputValidator(bookingToInsertSchema)
  .handler(async ({ data: bookingData }) => {
    return await insertBookingIntoDB({ bookingData });
  });

export const checkBookingExist = createServerFn({ method: "GET" })
  .middleware([authFnMiddleware])
  .inputValidator(
    z.object({
      payment_intent_id: z.string(),
    }),
  )
  .handler(async ({ data: { payment_intent_id } }) => {
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from("bookings")
      .select("id")
      .eq("payment_intent_id", payment_intent_id)
      .maybeSingle();

    if (error) throw new Error(error.message);

    return { exist: !!data?.id, bookingId: data?.id };
  });

export const getUserBookings = createServerFn({ method: "GET" })
  .middleware([authFnMiddleware])
  .handler(async ({ context: { userId } }) => {
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from("bookings")
      .select(BOOKING_SELECT_WITH_ROOM)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);

    return data;
  });

export const getBooking = createServerFn({ method: "GET" })
  .middleware([authFnMiddleware])
  .inputValidator(
    z.object({
      bookingId: z.string(),
    }),
  )
  .handler(async ({ data: { bookingId } }) => {
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from("bookings")
      .select(BOOKING_SELECT_WITH_ROOM)
      .eq("id", bookingId)
      .maybeSingle();

    if (error) throw new Error(error.message);

    return data;
  });
