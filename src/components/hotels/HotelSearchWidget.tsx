import type { FilterSearchParams } from "#/lib/types";
import { Building2 } from "lucide-react";
import HotelSearchBar from "../hotels/detail/Filters/HotelSearchBar";
import { Button } from "../ui/button";

export default function HotelSearchWidget({
  searchParams,
}: {
  searchParams: FilterSearchParams;
}) {
  return (
    <>
      <div className="box-shadow-sm z-50 mx-20 translate-y-[-29%] space-y-8 rounded-[16px] bg-white px-6 py-8">
        <p className="text-xl font-semibold">Where are you flying? </p>

        <HotelSearchBar
          searchParams={searchParams}
          className="flex-col items-end gap-8"
          submitButton={
            <Button
              type="submit"
              className="flex h-12 items-center gap-1 px-4 py-2 text-sm font-medium"
            >
              <Building2 className="size-5" />
              <p> Show Stays</p>
            </Button>
          }
        />
      </div>
    </>
  );
}
