import z from "zod";

export const hotelSearchWidgetSchema = z.object({
  destination: z.string().min(1, { message: "Destination is required" }),
  checkIn: z.date({ message: "Check in date is required" }),
  checkOut: z.date({ message: "Check out date is required" }),
  rooms: z.number().default(1),
  guests: z.number().default(1),
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
