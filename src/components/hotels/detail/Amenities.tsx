import type { HotelType } from "#/lib/types";
import { useState } from "react";
import AmenityItem from "./AmenityItem";

type AmenitiesProps = {
  amenities: HotelType["amenities"];
};

export default function Amenities({ amenities }: AmenitiesProps) {
  let amenitiesArray = amenities.map((amenity) => amenity.amenities);
  const amenitiesLimit = 9;
  const remainingAmenities = amenities.length - amenitiesLimit;

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
        <p className="text-xl font-bold">Amenities</p>
        <div className="grid max-w-180 grid-cols-2 gap-6">
          {amenitiesArray.map((amenity) => (
            <AmenityItem key={amenity.id} amenity={amenity} />
          ))}
          {remainingAmenities !== 0 && (
            <span
              className="text-salmon cursor-pointer text-base font-semibold"
              onClick={toggleShowAllAmenities}
            >
              {showAllAmenities ? "Show less" : `+${remainingAmenities} more`}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
