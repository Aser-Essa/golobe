import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import {
  addDays,
  differenceInCalendarDays,
  isValid,
  isWithinInterval,
  parseISO,
  startOfDay,
  subDays,
} from "date-fns";
import { twMerge } from "tailwind-merge";
import { FALLBACK_IMAGE, SERVICE_FEE } from "../constants";
import type {
  stripeBookingMetadata,
  BookingToInsert,
  FilterSearchParams,
  GeneratePageButtonsParams,
  GetTypePlacesCountParams,
  HotelSearchWidgetType,
  PageButtonItem,
  paymentMode,
  GetPaginationRangeParams,
  HotelType,
} from "../types";
import type { Tables } from "../types/supabase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRatingLabel(avg: number) {
  if (avg >= 4.8) return "Exceptional";
  if (avg >= 4.5) return "Excellent";
  if (avg >= 4.0) return "Very Good";
  if (avg >= 3.0) return "Good";
  if (avg >= 2.0) return "Fair";
  if (avg > 0) return "Poor";
  return "No Rating";
}

export function getPaginationRange({
  page,
  totalItems,
  perPage,
}: GetPaginationRangeParams) {
  const totalPages = Math.ceil(totalItems / perPage);
  const safePage = Math.max(1, Math.min(page, totalPages));
  const from = (safePage - 1) * perPage;
  const to = Math.min(safePage * perPage, totalItems);
  return { from, to, totalPages };
}

export function generatePageButtons({
  page,
  totalPages,
  windowSize,
}: GeneratePageButtonsParams): PageButtonItem[] {
  const windowEnd = Math.min(
    totalPages,
    windowSize * Math.ceil(page / windowSize),
  );
  const windowStart = windowEnd - windowSize + 1;

  let pages: PageButtonItem[] = Array.from(
    { length: windowSize },
    (_, i) => i + windowStart,
  );

  if (windowEnd < totalPages) pages = [...pages, "...", totalPages];
  if (windowStart > 1) pages = [1, "...", ...pages];

  return pages;
}

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

export function getCoverImageUrl(images: Tables<"hotel_images">[]): string {
  const cover = images.find((img) => img.is_cover) ?? images[0];
  return cover.url || FALLBACK_IMAGE;
}

export function getMinRoomPrice(rooms: { price_per_night: number }[]): number {
  if (rooms.length === 0) return 0;
  return rooms.reduce((min, r) => Math.min(min, r.price_per_night), Infinity);
}

export function getTypePlacesCount({ hotels, type }: GetTypePlacesCountParams) {
  const count = hotels.filter((hotel) => hotel.hotel_type === type).length;
  return count;
}

export function sanitizeString(value: string) {
  // eslint-disable-next-line no-useless-escape
  return value.trim().replace(/[.,\/#!$%\^&*;:{}=\-_`~()]/g, "");
}

const parseDate = (val: unknown, fallback?: Date): Date => {
  if (!val) return fallback ?? new Date();
  const str = String(val);
  const parsed = parseISO(str.slice(0, 10));
  return isValid(parsed) ? parsed : (fallback ?? new Date());
};

export function mapSearchParamsToHotelWidget(
  searchParams: FilterSearchParams,
): HotelSearchWidgetType {
  const checkIn = parseDate(searchParams.checkIn);

  return {
    destination: searchParams.destination,
    checkIn,
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    checkOut: parseDate(searchParams.checkOut) ?? addDays(checkIn, 1),
    rooms: searchParams.rooms ?? 1,
    guests: searchParams.guests ?? 1,
  };
}

export function mapHotelWidgetToSearchParams(data: HotelSearchWidgetType) {
  const sanitizedDestination = sanitizeString(data.destination);
  return {
    destination: sanitizedDestination,
    checkIn: data.checkIn.toISOString(),
    checkOut: data.checkOut.toISOString(),
    rooms: data.rooms,
    guests: data.guests,
  };
}

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

type PricingParams = {
  checkIn: string;
  checkOut: string;
  pricePerNight: number;
  taxRate: number;
  paymentMode: paymentMode;
};

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

export function formatFileName(file: File, prefix?: string) {
  const ext = file.name.split(".").pop()?.toLowerCase();

  // clean original name
  const baseName = file.name
    .replace(/\.[^/.]+$/, "") // remove extension
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-") // replace غير المسموح بـ -
    .replace(/-+/g, "-") // remove repeated dashes
    .replace(/^-|-$/g, ""); // trim dashes

  return `${prefix ? prefix + "-" : ""}${baseName}.${ext}`;
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
