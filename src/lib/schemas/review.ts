import z from "zod";

const ratingSchema = z.number().default(0);

const reviewBodySchema = z
  .string()
  .min(1, "Review is required")
  .min(20, "Review must be at least 20 characters")
  .max(500, "Review must not exceed 500 characters")
  .trim();

export const reviewFormSchema = z.object({
  rating: ratingSchema,
  review: reviewBodySchema,
});

export const insertReviewDBSchema = z.object({
  rating: ratingSchema,
  body: reviewBodySchema,
  hotel_id: z.string(),
  booking_id: z.string(),
  is_verified: z.boolean().default(false),
});

export const updateReviewDBSchema = z.object({
  id: z.string(),
  rating: ratingSchema,
  body: reviewBodySchema,
});
