import z from "zod";

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.email(),
    phoneNumber: z.string().min(1, { message: "Phone number is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),

    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),

    termsAndConditions: z.boolean().refine((value) => value === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean(),
});

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const hotelSearchWidgetSchema = z.object({
  destination: z.string().min(1, { message: "Destination is required" }),
  checkIn: z.date({ message: "Check in date is required" }),
  checkOut: z.date({ message: "Check out date is required" }),
  rooms: z.number().default(1),
  guests: z.number().default(1),
});

const envSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_KEY: z.string().min(1),
});

export const env = envSchema.parse({
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_KEY: import.meta.env.VITE_SUPABASE_KEY,
});

export const filterSearchParamsSchema = z.object({
  destination: z.string().trim().optional(),
  checkIn: z.coerce.string().optional(),
  checkOut: z.coerce.string().optional(),
  rooms: z.coerce.number().int().min(1).max(30).optional(),
  guests: z.coerce.number().int().min(1).max(16).optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  freebies: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  hotelType: z.enum(["hotel", "motel", "resort"]).optional(),
  sortBy: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).optional(),
});

export type FilterSearchParams = z.infer<typeof filterSearchParamsSchema>;
