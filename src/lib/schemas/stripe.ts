import z from "zod";

export const BookingPriceBreakdownSchema = z.object({
  restToPay: z.number(),
  amountToPay: z.number(),
  baseFare: z.number(),
  taxes: z.number(),
  total: z.number(),
  totalNights: z.number(),
  serviceFee: z.number(),
});

export const createBookingSchema = z.object({
  roomId: z.string(),
  hotelId: z.string(),
  guests: z.number().default(1),
  BookingPriceBreakdown: BookingPriceBreakdownSchema,
  paymentMode: z.enum(["full", "split"]).default("full"),
  paymentMethodId: z.string().optional(),
  checkIn: z.string(),
  checkOut: z.string(),
});

export const bookingToInsertSchema = z
  .object({
    user_id: z.string().min(1),
    hotel_id: z.string().uuid(),
    room_id: z.string().uuid(),

    check_in: z.coerce.date(),
    check_out: z.coerce.date(),

    guests: z.number().int().positive(),

    base_fare: z.number().nonnegative(),
    discount: z.number().nonnegative().default(0),
    taxes: z.number().nonnegative().default(0),
    service_fee: z.number().nonnegative().default(0),

    payment_mode: z.enum(["full", "split"]),

    payment_status: z.enum([
      "pending",
      "partial",
      "paid",
      "refunded",
      "failed",
    ]),

    status: z.enum(["confirmed", "cancelled", "completed", "no_show"]),

    promo_code: z.string().nullable().optional(),
  })
  .refine((data) => data.check_out > data.check_in, {
    message: "Check out date must be after check in date",
    path: ["check_out"],
  });
