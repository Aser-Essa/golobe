import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useNavigate } from "@tanstack/react-router";
import { ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";

interface CheckboxFilterProps {
  title: string;
  options: string[];
  selected: string[];
  searchKey: string;
  limit?: number;
}

export default function CheckboxFilter({
  title,
  options,
  selected,
  searchKey,
  limit = 5,
}: CheckboxFilterProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate({ from: "/hotels/" });

  const remaining = Math.max(0, options.length - limit);

  const visibleOptions = useMemo(
    () => (showAll ? options : options.slice(0, limit)),
    [options, showAll, limit],
  );

  function handleCheckboxChange(item: string) {
    const updated = selected.includes(item)
      ? selected.filter((f) => f !== item)
      : [...selected, item];

    navigate({
      search: (prev) => ({ ...prev, [searchKey]: updated }),
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
          <p className="text-base font-semibold">{title}</p>
          <ChevronUp className={isOpen ? "" : "rotate-180"} />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="flex flex-col gap-2">
        <FieldGroup>
          {visibleOptions.map((item) => (
            <Field orientation="horizontal" key={item}>
              <FieldLabel>
                <Checkbox
                  name={item}
                  className="size-5"
                  checked={selected.includes(item)}
                  onCheckedChange={() => handleCheckboxChange(item)}
                />
                <p className="font-medium">{item}</p>
              </FieldLabel>
            </Field>
          ))}

          {remaining > 0 && (
            <button
              type="button"
              className="text-salmon cursor-pointer text-start text-base font-semibold"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show less" : `+${remaining} more`}
            </button>
          )}
        </FieldGroup>
      </CollapsibleContent>
    </Collapsible>
  );
}
