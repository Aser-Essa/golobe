import { cn } from "#/lib/utils";
import { Star } from "lucide-react";

interface StarsRatingProps {
  setHoveredStar: (star: number) => void;
  hoveredStar: number;
  selectedRating: number;
  onClick: (star: number) => void;
}

export default function StarsRating({
  setHoveredStar,
  hoveredStar,
  selectedRating,
  onClick,
}: StarsRatingProps) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(0)}
          onClick={() => onClick(star)}
          className="rounded-md p-1 focus:outline-none"
        >
          <Star
            size={30}
            className={cn(
              "transition-all duration-100",
              star <= (hoveredStar || selectedRating)
                ? "scale-110 fill-amber-400 text-amber-400"
                : "text-amber-400",
            )}
          />
        </button>
      ))}
    </div>
  );
}
