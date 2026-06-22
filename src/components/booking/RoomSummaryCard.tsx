import { useBookingDates } from "#/hooks/useBookingDates";
import { FALLBACK_IMAGE } from "#/lib/constants";
import type { FilterSearchParams, HotelType } from "#/lib/types";
import { cn, isBookedDay, mapSearchParamsToHotelWidget } from "#/lib/utils";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { startOfToday } from "date-fns";
import { MapPin } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import DateField from "../common/DateField";

type RoomSummaryCardProps = {
  room: HotelType["rooms"][number];
  hotel: HotelType;
};

export default function RoomSummaryCard({ room, hotel }: RoomSummaryCardProps) {
  const searchParams: FilterSearchParams = useSearch({
    from: "/_main/bookings/$id/",
  });

  const normalizedSearchParams = mapSearchParamsToHotelWidget(searchParams);

  const defaultValues = {
    checkIn: new Date(normalizedSearchParams.checkIn),
    checkOut: new Date(normalizedSearchParams.checkOut),
    rooms: normalizedSearchParams.rooms || 1,
    guests: normalizedSearchParams.guests || 1,
  };

  const { control, watch, setValue } = useForm({
    defaultValues,
  });

  const { checkInDate, checkOutDate } = useBookingDates({ watch, setValue });

  const today = startOfToday();
  const navigate = useNavigate({ from: "/bookings/$id/" });

  useEffect(() => {
    navigate({
      search: (prev) => ({
        ...prev,
        checkIn: checkInDate,
        checkOut: checkOutDate,
      }),
      resetScroll: false,
    });
  }, [checkInDate, checkOutDate]);

  return (
    <div className="box-shadow-sm rounded-[12px] bg-white p-4 sm:px-6 sm:py-8">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <h3 className="text-xl font-bold sm:text-2xl">
          {room.name} - {room.bed_type}
        </h3>
        <p className="text-salmon text-[24px] font-bold sm:text-[32px]">
          ${room.price_per_night}
          <span className="text-sm">/night</span>
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-6 rounded-[8px] border p-4 sm:flex-row sm:items-center sm:px-8 sm:py-4">
        <div className="aspect-video w-full overflow-hidden rounded-[12px] sm:aspect-square sm:size-16">
          <img
            src={hotel.logo_url || FALLBACK_IMAGE}
            alt={"hotel-logo"}
            className="h-full w-full rounded-[4px] object-cover object-center"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold sm:text-2xl">{hotel.name}</h3>
          <div className="flex items-center gap-1 sm:gap-0.5">
            <MapPin className="text-foreground size-5" />
            <p className="text-foreground/75 text-xs font-medium">
              {hotel.address}
            </p>
          </div>
        </div>
      </div>

      <form
        className={cn(
          "mt-10 flex flex-col items-center justify-between gap-y-4 lg:flex-row lg:gap-x-5 xl:gap-x-10",
        )}
      >
        <DateField
          name="checkIn"
          label="Check In"
          control={control}
          date={checkInDate}
          disabledDays={(day) =>
            day < today || isBookedDay({ day, bookings: room.bookings })
          }
          className="min-h-14 w-full flex-1"
        />

        <div className="h-12 max-w-42 min-w-20 flex-1">
          <img src="/from-to-arrow.svg" className="h-full w-full" />
        </div>

        <DateField
          name="checkOut"
          label="Check Out"
          control={control}
          date={checkOutDate}
          disabledDays={(day) =>
            day <= checkInDate || isBookedDay({ day, bookings: room.bookings })
          }
          className="min-h-14 w-full flex-1"
        />
      </form>
    </div>
  );
}
