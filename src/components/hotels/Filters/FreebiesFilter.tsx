import type { FilterSearchParams } from "#/lib/types";
import { useSearch } from "@tanstack/react-router";
import CheckboxFilter from "./CheckboxFilter";

export default function FreebiesFilter({ freebies }: { freebies: string[] }) {
  const searchParams: FilterSearchParams = useSearch({
    from: "/_main/hotels/",
  });

  return (
    <CheckboxFilter
      title="Freebies"
      options={freebies}
      selected={searchParams.freebies ?? []}
      searchKey="freebies"
    />
  );
}
