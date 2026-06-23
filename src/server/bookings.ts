import { bookingToInsertSchema } from "#/lib/schemas";
import { supabase } from "#/lib/supabase";
import type { BookingToInsert } from "#/lib/types";
import { createServerFn } from "@tanstack/react-start";

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
  .inputValidator(bookingToInsertSchema)
  .handler(async ({ data: bookingData }) => {
    return await insertBookingIntoDB({ bookingData });
  });
