import { stripePromise } from "#/lib/stripe/stripe-client";
import { toast } from "sonner";
import AddCardDialog from "./AddCardDialog";
import { useCheckoutConfirm } from "./context/CheckoutConfirmContext";
import SelectPaymentCard from "./SelectPaymentCard";
import { useEffect } from "react";

export default function PaymentCards({
  selectedMethod,
}: {
  selectedMethod: string;
}) {
  const { confirmPaymentRef } = useCheckoutConfirm();

  useEffect(() => {
    if (!selectedMethod || selectedMethod === "other") return;

    confirmPaymentRef.current = async (clientSecret: string) => {
      const stripe = await stripePromise;
      if (!stripe) return;

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: selectedMethod,
        return_url: window.location.href,
      });

      if (error) throw new Error(error.message);
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
