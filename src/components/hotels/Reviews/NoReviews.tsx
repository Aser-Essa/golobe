import { MessageSquare } from "lucide-react";

export default function NoReviews() {
  return (
    <div className="border-border flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed py-16 text-center">
      <div className="bg-muted flex size-16 items-center justify-center rounded-full">
        <MessageSquare
          className="text-muted-foreground size-8"
          strokeWidth={1.5}
        />
      </div>
      <div className="space-y-1">
        <p className="text-base font-semibold">No reviews yet</p>
        <p className="text-muted-foreground max-w-xs text-sm">
          Be the first to share your experience at this hotel.
        </p>
      </div>
    </div>
  );
}
