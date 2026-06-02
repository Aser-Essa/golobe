import { SERVICE_FEE } from "#/lib/constants";
import type { FilterSearchParams, HotelType } from "#/lib/types";
import { calculateBookingPrice, getCoverImageUrl } from "#/lib/utils";
import { useSearch } from "@tanstack/react-router";
import RatingSummary from "../hotels/detail/RatingSummary";
import { Separator } from "../ui/separator";

interface CheckoutSummarySidebarProps {
  hotel: HotelType;
  room: HotelType["rooms"][number];
}

export default function CheckoutSummarySidebar({
  hotel,
  room,
}: CheckoutSummarySidebarProps) {
  const searchParams: FilterSearchParams = useSearch({
    from: "/_main/bookings/$id/",
  });

  const coverImage = getCoverImageUrl(hotel.hotel_images);

  const { total, baseFare, taxes } = calculateBookingPrice({
    checkIn: searchParams.checkIn,
    checkOut: searchParams.checkOut,
    pricePerNight: room.price_per_night,
    taxRate: hotel.tax_rate,
  });

  return (
    <div className="box-shadow-sm flex-2 space-y-4 rounded-[12px] bg-white p-6">
      <div className="flex gap-6">
        <div className="aspect-square size-30 min-w-30 overflow-hidden rounded-[12px]">
          <img
            src={coverImage}
            alt={hotel.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="text-foreground line-clamp-1 text-base font-medium text-ellipsis">
            {hotel.name}{" "}
          </p>
          <p className="mt-1 line-clamp-2 text-xl font-bold text-ellipsis">
            {room.name} - {room.bed_type}
          </p>
          <div className="mt-4">
            <RatingSummary
              avg_rating={hotel.avg_rating}
              review_count={hotel.review_count}
            />
          </div>
        </div>
      </div>
      <Separator />
      <p className="text-base font-medium">
        Your booking is protected by <span className="font-bold">golobe</span>
      </p>
      <Separator />
      <div className="space-y-4">
        <p className="text-base font-bold">Price Details</p>
        <ul className="space-y-4">
          <li className="flex items-center justify-between">
            <p className="text-base font-medium">Base Fare</p>
            <p className="text-base font-semibold">${baseFare}</p>
          </li>
          <li className="flex items-center justify-between">
            <p className="text-base font-medium">Taxes</p>
            <p className="text-base font-semibold">${taxes}</p>
          </li>
          <li className="flex items-center justify-between">
            <p className="text-base font-medium">Service Fee</p>
            <p className="text-base font-semibold">${SERVICE_FEE}</p>
          </li>
        </ul>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <p className="text-base font-medium">Total</p>
        <p className="text-base font-semibold">${total}</p>
      </div>
    </div>
  );
}
