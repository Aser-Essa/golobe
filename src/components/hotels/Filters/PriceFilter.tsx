import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import type { FilterSearchParams } from "#/lib/types";
import { Slider } from "#/components/ui/slider";
import { getFilterOptions } from "#/server/hotels";

export default function PriceFilter() {
  const [isOpen, setIsOpen] = useState(true);
  const [absoluteMax, setAbsoluteMax] = useState<number>(100);
  const [sliderValues, setSliderValues] = useState<[number, number]>([0, 100]);

  const navigate = useNavigate({ from: "/hotels/" });

  const { minPrice, maxPrice }: FilterSearchParams = useSearch({
    from: "/_main/hotels/",
  });

  useEffect(() => {
    getFilterOptions().then((options) => {
      const max = options.max_price;
      setAbsoluteMax(max);
      setSliderValues([minPrice ?? 0, maxPrice ?? max]);
    });
  }, []);

  function handleSliderValueChange(values: number[]) {
    const [minPriceValue, maxPriceValue] = values as [number, number];
    setSliderValues([minPriceValue, maxPriceValue]);
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
          min={0}
          max={absoluteMax}
          value={sliderValues}
          step={5}
          className="w-full"
        />
        <div className="mt-2 flex w-full items-center justify-between text-xs font-medium">
          <p>${sliderValues[0]}</p>
          <p>${sliderValues[1]}</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
