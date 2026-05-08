import { amenityIcons } from "#/lib/constants";
import type { HotelType } from "#/lib/types";

type AmenityItemProps = {
  amenity: HotelType["amenities"][number]["amenities"];
};

export default function AmenityItem({ amenity }: AmenityItemProps) {
  const Icon = amenityIcons[amenity.icon_key as keyof typeof amenityIcons];

  return (
    <div key={amenity.id} className="flex items-center gap-2">
      <Icon className="size-5" />
      <p className="text-base font-medium">{amenity.name}</p>
    </div>
  );
}
