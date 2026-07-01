import {
    differenceInCalendarDays,
    isWithinInterval,
    parseISO,
    startOfDay,
    subDays
} from "date-fns";
import { SERVICE_FEE } from "../constants";
import type {
    BookingToInsert,
    HotelType,
    PricingParams,
    stripeBookingMetadata
} from "../types";
import type { Tables } from "../types/supabase";


export function isBookedDay({
  day,
  bookings,
}: {
  day: Date;
  bookings: Tables<"bookings">[];
}) {
  const normalizedDay = startOfDay(day);
  return bookings.some((booking) => {
    const checkIn = startOfDay(parseISO(booking.check_in));
    const checkOut = subDays(startOfDay(parseISO(booking.check_out)), 1);
    return isWithinInterval(normalizedDay, {
      start: checkIn,
      end: checkOut,
    });
  });
}

export function calculateBookingPrice({
  checkIn,
  checkOut,
  pricePerNight,
  taxRate,
  paymentMode,
}: PricingParams) {
  const totalNights = Math.max(
    0,
    differenceInCalendarDays(startOfDay(checkOut), startOfDay(checkIn)),
  );

  const baseFare = pricePerNight * totalNights;

  const taxes = baseFare * (taxRate / 100);
  const total = baseFare + taxes + SERVICE_FEE;

  const splitedAmount = total / 2;

  let amountToPay = total;

  if (paymentMode === "split") {
    amountToPay = splitedAmount;
  }

  const restToPay = total - amountToPay;

  return {
    totalNights,
    baseFare,
    taxes,
    total,
    restToPay,
    amountToPay,
    splitedAmount,
    serviceFee: SERVICE_FEE,
  };
}

export function formatBookingData(
  data: stripeBookingMetadata,
): BookingToInsert {
  const breakdown = JSON.parse(data.BookingPriceBreakdown);

  return {
    user_id: data.userId,
    hotel_id: data.hotelId,
    room_id: data.roomId,

    check_in: new Date(data.checkIn),
    check_out: new Date(data.checkOut),

    guests: Number(data.guests),

    base_fare: Number(breakdown.baseFare),
    discount: Number(data.discount),
    taxes: Number(breakdown.taxes),
    service_fee: Number(breakdown.serviceFee),

    paid_amount: Number(breakdown.amountToPay),
    remaining_amount: Number(breakdown.restToPay),

    payment_mode: data.paymentMode,
    payment_status: data.paymentMode === "full" ? "paid" : "partial",
    status: "confirmed",
    payment_intent_id: "",
  };
}

export function hasBookedDayInRange(
  checkIn: Date,
  checkOut: Date,
  bookings: HotelType["bookings"],
): boolean {
  const current = new Date(checkIn);

  while (current <= checkOut) {
    if (isBookedDay({ day: new Date(current), bookings })) {
      return true;
    }
    current.setDate(current.getDate() + 1);
  }

  return false;
}
