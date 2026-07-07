import { Skeleton } from "#/components/ui/skeleton";
import { Separator } from "#/components/ui/separator";

export default function HotelCardSkeleton() {
  return (
    <div className="box-shadow-sm flex h-full w-full flex-col overflow-hidden rounded-[12px] bg-white">
      {/* Cover */}
      <Skeleton className="aspect-16/11 w-full rounded-none" />

      <div className="flex h-full flex-col justify-between p-4">
        <div className="space-y-5">
          {/* Name + Price */}
          <div className="flex justify-between gap-3">
            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-4/5" />

              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />

                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <Separator />

          <div className="flex h-12 items-center gap-2">
            <Skeleton className="size-12 rounded-md" />
            <Skeleton className="h-12 flex-1 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
