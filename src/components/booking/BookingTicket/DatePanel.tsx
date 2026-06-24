import { cn } from "#/lib/utils";
import { format } from "date-fns";

export default function DatePanel({
  checkIn,
  checkOut,
  forPdf,
}: {
  checkIn: string;
  checkOut: string;
  forPdf: boolean;
}) {
  const formatDate = (date: string) => format(date, "EEE, MMM d");

  return (
    <div
      className={cn(
        "bg-primary/15 flex flex-1 flex-row items-center justify-between space-y-4 p-4 sm:p-6 md:flex-col md:items-start",
        forPdf && "flex-col! items-start! p-6!",
      )}
    >
      <div className="space-y-1">
        <p className="text-[clamp(20px,3vw,32px)] font-semibold text-nowrap">
          {formatDate(checkIn)}
        </p>
        <p className="text-foreground/60 text-xs font-medium">Check-In</p>
      </div>

      <img src="/ticket-check-date.svg" className="h-23 w-9" />

      <div className="space-y-1">
        <p className="text-[clamp(20px,3vw,32px)] font-semibold text-nowrap">
          {formatDate(checkOut)}
        </p>
        <p className="text-foreground/60 text-xs font-medium">Check-Out</p>
      </div>
    </div>
  );
}
