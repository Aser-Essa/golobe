import type { FilterSearchParams } from "#/lib/types";
import { useSearch } from "@tanstack/react-router";
import CheckboxFilter from "./CheckboxFilter";

export default function AmenitiesFilter({
  amenities,
}: {
  amenities: string[];
}) {
  const searchParams: FilterSearchParams = useSearch({
    from: "/_main/hotels/",
  });

  return (
    <CheckboxFilter
      title="Amenities"
      options={amenities}
      selected={searchParams.amenities ?? []}
      searchKey="amenities"
    />
  );
}
