import { getUserFavourites } from "#/server/favourites";
import { useQuery } from "@tanstack/react-query";

export function useFavouriteHotels() {
  const { data = [], ...query } = useQuery({
    queryKey: ["favourites", "hotel"],
    queryFn: () =>
      getUserFavourites({
        data: {
          favType: "hotel",
        },
      }),
  });

  const favouriteIds = new Set(
    data.map((item) => item.hotel_id).filter(Boolean),
  );

  return {
    favouriteHotels: data,
    favouriteIds,
    ...query,
  };
}
