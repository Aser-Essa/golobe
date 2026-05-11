import type { FilterSearchParams } from "#/lib/types";
import { getFilterOptions } from "#/server/hotels";
import { useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import CheckboxFilter from "./CheckboxFilter";

export default function FreebiesFilter() {
  const [freebiesList, setFreebiesList] = useState<string[]>([]);

  const searchParams: FilterSearchParams = useSearch({
    from: "/_main/hotels/",
  });

  useEffect(() => {
    getFilterOptions().then((options) => setFreebiesList(options.freebies));
  }, []);

  return (
    <>
      <CheckboxFilter
        title="Freebies"
        options={freebiesList}
        selected={searchParams.freebies ?? []}
        searchKey="freebies"
      />
    </>
  );
}
