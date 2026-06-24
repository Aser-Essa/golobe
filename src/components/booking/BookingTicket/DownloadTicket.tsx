import { Button } from "#/components/ui/button";
import type { Booking } from "#/lib/types";
import { cn } from "#/lib/utils";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { useRef, useState } from "react";
import BookingTicket from ".";
import { useUser } from "@clerk/tanstack-react-start";
import { Skeleton } from "#/components/ui/skeleton";

export default function DownloadTicket({
  booking,
  label = "Download",
  className,
}: {
  booking: Booking;
  label?: string;
  className?: string;
}) {
  const ticketRef = useRef<HTMLDivElement>(null);
  const { isLoaded } = useUser();
  const [isRendered, setIsRendered] = useState(false);

  const downloadPdf = async () => {
    setIsRendered(true);
    await new Promise((resolve) => setTimeout(resolve, 100));
    const ticket = ticketRef.current;
    if (!ticket) return;

    const canvas = await html2canvas(ticket, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const margin = 20;

    const availableWidth = pageWidth - margin * 2;
    const availableHeight = pageHeight - margin * 2;

    const ratio = Math.min(
      availableWidth / canvas.width,
      availableHeight / canvas.height,
    );

    const imgWidth = canvas.width * ratio;
    const imgHeight = canvas.height * ratio;

    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

    pdf.save(`booking-${booking.id}.pdf`);
    setIsRendered(false);
  };

  return (
    <>
      {isLoaded ? (
        <Button
          className={cn(
            "h-12 w-auto px-4 py-2 font-semibold sm:w-37.5",
            className,
          )}
          onClick={downloadPdf}
        >
          {label}
        </Button>
      ) : (
        <Skeleton className="h-12 w-auto sm:w-37.5" />
      )}

      {isRendered && (
        <div className="fixed top-0 left-[-99999px]" ref={ticketRef}>
          <BookingTicket forPdf={true} booking={booking} />
        </div>
      )}
    </>
  );
}
