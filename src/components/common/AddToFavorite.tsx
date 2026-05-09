import { Heart } from "lucide-react";
import { Button } from "../ui/button";

export default function AddToFavorite() {
  return (
    <>
      <Button
        className="aspect-square size-12 h-full bg-transparent"
        variant={"outline"}
      >
        <Heart className="size-5 text-[#4C4850]" />
      </Button>
    </>
  );
}
