import type { FilterSearchParams, HotelType } from "#/lib/types";
import { getAvailableRooms } from "#/lib/utils/filters";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import ViewRoomDetails from "./ViewRoomDetails";
import { NoRoomsAvailable } from "./NoRoomsAvailable";

type AvailableRoomsProps = {
  rooms: HotelType["rooms"];
};

export default function AvailableRooms({ rooms }: AvailableRoomsProps) {
  const navigate = useNavigate();

  const searchParams: FilterSearchParams = useSearch({
    from: "/_main/hotels/$hotelId/",
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
      to: `/hotels/$hotelId/checkout/${roomId}`,
      search: (prev) => ({
        ...prev,
      }),
    });
  };

  if (avaliableRoomsCapacity.length === 0) return <NoRoomsAvailable />;

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
              <div className="flex flex-col items-center justify-between gap-x-12 gap-y-3 min-[880px]:flex-row">
                <div className="flex w-full items-center justify-between gap-6 sm:gap-12">
                  <div className="flex items-center gap-4">
                    <div className="aspect-square size-12 min-w-12 overflow-hidden rounded-sm">
                      <img
                        src={image_url || ""}
                        alt={name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="flex gap-1 text-sm font-medium sm:text-base">
                      <span>{name}</span>
                      <span className="hidden sm:block">
                        {view_type ? `- ${view_type}` : ""} - {bed_type}
                      </span>
                    </p>
                  </div>

                  <p className="text-xl font-semibold sm:text-2xl">
                    ${price_per_night}
                    <span className="text-sm">/night</span>
                  </p>
                </div>

                <div className="flex w-full items-center gap-2 min-[880px]:w-auto">
                  <ViewRoomDetails room={avaliableRoomsCapacity[i]} />
                  <Button
                    className="h-10 flex-1 px-4 py-2 font-semibold min-[880px]:h-12 lg:w-37.5"
                    onClick={() => handleBookNow(id)}
                  >
                    Book now
                  </Button>
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
