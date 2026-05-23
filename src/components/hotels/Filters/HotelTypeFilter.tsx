import { Separator } from "#/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { HOTEL_TYPES } from "#/lib/constants";
import type { FilterSearchParams } from "#/lib/types";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

type TypePlaceCounts = Record<FilterSearchParams["hotelType"], number>;

export default function HotelTypeFilter({
  typePlaceCounts,
}: {
  typePlaceCounts: TypePlaceCounts;
}) {
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
    <Tabs defaultValue={hotelType}>
      <TabsList
        className="box-shadow-sm h-20! w-full gap-4 rounded-[12px]! bg-white p-3 md:gap-6 md:px-6 md:py-4"
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
                <p className=" text-sm md:text-base font-semibold text-black">{label}</p>
                <span className="text-foreground/40 text-xs md:text-sm">
                  {typePlaceCounts[value]} places
                </span>
              </div>
            </TabsTrigger>
          </Fragment>
        ))}
      </TabsList>
    </Tabs>
  );
}
