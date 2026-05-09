import type { FilterSearchParams } from "#/lib/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ChevronUp } from "lucide-react";
import { useState } from "react";

export default function RateFilter() {
  const [isOpen, setIsOpen] = useState(true);
  const TabsArray = Array.from({ length: 5 }, (_, index) => index + 1);

  const navigate = useNavigate({ from: "/hotels/" });
  const { rating }: FilterSearchParams = useSearch({
    from: "/_main/hotels/",
  });

  function onClick(value: number) {
    navigate({
      search: (prev) => ({ ...prev, rating: value }),
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
            <p className="text-base font-semibold">Rating</p>
            <ChevronUp className={isOpen ? "" : "rotate-180"} />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="flex flex-col gap-2">
          <Tabs defaultValue={(rating || 0).toString()}>
            <TabsList variant="default" className="flex items-center gap-4">
              {TabsArray.map((tab) => (
                <TabsTrigger
                  key={tab}
                  className={
                    "border-primary data-active:bg-primary/15 hover:bg-primary/15 h-8! w-10! cursor-pointer rounded-[4px]! opacity-100! shadow-none! transition-colors"
                  }
                  value={tab.toString()}
                  onClick={() => onClick(tab)}
                >
                  +{tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
