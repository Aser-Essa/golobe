import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "#/components/ui/field";
import { RadioGroup, RadioGroupItem } from "#/components/ui/radio-group";
import type {
  BookingPriceBreakdown,
  FilterSearchParams,
  paymentMode,
} from "#/lib/types";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { formatDate } from "date-fns";

interface paymentModeProps {
  bookingPrice: BookingPriceBreakdown;
}

export default function PaymentMode({ bookingPrice }: paymentModeProps) {
  const { restToPay, amountToPay } = bookingPrice;

  const searchParams: FilterSearchParams & { paymentMode?: paymentMode } =
    useSearch({
      from: "/_main/hotels/$hotelId/checkout/$roomId/",
    });

  const formattedCheckOut = searchParams.checkOut
    ? formatDate(new Date(searchParams.checkOut), "MMM d, yyyy")
    : "";

  const navigate = useNavigate({ from: "/hotels/$hotelId/checkout/$roomId/" });

  const handlepaymentModeChange = (value: string) => {
    navigate({
      search: (prev) => ({ ...prev, paymentMode: value }),
      resetScroll: false,
    });
  };

  return (
    <>
      <div className="box-shadow-sm rounded-[12px] bg-white p-4 sm:p-6">
        <RadioGroup
          className="gap-4"
          defaultValue={searchParams.paymentMode || "full"}
          onValueChange={handlepaymentModeChange}
        >
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
                  Pay ${amountToPay} now, and the rest (${restToPay}) will be
                  automatically charged to the same payment method on{" "}
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
