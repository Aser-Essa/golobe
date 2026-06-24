import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { useCheckoutConfirm } from "./context/CheckoutConfirmContext";

export default function OtherPaymentMethodFields() {
  const stripe = useStripe();
  const elements = useElements();

  const { confirmPaymentRef } = useCheckoutConfirm();

  confirmPaymentRef.current = async ({ clientSecret }) => {
    try {
      if (!stripe || !elements) return;

      const { error: submitError } = await elements.submit();

      if (submitError) {
        throw new Error(submitError.message);
      }

      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment/pending`,
        },
      });

      if (paymentError.message) {
        throw new Error(paymentError.message);
      }

      toast.success("Your payment was completed successfully");
    } catch (error) {
      toast.error((error as Error).message);
      console.error("PAYMENT ERROR:", error);
    }
  };

  return (
    <PaymentElement
      options={{
        terms: {
          card: "never",
        },
      }}
    />
  );
}
