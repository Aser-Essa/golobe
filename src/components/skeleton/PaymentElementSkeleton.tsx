import { Skeleton } from "../ui/skeleton";

export default function PaymentElementSkeleton() {
  return (
    <div className=" w-full space-y-2">
      <Skeleton className="h-[51.5px] w-full" />
      <Skeleton className="h-[51.5px] w-full" />
      <Skeleton className="h-[51.5px] w-full" />
      <Skeleton className="h-[51.5px] w-full" />
    </div>
  );
}
