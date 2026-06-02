import { addDays, differenceInDays } from "date-fns";
import { useEffect } from "react";

type UseBookingDatesProps = {
  watch: any;
  setValue: any;
};

export function useBookingDates({ watch, setValue }: UseBookingDatesProps) {
  const checkInDate = watch("checkIn");
  const checkOutDate = watch("checkOut");

  useEffect(() => {
    if (!checkInDate) return;

    const minCheckout = addDays(checkInDate, 1);

    if (!checkOutDate || checkOutDate <= checkInDate) {
      setValue("checkOut", minCheckout);
    }
  }, [checkInDate, checkOutDate, setValue]);

  const totalNights = Math.max(0, differenceInDays(checkOutDate, checkInDate));

  return {
    checkInDate,
    checkOutDate,
    totalNights,
  };
}
