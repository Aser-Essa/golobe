import type z from "zod";
import type {
    BookingPriceBreakdownSchema,
    bookingToInsertSchema,
    createBookingSchema,
} from "../schemas";
import type { Tables } from "./supabase";

export type BookingPriceBreakdown = z.infer<typeof BookingPriceBreakdownSchema>;

export type createBookingType = z.infer<typeof createBookingSchema>;

export type BookingToInsert = z.infer<typeof bookingToInsertSchema>;

export type Booking = Tables<"bookings"> & {
  hotel: Pick<Tables<"hotels">, "name" | "address" | "logo_url" | "country"> & {
    hotel_images: {
      url: string;
      is_cover: boolean;
    }[];
  };
  room: Tables<"rooms">;
};


