import type { Booking } from "#/lib/types";
import { format } from "date-fns";
import { Separator } from "../ui/separator";
import DownloadTicket from "./BookingTicket/DownloadTicket";
import { Link } from "@tanstack/react-router";
import { cn } from "#/lib/utils";
import { buttonVariants } from "../ui/button";
import { ChevronRight } from "lucide-react";

export default function BookingSummaryCard({ booking }: { booking: Booking }) {
  const logoUrl =
    booking.hotel.logo_url ||
    `https://ui-avatars.com/api/?name=${booking.hotel.name}&size=200&background=1a3c5e&color=fff&bold=true&format=png`;

  const formatDate = (date: string) => format(date, "EEE, MMM d");

  return (
    <>
      <li className="box-shadow-sm flex flex-col items-center justify-between gap-8 rounded-[16px] bg-white px-6 py-8 lg:items-start xl:flex-row xl:items-center">
        <div className="flex w-full flex-col items-center gap-8 lg:flex-row">
          <div className="border-primary hidden aspect-square size-20 min-w-20 overflow-hidden rounded-[8px] border lg:block">
            <img src={logoUrl} />
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row lg:w-auto lg:justify-normal lg:gap-6">
            <div className="flex items-center gap-4">
              <div className="space-y-2">
                <p className="text-foreground/70 text-base text-nowrap">
                  Check-In
                </p>
                <p className="text-xl font-semibold">
                  {formatDate(booking.check_in)}
                </p>
              </div>
              <p>—</p>
              <div className="space-y-2">
                <p className="text-foreground/70 text-base text-nowrap">
                  Check-Out
                </p>
                <p className="text-xl font-semibold">
                  {formatDate(booking.check_out)}
                </p>
              </div>
            </div>
            <Separator
              orientation="vertical"
              className="hidden bg-[#D7E2EE] md:block"
            />

            <div className="flex flex-wrap items-start gap-8 gap-y-4 md:gap-6">
              <div className="flex flex-row gap-8 lg:flex-col lg:gap-2">
                <div className="flex items-center gap-2">
                  <div className="5 flex size-8 items-center justify-center rounded-[4px] bg-[#8dd3ba26]">
                    <img src="/clock.svg" />
                  </div>
                  <div className="h-8.75">
                    <p className="text-foreground/60 text-xs font-semibold text-nowrap">
                      Check-In time
                    </p>
                    <p className="text-base leading-none font-medium">
                      12:00pm
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#8dd3ba26]">
                    <img src="/clock.svg" />
                  </div>
                  <div className="h-8.75">
                    <p className="text-foreground/60 text-xs font-semibold text-nowrap">
                      Check-Out time
                    </p>
                    <p className="text-base leading-none font-medium">
                      11:30pm
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#8dd3ba26]">
                  <img src="/door.svg" />
                </div>
                <div className="h-8.75">
                  <p className="text-foreground/60 text-xs font-semibold">
                    Room no.
                  </p>
                  <p className="text-base leading-none font-medium text-nowrap">
                    On arival
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-4 lg:ml-auto lg:w-auto lg:justify-normal">
          <DownloadTicket
            booking={booking}
            label="Download Ticket"
            className="flex-1 lg:flex-none"
          />
          <Link
            viewTransition
            to={`/bookings/$bookingId`}
            params={{ bookingId: booking.id }}
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "size-12 bg-white",
              }),
            )}
          >
            <ChevronRight />
          </Link>
        </div>
      </li>
    </>
  );
}
