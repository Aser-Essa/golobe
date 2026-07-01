import InputField from "#/components/common/InputField";
import { Separator } from "#/components/ui/separator";
import { MAX_DESTINATION_OPTIONS } from "#/lib/constants";
import type { searchDestinationsType } from "#/lib/types";
import { sanitizeString } from "#/lib/utils";
import { getSearchDestinations } from "#/server/hotels/hotels";
import { Link } from "@tanstack/react-router";
import { BedDoubleIcon } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import type { Control, FieldValues, Path, UseFormWatch } from "react-hook-form";

type DestinationSearchType<T extends FieldValues> = {
  control: Control<T>;
  watch: UseFormWatch<T>;
  name: Path<T>;
};

export default function DestinationSearch<T extends FieldValues>({
  control,
  watch,
  name,
}: DestinationSearchType<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<searchDestinationsType>([]);
  const destination = watch(name);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearchDestinations = async (query: string) => {
    const sanitizedQuery = sanitizeString(query);

    if (sanitizedQuery.length === 0) {
      setOptions([]);
      return;
    }
    const data = await getSearchDestinations({
      data: { query: sanitizedQuery },
    });
    setOptions(data);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearchDestinations(destination);
    }, 300);

    return () => clearTimeout(timeout);
  }, [destination]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative w-full flex-2" ref={containerRef}>
        <InputField
          className="pl-11"
          control={control}
          icon={
            <BedDoubleIcon className="absolute top-1/2 left-3.5 size-5 -translate-y-1/2" />
          }
          label="Enter Destination"
          name={name}
          placeholder="Enter Destination"
          onFocus={() => setIsOpen(true)}
        />

        {isOpen && options.length > 0 && (
          <div className="bg-popover text-popover-foreground ring-foreground/10 absolute z-50 mt-1 flex w-full flex-col gap-2.5 rounded-lg p-2.5 text-sm shadow-md ring-1 outline-hidden duration-100">
            <ul className="space-y-1">
              {options.slice(0, MAX_DESTINATION_OPTIONS).map((option, i) => (
                <Fragment key={`${option.address}-${i}`}>
                  <li
                    className="hover:bg-foreground/7 cursor-pointer rounded-lg p-1.5 text-sm transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link
                      to="/hotels"
                      reloadDocument
                      search={(prev) => ({
                        ...prev,
                        destination: `${option.city}, ${option.country}`,
                      })}
                    >
                      <p>
                        {option.country}, {option.city}
                      </p>
                      <span className="text-foreground/60 text-xs">
                        {option.address}
                      </span>
                    </Link>
                  </li>
                  <Separator className="last:hidden" />
                </Fragment>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
