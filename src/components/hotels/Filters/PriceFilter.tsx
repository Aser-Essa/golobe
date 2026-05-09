import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ChevronUp } from "lucide-react";
import { useState } from "react";
import type { FilterSearchParams } from "#/lib/types";
import { Slider } from "#/components/ui/slider";

export default function PriceFilter() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate({ from: "/hotels/" });

  const searchParams: FilterSearchParams = useSearch({
    from: "/_main/hotels/",
  });

  const minDefaultValue = searchParams.minPrice ?? 25;
  const maxDefaultValue = searchParams.maxPrice ?? 75;
  const defaultValues = [minDefaultValue, maxDefaultValue];

  function handleSliderValueChange(values: number[]) {
    const [minPriceValue, maxPriceValue] = values;
    navigate({
      search: (prev) => ({
        ...prev,
        minPrice: minPriceValue,
        maxPrice: maxPriceValue,
      }),
      resetScroll: false,
    });
  }

  return (
    <>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex w-86 flex-col gap-7"
      >
        <CollapsibleTrigger asChild>
          <div className="rounded-10 flex w-full cursor-pointer items-center justify-between">
            <p className="text-base font-semibold">Price</p>
            <ChevronUp className={isOpen ? "" : "rotate-180"} />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="flex flex-col gap-2">
          <Slider
            onValueChange={handleSliderValueChange}
            defaultValue={defaultValues}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="mt-2 flex w-full items-center justify-between text-xs font-medium">
            <p>${minDefaultValue}</p>
            <p>${maxDefaultValue}</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
