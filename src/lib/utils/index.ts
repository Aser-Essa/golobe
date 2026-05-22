import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type {
  FilterSearchParams,
  GeneratePageButtonsParams,
  GetTypePlacesCountParams,
  HotelSearchWidgetType,
  PageButtonItem,
} from "../types";
import type { Tables } from "../types/supabase";
import { FALLBACK_IMAGE } from "../constants";

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

export const formatUserName = ({
  firstName,
  lastName,
}: {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
}) => {
  const userName = `${firstName ?? ""} ${
    lastName ? lastName[0].toUpperCase() + "." : ""
  }`.trim();

  return userName;
};

export function sanitizeString(value: string) {
  return value.trim().replace(/[.,\/#!$%\^&*;:{}=\-_`~()]/g, "");
}

function toValidDate(value: string, fallback = new Date()): Date {
  const d = new Date(value);
  return isNaN(d.getTime()) ? fallback : d;
}

export function mapSearchParamsToHotelWidget(
  searchParams: FilterSearchParams,
): HotelSearchWidgetType {
  return {
    destination: searchParams.destination,
    checkIn: toValidDate(searchParams.checkIn),
    checkOut: toValidDate(searchParams.checkOut),
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
