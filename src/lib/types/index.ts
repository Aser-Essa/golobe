import type { useSignIn, useSignUp } from "@clerk/tanstack-react-start";
import type {
  filterSearchParamsSchema,
  hotelSearchWidgetSchema,
} from "../schemas/search";
import type z from "zod";
import type { Tables } from "./supabase";
import type {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "../schemas";

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

export type FilterSearchParams = z.infer<typeof filterSearchParamsSchema>;

type UserPublicProfile = {
  id: string;
  full_name: string;
  avatar_url: string | null;
};

export interface HotelType extends Tables<"hotels"> {
  rooms: Array<Tables<"rooms"> & { bookings: Tables<"bookings">[] }>;
  rooms_count: Array<{ count: number }>;
  amenities: Array<{ amenities: Tables<"amenities"> }>;
  hotel_images: Array<Tables<"hotel_images">>;
  hotel_tags: Array<Tables<"hotel_tags">>;
  reviews: Array<Tables<"reviews"> & { user: UserPublicProfile }>;
}

export type PageButtonItem = number | "...";

export type generatePageButtonsParams = {
  page: number;
  totalPages: number;
  windowSize: number;
};
