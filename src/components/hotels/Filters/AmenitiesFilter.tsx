import type { FilterSearchParams } from "#/lib/types";
import { getFilterOptions } from "#/server/hotels";
import { useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import CheckboxFilter from "./CheckboxFilter";

export default function AmenitiesFilter() {
  const [amenitiesList, setAmenitiesList] = useState<string[]>([]);

  const searchParams: FilterSearchParams = useSearch({
    from: "/_main/hotels/",
  });

  useEffect(() => {
    getFilterOptions().then((options) => setAmenitiesList(options.amenities));
  }, []);

  return (
    <>
      <CheckboxFilter
        title="Amenities"
        options={amenitiesList}
        selected={searchParams.amenities ?? []}
        searchKey="amenities"
      />
    </>
  );
}
