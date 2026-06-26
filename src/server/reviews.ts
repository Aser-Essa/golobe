import {
  insertReviewDBSchema,
  updateReviewDBSchema,
} from "#/lib/schemas/review";
import { supabase } from "#/lib/supabase";
import { authFnMiddleware } from "#/middlewares/auth";
import { createServerFn } from "@tanstack/react-start";

export const createReview = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .inputValidator(insertReviewDBSchema)
  .handler(async ({ data, context: { userId } }) => {
    const { data: review, error } = await supabase
      .from("reviews")
      .insert([{ ...data, user_id: userId }])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return review;
  });

export const updateReview = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .inputValidator(updateReviewDBSchema)
  .handler(async ({ data, context: { userId } }) => {
    const { data: review, error } = await supabase
      .from("reviews")
      .update({ ...data, user_id: userId })
      .eq("id", data.id)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return review;
  });
