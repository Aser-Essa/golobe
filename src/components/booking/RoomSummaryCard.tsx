import { useBookingDates } from "#/hooks/useBookingDates";
import { FALLBACK_IMAGE } from "#/lib/constants";
import type { FilterSearchParams, HotelType } from "#/lib/types";
import { cn, isBookedDay } from "#/lib/utils";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  startOfToday
} from "date-fns";
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

  const defaultValues = {
    checkIn: new Date(searchParams.checkIn),
    checkOut: new Date(searchParams.checkOut),
    rooms: searchParams.rooms || 1,
    guests: searchParams.guests || 1,
  };

  const { control, watch, setValue } = useForm({
    defaultValues: defaultValues,
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
    <div className="box-shadow-sm rounded-[12px] bg-white px-6 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-bold">
            {room.name} - {room.bed_type}
          </h3>
        </div>
        <p className="text-salmon text-[32px] font-bold">
          ${room.price_per_night}
          <span className="text-sm">/night</span>
        </p>
      </div>

      <div className="mt-6 flex items-center gap-6 rounded-[8px] border px-8 py-4">
        <div className="aspect-square size-16 overflow-hidden rounded-[12px]">
          <img
            src={hotel.logo_url || FALLBACK_IMAGE}
            alt={"hotel-logo"}
            className="h-full w-full rounded-[4px] object-cover object-center"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{hotel.name}</h3>
          <div className="flex items-center gap-0.5">
            <MapPin className="text-foreground size-5" />
            <p className="text-foreground/75 text-xs font-medium">
              {hotel.address}
            </p>
          </div>
        </div>
      </div>

      <form
        className={cn(
          "mt-10 flex flex-col items-center justify-between gap-x-10 gap-y-4 md:flex-row",
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
        />

        <div className="h-12 w-42">
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
        />
      </form>
    </div>
  );
}
