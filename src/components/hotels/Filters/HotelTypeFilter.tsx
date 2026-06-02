import { TabFilter } from "#/components/common/TabFilter";
import { HOTEL_TYPES } from "#/lib/constants";
import type { FilterSearchParams } from "#/lib/types";
import { useNavigate, useSearch } from "@tanstack/react-router";

type TypePlaceCounts = Record<FilterSearchParams["hotelType"], number>;

export default function HotelTypeFilter({
  typePlaceCounts,
}: {
  typePlaceCounts: TypePlaceCounts;
}) {
  const navigate = useNavigate({ from: "/hotels/" });
  const { hotelType }: FilterSearchParams = useSearch({
    from: "/_main/hotels/",
  });

  return (
    <TabFilter
      defaultValue={hotelType}
      onValueChange={(value) =>
        navigate({
          search: (prev) => ({
            ...prev,
            hotelType: value as FilterSearchParams["hotelType"],
          }),
          resetScroll: false,
        })
      }
      options={HOTEL_TYPES.map(({ value, label }) => ({
        value,
        label,
        description: `${typePlaceCounts[value]} places`,
      }))}
    />
  );
}
