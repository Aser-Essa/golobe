import { bookingToInsertSchema } from "#/lib/schemas";
import { supabase } from "#/lib/supabase";
import type { BookingToInsert } from "#/lib/types";
import { authFnMiddleware } from "#/middlewares/auth";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export async function insertBookingIntoDB({
  bookingData,
}: {
  bookingData: BookingToInsert;
}) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([bookingData])
    .select();

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
    const { data, error } = await supabase
      .from("bookings")
      .select("id")
      .eq("payment_intent_id", payment_intent_id)
      .single();

    if (error) throw new Error(error.message);

    return { exist: !!data.id, bookingId: data.id };
  });

export const getUserBookings = createServerFn({ method: "GET" })
  .middleware([authFnMiddleware])
  .handler(async ({ context: { userId } }) => {
    const { data, error } = await supabase
      .from("bookings")
      .select(
        "*,hotel:hotels(name,address,logo_url,country,hotel_images:hotel_images(url,is_cover)),room:rooms(*)",
      )
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
    const { data, error } = await supabase
      .from("bookings")
      .select(
        "*,hotel:hotels(name,address,logo_url,country,hotel_images:hotel_images(url,is_cover)),room:rooms(*)",
      )
      .eq("id", bookingId)
      .single();

    if (error) throw new Error(error.message);

    return data;
  });

// export const checkHotelBookedBefore = createServerFn({ method: "GET" })
//   .inputValidator(
//     z.object({
//       hotelId: z.string(),
//     }),
//   )
//   .handler(async ({ data: { hotelId } }) => {
//     const { userId } = await auth();

//     if (!userId) return;

//     const { data, error } = await supabase
//       .from("bookings")
//       .select("id")
//       .eq("hotel_id", hotelId)
//       .eq("user_id", userId)
//       .order("created_at", { ascending: false })
//       .limit(1)
//       .maybeSingle();

//     if (error) throw new Error(error.message);

//     return { isBooked: !!data?.id, bookingId: data?.id };
//   });
