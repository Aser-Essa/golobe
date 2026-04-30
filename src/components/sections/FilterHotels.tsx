import { BedDoubleIcon, Globe } from "lucide-react";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export default function FilterHotels() {
  return (
    <>
      <div
        style={{
          boxShadow: "0 4px 16px 4px oklch(0.23 0.04 144.16 / 0.05)",
        }}
        className="z-50 mx-20 translate-y-[-29%] space-y-8 rounded-[16px] bg-white px-6 py-8"
      >
        <p className="text-xl font-semibold">Where are you flying? </p>

        <div className="flex items-center gap-2">
          <Field className="relative w-full">
            <FieldLabel className="absolute -top-2.25 left-3 z-10 w-fit! bg-white px-1 text-sm font-normal">
              Enter Destination
            </FieldLabel>

            <div className="relative">
              <BedDoubleIcon className="absolute top-1/2 left-3.5 size-5 -translate-y-1/2" />
              <Input
                placeholder={"Enter Destination"}
                className="h-14 w-full rounded-[4px] border-[#79747E] px-4 pl-11"
              />
            </div>

            {<FieldError />}
          </Field>

          <Field className="relative w-full">
            <FieldLabel className="absolute -top-2.25 left-3 z-10 w-fit! bg-white px-1 text-sm font-normal">
              Enter Destination
            </FieldLabel>

            <div className="relative">
              <BedDoubleIcon className="absolute top-1/2 right-3.5 size-5 -translate-y-1/2" />
              <Input
                placeholder={"Enter Destination"}
                className="h-14 w-full rounded-[4px] border-[#79747E] px-4"
              />
            </div>

            {<FieldError />}
          </Field>

          <Field className="relative w-full">
            <FieldLabel className="absolute -top-2.25 left-3 z-10 w-fit! bg-white px-1 text-sm font-normal">
              Enter Destination
            </FieldLabel>

            <div className="relative">
              <BedDoubleIcon className="absolute top-1/2 right-3.5 size-5 -translate-y-1/2" />
              <Input
                placeholder={"Enter Destination"}
                className="h-14 w-full rounded-[4px] border-[#79747E] px-4"
              />
            </div>

            {<FieldError />}
          </Field>

          <Field className="relative w-full">
            <FieldLabel className="absolute -top-2.25 left-3 z-10 w-fit! bg-white px-1 text-sm font-normal">
              Enter Destination
            </FieldLabel>

            <div className="relative">
              <BedDoubleIcon className="absolute top-1/2 right-3.5 size-5 -translate-y-1/2" />
              <Input
                placeholder={"Enter Destination"}
                className="h-14 w-full rounded-[4px] border-[#79747E] px-4"
              />
            </div>

            {<FieldError />}
          </Field>
        </div>
      </div>
    </>
  );
}
