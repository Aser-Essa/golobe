import { SearchX } from "lucide-react";

type HotelsEmptyStateProps = {
  title?: string;
  description?: string;
};

export default function HotelsEmptyState({
  title = "No hotels found",
  description = "Try adjusting your filters or search criteria",
}: HotelsEmptyStateProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-[12px] border border-dashed bg-white py-20 text-center">
      <SearchX className="text-muted-foreground mb-4 size-10" />

      <h3 className="text-lg font-semibold text-black">{title}</h3>

      <p className="text-muted-foreground mt-2 text-sm">{description}</p>
    </div>
  );
}
