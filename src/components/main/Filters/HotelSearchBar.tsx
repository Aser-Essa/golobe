import type { FilterSearchParams, SearchHotelFormType } from "#/lib/types";
import { cn } from "#/lib/utils";
import { hotelSearchWidgetSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { BedDoubleIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import DateField from "../DateField";
import InputField from "../InputField";
import RoomGuestFilter from "./RoomGuestFilter";

export default function HotelSearchBar({
  searchParams,
  className,
  submitButton,
}: {
  searchParams: FilterSearchParams;
  className?: string;
  submitButton?: React.ReactNode;
}) {
  const defaultValues = {
    destination: searchParams.destination || "",
    checkIn: searchParams.checkIn || new Date(),
    checkOut: searchParams.checkOut || new Date(),
    rooms: searchParams.rooms || 1,
    guests: searchParams.guests || 1,
  };

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

  const navigate = useNavigate({ from: "/" });

  useEffect(() => {
    if (checkOutDate > checkInDate) return;
    setValue("checkOut", checkInDate);
  }, [checkInDate]);

  function onsubmit(data: SearchHotelFormType) {
    navigate({
      to: "/hotels",
      search: (prev) => ({ ...prev, ...data }),
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)} className={cn("flex", className)}>
        <div className="flex w-full items-start gap-2">
          <div className="relative w-full">
            <InputField
              className="pl-11"
              control={control}
              icon={
                <BedDoubleIcon className="absolute top-1/2 left-3.5 size-5 -translate-y-1/2" />
              }
              label="Enter Destination"
              name="destination"
              placeholder="Enter Destination"
            />
          </div>

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
    </>
  );
}
