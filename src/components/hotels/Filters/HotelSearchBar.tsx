import { hotelSearchWidgetSchema } from "#/lib/schemas/search";
import type { HotelSearchWidgetType } from "#/lib/types";
import { cn, mapHotelWidgetToSearchParams } from "#/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import DateField from "#/components/common/DateField";
import DestinationSearch from "./DestinationSearch";
import RoomGuestFilter from "./RoomGuestFilter";

export default function HotelSearchBar({
  searchParams,
  className,
  submitButton,
}: {
  searchParams: HotelSearchWidgetType;
  className?: string;
  submitButton?: React.ReactNode;
}) {
  const defaultValues = searchParams;

  const { control, watch, setValue, handleSubmit } = useForm({
    resolver: zodResolver(hotelSearchWidgetSchema),
    defaultValues: defaultValues,
  });

  const checkInDate = watch("checkIn");
  const checkOutDate = watch("checkOut");
  const roomsFormValue = watch("rooms");
  const guestsFormValue = watch("guests");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const navigate = useNavigate();

  useEffect(() => {
    if (checkOutDate > checkInDate) return;
    setValue("checkOut", checkInDate);
  }, [checkInDate]);

  function onSubmit(data: HotelSearchWidgetType) {
    if (data.destination.trim().length === 0) {
      navigate({
        to: "/",
      });
      return;
    }

    const mappedSearchParams = mapHotelWidgetToSearchParams(data);

    navigate({
      to: "/hotels",
      search: (prev) => ({ ...prev, ...mappedSearchParams }),
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex", className)}>
      <div className="flex w-full flex-wrap items-start gap-2 gap-y-4">
        <DestinationSearch control={control} watch={watch} name="destination" />

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
      {submitButton}
    </form>
  );
}
