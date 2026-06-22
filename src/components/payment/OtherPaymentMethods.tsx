import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "#/components/ui/field";
import { RadioGroupItem } from "#/components/ui/radio-group";
import { stripePromise } from "#/lib/stripe/stripe-client";
import { createSetupIntent } from "#/server/stripe";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useRef, useState } from "react";
import PaymentElementSkeleton from "../skeleton/PaymentElementSkeleton";
import PaymentMethodFields from "./PaymentMethodFields";

const OTHER_METHOD_VALUE = "other";

export default function OtherPaymentMethods({
  selected,
}: {
  selected: boolean;
}) {
  const [clientSecret, setClientSecret] = useState("");

  const isFetchingRef = useRef(false);

  useEffect(() => {
    if (!selected) return;
    if (clientSecret || isFetchingRef.current) return;
    isFetchingRef.current = true;
    createSetupIntent({ data: { paymentMethodType: "other" } })
      .then((data) => {
        setClientSecret(data.clientSecret!);
      })
      .catch((err) => console.error("ERROR:", err))
      .finally(() => {
        isFetchingRef.current = false;
      });
  }, [selected, clientSecret]);

  return (
    <div className="space-y-4">
      <FieldLabel
        htmlFor={OTHER_METHOD_VALUE}
        className="has-data-checked:bg-primary flex h-14 flex-col justify-center"
      >
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle className="text-base font-bold">
              Pay with other method
            </FieldTitle>
          </FieldContent>
          <RadioGroupItem value={OTHER_METHOD_VALUE} id={OTHER_METHOD_VALUE} />
        </Field>
      </FieldLabel>

      {selected &&
        (clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentMethodFields />
          </Elements>
        ) : (
          <PaymentElementSkeleton />
        ))}
    </div>
  );
}
