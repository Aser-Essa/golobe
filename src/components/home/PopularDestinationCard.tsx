import type { Tables } from "#/lib/types/supabase";
import { Link } from "@tanstack/react-router";

type PopularDestinationCard = {
  destination: Tables<"popular_destinations">;
};

export default function PopularDestinationCard({
  destination,
}: PopularDestinationCard) {
  return (
    <Link
      viewTransition
      to="/hotels"
      search={{ destination: destination.country || destination.city || "" }}
      className="box-shadow-sm relative inline-block h-80 overflow-hidden rounded-[16px]"
    >
      <img
        src={destination.image || "/"}
        alt={destination.city || ""}
        className="h-full w-full object-cover"
      />
      <div className="absolute bottom-0 left-0 h-1/2 w-full bg-linear-to-t from-black/65 to-transparent"></div>
      <div className="absolute bottom-0 left-0 mt-auto flex h-20 w-full flex-col items-start justify-end gap-1 px-4 pb-4 text-white">
        <p className="font-trade-gothic text-xl font-semibold">
          {destination.country}
        </p>
        <p className="text-sm font-medium">{destination.stays} stays</p>
      </div>
    </Link>
  );
}
