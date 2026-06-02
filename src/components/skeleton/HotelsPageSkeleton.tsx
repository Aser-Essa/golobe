import { Skeleton } from "#/components/ui/skeleton";
import { HOTEL_TYPES } from "#/lib/constants";
import HotelsListSkeleton from "./HotelsListSkeleton";
import TypeFilterSkeleton from "./TypeFilterSkeleton";

export default function HotelsPageSkeleton() {
  return (
    <div className="w-full space-y-8">
      {/* Hotel Type Filter Skeleton */}
      <TypeFilterSkeleton TYPES_TABS={HOTEL_TYPES} />

      {/* Top Section */}
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-5 w-52" />

        <div className="flex items-center gap-2">
          <p className="text-nowrap">Sort by</p>

          <Skeleton className="h-4 w-40 rounded-md" />
        </div>
      </div>

      {/* Hotels List */}
      <HotelsListSkeleton />

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-10 rounded-md" />
        ))}
      </div>
    </div>
  );
}
