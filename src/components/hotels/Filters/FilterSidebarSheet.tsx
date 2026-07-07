import { Button } from "#/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "#/components/ui/sheet";
import type { SidebarFilterOptions } from "#/lib/types";
import { SlidersHorizontal } from "lucide-react";
import HotelFilterSidebar from "./HotelFilterSidebar";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export function FilterSidebarSheet({
  SidebarFilterOptions,
}: {
  SidebarFilterOptions: SidebarFilterOptions;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

  useEffect(() => {
    if (isDesktop) {
      setOpen(false);
    }
  }, [isDesktop]);

  return (
    <div className="flex flex-1 flex-wrap gap-2 xl:hidden!">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            type="submit"
            variant={"outline"}
            className="flex aspect-square h-14 w-full flex-1 items-center gap-1 px-4 py-2 text-sm font-medium lg:w-fit"
          >
            <SlidersHorizontal className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <div className="overflow-y-scroll overflow-x-hidden p-4">
            <HotelFilterSidebar SidebarFilterOptions={SidebarFilterOptions} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
