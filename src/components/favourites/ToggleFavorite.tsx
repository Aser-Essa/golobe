import { cn } from "#/lib/utils";
import { toggleUserFavourites } from "#/server/favourites";
import { useUser } from "@clerk/tanstack-react-start";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type ToggleFavoriteProps = {
  hotelId?: string;
  flightId?: string;
  initialFavourite?: boolean;
};

export default function ToggleFavorite({
  hotelId,
  initialFavourite,
  flightId,
}: ToggleFavoriteProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const [isFavourite, setIsFavourite] = useState(initialFavourite ?? false);

  const { mutate, isPending } = useMutation({
    mutationFn: toggleUserFavourites,

    onMutate: async () => {
      setIsFavourite((prev) => !prev);
    },

    onError: () => {
      setIsFavourite((prev) => !prev);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["favourites"],
      });
    },
  });

  function handleClick() {
    if (!isSignedIn) {
      navigate({ to: "/sign-in" });
      return;
    }

    if (!hotelId && !flightId) return;

    mutate({
      data: {
        hotelId,
        flightId,
      },
    });
  }

  useEffect(() => {
    setIsFavourite(initialFavourite ?? false);
  }, [initialFavourite]);

  if (!isSignedIn) return null;

  return (
    <Button
      variant="outline"
      className="aspect-square size-12 bg-transparent"
      onClick={handleClick}
      disabled={isPending}
    >
      <Heart
        className={cn("size-5 transition-colors", isFavourite && "fill-black")}
      />
    </Button>
  );
}
