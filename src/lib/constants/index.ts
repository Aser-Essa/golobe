import {
  Waves,
  WavesLadder,
  Sparkles,
  Dumbbell,
  Utensils,
  Wine,
  Coffee,
  Bell,
  Wifi,
  Croissant,
  ParkingCircle,
  Bus,
  Ban,
  Monitor,
  AirVent,
} from "lucide-react";
import type { FilterSearchParams } from "../types";

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

export const HOTELS_PER_PAGE = 4;

export const HOTEL_TYPES: {
  value: FilterSearchParams["hotelType"];
  label: string;
}[] = [
  { value: "hotel", label: "Hotels" },
  { value: "motel", label: "Motels" },
  { value: "resort", label: "Resorts" },
];
