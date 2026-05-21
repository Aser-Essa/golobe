import { Button } from "#/components/ui/button";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Calendar } from "#/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#/components/ui/popover";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Controller } from "react-hook-form";
import { FieldLabel } from "../ui/field";

type DateFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control:  Control<T>;
  label: string;
  date: Date | null;
  disabledDays?: (date: Date) => boolean;
};

export default function DateField<T extends FieldValues>({
  name,
  control,
  label,
  date,
  disabledDays,
}: DateFieldProps<T>) {
  return (
     
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!date}
            className="data-[empty=true]:text-muted-foreground bg-white! relative h-14 w-[212px] flex-1 justify-between rounded-[4px] border-[#79747E] px-4 text-left font-normal"
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            <CalendarDays className="size-5" />

            <FieldLabel className="absolute rounded-[8px] -top-2.25 left-3 w-fit! bg-white  px-1 text-sm font-normal">
              {label}
            </FieldLabel>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                defaultMonth={field.value}
                disabled={disabledDays}
              />
            )}
          />
        </PopoverContent>
      </Popover>
     
  );
}
