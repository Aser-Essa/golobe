import { cn } from "#/lib/utils";
import { MapPin } from "lucide-react";
import { lazy, Suspense } from "react";
import { buttonVariants } from "../../ui/button";
import type { HotelType } from "#/lib/types";

const LeafletMap = lazy(() => import("./LeafletMap"));

type MapAndLocationProps = {
  latitude: HotelType["latitude"];
  longitude: HotelType["longitude"];
  address: HotelType["address"];
};

export default function MapAndLocation({
  latitude,
  longitude,
  address,
}: MapAndLocationProps) {
  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">Location/Map</p>
          <a
            href={`https://www.google.com/maps?q=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default" }),
              "ox-4 h-12 rounded-[4px] py-2 text-sm font-semibold",
            )}
          >
            View on google maps
          </a>
        </div>

        <div className="space-y-2">
          <div className="h-[500px] overflow-hidden rounded-[16px]">
            <Suspense fallback={<div>Loading...</div>}>
              <LeafletMap latitude={latitude} longitude={longitude} />
            </Suspense>
          </div>
          <div className="flex items-center gap-0.5">
            <MapPin className="text-foreground size-5" />
            <p className="text-foreground/75 text-sm font-medium">{address}</p>
          </div>
        </div>
      </div>
    </>
  );
}
