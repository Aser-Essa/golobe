import { cn } from "#/lib/utils/index.ts";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-[#e4e4e4]", className)}
      {...props}
    />
  );
}

export { Skeleton };
