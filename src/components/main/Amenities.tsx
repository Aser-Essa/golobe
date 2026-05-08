import type { HotelType } from "#/lib/types";
import { useState } from "react";
import AmenityItem from "./AmenityItem";

type AmenitiesProps = {
  amenities: HotelType["amenities"];
};

export default function Amenities({ amenities }: AmenitiesProps) {
  let amenitiesArray = amenities.map((amenity) => amenity.amenities);
  const amenitiesLimit = 9;

  const [showAllAmenities, setShowAllAmenities] = useState(false);

  if (!showAllAmenities) {
    amenitiesArray = amenitiesArray.slice(0, amenitiesLimit);
  }

  function toggleShowAllAmenities() {
    setShowAllAmenities((prev) => !prev);
  }

  return (
    <>
      <div className="space-y-8">
        <p className="text-xl font-bold">Available Rooms</p>
        <div className="grid max-w-180 grid-cols-2 gap-6">
          {amenitiesArray.map((amenity) => (
            <AmenityItem key={amenity.id} amenity={amenity} />
          ))}
          <span
            className="text-salmon cursor-pointer text-base font-semibold"
            onClick={toggleShowAllAmenities}
          >
            {showAllAmenities
              ? "Show less"
              : `+${amenities.length - amenitiesLimit} more`}
          </span>
        </div>
      </div>
    </>
  );
}
