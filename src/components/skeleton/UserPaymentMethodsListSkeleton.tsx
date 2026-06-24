import { Skeleton } from "../ui/skeleton";
import { UserPaymentMethodSkeleton } from "./UserPaymentMethodSkeleton";

export function UserPaymentMethodsListSkeleton({
  count = 2,
}: {
  count?: number;
}) {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <UserPaymentMethodSkeleton key={i} />
      ))}

      {/* Add card button skeleton */}
      <div className="border-primary flex h-53 w-full flex-col items-center justify-center gap-2.5 rounded-[16px] border-2 border-dashed">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-3.5 w-[90px]" />
      </div>
    </div>
  );
}
