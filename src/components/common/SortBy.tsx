import type { FilterSearchParams } from "#/lib/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useSearch } from "@tanstack/react-router";

export default function SortBy() {
  const navigate = useNavigate({ from: "/hotels/" });
  const { sortBy }: FilterSearchParams = useSearch({
    from: "/_main/hotels/",
  });

  function onChange(value: FilterSearchParams["sortBy"]) {
    navigate({
      search: (prev) => ({ ...prev, sortBy: value, page: 1 }),
      resetScroll: false,
    });
  }

  return (
    <>
      <Select
        defaultValue={sortBy || "avg_rating-desc"}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full max-w-48 border-none p-0 font-semibold text-black ring-0!">
          <SelectValue placeholder={sortBy || "Recommended"} />
        </SelectTrigger>
        <SelectContent position="popper" align="end">
          <SelectGroup>
            <SelectItem value="avg_rating-desc">Recommended</SelectItem>
            <SelectItem value="price-asc">Cheapest first</SelectItem>
            <SelectItem value="price-desc">Most expensive first</SelectItem>
            <SelectItem value="star_rating-desc">Star rating</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
