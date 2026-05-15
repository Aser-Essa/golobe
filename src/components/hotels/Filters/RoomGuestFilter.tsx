import { FieldLabel } from "#/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Minus, Plus, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

type RoomGuestFilterProps = {
  setValue: (name: "rooms" | "guests", value: number) => void;
  roomsFormValue: number | undefined;
  guestsFormValue: number | undefined;
};

export default function RoomGuestFilter({
  setValue,
  roomsFormValue = 1,
  guestsFormValue = 1,
}: RoomGuestFilterProps) {
  const [rooms, setRooms] = useState(roomsFormValue);
  const [guests, setGuests] = useState(guestsFormValue);
  const maxGuests = rooms * 3;

  const increaseRooms = () => {
    if (rooms >= 10) return;
    setRooms((prev) => prev + 1);
  };

  const decreaseRooms = () => {
    if (rooms <= 1) return;
    setRooms((prev) => prev - 1);
  };

  const increaseGuests = () => {
    if (guests >= maxGuests) return;
    setGuests((prev) => prev + 1);
  };

  const decreaseGuests = () => {
    if (guests <= 1) return;
    setGuests((prev) => prev - 1);
  };

  useEffect(() => {
    setValue("rooms", rooms);
    setValue("guests", guests);
  }, [rooms, guests]);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={""}
            className="data-[empty=true]:text-muted-foreground relative h-14 w-[240px] flex-1! justify-between rounded-[4px] border-[#79747E] px-4 text-left font-normal"
          >
            <div className="flex items-center justify-start gap-2">
              <UserRound className="size-5" />
              <span>
                {rooms} room{rooms > 1 && "s"} - {guests} guest
                {guests > 1 && "s"}
              </span>
            </div>

            <ChevronDown className="size-5" />

            <FieldLabel className="absolute -top-2.25 left-3 w-fit! bg-white px-1 text-sm font-normal"></FieldLabel>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-2" align="start">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Rooms</p>
                <p className="text-muted-foreground text-xs">Max 10 rooms</p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  onClick={decreaseRooms}
                  variant={"outline"}
                  className="aspect-square size-8 rounded-full!"
                >
                  <Minus />
                </Button>
                <p className="font-semibold">{rooms}</p>
                <Button
                  onClick={increaseRooms}
                  variant={"outline"}
                  className="aspect-square size-8 rounded-full!"
                >
                  <Plus />
                </Button>
              </div>
            </div>

            <div className="bg-foreground/20 my-3 h-px w-full"></div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Gusest</p>
                <p className="text-muted-foreground text-xs">
                  Max {maxGuests} guests
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  onClick={decreaseGuests}
                  variant={"outline"}
                  className="aspect-square size-8 rounded-full!"
                >
                  <Minus />
                </Button>
                <p className="font-semibold">{guests}</p>
                <Button
                  onClick={increaseGuests}
                  variant={"outline"}
                  className="aspect-square size-8 rounded-full!"
                >
                  <Plus />
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
