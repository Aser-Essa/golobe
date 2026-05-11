import { Separator } from "#/components/ui/separator";
import AmenitiesFilter from "./AmenitiesFilter";
import FreebiesFilter from "./FreebiesFilter";
import PriceFilter from "./PriceFilter";
import RateFilter from "./RateFilter";

export default function HotelFilterSidebar() {
  return (
    <>
      <div className="h-100 max-w-86 space-y-8">
        <p className="text-xl font-semibold">Filters</p>

        <PriceFilter />
        <Separator />
        <RateFilter />
        <Separator />
        <FreebiesFilter />
        <Separator />

        <AmenitiesFilter />
      </div>
    </>
  );
}
