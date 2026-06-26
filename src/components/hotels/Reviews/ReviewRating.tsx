import StarsRating from "#/components/common/StarsRating";
import { ratingTexts } from "#/lib/constants";
import { useState } from "react";
import { Controller } from "react-hook-form";

type ReviewRatingProps = {
  selectedRating: number;
  control: any;
};

export default function ReviewRating({
  selectedRating,
  control,
}: ReviewRatingProps) {
  const [hoveredStar, setHoveredStar] = useState(0);

  const ratingText =
    ratingTexts[hoveredStar || selectedRating] ||
    ratingTexts[selectedRating] ||
    "";

  return (
    <Controller
      name="rating"
      control={control}
      rules={{ required: "Please select a rating" }}
      render={({ field, fieldState }) => (
        <div className="bg-muted/40 flex flex-col items-center gap-3 rounded-xl border px-6 py-5">
          <span className="text-muted-foreground text-[11px] font-medium tracking-widest uppercase">
            Overall rating
          </span>
          <StarsRating
            selectedRating={selectedRating}
            hoveredStar={hoveredStar}
            setHoveredStar={setHoveredStar}
            onClick={(star: number) => field.onChange(star)}
          />
          <span className="text-muted-foreground min-h-[18px] text-[13px] font-medium">
            {ratingText}
          </span>
          {fieldState.error && (
            <p className="text-destructive text-[12px]">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
