import type { useSignIn, useSignUp } from "@clerk/tanstack-react-start";
import type {
  filterSearchParamsSchema,
  forgotPasswordSchema,
  hotelSearchWidgetSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "../schemas";
import type z from "zod";
import type { Tables } from "./supabase";

export type SignupFormType = z.infer<typeof signUpSchema>;

export type SignInFormType = z.infer<typeof signInSchema>;

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordFormType = z.infer<typeof resetPasswordSchema>;

export interface UseSignUpProps {
  signUp: ReturnType<typeof useSignUp>["signUp"];
  fetchStatus: "idle" | "fetching";
}

export interface UseSignInProps {
  signIn: ReturnType<typeof useSignIn>["signIn"];
  fetchStatus: "idle" | "fetching";
}

export interface ForgotPasswordFormProps {
  fetchStatus: "idle" | "fetching";
  signIn: ReturnType<typeof useSignIn>["signIn"];
  sendEmailCode: () => Promise<void>;
}

export type SearchHotelFormType = z.infer<typeof hotelSearchWidgetSchema>;

// export type FilterSearchParams = {
//   destination?: string;
//   checkIn?: Date;
//   checkOut?: Date;
//   rooms?: number;
//   guests?: number;
//   minPrice?: number;
//   maxPrice?: number;
//   rating?: string;
//   freebies?: string[];
//   amenities?: string[];
//   hotelType?: "hotels" | "motels" | "resorts";
//   sortBy?: string;
// };

export type FilterSearchParams = z.infer<typeof filterSearchParamsSchema>;

type UserPublicProfile = {
  id: string;
  full_name: string;
  avatar_url: string | null;
};

export interface HotelType extends Tables<"hotels"> {
  rooms: Array<Tables<"rooms">>;
  rooms_count: Array<{ count: number }>;
  amenities: Array<{ amenities: Tables<"amenities"> }>;
  hotel_images: Array<Tables<"hotel_images">>;
  hotel_tags: Array<Tables<"hotel_tags">>;
  reviews: Array<Tables<"reviews"> & { user: UserPublicProfile }>;
}
