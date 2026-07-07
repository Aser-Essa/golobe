import type { HotelSearchWidgetType } from "#/lib/types";
import { Building2 } from "lucide-react";
import { Button } from "../ui/button";
import HotelSearchBar from "./Filters/HotelSearchBar";

export default function HotelSearchWidget({
  searchParams,
}: {
  searchParams: HotelSearchWidgetType;
}) {
  return (
    <div className="box-shadow-sm relative z-50 mb-0! translate-y-[-19%] space-y-8 rounded-[16px] bg-white px-6 py-8 md:translate-y-[-29%]">
      <p className="text-xl font-semibold">Where are you flying? </p>

      <HotelSearchBar
        searchParams={searchParams}
        className="flex-col items-end gap-8"
        submitButton={
          <Button
            type="submit"
            className="flex h-12 w-full items-center gap-1 px-4 py-2 text-sm font-medium md:w-auto"
          >
            <Building2 className="size-5" />
            <p> Show Stays</p>
          </Button>
        }
      />
    </div>
  );
}
