import { stripePromise } from "#/lib/stripe/stripe-client";
import { useEffect } from "react";
import { toast } from "sonner";
import AddCardDialog from "./AddCardDialog";
import { useCheckoutConfirm } from "./context/CheckoutConfirmContext";
import SelectPaymentCard from "./SelectPaymentCard";

export default function PaymentCards({
  selectedMethod,
}: {
  selectedMethod: string;
}) {
  const { confirmPaymentRef } = useCheckoutConfirm();

  useEffect(() => {
    if (!selectedMethod || selectedMethod === "other") return;

    confirmPaymentRef.current = async ({ clientSecret }) => {
      const stripe = await stripePromise;
      if (!stripe) return;

      const { error } = await stripe.confirmPayment({
        clientSecret,
        confirmParams: {
          payment_method: selectedMethod,
          return_url: `${window.location.origin}/payment/pending`,
        },
      });

      if (error.message) throw new Error(error.message);
      toast.success("Your payment was completed successfully");
    };
  }, [selectedMethod]);

  return (
    <div className="space-y-4">
      <SelectPaymentCard />
      <AddCardDialog />
    </div>
  );
}
