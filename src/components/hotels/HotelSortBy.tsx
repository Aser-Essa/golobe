import SortBy from "../common/SortBy";

export default function HotelSortBy() {
  return (
    <div className="flex items-center gap-1">
      <p className="text-nowrap text-xs md:text-sm">Sort by</p>
      <SortBy />
    </div>
  );
}
