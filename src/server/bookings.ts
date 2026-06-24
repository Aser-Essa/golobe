import { bookingToInsertSchema } from "#/lib/schemas";
import { supabase } from "#/lib/supabase";
import type { BookingToInsert } from "#/lib/types";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export async function insertBookingIntoDB({
  bookingData,
}: {
  bookingData: BookingToInsert;
}) {
  console.log(bookingData, "bookingData data");

  const { data, error } = await supabase
    .from("bookings")
    .insert([bookingData])
    .select();

  if (error) throw new Error(error.message);

  console.log(data, "booked data");

  return data;
}

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator(bookingToInsertSchema)
  .handler(async ({ data: bookingData }) => {
    return await insertBookingIntoDB({ bookingData });
  });

export const checkBookingExist = createServerFn({ method: "GET" })
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

export const getBooking = createServerFn({ method: "GET" })
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
