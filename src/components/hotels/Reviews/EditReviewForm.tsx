import { Button } from "#/components/ui/button";
import { DialogClose, DialogFooter } from "#/components/ui/dialog";
import { Textarea } from "#/components/ui/textarea";
import { reviewFormSchema } from "#/lib/schemas/review";
import type { HotelType, reviewFormValues } from "#/lib/types";
import { updateReview } from "#/server/reviews";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import ReviewRating from "./ReviewRating";

type EditReviewFormProps = {
  hotelId: HotelType["id"];
  bookingId: string;
  reviewAdded: HotelType["reviews"][0];
  setIsOpen: (value: boolean) => void;
};

export default function EditReviewForm({
  reviewAdded,
  setIsOpen,
}: EditReviewFormProps) {
  const { control, handleSubmit, watch } = useForm({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: reviewAdded.rating,
      review: reviewAdded.body || "",
    },
  });

  const selectedRating = watch("rating") || 0;
  const reviewValue = watch("review");
  const router = useRouter();

  const onSubmit = async (data: reviewFormValues) => {
    await updateReview({
      data: {
        id: reviewAdded.id,
        rating: data.rating,
        body: data.review,
      },
    });

    toast.success("Review updated successfully");
    router.invalidate();
    setIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <ReviewRating selectedRating={selectedRating} control={control} />

      <Controller
        name="review"
        control={control}
        rules={{ required: "Review is required" }}
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-1.5">
            <label className="text-muted-foreground text-[13px] font-medium">
              Your review
            </label>
            <Textarea
              {...field}
              autoFocus={true}
              maxLength={500}
              placeholder="What did you enjoy most about your experience?"
              className="min-h-32 resize-none rounded-lg text-[14px] leading-relaxed focus-visible:ring-1"
            />
            <div className="flex items-center justify-between">
              {fieldState.error ? (
                <p className="text-destructive text-[12px]">
                  {fieldState.error.message}
                </p>
              ) : (
                <span />
              )}
              <span className="text-muted-foreground text-[12px]">
                {reviewValue.length} / 500
              </span>
            </div>
          </div>
        )}
      />

      <DialogFooter className="gap-2">
        <DialogClose asChild>
          <Button
            variant="outline"
            type="button"
            className="h-9 text-[13px] font-medium"
          >
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" className="h-9 text-[13px] font-medium">
          Submit review
        </Button>
      </DialogFooter>
    </form>
  );
}
