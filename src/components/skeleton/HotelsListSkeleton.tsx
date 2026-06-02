import { Skeleton } from "../ui/skeleton";

export default function HotelsListSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="box-shadow-sm border-foreground/15 flex flex-col overflow-hidden rounded-[12px] border bg-white md:flex-row"
        >
          {/* Image */}
          <Skeleton className="h-[260px] w-full md:w-[320px]" />

          {/* Content */}
          <div className="flex w-full flex-col justify-between gap-3 p-6">
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

                <div className="hidden space-y-3 text-end md:block">
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
  );
}
