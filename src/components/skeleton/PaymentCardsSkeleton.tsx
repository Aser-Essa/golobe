import { Skeleton } from "../ui/skeleton";

export default function PaymentCardsSkeleton() {
  return (
    <>
      {Array.from({ length: 2 }).map(() => (
        <div className="flex h-20 flex-col justify-center rounded-lg border px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              {/* Card Brand Icon */}
              <Skeleton className="h-8 w-8 rounded-md" />

              <div className="flex items-center gap-2">
                {/* **** 4242 */}
                <Skeleton className="h-5 w-20" />

                {/* Exp Date */}
                <Skeleton className="h-4 w-12" />
              </div>
            </div>

            {/* Radio Button */}
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        </div>
      ))}
    </>
  );
}
