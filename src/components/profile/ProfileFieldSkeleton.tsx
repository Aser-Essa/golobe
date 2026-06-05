import { Skeleton } from "../ui/skeleton";

export default function ProfileFieldSkeleton({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <p className="text-foreground/75 text-sm">{label}</p>
        <Skeleton className="h-6 w-32" />
      </div>
      <Skeleton className="h-12 w-35 rounded-sm" />
    </div>
  );
}
