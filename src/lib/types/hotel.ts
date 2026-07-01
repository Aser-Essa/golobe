import type { UserPublicProfile } from "./auth";
import type { FilterSearchParams } from "./search";
import type { Tables } from "./supabase";

export interface HotelType extends Tables<"hotels"> {
  rooms: Array<Tables<"rooms"> & { bookings: Tables<"bookings">[] }>;
  rooms_count: Array<{ count: number }>;
  amenities: Array<{ amenities: Tables<"amenities"> }>;
  hotel_images: Array<Tables<"hotel_images">>;
  hotel_tags: Array<Tables<"hotel_tags">>;
  reviews: Array<Tables<"reviews"> & { user: UserPublicProfile }>;
  bookings: Array<Tables<"bookings">>;
}

export type GetTypePlacesCountParams = {
  type: FilterSearchParams["hotelType"];
  hotels: HotelType[];
};
