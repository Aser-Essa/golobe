import { addDays } from "date-fns";
import type { FilterSearchParams, HotelSearchWidgetType } from "../types";
import { parseDate } from "./date";

export function sanitizeString(value: string) {
  // eslint-disable-next-line no-useless-escape
  return value.trim().replace(/[.,\/#!$%\^&*;:{}=\-_`~()]/g, "");
}

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
