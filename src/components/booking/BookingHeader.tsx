import type { Booking } from "#/lib/types";
import { MapPin } from "lucide-react";
import ShareButton from "../common/ShareButton";
import DownloadTicket from "./BookingTicket/DownloadTicket";

export default function BookingHeader({ booking }: { booking: Booking }) {
  return (
    <div className="md:my-8 my-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <div className="w-full space-y-4">
        <h3 className="text-2xl leading-8 font-bold font-trade-gothic">{booking.hotel.name}</h3>
        <div className="flex items-center gap-0.5">
          <MapPin className="text-foreground size-5" />
          <p className="text-foreground/75 text-xs font-medium font-trade-gothic">
            {booking.hotel.address}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-row flex-wrap items-center justify-between gap-4 text-right sm:flex-col sm:items-end">
        <p className="text-salmon text-[32px] leading-9.75 font-bold">
          ${booking.paid_amount}
        </p>
        <div className="flex flex-row-reverse items-center gap-2 sm:gap-4">
          <DownloadTicket booking={booking} />
          <ShareButton />
        </div>
      </div>
    </div>
  );
}
