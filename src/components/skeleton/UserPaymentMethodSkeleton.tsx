import { Skeleton } from "#/components/ui/skeleton";

export function UserPaymentMethodSkeleton() {
  return (
    <div className="border-primary flex h-53 w-full flex-col justify-between rounded-[16px] border p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-10 w-20" />
        </div>

        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>

        <Skeleton className="h-10 w-14 rounded-md" />
      </div>
    </div>
  );
}
