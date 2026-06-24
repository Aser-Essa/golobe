import { BookingSummaryCardSkeleton } from "./BookingSummaryCardSkeleton";

export function BookingSummaryCardsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <ul className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <BookingSummaryCardSkeleton key={i} />
      ))}
    </ul>
  );
}
