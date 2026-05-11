import { Separator } from "#/components/ui/separator";
import { HOTEL_TYPES } from "#/lib/constants";
import type { FilterSearchParams, HotelType } from "#/lib/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

type getTypePlacesCountParams = {
  type: FilterSearchParams["hotelType"];
  hotels: HotelType[];
};

export function getTypePlacesCount({ hotels, type }: getTypePlacesCountParams) {
  const count = hotels.filter((hotel) => hotel.hotel_type === type).length;
  return count;
}

export default function HotelTypeFilter({ typePlaceCounts }) {
  const navigate = useNavigate({ from: "/hotels/" });

  const { hotelType }: FilterSearchParams = useSearch({
    from: "/_main/hotels/",
  });

  function onClick(value: FilterSearchParams["hotelType"]) {
    navigate({
      search: (prev) => ({ ...prev, hotelType: value }),
      resetScroll: false,
    });
  }

  return (
    <>
      <Tabs defaultValue={hotelType}>
        <TabsList
          className="box-shadow-sm h-20! w-full gap-6 rounded-[12px]! bg-white px-6 py-4"
          variant={"line"}
        >
          {HOTEL_TYPES.map(({ value, label }) => (
            <Fragment key={`${value}-${label}`}>
              <Separator
                orientation="vertical"
                className="bg-[#D7E2EE] first:hidden"
              />

              <TabsTrigger
                onClick={() => onClick(value)}
                value={value}
                className="after:bg-primary h-11.25 w-full cursor-pointer! justify-start bg-transparent! p-0! text-start shadow-none! after:-bottom-4.5! after:h-1!"
              >
                <div className="space-y-2">
                  <p className="text-base font-semibold text-black">{label}</p>
                  <span className="text-foreground/40">
                    {typePlaceCounts[value]} places
                  </span>
                </div>
              </TabsTrigger>
            </Fragment>
          ))}
        </TabsList>
      </Tabs>
    </>
  );
}
