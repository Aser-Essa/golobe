import {
  AirVent,
  Ban,
  Bell,
  Bus,
  Coffee,
  Croissant,
  Dumbbell,
  Monitor,
  ParkingCircle,
  Sparkles,
  Utensils,
  Waves,
  WavesLadder,
  Wifi,
  Wine,
} from "lucide-react";
import type { FilterSearchParams } from "../types";

export const HOTELS_PER_PAGE = 4;

export const MAX_ROOMS = 10;
export const MAX_GUESTS = MAX_ROOMS * 3;
export const REVIEWS_PER_PAGE = 10;

export const HOTEL_TYPES: {
  value: FilterSearchParams["hotelType"];
  label: string;
}[] = [
  { value: "hotel", label: "Hotels" },
  { value: "motel", label: "Motels" },
  { value: "resort", label: "Resorts" },
];

export const ratingTexts = [
  "Poor",
  "Fair",
  "Good",
  "Very Good",
  "Excellent",
  "Exceptional",
];

export const amenityIcons = {
  // wellness
  "pool-outdoor": Waves,
  "pool-indoor": WavesLadder,
  spa: Sparkles,
  fitness: Dumbbell,
  "fitness-room": Dumbbell,

  // dining
  restaurant: Utensils,
  bar: Wine,
  coffee: Coffee,
  "room-service": Bell,

  // connectivity
  wifi: Wifi,

  // freebies
  breakfast: Croissant,
  parking: ParkingCircle,
  shuttle: Bus,
  cancel: Ban,

  // services
  "desk-24": Monitor,

  // room
  ac: AirVent,
} as const;
