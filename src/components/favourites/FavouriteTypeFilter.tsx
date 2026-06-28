import type { FilterSearchParams } from "#/lib/types";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { TabFilter } from "../common/TabFilter";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserFavourites } from "#/server/favourites";

export default function FavouriteTypeFilter() {
  const navigate = useNavigate({ from: "/favourites/" });
  const { favType }: FilterSearchParams = useSearch({
    from: "/_main/_protected/favourites/",
  });

  const { data } = useSuspenseQuery({
    queryKey: ["favourites", favType],
    queryFn: () => getUserFavourites({ data: { favType } }),
  });

  const hotelCount = data.filter((f) => f.hotel_id).length;
  const flightCount = data.filter((f) => f.flight_id).length;

  return (
    <TabFilter
      defaultValue={favType}
      className="mt-6"
      onValueChange={(value) =>
        navigate({
          search: (prev) => ({
            ...prev,
            favType: value as FilterSearchParams["favType"],
          }),
          resetScroll: false,
        })
      }
      options={[
        {
          value: "hotel",
          label: "Hotels",
          description: `${hotelCount} marked`,
        },
        {
          value: "flights",
          label: "Flights",
          description: `${flightCount} marked`,
          disabled: true,
        },
      ]}
    />
  );
}
