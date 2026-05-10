import SortBy from "../common/SortBy";

export default function HotelSortBy({
  totalCount,
  from,
  to,
}: {
  totalCount: number;
  from: number;
  to: number;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <p className="font-semibold">
        Showing {from}-{to} of{" "}
        <span className="text-salmon">{totalCount} places</span>
      </p>
      <div className="flex items-center gap-1">
        <p className="text-nowrap">Sort by</p>
        <SortBy />
      </div>
    </div>
  );
}
