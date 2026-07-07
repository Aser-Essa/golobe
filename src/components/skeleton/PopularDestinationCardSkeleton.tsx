import { Skeleton } from "#/components/ui/skeleton";

export default function PopularDestinationCardSkeleton() {
  return (
    <div className="relative h-80 overflow-hidden rounded-[16px]">
      <Skeleton className="absolute inset-0" />

      <div className="absolute bottom-0 left-0 flex w-full flex-col gap-2 p-4">
        <Skeleton className="h-6 w-32 bg-foreground/8" />
        <Skeleton className="h-4 w-20 bg-foreground/8" />
      </div>
    </div>
  );
}
