import { REVIEWS_PER_PAGE } from "#/lib/constants";
import { supabase } from "#/lib/supabase";
import { getPaginationRange } from "#/lib/utils";
import { auth } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

const REVIEW_SELECT = `
        *,
        user:user_profiles(
          id,
          full_name,
          avatar_url
        )
      `;

function resolveCount(
  result: { count: number | null; error: Error | null },
  message: string,
) {
  if (result.error) throw new Error(result.error.message);

  if (result.count === null) throw new Error(message);

  return result.count;
}

const buildHotelReviewsCountQuery = (hotelId: string) =>
  supabase
    .from("reviews")
    .select("*", { count: "exact", head: true })
    .eq("hotel_id", hotelId);

export const getReviewStats = async (hotelId: string) => {
  const countQueries = [
    buildHotelReviewsCountQuery(hotelId),
    buildHotelReviewsCountQuery(hotelId).eq("is_verified", true),
  ];

  const [countResult, countVerifiedResult] = await Promise.all(countQueries);

  const count = resolveCount(countResult, "Failed to fetch reviews count");

  const countVerified = resolveCount(
    countVerifiedResult,
    "Failed to fetch verified reviews count",
  );

  return {
    count,
    countVerified,
  };
};

export const getMyAddedReviews = async (hotelId: string) => {
  const { userId } = await auth();

  if (!userId) {
    return {
      myAddedReview: null,
    };
  }

  const { data: myAddedReview, error } = await supabase
    .from("reviews")
    .select(REVIEW_SELECT)
    .eq("hotel_id", hotelId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return { myAddedReview };
};
export const getMyAddedReviewsServer = createServerFn({
  method: "GET",
})
  .inputValidator(z.object({ hotelId: z.string() }))
  .handler(async ({ data: { hotelId } }) => {
    return await getMyAddedReviews(hotelId);
  });

export const getReviewsTotalPages = (reviews_page: number, count: number) => {
  const { totalPages } = getPaginationRange({
    page: reviews_page,
    perPage: REVIEWS_PER_PAGE,
    totalItems: count,
  });

  return totalPages;
};

export const getReviews = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      hotelId: z.string(),
      reviews_page: z.coerce.number().int().min(1).catch(1).default(1),
      count: z.number(),
    }),
  )
  .handler(async ({ data: { hotelId, reviews_page, count } }) => {
    if (count === 0) return { reviews: [] };

    const { from, to } = getPaginationRange({
      page: reviews_page,
      perPage: REVIEWS_PER_PAGE,
      totalItems: count,
    });

    const { data: reviews, error: reviewsError } = await supabase
      .from("reviews")
      .select(REVIEW_SELECT)
      .eq("hotel_id", hotelId)
      .order("created_at", { ascending: false })
      .range(from, to - 1);

    if (reviewsError) throw new Error(reviewsError.message);

    return { reviews };
  });
