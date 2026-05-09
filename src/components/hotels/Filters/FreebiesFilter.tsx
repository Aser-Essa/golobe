import type { FilterSearchParams } from "#/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ChevronUp } from "lucide-react";
import { useState } from "react";

export default function FreebiesFilter() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate({ from: "/hotels/" });

  const FreebiesList = [
    "Free breakfast",
    "Free parking",
    "Free internet",
    "Free airport shuttle",
    "Free cancellation",
  ];

  const searchParams: FilterSearchParams = useSearch({
    from: "/_main/hotels/",
  });

  const freebies: string[] = searchParams.freebies ?? [];

  function handleCheckboxChange(item: string) {
    const updated = freebies.includes(item)
      ? freebies.filter((f) => f !== item)
      : [...freebies, item];

    navigate({
      search: (prev) => ({ ...prev, freebies: updated }),
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
            <p className="text-base font-semibold">Freebies</p>
            <ChevronUp className={isOpen ? "" : "rotate-180"} />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="flex flex-col gap-2">
          <FieldGroup className="">
            {FreebiesList.map((item) => (
              <Field orientation="horizontal" key={item}>
                <FieldLabel>
                  <Checkbox
                    name={item}
                    className="size-5"
                    checked={freebies.includes(item)}
                    onCheckedChange={() => handleCheckboxChange(item)}
                  />
                  <p className="font-medium"> {item}</p>
                </FieldLabel>
              </Field>
            ))}
          </FieldGroup>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
