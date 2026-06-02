import z from "zod";
import { MAX_GUESTS, MAX_ROOMS } from "../constants";

export const hotelSearchWidgetSchema = z.object({
  destination: z
    .string()
    .trim()
    .min(1, { message: "Destination is required" })
    .refine(
      (value) => {
        return /[a-zA-Z0-9\u0600-\u06FF]/.test(value);
      },
      {
        message: "Invalid input",
      },
    ),
  checkIn: z
    .date({ message: "Check in date is required" })
    .catch(() => new Date()),
  checkOut: z
    .date({ message: "Check out date is required" })
    .catch(() => new Date()),
  rooms: z.number().default(1),
  guests: z.number().default(1),
});

export const filterSearchParamsSchema = z.object({
  destination: z.string().trim(),
  checkIn: z.string().default(new Date().toISOString()),
  checkOut: z.string().default(new Date().toISOString()),
  rooms: z.coerce.number().int().min(1).max(MAX_GUESTS).optional(),
  guests: z.coerce.number().int().min(1).max(MAX_ROOMS).optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  freebies: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  hotelType: z.enum(["hotel", "motel", "resort"]).default("hotel"),
  favType: z.enum(["hotel", "flight"]).default("hotel"),
  sortBy: z.string().trim().default("avg_rating-desc"),
  page: z.coerce.number().int().min(1).catch(1).default(1),
});

export const filterAvailableRoomsWidgetSchema = z.object({
  checkIn: z
    .date({ message: "Check in date is required" })
    .catch(() => new Date()),
  checkOut: z
    .date({ message: "Check out date is required" })
    .catch(() => new Date()),
  rooms: z.number().default(1),
  guests: z.number().default(1),
});
