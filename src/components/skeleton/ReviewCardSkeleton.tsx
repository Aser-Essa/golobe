import { Skeleton } from "#/components/ui/skeleton";

export default function ReviewCardSkeleton() {
  return (
    <div className="flex justify-between gap-4">
      <div className="flex min-w-0 flex-1 items-start gap-4">
        {/* Avatar */}
        <Skeleton className="size-11.25 rounded-full" />

        <div className="min-w-0 flex-1 space-y-3">
          {/* Rating + Name */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-1" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Review body */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[65%]" />
          </div>
        </div>
      </div>

      {/* Verified icon */}
      <Skeleton className="size-5 rounded-full" />
    </div>
  );
}
