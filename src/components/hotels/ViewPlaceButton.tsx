import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";

export default function ViewPlaceButton({ hotelId }: { hotelId: string }) {
  const navigate = useNavigate({ from: "/hotels/" });

  function handleNavigate() {
    navigate({
      to: `/hotels/${hotelId}`,
      search: (prev) => ({
        ...prev,
      }),
    });
  }

  return (
    <>
      <Button
        onClick={handleNavigate}
        className="h-full flex-1 rounded-[4px] text-sm font-semibold"
      >
        View Places
      </Button>
    </>
  );
}
