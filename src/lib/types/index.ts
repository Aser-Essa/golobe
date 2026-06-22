import type {
  useSignIn,
  useSignUp,
  useUser,
} from "@clerk/tanstack-react-start";
import type z from "zod";
import type {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "../schemas";
import type {
  filterAvailableRoomsWidgetSchema,
  filterSearchParamsSchema,
  hotelSearchWidgetSchema,
} from "../schemas/search";
import type { createUserSchema } from "../schemas/user";
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

export type HotelSearchWidgetType = z.infer<typeof hotelSearchWidgetSchema>;

export type FilterSearchParams = z.infer<typeof filterSearchParamsSchema>;

export type FilterAvailableRoomsWidgetType = z.infer<
  typeof filterAvailableRoomsWidgetSchema
>;

export type searchDestinationsType = {
  city: string;
  country: string;
  address: string;
  name: string;
}[];

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

export type GeneratePageButtonsParams = {
  page: number;
  totalPages: number;
  windowSize: number;
};

export type GetTypePlacesCountParams = {
  type: FilterSearchParams["hotelType"];
  hotels: HotelType[];
};

export type SidebarFilterOptions = {
  max_price: number;
  amenities: string[];
  freebies: string[];
};

export type CreateUserType = z.infer<typeof createUserSchema>;

export type User = ReturnType<typeof useUser>["user"];

export type StripeCardBrand =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "diners"
  | "jcb"
  | "unionpay"
  | "cartes_bancaires"
  | "eftpos_au"
  | "interac"
  | "unknown";
