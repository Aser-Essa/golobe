import { Skeleton } from "#/components/ui/skeleton";
import { Separator } from "../ui/separator";

export function BookingSummaryCardSkeleton() {
  return (
    <li className="box-shadow-sm flex flex-col items-center justify-between gap-8 rounded-[16px] bg-white px-6 py-8 lg:items-start xl:flex-row xl:items-center">
      <div className="flex w-full flex-col items-center gap-8 lg:flex-row">
        {/* Hotel logo */}
        <Skeleton className="hidden aspect-square size-20 min-w-20 rounded-[8px] lg:block" />

        <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row lg:w-auto lg:justify-normal lg:gap-6">
          {/* Check-in / Check-out dates */}
          <div className="flex w-full items-center gap-4 sm:w-auto">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>
            <p>—</p>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>

          <Separator
            orientation="vertical"
            className="hidden bg-[#D7E2EE] md:block"
          />

          {/* Times & Room */}
          <div className="flex flex-wrap items-start gap-8 gap-y-4 md:gap-6">
            <div className="flex flex-row gap-8 lg:flex-col lg:gap-2">
              {/* Check-in time */}
              <div className="flex items-center gap-2">
                <Skeleton className="size-8 rounded-[4px]" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-14" />
                </div>
              </div>
              {/* Check-out time */}
              <div className="flex items-center gap-2">
                <Skeleton className="size-8 rounded-[4px]" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-14" />
                </div>
              </div>
            </div>

            {/* Room no. */}
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-[4px]" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex w-full items-center justify-center gap-4 lg:ml-auto lg:w-auto lg:justify-normal">
        <Skeleton className="h-10 flex-1 rounded-md lg:w-36 lg:flex-none" />
        <Skeleton className="size-12 rounded-md" />
      </div>
    </li>
  );
}
