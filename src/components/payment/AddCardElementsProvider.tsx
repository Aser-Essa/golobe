import { stripePromise } from "#/lib/stripe/stripe-client";
import { createSetupIntent } from "#/server/stripe";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useRef, useState } from "react";
import AddCardForm from "./AddCardForm";
import PaymentElementSkeleton from "../skeleton/PaymentElementSkeleton";
import { Skeleton } from "../ui/skeleton";

export default function AddCardElementsProvider() {
  const [clientSecret, setClientSecret] = useState("");

  const isFetchingRef = useRef(false);

  useEffect(() => {
    if (clientSecret || isFetchingRef.current) return;
    isFetchingRef.current = true;

    createSetupIntent({ data: { paymentMethodType: "card" } })
      .then((data) => setClientSecret(data.clientSecret!))
      .catch((err) => console.error("ERROR:", err))
      .finally(() => {
        isFetchingRef.current = false;
      });
  }, [clientSecret]);

  if (!clientSecret)
    return (
      <div>
        <PaymentElementSkeleton />
        <Skeleton className="mt-10 h-12 w-full" />
      </div>
    );

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <AddCardForm />
    </Elements>
  );
}
