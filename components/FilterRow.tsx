import React from "react";
import FilterSelect from "./FilterSelect";
import { ArrowLeftRight, ChevronDownIcon } from "lucide-react";

export default function FilterRow() {
  const FromTocities = [
    { value: "lahore-karachi", label: "Lahore - Karachi" },
    { value: "karachi-lahore", label: "Karachi - Lahore" },
  ];

  const TripType = [{ value: "return", label: "Return" }];

  const DepartReturnDates = [
    { value: "07 Nov 22 - 13 Nov 22", label: "07 Nov 22 - 13 Nov 22" },
  ];

  const PassengerClassData = [
    { value: "1 Passenger, Economy", label: "1 Passenger, Economy" },
  ];

  return (
    <>
      <div className="flex flex-wrap items-center gap-6">
        <FilterSelect
          label={"From - To"}
          data={FromTocities}
          className="flex-1"
          icon={<ArrowLeftRight className="size-5 cursor-pointer text-black" />}
        />
        <FilterSelect
          label={"Trip"}
          data={TripType}
          className="flex-1 sm:flex-[.43]"
          icon={
            <ChevronDownIcon className="size-5 cursor-pointer text-black" />
          }
        />
        <FilterSelect
          label={"Depart- Return"}
          data={DepartReturnDates}
          className="flex-1"
        />
        <FilterSelect
          label={"Passenger - Class"}
          data={PassengerClassData}
          className="flex-1"
        />
      </div>
    </>
  );
}
