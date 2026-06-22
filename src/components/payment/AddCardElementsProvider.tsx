import { stripePromise } from "#/lib/stripe/stripe-client";
import { createSetupIntent } from "#/server/stripe";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import AddCardForm from "./AddCardForm";
import PaymentElementSkeleton from "../skeleton/PaymentElementSkeleton";
import { Skeleton } from "../ui/skeleton";

export default function AddCardElementsProvider() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    createSetupIntent({ data: { paymentMethodType: "card" } })
      .then((data) => {
        setClientSecret(data.clientSecret!);
      })
      .catch((err) => console.error("ERROR:", err));
  }, []);

  if (!clientSecret)
    return (
      <div>
        <PaymentElementSkeleton />
        <Skeleton className="h-12 mt-10 w-full" />
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
