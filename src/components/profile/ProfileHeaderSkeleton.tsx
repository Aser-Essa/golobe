import { Skeleton } from "#/components/ui/skeleton";

export function ProfileHeaderSkeleton() {
  return (
    <section>
      <div>
        <div className="flex flex-col items-center space-y-8 text-center">
          <Skeleton className="size-40 w-40 aspect-square rounded-full backdrop-blur-2xl!" />
          <div className="space-y-4">
            <Skeleton className="mx-auto h-6 w-48" />
            <Skeleton className="mx-auto h-4 w-64" />
          </div>
        </div>
      </div>
    </section>
  );
}
