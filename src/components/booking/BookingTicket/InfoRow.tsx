import type { Booking } from "#/lib/types";
import { cn } from "#/lib/utils";
import { useBarcode } from "next-barcode";

export default function InfoRow({
  booking_ref,
  country,
  forPdf,
}: {
  booking_ref: Booking["booking_ref"];
  country: string;
  forPdf: boolean;
}) {
  const { inputRef } = useBarcode({
    value: `${booking_ref}`,
    options: {
      displayValue: false,
      format: "CODE128",
      width: 1,
      height: 50,
      background: "transparent",
    },
  });

  return (
    <div
      className={cn(
        "flex min-h-53.25 flex-col justify-between gap-6 p-4 sm:p-6",
        forPdf && "p-6!",
      )}
    >
      <div className="flex flex-wrap gap-8 gap-y-4">
        <div className="flex items-center gap-2">
          <div className="5 flex size-8 items-center justify-center rounded-[4px] bg-[#8dd3ba26]">
            <img src="/clock.svg" />
          </div>
          <div className="h-8.75">
            <p className="text-xs font-semibold text-[rgba(17,34,17,0.6)]">
              Check-In time
            </p>
            <p className="text-base leading-none font-medium">12:00pm</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#8dd3ba26]">
            <img src="/clock.svg" />
          </div>
          <div className="h-8.75">
            <p className="text-xs font-semibold text-[rgba(17,34,17,0.6)]">
              Check-Out time
            </p>
            <p className="text-base leading-none font-medium">11:30pm</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#8dd3ba26]">
            <img src="/door.svg" />
          </div>
          <div className="h-8.75">
            <p className="text-xs font-semibold text-[rgba(17,34,17,0.6)]">
              Room no.
            </p>
            <p className="text-base leading-none font-medium">On arival</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[28px] font-semibold sm:text-[32px]">{country}</p>
          <p className="text-xs font-medium text-[rgba(17,34,17,0.6)]">
            {booking_ref}
          </p>
        </div>
        <svg ref={inputRef} />
      </div>
    </div>
  );
}
