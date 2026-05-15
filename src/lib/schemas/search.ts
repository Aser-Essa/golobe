import z from "zod";

export const hotelSearchWidgetSchema = z.object({
  destination: z
    .string()
    .min(1, { message: "Destination is required" })
    .catch(""),
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
  destination: z.string().trim().optional(),
  checkIn: z.coerce.string().default(new Date().toISOString()),
  checkOut: z.coerce.string().default(new Date().toISOString()),
  rooms: z.coerce.number().int().min(1).max(30).optional(),
  guests: z.coerce.number().int().min(1).max(16).optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  freebies: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  hotelType: z.enum(["hotel", "motel", "resort"]).default("hotel"),
  sortBy: z.string().trim().default("avg_rating-desc"),
  page: z.coerce.number().int().min(1).catch(1).default(1),
});

export const filterAvaliableRoomsWidgetSchema = z.object({
  checkIn: z
    .date({ message: "Check in date is required" })
    .catch(() => new Date()),
  checkOut: z
    .date({ message: "Check out date is required" })
    .catch(() => new Date()),
  rooms: z.number().default(1),
  guests: z.number().default(1),
});
