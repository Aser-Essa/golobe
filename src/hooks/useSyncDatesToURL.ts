import { useNavigate } from "@tanstack/react-router";
import { formatISO } from "date-fns";
import { useEffect } from "react";

export function useSyncDatesToURL(checkInDate: Date, checkOutDate: Date) {
  const navigate = useNavigate({ from: "/hotels/$hotelId/checkout/$roomId/" });

  useEffect(() => {
    navigate({
      search: (prev) => ({
        ...prev,
        checkIn: formatISO(checkInDate, { representation: "date" }),
        checkOut: formatISO(checkOutDate, { representation: "date" }),
      }),
      resetScroll: false,
      replace: true,
    });
  }, [checkInDate, checkOutDate]);
}
