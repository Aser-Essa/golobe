import type { FilterSearchParams, HotelType } from "#/lib/types";
import { getAvailableRooms } from "#/lib/utils/filters";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import ViewRoomDetails from "./ViewRoomDetails";

type AvailableRoomsProps = {
  rooms: HotelType["rooms"];
};

export default function AvailableRooms({ rooms }: AvailableRoomsProps) {
  const navigate = useNavigate();

  const searchParams: FilterSearchParams = useSearch({
    from: "/_main/hotels/$id/",
  });

  const availableRooms = getAvailableRooms({
    rooms,
    checkIn: searchParams.checkIn || new Date().toISOString().split("T")[0],
    checkOut: searchParams.checkOut || new Date().toISOString().split("T")[0],
  });

  const requiredRooms = searchParams.rooms || 1;
  const requiredGuests = searchParams.guests || 1;

  const roomCapacity = Math.ceil(requiredGuests / requiredRooms);

  const avaliableRoomsCapacity = availableRooms.filter(
    (room) => room.max_guests >= roomCapacity,
  );

  const handleBookNow = (roomId: string) => {
    navigate({
      to: `/bookings/${roomId}`,
      search: (prev) => ({
        ...prev,
      }),
    });
  };

  return (
    <div className="space-y-8">
      <p className="text-xl font-bold">Available Rooms</p>
      <div className="space-y-4">
        {avaliableRoomsCapacity.map(
          (
            {
              id,
              name,
              image_url,
              description,
              price_per_night,
              view_type,
              bed_type,
            },
            i,
          ) => (
            <Fragment key={`${id}-${description}`}>
              <div className="flex h-12 items-center justify-between gap-12">
                <div className="flex items-center gap-4">
                  <div className="aspect-square size-12 overflow-hidden rounded-sm">
                    <img
                      src={image_url || ""}
                      alt={name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-base font-medium">
                    {name} {view_type ? `- ${view_type}` : ""} - {bed_type}
                  </p>
                </div>
                <div className="flex items-center gap-16">
                  <p className="text-2xl font-semibold">
                    ${price_per_night}
                    <span className="text-sm">/night</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <ViewRoomDetails room={avaliableRoomsCapacity[i]} />

                    <Button
                      className="h-12 w-37.5 px-4 py-2 font-semibold"
                      onClick={() => handleBookNow(id)}
                    >
                      Book now
                    </Button>
                  </div>
                </div>
              </div>

              <Separator className="last:hidden" />
            </Fragment>
          ),
        )}
      </div>
    </div>
  );
}
