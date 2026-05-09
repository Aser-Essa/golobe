import { Separator } from "#/components/ui/separator";
import type { FilterSearchParams } from "#/lib/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearch } from "@tanstack/react-router";

export default function HotelTypeFilter() {
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
      <Tabs defaultValue={hotelType || "hotels"}>
        <TabsList
          className="box-shadow-sm h-20! w-full gap-6 rounded-[12px]! bg-white px-6 py-4"
          variant={"line"}
        >
          <TabsTrigger
            onClick={() => onClick("hotel")}
            value="hotel"
            className="after:bg-primary h-11.25 w-full cursor-pointer! justify-start bg-transparent! p-0! text-start shadow-none! after:-bottom-4.5! after:h-1!"
          >
            <div className="space-y-2">
              <p className="text-base font-semibold text-black"> Hotels</p>
              <span className="text-foreground/40">257 places</span>
            </div>
          </TabsTrigger>
          <Separator orientation="vertical" className="bg-[#D7E2EE]" />
          <TabsTrigger
            onClick={() => onClick("motel")}
            value="motel"
            className="after:bg-primary h-11.25 w-full cursor-pointer! justify-start bg-transparent! p-0! text-start shadow-none! after:-bottom-4.5! after:h-1!"
          >
            <div className="space-y-2">
              <p className="text-base font-semibold text-black">Motels</p>
              <span className="text-foreground/40">51 places</span>
            </div>
          </TabsTrigger>
          <Separator orientation="vertical" className="bg-[#D7E2EE]" />
          <TabsTrigger
            onClick={() => onClick("resort")}
            value="resort"
            className="after:bg-primary h-11.25 w-full cursor-pointer! justify-start bg-transparent! p-0! text-start shadow-none! after:-bottom-4.5! after:h-1!"
          >
            <div className="space-y-2">
              <p className="text-base font-semibold text-black">Resorts</p>
              <span className="text-foreground/40">72 places</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}
