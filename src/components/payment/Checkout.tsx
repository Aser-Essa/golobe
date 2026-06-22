import { createPaymentIntent } from "#/server/stripe";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { useCheckoutConfirm } from "./context/CheckoutConfirmContext";

export default function Checkout({
  selectedMethod,
  total,
}: {
  selectedMethod: string;
  total: number;
}) {
  const { confirmPaymentRef } = useCheckoutConfirm();

  const [isPending, startTransition] = useTransition();

  function handleCheckout() {
    startTransition(async () => {
      try {
        const res = await createPaymentIntent({
          data: {
            amount: total,
            paymentMethodId:
              selectedMethod !== "other" ? selectedMethod : undefined,
          },
        });

        if (!res.clientSecret) return;

        await confirmPaymentRef.current?.(res.clientSecret);
      } catch (err) {
        console.error(err);
      }
    });
  }

  return (
    <Button className="h-12 w-full" onClick={handleCheckout}>
      {isPending ? "Checking out..." : "Checkout"}
    </Button>
  );
}
