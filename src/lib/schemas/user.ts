import { startOfToday } from "date-fns";
import { z } from "zod";

export const createUserSchema = z.object({
  id: z.string(),
  full_name: z
    .string()
    .trim()
    .min(1, { message: "Full name is required" })
    .max(100, "Full name is too long"),

  email: z
    .email("Invalid email address")
    .trim()
    .toLowerCase()
    .nullable()
    .optional(),

  phone: z
    .string()
    .trim()
    .min(6, "Invalid phone number")
    .max(20, "Invalid phone number")
    .nullable()
    .optional(),

  avatar_url: z.url("Invalid avatar url").nullable().optional(),

  is_active: z.boolean().default(true),
});

export const emailSchema = z.email("Invalid email address");

export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(20, "Name must be less than 20 characters");

export const phoneSchema = z
  .string()
  .regex(/^\+?[0-9]\d{7,14}$/, "Invalid phone number");

export const addressSchema = z
  .string()
  .min(5, "Address must be at least 5 characters")
  .max(200, "Address must be less than 200 characters");

export const dateOfBirthSchema = z.object({
  birthDate: z
    .date()
    .refine(
      (date) => date <= startOfToday(),
      "Date of birth cannot be today or in the future",
    ),
});

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" });

export const confirmNewPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const updatePasswordSchema = z.object({
  userId: z.string(),
  currentPassword: passwordSchema.optional(),
  newPassword: passwordSchema,
  hasPassword: z.boolean(),
});
