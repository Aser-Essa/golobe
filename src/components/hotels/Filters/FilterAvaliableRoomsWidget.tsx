import { filterAvaliableRoomsWidgetSchema } from "#/lib/schemas/search";
import type { filterAvaliableRoomsWidgetType } from "#/lib/types";
import { cn } from "#/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import DateField from "#/components/common/DateField";
import { Button } from "#/components/ui/button";
import { Search } from "lucide-react";
import RoomGuestFilter from "./RoomGuestFilter";

export default function FilterAvaliableRoomsWidget({
  searchParams,
}: {
  searchParams: filterAvaliableRoomsWidgetType;
}) {
  const defaultValues = {
    checkIn: new Date(searchParams.checkIn),
    checkOut: new Date(searchParams.checkOut),
    rooms: searchParams.rooms || 1,
    guests: searchParams.guests || 1,
  };

  const { control, watch, setValue, handleSubmit } = useForm({
    resolver: zodResolver(filterAvaliableRoomsWidgetSchema),
    defaultValues: defaultValues,
  });

  const checkInDate = watch("checkIn");
  const checkOutDate = watch("checkOut");
  const roomsFormValue = watch("rooms");
  const guestsFormValue = watch("guests");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const navigate = useNavigate({ from: "/hotels/$/id/" });

  useEffect(() => {
    if (checkOutDate > checkInDate) return;
    setValue("checkOut", checkInDate);
  }, [checkInDate]);

  function onsubmit(data: filterAvaliableRoomsWidgetType) {
    navigate({
      search: (prev) => ({ ...prev, ...data }),
      resetScroll: false,
    });
  }

  return (
    <>
      <div className="box-shadow-sm z-50 mx-20 translate-y-[-29%] space-y-8 rounded-[16px] bg-white px-6 py-8">
        <form onSubmit={handleSubmit(onsubmit)} className={cn("flex gap-2")}>
          <div className="flex w-full items-start gap-2">
            <DateField
              name="checkIn"
              label="Check In"
              control={control}
              date={checkInDate}
              disabledDays={(day) => day < today}
            />

            <DateField
              name="checkOut"
              label="Check Out"
              control={control}
              date={checkOutDate}
              disabledDays={(day) => day < checkInDate}
            />
            <RoomGuestFilter
              setValue={setValue}
              roomsFormValue={roomsFormValue}
              guestsFormValue={guestsFormValue}
            />
          </div>
          <Button
            type="submit"
            className="flex aspect-square h-14 items-center gap-1 px-4 py-2 text-sm font-medium"
          >
            <Search className="size-5" />
          </Button>
        </form>
      </div>
    </>
  );
}
