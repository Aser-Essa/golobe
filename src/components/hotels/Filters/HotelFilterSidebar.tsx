import { Separator } from "#/components/ui/separator";
import AmenitiesFilter from "./AmenitiesFilter";
import FreebiesFilter from "./FreebiesFilter";
import PriceFilter from "./PriceFilter";
import RateFilter from "./RateFilter";
import type { SidebarFilterOptions } from "#/lib/types";

export default function HotelFilterSidebar({
  SidebarFilterOptions,
}: {
  SidebarFilterOptions: SidebarFilterOptions;
}) {
  return (
    <div className="space-y-8">
      <p className="text-xl font-semibold">Filters</p>
      <PriceFilter max_price={SidebarFilterOptions.max_price} />
      <Separator />
      <RateFilter />
      <Separator />
      <FreebiesFilter freebies={SidebarFilterOptions.freebies} />
      <Separator />
      <AmenitiesFilter amenities={SidebarFilterOptions.amenities} />
    </div>
  );
}
