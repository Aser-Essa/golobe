import { filterAvailableRoomsWidgetSchema } from "#/lib/schemas/search";
import type { FilterAvailableRoomsWidgetType } from "#/lib/types";
import { cn } from "#/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import DateField from "#/components/common/DateField";
import { Button } from "#/components/ui/button";
import { useBookingDates } from "#/hooks/useBookingDates";
import { format, startOfToday } from "date-fns";
import { Search } from "lucide-react";
import RoomGuestFilter from "./RoomGuestFilter";

export default function FilterAvailableRoomsWidget({
  searchParams,
  className,
}: {
  searchParams: FilterAvailableRoomsWidgetType;
  className?: string;
}) {
  const defaultValues = {
    checkIn: new Date(searchParams.checkIn),
    checkOut: new Date(searchParams.checkOut),
    rooms: searchParams.rooms || 1,
    guests: searchParams.guests || 1,
  };

  const { control, watch, setValue, handleSubmit } = useForm({
    resolver: zodResolver(filterAvailableRoomsWidgetSchema),
    defaultValues: defaultValues,
  });

  const { checkInDate, checkOutDate } = useBookingDates({ watch, setValue });

  const roomsFormValue = watch("rooms");
  const guestsFormValue = watch("guests");

  const today = startOfToday();

  const navigate = useNavigate({ from: "/hotels/$hotelId/" });

  function onSubmit(data: FilterAvailableRoomsWidgetType) {
    navigate({
      search: (prev) => ({
        ...prev,
        ...data,
        checkIn: format(data.checkIn, "yyyy-MM-dd"),
        checkOut: format(data.checkOut, "yyyy-MM-dd"),
      }),
      resetScroll: false,
      replace: true,
    });
  }

  return (
    <div
      className={cn(
        "box-shadow-sm z-50 space-y-8 rounded-[16px] bg-white pb-8",
        className,
      )}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-x-2 gap-y-4 md:flex-row")}
      >
        <div className="flex w-full flex-wrap items-start gap-x-2 gap-y-4">
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
            disabledDays={(day) => day <= checkInDate}
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
  );
}
