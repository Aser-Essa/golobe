import type { FilterSearchParams, HotelType } from "#/lib/types";
import { getAvailableRooms } from "#/lib/utils/filters";
import { useSearch } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";

type AvailableRoomsProps = {
  rooms: HotelType["rooms"];
};

export default function AvailableRooms({ rooms }: AvailableRoomsProps) {
  const searchParams: FilterSearchParams = useSearch({
    from: "/_main/hotels/$/id/",
  });

  const avaialbleRooms = getAvailableRooms({
    rooms,
    checkIn: searchParams.checkIn || new Date().toISOString().split("T")[0],
    checkOut: searchParams.checkOut || new Date().toISOString().split("T")[0],
  });

  console.log(avaialbleRooms);

  return (
    <>
      <div className="space-y-8">
        <p className="text-xl font-bold">Available Rooms</p>
        <div className="space-y-4">
          {rooms.map(({ id, image_url, description, price_per_night }) => (
            <Fragment key={`${id}-${description}`}>
              <div className="flex h-12 items-center justify-between gap-12">
                <div className="flex items-center gap-4">
                  <div className="aspect-square size-12 overflow-hidden rounded-sm">
                    <img
                      src={image_url || ""}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-base font-medium">{description}</p>
                </div>

                <div className="flex items-center gap-16">
                  <p className="text-2xl font-semibold">
                    ${price_per_night}
                    <span className="text-sm">/night</span>
                  </p>
                  <Button className="h-12 w-37.5 px-4 py-2 font-semibold">
                    Book now
                  </Button>
                </div>
              </div>

              <Separator className="last:hidden" />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
