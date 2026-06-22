import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "#/components/ui/field";
import { RadioGroup, RadioGroupItem } from "#/components/ui/radio-group";
import type { FilterSearchParams } from "#/lib/types";
import { calculateBookingPrice } from "#/lib/utils";
import { useSearch } from "@tanstack/react-router";
import { formatDate } from "date-fns";

interface PaymentTypeProps {
  price_per_night: number;
  tax_rate: number;
}

export default function PaymentType({
  price_per_night,
  tax_rate,
}: PaymentTypeProps) {
  const searchParams: FilterSearchParams = useSearch({
    from: "/_main/bookings/$id/",
  });

  const { total } = calculateBookingPrice({
    checkIn: searchParams.checkIn,
    checkOut: searchParams.checkOut,
    pricePerNight: price_per_night,
    taxRate: tax_rate,
  });

  const splitedPrice = total / 2;

  const formattedCheckOut = searchParams.checkOut
    ? formatDate(new Date(searchParams.checkOut), "MMM d, yyyy")
    : "";

  return (
    <>
      <div className="box-shadow-sm rounded-[12px] bg-white p-4 sm:p-6">
        <RadioGroup defaultValue="full" className="gap-4">
          <FieldLabel
            htmlFor="full-pay"
            className="has-data-checked:bg-primary"
          >
            <Field orientation="horizontal">
              <FieldContent className="space-y-2">
                <FieldTitle className="text-base font-bold">
                  Pay in full
                </FieldTitle>
                <FieldDescription className="text-sm">
                  Pay the total and you are all set
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="full" id="full-pay" />
            </Field>
          </FieldLabel>
          <FieldLabel
            htmlFor="split-pay"
            className="has-data-checked:bg-primary"
          >
            <Field orientation="horizontal">
              <FieldContent className="space-y-2">
                <FieldTitle className="text-base font-bold">
                  Pay part now, part later
                </FieldTitle>
                <FieldDescription className="text-sm">
                  Pay ${splitedPrice} now, and the rest (${splitedPrice}) will
                  be automatically charged to the same payment method on{" "}
                  {formattedCheckOut}. No extra fees.
                </FieldDescription>
              </FieldContent>

              <RadioGroupItem value="split" id="split-pay" />
            </Field>
          </FieldLabel>
        </RadioGroup>
      </div>
    </>
  );
}
