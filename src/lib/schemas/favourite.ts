import z from "zod";

export const favouriteSchema = z
  .object({
    hotelId: z.string().optional(),
    flightId: z.string().optional(),
  })
  .refine((data) => data.hotelId || data.flightId, {
    message: "Either hotelId or flightId is required",
  });
