import { Separator } from "#/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { Fragment } from "react/jsx-runtime";

export interface TabFilterOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface TabFilterProps {
  options: TabFilterOption[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  variant?: "default" | "line";
}

const triggerClassName =
  "after:bg-primary h-11.25 w-full cursor-pointer! justify-start bg-transparent! p-0! text-start shadow-none! after:-bottom-4.5! after:h-1!";

const listClassName =
  "box-shadow-sm h-20! w-full gap-4 rounded-[12px]! bg-white p-3 md:gap-6 md:px-6 md:py-4";

export function TabFilter({
  options,
  defaultValue,
  onValueChange,
  className,
  variant = "line",
}: TabFilterProps) {
  return (
    <Tabs defaultValue={defaultValue} className={className}>
      <TabsList variant={variant} className={listClassName}>
        {options.map(({ value, label, description, disabled }) => (
          <Fragment key={value}>
            <Separator
              orientation="vertical"
              className="bg-[#D7E2EE] first:hidden"
            />
            <TabsTrigger
              value={value}
              disabled={disabled}
              onClick={() => onValueChange?.(value)}
              className={triggerClassName}
            >
              <div className="space-y-2">
                <p className="text-sm font-semibold text-black md:text-base">
                  {label}
                </p>
                {description && (
                  <span className="text-foreground/40 text-xs md:text-sm">
                    {description}
                  </span>
                )}
              </div>
            </TabsTrigger>
          </Fragment>
        ))}
      </TabsList>
    </Tabs>
  );
}
