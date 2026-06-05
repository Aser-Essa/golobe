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
  .max(50, "Name must be less than 50 characters");

export const phoneSchema = z
  .string()
  .regex(/^\+?[0-9]\d{7,14}$/, "Invalid phone number");
