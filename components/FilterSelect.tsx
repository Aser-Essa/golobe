"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

type selectOption = {
  value: string;
  label: string;
};

type FilterSelectType = {
  label: string;
  className: string;
  icon?: React.ReactNode;
  data: selectOption[];
};

export default function FilterSelect({
  label,
  data,
  icon,
  className,
}: FilterSelectType) {
  const searchParams = useSearchParams();

  const router = useRouter();

  function selectedData(item: { label: string; value: string }) {
    const params = new URLSearchParams(searchParams);
    params.set(item.label, item.value);
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <>
      <Select>
        <SelectTrigger
          icon={icon}
          className={cn(
            "relative h-14 !rounded-sm !border-[#79747E] !pl-4 !text-[#1C1B1F] !outline-none",
            className,
          )}
        >
          <div className="bg-neutrals text-blackish-green absolute top-0 left-3 -translate-y-1/2 px-1 text-sm">
            {label}
          </div>
          <SelectValue placeholder={data?.at(0)?.label} />
        </SelectTrigger>
        <SelectContent>
          {data.map((item) => (
            <div key={item.value} onMouseDown={() => selectedData(item)}>
              <SelectItem value={item.value}>{item.label}</SelectItem>
            </div>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
