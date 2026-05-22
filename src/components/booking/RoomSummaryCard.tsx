import { FALLBACK_IMAGE } from "#/lib/constants";
import type { FilterSearchParams, HotelType } from "#/lib/types";
import { formatDate } from "#/lib/utils";
import { useSearch } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

type RoomSummaryCardProps = {
  room: HotelType["rooms"][number];
  hotel: HotelType;
};

export default function RoomSummaryCard({ room, hotel }: RoomSummaryCardProps) {
  const search: FilterSearchParams = useSearch({
    from: "/_main/bookings/$id/",
  });

  const searchParams = search;

  const checkInDate = searchParams.checkIn
    ? formatDate(searchParams.checkIn)
    : "-";
  const checkOutDate = searchParams.checkOut
    ? formatDate(searchParams.checkOut)
    : "-";

  return (
    <div className="box-shadow-sm rounded-[12px] bg-white px-6 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-bold">{hotel.name}</h3>
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

      <div className="mt-10 flex items-center justify-between">
        <div className="space-y-2">
          <div className="text-xl font-semibold">{checkInDate}</div>
          <span className="text-foreground/60 text-sm font-medium">
            Check-In
          </span>
        </div>

        <div className="h-12 w-42">
          <img src="/from-to-arrow.svg" className="h-full w-full" />
        </div>

        <div className="space-y-2">
          <div className="text-xl font-semibold">{checkOutDate}</div>
          <span className="text-foreground/60 text-sm font-medium">
            Check-Out
          </span>
        </div>
      </div>
    </div>
  );
}
