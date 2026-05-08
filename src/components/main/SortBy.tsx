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
      search: (prev) => ({ ...prev, sortBy: value }),
      resetScroll: false,
    });
  }

  return (
    <>
      <Select defaultValue={sortBy || "recommended"} onValueChange={onChange}>
        <SelectTrigger className="w-full max-w-48 border-none p-0 font-semibold text-black ring-0!">
          <SelectValue placeholder={sortBy || "Recommended"} />
        </SelectTrigger>
        <SelectContent position="popper" align="end">
          <SelectGroup>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="cheapest">Cheapest first</SelectItem>
            <SelectItem value="expensive">Most expensive first</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
