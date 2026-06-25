import { BedDouble } from "lucide-react";

export function NoRoomsAvailable() {
  return (
    <div className="border-border flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed py-16 text-center">
      <div className="bg-muted flex size-16 items-center justify-center rounded-full">
        <BedDouble className="text-muted-foreground size-8" strokeWidth={1.5} />
      </div>
      <div className="space-y-1">
        <p className="text-foreground text-base font-semibold">
          No rooms available
        </p>
        <p className="text-muted-foreground max-w-xs text-sm">
          There are no rooms that match your search criteria. Try adjusting your
          dates or guest count.
        </p>
      </div>
    </div>
  );
}
