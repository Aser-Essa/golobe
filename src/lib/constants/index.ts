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

export const ratingLabels = {
  0: "No Rating",
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  4.5: "Excellent",
  5: "Exceptional",
};

export function getRatingLabel(avg: number) {
  if (avg >= 4.8) return "Exceptional";
  if (avg >= 4.5) return "Excellent";
  if (avg >= 4.0) return "Very Good";
  if (avg >= 3.0) return "Good";
  if (avg >= 2.0) return "Fair";
  if (avg > 0) return "Poor";
  return "No Rating";
}
