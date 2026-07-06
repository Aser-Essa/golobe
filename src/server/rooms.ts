
import { createServerSupabaseClient } from "#/lib/supabase";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export const getRoom = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {

        const supabase = createServerSupabaseClient();
    

    const { data: roomData, error } = await supabase
      .from("rooms")
      .select(`*,bookings(*),hotel:hotels(*,hotel_images:hotel_images(*))`)
      .eq("id", data.id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    console.log(roomData);

    return roomData;
  });
