import SortBy from "../common/SortBy";

export default function HotelSortBy({ totalCount }: { totalCount: number }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <p className="font-semibold">
        Showing 4 of <span className="text-salmon">{totalCount} places</span>
      </p>
      <div className="flex items-center gap-1">
        <p className="text-nowrap">Sort by</p>
        <SortBy />
      </div>
    </div>
  );
}
