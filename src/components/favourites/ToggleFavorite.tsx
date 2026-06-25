import { cn } from "#/lib/utils";
import { isUserFavourites, toggleUserFavourites } from "#/server/favourites";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useUser } from "@clerk/tanstack-react-start";
import { useNavigate } from "@tanstack/react-router";

type ToggleFavoriteProps = {
  hotelId?: string;
  flightId?: string;
};

export default function ToggleFavorite({
  hotelId,
  flightId,
}: ToggleFavoriteProps) {
  const queryClient = useQueryClient();
  const [isFavouriteState, setIsFavouriteState] = useState(false);
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation(
    {
      mutationFn: toggleUserFavourites,
      onSuccess: () => {},
    },
    queryClient,
  );

  function handleClick() {
    if (!isSignedIn) {
      navigate({ to: "/sign-in" });
    }
    if (!hotelId && !flightId) return;
    const newValue = !isFavouriteState;
    setIsFavouriteState(newValue);
    mutate({ data: { hotelId, flightId } });
  }

  useEffect(() => {
    isUserFavourites({ data: { hotelId, flightId } }).then(({ isFavourite }) =>
      setIsFavouriteState(isFavourite),
    );
  }, [hotelId, flightId]);

  return (
    <Button
      className="aspect-square size-12 h-full bg-transparent"
      variant="outline"
      onClick={handleClick}
      disabled={isPending}
    >
      <Heart className={cn("size-5", isFavouriteState && "fill-black")} />
    </Button>
  );
}
