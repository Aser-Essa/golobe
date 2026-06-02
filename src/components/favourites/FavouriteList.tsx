import type { HotelType } from "#/lib/types";
import { getUserFavourites } from "#/server/favourites";
import { useSuspenseQuery } from "@tanstack/react-query";
import HotelsEmptyState from "../hotels/HotelsEmptyState";
import HotelsList from "../hotels/HotelsList";

type FavouriteListProps = {
  favType: "hotel" | "flight";
};

export default function FavouriteList({ favType }: FavouriteListProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["favourites", favType],
    queryFn: () => getUserFavourites({ data: { favType } }),
  });

  if (data.length === 0) {
    return (
      <HotelsEmptyState
        title="No favourites yet"
        description="Mark any hotel as favourite to see them here"
      />
    );
  }

  if (favType === "flight") {
    return <div>Flight favourites</div>;
  }

  const hotels: HotelType[] = data.map((item) => item.hotel);

  return <HotelsList hotels={hotels} />;
}
