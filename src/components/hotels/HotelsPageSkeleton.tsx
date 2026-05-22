import { Skeleton } from "#/components/ui/skeleton";
import { HOTEL_TYPES } from "#/lib/constants";
import { Fragment } from "react/jsx-runtime";
import { Separator } from "../ui/separator";

export default function HotelsPageSkeleton() {
  return (
    <div className="w-full space-y-8">
      {/* Hotel Type Filter Skeleton */}
      <div className="box-shadow-sm flex h-20 w-full items-center gap-6 rounded-[12px] bg-white px-6 py-4">
        {HOTEL_TYPES.map(({ label }, i) => (
          <Fragment key={`${i}-${label}`}>
            <Separator
              orientation="vertical"
              className="bg-[#D7E2EE] first:hidden"
            />
            <div className="flex h-full flex-1 flex-col justify-between space-y-2">
              {/* label is real */}
              <p className="text-base font-semibold text-black">{label}</p>

              {/* skeleton for count */}
              <div className="flex items-center gap-1">
                <Skeleton className="h-3 w-14" />
              </div>
            </div>
          </Fragment>
        ))}
      </div>

      {/* Top Section */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-52" />

        <div className="flex items-center gap-2">
          <p className="text-nowrap">Sort by</p>

          <Skeleton className="h-4 w-40 rounded-md" />
        </div>
      </div>

      {/* Hotels List */}
      <div className="space-y-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="box-shadow-sm flex overflow-hidden rounded-[12px] bg-white"
          >
            {/* Image */}
            <Skeleton className="h-[260px] w-[320px]" />

            {/* Content */}
            <div className="flex w-full flex-col justify-between p-6">
              <div className="space-y-6">
                <div className="flex justify-between gap-8">
                  <div className="flex-1 space-y-4">
                    <Skeleton className="h-7 w-64" />
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-5 w-56" />

                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-3 text-end">
                    <Skeleton className="ml-auto h-8 w-24" />
                    <Skeleton className="ml-auto h-5 w-20" />
                    <Skeleton className="ml-auto h-10 w-32 rounded-md" />
                  </div>
                </div>
              </div>

              <Skeleton className="h-px w-full" />

              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-10 rounded-md" />
        ))}
      </div>
    </div>
  );
}
